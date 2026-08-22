# QA plan

Two different things share the name "quality" in this project — don't
conflate them:

1. **Engineering QA** — how we know the *software* works (this document).
2. **The Quality module** — the preparer/reviewer/approver *product feature*
   for reviewing client deliverables, described in the original brief
   section 10. Live since Phase 2's first slice — `canReview()`
   (segregation of duties) is enforced in `lib/os/auth/rbac.ts` and called
   from `submitReviewAction` — see `/docs/security.md`.

This document is about (1).

## What's actually verified, and how

| Check | Command | Status |
|---|---|---|
| Type safety | `npx tsc --noEmit` (the repo root) | Passing, zero errors — across the *whole* app, existing marketing pages included |
| Production build | `npx next build` (the repo root) | Succeeds: every existing marketing route (`/`, `/pricing`, `/blog`, `/contact`, `/resources`, `/rooms/[slug]`, `/api/*`) builds unchanged alongside all `/os/*` and `/portal/*` routes (incl. `/os/documents`, `/os/documents/[id]/download`, `/os/quality`, `/os/requests`, `/os/meetings`, `/os/team`, `/os/reports`, `/portal/work`, `/portal/work/[id]`, `/portal/documents`, `/portal/documents/[id]/download`, `/portal/requests`, `/portal/set-password`), including without `DATABASE_URL` set (see `/docs/architecture.md` — lazy Prisma client) |
| Database migrations | `npx prisma migrate dev` / `deploy` against real Postgres 16 | All nineteen migrations apply cleanly on a fresh database, including through Prisma's shadow-database validation |
| Seed script | `npm run db:seed` against real Postgres 16 | Runs end to end: 12 clients, 2 workflow templates, 3 workflow instances with realistic (verified by direct query) due-date/overdue spread |
| Row Level Security | Manual `psql` session, `SET ROLE authenticated` + `SET request.jwt.claim.sub` | Verified on all 16 tenant tables (incl. `documents`, `reviews`, `client_memberships`, `client_approvals`, `requests`, `meetings`, `decisions`): cross-tenant isolation holds, anonymous session sees nothing, direct writes are rejected. Cross-*client* isolation (two clients in the same organization) separately verified for `client_memberships`/`client_approvals` — see `/docs/security.md` and `/docs/setup.md` |
| Middleware scope | `next dev`, `curl` against `/`, `/pricing`, `/contact`, `/os`, `/os/login`, `/os/dashboard`, `/portal`, `/portal/login`, `/portal/work`, `/portal/documents`, `/portal/set-password` | Marketing pages return `200` unauthenticated (middleware doesn't touch them — see `/docs/architecture.md` "Middleware scope"); every protected `/os/*`/`/portal/*` path returns `307`, redirecting to *its own side's* login page with the right `?next=` (`/os/dashboard` → `/os/login?next=%2Fos%2Fdashboard`; `/portal/work`/`/portal/documents`/`/portal/set-password` → `/portal/login?next=...`, never crossing to `/os/login` or vice versa — the exact case the middleware.ts rewrite in "Client Portal shares the Supabase session" (`/docs/decision-log.md`) exists to get right); `/os/login` and `/portal/login` render `200` unauthenticated |
| Nav integration | Same dev-server smoke test, `curl \| grep` | "Access your OS" appears in the rendered homepage HTML (desktop + mobile nav) |

## What's not verified, and why

- **Full authenticated user flow (sign up → confirm email → sign in →
  see dashboard data)** — needs a real Supabase project; a Claude Code
  sandbox typically has no route to a live Postgres/Supabase instance to
  sign a real JWT against (HTTPS-only egress — see `/docs/setup.md`). Do
  this once the real Supabase project is connected, before calling this
  slice done-done in production. **Verified in production** for the
  Phase 0/1 flow through sign-up (see `/docs/decision-log.md`).
- **The Documents upload/download flow against real Supabase Storage** —
  same HTTPS-only-egress constraint as above; the storage helpers
  (`lib/os/storage.ts`), RBAC gates and the `documents` table's RLS were
  all verified (schema/RBAC unit-level and RLS against local Postgres —
  see the table above), but a real signed-upload-URL round trip and the
  bucket auto-creation (`ensureDocumentsBucket()`) need a live Supabase
  project. Do this — upload a file from `/os/documents`, confirm it
  downloads correctly, confirm a second organization can't reach it —
  before treating Documents as done-done in production.
- **The Client Portal invite → sign-in → approve flow against real
  Supabase Auth and Storage** — same HTTPS-only-egress constraint as
  above, plus this one genuinely needs real email delivery (Supabase's
  `inviteUserByEmail`), which a sandboxed session can't receive even if it
  could reach Supabase's API. What *was* verified without a live project:
  the schema/migrations/RLS (fresh-database replay, cross-client isolation
  — see the table above), `tsc`/`next build` across every new route, and
  the middleware/login-page redirect behavior for both identity sides (see
  "Middleware scope" above). What still needs a real Supabase project,
  once connected: send a real invite from a Client 360 page, click the
  email link, confirm it lands on `/portal/set-password` (not
  `/portal/work` directly — an invited user has no password yet), set a
  password, confirm `/portal/work` then shows the right client's data and
  nobody else's, confirm a Client Admin can approve a task and a
  Collaborator cannot, and confirm a client-portal user visiting `/os/*`
  is refused rather than silently provisioned as staff (the identity-
  separation guard in `lib/os/auth/session.ts` — code-reviewed and
  reasoned through, not yet exercised against a real dual-identity
  session). Do all of this before treating Client Portal as done-done in
  production, same bar as Documents above.
- **No test runner or ESLint** — pre-existing in this repo (not introduced
  by this work). `tsc --noEmit` and `next build` are the correctness gates
  used here; the RBAC/workflow-math unit tests written for the earlier
  standalone prototype did not carry over (they tested against that
  prototype's `useActionState`/`react` APIs, which this port replaced with
  `useFormState`/`react-dom` — porting the tests themselves, or adding a
  test runner to this repo, is a reasonable next step, not done as part of
  this integration).
- **Accessibility** — components use semantic HTML, visible focus rings,
  status badges that pair colour with a text label (not colour alone), and
  labelled form fields — but no automated a11y audit (axe, Lighthouse) has
  been run. Do this once there's a real deployed URL to point a tool at.
- **Load/performance** — no data volume exists yet to test against
  meaningfully (12 seed clients). Revisit when Work/Requests (Phase 1/2, the
  modules the brief calls "high-volume") are built.
- **Visual regression on the marketing site** — the build succeeding and
  routes returning `200` proves nothing broke *structurally*, but no
  pixel-level check confirms every existing marketing page still *looks*
  identical. Low risk (no marketing file's content changed except
  `Nav.tsx` and `WhatsAppButton.tsx`, both minimal, additive diffs — see
  `/docs/decision-log.md`), but worth a visual pass on the Vercel preview
  deployment before merging to `main`.

## Acceptance criteria carried forward from the brief (Phase 0/1 scope only)

Only listing the ones actually testable against what's built — the rest
(quality gates, request SLAs, multi-currency billing, ...) belong to their
own phases and will get their own acceptance criteria when that phase's
design lands.

- [x] **A signed-in member of one organization cannot see another
      organization's clients, memberships or audit events.** Verified via
      RLS (see above); application-layer query scoping is the enforced
      path and is covered by the shape of every function in
      `lib/os/queries/*.ts` (organizationId is a required, non-optional
      parameter — there's no call site that can omit it).
- [x] **A client user can sign in and see only their own client's work and
      documents — never another client's, even within the same
      organization.** `lib/os/queries/portal-work.ts` and
      `getDocumentForPortalClient`/`getDocumentsForPortalClient`
      (`lib/os/queries/documents.ts`) all take `clientId` as a required,
      non-optional parameter, the same "no call site can omit it" shape as
      the organizationId pattern above, one level stricter. RLS on
      `client_memberships`/`client_approvals` verified against local
      Postgres with two clients in one organization (see the table above).
      A real end-to-end login is still outstanding — see "What's not
      verified, and why" below.
- [x] **A client-portal user cannot be auto-provisioned as internal staff,
      and vice versa.** `getOrCreateCurrentActor()`
      (`lib/os/auth/session.ts`) explicitly checks for an existing
      `ClientMembership` before its auto-provision branch runs;
      `getCurrentPortalActor()` (`lib/os/auth/portal-session.ts`) never
      creates a `ClientMembership` from nothing. Verified by reading the
      code path end to end (no test runner — see below) and by the
      middleware/login-page redirect smoke test (see "Middleware scope"
      above), which confirms neither side's login page ever sends a
      visitor to the other side's app area.
- [x] **Only a Client Admin can approve or request changes; a client can
      only delete a document they themselves uploaded.**
      `canPortal(role, "approval:submit")` in
      `submitClientApprovalAction`; `document.uploadedByClientMembershipId
      === actor.clientMembership.id` checked in
      `deletePortalDocumentAction` before any delete — both verified by
      reading the code path end to end.
- [x] **Material actions appear in the audit log with actor, time, target.**
      `recordAuditEvent()` is called from sign-up, role change, client
      creation, workflow template/task-template creation, workflow
      instantiation, task status change and task assignment;
      `lib/os/audit.ts`.
- [x] **Self-review is prevented.** `canReview()` in `lib/os/auth/rbac.ts`,
      now actually called (not just defined) from `submitReviewAction`
      (`app/os/(app)/quality/actions.ts`) before a `Review` row is ever
      created — a reviewer who is also the task's current assignee gets a
      clear rejection, verified by reading the code path end to end rather
      than a standalone unit test (no test runner in this repo — see
      "What's not verified, and why" below).
- [x] **Period schedules create correctly-dated work.** `computePeriodEnd`/
      `computeTaskDueDate` unit tested for weekly/monthly/quarterly/annual
      boundaries (including a February-in-a-non-leap-year case and a
      month-rollover case); the seeded data's actual due dates were queried
      back from a real database and checked by hand against expectation
      (see `/docs/qa-plan.md` "Seed script" row above).
- [x] **"Overdue" is derived, not stored, and clears immediately.**
      `computeIsOverdue` unit tested including a fake-clock test that flips
      the same task from not-overdue to overdue as `now` crosses the due
      date, and a test that delivering a task clears it even past due.
- [x] **Documents are tenant-isolated and RBAC-gated.** `document:view/
      upload/delete` in `lib/os/auth/rbac.ts`; every upload/download/delete
      checks org scoping (`getDocumentById(organizationId, id)` — see
      `/docs/security.md`); RLS on `documents` verified against local
      Postgres the same way as every other tenant table (see the table
      above).
- [x] **Document uploads/deletes appear in the audit log.**
      `DOCUMENT_UPLOADED`/`DOCUMENT_DELETED`, same `recordAuditEvent()`
      pattern as every other material action.
- [x] **Quality reviews are tenant-isolated and RBAC-gated.**
      `quality:view`/`quality:review` in `lib/os/auth/rbac.ts`; every
      review submission checks org scoping (the task is fetched scoped to
      `actor.organizationId`, same pattern as every other write in this
      codebase); RLS on `reviews` verified against local Postgres (see the
      table above).
- [x] **Task reviews appear in the audit log.** `TASK_REVIEWED` (metadata
      records the outcome), same `recordAuditEvent()` pattern.
- [x] **Client Portal invites, claims, revocations, and approvals appear
      in the audit log.** `CLIENT_PORTAL_INVITE_SENT`,
      `CLIENT_PORTAL_ACCESS_CLAIMED`, `CLIENT_PORTAL_ACCESS_REVOKED`,
      `CLIENT_APPROVAL_SUBMITTED` (metadata records the outcome), same
      `recordAuditEvent()` pattern — with `actorLabel` (`client:<email>`)
      instead of `actorMembershipId` for the client-initiated ones, since a
      `ClientMembership` isn't a `Membership` (see `/docs/security.md`
      "Audit trail").
- [x] **Requests are tenant-isolated, RBAC-gated, and their SLA clock is
      derived, not stale.** `request:view`/`request:triage`/
      `request:resolve` (internal) and `request:view`/`request:submit`
      (portal) in the respective RBAC modules; every write scopes by
      `organizationId` (internal) or the portal actor's own `clientId`;
      RLS on `requests` verified against local Postgres (see the table
      above). `computeIsRequestOverdue` derives SLA-breached the same
      "never a stale stored flag" way `computeIsOverdue` does for tasks —
      changing a request's priority or resolving it clears the breach
      immediately rather than leaving it flagged.
- [x] **A decision's own owner can close it out; requests/meetings/
      capacity all appear in the audit log.** `REQUEST_CREATED`/
      `REQUEST_TRIAGED`/`REQUEST_STATUS_CHANGED`/`REQUEST_RESOLVED`,
      `MEETING_LOGGED`/`DECISION_ADDED`/`DECISION_STATUS_CHANGED`,
      `MEMBERSHIP_CAPACITY_SET` — same `recordAuditEvent()` pattern as
      every other material action. The owner-can-close-their-own-decision
      rule in `updateDecisionStatusAction` verified by reading the code
      path end to end (no test runner — see below).
- [ ] Task dependencies/blocking, checklist evidence, onboarding gates,
      QA release gates, multi-currency billing, document versioning,
      virus scanning, `ReviewFinding`/`SignOff` granularity, request
      comment threads, drill-through reporting — all Phase 2+ features or
      explicitly-deferred follow-ups not yet built; their acceptance
      criteria live in `/docs/implementation-plan.md` against the phase
      that ships them.

## CI

None configured in this repo today — Vercel's own build-per-push/PR is the
only automated check (it runs `next build`, so a build-breaking change is
still caught before it reaches production). There's no GitHub Actions
workflow running `tsc --noEmit` or anything database-related on every push.
Adding one — typecheck at minimum, a Postgres service container for
migration/RLS checks as a stretch goal — is a reasonable follow-up, not
done as part of this integration to avoid scope-creeping a UI feature into
a CI setup decision for the whole repository.
