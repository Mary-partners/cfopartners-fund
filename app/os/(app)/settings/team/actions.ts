"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/os/db";
import { requireActor } from "@/lib/os/auth/session";
import { can, OrgRole } from "@/lib/os/auth/rbac";
import { recordAuditEvent } from "@/lib/os/audit";
import { getSupabaseAdmin } from "@/lib/os/supabase/admin";
import { inviteStaffMemberSchema } from "@/lib/os/validation/staff";

const changeRoleSchema = z.object({
  membershipId: z.uuid(),
  role: z.enum(OrgRole),
});

export type ChangeRoleState = { error?: string };

export async function changeMemberRoleAction(
  _prevState: ChangeRoleState,
  formData: FormData,
): Promise<ChangeRoleState> {
  const actor = await requireActor();

  if (!can(actor.membership.role, "membership:changeRole")) {
    return { error: "You don't have permission to change roles." };
  }

  const parsed = changeRoleSchema.safeParse({
    membershipId: formData.get("membershipId"),
    role: formData.get("role"),
  });
  if (!parsed.success) {
    return { error: "Invalid request." };
  }

  const target = await db.membership.findFirst({
    where: { id: parsed.data.membershipId, organizationId: actor.organizationId },
  });
  if (!target) {
    return { error: "Member not found." };
  }

  const previousRole = target.role;
  await db.membership.update({
    where: { id: target.id },
    data: { role: parsed.data.role },
  });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "MEMBERSHIP_ROLE_CHANGED",
    targetType: "Membership",
    targetId: target.id,
    metadata: { from: previousRole, to: parsed.data.role },
  });

  revalidatePath("/os/settings/team");
  return {};
}

export type InviteStaffState = { error?: string; fieldErrors?: Record<string, string> };

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
 * as inviteClientUserAction's currentOrigin() (app/os/(app)/clients/[id]/
 * portal-actions.ts), duplicated rather than imported since that helper
 * lives in a route-group-local file. See that file's comment for why the
 * request's own origin is used instead of a hardcoded env var.
 */
function currentOrigin() {
  const headerList = headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

/**
 * Invites a new internal staff member with a manager-chosen role from the
 * start, instead of the only previous path (they self-serve sign up at
 * /os/signup as a Preparer/Analyst, then someone promotes them here).
 * Creates the Membership row up front with userId null — claimed by email
 * on first sign-in, see lib/os/auth/session.ts — mirroring how
 * inviteClientUserAction provisions ClientMembership rows.
 */
export async function inviteStaffMemberAction(
  _prevState: InviteStaffState,
  formData: FormData,
): Promise<InviteStaffState> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "membership:changeRole")) {
    return { error: "You don't have permission to invite team members." };
  }

  const parsed = inviteStaffMemberSchema.safeParse({
    email: formData.get("email"),
    displayName: formData.get("displayName") || undefined,
    role: formData.get("role"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }
  const { email, displayName, role } = parsed.data;

  const existing = await db.membership.findUnique({
    where: { organizationId_email: { organizationId: actor.organizationId, email } },
  });
  if (existing?.isActive) {
    return { error: `${email} is already on the team.` };
  }

  let membership;
  if (existing) {
    // Re-inviting someone previously deactivated: reactivate the same row
    // (keeps their audit/assignment history attached) rather than violating
    // the (organizationId, email) unique constraint with a new one.
    membership = await db.membership.update({
      where: { id: existing.id },
      data: { isActive: true, role, displayName: displayName ?? existing.displayName },
    });
  } else {
    membership = await db.membership.create({
      data: { organizationId: actor.organizationId, email, displayName: displayName ?? null, role },
    });
  }

  // Only send an invite email for someone who has never actually claimed
  // this access (no userId yet) — reactivating someone who already has
  // Supabase credentials just needs isActive flipped back on above.
  if (!membership.userId) {
    try {
      const supabase = getSupabaseAdmin();
      const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${currentOrigin()}/os/auth/callback`,
      });
      if (inviteError) {
        return { error: `Team record was saved, but the invite email failed to send: ${inviteError.message}` };
      }
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      return { error: `Team record was saved, but the invite email failed to send: ${detail}` };
    }
  }

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "STAFF_INVITE_SENT",
    targetType: "Membership",
    targetId: membership.id,
    metadata: { email, role },
  });

  revalidatePath("/os/settings/team");
  return {};
}
