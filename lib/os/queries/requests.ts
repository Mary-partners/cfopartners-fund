import "server-only";

import { db } from "@/lib/os/db";

const REQUEST_INCLUDE = {
  client: { select: { id: true, name: true } },
  assignee: { select: { id: true, displayName: true, email: true } },
  raisedBy: { select: { displayName: true, email: true } },
  raisedByClientMembership: { select: { displayName: true, email: true } },
} as const;

/** Every open (non-terminal) request across the portfolio, SLA-soonest first. */
export async function getRequestInbox(organizationId: string) {
  return db.request.findMany({
    where: { organizationId, status: { notIn: ["COMPLETED", "DECLINED"] } },
    orderBy: [{ slaDueAt: { sort: "asc", nulls: "last" } }, { createdAt: "asc" }],
    include: REQUEST_INCLUDE,
  });
}

export async function getRecentlyResolvedRequests(organizationId: string, limit = 20) {
  return db.request.findMany({
    where: { organizationId, status: { in: ["COMPLETED", "DECLINED"] } },
    orderBy: { resolvedAt: "desc" },
    take: limit,
    include: REQUEST_INCLUDE,
  });
}

export async function getRequestsForClient(organizationId: string, clientId: string) {
  return db.request.findMany({
    where: { organizationId, clientId },
    orderBy: { createdAt: "desc" },
    include: REQUEST_INCLUDE,
  });
}
