-- Row Level Security for the Client Portal tables. Same posture as every
-- other RLS migration in this project: defense-in-depth for any access
-- path that isn't the trusted Prisma server connection — see
-- /docs/security.md.
--
-- New here: a client-portal user has no row in `memberships`, so
-- `current_org_ids()` (used by every existing policy) always returns
-- empty for them — meaning the *existing* policies already correctly deny
-- a client user access to every internal-staff-scoped table. What's added
-- below is a parallel `current_client_ids()` helper, scoped to the
-- specific Client(s) a portal user actually belongs to (never their whole
-- Organization), for the two new tables a client user's own Prisma-bypass
-- access path would otherwise need.
--
-- Deliberately NOT extended in this migration: RLS policies letting a
-- client user read `clients`/`workflow_instances`/`tasks`/`documents` via
-- current_client_ids(). The portal's actual enforced boundary is
-- application-layer scoping (every portal query takes clientId — see
-- lib/os/queries/workflow.ts, lib/os/queries/documents.ts, and the portal
-- session helper that resolves it), the same pattern already used and
-- documented for the internal side; RLS is defense-in-depth on top of
-- that, not instead of it. Extending those four tables' policies is real,
-- traceable follow-up work, not an oversight — see /docs/decision-log.md.

CREATE OR REPLACE FUNCTION public.current_client_ids()
RETURNS SETOF uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT "clientId"
  FROM client_memberships
  WHERE "userId" = auth.uid()
    AND "isActive" = true;
$$;

REVOKE ALL ON FUNCTION public.current_client_ids() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.current_client_ids() TO authenticated;

ALTER TABLE "client_memberships" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "client_approvals" ENABLE ROW LEVEL SECURITY;

-- A client user sees their own client's membership roster (not exposed in
-- the portal UI yet, but correct at the data layer ahead of that UI).
CREATE POLICY "client_memberships_select_own_client" ON "client_memberships"
  FOR SELECT
  USING ("clientId" IN (SELECT public.current_client_ids()));

CREATE POLICY "client_approvals_select_own_client" ON "client_approvals"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "client_memberships" cm
      WHERE cm."id" = "client_approvals"."clientMembershipId"
        AND cm."clientId" IN (SELECT public.current_client_ids())
    )
  );

-- No write policies, same reasoning as every other RLS migration in this
-- project: all writes go through the application server, which enforces
-- RBAC (client:managePortalAccess for invites, approval:submit for
-- ClientApproval) before writing.
