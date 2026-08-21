import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireActor } from "@/lib/os/auth/session";
import { getWorkflowInstanceById } from "@/lib/os/queries/workflow";
import { db } from "@/lib/os/db";
import { can } from "@/lib/os/auth/rbac";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { WorkflowInstanceStatusBadge, TaskStatusBadge } from "@/components/os/workflow-status-badge";
import { ProgressBar } from "@/components/os/progress-bar";
import { computeWorkflowProgress } from "@/lib/os/workflow/status";
import { TaskStatusForm } from "@/components/os/task-status-form";
import { TaskAssigneeForm } from "@/components/os/task-assignee-form";
import { DocumentUploadForm } from "@/components/os/document-upload-form";
import { DeleteDocumentButton } from "@/components/os/delete-document-button";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const actor = await requireActor();
  const instance = await getWorkflowInstanceById(actor.organizationId, id);
  return { title: instance?.name ?? "Work" };
}

export default async function WorkflowInstanceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const actor = await requireActor();
  const [instance, members] = await Promise.all([
    getWorkflowInstanceById(actor.organizationId, id),
    db.membership.findMany({
      where: { organizationId: actor.organizationId, isActive: true },
      select: { id: true, displayName: true, email: true },
    }),
  ]);
  if (!instance) notFound();

  const canUpdateStatus = can(actor.membership.role, "task:updateStatus");
  const canAssign = can(actor.membership.role, "task:assign");
  const canViewDocuments = can(actor.membership.role, "document:view");
  const canUploadDocuments = can(actor.membership.role, "document:upload");
  const canDeleteDocuments = can(actor.membership.role, "document:delete");
  const progress = computeWorkflowProgress(instance.tasks);
  const memberOptions = members.map((m) => ({ id: m.id, label: m.displayName ?? m.email }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">{instance.name}</h1>
          <p className="text-sm text-ink-2/70">
            <Link href={`/os/clients/${instance.client.id}`} className="underline">
              {instance.client.name}
            </Link>{" "}
            · period {new Date(instance.periodStart).toLocaleDateString()} –{" "}
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
            <p className="p-5 text-sm text-ink-2/60">
              This workflow instance has no tasks (it may have been started from a template with
              none defined yet).
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-2/50">
                  <th scope="col" className="px-5 py-3 font-medium">
                    Task
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    Due
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    Assignee
                  </th>
                  {canViewDocuments ? (
                    <th scope="col" className="px-5 py-3 font-medium">
                      Documents
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {instance.tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-5 py-3 text-ink">{task.title}</td>
                    <td className="px-5 py-3 text-ink-2">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <TaskStatusBadge task={task} />
                        {canUpdateStatus ? (
                          <TaskStatusForm taskId={task.id} currentStatus={task.status} />
                        ) : null}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {canAssign ? (
                        <TaskAssigneeForm
                          taskId={task.id}
                          currentAssigneeId={task.assignee?.id ?? null}
                          members={memberOptions}
                        />
                      ) : (
                        <span className="text-ink-2">
                          {task.assignee?.displayName ?? task.assignee?.email ?? "Unassigned"}
                        </span>
                      )}
                    </td>
                    {canViewDocuments ? (
                      <td className="min-w-[220px] px-5 py-3">
                        <div className="flex flex-col gap-1.5">
                          {task.documents.length > 0 ? (
                            <ul className="flex flex-col gap-1">
                              {task.documents.map((doc) => (
                                <li key={doc.id} className="flex items-center gap-1.5 text-xs">
                                  <a
                                    href={`/os/documents/${doc.id}/download`}
                                    className="max-w-[140px] truncate text-ink hover:underline"
                                    title={doc.fileName}
                                  >
                                    {doc.fileName}
                                  </a>
                                  {canDeleteDocuments ? (
                                    <DeleteDocumentButton documentId={doc.id} fileName={doc.fileName} />
                                  ) : null}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          {canUploadDocuments ? (
                            <DocumentUploadForm fixedTaskId={task.id} compact />
                          ) : null}
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
