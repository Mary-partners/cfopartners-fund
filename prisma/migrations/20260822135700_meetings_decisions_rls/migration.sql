-- Row Level Security for meetings and decisions. meetings has its own
-- organizationId column (simple direct-column policy, same shape as
-- 20260821132500_documents_rls / 20260822135000_requests_rls); decisions
-- has no organizationId of its own — it belongs to exactly one meeting, so
-- join up rather than denormalize, same EXISTS-through-a-join pattern as
-- 20260821174500_reviews_rls's reviews policy. See /docs/security.md.

ALTER TABLE "meetings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "decisions" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "meetings_select_same_org" ON "meetings"
  FOR SELECT
  USING ("organizationId" IN (SELECT public.current_org_ids()));

CREATE POLICY "decisions_select_same_org" ON "decisions"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "meetings" m
      WHERE m."id" = "decisions"."meetingId"
        AND m."organizationId" IN (SELECT public.current_org_ids())
    )
  );

-- No write policies, same reasoning as every other RLS migration in this
-- project: all writes go through the application server, which enforces
-- RBAC (meeting:manage) before writing.
