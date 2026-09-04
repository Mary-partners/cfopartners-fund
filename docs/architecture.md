# Architecture

## Repository layout

This is one Next.js app, one Vercel project, one repository
(`mary-partners/cfopartners-fund`) — the public marketing site and the
CFOIP OS practice-management app share a single codebase and deployment.

```
app/
  page.tsx, ai-automations/, blog/, contact/, pricing/, resources/,
  rooms/, api/            Public marketing site — untouched by this work
  os/                      CFOIP OS (internal staff) — everything behind /os
    (auth)/login, (auth)/signup    Public within /os
    (app)/dashboard, clients, work, templates, calendar, quality, ...
                                    Behind internal auth (requireActor())
    auth/callback, auth/sign-out    Supabase auth routes
  portal/                  Client Portal — everything behind /portal,
                            same identity model as /os but a fully
                            separate one (see /docs/security.md "Client
                            Portal identity separation")
    (auth)/login, (auth)/set-password    Public/session-only within /portal
                                          — no (auth)/signup, invite-only
    (app)/work, documents               Behind portal auth
                                          (requirePortalActor())
    auth/callback, auth/sign-out          Supabase auth routes
    documents/[id]/download                Signed-URL download route

components/
  Nav.tsx, WhatsAppButton.tsx, ...   Marketing site — untouched
  ui/                                 Marketing site's own Button/Card
  os/                                  OS-specific components
    ui/                                OS's own Button/Card/Badge/Input/Label
                                        (deliberately separate from
                                        components/ui/ — see below)
    portal/                            Client Portal-specific components
                                        (sidebar, topbar, forms) — separate
                                        from components/os/ the same way
                                        components/os/ is separate from
                                        components/ui/

lib/
  rooms.ts, services.ts, pricing.ts, ...   Marketing site — untouched
  utils.ts                                  Shared cn() helper — reused as-is
                                             by OS components, not duplicated
  os/                                        OS-specific server/shared code
    db.ts, audit.ts, nav.ts, portal-nav.ts
    auth/       rbac.ts, session.ts (internal) —
                portal-rbac.ts, portal-session.ts (Client Portal)
    supabase/   client.ts, server.ts, admin.ts
    queries/    clients.ts, workflow.ts, documents.ts, quality.ts,
                portal.ts (client-membership roster), portal-work.ts
    validation/ auth.ts, document.ts, quality.ts, portal.ts,
                portal-auth.ts, portal-documents.ts, portal-work.ts
    workflow/   period.ts, status.ts

prisma/          Schema, migrations, seed script — OS + Client Portal
middleware.ts    Scoped to /os/:path* and /portal/:path* only (see below)
                 — never touches the marketing site
docs/            This directory
```

**Why everything lives under one Next.js app instead of a separate
project**: an earlier iteration of this work built the OS as its own
Next.js 16 / React 19 / Tailwind v4 app in a sibling repository, intended
to deploy as a second Vercel project. Once it became clear the *real*,
already-live site was this repository (Next.js 14.2, React 18, Tailwind
v3), that approach was abandoned in favour of porting the OS code down to
match this app's actual stack and merging it in as new routes under `/os`.
Building a second, differently-versioned Next.js app as a subdirectory of a
single Vercel project isn't a supported pattern (a Vercel project's Root
Directory points at exactly one app) — so "OS as a page inside this site"
means OS as routes *within* this app, not a nested second app. Full
reasoning in `/docs/decision-log.md`.

## Why `components/os/ui/` instead of reusing `components/ui/`

The marketing site already has its own `Button`/`Card` primitives
(`components/ui/button.tsx`, `card.tsx`) — rounded-full, uppercase-weight,
tuned for landing-page CTAs. The OS needs denser, table/form-oriented
primitives. Rather than either overload the existing components with a
second visual mode or risk a collision, OS-specific primitives live in
their own `components/os/ui/` — separate files, zero risk of an OS change
ever affecting a marketing page that imports `components/ui/*`. Both sets
of primitives use the *same* brand tokens (`ink`, `accent`, `bg`, `line`,
etc. — see below) and the *same* shared `lib/utils.ts` `cn()` helper, so
they're visually and technically consistent, just not the same files.

## OS application stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14.2.35 (App Router, TypeScript) | Matches the site's existing, already-live version — see "Next.js version" below |
| Auth | Supabase Auth via `@supabase/ssr` | Handles password hashing, session cookies, email confirmation; no auth code to maintain |
| Database | Supabase Postgres | Managed Postgres with Row Level Security available for defense-in-depth |
| ORM | Prisma 7 (driver adapters, `@prisma/adapter-pg`) | Typed queries and migrations; adapter model needed because Prisma 7 removed the classic `datasource.url` client config |
| Styling | Tailwind CSS v3, this repo's existing brand tokens (`ink`, `accent`, `bg`, `line`, `gold`) | Matches the site's existing config (`tailwind.config.ts`) — no new tokens needed, no separate design system |
| Forms | React Hook Form + Zod (login/signup) or Next.js Server Actions via `useFormState`/`useFormStatus` (everything else) | `useFormState`/`useFormStatus` (from `react-dom`) rather than React 19's `useActionState` (from `react`) — this app runs React 18 |
| Testing | `tsc --noEmit` + `next build` (verified this way for this slice) | No test runner is installed in this repo yet; see `/docs/qa-plan.md` |

### Next.js version — deliberately not the newest

This app runs Next.js **14.2.35**, not the 16.x used in the OS's original
prototype. Two reasons, both about not touching what's already live and
working:

1. **Matching, not upgrading.** The marketing site already runs on 14.2 in
   production. Porting the OS code down to 14.2/React 18 conventions (see
   "React 18 form actions" below) means the marketing site's dependencies
   never change — zero regression risk to pages that were already shipping.
2. **The one exception: a security patch.** `14.2.5` (the version this repo
   started on) has a publicly disclosed critical vulnerability. `14.2.35` —
   the latest release *within the same minor version* — was substituted in
   as part of this work, which by semver carries no breaking API changes.
   `npm audit` still reports several high-severity Next.js advisories after
   this bump; per `npm audit`'s own data, closing those needs a major-version
   upgrade (14 → 16), which is a real, separate decision — not bundled into
   this change. See `/docs/decision-log.md` for the full audit output and
   the case for/against making that jump.

### React 18 form actions — `useFormState`/`useFormStatus`, not `useActionState`

`useActionState` (imported from `"react"`) is a React 19 API. On React 18,
the equivalent is `useFormState` (from `"react-dom"`), which returns
`[state, formAction]` with no built-in pending flag, and `useFormStatus`
(also from `"react-dom"`) for pending state — with one sharp edge:
`useFormStatus` only reports a `<form>`'s status when called from a
*different* component than the one that renders the `<form>`. Two small
shared components exist specifically to satisfy that:

- `components/os/ui/submit-button.tsx` — a submit `<Button>` that shows a
  pending label and disables itself, used inside every form with an
  explicit submit action.
- `components/os/ui/pending-select.tsx` — a `<select>` that disables
  itself while its form's action is pending, used by the three
  auto-submit-on-change dropdowns (task status, task assignee, member
  role).

## Request flow

1. **`middleware.ts`** runs on every request under `/os/:path*` or
   `/portal/:path*` only (its `matcher` config — see "Middleware scope"
   below). It refreshes the Supabase session cookie and redirects an
   unauthenticated request away from a protected path to *that side's own*
   login page (`/os/login` or `/portal/login`, chosen by which prefix the
   request path starts with). It never touches the database — Edge
   runtime can't run `pg`/Prisma, and (since the Client Portal shipped)
   deliberately does **not** try to bounce an already-authenticated
   visitor off a login page either — see "Client Portal identity
   separation" in `/docs/security.md` for why that check moved to each
   side's own login page instead.
2. **`app/os/(app)/layout.tsx`** (Node.js runtime, Server Component) calls
   `requireActor()`, which resolves the Supabase user to an internal
   `Membership` row via Prisma — creating one on first sign-in (see
   "Single-tenant bootstrap" in `/docs/decision-log.md`), unless that user
   already has a `ClientMembership`, in which case it refuses. The portal
   side is the mirror image: **`app/portal/(app)/layout.tsx`** calls
   `requirePortalActor()`, which resolves (and, on a pending invite,
   claims) a `ClientMembership` — never auto-creating one.
3. Page Server Components call functions in `lib/os/queries/*.ts` (scoped
   by `organizationId`) or `lib/os/queries/portal-work.ts` /
   the portal-scoped functions in `lib/os/queries/documents.ts` (scoped by
   `clientId`, one level stricter — see `/docs/security.md` "Tenant
   isolation").
4. Mutations are Next.js Server Actions (`"use server"` files, e.g.
   `app/os/(app)/clients/actions.ts`, `app/portal/(app)/work/actions.ts`)
   that re-check `can(role, permission)` (`lib/os/auth/rbac.ts`) or
   `canPortal(role, permission)` (`lib/os/auth/portal-rbac.ts`) before
   writing, then write an `AuditEvent`.

### Middleware scope

`middleware.ts`'s `config.matcher` is `["/os/:path*", "/portal/:path*"]` —
deliberately narrow, covering exactly the two authenticated subtrees. An
earlier draft (from the standalone-app prototype) matched *everything
except static assets*, which would be correct for an app that is 100%
behind auth but would be a serious bug here: it would force every
marketing page (`/`, `/pricing`, `/blog`, ...) through Supabase auth
middleware and potentially redirect real visitors to a login page. Verified
directly: `curl` against `/`, `/pricing`, `/contact` all return `200`
unauthenticated, while every protected path under either subtree
(`/os/dashboard`, `/portal/work`, `/portal/documents`, `/portal/set-password`,
...) correctly redirects to that subtree's own login page with the right
`?next=` — never crossing to the other side's login page. See
`/docs/qa-plan.md` "Middleware scope".

## Database connection strategy

Supabase exposes two Postgres endpoints:

- **Pooled** (port 6543, PgBouncer transaction mode) — `DATABASE_URL`, used
  by the running app (`lib/os/db.ts`). Required in serverless/Vercel
  because each function invocation would otherwise open its own direct
  connection and exhaust Postgres' connection limit.
- **Direct/session-mode** (port 5432) — `DIRECT_URL`, used only by
  `prisma migrate` via `prisma.config.ts`. Migrations need DDL-capable
  connections; PgBouncer transaction mode doesn't support that reliably.

`lib/os/db.ts` builds the Prisma client lazily behind a `Proxy` rather than
at module load time. Next.js's build-time "collect page data" step statically
imports every route module — including layouts — to inspect their config,
which would otherwise construct a `pg.Pool` (and fail fast on a missing
`DATABASE_URL`) purely from being imported, even for a route that never
queries the database, and even for marketing routes that import nothing
OS-related at all. Verified: `next build` succeeds without `DATABASE_URL`
set, and every existing marketing page still builds alongside the new `/os`
routes (see `/docs/qa-plan.md`).

## Deployment topology

```
GitHub (mary-partners/cfopartners-fund)
 └─ push to main ─▶ Vercel Git integration (root directory: repo root — unchanged)
                      └─▶ Vercel: cfopartners-fund (marketing site + /os)
                            └─▶ Supabase (Postgres + Auth) — /os only
```

One deployment, same Vercel project that was already live. No Vercel
configuration change is needed for this to ship — the only new setup is
adding the Supabase environment variables (`/docs/setup.md`) and, ideally,
routing `prisma migrate deploy` into the build step so schema changes apply
automatically on every deploy (also in `/docs/setup.md`).

## Multi-tenancy

The schema is organization-scoped (`Organization` → `Membership`/`Client` →
...) even though the product only exposes one organization today (CFOIP
itself). See `/docs/decision-log.md` — "Single-tenant bootstrap" — for why,
and `/docs/security.md` — "Tenant isolation" — for how it's enforced.

The Client Portal adds a second, stricter scoping level *within* one
organization: `Client` → `ClientMembership`. A portal user must never see
another client's data even though both clients share the same
organization (unlike internal staff, who legitimately see every client in
their organization) — so every portal-facing query takes `clientId`
directly, not `organizationId`. See `/docs/security.md` "Tenant isolation"
and "Client Portal identity separation" for the full reasoning.
