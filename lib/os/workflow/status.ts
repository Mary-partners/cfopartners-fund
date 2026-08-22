import type {
  TaskStatus,
  WorkflowInstanceStatus,
  ReviewOutcome,
  ClientApprovalOutcome,
} from "@/generated/prisma/enums";

/**
 * "Overdue" is not a stored status — it's derived here from the due date
 * and current status, so fixing a due date or completing a task always
 * immediately clears it. See the TaskStatus enum comment in schema.prisma.
 */
export function computeIsOverdue(task: { status: TaskStatus; dueDate: Date }): boolean {
  return task.status !== "DELIVERED" && task.dueDate.getTime() < Date.now();
}

export function computeWorkflowProgress(tasks: { status: TaskStatus }[]): number {
  if (tasks.length === 0) return 0;
  const delivered = tasks.filter((t) => t.status === "DELIVERED").length;
  return Math.round((delivered / tasks.length) * 100);
}

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  BLOCKED: "Blocked",
  AWAITING_CLIENT: "Awaiting client",
  UNDER_REVIEW: "Under review",
  APPROVED: "Approved",
  DELIVERED: "Delivered",
};

export const TASK_STATUS_ORDER: TaskStatus[] = [
  "NOT_STARTED",
  "IN_PROGRESS",
  "BLOCKED",
  "AWAITING_CLIENT",
  "UNDER_REVIEW",
  "APPROVED",
  "DELIVERED",
];

export const WORKFLOW_INSTANCE_STATUS_LABEL: Record<WorkflowInstanceStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const REVIEW_OUTCOME_LABEL: Record<ReviewOutcome, string> = {
  APPROVED: "Approved",
  CHANGES_REQUESTED: "Changes requested",
};

/**
 * Same string values as ReviewOutcome (internal Quality review) — a
 * deliberately separate enum/label map anyway, since ClientApproval and
 * Review are separate models with separate actor types. See the comment on
 * the ClientApproval model in schema.prisma.
 */
export const CLIENT_APPROVAL_OUTCOME_LABEL: Record<ClientApprovalOutcome, string> = {
  APPROVED: "Approved",
  CHANGES_REQUESTED: "Changes requested",
};
