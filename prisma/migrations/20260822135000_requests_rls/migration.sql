-- Row Level Security for the requests table. Same posture as
-- 20260821132500_documents_rls: defense-in-depth for any access path that
-- isn't the trusted Prisma server connection. requests has its own
-- organizationId column (unlike reviews/client_approvals, which join
-- through a parent), so this is the simple direct-column policy shape.
-- See /docs/security.md.
--
-- Deliberately NOT given a current_client_ids()-scoped policy here (the
-- way client_memberships/client_approvals were) even though a client can
-- read/write their own requests through the portal — same reasoning as
-- documented in 20260822090500_client_portal_rls for clients/tasks/
-- documents: the portal's actually enforced boundary is application-layer
-- scoping by clientId (see lib/os/queries/requests.ts), RLS here is
-- defense-in-depth for the organizationId boundary only.

ALTER TABLE "requests" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "requests_select_same_org" ON "requests"
  FOR SELECT
  USING ("organizationId" IN (SELECT public.current_org_ids()));

-- No write policies, same reasoning as every other RLS migration in this
-- project: all writes go through the application server, which enforces
-- RBAC (request:triage / request:resolve internally, request:submit on
-- the portal) before writing.
