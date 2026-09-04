import "server-only";

import { db } from "@/lib/os/db";

/**
 * Every query here takes `organizationId` and re-derives `clientId` scoping
 * through it (never trusts a bare clientId from the caller) — same
 * tenant-isolation boundary as every other query module, see
 * lib/os/queries/clients.ts.
 */
export async function getClientMembershipsForClient(organizationId: string, clientId: string) {
  const client = await db.client.findFirst({
    where: { id: clientId, organizationId },
    select: { id: true },
  });
  if (!client) return [];

  return db.clientMembership.findMany({
    where: { clientId },
    orderBy: { createdAt: "asc" },
    include: {
      invitedBy: { select: { displayName: true, email: true } },
    },
  });
}
