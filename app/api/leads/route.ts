import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Log to Vercel function console — visible in the Vercel dashboard.
  // Every Check-Up submission appears here until you wire a real destination below.
  console.log("[lead]", JSON.stringify(payload));

  // Optional: forward to a webhook (Zapier, Make, Apps Script → Notion)
  // Set LEADS_WEBHOOK_URL in Vercel env vars to enable.
  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn("[lead] webhook forward failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
