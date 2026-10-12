"use server";

import { revalidatePath } from "next/cache";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { markDiagnosticSubmissionReviewed } from "@/lib/diagnostic/db";
import { recordAuditEvent } from "@/lib/os/audit";

export type MarkReviewedState = { error?: string };

export async function markDiagnosticSubmissionReviewedAction(
  _prevState: MarkReviewedState,
  formData: FormData,
): Promise<MarkReviewedState> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "diagnostic:review")) {
    return { error: "You don't have permission to review diagnostic submissions." };
  }

  const id = String(formData.get("id") ?? "");
  const reviewerNotes = String(formData.get("reviewerNotes") ?? "").trim() || null;
  if (!id) return { error: "Missing submission id." };

  await markDiagnosticSubmissionReviewed(id, reviewerNotes);

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "DIAGNOSTIC_SUBMISSION_REVIEWED",
    targetType: "DiagnosticSubmission",
    targetId: id,
  });

  revalidatePath(`/os/diagnostic/${id}`);
  revalidatePath("/os/diagnostic");
  return {};
}
