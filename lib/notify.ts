/**
 * Server-side email notifications for form submissions.
 *
 * Two providers are supported, checked in order. Configure exactly one
 * in the Vercel project's Environment Variables:
 *
 * 1. WEB3FORMS_ACCESS_KEY (recommended, 2-minute setup)
 *    Get a free key at https://web3forms.com by entering the inbox that
 *    should receive submissions (partner@cfopartners.fund). No account,
 *    no DNS changes. Emails arrive from Web3Forms with the submission
 *    in the body.
 *
 * 2. RESEND_API_KEY (branded upgrade path)
 *    Create a free API key at https://resend.com and verify the
 *    cfopartners.fund domain to send from your own address. Optional
 *    extras: NOTIFY_TO (defaults to partner@cfopartners.fund) and
 *    NOTIFY_FROM (defaults to Resend's onboarding sender until the
 *    domain is verified).
 *
 * If neither key is set, notify() is a no-op and submissions remain
 * visible in the Vercel function logs and the optional webhook.
 */

const DEFAULT_TO = "partner@cfopartners.fund";

export interface Notification {
  subject: string;
  lines: [string, string][]; // label/value pairs rendered into the body
}

export async function notify(n: Notification): Promise<void> {
  const body = n.lines
    .filter(([, v]) => v && v.length > 0)
    .map(([k, v]) => `${k}:\n${v}`)
    .join("\n\n");

  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3formsKey) {
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: n.subject,
          from_name: "cfopartners.fund website",
          message: body,
        }),
      });
    } catch (err) {
      console.warn("[notify] web3forms send failed", err);
    }
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from:
            process.env.NOTIFY_FROM ??
            "CFO Partners website <onboarding@resend.dev>",
          to: [process.env.NOTIFY_TO ?? DEFAULT_TO],
          subject: n.subject,
          text: body,
        }),
      });
    } catch (err) {
      console.warn("[notify] resend send failed", err);
    }
  }
}
