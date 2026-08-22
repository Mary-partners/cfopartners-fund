import "server-only";

import { db } from "@/lib/os/db";
import { computeIsOverdue } from "@/lib/os/workflow/status";
import type { TaskStatus } from "@/generated/prisma/enums";

/**
 * Operational, quality and request reporting — drawn from Task/Review/
 * Request, the modules that actually have data flowing through them.
 * Deliberately no commercial/billing report here: there's no billing data
 * yet (Phase 3), and faking a number from data that doesn't exist would be
 * worse than not showing the section at all. See
 * /docs/implementation-plan.md "Reporting" for what's deferred and why.
 */
export async function getOperationalStats(organizationId: string) {
  const tasks = await db.task.findMany({
    where: { workflowInstance: { organizationId } },
    select: { status: true, dueDate: true },
  });

  const byStatus = {} as Record<TaskStatus, number>;
  for (const task of tasks) {
    byStatus[task.status] = (byStatus[task.status] ?? 0) + 1;
  }
  const overdueCount = tasks.filter(computeIsOverdue).length;

  const instances = await db.workflowInstance.groupBy({
    by: ["status"],
    where: { organizationId },
    _count: { _all: true },
  });

  return {
    totalTasks: tasks.length,
    byStatus,
    overdueCount,
    instancesByStatus: instances.map((row) => ({ status: row.status, count: row._count._all })),
  };
}

export async function getQualityStats(organizationId: string) {
  const reviews = await db.review.findMany({
    where: { task: { workflowInstance: { organizationId } } },
    select: { outcome: true },
  });
  const approved = reviews.filter((r) => r.outcome === "APPROVED").length;
  const changesRequested = reviews.length - approved;

  return {
    totalReviews: reviews.length,
    approved,
    changesRequested,
    passRate: reviews.length === 0 ? null : Math.round((approved / reviews.length) * 100),
  };
}

export async function getRequestStats(organizationId: string) {
  const requests = await db.request.findMany({
    where: { organizationId },
    select: { status: true, slaDueAt: true, resolvedAt: true },
  });
  const resolved = requests.filter((r) => r.status === "COMPLETED" || r.status === "DECLINED");
  const openCount = requests.length - resolved.length;

  const resolvedWithSla = resolved.filter((r) => r.slaDueAt !== null && r.resolvedAt !== null);
  const withinSlaCount = resolvedWithSla.filter((r) => r.resolvedAt! <= r.slaDueAt!).length;

  return {
    totalRequests: requests.length,
    openCount,
    resolvedCount: resolved.length,
    slaComplianceRate:
      resolvedWithSla.length === 0 ? null : Math.round((withinSlaCount / resolvedWithSla.length) * 100),
  };
}
