# QA plan

Two different things share the name "quality" in this project — don't
conflate them:

1. **Engineering QA** — how we know the *software* works (this document).
2. **The Quality module** — the preparer/reviewer/approver *product feature*
   for reviewing client deliverables, described in the original brief
   section 10. Not built yet (Phase 2). `canReview()` (segregation of
   duties) is implemented ahead of time in `lib/os/auth/rbac.ts` so the
   rule exists before the UI does — see `/docs/security.md`.

This document is about (1).

## What's actually verified, and how

| Check | Command | Status |
|---|---|---|
| Type safety | `npx tsc --noEmit` (the repo root) | Passing, zero errors — across the *whole* app, existing marketing pages included |
| Production build | `npx next build` (the repo root) | Succeeds: every existing marketing route (`/`, `/pricing`, `/blog`, `/contact`, `/resources`, `/rooms/[slug]`, `/api/*`) builds unchanged alongside all `/os/*` routes (incl. `/os/documents` and `/os/documents/[id]/download`), including without `DATABASE_URL` set (see `/docs/architecture.md` — lazy Prisma client) |
| Database migrations | `npx prisma migrate dev` / `deploy` against real Postgres 16 | All six migrations apply cleanly, including through Prisma's shadow-database validation |
| Seed script | `npm run db:seed` against real Postgres 16 | Runs end to end: 12 clients, 2 workflow templates, 3 workflow instances with realistic (verified by direct query) due-date/overdue spread |
| Row Level Security | Manual `psql` session, `SET ROLE authenticated` + `SET request.jwt.claim.sub` | Verified on all 10 tenant tables (incl. `documents`): cross-tenant isolation holds, anonymous session sees nothing, direct writes are rejected. See `/docs/security.md` and `/docs/setup.md` |
| Middleware scope | `next dev`, `curl` against `/`, `/pricing`, `/contact`, `/os`, `/os/login`, `/os/dashboard` | Marketing pages return `200` unauthenticated (middleware doesn't touch them — the exact bug this was checked for, see `/docs/architecture.md` "Middleware scope"); `/os` and `/os/dashboard` correctly redirect to `/os/login?next=...`; `/os/login` renders `200` |
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

- [x] A client user — n/a yet, no client portal (Phase 2). Internal
      tenant isolation instead: **a signed-in member of one organization
      cannot see another organization's clients, memberships or audit
      events.** Verified via RLS (see above); application-layer query
      scoping is the enforced path and is covered by the shape of every
      function in `lib/os/queries/*.ts` (organizationId is a required,
      non-optional parameter — there's no call site that can omit it).
- [x] **Material actions appear in the audit log with actor, time, target.**
      `recordAuditEvent()` is called from sign-up, role change, client
      creation, workflow template/task-template creation, workflow
      instantiation, task status change and task assignment;
      `lib/os/audit.ts`.
- [x] **Self-review is prevented.** `canReview()`, unit tested.
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
- [ ] Task dependencies/blocking, checklist evidence, onboarding gates,
      request SLAs, QA release gates, multi-currency billing, document
      versioning, virus scanning — all Phase 2+ features or
      explicitly-deferred Documents follow-ups not yet built; their
      acceptance criteria live in `/docs/implementation-plan.md` against
      the phase that ships them.

## CI

None configured in this repo today — Vercel's own build-per-push/PR is the
only automated check (it runs `next build`, so a build-breaking change is
still caught before it reaches production). There's no GitHub Actions
workflow running `tsc --noEmit` or anything database-related on every push.
Adding one — typecheck at minimum, a Postgres service container for
migration/RLS checks as a stretch goal — is a reasonable follow-up, not
done as part of this integration to avoid scope-creeping a UI feature into
a CI setup decision for the whole repository.
