"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/os/db";
import { requireActor } from "@/lib/os/auth/session";
import { requirePermission } from "@/lib/os/auth/rbac";
import { recordAuditEvent } from "@/lib/os/audit";
import { getSupabaseAdmin } from "@/lib/os/supabase/admin";
import { inviteClientUserSchema } from "@/lib/os/validation/portal";

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

/**
 * Best-effort origin for the invite email's redirect link — same approach
 * as app/os/auth/callback/route.ts uses the *request's* origin rather than
 * a hardcoded env var, so it works unmodified on every Vercel preview
 * deployment as well as production. The one-time setup cost this pushes
 * onto Supabase config (each origin that will ever send an invite must be
 * in Auth > URL Configuration > Redirect URLs) is documented in
 * /docs/setup.md "Client Portal invite emails".
 */
function currentOrigin() {
  const headerList = headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

export async function inviteClientUserAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  try {
    requirePermission(actor.membership.role, "client:managePortalAccess");
  } catch {
    return { error: "You don't have permission to manage client portal access." };
  }

  const parsed = inviteClientUserSchema.safeParse({
    clientId: formData.get("clientId"),
    email: formData.get("email"),
    displayName: formData.get("displayName") || undefined,
    role: formData.get("role"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }
  const { clientId, email, displayName, role } = parsed.data;

  const client = await db.client.findFirst({
    where: { id: clientId, organizationId: actor.organizationId },
    select: { id: true },
  });
  if (!client) {
    return { error: "Client not found." };
  }

  const existing = await db.clientMembership.findUnique({
    where: { clientId_email: { clientId, email } },
  });
  if (existing?.isActive) {
    return { error: `${email} already has portal access to this client.` };
  }

  let clientMembership;
  if (existing) {
    // Re-granting access that was previously revoked: reactivate the same
    // row (keeps its ClientApproval history attached) rather than violating
    // the (clientId, email) unique constraint with a new one.
    clientMembership = await db.clientMembership.update({
      where: { id: existing.id },
      data: {
        isActive: true,
        role,
        displayName: displayName ?? existing.displayName,
        invitedByMembershipId: actor.membership.id,
      },
    });
  } else {
    clientMembership = await db.clientMembership.create({
      data: {
        clientId,
        email,
        displayName: displayName ?? null,
        role,
        invitedByMembershipId: actor.membership.id,
      },
    });
  }

  // Only send an invite email for a person who has never actually claimed
  // this access (no userId yet) — reactivating someone who already has
  // Supabase credentials just needs isActive flipped back on above, not a
  // second invite.
  if (!clientMembership.userId) {
    try {
      const supabase = getSupabaseAdmin();
      const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${currentOrigin()}/portal/auth/callback`,
      });
      if (inviteError) {
        return {
          error: `Portal access record was saved, but the invite email failed to send: ${inviteError.message}`,
        };
      }
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      return { error: `Portal access record was saved, but the invite email failed to send: ${detail}` };
    }
  }

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "CLIENT_PORTAL_INVITE_SENT",
    targetType: "ClientMembership",
    targetId: clientMembership.id,
    metadata: { clientId, email, role },
  });

  revalidatePath(`/os/clients/${clientId}`);
  return {};
}

export async function setClientMembershipActiveAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  try {
    requirePermission(actor.membership.role, "client:managePortalAccess");
  } catch {
    return { error: "You don't have permission to manage client portal access." };
  }

  const membershipId = formData.get("clientMembershipId");
  const isActive = formData.get("isActive") === "true";
  if (typeof membershipId !== "string" || !membershipId) {
    return { error: "Missing portal user." };
  }

  const membership = await db.clientMembership.findFirst({
    where: { id: membershipId, client: { organizationId: actor.organizationId } },
  });
  if (!membership) {
    return { error: "Portal user not found." };
  }

  await db.clientMembership.update({
    where: { id: membership.id },
    data: { isActive },
  });

  if (!isActive) {
    await recordAuditEvent({
      organizationId: actor.organizationId,
      actorMembershipId: actor.membership.id,
      action: "CLIENT_PORTAL_ACCESS_REVOKED",
      targetType: "ClientMembership",
      targetId: membership.id,
      metadata: { clientId: membership.clientId, email: membership.email },
    });
  }

  revalidatePath(`/os/clients/${membership.clientId}`);
  return {};
}
