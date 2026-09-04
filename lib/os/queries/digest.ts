import "server-only";

import { getOperationalStats, getQualityStats, getRequestStats } from "@/lib/os/queries/reports";
import { getPortfolioStats } from "@/lib/os/queries/clients";
import { getTeamCapacity } from "@/lib/os/queries/capacity";

/**
 * One place that gathers everything the portfolio digest email reports on.
 * Deliberately re-runs the same queries the Reports and Team pages already
 * use, rather than adding a parallel "digest" data model — the digest is a
 * different presentation of the same numbers, not a different source of
 * truth for them.
 */
export async function getPortfolioDigestData(organizationId: string) {
  const [operational, quality, requests, portfolio, capacity] = await Promise.all([
    getOperationalStats(organizationId),
    getQualityStats(organizationId),
    getRequestStats(organizationId),
    getPortfolioStats(organizationId),
    getTeamCapacity(organizationId),
  ]);

  // Overdue task count is the only capacity signal grounded in real data —
  // there's no time-tracking yet (see the comment on getTeamCapacity), so
  // this can't weigh workload against declared capacity hours, only flag
  // members who are visibly behind.
  const membersWithOverdueTasks = capacity
    .filter((m) => m.overdueTaskCount > 0)
    .sort((a, b) => b.overdueTaskCount - a.overdueTaskCount)
    .slice(0, 5);

  return { operational, quality, requests, portfolio, capacity, membersWithOverdueTasks };
}
