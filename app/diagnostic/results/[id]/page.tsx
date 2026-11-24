import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getDiagnosticSubmission } from "@/lib/diagnostic/db";
import { DiagnosticResultView } from "@/components/DiagnosticResultView";

export const metadata: Metadata = { title: "Your Founder Diagnostic results | CFO Partners" };

export default async function DiagnosticResultsPage({ params }: { params: { id: string } }) {
  const submission = await getDiagnosticSubmission(params.id);
  if (!submission) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[720px] px-6 py-16 sm:py-24">
        <DiagnosticResultView
          result={{
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
          }}
        />
      </main>
      <Footer />
    </>
  );
}
