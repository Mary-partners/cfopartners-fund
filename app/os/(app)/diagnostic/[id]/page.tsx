import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { getDiagnosticSubmission } from "@/lib/diagnostic/db";
import { ALL_QUESTIONS } from "@/lib/diagnostic/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { Badge } from "@/components/os/ui/badge";
import { MarkDiagnosticReviewedForm } from "@/components/os/mark-diagnostic-reviewed-form";

export const metadata: Metadata = { title: "Diagnostic submission" };

export default async function DiagnosticSubmissionPage({ params }: { params: { id: string } }) {
  const actor = await requireActor();
  if (!can(actor.membership.role, "diagnostic:view")) {
    return <p className="text-sm text-ink-2/70">You don't have access to this page.</p>;
  }

  const submission = await getDiagnosticSubmission(params.id);
  if (!submission) notFound();

  const answers = submission.answers as Record<string, string | string[] | undefined>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">{submission.businessName}</h1>
        <p className="text-sm text-ink-2/70">
          {submission.founderName} · {submission.email} · {submission.phone ?? "no phone given"} ·{" "}
          {new Date(submission.createdAt).toLocaleString()}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Computed result (first-draft scoring — see decision-log.md)</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="gold">{submission.readinessBand}</Badge>
            <Badge tone="info">{submission.archetype}</Badge>
            <Badge tone="neutral">Score {submission.totalScore}/21</Badge>
            <Badge tone="warning">{submission.leadTemperature}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-ink-2 sm:grid-cols-4">
            <div>Financial Clarity: {submission.financialClarityScore}/3</div>
            <div>Revenue Quality: {submission.revenueQualityScore}/3</div>
            <div>Operations: {submission.operationsScore}/3</div>
            <div>Team Capacity: {submission.teamCapacityScore}/3</div>
            <div>Governance: {submission.governanceScore}/3</div>
            <div>Capital Readiness: {submission.capitalReadinessScore}/3</div>
            <div>Advisory Urgency: {submission.advisoryUrgencyScore}/3</div>
          </div>
          <p className="text-sm text-ink-2">
            <strong>Capital Fit segment:</strong> {submission.capitalFitSegment}
          </p>
          <p className="text-sm text-ink-2">
            <strong>Recommended:</strong> {submission.recommendedCapitalStructures.join(", ") || "—"}
          </p>
          <p className="text-sm text-ink-2">
            <strong>Unsuitable:</strong> {submission.unsuitableCapitalStructures.join(", ") || "—"}
          </p>
          <p className="text-sm text-ink-2">
            <strong>Top gaps:</strong> {submission.topGaps.join(", ") || "—"}
          </p>
          <p className="text-sm text-ink-2">
            <strong>Founder operating layer flags:</strong> {submission.founderOperatingLayerFlags.join(", ") || "—"}
          </p>
          <p className="text-sm text-ink-2">
            <strong>Recommended offer:</strong> {submission.recommendedOffer}
          </p>
        </CardContent>
      </Card>

      {can(actor.membership.role, "diagnostic:review") ? (
        <Card>
          <CardHeader>
            <CardTitle>{submission.reviewedAt ? `Reviewed ${new Date(submission.reviewedAt).toLocaleString()}` : "Not yet reviewed"}</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <MarkDiagnosticReviewedForm id={submission.id} reviewerNotes={submission.reviewerNotes} />
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>All 40 answers</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-2">
          {ALL_QUESTIONS.map((q) => {
            const answer = answers[q.id];
            const display = Array.isArray(answer) ? answer.join(", ") : answer;
            return (
              <div key={q.id} className="border-b border-ink/5 pb-2 last:border-0">
                <p className="text-xs font-medium text-ink-2/70">{q.label}</p>
                <p className="text-sm text-ink">{display || <span className="text-ink-2/40">No answer</span>}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
