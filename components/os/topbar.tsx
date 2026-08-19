import { ROLE_LABELS, type OrgRole } from "@/lib/os/auth/rbac";
import { Badge } from "@/components/os/ui/badge";

export function Topbar({ email, role }: { email: string; role: OrgRole }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-ink/10 bg-white px-6">
      <div />
      <div className="flex items-center gap-3">
        <Badge tone="gold">{ROLE_LABELS[role]}</Badge>
        <span className="text-sm text-ink-2/70">{email}</span>
        <form action="/os/auth/sign-out" method="post">
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
