-- CreateEnum
CREATE TYPE "RiskRating" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFORMATIONAL');

-- CreateEnum
CREATE TYPE "DocumentExtractionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'NEEDS_REVIEW');

-- CreateEnum
CREATE TYPE "CfoReviewStatus" AS ENUM ('DRAFT', 'AI_REVIEW_COMPLETE', 'FINANCE_REVIEW_REQUIRED', 'RETURNED_FOR_CORRECTION', 'SENIOR_REVIEW_REQUIRED', 'MANAGING_PARTNER_APPROVAL_REQUIRED', 'APPROVED', 'RELEASED_TO_CLIENT', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "FindingStatus" AS ENUM ('OPEN', 'UNDER_REVIEW', 'RETURNED_FOR_CORRECTION', 'APPROVED', 'RESOLVED', 'ESCALATED');

-- CreateEnum
CREATE TYPE "RiskStatus" AS ENUM ('OPEN', 'MITIGATING', 'CLOSED');

-- CreateEnum
CREATE TYPE "ControlStatus" AS ENUM ('EFFECTIVE', 'WEAK', 'MISSING');

-- CreateEnum
CREATE TYPE "ActionItemStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "DeadlineStatus" AS ENUM ('OPEN', 'DONE');

-- CreateEnum
CREATE TYPE "MaterialityCategory" AS ENUM ('FINANCIAL_EXCEPTION', 'BUDGET_VARIANCE', 'CASH_RUNWAY');

-- CreateEnum
CREATE TYPE "ApprovalDecision" AS ENUM ('APPROVED', 'REJECTED', 'RETURNED');

-- CreateEnum
CREATE TYPE "AgentType" AS ENUM ('ORCHESTRATOR', 'DOCUMENT', 'FINANCIAL_CONTROLLER', 'FPA', 'REPORTING', 'RISK_CONTROLS');

-- CreateEnum
CREATE TYPE "AgentRunStatus" AS ENUM ('QUEUED', 'RUNNING', 'AWAITING_REVIEW', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "FinancialAccountCategory" AS ENUM ('REVENUE', 'COST_OF_SALES', 'OPERATING_EXPENSE', 'ASSET', 'LIABILITY', 'EQUITY', 'OTHER');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AuditAction" ADD VALUE 'REPORTING_PERIOD_CREATED';
ALTER TYPE "AuditAction" ADD VALUE 'DOCUMENT_EXTRACTION_STARTED';
ALTER TYPE "AuditAction" ADD VALUE 'DOCUMENT_EXTRACTION_COMPLETED';
ALTER TYPE "AuditAction" ADD VALUE 'DOCUMENT_EXTRACTION_FAILED';
ALTER TYPE "AuditAction" ADD VALUE 'DOCUMENT_EXTRACTION_REVIEWED';
ALTER TYPE "AuditAction" ADD VALUE 'CFO_REVIEW_CREATED';
ALTER TYPE "AuditAction" ADD VALUE 'CFO_REVIEW_STATUS_CHANGED';
ALTER TYPE "AuditAction" ADD VALUE 'REVIEW_FINDING_CREATED';
ALTER TYPE "AuditAction" ADD VALUE 'REVIEW_FINDING_STATUS_CHANGED';
ALTER TYPE "AuditAction" ADD VALUE 'RISK_CREATED';
ALTER TYPE "AuditAction" ADD VALUE 'RISK_STATUS_CHANGED';
ALTER TYPE "AuditAction" ADD VALUE 'CONTROL_CREATED';
ALTER TYPE "AuditAction" ADD VALUE 'CONTROL_STATUS_CHANGED';
ALTER TYPE "AuditAction" ADD VALUE 'ACTION_ITEM_CREATED';
ALTER TYPE "AuditAction" ADD VALUE 'ACTION_ITEM_STATUS_CHANGED';
ALTER TYPE "AuditAction" ADD VALUE 'COMPLIANCE_DEADLINE_CREATED';
ALTER TYPE "AuditAction" ADD VALUE 'MATERIALITY_THRESHOLD_UPDATED';
ALTER TYPE "AuditAction" ADD VALUE 'APPROVAL_DECISION_RECORDED';
ALTER TYPE "AuditAction" ADD VALUE 'AGENT_RUN_STARTED';
ALTER TYPE "AuditAction" ADD VALUE 'AGENT_RUN_COMPLETED';
ALTER TYPE "AuditAction" ADD VALUE 'AGENT_RUN_FAILED';

-- AlterTable
ALTER TABLE "memberships" ADD COLUMN     "canReleaseReports" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "reporting_periods" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reporting_periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_extractions" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "documentId" UUID NOT NULL,
    "reportingPeriodId" UUID,
    "status" "DocumentExtractionStatus" NOT NULL DEFAULT 'PENDING',
    "documentType" TEXT,
    "extractedCompany" TEXT,
    "extractedCurrency" TEXT,
    "structuredData" JSONB,
    "confidence" DOUBLE PRECISION,
    "model" TEXT,
    "promptVersion" TEXT,
    "errorMessage" TEXT,
    "reviewedByMembershipId" UUID,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_extractions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_accounts" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "category" "FinancialAccountCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_period_values" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "reportingPeriodId" UUID NOT NULL,
    "financialAccountId" UUID NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "sourceDocumentId" UUID,
    "sourceLocation" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_period_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_metrics" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "reportingPeriodId" UUID NOT NULL,
    "metricKey" TEXT NOT NULL,
    "value" DECIMAL(18,4),
    "formula" TEXT NOT NULL,
    "inputsJson" JSONB NOT NULL,
    "warnings" JSONB,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cfo_reviews" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "reportingPeriodId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "status" "CfoReviewStatus" NOT NULL DEFAULT 'DRAFT',
    "createdByMembershipId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cfo_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_findings" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "cfoReviewId" UUID NOT NULL,
    "category" TEXT NOT NULL,
    "finding" TEXT NOT NULL,
    "evidence" TEXT,
    "sourceDocumentId" UUID,
    "sourceLocation" JSONB,
    "amount" DECIMAL(18,2),
    "currency" TEXT,
    "riskRating" "RiskRating" NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "recommendedAction" TEXT,
    "ownerMembershipId" UUID,
    "targetDate" TIMESTAMP(3),
    "status" "FindingStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_findings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "risks" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "riskRating" "RiskRating" NOT NULL,
    "status" "RiskStatus" NOT NULL DEFAULT 'OPEN',
    "ownerMembershipId" UUID,
    "sourceFindingId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "risks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controls" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ControlStatus" NOT NULL DEFAULT 'EFFECTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "controls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_items" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "ownerMembershipId" UUID,
    "targetDate" TIMESTAMP(3),
    "status" "ActionItemStatus" NOT NULL DEFAULT 'OPEN',
    "sourceFindingId" UUID,
    "sourceRiskId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "action_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_deadlines" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "DeadlineStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compliance_deadlines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materiality_thresholds" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "clientId" UUID,
    "category" "MaterialityCategory" NOT NULL,
    "riskRating" "RiskRating" NOT NULL,
    "percentThreshold" DECIMAL(7,4),
    "absoluteThreshold" DECIMAL(18,2),
    "currency" TEXT NOT NULL,
    "benchmark" TEXT NOT NULL DEFAULT 'REVENUE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "materiality_thresholds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "approvals" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "decision" "ApprovalDecision" NOT NULL,
    "approverMembershipId" UUID NOT NULL,
    "riskRatingAtDecision" "RiskRating",
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "approvals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent_runs" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "workflowType" TEXT NOT NULL,
    "status" "AgentRunStatus" NOT NULL DEFAULT 'QUEUED',
    "triggeredByMembershipId" UUID,
    "model" TEXT,
    "modelVersion" TEXT,
    "promptVersion" TEXT,
    "workflowVersion" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agent_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent_steps" (
    "id" UUID NOT NULL,
    "agentRunId" UUID NOT NULL,
    "agentType" "AgentType" NOT NULL,
    "stepName" TEXT NOT NULL,
    "input" JSONB,
    "output" JSONB,
    "status" "AgentRunStatus" NOT NULL DEFAULT 'QUEUED',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agent_steps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "reporting_periods_organizationId_clientId_idx" ON "reporting_periods"("organizationId", "clientId");

-- CreateIndex
CREATE INDEX "reporting_periods_clientId_periodStart_idx" ON "reporting_periods"("clientId", "periodStart");

-- CreateIndex
CREATE INDEX "document_extractions_organizationId_documentId_idx" ON "document_extractions"("organizationId", "documentId");

-- CreateIndex
CREATE INDEX "document_extractions_reportingPeriodId_idx" ON "document_extractions"("reportingPeriodId");

-- CreateIndex
CREATE INDEX "financial_accounts_organizationId_clientId_idx" ON "financial_accounts"("organizationId", "clientId");

-- CreateIndex
CREATE INDEX "financial_period_values_organizationId_clientId_reportingPe_idx" ON "financial_period_values"("organizationId", "clientId", "reportingPeriodId");

-- CreateIndex
CREATE INDEX "financial_period_values_financialAccountId_idx" ON "financial_period_values"("financialAccountId");

-- CreateIndex
CREATE INDEX "financial_metrics_organizationId_clientId_reportingPeriodId_idx" ON "financial_metrics"("organizationId", "clientId", "reportingPeriodId");

-- CreateIndex
CREATE INDEX "financial_metrics_reportingPeriodId_metricKey_idx" ON "financial_metrics"("reportingPeriodId", "metricKey");

-- CreateIndex
CREATE INDEX "cfo_reviews_organizationId_clientId_idx" ON "cfo_reviews"("organizationId", "clientId");

-- CreateIndex
CREATE INDEX "cfo_reviews_status_idx" ON "cfo_reviews"("status");

-- CreateIndex
CREATE INDEX "review_findings_organizationId_cfoReviewId_idx" ON "review_findings"("organizationId", "cfoReviewId");

-- CreateIndex
CREATE INDEX "review_findings_riskRating_status_idx" ON "review_findings"("riskRating", "status");

-- CreateIndex
CREATE INDEX "risks_organizationId_clientId_idx" ON "risks"("organizationId", "clientId");

-- CreateIndex
CREATE INDEX "risks_riskRating_status_idx" ON "risks"("riskRating", "status");

-- CreateIndex
CREATE INDEX "controls_organizationId_clientId_idx" ON "controls"("organizationId", "clientId");

-- CreateIndex
CREATE INDEX "action_items_organizationId_clientId_idx" ON "action_items"("organizationId", "clientId");

-- CreateIndex
CREATE INDEX "action_items_ownerMembershipId_status_idx" ON "action_items"("ownerMembershipId", "status");

-- CreateIndex
CREATE INDEX "compliance_deadlines_organizationId_clientId_idx" ON "compliance_deadlines"("organizationId", "clientId");

-- CreateIndex
CREATE INDEX "compliance_deadlines_dueDate_idx" ON "compliance_deadlines"("dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "materiality_thresholds_organizationId_clientId_category_ris_key" ON "materiality_thresholds"("organizationId", "clientId", "category", "riskRating");

-- CreateIndex
CREATE INDEX "approvals_organizationId_targetType_targetId_idx" ON "approvals"("organizationId", "targetType", "targetId");

-- CreateIndex
CREATE INDEX "agent_runs_organizationId_clientId_idx" ON "agent_runs"("organizationId", "clientId");

-- CreateIndex
CREATE INDEX "agent_runs_status_idx" ON "agent_runs"("status");

-- CreateIndex
CREATE INDEX "agent_steps_agentRunId_idx" ON "agent_steps"("agentRunId");

-- AddForeignKey
ALTER TABLE "reporting_periods" ADD CONSTRAINT "reporting_periods_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reporting_periods" ADD CONSTRAINT "reporting_periods_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_extractions" ADD CONSTRAINT "document_extractions_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_extractions" ADD CONSTRAINT "document_extractions_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_extractions" ADD CONSTRAINT "document_extractions_reportingPeriodId_fkey" FOREIGN KEY ("reportingPeriodId") REFERENCES "reporting_periods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_extractions" ADD CONSTRAINT "document_extractions_reviewedByMembershipId_fkey" FOREIGN KEY ("reviewedByMembershipId") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_accounts" ADD CONSTRAINT "financial_accounts_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_accounts" ADD CONSTRAINT "financial_accounts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_period_values" ADD CONSTRAINT "financial_period_values_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_period_values" ADD CONSTRAINT "financial_period_values_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_period_values" ADD CONSTRAINT "financial_period_values_reportingPeriodId_fkey" FOREIGN KEY ("reportingPeriodId") REFERENCES "reporting_periods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_period_values" ADD CONSTRAINT "financial_period_values_financialAccountId_fkey" FOREIGN KEY ("financialAccountId") REFERENCES "financial_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_period_values" ADD CONSTRAINT "financial_period_values_sourceDocumentId_fkey" FOREIGN KEY ("sourceDocumentId") REFERENCES "documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_metrics" ADD CONSTRAINT "financial_metrics_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_metrics" ADD CONSTRAINT "financial_metrics_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_metrics" ADD CONSTRAINT "financial_metrics_reportingPeriodId_fkey" FOREIGN KEY ("reportingPeriodId") REFERENCES "reporting_periods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cfo_reviews" ADD CONSTRAINT "cfo_reviews_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cfo_reviews" ADD CONSTRAINT "cfo_reviews_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cfo_reviews" ADD CONSTRAINT "cfo_reviews_reportingPeriodId_fkey" FOREIGN KEY ("reportingPeriodId") REFERENCES "reporting_periods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cfo_reviews" ADD CONSTRAINT "cfo_reviews_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_findings" ADD CONSTRAINT "review_findings_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_findings" ADD CONSTRAINT "review_findings_cfoReviewId_fkey" FOREIGN KEY ("cfoReviewId") REFERENCES "cfo_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_findings" ADD CONSTRAINT "review_findings_sourceDocumentId_fkey" FOREIGN KEY ("sourceDocumentId") REFERENCES "documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_findings" ADD CONSTRAINT "review_findings_ownerMembershipId_fkey" FOREIGN KEY ("ownerMembershipId") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risks" ADD CONSTRAINT "risks_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risks" ADD CONSTRAINT "risks_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risks" ADD CONSTRAINT "risks_ownerMembershipId_fkey" FOREIGN KEY ("ownerMembershipId") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risks" ADD CONSTRAINT "risks_sourceFindingId_fkey" FOREIGN KEY ("sourceFindingId") REFERENCES "review_findings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controls" ADD CONSTRAINT "controls_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controls" ADD CONSTRAINT "controls_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_items" ADD CONSTRAINT "action_items_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_items" ADD CONSTRAINT "action_items_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_items" ADD CONSTRAINT "action_items_ownerMembershipId_fkey" FOREIGN KEY ("ownerMembershipId") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_items" ADD CONSTRAINT "action_items_sourceFindingId_fkey" FOREIGN KEY ("sourceFindingId") REFERENCES "review_findings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_items" ADD CONSTRAINT "action_items_sourceRiskId_fkey" FOREIGN KEY ("sourceRiskId") REFERENCES "risks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_deadlines" ADD CONSTRAINT "compliance_deadlines_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_deadlines" ADD CONSTRAINT "compliance_deadlines_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materiality_thresholds" ADD CONSTRAINT "materiality_thresholds_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materiality_thresholds" ADD CONSTRAINT "materiality_thresholds_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_approverMembershipId_fkey" FOREIGN KEY ("approverMembershipId") REFERENCES "memberships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_runs" ADD CONSTRAINT "agent_runs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_runs" ADD CONSTRAINT "agent_runs_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_runs" ADD CONSTRAINT "agent_runs_triggeredByMembershipId_fkey" FOREIGN KEY ("triggeredByMembershipId") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_steps" ADD CONSTRAINT "agent_steps_agentRunId_fkey" FOREIGN KEY ("agentRunId") REFERENCES "agent_runs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
