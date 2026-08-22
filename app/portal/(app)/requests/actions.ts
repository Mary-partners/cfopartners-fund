"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/os/db";
import { requirePortalActor } from "@/lib/os/auth/portal-session";
import { canPortal } from "@/lib/os/auth/portal-rbac";
import { recordAuditEvent } from "@/lib/os/audit";
import { submitClientRequestSchema } from "@/lib/os/validation/portal-requests";

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

export async function submitClientRequestAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requirePortalActor();
  if (!canPortal(actor.clientMembership.role, "request:submit")) {
    return { error: "You don't have permission to raise requests." };
  }

  const parsed = submitClientRequestSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }

  const request = await db.request.create({
    data: {
      organizationId: actor.organizationId,
      clientId: actor.clientId,
      title: parsed.data.title,
      description: parsed.data.description || null,
      raisedByClientMembershipId: actor.clientMembership.id,
    },
  });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorLabel: `client:${actor.email}`,
    action: "REQUEST_CREATED",
    targetType: "Request",
    targetId: request.id,
    metadata: { clientId: actor.clientId, title: request.title },
  });

  revalidatePath("/portal/requests");
  revalidatePath("/os/requests");
  return {};
}
