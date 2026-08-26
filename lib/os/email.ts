import "server-only";

/**
 * Direct-to-Resend-API sender for CFOIP OS system emails (the portfolio
 * digest today). Deliberately not routed through lib/notify.ts — that
 * helper fans every notification out to one fixed inbox (NOTIFY_TO) for
 * marketing-site form submissions, whereas OS emails go to a specific,
 * per-recipient staff address. Both reuse the same RESEND_API_KEY/
 * NOTIFY_FROM Vercel env vars already configured for the marketing site,
 * so sending an OS email needs no new provider setup.
 *
 * A missing RESEND_API_KEY makes this a no-op (logged, not thrown) so a
 * digest run with no key configured yet doesn't fail the whole cron job.
 */
export async function sendOsEmail(input: { to: string; subject: string; html: string; text: string }): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("[os-email] RESEND_API_KEY not set, skipping send to", input.to);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM ?? "CFO Partners <onboarding@resend.dev>",
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend send failed (${response.status}): ${body}`);
  }
}
