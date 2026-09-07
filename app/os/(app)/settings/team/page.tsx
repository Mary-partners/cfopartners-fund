import type { Metadata } from "next";
import { requireActor } from "@/lib/os/auth/session";
import { hasOrgWideClientAccess } from "@/lib/os/auth/client-access";
import { db } from "@/lib/os/db";
import { can, ROLE_LABELS } from "@/lib/os/auth/rbac";
import { getClientOptions } from "@/lib/os/queries/clients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { Badge } from "@/components/os/ui/badge";
import { RoleSelectForm } from "@/components/os/role-select-form";
import { InviteStaffMemberForm } from "@/components/os/invite-staff-member-form";
import { ClientAccessForm } from "@/components/os/client-access-form";

export const metadata: Metadata = { title: "Team" };

export default async function TeamSettingsPage() {
  const actor = await requireActor();
  const canChangeRole = can(actor.membership.role, "membership:changeRole");

  const members = await db.membership.findMany({
    where: { organizationId: actor.organizationId },
    orderBy: { createdAt: "asc" },
  });

  // The inviter's own role always has org-wide client access — only
  // Managing Partner / Practice Administrator hold membership:changeRole,
  // and both are org-wide roles (see lib/os/auth/client-access.ts) — so the
  // client list offered here doesn't need its own scoping.
  const [clients, grants] = await Promise.all([
    canChangeRole ? getClientOptions(actor.organizationId, null) : Promise.resolve([]),
    canChangeRole
      ? db.clientAccessGrant.findMany({
          where: { membershipId: { in: members.map((m) => m.id) } },
          select: { membershipId: true, clientId: true },
        })
      : Promise.resolve([]),
  ]);
  const grantsByMember = new Map<string, string[]>();
  for (const grant of grants) {
    const list = grantsByMember.get(grant.membershipId) ?? [];
    list.push(grant.clientId);
    grantsByMember.set(grant.membershipId, list);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Team</h1>
        <p className="text-sm text-ink-2/70">
          Everyone with CFOIP OS access, invited or already signed in, and their internal role.
        </p>
      </div>

      {canChangeRole ? (
        <Card>
          <CardHeader>
            <CardTitle>Invite a team member</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <InviteStaffMemberForm clients={clients} />
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Members ({members.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-2/50">
                <th scope="col" className="px-5 py-3 font-medium">
                  Member
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Role
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Client access
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {members.map((member) => {
                const orgWide = hasOrgWideClientAccess(member.role);
                const grantedClientIds = grantsByMember.get(member.id) ?? [];
                return (
                  <tr key={member.id}>
                    <td className="px-5 py-3 align-top">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-ink">{member.displayName ?? member.email}</span>
                        {!member.userId ? <Badge tone="warning">Invited — not yet signed in</Badge> : null}
                      </div>
                      <div className="text-xs text-ink-2/50">{member.email}</div>
                    </td>
                    <td className="px-5 py-3 align-top">
                      {canChangeRole ? (
                        <RoleSelectForm
                          membershipId={member.id}
                          currentRole={member.role}
                          disabled={member.id === actor.membership.id}
                        />
                      ) : (
                        ROLE_LABELS[member.role]
                      )}
                    </td>
                    <td className="px-5 py-3 align-top">
                      {orgWide ? (
                        <span className="text-xs text-ink-2/50">Sees every client</span>
                      ) : canChangeRole ? (
                        <details className="group">
                          <summary className="cursor-pointer text-sm text-ink underline decoration-ink/30 underline-offset-2">
                            {grantedClientIds.length} client{grantedClientIds.length === 1 ? "" : "s"}
                          </summary>
                          <div className="mt-2 w-72">
                            <ClientAccessForm
                              membershipId={member.id}
                              clients={clients}
                              grantedClientIds={grantedClientIds}
                            />
                          </div>
                        </details>
                      ) : (
                        <span className="text-xs text-ink-2/50">
                          {grantedClientIds.length} client{grantedClientIds.length === 1 ? "" : "s"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
