-- Row Level Security for the AI CFO foundation tables. Same defense-in-
-- depth posture as every other RLS migration in this project (see
-- /docs/security.md): the actually enforced boundary is application-layer
-- scoping (lib/os/auth/client-access.ts and the actor.organizationId
-- pattern every query function already uses). Every table here carries its
-- own organizationId column except agent_steps, which joins up through
-- agent_runs — the same EXISTS-through-a-join pattern as
-- 20260822135700_meetings_decisions_rls's decisions policy.
--
-- No write policies, same reasoning as every other RLS migration in this
-- project: all writes go through the application server, which enforces
-- RBAC before writing. See lib/os/auth/rbac.ts's aicfo:* permissions.

ALTER TABLE "reporting_periods" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "document_extractions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "financial_accounts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "financial_period_values" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "financial_metrics" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "cfo_reviews" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "review_findings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "risks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "controls" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "action_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "compliance_deadlines" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "materiality_thresholds" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "approvals" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "agent_runs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "agent_steps" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reporting_periods_select_same_org" ON "reporting_periods"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "document_extractions_select_same_org" ON "document_extractions"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "financial_accounts_select_same_org" ON "financial_accounts"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "financial_period_values_select_same_org" ON "financial_period_values"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "financial_metrics_select_same_org" ON "financial_metrics"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "cfo_reviews_select_same_org" ON "cfo_reviews"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "review_findings_select_same_org" ON "review_findings"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "risks_select_same_org" ON "risks"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "controls_select_same_org" ON "controls"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "action_items_select_same_org" ON "action_items"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "compliance_deadlines_select_same_org" ON "compliance_deadlines"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "materiality_thresholds_select_same_org" ON "materiality_thresholds"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "approvals_select_same_org" ON "approvals"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "agent_runs_select_same_org" ON "agent_runs"
  FOR SELECT USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "agent_steps_select_same_org" ON "agent_steps"
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM "agent_runs" r
      WHERE r."id" = "agent_steps"."agentRunId"
        AND r."organizationId" IN (SELECT public.current_org_ids())
    )
  );
