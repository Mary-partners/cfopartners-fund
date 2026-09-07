import "server-only";

import { db } from "@/lib/os/db";

/**
 * Every query here takes organizationId and filters by it — see the note
 * at the top of lib/os/queries/clients.ts for what this is and isn't. The
 * client-scoped queries (everything below the template functions) also take
 * `accessibleClientIds` — see lib/os/auth/client-access.ts.
 */

export async function getWorkflowTemplates(organizationId: string) {
  return db.workflowTemplate.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
    include: { taskTemplates: { orderBy: { order: "asc" } } },
  });
}

export async function getWorkflowTemplateById(organizationId: string, id: string) {
  return db.workflowTemplate.findFirst({
    where: { id, organizationId },
    include: { taskTemplates: { orderBy: { order: "asc" } } },
  });
}

export async function getActiveWorkflowTemplates(organizationId: string) {
  return db.workflowTemplate.findMany({
    where: { organizationId, isActive: true },
    orderBy: { name: "asc" },
  });
}

export async function getWorkflowInstances(organizationId: string, accessibleClientIds: string[] | null) {
  return db.workflowInstance.findMany({
    where: { organizationId, ...(accessibleClientIds !== null ? { clientId: { in: accessibleClientIds } } : {}) },
    orderBy: { periodStart: "desc" },
    include: {
      client: { select: { id: true, name: true } },
      tasks: { select: { status: true, dueDate: true } },
    },
  });
}

export async function getWorkflowInstanceById(
  organizationId: string,
  id: string,
  accessibleClientIds: string[] | null,
) {
  return db.workflowInstance.findFirst({
    where: {
      id,
      organizationId,
      ...(accessibleClientIds !== null ? { clientId: { in: accessibleClientIds } } : {}),
    },
    include: {
      client: { select: { id: true, name: true } },
      workflowTemplate: { select: { id: true, name: true } },
      tasks: {
        orderBy: { order: "asc" },
        include: {
          assignee: { select: { id: true, displayName: true, email: true } },
          documents: { orderBy: { createdAt: "desc" } },
        },
      },
    },
  });
}

export async function getWorkflowInstancesForClient(
  organizationId: string,
  clientId: string,
  accessibleClientIds: string[] | null,
) {
  if (accessibleClientIds !== null && !accessibleClientIds.includes(clientId)) {
    return [];
  }
  return db.workflowInstance.findMany({
    where: { organizationId, clientId },
    orderBy: { periodStart: "desc" },
    include: { tasks: { select: { status: true, dueDate: true } } },
  });
}

/** Every task across the portfolio with a due date, for the Calendar view. */
export async function getUpcomingTasks(organizationId: string, accessibleClientIds: string[] | null) {
  return db.task.findMany({
    where: {
      workflowInstance: {
        organizationId,
        ...(accessibleClientIds !== null ? { clientId: { in: accessibleClientIds } } : {}),
      },
      status: { not: "DELIVERED" },
    },
    orderBy: { dueDate: "asc" },
    include: {
      workflowInstance: {
        select: { id: true, name: true, client: { select: { id: true, name: true } } },
      },
      assignee: { select: { displayName: true, email: true } },
    },
  });
}
