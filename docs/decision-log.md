# Decision log

Assumptions made to keep moving without a blocking question, in the order
they came up. All marked reversible unless stated otherwise — flag any of
these to revisit and it can change without a schema rewrite.

## Moved from a standalone prototype repo into this, the real site

**Context**: Phases 0 and 1 were first built in a separate repository
(`cfo-innovation-partners`) as a brand-new Next.js 16/React 19/Tailwind v4
app, before it was clear that repo wasn't the practice's actual production
site. Once the real, already-live site (`cfopartners-fund`, this repo —
Next.js 14.2, React 18, Tailwind v3, a distinct real design) was
identified, the OS was ported into it as routes under `/os` rather than
kept as a separate Vercel project.

**Decision**: adapt the OS code *down* to match this app's real,
already-shipping dependency versions, rather than upgrade this app's
dependencies up to match the OS prototype's. Concretely:

- **Next.js stays 14.2.x** (bumped only the patch version, 14.2.5 → 14.2.35
  — see "Next.js patch bump" below), not 16.
- **React 19's `useActionState`** (from `"react"`) was replaced everywhere
  with **React 18's `useFormState`/`useFormStatus`** (from `"react-dom"`)
  — see `components/os/ui/submit-button.tsx` and `pending-select.tsx`,
  and `/docs/architecture.md` "React 18 form actions."
- **Dynamic route `params`** were changed from Next 15+'s `Promise<{id}>`
  shape back to Next 14's plain `{id: string}` (three routes:
  `clients/[id]`, `templates/[id]`, `work/[id]`).
- **Tailwind v4's CSS-first `@theme` tokens** (a made-up navy/gold palette,
  since the real site's design wasn't visible yet when that work started)
  were replaced with **this site's real, already-defined Tailwind v3
  tokens** (`ink`, `accent`, `bg`, `line`) from `tailwind.config.ts` — see
  `/docs/product-spec.md` "Visual system."

**Why**: this repository has a live production site with real traffic and
no automated test suite. Upgrading its Next.js major version (14→16) *and*
React major version (18→19) *and* Tailwind major version (3→4) as a side
effect of adding one nav link and a set of new routes would risk
regressions across every existing page, verified only by hoping the
upgrades are safe. Porting the OS's code down instead means every existing
file the marketing site depends on is untouched — `git diff` on this
change touches only two pre-existing files (`Nav.tsx`, `WhatsAppButton.tsx`,
both small, additive edits) plus new files under `app/os/`,
`components/os/`, `lib/os/`, `prisma/`. Verified: `next build` succeeds for
the whole app, listing every existing marketing route unchanged alongside
the new `/os/*` ones — see `/docs/qa-plan.md`.

**Reversible?** Yes, but it's real work in the other direction too — a
future Next.js 14→16 upgrade (see "Next.js patch bump, not a major
upgrade" below) would let some of this be simplified back (e.g.
`useFormState` → `useActionState` again), but isn't required for any of it
to keep working; Next.js has no plan to remove the `useFormState` API path
for years, if ever.

## Next.js patch bump, not a major upgrade

**Decision**: bump `next` from `14.2.5` to `14.2.35` (latest patch within
the same minor version) as part of this work. Do **not** upgrade to
Next.js 15 or 16.

**Why**: `npm install` flagged `14.2.5` as carrying a publicly disclosed
**critical** security vulnerability. `14.2.35` is a same-minor-version
patch release — by semver, no breaking API changes — and closes that
critical issue plus several others. Verified before and after: `npm audit`
went from "5 vulnerabilities (4 high, 1 critical)" to "5 high severity, 0
critical," and the `next` package's own advisory list dropped from ~35
entries to ~21.

**What's left**: `npm audit` still lists ~21 high-severity Next.js
advisories against `14.2.35`, and per its own `fixAvailable` data, closing
*all* of them requires the full jump to `16.3.1` (`isSemVerMajor: true`).
That's a real, separate decision — a major-version upgrade of the live
site's framework, with its own testing burden — not something to bundle
silently into a feature branch that's nominally "add an OS page." Flagging
it here explicitly: **CFOIP should schedule a dedicated Next.js major-
version upgrade** (with a visual/functional QA pass across every existing
marketing page) rather than let it happen invisibly. Not done in this
change.

## Middleware scoped to `/os` only

**Decision**: `middleware.ts`'s matcher is `["/os/:path*"]`, not "everything
except static assets."

**Why**: the OS prototype's original middleware was written for an app that
is 100% behind authentication — matching everything except a few static
paths was correct there. Applied unmodified to this repo, it would have
forced every marketing page through Supabase auth middleware, redirecting
real visitors to a login page that has nothing to do with them. Caught and
fixed before merging, and verified directly: `curl` against `/`, `/pricing`,
`/contact` all return `200` unauthenticated; `/os` and `/os/dashboard`
correctly redirect to `/os/login`. See `/docs/qa-plan.md`.

## WhatsApp button hidden on `/os`

**Decision**: `components/WhatsAppButton.tsx` now returns `null` when the
current path starts with `/os`.

**Why**: it's rendered globally from the root layout (shared by the
marketing site and `/os` — only one root layout can exist per Next.js
app), so without this it would float over every internal OS screen too.
Harmless functionally, but out of place on an internal practice-management
tool. Small, isolated, additive change to one existing component.

## `components/os/ui/` kept separate from `components/ui/`

Restating from `/docs/architecture.md` for visibility here: the marketing
site's existing `Button`/`Card` primitives were never modified or reused
directly — OS-specific versions live in `components/os/ui/`, sharing only
the underlying brand tokens and `lib/utils.ts`'s `cn()` helper. Zero risk
of an OS-driven change to button/card styling ever touching a marketing
page.

## Single-tenant bootstrap

**Decision**: model the schema as multi-tenant (`Organization` →
everything) but only ever create one `Organization` row
(`slug = "cfoip"`), auto-created on first sign-in.

**Why**: CFOIP runs one practice. Hard-coding "there is exactly one
organization" throughout the app would be simpler today but means real
rework if CFOIP ever wants to run a second brand or spin off a sister
practice on the same platform. Modelling multi-tenant now costs almost
nothing (one `organizationId` column and filter per query) and keeps the
door open.

**Reversible?** The schema shape stays either way. What would change: the
sign-up flow currently has no "which organization" step (there's only one
to join) — adding a second org means adding that step.

## First-user-becomes-Managing-Partner

**Decision**: the first person to sign in to a fresh organization is
automatically `MANAGING_PARTNER`; everyone after defaults to
`PREPARER_ANALYST` pending a manual promotion from Settings → Team.

**Why**: the brief wants self-serve "log in or create an account" with no
separate invite-and-provision system built yet (that's more Phase 2/3
scope — proper invite links, SSO, etc.). This bootstrap rule is the standard
pattern for exactly this situation and avoids a chicken-and-egg problem
(you need an admin to create the first admin).

**Risk accepted**: anyone who discovers the sign-up URL before CFOIP's first
real user does becomes Managing Partner. Low risk in practice — the URL
isn't advertised until the marketing site's "Access your OS" link points to
a domain CFOIP controls — but worth CFOIP actually being the first sign-up
once the real Supabase project exists, not leaving it open for testing.

**Reversible?** Yes — replace with an explicit invite-code or
domain-allowlist check in `lib/os/auth/session.ts` `getOrCreateCurrentActor`
whenever this stops being acceptable.

## Marketing site left as static HTML, OS as a separate Next.js app

See `/docs/architecture.md` "Why a subdirectory instead of one Next.js app"
for the reasoning. Reversible, but the cost of reversing grows every time
someone hand-edits `index.html` (more drift to reconcile if it's ever ported
into JSX later).

## "Access your OS" link points to a placeholder domain

`index.html`'s nav link is `https://os.cfoinnovationpartners.com` — a
guess at what CFOIP will eventually use, not a domain that resolves today.
**Must be updated** once the Vercel deployment has a real URL (either the
`*.vercel.app` default or a connected custom domain) — see
`/docs/setup.md` step 6. Until then, clicking it in production goes nowhere.

## Prisma 7 driver adapters instead of the classic client

Prisma 7 removed `datasource.url` from the client-facing config
(`schema.prisma` no longer carries a live connection string — only the CLI's
`prisma.config.ts` does, for migrations). The running app builds its
`PrismaClient` with `@prisma/adapter-pg` instead. This wasn't a choice among
alternatives — it's a hard requirement of the Prisma version available at
build time (7.9.1, current on npm as of this session) — but it does mean the
migration-connection (`DIRECT_URL`) and runtime-connection (`DATABASE_URL`)
are configured in two different places (`prisma.config.ts` vs. `lib/os/db.ts`)
rather than one. Documented explicitly in both files so it isn't mistaken
for a bug later.

## `ServiceBucket` as an enum, not a table

**Decision**: Phase 1 models a client's service portfolio as a fixed enum
(`MONTHLY_CFO`, `BOOKKEEPING_OVERSIGHT`, `CASH_FLOW_ADVISORY`,
`INVESTOR_READINESS`, `AD_HOC_PROJECTS`) rather than a configurable
`ServicePackage` table.

**Why**: matches the five buckets the brief's own seed-data spec calls for,
and nothing in Phase 0/1 needs an administrator to define a *new* bucket
through the UI yet — that need arrives with Templates & Automations.
Building the configurable version now, before Templates exists to configure
it, would be speculative.

**Reversible?** Yes, but not free — becomes a real migration (enum column →
foreign key) when Phase 1's workflow-template engine needs services to be
configurable. Flagged in `/docs/implementation-plan.md` under Phase 1's
"new entities needed."

## Row Level Security does not yet cover the app's own database connection

Covered in full in `/docs/security.md` "Tenant isolation" — restating the
headline here because it's the single most important thing to know before
treating this as more secure than it is: **the Prisma connection bypasses
RLS.** Tenant isolation for the app itself is enforced in application code
today, not by the database. RLS protects other access paths. Closing that
gap (routing the app's own queries through an RLS-aware connection) is real
work, not a checkbox — tracked here rather than silently assumed done.

## Workflow engine shipped flat, unversioned, with manual assignment

Building the workflow-template engine (Phase 1) surfaced four places where
the full brief asks for more than this slice builds: task dependencies/
blocking rules, template version history, role-based auto-assignment, and
timezone-aware period math. Each is a real, deliberate simplification, not
an oversight — full reasoning for each is in `/docs/implementation-plan.md`
"Simplifications taken to ship this slice" rather than duplicated here, but
they're listed there precisely so a decision log reader knows to look:
this slice runs real recurring monthly/quarterly work end to end, without
those four things.

## `task:updateStatus` is not scoped to "my own assigned tasks"

**Decision**: any Preparer/Analyst can change the status of any task in the
organization, not just tasks assigned to them.

**Why**: adding "or the task is assigned to me" as an alternate check is a
small code change, but there was no product signal yet for whether CFOIP
wants that restriction (a small team might prefer anyone can pick up any
task) versus wants it locked down (accountability). Shipped permissive;
tightening later is a one-line change to `ROLE_PERMISSIONS` plus a
`task.assigneeMembershipId === actor.membership.id` check in
`updateTaskStatusAction` — not a schema change.

## No Playwright / E2E tests yet

Deliberately not added half-configured against a fake auth session — see
`/docs/qa-plan.md` "What's not verified, and why."

## `NEXT_PUBLIC_*` env vars must not be marked Sensitive; edits need a redeploy

Two Vercel-specific gotchas hit while getting the first `/os` deployment
live, neither a code bug:

1. Marking `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` as
   **Sensitive** in the Vercel dashboard excludes them from the build step
   (they're injected at runtime only). Next.js inlines `NEXT_PUBLIC_*`
   values into the client bundle at *build* time, so a Sensitive
   `NEXT_PUBLIC_*` var silently resolves to `undefined` in the deployed
   app — the middleware's fail-closed check then reports the vars as
   missing, even though they're visibly present in the dashboard. Fixed by
   re-adding both without the Sensitive flag (Vercel doesn't allow
   toggling it on an existing variable, so it has to be deleted and
   re-added).
2. Editing an environment variable's value does **not** trigger a
   redeploy — Vercel deployments are immutable snapshots taken at build
   time. After the fix in (1), the existing branch deployment was still
   serving the old (broken) snapshot until a new deployment was built.
   `/docs/setup.md` step 6 now says this explicitly, including that a
   redeploy must target the *specific branch* (redeploying `main` doesn't
   help — `main` doesn't have `/os` until this branch merges).

## Documents: signed-URL direct upload, no server action carries file bytes

**Decision**: the browser uploads a file straight to Supabase Storage over
a signed URL that `requestDocumentUploadAction` mints (metadata-only, tiny
request/response); the file bytes never pass through a Next.js server
action or route handler. Downloads are the same shape in reverse —
`/os/documents/[id]/download` checks RBAC and org scoping, then redirects
to a 5-minute signed URL.

**Why**: Vercel Serverless Functions cap request bodies at roughly 4.5 MB.
A scanned financial statement or a management accounts pack routinely
exceeds that. Routing bytes through a server action would work in local
dev (no such cap) and then fail silently in production on anything but a
small file — exactly the kind of gap that's easy to miss until a real user
hits it. Signed-URL direct upload has no such ceiling (bounded instead by
`MAX_DOCUMENT_SIZE_BYTES` = 25 MB, an app-level choice, not a platform one).

**Reversible?** Yes — the two-step action shape
(`requestDocumentUploadAction` / `confirmDocumentUploadAction`) is already
separate from the UI; swapping the transport later (e.g. if Vercel's limit
changes, or a background job takes over large uploads) doesn't touch RBAC,
audit logging or the `documents` table.

## Documents Storage bucket is created lazily by the app, not a manual step

**Decision**: `ensureDocumentsBucket()` in `lib/os/storage.ts` creates the
`documents` Supabase Storage bucket on first use if it doesn't already
exist, rather than adding a "create a Storage bucket" step to
`/docs/setup.md`.

**Why**: every other Supabase setup step that genuinely can't be automated
(creating the project itself, copying API keys, setting the database
password) already requires the dashboard — no need to add one more manual
click for something the app can safely do itself. Storage's management API
is a normal HTTPS call (unlike the Postgres connection, which is blocked
from a sandboxed Claude Code session — see `/docs/setup.md`), so this was
actually possible to build, not just convenient in theory.

**Reversible?** Yes, trivially — delete the function, add a manual step to
`/docs/setup.md` instead, if CFOIP ever wants tighter control over bucket
creation (e.g. non-default settings the lazy path doesn't set).

## `SUPABASE_SERVICE_ROLE_KEY` sat unfilled in Vercel for two days

Not a code decision, but worth recording exactly like the other Vercel env
var gotchas above: the variable was added to Vercel back when the Phase 0/1
`/os` work started, before anything in the codebase actually read it (see
`.env.example`'s comment history). It went unnoticed that its value was
never actually filled in, because nothing exercised it — the first thing
that did was `lib/os/supabase/admin.ts` (Documents' Storage client), which
surfaced it immediately as `getSupabaseAdmin()` throwing "are not set."

**Lesson for next time a var is added ahead of the feature that uses it**:
either fill in the real value at add-time even if unused yet, or leave a
loud placeholder value (not blank) that fails obviously the moment
something tries to read it — a genuinely empty Vercel variable and a
never-added one look identical to `process.env`, so "it's in the
dashboard" isn't the same as "it has a value."

## Quality reviews a `Task`, not a separate versioned `Deliverable`

**Decision**: the first Quality slice adds one `Review` model tied to
`Task`, using the `UNDER_REVIEW` status that already existed on
`TaskStatus` (unused until now) as the review trigger — not the
`Deliverable` → `DeliverableVersion` → `Review` → `ReviewFinding` →
`SignOff` chain sketched in `/docs/implementation-plan.md`'s original
Phase 2 outline.

**Why**: `Task` already models exactly the unit of work Quality needs to
gate — a title, an assignee, a due date, a status lifecycle that already
included `UNDER_REVIEW` → `APPROVED` → `DELIVERED`. Building a parallel
`Deliverable` entity would mean two overlapping concepts for "the thing
being worked on" in the same Phase 1/2 slice, with no product signal yet
for why a deliverable needs to be distinct from its task (multiple
deliverables per task? a deliverable spanning multiple tasks? — no current
feature needs either). Reusing `Task` means the segregation-of-duties rule
(`canReview()`) protects real, already-shipping work immediately, not a
new parallel concept nobody's used yet.

**What's genuinely deferred, not silently dropped** (see
`/docs/implementation-plan.md` "Simplifications" for the full reasoning
per item): `ReviewFinding` (a review is one comments field, not a
checklist of discrete issues), `DeliverableVersion` (no link between a
specific uploaded Document and the review outcome it received), and a
distinct `SignOff` step (approval and sign-off are the same event today —
preparer → reviewer/approver, not preparer → reviewer → approver as three
separate roles).

**Reversible?** Yes, but not free. If CFOIP's real usage shows tasks
genuinely need multiple review-able deliverables, or a review needs to
survive the task being deleted/restructured, that's a real migration
(`Review.taskId` → `Review.deliverableId`, with `Deliverable` introduced
as its own entity) — not a config flip. Flagged here so it isn't
mistaken for the final shape.

## Specialist review still needed before real client data

Restating from `/docs/security.md`: this system is *designed toward*
ISO 27001 / SOC 2 patterns and Kenya DPA / GDPR-capable controls, but has
had no external security or legal review. Get one before onboarding a real
client's financial data, not before "launch" in some vaguer sense — the
distinction matters because Phase 1 (Client 360, no real financial documents
yet) is lower-stakes than Phase 2 (client portal, real document exchange).
