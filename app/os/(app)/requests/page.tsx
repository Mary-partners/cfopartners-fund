import type { Metadata } from "next";
import Link from "next/link";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { db } from "@/lib/os/db";
import { getRequestInbox, getRecentlyResolvedRequests } from "@/lib/os/queries/requests";
import { getClientOptions } from "@/lib/os/queries/clients";
import { REQUEST_STATUS_LABEL } from "@/lib/os/requests/status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { RequestStatusBadge, RequestPriorityBadge } from "@/components/os/request-status-badge";
import { CreateRequestForm } from "@/components/os/create-request-form";
import { UpdateRequestForm } from "@/components/os/update-request-form";

export const metadata: Metadata = { title: "Requests" };

export default async function RequestsPage() {
  const actor = await requireActor();
  const canView = can(actor.membership.role, "request:view");

  if (!canView) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-ink">Requests</h1>
        <p className="text-sm text-ink-2/60">Your role doesn&apos;t have permission to view requests.</p>
      </div>
    );
  }

  const canTriage = can(actor.membership.role, "request:triage");
  const canResolve = can(actor.membership.role, "request:resolve");

  const [inbox, resolved, clients, members] = await Promise.all([
    getRequestInbox(actor.organizationId),
    getRecentlyResolvedRequests(actor.organizationId),
    canTriage ? getClientOptions(actor.organizationId) : Promise.resolve([]),
    canTriage
      ? db.membership.findMany({
          where: { organizationId: actor.organizationId, isActive: true },
          select: { id: true, displayName: true, email: true },
        })
      : Promise.resolve([]),
  ]);
  const memberOptions = members.map((m) => ({ id: m.id, label: m.displayName ?? m.email }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Requests</h1>
        <p className="text-sm text-ink-2/70">{inbox.length} open request{inbox.length === 1 ? "" : "s"}.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Inbox ({inbox.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {inbox.length === 0 ? (
              <p className="p-5 text-sm text-ink-2/60">Nothing open right now.</p>
            ) : (
              <ul className="divide-y divide-ink/5">
                {inbox.map((request) => {
                  const raisedBy =
                    request.raisedByClientMembership?.displayName ??
                    request.raisedByClientMembership?.email ??
                    request.raisedBy?.displayName ??
                    request.raisedBy?.email ??
                    "—";
                  return (
                    <li key={request.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:justify-between">
                      <div>
                        <div className="text-sm font-medium text-ink">{request.title}</div>
                        <div className="text-xs text-ink-2/50">
                          <Link href={`/os/clients/${request.client.id}`} className="hover:underline">
                            {request.client.name}
                          </Link>{" "}
                          · raised by {raisedBy}
                          {request.assignee ? ` · assigned to ${request.assignee.displayName ?? request.assignee.email}` : ""}
                          {request.slaDueAt ? ` · SLA ${new Date(request.slaDueAt).toLocaleDateString()}` : ""}
                        </div>
                        {request.description ? (
                          <p className="mt-1 max-w-md text-xs text-ink-2/70">{request.description}</p>
                        ) : null}
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <RequestPriorityBadge priority={request.priority} />
                          <RequestStatusBadge request={request} />
                        </div>
                      </div>
                      <div className="w-full sm:w-80">
                        {canTriage ? (
                          <UpdateRequestForm
                            requestId={request.id}
                            currentPriority={request.priority}
                            currentStatus={request.status}
                            currentAssigneeId={request.assignee?.id ?? null}
                            members={memberOptions}
                            canResolve={canResolve}
                          />
                        ) : (
                          <p className="text-xs text-ink-2/50">Your role can&apos;t triage requests.</p>
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
            <CardTitle>Log a request</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            {canTriage ? (
              <CreateRequestForm clients={clients} />
            ) : (
              <p className="text-sm text-ink-2/60">Your role can&apos;t log requests on a client&apos;s behalf.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recently resolved</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {resolved.length === 0 ? (
            <p className="p-5 text-sm text-ink-2/60">Nothing resolved yet.</p>
          ) : (
            <ul className="divide-y divide-ink/5">
              {resolved.map((request) => (
                <li key={request.id} className="px-5 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-sm font-medium text-ink">{request.title}</span>
                      <div className="text-xs text-ink-2/50">
                        {request.client.name} · {REQUEST_STATUS_LABEL[request.status]} ·{" "}
                        {request.resolvedAt ? new Date(request.resolvedAt).toLocaleDateString() : "—"}
                      </div>
                    </div>
                  </div>
                  {request.resolutionNotes ? (
                    <p className="mt-1 text-xs text-ink-2/70">&ldquo;{request.resolutionNotes}&rdquo;</p>
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
