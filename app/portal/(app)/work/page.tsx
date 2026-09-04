import type { Metadata } from "next";
import Link from "next/link";
import { requirePortalActor } from "@/lib/os/auth/portal-session";
import { getWorkflowInstancesForPortalClient } from "@/lib/os/queries/portal-work";
import { Card, CardContent } from "@/components/os/ui/card";
import { WorkflowInstanceStatusBadge } from "@/components/os/workflow-status-badge";
import { ProgressBar } from "@/components/os/progress-bar";
import { computeWorkflowProgress, computeIsOverdue } from "@/lib/os/workflow/status";

export const metadata: Metadata = { title: "Work" };

export default async function PortalWorkPage() {
  const actor = await requirePortalActor();
  const instances = await getWorkflowInstancesForPortalClient(actor.clientId);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Work</h1>
        <p className="text-sm text-ink-2/70">{instances.length} workflow instances for {actor.clientName}.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {instances.length === 0 ? (
            <p className="p-5 text-sm text-ink-2/60">No work has started yet.</p>
          ) : (
            <ul className="divide-y divide-ink/5">
              {instances.map((instance) => {
                const progress = computeWorkflowProgress(instance.tasks);
                const overdueCount = instance.tasks.filter(computeIsOverdue).length;
                return (
                  <li key={instance.id} className="flex flex-col gap-2 px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Link
                          href={`/portal/work/${instance.id}`}
                          className="font-medium text-ink hover:underline"
                        >
                          {instance.name}
                        </Link>
                        <div className="text-xs text-ink-2/50">
                          Period {new Date(instance.periodStart).toLocaleDateString()} –{" "}
                          {new Date(instance.periodEnd).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {overdueCount > 0 ? (
                          <span className="text-xs font-medium text-red-700">{overdueCount} overdue</span>
                        ) : null}
                        <WorkflowInstanceStatusBadge status={instance.status} />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ProgressBar percent={progress} />
                      <span className="w-10 shrink-0 text-right text-xs text-ink-2/60">{progress}%</span>
                    </div>
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
