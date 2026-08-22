import "server-only";

import { redirect } from "next/navigation";
import { db } from "@/lib/os/db";
import { createClient } from "@/lib/os/supabase/server";
import { ClientRole } from "@/lib/os/auth/portal-rbac";
import { recordAuditEvent } from "@/lib/os/audit";

export type CurrentPortalActor = {
  userId: string;
  email: string;
  clientMembership: {
    id: string;
    role: ClientRole;
    isActive: boolean;
  };
  clientId: string;
  organizationId: string;
};

/**
 * Resolves the signed-in Supabase user to a ClientMembership. Unlike the
 * internal-side getOrCreateCurrentActor, this never creates a membership out
 * of nothing — a ClientMembership row only ever comes from staff sending an
 * invite (inviteClientUserAction). What this DOES do on first sign-in is
 * "claim" that pending invite row: match it by email (case-insensitive,
 * since Supabase Auth itself lowercases emails but the invited address may
 * have been typed with different casing) where userId is still null, and
 * attach this user's id to it.
 *
 * Deliberately does NOT fall back to creating an internal Membership or
 * treating an unmatched user as staff — see getOrCreateCurrentActor's own
 * guard in lib/os/auth/session.ts, the other half of this identity
 * separation. A signed-in user who is neither an internal Membership nor a
 * ClientMembership (pending or claimed) is simply signed in to nothing, on
 * both sides of the app.
 */
export async function getCurrentPortalActor(): Promise<CurrentPortalActor | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return null;
  }

  let clientMembership = await db.clientMembership.findFirst({
    where: { userId: user.id, isActive: true },
  });

  if (!clientMembership) {
    const pendingInvite = await db.clientMembership.findFirst({
      where: {
        userId: null,
        isActive: true,
        email: { equals: user.email, mode: "insensitive" },
      },
    });

    if (!pendingInvite) {
      return null;
    }

    clientMembership = await db.clientMembership.update({
      where: { id: pendingInvite.id },
      data: {
        userId: user.id,
        displayName:
          pendingInvite.displayName ?? ((user.user_metadata?.full_name as string | undefined) ?? null),
      },
    });

    const client = await db.client.findUniqueOrThrow({
      where: { id: clientMembership.clientId },
      select: { organizationId: true },
    });

    await recordAuditEvent({
      organizationId: client.organizationId,
      actorLabel: `client:${user.email}`,
      action: "CLIENT_PORTAL_ACCESS_CLAIMED",
      targetType: "ClientMembership",
      targetId: clientMembership.id,
    });
  }

  const client = await db.client.findUniqueOrThrow({
    where: { id: clientMembership.clientId },
    select: { organizationId: true },
  });

  return {
    userId: user.id,
    email: user.email,
    clientId: clientMembership.clientId,
    organizationId: client.organizationId,
    clientMembership: {
      id: clientMembership.id,
      role: clientMembership.role,
      isActive: clientMembership.isActive,
    },
  };
}

/** Server Component / Server Action guard: redirects to /portal/login if not a client user. */
export async function requirePortalActor(): Promise<CurrentPortalActor> {
  const actor = await getCurrentPortalActor();
  if (!actor) {
    redirect("/portal/login");
  }
  return actor;
}
