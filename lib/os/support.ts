import "server-only";

import { db } from "@/lib/os/db";
import { OrgRole } from "@/lib/os/auth/rbac";
import { sendOsEmail } from "@/lib/os/email";

const MAX_QUESTION_LENGTH = 2000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type AskAnythingResult = { error?: string; sent?: boolean };

/**
 * Backs the "Ask us anything" button on both /os and /portal. There's no AI
 * behind this yet — it emails every active Managing Partner in the asker's
 * own organization (never across organizations), reusing the same Resend
 * setup as the portfolio digest. Once AI CFO's own chat ships, this button
 * is the natural place to route to it instead.
 */
export async function sendAskAnything(input: {
  organizationId: string;
  fromLabel: string;
  question: string;
}): Promise<AskAnythingResult> {
  const question = input.question.trim();
  if (!question) {
    return { error: "Type a question first." };
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return { error: `Keep it under ${MAX_QUESTION_LENGTH} characters.` };
  }

  const recipients = await db.membership.findMany({
    where: { organizationId: input.organizationId, isActive: true, role: OrgRole.MANAGING_PARTNER },
    select: { email: true },
  });

  if (recipients.length === 0) {
    return { error: "No one is set up to receive questions for this organization yet." };
  }

  await Promise.all(
    recipients.map((r) =>
      sendOsEmail({
        to: r.email,
        subject: `CFOIP OS question from ${input.fromLabel}`,
        text: `${input.fromLabel} asked:\n\n${question}`,
        html: `<p><strong>${escapeHtml(input.fromLabel)}</strong> asked:</p><p>${escapeHtml(question).replace(/\n/g, "<br/>")}</p>`,
      }),
    ),
  );

  return { sent: true };
}
