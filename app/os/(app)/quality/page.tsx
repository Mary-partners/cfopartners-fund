import type { Metadata } from "next";
import Link from "next/link";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import {
  getReviewQueue,
  getRecentReviews,
  getClientApprovalQueue,
  getRecentClientApprovals,
} from "@/lib/os/queries/quality";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import {
  TaskStatusBadge,
  ReviewOutcomeBadge,
  ClientApprovalOutcomeBadge,
} from "@/components/os/workflow-status-badge";
import { ReviewTaskForm } from "@/components/os/review-task-form";

export const metadata: Metadata = { title: "Quality" };

export default async function QualityPage() {
  const actor = await requireActor();
  const canView = can(actor.membership.role, "quality:view");
  const canReviewPermission = can(actor.membership.role, "quality:review");

  if (!canView) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-ink">Quality</h1>
        <p className="text-sm text-ink-2/60">
          Your role doesn&apos;t have permission to view quality review.
        </p>
      </div>
    );
  }

  const [queue, recentReviews, clientApprovalQueue, recentClientApprovals] = await Promise.all([
    getReviewQueue(actor.organizationId),
    getRecentReviews(actor.organizationId),
    getClientApprovalQueue(actor.organizationId),
    getRecentClientApprovals(actor.organizationId),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Quality</h1>
        <p className="text-sm text-ink-2/70">
          {queue.length} task{queue.length === 1 ? "" : "s"} awaiting review.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Awaiting review</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {queue.length === 0 ? (
            <p className="p-5 text-sm text-ink-2/60">Nothing is waiting on a review right now.</p>
          ) : (
            <ul className="divide-y divide-ink/5">
              {queue.map((task) => {
                const preparerIsReviewer = task.assigneeMembershipId === actor.membership.id;
                return (
                  <li
                    key={task.id}
                    className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div>
                      <Link
                        href={`/os/work/${task.workflowInstance.id}`}
                        className="text-sm font-medium text-ink hover:underline"
                      >
                        {task.title}
                      </Link>
                      <div className="text-xs text-ink-2/50">
                        <Link
                          href={`/os/clients/${task.workflowInstance.client.id}`}
                          className="hover:underline"
                        >
                          {task.workflowInstance.client.name}
                        </Link>{" "}
                        · {task.workflowInstance.name} · prepared by{" "}
                        {task.assignee?.displayName ?? task.assignee?.email ?? "unassigned"} · due{" "}
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <div className="mt-1">
                        <TaskStatusBadge task={task} />
                      </div>
                    </div>
                    <div className="w-full sm:w-80">
                      {canReviewPermission ? (
                        preparerIsReviewer ? (
                          <p className="text-xs text-ink-2/50">
                            You prepared this task, so you can&apos;t review it — ask someone else.
                          </p>
                        ) : (
                          <ReviewTaskForm taskId={task.id} />
                        )
                      ) : (
                        <p className="text-xs text-ink-2/50">Your role can&apos;t submit reviews.</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Awaiting client approval ({clientApprovalQueue.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {clientApprovalQueue.length === 0 ? (
            <p className="p-5 text-sm text-ink-2/60">
              Nothing is waiting on a client sign-off right now.
            </p>
          ) : (
            <ul className="divide-y divide-ink/5">
              {clientApprovalQueue.map((task) => (
                <li key={task.id} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <Link
                      href={`/os/work/${task.workflowInstance.id}`}
                      className="text-sm font-medium text-ink hover:underline"
                    >
                      {task.title}
                    </Link>
                    <div className="text-xs text-ink-2/50">
                      <Link
                        href={`/os/clients/${task.workflowInstance.client.id}`}
                        className="hover:underline"
                      >
                        {task.workflowInstance.client.name}
                      </Link>{" "}
                      · {task.workflowInstance.name} · due{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <TaskStatusBadge task={task} />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent reviews</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {recentReviews.length === 0 ? (
            <p className="p-5 text-sm text-ink-2/60">No reviews recorded yet.</p>
          ) : (
            <ul className="divide-y divide-ink/5">
              {recentReviews.map((review) => (
                <li key={review.id} className="px-5 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Link
                        href={`/os/work/${review.task.workflowInstance.id}`}
                        className="text-sm font-medium text-ink hover:underline"
                      >
                        {review.task.title}
                      </Link>
                      <div className="text-xs text-ink-2/50">
                        {review.task.workflowInstance.client.name} · reviewed by{" "}
                        {review.reviewer.displayName ?? review.reviewer.email}
                        {review.preparer
                          ? ` · prepared by ${review.preparer.displayName ?? review.preparer.email}`
                          : ""}{" "}
                        · {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <ReviewOutcomeBadge outcome={review.outcome} />
                  </div>
                  {review.comments ? (
                    <p className="mt-1 text-xs text-ink-2/70">&ldquo;{review.comments}&rdquo;</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent client approvals</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {recentClientApprovals.length === 0 ? (
            <p className="p-5 text-sm text-ink-2/60">No client approvals recorded yet.</p>
          ) : (
            <ul className="divide-y divide-ink/5">
              {recentClientApprovals.map((approval) => (
                <li key={approval.id} className="px-5 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Link
                        href={`/os/work/${approval.task.workflowInstance.id}`}
                        className="text-sm font-medium text-ink hover:underline"
                      >
                        {approval.task.title}
                      </Link>
                      <div className="text-xs text-ink-2/50">
                        {approval.task.workflowInstance.client.name} ·{" "}
                        {approval.clientMembership.displayName ?? approval.clientMembership.email} ·{" "}
                        {new Date(approval.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <ClientApprovalOutcomeBadge outcome={approval.outcome} />
                  </div>
                  {approval.comments ? (
                    <p className="mt-1 text-xs text-ink-2/70">&ldquo;{approval.comments}&rdquo;</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
