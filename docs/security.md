# Security

This document tracks toward ISO/IEC 27001 and SOC 2 Trust Services Criteria
patterns (least privilege, auditability, tenant isolation, encryption in
transit/at rest) as a design discipline. **It is not a claim of certification
or legal compliance.** CFOIP should get a specialist security/legal review
(including Kenya Data Protection Act, 2019 obligations, and GDPR if serving
EU-connected clients) before handling real client financial data in
production — flagged again in `/docs/decision-log.md`.

## Roles and authority

Implemented in `lib/os/auth/rbac.ts`, one file, one matrix
(`ROLE_PERMISSIONS`), tested in `tests/unit/rbac.test.ts`.

| Role | Core authority (Phase 0/1 permissions) |
|---|---|
| Managing Partner | Everything |
| Practice Administrator | Clients, team roles, settings, audit log, workflow templates & instantiation, documents (incl. delete), quality review — not billing, not task execution |
| Portfolio Lead / CFO | Clients (view/create/edit), billing visibility, start work, update/assign tasks, documents (view/upload), quality review |
| Client Relationship Manager | Clients (view/edit), documents (view/upload), quality (view only) |
| Service Lead | Clients (view/edit), manage workflow templates, start work, update/assign tasks, documents (view/upload), quality review |
| Preparer / Analyst | Clients (view only), update task status (their own delivery work), documents (view/upload), quality (view only — cannot submit reviews at all) |
| Independent Reviewer | Clients (view only), documents (view only), quality review |
| Finance / Billing | Clients (view), billing visibility, documents (view only), quality (view only) |
| Read-only / Auditor | Clients (view), audit log, documents (view only), quality (view only) |

Document *delete* is deliberately withheld from every role except Managing
Partner and Practice Administrator — everyone who can view or upload can
add to the record, but removing a file (destructive, no undo — Documents
has no version history yet, see `/docs/implementation-plan.md`) is held to
a higher bar than upload.

The permission surface grows with each phase — every new module adds its
own permissions to the same matrix rather than inventing a parallel
authorization mechanism: `client:*`, `membership:*`, `audit:view`,
`settings:manage`, `billing:view`, `workflow:manageTemplates`,
`workflow:instantiate`, `task:updateStatus`, `task:assign`,
`document:view`, `document:upload`, `document:delete`, `quality:view`,
`quality:review`. `billing:view` already exists in the matrix ahead of the
Billing module (Phase 3) shipping, so the authority decision (who gets to
see money) is made once and doesn't need revisiting when Billing lands.
Note `task:updateStatus` is currently granted broadly to Preparer/Analyst
rather than scoped to "only tasks assigned to me" — a real gap if CFOIP
ever needs to stop analysts from touching each other's tasks; tracked in
`/docs/decision-log.md`.

**Segregation of duties**: `canReview(preparerMembershipId,
reviewerMembershipId)` in `lib/os/auth/rbac.ts` refuses self-review. Now
actually wired in, not just defined — `submitReviewAction`
(`app/os/(app)/quality/actions.ts`) calls it before creating a `Review`
row, comparing the reviewer to the task's assignee *at review time*. Two
layers hold this, not one: `quality:review` decides *which roles* can
review at all (Preparer/Analyst has `quality:view` but not
`quality:review` — can't review anything, their own work or otherwise);
`canReview()` then blocks the specific case of a role that *can* review in
general happening to be the preparer of *this* task (e.g. a Service Lead
reviewing their own work). Both checks run server-side on every submission
— there's no client-side-only enforcement to bypass.

## Tenant isolation

Two independent layers, deliberately not just one:

1. **Application-layer scoping** (primary, enforced today): every read in
   `lib/os/queries/*.ts` takes `organizationId` as an explicit, required
   parameter and filters by it. `getClientById(organizationId, clientId)`
   returns `null` — not another org's row — if the client belongs to a
   different organization; `app/os/(app)/clients/[id]/page.tsx` calls
   `notFound()` on `null`. The app's own Postgres connection (via Prisma)
   authenticates as a privileged Supabase role that has no RLS restriction
   of its own, so **this is the layer actually protecting the app today** —
   it's covered by code review and by the shape of every query function
   (there is no query function that omits the `organizationId` parameter).

2. **Row Level Security** (defense-in-depth, for other access paths):
   four migrations (`20260819092604_enable_row_level_security`,
   `20260819094215_workflow_engine_rls`, `20260821132500_documents_rls`,
   `20260821174500_reviews_rls`) enable RLS and add `SELECT` policies on
   every tenant table (organizations, memberships, clients,
   client_contacts, audit_events, workflow_templates, task_templates,
   workflow_instances, tasks, documents, reviews), keyed off `auth.uid()`.
   This protects any *other* route into the same database —
   a browser Supabase client, Supabase's PostgREST auto-API, a future
   integration — none of which this app currently uses for data queries,
   but which would otherwise have no tenant boundary at all if ever added
   carelessly. **This does not currently gate the Next.js app's own Prisma
   queries**, because that connection uses a role that bypasses RLS (see
   `/docs/architecture.md` "Database connection strategy"). Making the
   Prisma connection RLS-aware too (by propagating the signed-in user's JWT
   into a `SET LOCAL` at the start of each transaction) is a real
   architecture change, tracked as a reversible assumption in
   `/docs/decision-log.md`, not done yet.

   The RLS policies were verified against a real local Postgres instance,
   not just written and assumed correct: with two organizations, two
   memberships and two clients seeded, a session claiming user A's identity
   (`SET request.jwt.claim.sub = '<user A uuid>'`) sees exactly one client
   (Org A's); a session claiming user B's identity sees only Org B's; a
   session with no claim sees zero rows; and direct `INSERT`/`UPDATE`/
   `DELETE` attempts from the `authenticated` role are rejected with
   `permission denied` (no write policies are defined — RLS denies by
   default). Re-verified after adding the workflow tables: a workflow
   template, task template, workflow instance and task seeded under Org A
   are visible only to user A, and the equivalent Org B rows only to user
   B. Re-verified again after `documents` and `reviews`: a document and a
   task-with-a-review seeded under each org are visible only to that org's
   user. See `/docs/setup.md` to reproduce.

   One non-obvious bug this caught: a naive policy on `memberships` that
   queries `memberships` again inside itself causes Postgres to report
   *"infinite recursion detected in policy"* — RLS re-evaluates on every
   table the policy touches, including the table the policy is on. Fixed
   with a `SECURITY DEFINER` helper function (`public.current_org_ids()`)
   that runs as the migration-owner role, which is exempt from RLS on
   tables it owns, so the internal lookup doesn't re-trigger the policy.

## Document storage

Files (bucket `documents` in Supabase Storage) are a third access surface,
distinct from both layers in "Tenant isolation" above:

- **Never a public bucket, never a long-lived URL.** Every upload and
  download is mediated by the app server, which mints a Supabase Storage
  *signed URL* scoped to one object — upload URLs via
  `requestDocumentUploadAction`, download URLs via the
  `/os/documents/[id]/download` route handler (5-minute expiry). A client
  never holds a credential that works against the bucket generally, only a
  single-object, time-boxed one.
- **RBAC is checked before every signed URL is minted**, same as any other
  write/read: `document:upload` for the upload path, `document:view` for
  download — see `lib/os/auth/rbac.ts`. Org scoping is enforced the same
  way as `getClientById` — `getDocumentById(organizationId, id)` returns
  `null` for another org's document, and the download route 404s on `null`
  rather than ever redirecting to that object's signed URL.
- **The `documents` Postgres table (file metadata, not bytes) has an RLS
  `SELECT` policy** (`prisma/migrations/20260821132500_documents_rls/`),
  same defense-in-depth posture as every other tenant table — see "Tenant
  isolation" above for what that does and doesn't cover.
- **Storage bucket policies (`storage.objects` RLS) are intentionally not
  used.** Only the service-role Supabase client (`lib/os/supabase/admin.ts`,
  server-only, never imported into a client component) ever talks to
  Storage — no browser code holds the anon key against this bucket, so
  there's no access path for `storage.objects` RLS to defend that isn't
  already gated by the RBAC checks above. Revisit if that ever changes
  (e.g. a future client-portal upload flow that talks to Storage directly).
- **No virus/malware scanning yet.** Tracked as a real gap in
  `/docs/implementation-plan.md` — close it before this handles real client
  financial documents at volume.

## Audit trail

`AuditEvent` (`prisma/schema.prisma`) is append-only by convention — no
application code updates or deletes rows from it. Written today for:
`USER_SIGNED_UP`, `MEMBERSHIP_ROLE_CHANGED`, `CLIENT_CREATED`,
`DOCUMENT_UPLOADED`, `DOCUMENT_DELETED`, `TASK_REVIEWED` (metadata records
the outcome — approved or changes requested). Extended per phase (the enum,
`AuditAction`, has room for `MEMBERSHIP_DEACTIVATED`, `CLIENT_UPDATED`,
`CLIENT_LIFECYCLE_CHANGED` already reserved for near-term use). Not yet
exposed in a UI (Read-only/Auditor role has `audit:view` permission
granted, waiting on a screen) — Phase 1/2 backlog item, see
`/docs/implementation-plan.md`.

## Authentication

Supabase Auth, email + password, via `@supabase/ssr`
(`lib/os/supabase/{client,server}.ts`, `middleware.ts`). Session
cookies are httpOnly and refreshed on every request by middleware using
`getUser()` (which revalidates against Supabase, not `getSession()`, which
only reads the possibly-stale cookie — the deliberate choice, see the
comment in `middleware.ts`). Password policy enforced client- and
server-side via the shared Zod schema (`lib/os/validation/auth.ts`):
minimum 10 characters, upper, lower, and a digit.

**Not yet built**: MFA, passwordless/magic-link login, session revocation UI.
The brief asks for "MFA-capable" — Supabase Auth supports TOTP MFA natively;
enabling it is a Phase 1/2-scoped follow-up (needs a settings UI for
enrollment), not a platform limitation.

## Secrets

`.env.example` documents every required variable with no real values.
`SUPABASE_SERVICE_ROLE_KEY` is used by `lib/os/supabase/admin.ts` (Storage
operations for Documents — see "Document storage" above) — the one place
in the codebase that imports it. Keep it server-only (never `NEXT_PUBLIC_`)
if it's ever needed elsewhere. Real secrets live only in Vercel's
Environment Variables and the developer's local `.env.local` (gitignored).

## Dependency posture

`npm audit` currently reports 3 high-severity advisories, all transitive
through `prisma`'s own config loader (`@prisma/config` → `deepmerge-ts`,
a stack-exhaustion-on-deeply-recursive-input issue). This is a build/CLI-time
dependency, not something bundled into the deployed app, and the inputs it
merges are our own config files, not attacker-controlled data — low real
risk, but worth re-checking (`npm audit` in the repo root) next time dependencies are
bumped.

## What's explicitly out of scope for this phase

Rate limiting, CSRF tokens (Next.js Server Actions have built-in origin
checking, which covers the current attack surface but hasn't been
independently verified), virus/malware scanning (no file upload exists
yet), field-level encryption, backup/restore runbooks, and incident-response
process. All tracked in `/docs/implementation-plan.md` against the phase
that introduces the feature they'd protect (documents, billing, etc.) —
listing them here now so nobody mistakes their absence for an oversight.
