import "server-only";

import { db } from "@/lib/os/db";
import { computeDiagnosticResult, type DiagnosticAnswers } from "./scoring";

export type CreateDiagnosticSubmissionInput = {
  businessName: string;
  founderName: string;
  email: string;
  phone?: string;
  location?: string;
  sector: string;
  websiteUrl?: string;
  answers: DiagnosticAnswers;
  consentData: boolean;
  consentSharing: boolean;
  consentWithdrawal: boolean;
};

export async function createDiagnosticSubmission(input: CreateDiagnosticSubmissionInput) {
  const result = computeDiagnosticResult(input.answers);
  const pillarScores = Object.fromEntries(result.maturity.pillars.map((p) => [p.pillar, p.score]));

  return db.diagnosticSubmission.create({
    data: {
      businessName: input.businessName,
      founderName: input.founderName,
      email: input.email,
      phone: input.phone || null,
      location: input.location || null,
      sector: input.sector,
      websiteUrl: input.websiteUrl || null,
      answers: input.answers,
      consentData: input.consentData,
      consentSharing: input.consentSharing,
      consentWithdrawal: input.consentWithdrawal,
      financialClarityScore: pillarScores.financialClarity,
      revenueQualityScore: pillarScores.revenueQuality,
      operationsScore: pillarScores.operations,
      teamCapacityScore: pillarScores.teamCapacity,
      governanceScore: pillarScores.governance,
      capitalReadinessScore: pillarScores.capitalReadiness,
      advisoryUrgencyScore: pillarScores.advisoryUrgency,
      totalScore: result.maturity.totalScore,
      readinessBand: result.maturity.readinessBand,
      archetype: result.maturity.archetype,
      capitalFitSegment: result.capitalFit.segment,
      recommendedCapitalStructures: result.capitalFit.recommended,
      unsuitableCapitalStructures: result.capitalFit.unsuitable,
      topGaps: result.topGaps,
      founderOperatingLayerFlags: result.founderOperatingLayerFlags,
      leadTemperature: result.leadTemperature,
      recommendedOffer: result.recommendedOffer,
    },
  });
}

export function getDiagnosticSubmission(id: string) {
  return db.diagnosticSubmission.findUnique({ where: { id } });
}

export function listDiagnosticSubmissions() {
  return db.diagnosticSubmission.findMany({ orderBy: { createdAt: "desc" } });
}

export function markDiagnosticSubmissionReviewed(id: string, reviewerNotes: string | null) {
  return db.diagnosticSubmission.update({
    where: { id },
    data: { reviewedAt: new Date(), reviewerNotes },
  });
}
