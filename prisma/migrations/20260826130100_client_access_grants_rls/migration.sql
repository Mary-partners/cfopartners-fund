-- Row Level Security for client_access_grants. Same defense-in-depth
-- posture as every other RLS migration in this project (see
-- /docs/security.md): the actually enforced boundary is application-layer,
-- in lib/os/auth/client-access.ts. This table has no organizationId column
-- of its own — it belongs to exactly one client — so join up, same
-- EXISTS-through-a-join pattern as 20260822135700_meetings_decisions_rls's
-- decisions policy.

ALTER TABLE "client_access_grants" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "client_access_grants_select_same_org" ON "client_access_grants"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "clients" c
      WHERE c."id" = "client_access_grants"."clientId"
        AND c."organizationId" IN (SELECT public.current_org_ids())
    )
  );

-- No write policies, same reasoning as every other RLS migration in this
-- project: all writes go through the application server, which enforces
-- RBAC (membership:changeRole) before writing.
