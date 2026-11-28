import { ALL_QUESTIONS } from "./questions";
import type { DiagnosticAnswers } from "./scoring";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type DiagnosticSubmissionPayload = {
  businessName?: unknown;
  founderName?: unknown;
  email?: unknown;
  phone?: unknown;
  location?: unknown;
  sector?: unknown;
  websiteUrl?: unknown;
  answers?: unknown;
  consentData?: unknown;
  consentSharing?: unknown;
  consentWithdrawal?: unknown;
};

export type ValidatedDiagnosticSubmission = {
  businessName: string;
  founderName: string;
  email: string;
  phone: string;
  location: string;
  sector: string;
  websiteUrl: string;
  answers: DiagnosticAnswers;
  consentData: boolean;
  consentSharing: boolean;
  consentWithdrawal: boolean;
};

/** Returns the validated, typed payload, or a single human-readable error. */
export function validateDiagnosticSubmission(
  body: DiagnosticSubmissionPayload,
): { ok: true; data: ValidatedDiagnosticSubmission } | { ok: false; error: string } {
  const businessName = String(body.businessName ?? "").trim();
  const founderName = String(body.founderName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const sector = String(body.sector ?? "").trim();

  if (businessName.length < 2) return { ok: false, error: "Enter your business name." };
  if (founderName.length < 2) return { ok: false, error: "Enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Enter a valid email address." };
  if (sector.length < 2) return { ok: false, error: "Select a sector." };

  if (!body.consentData || !body.consentWithdrawal) {
    return { ok: false, error: "The data-handling and withdrawal consents are required to continue." };
  }

  const answers = (body.answers ?? {}) as DiagnosticAnswers;
  for (const question of ALL_QUESTIONS) {
    if (!question.required) continue;
    const answer = answers[question.id];
    const isEmpty =
      answer === undefined || answer === null || (Array.isArray(answer) ? answer.length === 0 : answer === "");
    if (isEmpty) {
      return { ok: false, error: `Please answer: "${question.label}"` };
    }
  }

  return {
    ok: true,
    data: {
      businessName,
      founderName,
      email,
      phone: String(body.phone ?? "").trim(),
      location: String(body.location ?? "").trim(),
      sector,
      websiteUrl: String(body.websiteUrl ?? "").trim(),
      answers,
      consentData: Boolean(body.consentData),
      consentSharing: Boolean(body.consentSharing),
      consentWithdrawal: Boolean(body.consentWithdrawal),
    },
  };
}
