import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireActor } from "@/lib/os/auth/session";
import { getWorkflowTemplateById } from "@/lib/os/queries/workflow";
import { can } from "@/lib/os/auth/rbac";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { SERVICE_BUCKET_LABEL } from "@/components/os/status-badge";
import { RECURRENCE_LABEL } from "@/lib/os/workflow/period";
import { AddTaskTemplateForm } from "@/components/os/add-task-template-form";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const actor = await requireActor();
  const template = await getWorkflowTemplateById(actor.organizationId, id);
  return { title: template?.name ?? "Template" };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const actor = await requireActor();
  const template = await getWorkflowTemplateById(actor.organizationId, id);
  if (!template) notFound();

  const canManage = can(actor.membership.role, "workflow:manageTemplates");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">{template.name}</h1>
        <p className="text-sm text-ink-2/70">
          {SERVICE_BUCKET_LABEL[template.serviceBucket] ?? template.serviceBucket} ·{" "}
          {RECURRENCE_LABEL[template.recurrence]}
        </p>
        {template.description ? (
          <p className="mt-2 max-w-2xl text-sm text-ink-2">{template.description}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tasks ({template.taskTemplates.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {template.taskTemplates.length === 0 ? (
              <p className="p-5 text-sm text-ink-2/60">
                No tasks yet. Add the first one from the panel on the right — instantiating this
                template for a client will create one task per template task, due that many days
                into the period.
              </p>
            ) : (
              <ol className="divide-y divide-ink/5">
                {template.taskTemplates.map((tt, index) => (
                  <li key={tt.id} className="flex items-center justify-between px-5 py-3">
                    <span className="text-sm text-ink">
                      <span className="mr-2 text-ink-2/40">{index + 1}.</span>
                      {tt.title}
                    </span>
                    <span className="text-xs text-ink-2/50">
                      Due day {tt.relativeDueDays}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add a task</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            {canManage ? (
              <AddTaskTemplateForm
                workflowTemplateId={template.id}
                nextOrder={template.taskTemplates.length}
              />
            ) : (
              <p className="text-sm text-ink-2/60">
                Your role doesn&apos;t have permission to edit templates.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
