import type { Metadata } from "next";
import Link from "next/link";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { listDiagnosticSubmissions } from "@/lib/diagnostic/db";
import { Card, CardContent } from "@/components/os/ui/card";
import { Badge, type BadgeProps } from "@/components/os/ui/badge";

export const metadata: Metadata = { title: "Diagnostic Leads" };

const TEMPERATURE_TONE: Record<string, BadgeProps["tone"]> = {
  HOT: "danger",
  WARM: "warning",
  NURTURE: "info",
  COLD: "neutral",
};

const READINESS_LABEL: Record<string, string> = {
  FOUNDATION: "Foundation",
  GROWTH_READINESS: "Growth Readiness",
  SCALE_UP_SUPPORT_NEEDED: "Scale-Up Support Needed",
  CAPITAL_ADVISORY_READY: "Capital / Advisory Ready",
};

export default async function DiagnosticLeadsPage() {
  const actor = await requireActor();
  if (!can(actor.membership.role, "diagnostic:view")) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-ink">Diagnostic Leads</h1>
        <p className="text-sm text-ink-2/70">You don't have access to this page.</p>
      </div>
    );
  }

  const submissions = await listDiagnosticSubmissions();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Diagnostic Leads</h1>
        <p className="text-sm text-ink-2/70">
          {submissions.length} submission{submissions.length === 1 ? "" : "s"} from the on-site Founder Diagnostic
          (app/diagnostic).
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          {submissions.length === 0 ? (
            <p className="p-5 text-sm text-ink-2/60">No submissions yet.</p>
          ) : (
            <ul className="divide-y divide-ink/5">
              {submissions.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <Link href={`/os/diagnostic/${s.id}`} className="font-medium text-ink hover:underline">
                      {s.businessName}
                    </Link>
                    <div className="text-xs text-ink-2/50">
                      {s.founderName} · {s.email} · {new Date(s.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone="gold">{READINESS_LABEL[s.readinessBand] ?? s.readinessBand}</Badge>
                    <Badge tone={TEMPERATURE_TONE[s.leadTemperature] ?? "neutral"}>{s.leadTemperature}</Badge>
                    {s.reviewedAt ? <Badge tone="success">Reviewed</Badge> : <Badge tone="neutral">New</Badge>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
