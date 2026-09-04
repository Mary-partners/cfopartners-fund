import type { RequestPriority, RequestStatus } from "@/generated/prisma/enums";

const TERMINAL_STATUSES: RequestStatus[] = ["COMPLETED", "DECLINED"];

export function isTerminalRequestStatus(status: RequestStatus): boolean {
  return TERMINAL_STATUSES.includes(status);
}

/**
 * Same "derived, not stored" shape as computeIsOverdue in
 * lib/os/workflow/status.ts — an SLA breach clears itself the instant the
 * request is resolved or its priority (and so its deadline) changes,
 * rather than needing a separate flag kept in sync by hand.
 */
export function computeIsRequestOverdue(request: { status: RequestStatus; slaDueAt: Date | null }): boolean {
  return (
    request.slaDueAt !== null && !isTerminalRequestStatus(request.status) && request.slaDueAt.getTime() < Date.now()
  );
}

const SLA_DAYS: Record<RequestPriority, number> = {
  URGENT: 1,
  HIGH: 3,
  MEDIUM: 5,
  LOW: 10,
};

/**
 * The SLA clock starts from when the request was actually raised, not from
 * whenever staff got around to triaging it — so a request that sits
 * untouched for two days doesn't quietly get two extra days added to its
 * deadline just because that's when someone opened it.
 */
export function computeSlaDueAt(priority: RequestPriority, raisedAt: Date): Date {
  const due = new Date(raisedAt);
  due.setDate(due.getDate() + SLA_DAYS[priority]);
  return due;
}

export const REQUEST_PRIORITY_LABEL: Record<RequestPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

export const REQUEST_STATUS_LABEL: Record<RequestStatus, string> = {
  NEW: "New",
  TRIAGED: "Triaged",
  AWAITING_APPROVAL: "Awaiting approval",
  IN_PROGRESS: "In progress",
  AWAITING_CLIENT: "Awaiting client",
  COMPLETED: "Completed",
  DECLINED: "Declined",
};
