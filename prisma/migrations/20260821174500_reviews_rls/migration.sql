-- Row Level Security for the reviews table. Same posture and same join
-- pattern as 20260819094215_workflow_engine_rls's tasks policy — reviews
-- has no organizationId column of its own (same reasoning as tasks: it
-- belongs to exactly one task, which belongs to exactly one workflow
-- instance, so join up rather than denormalize). See /docs/security.md.

ALTER TABLE "reviews" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviews_select_same_org" ON "reviews"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "tasks" t
      JOIN "workflow_instances" wi ON wi."id" = t."workflowInstanceId"
      WHERE t."id" = "reviews"."taskId"
        AND wi."organizationId" IN (SELECT public.current_org_ids())
    )
  );

-- No write policies, same reasoning as every other RLS migration in this
-- project: all writes go through the application server, which enforces
-- RBAC (quality:review, plus the canReview() segregation-of-duties check)
-- before writing.
