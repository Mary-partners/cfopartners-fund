import "server-only";

import { db } from "@/lib/os/db";
import { ClientLifecycleStage } from "@/generated/prisma/enums";
import type { Prisma } from "@/generated/prisma/client";

/**
 * Every query in this module takes `organizationId` and filters by it
 * explicitly. This is Phase 0's tenant-isolation boundary; Postgres Row
 * Level Security policies (see /docs/security.md) are the planned
 * defense-in-depth layer once a second organization exists.
 *
 * They also all take `accessibleClientIds` — `null` for org-wide roles,
 * otherwise the specific client IDs that actor may see (see
 * lib/os/auth/client-access.ts). It's a required parameter, not optional,
 * so a caller that forgets to compute it is a compile error rather than a
 * client-confidentiality leak.
 */

function accessWhere(accessibleClientIds: string[] | null): Prisma.ClientWhereInput {
  return accessibleClientIds === null ? {} : { id: { in: accessibleClientIds } };
}

export async function getPortfolioStats(organizationId: string, accessibleClientIds: string[] | null) {
  const scope = { organizationId, ...accessWhere(accessibleClientIds) };
  const [total, byLifecycle, bucketCounts] = await Promise.all([
    db.client.count({ where: scope }),
    db.client.groupBy({
      by: ["lifecycleStage"],
      where: scope,
      _count: { _all: true },
    }),
    db.client.groupBy({
      by: ["serviceBucket"],
      where: scope,
      _count: { _all: true },
    }),
  ]);

  const lifecycleCounts = Object.fromEntries(
    Object.values(ClientLifecycleStage).map((stage) => [stage, 0]),
  ) as Record<ClientLifecycleStage, number>;
  for (const row of byLifecycle) {
    lifecycleCounts[row.lifecycleStage] = row._count._all;
  }

  return {
    total,
    lifecycleCounts,
    activeCount: lifecycleCounts.ACTIVE,
    onboardingCount: lifecycleCounts.ONBOARDING,
    atRiskCount: lifecycleCounts.AT_RISK,
    watchCount: lifecycleCounts.WATCH,
    byServiceBucket: bucketCounts.map((row) => ({
      bucket: row.serviceBucket,
      count: row._count._all,
    })),
  };
}

export async function getClientList(organizationId: string, accessibleClientIds: string[] | null) {
  return db.client.findMany({
    where: { organizationId, ...accessWhere(accessibleClientIds) },
    orderBy: { updatedAt: "desc" },
    include: {
      portfolioLead: { select: { displayName: true, email: true } },
      relationshipOwner: { select: { displayName: true, email: true } },
    },
  });
}

export async function getClientOptions(organizationId: string, accessibleClientIds: string[] | null) {
  return db.client.findMany({
    where: { organizationId, ...accessWhere(accessibleClientIds) },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

export async function getClientById(organizationId: string, clientId: string, accessibleClientIds: string[] | null) {
  if (accessibleClientIds !== null && !accessibleClientIds.includes(clientId)) {
    return null;
  }
  return db.client.findFirst({
    where: { id: clientId, organizationId },
    include: {
      contacts: true,
      portfolioLead: { select: { displayName: true, email: true } },
      relationshipOwner: { select: { displayName: true, email: true } },
    },
  });
}
