import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requirePortalActor } from "@/lib/os/auth/portal-session";
import { canPortal } from "@/lib/os/auth/portal-rbac";
import { getWorkflowInstanceForPortalClient } from "@/lib/os/queries/portal-work";
import { formatFileSize } from "@/lib/os/documents-shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { WorkflowInstanceStatusBadge, TaskStatusBadge } from "@/components/os/workflow-status-badge";
import { ProgressBar } from "@/components/os/progress-bar";
import { computeWorkflowProgress } from "@/lib/os/workflow/status";
import { ClientApprovalForm } from "@/components/os/portal/client-approval-form";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const actor = await requirePortalActor();
  const instance = await getWorkflowInstanceForPortalClient(actor.clientId, id);
  return { title: instance?.name ?? "Work" };
}

export default async function PortalWorkflowInstanceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const actor = await requirePortalActor();
  const instance = await getWorkflowInstanceForPortalClient(actor.clientId, id);
  if (!instance) notFound();

  const canApprove = canPortal(actor.clientMembership.role, "approval:submit");
  const canViewDocuments = canPortal(actor.clientMembership.role, "document:view");
  const progress = computeWorkflowProgress(instance.tasks);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">{instance.name}</h1>
          <p className="text-sm text-ink-2/70">
            Period {new Date(instance.periodStart).toLocaleDateString()} –{" "}
            {new Date(instance.periodEnd).toLocaleDateString()}
          </p>
        </div>
        <WorkflowInstanceStatusBadge status={instance.status} />
      </div>

      <div className="flex items-center gap-3">
        <ProgressBar percent={progress} />
        <span className="w-10 shrink-0 text-right text-sm text-ink-2/60">{progress}%</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasks ({instance.tasks.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {instance.tasks.length === 0 ? (
            <p className="p-5 text-sm text-ink-2/60">No tasks on this workflow yet.</p>
          ) : (
            <ul className="divide-y divide-ink/5">
              {instance.tasks.map((task) => {
                const latestApproval = task.clientApprovals[0];
                return (
                  <li key={task.id} className="flex flex-col gap-2 px-5 py-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-ink">{task.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-ink-2/50">
                          Due {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        <TaskStatusBadge task={task} />
                      </div>
                    </div>

                    {canViewDocuments && task.documents.length > 0 ? (
                      <ul className="flex flex-wrap gap-x-4 gap-y-1">
                        {task.documents.map((doc) => (
                          <li key={doc.id} className="text-xs">
                            <a
                              href={`/portal/documents/${doc.id}/download`}
                              className="text-ink hover:underline"
                            >
                              {doc.fileName}
                            </a>{" "}
                            <span className="text-ink-2/40">({formatFileSize(doc.sizeBytes)})</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {latestApproval ? (
                      <p className="text-xs text-ink-2/50">
                        {latestApproval.outcome === "APPROVED" ? "Approved" : "Changes requested"} by{" "}
                        {latestApproval.clientMembership.displayName ?? latestApproval.clientMembership.email}
                        {latestApproval.comments ? ` — "${latestApproval.comments}"` : ""}
                      </p>
                    ) : null}

                    {task.status === "APPROVED" ? (
                      canApprove ? (
                        <div className="mt-1 max-w-md">
                          <ClientApprovalForm taskId={task.id} />
                        </div>
                      ) : (
                        <p className="text-xs text-ink-2/50">
                          Ready for your team's sign-off — ask a Client Admin to approve or request
                          changes.
                        </p>
                      )
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
