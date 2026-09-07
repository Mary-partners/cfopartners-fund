import "server-only";

import { db } from "@/lib/os/db";
import type { OrgRole } from "@/lib/os/auth/rbac";
import { ORG_WIDE_ROLE_VALUES } from "@/lib/os/auth/client-access-shared";
import type { CurrentActor } from "@/lib/os/auth/session";

export function hasOrgWideClientAccess(role: OrgRole): boolean {
  return ORG_WIDE_ROLE_VALUES.has(role);
}

/**
 * The set of client IDs this actor may see, or `null` meaning "no
 * restriction — every client in the org". Every client-scoped query in the
 * app takes this as a required parameter (not optional) specifically so a
 * page that forgets to compute and pass it is a compile error, not a silent
 * data leak — see the query functions in lib/os/queries/*.ts.
 *
 * A scoped actor sees a client if any of: it was explicitly granted
 * (ClientAccessGrant), they're its portfolioLead, or they're its
 * relationshipOwner. The latter two need no separate grant — being named as
 * a client's lead/owner already means they're staffed on it.
 */
export async function getAccessibleClientIds(actor: CurrentActor): Promise<string[] | null> {
  if (hasOrgWideClientAccess(actor.membership.role)) {
    return null;
  }

  const clients = await db.client.findMany({
    where: {
      organizationId: actor.organizationId,
      OR: [
        { portfolioLeadId: actor.membership.id },
        { relationshipOwnerId: actor.membership.id },
        { accessGrants: { some: { membershipId: actor.membership.id } } },
      ],
    },
    select: { id: true },
  });

  return clients.map((c) => c.id);
}

/** True if `clientId` is within `accessibleClientIds` (or access is unrestricted). */
export function canAccessClient(accessibleClientIds: string[] | null, clientId: string): boolean {
  return accessibleClientIds === null || accessibleClientIds.includes(clientId);
}
