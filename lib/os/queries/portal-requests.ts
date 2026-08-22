import "server-only";

import { db } from "@/lib/os/db";

/** Scoped by clientId, not organizationId — see lib/os/queries/portal-work.ts. */
export async function getRequestsForPortalClient(clientId: string) {
  return db.request.findMany({
    where: { clientId },
    orderBy: { createdAt: "desc" },
  });
}
