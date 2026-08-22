"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/os/db";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { recordAuditEvent } from "@/lib/os/audit";
import { createMeetingSchema, addDecisionSchema, updateDecisionStatusSchema } from "@/lib/os/validation/meeting";

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

export async function createMeetingAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "meeting:manage")) {
    return { error: "You don't have permission to log meetings." };
  }

  const parsed = createMeetingSchema.safeParse({
    clientId: formData.get("clientId"),
    title: formData.get("title"),
    heldAt: formData.get("heldAt"),
    attendees: formData.get("attendees"),
    notes: formData.get("notes"),
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

  const meeting = await db.meeting.create({
    data: {
      organizationId: actor.organizationId,
      clientId: client.id,
      title: parsed.data.title,
      heldAt: parsed.data.heldAt,
      attendees: parsed.data.attendees || null,
      notes: parsed.data.notes || null,
      loggedByMembershipId: actor.membership.id,
    },
  });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "MEETING_LOGGED",
    targetType: "Meeting",
    targetId: meeting.id,
    metadata: { clientId: client.id, title: meeting.title },
  });

  revalidatePath("/os/meetings");
  revalidatePath(`/os/clients/${client.id}`);
  return {};
}

export async function addDecisionAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "meeting:manage")) {
    return { error: "You don't have permission to add decisions." };
  }

  const parsed = addDecisionSchema.safeParse({
    meetingId: formData.get("meetingId"),
    description: formData.get("description"),
    ownerMembershipId: formData.get("ownerMembershipId") || null,
    dueDate: formData.get("dueDate") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }

  const meeting = await db.meeting.findFirst({
    where: { id: parsed.data.meetingId, organizationId: actor.organizationId },
    select: { id: true, clientId: true },
  });
  if (!meeting) {
    return { error: "Meeting not found." };
  }

  const decision = await db.decision.create({
    data: {
      meetingId: meeting.id,
      description: parsed.data.description,
      ownerMembershipId: parsed.data.ownerMembershipId || null,
      dueDate: parsed.data.dueDate ?? null,
    },
  });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "DECISION_ADDED",
    targetType: "Decision",
    targetId: decision.id,
    metadata: { meetingId: meeting.id },
  });

  revalidatePath("/os/meetings");
  revalidatePath(`/os/clients/${meeting.clientId}`);
  return {};
}

/**
 * A decision's own accountable owner can close it out even without broad
 * meeting:manage authority — the "one accountable owner" product principle
 * (see /docs/product-spec.md) means the owner is the one actually
 * responsible for follow-through, not just whoever ran the meeting.
 */
export async function updateDecisionStatusAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();

  const parsed = updateDecisionStatusSchema.safeParse({
    decisionId: formData.get("decisionId"),
    status: formData.get("status"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const decision = await db.decision.findFirst({
    where: { id: parsed.data.decisionId, meeting: { organizationId: actor.organizationId } },
    select: { id: true, ownerMembershipId: true, meeting: { select: { clientId: true } } },
  });
  if (!decision) {
    return { error: "Decision not found." };
  }

  const isOwner = decision.ownerMembershipId === actor.membership.id;
  if (!isOwner && !can(actor.membership.role, "meeting:manage")) {
    return { error: "Only the decision's owner or someone who can manage meetings can update this." };
  }

  await db.decision.update({ where: { id: decision.id }, data: { status: parsed.data.status } });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "DECISION_STATUS_CHANGED",
    targetType: "Decision",
    targetId: decision.id,
    metadata: { status: parsed.data.status },
  });

  revalidatePath("/os/meetings");
  revalidatePath(`/os/clients/${decision.meeting.clientId}`);
  return {};
}
