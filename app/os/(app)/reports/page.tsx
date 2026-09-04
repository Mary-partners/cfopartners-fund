import type { Metadata } from "next";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { getOperationalStats, getQualityStats, getRequestStats } from "@/lib/os/queries/reports";
import { getPortfolioStats } from "@/lib/os/queries/clients";
import { StatCard } from "@/components/os/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { SERVICE_BUCKET_LABEL } from "@/components/os/status-badge";
import { TASK_STATUS_LABEL } from "@/lib/os/workflow/status";

export const metadata: Metadata = { title: "Reports & Analytics" };

export default async function ReportsPage() {
  const actor = await requireActor();
  const canViewQuality = can(actor.membership.role, "quality:view");
  const canViewRequests = can(actor.membership.role, "request:view");

  const [operational, quality, requests, portfolio] = await Promise.all([
    getOperationalStats(actor.organizationId),
    canViewQuality ? getQualityStats(actor.organizationId) : Promise.resolve(null),
    canViewRequests ? getRequestStats(actor.organizationId) : Promise.resolve(null),
    getPortfolioStats(actor.organizationId),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Reports & Analytics</h1>
        <p className="text-sm text-ink-2/70">
          Operational, quality, request and client reporting. Commercial/billing reporting isn&apos;t shown
          yet — there&apos;s no billing data (Phase 3) to report on.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-2/50">Operational</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total tasks" value={operational.totalTasks} />
          <StatCard label="Overdue" value={operational.overdueCount} hint="Due date passed, not delivered" />
          <StatCard
            label="Delivered"
            value={operational.byStatus.DELIVERED ?? 0}
            hint={`of ${operational.totalTasks} tasks`}
          />
          <StatCard
            label="Workflow instances"
            value={operational.instancesByStatus.reduce((sum, row) => sum + row.count, 0)}
          />
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Tasks by status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-2">
            {Object.entries(TASK_STATUS_LABEL).map(([status, label]) => (
              <div key={status} className="flex items-center justify-between text-sm">
                <span className="text-ink-2">{label}</span>
                <span className="font-medium text-ink">{operational.byStatus[status as keyof typeof operational.byStatus] ?? 0}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {canViewQuality && quality ? (
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-2/50">Quality</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Reviews completed" value={quality.totalReviews} />
            <StatCard
              label="Pass rate"
              value={quality.passRate === null ? "—" : `${quality.passRate}%`}
              hint="Approved on first pass"
            />
            <StatCard label="Changes requested" value={quality.changesRequested} />
          </div>
        </div>
      ) : null}

      {canViewRequests && requests ? (
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-2/50">Requests</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Total requests" value={requests.totalRequests} />
            <StatCard label="Open" value={requests.openCount} />
            <StatCard
              label="SLA compliance"
              value={requests.slaComplianceRate === null ? "—" : `${requests.slaComplianceRate}%`}
              hint="Resolved within their SLA deadline"
            />
          </div>
        </div>
      ) : null}

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-2/50">Client portfolio</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>By lifecycle stage</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 pt-2">
              {Object.entries(portfolio.lifecycleCounts).map(([stage, count]) => (
                <div key={stage} className="flex items-center justify-between text-sm">
                  <span className="text-ink-2">{stage}</span>
                  <span className="font-medium text-ink">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>By service</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 pt-2">
              {portfolio.byServiceBucket.length === 0 ? (
                <p className="text-sm text-ink-2/60">No clients yet.</p>
              ) : (
                portfolio.byServiceBucket.map((row) => (
                  <div key={row.bucket} className="flex items-center justify-between text-sm">
                    <span className="text-ink-2">{SERVICE_BUCKET_LABEL[row.bucket] ?? row.bucket}</span>
                    <span className="font-medium text-ink">{row.count}</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
