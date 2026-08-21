"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/os/db";
import { requireActor } from "@/lib/os/auth/session";
import { can, canReview } from "@/lib/os/auth/rbac";
import { recordAuditEvent } from "@/lib/os/audit";
import { submitReviewSchema } from "@/lib/os/validation/quality";

export type ActionState = { error?: string };

export async function submitReviewAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "quality:review")) {
    return { error: "You don't have permission to review work." };
  }

  const parsed = submitReviewSchema.safeParse({
    taskId: formData.get("taskId"),
    outcome: formData.get("outcome"),
    comments: formData.get("comments"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid review." };
  }

  const task = await db.task.findFirst({
    where: { id: parsed.data.taskId, workflowInstance: { organizationId: actor.organizationId } },
    select: { id: true, status: true, assigneeMembershipId: true, workflowInstanceId: true },
  });
  if (!task) {
    return { error: "Task not found." };
  }
  if (task.status !== "UNDER_REVIEW") {
    return { error: "This task isn't awaiting review anymore — someone may have already reviewed it." };
  }
  if (task.assigneeMembershipId && !canReview(task.assigneeMembershipId, actor.membership.id)) {
    return { error: "You can't review your own work — ask someone else to review it." };
  }

  await db.$transaction([
    db.review.create({
      data: {
        taskId: task.id,
        reviewerMembershipId: actor.membership.id,
        preparerMembershipId: task.assigneeMembershipId,
        outcome: parsed.data.outcome,
        comments: parsed.data.comments || null,
      },
    }),
    db.task.update({
      where: { id: task.id },
      data: { status: parsed.data.outcome === "APPROVED" ? "APPROVED" : "IN_PROGRESS" },
    }),
  ]);

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "TASK_REVIEWED",
    targetType: "Task",
    targetId: task.id,
    metadata: { outcome: parsed.data.outcome },
  });

  revalidatePath("/os/quality");
  revalidatePath(`/os/work/${task.workflowInstanceId}`);
  revalidatePath("/os/work");
  revalidatePath("/os/calendar");

  return {};
}
