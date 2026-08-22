import "server-only";

import { db } from "@/lib/os/db";
import { computeIsOverdue } from "@/lib/os/workflow/status";

/**
 * Workload (assigned open tasks, clients led/owned) is measured from real
 * data; weeklyCapacityHours is a manager-declared target, not a measured
 * actual — there's no time-tracking data yet (Billing/Time entry is Phase
 * 3). See the comment on Membership.weeklyCapacityHours in schema.prisma.
 */
export async function getTeamCapacity(organizationId: string) {
  const members = await db.membership.findMany({
    where: { organizationId, isActive: true },
    orderBy: [{ role: "asc" }, { displayName: "asc" }],
    include: {
      _count: { select: { portfolioLeadFor: true, relationshipOwnerFor: true } },
      assignedTasks: {
        where: { workflowInstance: { organizationId }, status: { not: "DELIVERED" } },
        select: { status: true, dueDate: true },
      },
    },
  });

  return members.map((member) => ({
    id: member.id,
    displayName: member.displayName,
    email: member.email,
    role: member.role,
    weeklyCapacityHours: member.weeklyCapacityHours,
    openTaskCount: member.assignedTasks.length,
    overdueTaskCount: member.assignedTasks.filter(computeIsOverdue).length,
    clientsLedCount: member._count.portfolioLeadFor + member._count.relationshipOwnerFor,
  }));
}
