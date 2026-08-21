# Implementation plan

Same phase structure as the original brief. Status reflects what's actually
in the repository, not intent. Also surfaced in-product at Settings → Build
roadmap (`app/os/(app)/settings/page.tsx`).

**Repo history note**: Phases 0 and 1 were originally built and verified in
a separate, standalone repository (`cfo-innovation-partners`) as a
Next.js 16/React 19/Tailwind v4 app. That work was then ported into *this*
repository (`cfopartners-fund` — the practice's real, already-live site) as
routes under `/os`, adapted to match this app's actual Next.js
14.2/React 18/Tailwind v3 stack. See `/docs/architecture.md` for why, and
`/docs/decision-log.md` for the specific adaptations that move required
(React 18 form actions, Tailwind token remapping, a Next.js security patch
bump). Every Phase 0/1 item below was re-verified — migrations, RLS,
`tsc --noEmit`, `next build` — in this repository, not just carried over
from the old one on trust.

## Phase 0 — Foundation — **live**

- [x] Authentication (Supabase, email+password, session refresh middleware)
- [x] Organization/tenant model + RBAC (`Organization`, `Membership`,
      `OrgRole`, permission matrix)
- [x] Audit trail (`AuditEvent`, append-only)
- [x] Design system (`components/os/ui/` — `Button`/`Card`/`Badge`/`Input`/
      `Label`/`SubmitButton`/`PendingSelect`, built on this site's existing
      Tailwind v3 brand tokens — `ink`, `accent`, `bg`, `line` — and shared
      `lib/utils.ts` `cn()` helper, not a separate design system)
- [x] Database migrations, verified against real Postgres (see
      `/docs/qa-plan.md`)
- [x] Row Level Security, verified for real (see `/docs/security.md`)
- [x] Deployment topology: one Next.js app, one Vercel project — `/os`
      routes ship alongside the existing marketing site, same deploy (see
      `/docs/architecture.md`)

## Phase 1 — Operational MVP — **in progress**

Shipped:
- [x] Client portfolio list (`/clients`) with create-client form, RBAC-gated
- [x] Client 360 — Overview tab, a real Work tab (workflow instances for
      that client) and a real Documents section; remaining tabs listed as
      upcoming on the page itself (Company profile, Engagement, Onboarding,
      Services, Requests, Deliverables, Meetings, Financial operations,
      Billing, Health & risk, Activity timeline)
- [x] Command Centre — live counts (total/onboarding/active/watch+at-risk),
      clients by service bucket, recently updated clients
- [x] Team & role management (`/settings/team`) — the self-serve piece that
      makes sign-up usable without a separate invite system
- [x] **Workflow-template engine** (`/templates`, `/templates/[id]`) —
      `WorkflowTemplate` + `TaskTemplate`, RBAC-gated creation
      (`workflow:manageTemplates`). No versioning or dependency graph yet —
      see "Simplifications" below.
- [x] **Recurring/one-off work** (`/work`, `/work/[id]`) — instantiate a
      template for a client and period (`workflow:instantiate`); task
      status and assignee are editable inline (`task:updateStatus`,
      `task:assign`). Progress and "overdue" are computed, not stored — see
      `lib/os/workflow/status.ts`.
- [x] **Deadlines calendar** (`/calendar`) — every open task across the
      portfolio, bucketed into Overdue / 7 / 14 / 30 days / Later.
- [x] Seed data extended: 2 workflow templates, 3 workflow instances across
      3 clients with realistic status spread (one fully delivered, two
      running behind schedule with genuinely overdue tasks) — see
      `prisma/seed.ts`.
- [x] **Internal document storage** (`/documents`, plus a Documents section
      on Client 360) — Supabase Storage-backed (`document:view/upload/
      delete`). Uploads go browser → Storage directly over a short-lived
      signed URL, never through a Next.js server action/route handler —
      Vercel Serverless Functions cap request bodies around 4.5 MB, well
      under what a scanned financial statement can be. Downloads are the
      same shape in reverse: `/os/documents/[id]/download` checks RBAC +
      org scoping on every request, then redirects to a signed URL valid
      for 5 minutes. No public bucket URLs anywhere. See "Simplifications"
      below for what this slice deliberately doesn't do yet (versioning,
      virus scanning).

Phase 1 is now feature-complete against this plan.

### Simplifications taken to ship this slice (not silent — tracked here)

- **No dependency graph between tasks.** The brief asks for blocking rules
  and parallel branches; this slice has a flat, ordered task list per
  workflow instance. Real enough to run recurring monthly/quarterly work
  end to end; add dependencies when a real template needs "don't start B
  until A is done" enforced rather than just implied by task order.
- **No template versioning.** Editing a `WorkflowTemplate`'s tasks changes
  what future instantiations create; past `WorkflowInstance`/`Task` rows
  already copied their values at creation time (see `/docs/data-model.md`),
  so history is safe — but there's no `WorkflowTemplateVersion` record of
  *which* edit produced *which* instance. Add if template change history
  itself becomes something CFOIP needs to audit.
- **Default assignee role on `TaskTemplate` is unused.** The schema field
  exists (`defaultAssigneeRole`); instantiation currently leaves every task
  unassigned for a human to pick up from `/work/[id]`. Wiring
  role-based auto-assignment needs a rule for *which* person holding that
  role gets it (round-robin? least-loaded? — a capacity-planning question
  that's Phase 2 scope), so it's left manual for now rather than guessed.
- **Calendar math is UTC-calendar, not organization-timezone-aware.** See
  the comment in `lib/os/workflow/period.ts`. Fine for Africa/Nairobi
  (UTC+3, no DST); revisit before onboarding a client whose reporting
  calendar depends on a timezone far enough from UTC for a day boundary to
  shift.
- **Documents has no version history.** Uploading a file with the same name
  again creates a second, independent `Document` row (its own uuid-prefixed
  Storage path) rather than a new version of an existing one — there's no
  `DocumentVersion` linking them or a "latest" concept. Fine for a first
  slice; add `DocumentVersion` when CFOIP actually needs "see what changed
  between drafts," not before.
- **No virus/malware scanning on upload.** The brief's security posture
  calls for it; this slice validates MIME type and a 25 MB size cap
  client- and server-side (`lib/os/documents-shared.ts`,
  `lib/os/validation/document.ts`) but doesn't scan file contents. Track in
  `/docs/security.md` as a gap to close before this handles real client
  financial documents at any real volume — a Supabase Storage webhook
  → antivirus function is the natural place to add it later without
  reworking the upload flow.

New entities this phase still needs beyond what's built (not yet in
`schema.prisma`): `Engagement`, `ServicePackage` (replacing the
`ServiceBucket` enum — see `/docs/decision-log.md`), `ChecklistTemplate` +
`ChecklistResponse` (per-task checklists, distinct from the task itself),
`TaskEvidence`, `DocumentVersion`, `WorkflowTemplateVersion`,
`TaskDependency`.

## Phase 2 — Service control — **planned**

- [ ] Client portal (new client-facing role model — see
      `/docs/data-model.md` "memberships" for why this isn't just reusing
      `OrgRole`)
- [ ] Ad hoc requests (`/requests`) — SLA clocks, triage, scope approval
- [ ] Quality review/approval (`/quality`) — `canReview()` already exists
      (`lib/os/auth/rbac.ts`); needs `Deliverable`, `DeliverableVersion`,
      `Review`, `ReviewFinding`, `SignOff`
- [ ] Meetings & decisions
- [ ] Capacity planning (`/team`)
- [ ] Richer reporting (`/reports`)

## Phase 3 — Commercial management — **planned**

- [ ] Time entry & timesheets
- [ ] Budgets, retainers, rate cards
- [ ] Invoicing, credits, collections
- [ ] Realisation & profitability reporting

`billing:view` permission already exists in the RBAC matrix
(`lib/os/auth/rbac.ts`) ahead of this phase, so the "who's allowed to see
money" decision is made once, not revisited when Billing ships.

## Phase 4 — Integrations & intelligence — **planned**

- [ ] Accounting adapters (QuickBooks Online, Xero, Zoho Books, Sage)
- [ ] Email/calendar (Microsoft 365, Google Workspace)
- [ ] Document storage (OneDrive/SharePoint, Google Drive, Dropbox)
- [ ] E-signature adapter
- [ ] Payment provider (card + mobile money, M-Pesa-ready)
- [ ] Client health scoring (the weighted model from the brief) — needs
      Work, Quality and Billing data to score against
- [ ] Advanced automation rules engine

Per the brief: **do not start Phase 4 while tenant isolation, auditability,
QA gates and recovery procedures are incomplete.** Phase 2's Quality module
and a real incident-response/backup runbook are the gating items.

## Immediate next slice (recommendation)

Phase 1 is complete. Phase 2 (client portal, Quality, Requests) is the next
slice — it can build against a real workflow/task/document concept instead
of a guessed one. Before onboarding real client financial documents through
Documents at any volume, close the virus-scanning gap noted above.
