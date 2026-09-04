"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/os/db";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { recordAuditEvent } from "@/lib/os/audit";
import { updateCapacitySchema } from "@/lib/os/validation/capacity";

export type ActionState = { error?: string };

export async function updateCapacityAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "team:manageCapacity")) {
    return { error: "You don't have permission to set capacity targets." };
  }

  const rawHours = formData.get("weeklyCapacityHours");
  const parsed = updateCapacitySchema.safeParse({
    membershipId: formData.get("membershipId"),
    weeklyCapacityHours: rawHours || null,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid capacity." };
  }

  const member = await db.membership.findFirst({
    where: { id: parsed.data.membershipId, organizationId: actor.organizationId },
  });
  if (!member) {
    return { error: "Team member not found." };
  }

  await db.membership.update({
    where: { id: member.id },
    data: { weeklyCapacityHours: parsed.data.weeklyCapacityHours },
  });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "MEMBERSHIP_CAPACITY_SET",
    targetType: "Membership",
    targetId: member.id,
    metadata: { weeklyCapacityHours: parsed.data.weeklyCapacityHours },
  });

  revalidatePath("/os/team");
  return {};
}
