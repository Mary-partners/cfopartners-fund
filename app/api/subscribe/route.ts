import { NextResponse } from "next/server";

export const runtime = "edge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Captures newsletter signups and resource-download emails.
 *
 * Every submission is logged to the Vercel function console (visible in
 * the dashboard under the project's Logs tab). Set SUBSCRIBE_WEBHOOK_URL
 * in the project's environment variables to also forward each submission
 * to a webhook (Zapier, Make, or an Apps Script that writes to Notion).
 */
export async function POST(request: Request) {
  let payload: { email?: string; source?: string; resource?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }

  const email = (payload.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const record = {
    email,
    source: payload.source ?? "unknown",
    resource: payload.resource ?? null,
    at: new Date().toISOString(),
  };

  console.log("[subscribe]", JSON.stringify(record));

  const webhook = process.env.SUBSCRIBE_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.warn("[subscribe] webhook forward failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
