import { Badge, type BadgeProps } from "@/components/os/ui/badge";
import {
  TASK_STATUS_LABEL,
  WORKFLOW_INSTANCE_STATUS_LABEL,
  REVIEW_OUTCOME_LABEL,
  CLIENT_APPROVAL_OUTCOME_LABEL,
  computeIsOverdue,
} from "@/lib/os/workflow/status";
import type {
  TaskStatus,
  WorkflowInstanceStatus,
  ReviewOutcome,
  ClientApprovalOutcome,
} from "@/generated/prisma/enums";

const TASK_STATUS_TONE: Record<TaskStatus, BadgeProps["tone"]> = {
  NOT_STARTED: "neutral",
  IN_PROGRESS: "info",
  BLOCKED: "danger",
  AWAITING_CLIENT: "warning",
  UNDER_REVIEW: "gold",
  APPROVED: "info",
  DELIVERED: "success",
};

export function TaskStatusBadge({ task }: { task: { status: TaskStatus; dueDate: Date } }) {
  if (computeIsOverdue(task)) {
    return <Badge tone="danger">Overdue</Badge>;
  }
  return <Badge tone={TASK_STATUS_TONE[task.status]}>{TASK_STATUS_LABEL[task.status]}</Badge>;
}

const WORKFLOW_INSTANCE_STATUS_TONE: Record<WorkflowInstanceStatus, BadgeProps["tone"]> = {
  OPEN: "info",
  IN_PROGRESS: "info",
  COMPLETED: "success",
  CANCELLED: "neutral",
};

export function WorkflowInstanceStatusBadge({ status }: { status: WorkflowInstanceStatus }) {
  return (
    <Badge tone={WORKFLOW_INSTANCE_STATUS_TONE[status]}>
      {WORKFLOW_INSTANCE_STATUS_LABEL[status]}
    </Badge>
  );
}

const REVIEW_OUTCOME_TONE: Record<ReviewOutcome, BadgeProps["tone"]> = {
  APPROVED: "success",
  CHANGES_REQUESTED: "warning",
};

export function ReviewOutcomeBadge({ outcome }: { outcome: ReviewOutcome }) {
  return <Badge tone={REVIEW_OUTCOME_TONE[outcome]}>{REVIEW_OUTCOME_LABEL[outcome]}</Badge>;
}

const CLIENT_APPROVAL_OUTCOME_TONE: Record<ClientApprovalOutcome, BadgeProps["tone"]> = {
  APPROVED: "success",
  CHANGES_REQUESTED: "warning",
};

export function ClientApprovalOutcomeBadge({ outcome }: { outcome: ClientApprovalOutcome }) {
  return (
    <Badge tone={CLIENT_APPROVAL_OUTCOME_TONE[outcome]}>{CLIENT_APPROVAL_OUTCOME_LABEL[outcome]}</Badge>
  );
}
