import { Badge, type BadgeProps } from "@/components/os/ui/badge";
import { REQUEST_STATUS_LABEL, REQUEST_PRIORITY_LABEL, computeIsRequestOverdue } from "@/lib/os/requests/status";
import type { RequestStatus, RequestPriority } from "@/generated/prisma/enums";

const REQUEST_STATUS_TONE: Record<RequestStatus, BadgeProps["tone"]> = {
  NEW: "info",
  TRIAGED: "gold",
  AWAITING_APPROVAL: "warning",
  IN_PROGRESS: "info",
  AWAITING_CLIENT: "warning",
  COMPLETED: "success",
  DECLINED: "neutral",
};

export function RequestStatusBadge({ request }: { request: { status: RequestStatus; slaDueAt: Date | null } }) {
  if (computeIsRequestOverdue(request)) {
    return <Badge tone="danger">SLA breached</Badge>;
  }
  return <Badge tone={REQUEST_STATUS_TONE[request.status]}>{REQUEST_STATUS_LABEL[request.status]}</Badge>;
}

const REQUEST_PRIORITY_TONE: Record<RequestPriority, BadgeProps["tone"]> = {
  LOW: "neutral",
  MEDIUM: "info",
  HIGH: "warning",
  URGENT: "danger",
};

export function RequestPriorityBadge({ priority }: { priority: RequestPriority }) {
  return <Badge tone={REQUEST_PRIORITY_TONE[priority]}>{REQUEST_PRIORITY_LABEL[priority]}</Badge>;
}
