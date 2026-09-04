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
| Practice Administrator | Clients, team roles, settings, audit log, workflow templates & instantiation, documents (incl. delete), quality review, requests (triage & resolve), meetings (manage), team capacity — not billing, not task execution |
| Portfolio Lead / CFO | Clients (view/create/edit), billing visibility, start work, update/assign tasks, documents (view/upload), quality review, requests (triage & resolve), meetings (manage), team (view only) |
| Client Relationship Manager | Clients (view/edit), documents (view/upload), quality (view only), requests (triage & resolve), meetings (manage), team (view only) |
| Service Lead | Clients (view/edit), manage workflow templates, start work, update/assign tasks, documents (view/upload), quality review, requests (triage & resolve), meetings (manage), team (view only) |
| Preparer / Analyst | Clients (view only), update task status (their own delivery work), documents (view/upload), quality (view only — cannot submit reviews at all), requests/meetings/team (view only) |
| Independent Reviewer | Clients (view only), documents (view only), quality review, requests/meetings/team (view only) |
| Finance / Billing | Clients (view), billing visibility, documents (view only), quality (view only), requests/meetings/team (view only) |
| Read-only / Auditor | Clients (view), audit log, documents (view only), quality (view only), requests/meetings/team (view only) |

Every role above also has `request:view`, `meeting:view` and `team:view` —
seeing what's open/logged/staffed is deliberately broad, the same way
`quality:view`/`document:view` already are; the narrower authority is
*acting* on them (`request:triage`/`request:resolve`, `meeting:manage`,
`team:manageCapacity`, held only by Managing Partner, Practice Admin,
Portfolio Lead, Relationship Manager and Service Lead — `team:manageCapacity`
further narrowed to just Managing Partner/Practice Admin).

Document *delete* is deliberately withheld from every role except Managing
Partner and Practice Administrator — everyone who can view or upload can
add to the record, but removing a file (destructive, no undo — Documents
has no version history yet, see `/docs/implementation-plan.md`) is held to
a higher bar than upload.

**Client Portal roles** are a wholly separate matrix
(`lib/os/auth/portal-rbac.ts`, `PORTAL_ROLE_PERMISSIONS`, `canPortal()`) —
see "Client Portal identity separation" below for why this is never merged
into the table above:

| Client role | Portal authority |
|---|---|
| Client Admin | View work, documents & requests, upload documents, raise a request, approve or request changes on a task, delete a document *they themselves* uploaded |
| Client Collaborator | View work, documents & requests, upload documents, raise a request, delete a document *they themselves* uploaded — cannot approve or request changes |

`document:delete` in the portal matrix only gates *whether a role can ever
delete anything* — the stronger rule (only your own upload, never a
staff-delivered document) is checked separately in
`deletePortalDocumentAction` (`app/portal/(app)/documents/actions.ts`)
against `Document.uploadedByClientMembershipId`, the same
situational-check-on-top-of-a-static-table shape as `canReview()` above.

The permission surface grows with each phase — every new module adds its
own permissions to the same matrix rather than inventing a parallel
authorization mechanism: `client:*`, `membership:*`, `audit:view`,
`settings:manage`, `billing:view`, `workflow:manageTemplates`,
`workflow:instantiate`, `task:updateStatus`, `task:assign`,
`document:view`, `document:upload`, `document:delete`, `quality:view`,
`quality:review`, `request:view`, `request:triage`, `request:resolve`,
`meeting:view`, `meeting:manage`, `team:view`, `team:manageCapacity`.
`billing:view` already exists in the matrix ahead of the
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

## Client Portal identity separation

Internal staff (`Membership`, scoped to an `Organization`) and client-portal
users (`ClientMembership`, scoped to exactly one `Client`) share the same
underlying Supabase `auth.users` table and the same session cookies — `/os`
and `/portal` are the same Next.js app on the same domain, so there's only
ever one Supabase session per signed-in browser. That's a real
privilege-escalation surface if the two sides aren't kept deliberately
separate, not a hypothetical one: without the guard below, a client contact
signing in for the first time would fall into `/os`'s "auto-provision on
first sign-in" bootstrap (`getOrCreateCurrentActor()`, see "Authentication"
below) and become an internal Preparer/Analyst with read access to every
client in the practice, not just their own.

Two independent, deliberately asymmetric guards close this:

- **`getOrCreateCurrentActor()` (`lib/os/auth/session.ts`) refuses to
  auto-provision an internal `Membership`** for a signed-in user who
  already has an active `ClientMembership` — checked before the
  first-sign-in bootstrap branch runs, returning `null` (not staff) rather
  than creating one.
- **`getCurrentPortalActor()` (`lib/os/auth/portal-session.ts`) never
  creates a `ClientMembership` out of nothing.** A `ClientMembership` row
  only ever comes from staff sending an invite
  (`inviteClientUserAction`, gated by `client:managePortalAccess`). On
  first portal sign-in it *claims* a pending invite (matches by email,
  case-insensitive, where `userId IS NULL`, and attaches the signed-in
  user's id) — it does not fall back to treating an unmatched signed-in
  user as a client.

The two checks are asymmetric on purpose: the internal side actively
*refuses* an identity it would otherwise auto-create; the portal side
simply never auto-creates one in the first place; a signed-in Supabase user
who is neither an internal `Membership` nor a `ClientMembership` (pending
or claimed) resolves to `null` on both sides — signed in to nothing,
everywhere in the app.

This separation also shows up in `middleware.ts`: an earlier version
bounced any authenticated session straight from `/os/login` to
`/os/dashboard`. That's unsafe once a Supabase session can belong to
either identity — bouncing a signed-in client-portal user into
`/os/dashboard` would immediately bounce them right back out (the guard
above correctly refuses them), an infinite redirect loop. Middleware can't
resolve which side a session belongs to itself (Edge runtime, no Prisma
query); that check now lives in each side's own login/signup page instead,
which can afford a real DB-backed actor lookup — see the comment in
`app/os/(auth)/login/page.tsx`.

`ClientRole` (`CLIENT_ADMIN` / `CLIENT_COLLABORATOR`) is a wholly separate
enum and permission table (`lib/os/auth/portal-rbac.ts`, `canPortal()`)
from `OrgRole`/`can()` — a client contact is never type-compatible with
internal staff, so a bug can't accidentally check a client's access against
the internal permission matrix or vice versa.

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
   seven migrations (`20260819092604_enable_row_level_security`,
   `20260819094215_workflow_engine_rls`, `20260821132500_documents_rls`,
   `20260821174500_reviews_rls`, `20260822090500_client_portal_rls`,
   `20260822135000_requests_rls`, `20260822135700_meetings_decisions_rls`)
   enable RLS and add `SELECT` policies on every tenant table
   (organizations, memberships, clients, client_contacts, audit_events,
   workflow_templates, task_templates, workflow_instances, tasks,
   documents, reviews, client_memberships, client_approvals, requests,
   meetings, decisions), keyed off `auth.uid()`. This protects any *other*
   route into the same database —
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

   `client_memberships`/`client_approvals` reuse this same pattern one
   level stricter — a parallel `public.current_client_ids()` helper scoped
   to the specific `Client`(s) a portal user belongs to, never their whole
   `Organization` (a portal user has no `memberships` row at all, so
   `current_org_ids()` already correctly returns empty for them — these two
   tables just needed their own, tighter helper). Re-verified against a
   real local Postgres instance the same way: two clients seeded under one
   organization, each with its own `ClientMembership` user — a session
   claiming client X's user sees exactly client X's `client_memberships`
   row, not client Y's. Deliberately **not** extended in this migration:
   RLS policies letting a portal user read `clients`/`workflow_instances`/
   `tasks`/`documents` via `current_client_ids()` — the portal's actually
   enforced boundary for those four tables is application-layer scoping by
   `clientId` (every portal query in `lib/os/queries/portal-work.ts` and
   the `getDocumentForPortalClient`/`getDocumentsForPortalClient` functions
   in `lib/os/queries/documents.ts` takes `clientId` directly, the same
   "app-layer is primary, RLS is defense-in-depth" split as the rest of
   this section), not an oversight — see `/docs/decision-log.md`.

   `requests` has its own `organizationId` column (a request is always
   staff-side visible portfolio-wide, unlike client-portal data), so its
   policy is the simple direct-column shape, same as `documents`.
   `meetings` is the same; `decisions` has no `organizationId` of its own
   and joins through `meetings`, the same EXISTS-through-a-join shape as
   `reviews` joining through `tasks`. Re-verified against a real local
   Postgres instance the same way as every table above: two organizations
   seeded with a request, a meeting and a decision each — a session
   claiming Org A's user sees exactly Org A's rows across all three
   tables, none of Org B's.

## Document storage

Files (bucket `documents` in Supabase Storage) are a third access surface,
distinct from both layers in "Tenant isolation" above:

- **Never a public bucket, never a long-lived URL.** Every upload and
  download is mediated by the app server, which mints a Supabase Storage
  *signed URL* scoped to one object — upload URLs via
  `requestDocumentUploadAction`, download URLs via the
  `/os/documents/[id]/download` route handler (5-minute expiry). A client
  never holds a credential that works against the bucket generally, only a
  single-object, time-boxed one. The Client Portal's own upload/download
  path (`requestPortalDocumentUploadAction`,
  `/portal/documents/[id]/download`) is a parallel mirror of this, scoped
  by `clientId` instead of `organizationId` — see "Client Portal identity
  separation" above for why that's the boundary that matters there.
- **RBAC is checked before every signed URL is minted**, same as any other
  write/read: `document:upload` for the upload path, `document:view` for
  download — see `lib/os/auth/rbac.ts` (internal) /
  `lib/os/auth/portal-rbac.ts` (portal). Scoping is enforced the same way
  as `getClientById` — `getDocumentById(organizationId, id)` returns `null`
  for another org's document (`getDocumentForPortalClient(clientId, id)`
  returns `null` for another client's, on the portal side), and the
  download route 404s on `null` rather than ever redirecting to that
  object's signed URL.
- **A client can only ever delete a document they themselves uploaded.**
  `Document.uploadedByClientMembershipId` (nullable, `SetNull` on
  membership removal) attributes a client-uploaded document to the
  specific `ClientMembership` that uploaded it;
  `deletePortalDocumentAction` checks this before any delete, so a client
  can correct their own mistaken upload but can never remove a document
  staff delivered to them, or one a different person at their own company
  uploaded. `document:delete` in `portal-rbac.ts` only gates whether a
  role can delete *anything* — this per-document ownership check is
  separate and stronger.
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
the outcome — approved or changes requested), and, for the Client Portal:
`CLIENT_PORTAL_INVITE_SENT` (and re-sent/reactivated invites),
`CLIENT_PORTAL_ACCESS_CLAIMED` (first sign-in claiming a pending invite),
`CLIENT_PORTAL_ACCESS_REVOKED`, and `CLIENT_APPROVAL_SUBMITTED` (metadata
records the outcome, same shape as `TASK_REVIEWED`), and, for Requests/
Meetings/Capacity: `REQUEST_CREATED`, `REQUEST_TRIAGED`,
`REQUEST_STATUS_CHANGED`, `REQUEST_RESOLVED`, `MEETING_LOGGED`,
`DECISION_ADDED`, `DECISION_STATUS_CHANGED`, `MEMBERSHIP_CAPACITY_SET`.
Extended per phase
(the enum, `AuditAction`, has room for `MEMBERSHIP_DEACTIVATED`,
`CLIENT_UPDATED`, `CLIENT_LIFECYCLE_CHANGED` already reserved for near-term
use). A client-portal action's `actorLabel` is `client:<email>` rather than
an `actorMembershipId` — see the `AuditEvent.actorLabel` comment in
`prisma/schema.prisma` — since a `ClientMembership` isn't a `Membership`
and the audit trail's actor foreign key only ever points at the latter.
Not yet exposed in a UI (Read-only/Auditor role has `audit:view` permission
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

**Client Portal accounts are invite-only, never self-serve.** There is no
`/portal/signup` — a `ClientMembership` row only ever comes from
`inviteClientUserAction`. The invite email (Supabase Auth
`inviteUserByEmail`) carries a link to `/portal/auth/callback`, which
exchanges its code for a session and always sends a first-time claimant to
`/portal/set-password` (mandatory, not skippable — an invited user has no
password yet) before they can reach `/portal/work`. See
`/docs/setup.md` "Client Portal invite emails" for the one Supabase Redirect
URL setting this needs.

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
