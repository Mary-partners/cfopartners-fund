import "server-only";

import { db } from "@/lib/os/db";

const REQUEST_INCLUDE = {
  client: { select: { id: true, name: true } },
  assignee: { select: { id: true, displayName: true, email: true } },
  raisedBy: { select: { displayName: true, email: true } },
  raisedByClientMembership: { select: { displayName: true, email: true } },
} as const;

function accessScope(accessibleClientIds: string[] | null) {
  return accessibleClientIds !== null ? { clientId: { in: accessibleClientIds } } : {};
}

/** Every open (non-terminal) request across the portfolio, SLA-soonest first. */
export async function getRequestInbox(organizationId: string, accessibleClientIds: string[] | null) {
  return db.request.findMany({
    where: { organizationId, status: { notIn: ["COMPLETED", "DECLINED"] }, ...accessScope(accessibleClientIds) },
    orderBy: [{ slaDueAt: { sort: "asc", nulls: "last" } }, { createdAt: "asc" }],
    include: REQUEST_INCLUDE,
  });
}

export async function getRecentlyResolvedRequests(
  organizationId: string,
  accessibleClientIds: string[] | null,
  limit = 20,
) {
  return db.request.findMany({
    where: { organizationId, status: { in: ["COMPLETED", "DECLINED"] }, ...accessScope(accessibleClientIds) },
    orderBy: { resolvedAt: "desc" },
    take: limit,
    include: REQUEST_INCLUDE,
  });
}

export async function getRequestsForClient(
  organizationId: string,
  clientId: string,
  accessibleClientIds: string[] | null,
) {
  if (accessibleClientIds !== null && !accessibleClientIds.includes(clientId)) {
    return [];
  }
  return db.request.findMany({
    where: { organizationId, clientId },
    orderBy: { createdAt: "desc" },
    include: REQUEST_INCLUDE,
  });
}
