"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/os/db";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { recordAuditEvent } from "@/lib/os/audit";
import { createRequestSchema, updateRequestSchema } from "@/lib/os/validation/request";
import { computeSlaDueAt, isTerminalRequestStatus } from "@/lib/os/requests/status";

export type ActionState = { error?: string; fieldErrors?: Record<string, string> };

function fieldErrorsFrom(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

/** Staff logging a request on a client's behalf (phone call, email, in person). */
export async function createRequestAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "request:triage")) {
    return { error: "You don't have permission to log requests." };
  }

  const parsed = createRequestSchema.safeParse({
    clientId: formData.get("clientId"),
    title: formData.get("title"),
    description: formData.get("description"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }

  const client = await db.client.findFirst({
    where: { id: parsed.data.clientId, organizationId: actor.organizationId },
    select: { id: true },
  });
  if (!client) {
    return { error: "Client not found." };
  }

  const request = await db.request.create({
    data: {
      organizationId: actor.organizationId,
      clientId: client.id,
      title: parsed.data.title,
      description: parsed.data.description || null,
      raisedByMembershipId: actor.membership.id,
    },
  });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "REQUEST_CREATED",
    targetType: "Request",
    targetId: request.id,
    metadata: { clientId: client.id, title: request.title },
  });

  revalidatePath("/os/requests");
  return {};
}

/**
 * One form, one action for the whole triage-through-resolution lifecycle
 * (priority, assignee, status, resolution notes) — a first slice doesn't
 * need separate auto-submit-on-change dropdowns (the TaskStatusForm/
 * TaskAssigneeForm pattern) the way Work's table rows do; those exist
 * because a task row has to stay dense across five other columns. A
 * request row has more room, so one explicit-submit form (the
 * ReviewTaskForm shape from Quality) covers it more simply.
 */
export async function updateRequestAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "request:triage")) {
    return { error: "You don't have permission to triage requests." };
  }

  const parsed = updateRequestSchema.safeParse({
    requestId: formData.get("requestId"),
    priority: formData.get("priority"),
    status: formData.get("status"),
    assigneeMembershipId: formData.get("assigneeMembershipId") || null,
    resolutionNotes: formData.get("resolutionNotes"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }
  const { requestId, priority, status, assigneeMembershipId, resolutionNotes } = parsed.data;

  const request = await db.request.findFirst({
    where: { id: requestId, organizationId: actor.organizationId },
  });
  if (!request) {
    return { error: "Request not found." };
  }
  if (isTerminalRequestStatus(request.status)) {
    return { error: "This request is already resolved." };
  }

  const movingToTerminal = isTerminalRequestStatus(status);
  if (movingToTerminal && !can(actor.membership.role, "request:resolve")) {
    return { error: "You don't have permission to complete or decline requests." };
  }
  if (movingToTerminal && !resolutionNotes) {
    return {
      error: "Add a note explaining the outcome before completing or declining.",
      fieldErrors: { resolutionNotes: "Required to complete or decline a request." },
    };
  }

  const wasNew = request.status === "NEW";

  await db.request.update({
    where: { id: request.id },
    data: {
      priority,
      status,
      assigneeMembershipId: assigneeMembershipId || null,
      slaDueAt: computeSlaDueAt(priority, request.createdAt),
      resolutionNotes: movingToTerminal ? resolutionNotes || null : request.resolutionNotes,
      resolvedAt: movingToTerminal ? new Date() : null,
    },
  });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: movingToTerminal ? "REQUEST_RESOLVED" : wasNew ? "REQUEST_TRIAGED" : "REQUEST_STATUS_CHANGED",
    targetType: "Request",
    targetId: request.id,
    metadata: { fromStatus: request.status, toStatus: status, priority },
  });

  revalidatePath("/os/requests");
  return {};
}
