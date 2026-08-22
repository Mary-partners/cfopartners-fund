import { CLIENT_ROLE_LABELS, type ClientRole } from "@/lib/os/auth/portal-rbac";
import { Badge } from "@/components/os/ui/badge";

export function PortalTopbar({
  email,
  role,
  clientName,
}: {
  email: string;
  role: ClientRole;
  clientName: string;
}) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-ink/10 bg-white px-6">
      <span className="text-sm font-medium text-ink">{clientName}</span>
      <div className="flex items-center gap-3">
        <Badge tone="gold">{CLIENT_ROLE_LABELS[role]}</Badge>
        <span className="text-sm text-ink-2/70">{email}</span>
        <form action="/portal/auth/sign-out" method="post">
          <button
            type="submit"
            className="rounded-md border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink hover:bg-ink/5"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
