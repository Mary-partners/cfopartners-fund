import type { Metadata } from "next";
import Link from "next/link";
import { requireActor } from "@/lib/os/auth/session";
import { getClientList } from "@/lib/os/queries/clients";
import { can } from "@/lib/os/auth/rbac";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { LifecycleBadge, HealthBadge, SERVICE_BUCKET_LABEL } from "@/components/os/status-badge";
import { NewClientForm } from "@/components/os/new-client-form";

export const metadata: Metadata = { title: "Clients" };

export default async function ClientsPage() {
  const actor = await requireActor();
  const clients = await getClientList(actor.organizationId);
  const canCreate = can(actor.membership.role, "client:create");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Clients</h1>
        <p className="text-sm text-ink-2/70">{clients.length} in the portfolio.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            {clients.length === 0 ? (
              <p className="p-5 text-sm text-ink-2/60">
                No clients yet. Add the first one from the panel on the right.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-2/50">
                      <th scope="col" className="px-5 py-3 font-medium">
                        Client
                      </th>
                      <th scope="col" className="px-5 py-3 font-medium">
                        Service
                      </th>
                      <th scope="col" className="px-5 py-3 font-medium">
                        Lifecycle
                      </th>
                      <th scope="col" className="px-5 py-3 font-medium">
                        Health
                      </th>
                      <th scope="col" className="px-5 py-3 font-medium">
                        Relationship owner
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {clients.map((client) => (
                      <tr key={client.id} className="hover:bg-ink/[0.02]">
                        <td className="px-5 py-3">
                          <Link
                            href={`/os/clients/${client.id}`}
                            className="font-medium text-ink hover:underline"
                          >
                            {client.name}
                          </Link>
                          <div className="text-xs text-ink-2/50">
                            {client.country} · {client.currency}
                          </div>
                        </td>
                        <td className="px-5 py-3 text-ink-2">
                          {SERVICE_BUCKET_LABEL[client.serviceBucket] ?? client.serviceBucket}
                        </td>
                        <td className="px-5 py-3">
                          <LifecycleBadge stage={client.lifecycleStage} />
                        </td>
                        <td className="px-5 py-3">
                          <HealthBadge status={client.healthStatus} />
                        </td>
                        <td className="px-5 py-3 text-ink-2">
                          {client.relationshipOwner?.displayName ??
                            client.relationshipOwner?.email ??
                            "Unassigned"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add a client</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            {canCreate ? (
              <NewClientForm />
            ) : (
              <p className="text-sm text-ink-2/60">
                Your role doesn&apos;t have permission to add clients. Ask a Managing
                Partner or Practice Administrator.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
