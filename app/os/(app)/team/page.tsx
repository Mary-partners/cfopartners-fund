import type { Metadata } from "next";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { ROLE_LABELS } from "@/lib/os/auth/rbac";
import { getTeamCapacity } from "@/lib/os/queries/capacity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { Badge } from "@/components/os/ui/badge";
import { CapacityHoursForm } from "@/components/os/capacity-hours-form";

export const metadata: Metadata = { title: "Team & Capacity" };

export default async function TeamCapacityPage() {
  const actor = await requireActor();
  const canView = can(actor.membership.role, "team:view");

  if (!canView) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-ink">Team & Capacity</h1>
        <p className="text-sm text-ink-2/60">Your role doesn&apos;t have permission to view team capacity.</p>
      </div>
    );
  }

  const canManage = can(actor.membership.role, "team:manageCapacity");
  const team = await getTeamCapacity(actor.organizationId);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Team & Capacity</h1>
        <p className="text-sm text-ink-2/70">
          Workload across the portfolio. Weekly capacity is a target managers set — there&apos;s no
          time-tracking data yet (Phase 3), so this isn&apos;t a measured utilisation number.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{team.length} active team member{team.length === 1 ? "" : "s"}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-2/50">
                <th scope="col" className="px-5 py-3 font-medium">
                  Team member
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Role
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Clients led
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Open tasks
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Weekly capacity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {team.map((member) => (
                <tr key={member.id}>
                  <td className="px-5 py-3 text-ink">{member.displayName ?? member.email}</td>
                  <td className="px-5 py-3 text-ink-2">{ROLE_LABELS[member.role]}</td>
                  <td className="px-5 py-3 text-ink-2">{member.clientsLedCount}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-ink-2">{member.openTaskCount}</span>
                      {member.overdueTaskCount > 0 ? (
                        <Badge tone="danger">{member.overdueTaskCount} overdue</Badge>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {canManage ? (
                      <CapacityHoursForm membershipId={member.id} currentHours={member.weeklyCapacityHours} />
                    ) : (
                      <span className="text-ink-2">
                        {member.weeklyCapacityHours !== null ? `${member.weeklyCapacityHours}h` : "—"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
