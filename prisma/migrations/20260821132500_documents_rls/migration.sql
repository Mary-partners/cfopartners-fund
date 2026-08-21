-- Row Level Security for the documents table. Same posture as
-- 20260819092604_enable_row_level_security: defense-in-depth for any
-- access path that isn't the trusted Prisma server connection. See
-- /docs/security.md.
--
-- Note: this covers the `documents` metadata row only. The underlying file
-- bytes live in Supabase Storage (bucket "documents"), which is a separate
-- access-control surface — see /docs/security.md "Document storage" for why
-- short-lived signed URLs minted server-side are the enforced boundary
-- there, not Storage RLS policies.

ALTER TABLE "documents" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "documents_select_same_org" ON "documents"
  FOR SELECT
  USING ("organizationId" IN (SELECT public.current_org_ids()));

-- No write policies, same reasoning as every other RLS migration in this
-- project: all writes go through the application server, which enforces
-- RBAC (document:upload / document:delete) before writing.
