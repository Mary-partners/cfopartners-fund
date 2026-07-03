import { NextResponse } from "next/server";

export const runtime = "edge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Captures AI Automation intake submissions.
 *
 * Every submission is logged to the Vercel function console (Logs tab,
 * search for [automation]). Set AUTOMATION_WEBHOOK_URL, or fall back to
 * SUBSCRIBE_WEBHOOK_URL, to forward each submission to a webhook that
 * writes into Notion, a sheet, or your inbox.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  const automate = String(body.automate ?? "").trim();
  if (automate.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please describe what you want to automate." },
      { status: 400 },
    );
  }

  const record = {
    kind: "automation-intake",
    name: String(body.name ?? "").trim(),
    email,
    business: String(body.business ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    automate,
    success: String(body.success ?? "").trim(),
    timeline: String(body.timeline ?? "").trim(),
    dependencies: String(body.dependencies ?? "").trim(),
    at: new Date().toISOString(),
  };

  console.log("[automation]", JSON.stringify(record));

  const webhook =
    process.env.AUTOMATION_WEBHOOK_URL ?? process.env.SUBSCRIBE_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.warn("[automation] webhook forward failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
