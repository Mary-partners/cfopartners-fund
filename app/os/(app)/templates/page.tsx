import type { Metadata } from "next";
import Link from "next/link";
import { requireActor } from "@/lib/os/auth/session";
import { getWorkflowTemplates } from "@/lib/os/queries/workflow";
import { can } from "@/lib/os/auth/rbac";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { SERVICE_BUCKET_LABEL } from "@/components/os/status-badge";
import { RECURRENCE_LABEL } from "@/lib/os/workflow/period";
import { NewTemplateForm } from "@/components/os/new-template-form";

export const metadata: Metadata = { title: "Templates & Automations" };

export default async function TemplatesPage() {
  const actor = await requireActor();
  const templates = await getWorkflowTemplates(actor.organizationId);
  const canManage = can(actor.membership.role, "workflow:manageTemplates");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Templates & Automations</h1>
        <p className="text-sm text-ink-2/70">
          Reusable recipes for recurring and one-off work. Instantiate one for a client from{" "}
          <Link href="/os/work" className="underline">
            Work
          </Link>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            {templates.length === 0 ? (
              <p className="p-5 text-sm text-ink-2/60">
                No templates yet. Create the first one from the panel on the right.
              </p>
            ) : (
              <ul className="divide-y divide-ink/5">
                {templates.map((template) => (
                  <li key={template.id} className="flex items-center justify-between px-5 py-3.5">
                    <div>
                      <Link
                        href={`/os/templates/${template.id}`}
                        className="font-medium text-ink hover:underline"
                      >
                        {template.name}
                      </Link>
                      <div className="text-xs text-ink-2/50">
                        {SERVICE_BUCKET_LABEL[template.serviceBucket] ?? template.serviceBucket} ·{" "}
                        {RECURRENCE_LABEL[template.recurrence]} · {template.taskTemplates.length}{" "}
                        task{template.taskTemplates.length === 1 ? "" : "s"}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New template</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            {canManage ? (
              <NewTemplateForm />
            ) : (
              <p className="text-sm text-ink-2/60">
                Your role doesn&apos;t have permission to create templates. Ask a Managing
                Partner, Practice Administrator or Service Lead.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
