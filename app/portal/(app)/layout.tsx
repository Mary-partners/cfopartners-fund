import { requirePortalActor } from "@/lib/os/auth/portal-session";
import { PortalSidebar } from "@/components/os/portal/sidebar";
import { PortalTopbar } from "@/components/os/portal/topbar";

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const actor = await requirePortalActor();

  return (
    <div className="flex min-h-screen">
      <PortalSidebar />
      <div className="flex flex-1 flex-col">
        <PortalTopbar email={actor.email} role={actor.clientMembership.role} clientName={actor.clientName} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
