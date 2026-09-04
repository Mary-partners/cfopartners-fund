# Setup

Everything here happens in GitHub, Supabase and Vercel's dashboards, or in a
Claude Code session — nothing needs to run on your own laptop. The steps
that say "run this" can be run from any Claude Code session with this repo
checked out, exactly as this one did.

## 1. Create the Supabase project

1. [supabase.com](https://supabase.com) → New project. Pick a region close
   to Kenya (e.g. an EU region — Supabase has no African region yet).
2. Wait for provisioning, then go to **Project Settings → API** and note:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this one secret —
     it bypasses every permission check; used by `lib/os/supabase/admin.ts`
     for Documents' Storage uploads/downloads)
3. Go to **Project Settings → Database → Connection string**:
   - Copy the **Transaction pooler** string (port `6543`) → `DATABASE_URL`.
     Append `?pgbouncer=true` if it isn't already there.
   - Copy the **Session/Direct** string (port `5432`) → `DIRECT_URL`.
   - Both contain your database password — set it if you haven't.

## 2. Apply the schema and enable Row Level Security

From this repo, in the repo root:

```bash
cp .env.example .env.local
# fill in the five values from step 1

npm install
npm run db:migrate:deploy   # prisma migrate deploy — applies both
                             # migrations (schema + RLS) in order
```

`db:migrate:deploy` runs `prisma migrate deploy`, which applies the
committed migrations as-is (no shadow database, no diffing) — the right
command against a real, already-designed database. Use `npm run db:migrate`
(`prisma migrate dev`) only if you're changing `schema.prisma` and need
Prisma to generate a *new* migration from the diff.

## 3. Seed demo data (optional, safe for a demo project)

```bash
npm run db:seed
```

Creates the CFOIP organization row and 12 fictional demo clients. Does
**not** create any user or membership — see the comment at the top of
`prisma/seed.ts` for why (it would break the first-sign-up-becomes-Managing-
Partner bootstrap described below).

## 4. First sign-in

1. Deploy to Vercel (step 6) or run `npm run dev` against the real Supabase
   project (with `.env.local` filled in) to get the app in front of a
   browser.
2. Go to `/signup`, create an account with your real email.
3. Supabase emails a confirmation link (check spam if it doesn't arrive
   within a minute) → click it → lands on `/dashboard`.
4. Because you're the first person to sign in to a fresh organization, your
   `Membership` role is automatically `MANAGING_PARTNER`
   (`lib/os/auth/session.ts`). Everyone who signs up after you defaults to
   `PREPARER_ANALYST` — promote them from **Settings → Team**.

## 5. Verifying migrations and RLS locally (optional, for changes to the schema)

This is exactly what was done to build and verify
`prisma/migrations/20260819092604_enable_row_level_security/`. Repeat it
whenever you change RLS policies, since Supabase-specific objects
(`auth.uid()`, the `authenticated` role) don't exist on a stock Postgres and
the migration file stubs them defensively — worth re-proving after any edit.

```bash
# Postgres 16 client+server are available in a Claude Code sandbox already;
# elsewhere, install postgresql-16 or run it in a container.
service postgresql start
su postgres -c "psql -c \"ALTER USER postgres PASSWORD 'postgres';\""
su postgres -c "psql -c \"CREATE DATABASE cfoip_dev;\""

export DIRECT_URL="postgresql://postgres:postgres@localhost:5432/cfoip_dev"
export DATABASE_URL="$DIRECT_URL"

npx prisma migrate dev   # applies + validates both migrations via a shadow DB

# Seed two organizations, two users, two clients to prove isolation:
su postgres -c "psql -d cfoip_dev" <<'SQL'
INSERT INTO organizations (id, name, slug, "createdAt", "updatedAt") VALUES
  ('11111111-1111-1111-1111-111111111111','Org A','org-a', now(), now()),
  ('22222222-2222-2222-2222-222222222222','Org B','org-b', now(), now());
INSERT INTO memberships (id, "organizationId", "userId", email, role, "createdAt", "updatedAt") VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111111','99999999-9999-9999-9999-999999999999','a@example.com','MANAGING_PARTNER', now(), now()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','22222222-2222-2222-2222-222222222222','88888888-8888-8888-8888-888888888888','b@example.com','MANAGING_PARTNER', now(), now());
INSERT INTO clients (id, "organizationId", name, country, currency, "serviceBucket", "createdAt", "updatedAt") VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc','11111111-1111-1111-1111-111111111111','Client of Org A','Kenya','KES','MONTHLY_CFO', now(), now()),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd','22222222-2222-2222-2222-222222222222','Client of Org B','Kenya','KES','MONTHLY_CFO', now(), now());
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT EXECUTE ON FUNCTION auth.uid() TO authenticated;
SQL

# Impersonate user A and confirm they see only Org A's client:
su postgres -c "psql -d cfoip_dev" <<'SQL'
SET ROLE authenticated;
SET request.jwt.claim.sub = '99999999-9999-9999-9999-999999999999';
SELECT name FROM clients;   -- expect exactly "Client of Org A"
SQL
```

## 6. Vercel — no new project needed

This repo is **already** a connected Vercel project (`cfopartners-fund`),
deploying to production on every push to `main`. Nothing to import. Just
one thing to add, in the Vercel dashboard:

1. **Environment Variables** (Project Settings → Environment Variables):
   add the five Supabase values from `.env.example` for Production (and
   Preview, if you want branch/PR previews to work against the same
   database).

   - Leave `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     **unchecked** for "Sensitive". Vercel excludes Sensitive vars from the
     Next.js build step (they're only injected at runtime), which breaks
     `NEXT_PUBLIC_*` values specifically — Next.js inlines those into the
     client bundle *at build time*, so a Sensitive `NEXT_PUBLIC_*` var
     resolves to `undefined` in the deployed app even though it shows up
     fine in the dashboard. `DATABASE_URL`, `DIRECT_URL` and
     `SUPABASE_SERVICE_ROLE_KEY` are fine as Sensitive (server-only, read
     at runtime, never build-inlined).
   - **No Build Command override needed.** Migrations run automatically —
     `package.json`'s `build` script is `prisma migrate deploy && next
     build`, scoped to this branch (`main` has no `prisma/` directory, so
     don't add a project-level Build Command override; it would apply to
     every branch, including `main`, and break it).

2. **Every env var change needs a fresh deployment to take effect.**
   Vercel deployments are immutable snapshots — editing a variable's value
   in the dashboard does **not** rebuild or redeploy anything that's
   already live. After adding/editing/removing a variable, go to
   **Deployments**, find the latest one *for the branch you care about*
   (not a different branch — redeploying `main` will not pick up a change
   meant for `claude/add-cfoip-os`, and `main` has no `/os` routes at all
   until this branch is merged), and use **Redeploy**. Easiest to get right:
   push any commit to the branch (even a docs-only one) — Vercel's git
   integration always builds fresh against current env vars.

Push to `main` (or open a PR — Vercel builds a preview per branch) and the
`/os` routes go live alongside the existing marketing pages, same domain,
same deploy.

## 7. Documents — nothing extra to set up

No manual "create a Storage bucket" step: `ensureDocumentsBucket()`
(`lib/os/storage.ts`) creates the `documents` bucket itself on first use if
it isn't already there. As long as the five env vars from step 1 are set
(specifically `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`),
uploading a file from `/os/documents` just works.

## 8. Client Portal invite emails — one Supabase setting to add

Staff invite a client user from a Client 360 page (**Portal access → Invite
a client user**), which calls Supabase Auth's `inviteUserByEmail` — the
same underlying mechanism as the internal signup confirmation email, just
triggered server-side by staff instead of self-serve. The invite link it
emails needs a redirect target Supabase is willing to send users to:

1. In Supabase: **Authentication → URL Configuration → Redirect URLs**, add
   every origin this app is ever deployed at, each followed by `/**`:
   - `https://www.cfopartners.fund/**` (production)
   - `https://cfopartners-fund-npyz.vercel.app/**` (or whatever the
     project's default Vercel domain is) if invites might ever be sent from
     a preview deployment
2. Nothing else to configure — `inviteClientUserAction`
   (`app/os/(app)/clients/[id]/portal-actions.ts`) builds the exact
   `redirectTo` URL from the *request's own origin* (`x-forwarded-host` /
   `x-forwarded-proto`), the same approach `/os/auth/callback` already uses
   for signup confirmations, so it needs no separate `SITE_URL` env var and
   works unmodified on every branch's preview URL as long as that URL (or a
   wildcard covering it) is in the allow-list above.

An invite that isn't in the allow-list fails at Supabase with a "redirect
URL not allowed" error surfaced back through `inviteClientUserAction`'s
catch block — if a staff member reports that error, this is the fix.

This can't be tested end-to-end from a sandboxed Claude Code session (no
real email delivery there) — see "What's not verified, and why" in
`/docs/qa-plan.md`.

### A note on sandboxed Claude Code sessions and Supabase

A Claude Code sandbox's outbound network is typically HTTPS-only — direct
Postgres connections (port 5432/6543) are blocked, so a session usually
**cannot** run `prisma migrate deploy`/`db:seed` against a real Supabase
project directly, even with valid credentials. That's exactly why step 6
above routes migrations through Vercel's build step instead of a manual
one-off command: Vercel's build servers have normal internet access. If a
future session needs to run migrations by hand, do it from a *local*
Postgres instance (`## 5` above) or from an environment with real network
access — not by assuming a sandbox can reach Supabase's database port.

Supabase Storage is a normal HTTPS REST API, unlike the Postgres
connection, so it *is* reachable from a sandboxed session — that's what
makes the automatic bucket creation in step 7 possible. It just can't be
tested end-to-end (an actual signed-URL upload round trip) without the
real project's credentials in `.env.local`, same as the rest of the
authenticated flow — see "What's not verified, and why" in
`/docs/qa-plan.md`.

## Everyday commands (the repo root)

```bash
npm run dev                # local dev server (needs .env.local)
npm run build                # production build
npm run typecheck
npm run db:studio            # Prisma Studio — browse the database visually
```

Note: this repo has no test runner or ESLint configuration installed yet
(pre-existing — not specific to `/os`). `npm run typecheck` + `npm run
build` are the correctness gates used for this work; see `/docs/qa-plan.md`.
