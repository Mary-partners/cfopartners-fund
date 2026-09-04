import type { Metadata } from "next";
import { requirePortalActor } from "@/lib/os/auth/portal-session";
import { canPortal } from "@/lib/os/auth/portal-rbac";
import { getRequestsForPortalClient } from "@/lib/os/queries/portal-requests";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { RequestStatusBadge, RequestPriorityBadge } from "@/components/os/request-status-badge";
import { PortalCreateRequestForm } from "@/components/os/portal/create-request-form";

export const metadata: Metadata = { title: "Requests" };

export default async function PortalRequestsPage() {
  const actor = await requirePortalActor();
  const canSubmit = canPortal(actor.clientMembership.role, "request:submit");
  const requests = await getRequestsForPortalClient(actor.clientId);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Requests</h1>
        <p className="text-sm text-ink-2/70">Anything you need from your CFO Innovation Partners team.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your requests ({requests.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {requests.length === 0 ? (
              <p className="p-5 text-sm text-ink-2/60">Nothing raised yet.</p>
            ) : (
              <ul className="divide-y divide-ink/5">
                {requests.map((request) => (
                  <li key={request.id} className="flex flex-col gap-1.5 px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-ink">{request.title}</span>
                      <RequestStatusBadge request={request} />
                    </div>
                    {request.description ? (
                      <p className="text-xs text-ink-2/70">{request.description}</p>
                    ) : null}
                    <div className="flex items-center gap-1.5">
                      <RequestPriorityBadge priority={request.priority} />
                      <span className="text-xs text-ink-2/50">
                        Raised {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {request.resolutionNotes ? (
                      <p className="text-xs text-ink-2/70">&ldquo;{request.resolutionNotes}&rdquo;</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {canSubmit ? (
          <Card>
            <CardHeader>
              <CardTitle>Raise a request</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <PortalCreateRequestForm />
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
