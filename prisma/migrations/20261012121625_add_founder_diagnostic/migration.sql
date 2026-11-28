-- CreateEnum
CREATE TYPE "DiagnosticReadinessBand" AS ENUM ('FOUNDATION', 'GROWTH_READINESS', 'SCALE_UP_SUPPORT_NEEDED', 'CAPITAL_ADVISORY_READY');

-- CreateEnum
CREATE TYPE "FounderArchetype" AS ENUM ('HUSTLER', 'OPERATOR', 'STABILIZER', 'SCALER');

-- CreateEnum
CREATE TYPE "DiagnosticLeadTemperature" AS ENUM ('HOT', 'WARM', 'NURTURE', 'COLD');

-- AlterEnum
ALTER TYPE "AuditAction" ADD VALUE 'DIAGNOSTIC_SUBMISSION_REVIEWED';

-- CreateTable
CREATE TABLE "diagnostic_submissions" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "businessName" TEXT NOT NULL,
    "founderName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "location" TEXT,
    "sector" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "answers" JSONB NOT NULL,
    "consentData" BOOLEAN NOT NULL DEFAULT false,
    "consentSharing" BOOLEAN NOT NULL DEFAULT false,
    "consentWithdrawal" BOOLEAN NOT NULL DEFAULT false,
    "financialClarityScore" INTEGER NOT NULL,
    "revenueQualityScore" INTEGER NOT NULL,
    "operationsScore" INTEGER NOT NULL,
    "teamCapacityScore" INTEGER NOT NULL,
    "governanceScore" INTEGER NOT NULL,
    "capitalReadinessScore" INTEGER NOT NULL,
    "advisoryUrgencyScore" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "readinessBand" "DiagnosticReadinessBand" NOT NULL,
    "archetype" "FounderArchetype" NOT NULL,
    "capitalFitSegment" TEXT NOT NULL,
    "recommendedCapitalStructures" TEXT[],
    "unsuitableCapitalStructures" TEXT[],
    "topGaps" TEXT[],
    "founderOperatingLayerFlags" TEXT[],
    "leadTemperature" "DiagnosticLeadTemperature" NOT NULL,
    "recommendedOffer" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3),
    "reviewerNotes" TEXT,

    CONSTRAINT "diagnostic_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "diagnostic_submissions_createdAt_idx" ON "diagnostic_submissions"("createdAt");

-- CreateIndex
CREATE INDEX "diagnostic_submissions_readinessBand_idx" ON "diagnostic_submissions"("readinessBand");

-- CreateIndex
CREATE INDEX "diagnostic_submissions_leadTemperature_idx" ON "diagnostic_submissions"("leadTemperature");
