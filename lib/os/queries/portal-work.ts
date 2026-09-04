import "server-only";

import { db } from "@/lib/os/db";

/**
 * Every query here takes `clientId` — never `organizationId` alone — as the
 * scoping key, and filters on it directly. That's the boundary that
 * actually matters for the portal: two clients in the *same* practice must
 * never see each other's work, a stricter requirement than internal
 * queries (lib/os/queries/workflow.ts) enforce, since those only need to
 * keep separate *organizations* apart.
 */
export async function getWorkflowInstancesForPortalClient(clientId: string) {
  return db.workflowInstance.findMany({
    where: { clientId },
    orderBy: { periodStart: "desc" },
    include: { tasks: { select: { status: true, dueDate: true } } },
  });
}

export async function getWorkflowInstanceForPortalClient(clientId: string, instanceId: string) {
  return db.workflowInstance.findFirst({
    where: { id: instanceId, clientId },
    include: {
      tasks: {
        orderBy: { order: "asc" },
        include: {
          documents: { orderBy: { createdAt: "desc" } },
          clientApprovals: {
            orderBy: { createdAt: "desc" },
            take: 1,
            include: { clientMembership: { select: { displayName: true, email: true } } },
          },
        },
      },
    },
  });
}
