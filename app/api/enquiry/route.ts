import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";
import { notify } from "@/lib/notify";

/**
 * Receives institutional and SME enquiries from /contact and the service
 * pages. Each enquiry is emailed to the CFOIP inbox (see lib/notify.ts),
 * logged to the Vercel function console, and optionally forwarded to
 * ENQUIRY_WEBHOOK_URL (e.g. a CRM or spreadsheet automation).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Please check the form.", field: first?.path[0] },
      { status: 400 },
    );
  }
  const e = parsed.data;

  // Honeypot filled in: accept silently so bots learn nothing.
  if (e.website) return NextResponse.json({ ok: true });

  const at = new Date().toISOString();
  const src = e.source ?? {};
  const sourceLines: [string, string][] = [
    ["Landing page", src.landingPage ?? ""],
    ["Referrer", src.referrer ?? ""],
    ["UTM", [src.utmSource, src.utmMedium, src.utmCampaign].filter(Boolean).join(" / ")],
    ["Received", at],
  ];

  if (e.kind === "institutional") {
    await notify({
      subject: `Institutional enquiry: ${e.organisation} (${e.offer})`,
      lines: [
        ["Organisation", e.organisation],
        ["Contact", e.name],
        ["Email", e.email],
        ["Organisation type", e.orgType],
        ["Countries of operation", e.country],
        ["How they want to start", e.offer],
        ["Support required", e.support],
        ["Finance capacity in companies", e.capacity],
        ["Portfolio or cohort size", e.size ?? ""],
        ["Expected start", e.start],
        ["Budget range", e.budget ?? ""],
        ["Description", e.message],
        ...sourceLines,
      ],
    });
  } else {
    await notify({
      subject: `Business enquiry: ${e.business} (${e.support})`,
      lines: [
        ["Business", e.business],
        ["Sector", e.sector],
        ["Country", e.country],
        ["Stage", e.stage],
        ["Main challenge", e.challenge],
        ["Interested in", e.support],
        ["Timeline", e.timeline],
        ["Contact", e.name],
        ["Email", e.email],
        ["Phone", e.phone ?? ""],
        ["Description", e.message],
        ...sourceLines,
      ],
    });
  }

  console.log("[enquiry]", JSON.stringify({ ...e, at }));

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...e, at }),
      });
    } catch (err) {
      console.warn("[enquiry] webhook failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
