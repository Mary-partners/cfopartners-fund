import "server-only";

import { db } from "@/lib/os/db";

/** Every task across the portfolio currently awaiting review. */
export async function getReviewQueue(organizationId: string) {
  return db.task.findMany({
    where: { workflowInstance: { organizationId }, status: "UNDER_REVIEW" },
    orderBy: { dueDate: "asc" },
    include: {
      workflowInstance: {
        select: { id: true, name: true, client: { select: { id: true, name: true } } },
      },
      assignee: { select: { id: true, displayName: true, email: true } },
    },
  });
}

/**
 * Tasks currently sitting at APPROVED — i.e. passed internal Quality
 * review and now waiting on the client, not on staff. Read-only visibility
 * for staff (see the "Awaiting client approval" section of
 * app/os/(app)/quality/page.tsx) — only a client's own ClientApproval
 * action can move these forward.
 */
export async function getClientApprovalQueue(organizationId: string) {
  return db.task.findMany({
    where: { workflowInstance: { organizationId }, status: "APPROVED" },
    orderBy: { dueDate: "asc" },
    include: {
      workflowInstance: {
        select: { id: true, name: true, client: { select: { id: true, name: true } } },
      },
      assignee: { select: { id: true, displayName: true, email: true } },
    },
  });
}

export async function getRecentClientApprovals(organizationId: string, limit = 20) {
  return db.clientApproval.findMany({
    where: { task: { workflowInstance: { organizationId } } },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      task: {
        select: {
          id: true,
          title: true,
          workflowInstance: {
            select: { id: true, name: true, client: { select: { id: true, name: true } } },
          },
        },
      },
      clientMembership: { select: { displayName: true, email: true } },
    },
  });
}

export async function getRecentReviews(organizationId: string, limit = 20) {
  return db.review.findMany({
    where: { task: { workflowInstance: { organizationId } } },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      task: {
        select: {
          id: true,
          title: true,
          workflowInstance: {
            select: { id: true, name: true, client: { select: { id: true, name: true } } },
          },
        },
      },
      reviewer: { select: { displayName: true, email: true } },
      preparer: { select: { displayName: true, email: true } },
    },
  });
}
