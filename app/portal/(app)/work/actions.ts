"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/os/db";
import { requirePortalActor } from "@/lib/os/auth/portal-session";
import { requirePortalPermission } from "@/lib/os/auth/portal-rbac";
import { recordAuditEvent } from "@/lib/os/audit";
import { submitClientApprovalSchema } from "@/lib/os/validation/portal-work";

export type ActionState = { error?: string };

export async function submitClientApprovalAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requirePortalActor();
  try {
    requirePortalPermission(actor.clientMembership.role, "approval:submit");
  } catch {
    return { error: "Only a Client Admin can approve or request changes on this." };
  }

  const parsed = submitClientApprovalSchema.safeParse({
    taskId: formData.get("taskId"),
    outcome: formData.get("outcome"),
    comments: formData.get("comments"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  // Scoped by the task's workflow instance's clientId, matching the portal
  // actor's own clientId — never trusts the client to only ever submit a
  // taskId for their own work, and never falls back to organizationId
  // scoping alone (that would let a client act on another client's task
  // within the same practice). See lib/os/queries/portal-work.ts.
  const task = await db.task.findFirst({
    where: {
      id: parsed.data.taskId,
      workflowInstance: { clientId: actor.clientId, organizationId: actor.organizationId },
    },
    select: { id: true, status: true, workflowInstanceId: true },
  });
  if (!task) {
    return { error: "Task not found." };
  }
  if (task.status !== "APPROVED") {
    return { error: "This task isn't awaiting your approval anymore." };
  }

  await db.$transaction([
    db.clientApproval.create({
      data: {
        taskId: task.id,
        clientMembershipId: actor.clientMembership.id,
        outcome: parsed.data.outcome,
        comments: parsed.data.comments || null,
      },
    }),
    db.task.update({
      where: { id: task.id },
      data: { status: parsed.data.outcome === "APPROVED" ? "DELIVERED" : "IN_PROGRESS" },
    }),
  ]);

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorLabel: `client:${actor.email}`,
    action: "CLIENT_APPROVAL_SUBMITTED",
    targetType: "Task",
    targetId: task.id,
    metadata: { outcome: parsed.data.outcome },
  });

  revalidatePath(`/portal/work/${task.workflowInstanceId}`);
  revalidatePath("/portal/work");
  // The task's status just changed from the staff side's point of view too.
  revalidatePath(`/os/work/${task.workflowInstanceId}`);
  revalidatePath("/os/work");
  revalidatePath("/os/quality");

  return {};
}
