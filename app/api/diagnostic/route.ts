import { NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { createDiagnosticSubmission } from "@/lib/diagnostic/db";
import { validateDiagnosticSubmission, type DiagnosticSubmissionPayload } from "@/lib/diagnostic/validate";

// Not edge: this route needs Prisma (Postgres), unlike the other marketing
// forms (subscribe, automation) which only send an email/webhook.
export const runtime = "nodejs";

/**
 * The Founder Diagnostic, taken on-site instead of the external Notion
 * form. Computes results immediately (lib/diagnostic/scoring.ts) and
 * stores the full submission so the team can follow up — see
 * docs/decision-log.md "Founder Diagnostic automation".
 */
export async function POST(request: Request) {
  let body: DiagnosticSubmissionPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const validated = validateDiagnosticSubmission(body);
  if (!validated.ok) {
    return NextResponse.json({ ok: false, error: validated.error }, { status: 400 });
  }

  const submission = await createDiagnosticSubmission(validated.data);

  await notify({
    subject: `New Founder Diagnostic: ${submission.businessName} (${submission.leadTemperature})`,
    lines: [
      ["Business", submission.businessName],
      ["Founder", submission.founderName],
      ["Email", submission.email],
      ["Phone", submission.phone ?? ""],
      ["Sector", submission.sector],
      ["Readiness band", submission.readinessBand],
      ["Archetype", submission.archetype],
      ["Total score", String(submission.totalScore)],
      ["Capital segment", submission.capitalFitSegment],
      ["Lead temperature", submission.leadTemperature],
      ["Recommended offer", submission.recommendedOffer],
      ["Review in CFOIP OS", `https://www.cfopartners.fund/os/diagnostic/${submission.id}`],
    ],
  });

  return NextResponse.json({
    ok: true,
    id: submission.id,
    result: {
      businessName: submission.businessName,
      founderName: submission.founderName,
      readinessBand: submission.readinessBand,
      archetype: submission.archetype,
      totalScore: submission.totalScore,
      pillars: {
        financialClarity: submission.financialClarityScore,
        revenueQuality: submission.revenueQualityScore,
        operations: submission.operationsScore,
        teamCapacity: submission.teamCapacityScore,
        governance: submission.governanceScore,
        capitalReadiness: submission.capitalReadinessScore,
        advisoryUrgency: submission.advisoryUrgencyScore,
      },
      capitalFitSegment: submission.capitalFitSegment,
      recommendedCapitalStructures: submission.recommendedCapitalStructures,
      unsuitableCapitalStructures: submission.unsuitableCapitalStructures,
      topGaps: submission.topGaps,
      founderOperatingLayerFlags: submission.founderOperatingLayerFlags,
      leadTemperature: submission.leadTemperature,
      recommendedOffer: submission.recommendedOffer,
    },
  });
}
