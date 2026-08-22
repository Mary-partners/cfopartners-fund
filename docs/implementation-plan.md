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

## Phase 1 — Operational MVP — **live**

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
- [x] **Internal document storage** (`/documents`, a Documents section on
      Client 360, and per-task attachments on `/work/[id]`) — Supabase
      Storage-backed (`document:view/upload/delete`). Uploads go browser →
      Storage directly over a short-lived signed URL, never through a
      Next.js server action/route handler — Vercel Serverless Functions cap
      request bodies around 4.5 MB, well under what a scanned financial
      statement can be. Downloads are the same shape in reverse:
      `/os/documents/[id]/download` checks RBAC + org scoping on every
      request, then redirects to a signed URL valid for 5 minutes. No
      public bucket URLs anywhere. A document can be scoped to a specific
      `Task` (the deliverable for that piece of work), not just a client
      generally — `clientId` is always derived server-side from the task in
      that case, never taken from the uploader, so it can't drift out of
      sync with which client the task belongs to. See "Simplifications"
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

- **Quality reviews a `Task`, not a versioned `Deliverable`.** The original
  plan for this module was `Deliverable` → `DeliverableVersion` → `Review`
  → `ReviewFinding` → `SignOff`, a full document-review lifecycle
  independent of task tracking. What shipped instead reuses the `Task`
  state machine that already existed (`UNDER_REVIEW` was already a
  `TaskStatus` value, unused until now): a reviewer approves or requests
  changes on the task itself, one `Review` row per pass, no separate
  versioned-artifact concept. This is real, useful segregation-of-duties
  enforcement today — a preparer genuinely cannot review their own
  work — but it's coarser than the target model in three ways, closed when
  there's real signal they matter rather than guessed now:
  - No `ReviewFinding` — a review is one comments field, not a checklist of
    discrete, individually-resolvable issues.
  - No `DeliverableVersion` history — nothing ties a specific uploaded
    Document to the specific review outcome it received; if a preparer
    re-uploads after "changes requested," the review trail shows the
    task's reviews in order but not "here is the file that was rejected"
    vs "here is the file that replaced it."
  - No separate `SignOff` step — approval *is* the sign-off. The brief's
    three-role model (preparer → reviewer → approver, potentially three
    different people) is enforced today as two roles (preparer → reviewer/
    approver combined); add a distinct approver step if CFOIP's real
    workflow needs that third gate, not preemptively.

- **Client Portal ships read access to Work/Documents and task approval —
  not the full client-facing surface the brief eventually wants.**
  Deliberately deferred, not silently dropped:
  - **No client-facing Requests, Meetings, or Billing views.** Those
    modules don't exist internally yet either (see the unchecked Phase 2
    items above) — the portal will grow into them once each ships.
  - **No portal notifications.** A client isn't emailed when a task
    reaches `APPROVED` and is waiting on them, or when staff responds to a
    change request — they'd need to notice it by checking `/portal/work`.
    The invite email itself is the only email this slice sends. A real
    notification system (email digests, or in-app) is real, separate work.
  - **No client-portal password reset flow.** `/portal/set-password` only
    runs once, right after an invite link; a client who forgets their
    password afterward has no self-serve "forgot password" page yet —
    staff would need to revoke and re-invite them as a workaround. Add a
    dedicated reset flow before this is CFOIP's only onboarding path for a
    real client.
  - **No self-serve portal team management for clients.** Only staff can
    invite a client user (`client:managePortalAccess`); a Client Admin
    can't invite a colleague at their own company without asking staff to
    do it. Matches the "invite-only, never self-serve" decision in
    `/docs/decision-log.md`, but is a real friction point worth revisiting
    if it comes up in practice.
  - **`ClientContact` (Client 360's existing contact list) and
    `ClientMembership` (portal login access) are two separate, unlinked
    records for what's often the same person** — inviting someone to the
    portal doesn't create or update a `ClientContact` row, or vice versa.
    Fine for a first slice; worth reconciling if staff start expecting one
    to drive the other.

- **Requests has no comment thread.** A `Request` carries one
  `description` and one `resolutionNotes` field — there's no back-and-forth
  conversation log the way a support ticket system would have (client asks
  a clarifying question, staff replies, repeat). Fine for a first slice
  where most requests resolve in one or two status changes; add a
  `RequestComment` model if real usage shows requests need an actual
  back-and-forth, not just a start state and an end state.
- **"Scope approval" is a `RequestStatus` value, not a separate approval
  workflow.** The brief's "scope approval" concept is modelled as
  `RequestStatus.AWAITING_APPROVAL` in the request lifecycle — moving a
  request into and out of that state is just another status change via
  `updateRequestAction`, not a distinct approval entity with its own actor/
  outcome/audit shape (the way `Review`/`ClientApproval` are for Quality/
  Client Portal). Add a real `RequestApproval`-style model if scope
  approval needs its own audit trail separate from "who changed the
  status," not before.
- **No request notifications.** Same gap as the Client Portal's — nobody
  is emailed when a request is raised, triaged, or resolved; staff and
  clients both have to check their respective Requests page. Real,
  separate work alongside a broader notification system.
- **Meetings has no recurring-meeting or calendar-integration concept.**
  Each `Meeting` is logged after the fact (or ahead of time, manually) —
  there's no link to an external calendar, and no "this is the monthly
  review series" grouping across meetings. Fine for a log; revisit if
  CFOIP wants meeting scheduling itself, not just a record of what
  happened.
- **Team & Capacity's workload signal is assigned-open-task *count*, not
  effort-weighted.** A member with five quick tasks and a member with one
  large task both show as "N tasks assigned" with no sense of relative
  size — there's no task-level effort estimate to weight by yet. Honest
  proxy for a first slice; revisit once (if) tasks carry an estimate.
- **Reports has no drill-through.** The original brief scope
  ("operational, quality, client and commercial reporting with
  drill-through") is delivered as read-only aggregate numbers — clicking
  a stat doesn't jump to the underlying list of tasks/reviews/requests
  that make it up. Add drill-through links once the aggregate views
  themselves have proven useful, rather than building navigation for
  numbers nobody's checked yet.

New entities this phase still needs beyond what's built (not yet in
`schema.prisma`): `Engagement`, `ServicePackage` (replacing the
`ServiceBucket` enum — see `/docs/decision-log.md`), `ChecklistTemplate` +
`ChecklistResponse` (per-task checklists, distinct from the task itself),
`TaskEvidence`, `DocumentVersion`, `WorkflowTemplateVersion`,
`TaskDependency`, `Deliverable`/`DeliverableVersion`/`ReviewFinding`/
`SignOff` (if Quality's coarser model above proves insufficient).

## Phase 2 — Service control — **live**

- [x] **Client portal** (`/portal`) — new client-facing role model
      (`ClientMembership`/`ClientRole`, wholly separate from
      `Membership`/`OrgRole` — see `/docs/data-model.md` "memberships" for
      why this isn't just reusing `OrgRole`), invite-only provisioning by
      staff from a client's 360 page, client sign-in on the same domain/
      session as `/os` but a fully separate identity (see
      `/docs/security.md` "Client Portal identity separation"), read
      access to the client's own Work and Documents, upload/self-delete on
      Documents, and — the "include client approval now" scope — approving
      or requesting changes on a task once it's passed internal Quality
      review (`TaskStatus.APPROVED` → `DELIVERED`/`IN_PROGRESS`, the same
      status-reuse approach Quality took, no new `TaskStatus` values
      needed). See "Simplifications" below for what's deferred.
- [x] **Ad hoc requests** (`/os/requests`, `/portal/requests`) — SLA
      clocks (`slaDueAt` computed from priority, anchored to when the
      request was actually raised — see `/docs/decision-log.md`), triage
      (priority/assignee/status), raised by staff on a client's behalf or
      by the client themselves through the portal. "Scope approval" is
      modelled as a `RequestStatus.AWAITING_APPROVAL` state in the
      lifecycle rather than a separate approval entity/workflow — see
      "Simplifications" below for what a fuller scope-approval flow would
      add.
- [x] **Quality review/approval** (`/quality`) — preparer/reviewer
      segregation of duties, layered onto the existing `Task` lifecycle
      (`UNDER_REVIEW` → reviewer approves → `APPROVED`, or requests changes
      → back to `IN_PROGRESS`) rather than the fuller `Deliverable`/
      `DeliverableVersion`/`Review`/`ReviewFinding`/`SignOff` model
      originally sketched here. `canReview()` (`lib/os/auth/rbac.ts`) is now
      actually called, not just defined — enforced in
      `app/os/(app)/quality/actions.ts` before a `Review` row is ever
      created. See "Simplifications" below for exactly what's deferred and
      why.
- [x] **Meetings & decisions** (`/os/meetings`) — a `Meeting` logged
      against one client (date, attendees, notes); `Decision` rows tracked
      separately with a named accountable owner and optional due date
      (product principle #3), rather than buried in a notes field. A
      decision's own owner can close it out without broad `meeting:manage`
      authority — see `/docs/decision-log.md`.
- [x] **Capacity planning** (`/os/team`) — workload (assigned open tasks,
      overdue count, clients led) computed from real data, alongside a
      manager-declared `weeklyCapacityHours` target — explicitly *not* a
      measured utilisation percentage, since there's no time-tracking data
      yet (Phase 3). See "Simplifications" below and
      `/docs/decision-log.md`.
- [x] **Richer reporting** (`/os/reports`) — Operational (task throughput/
      overdue), Quality (review pass rate), Requests (SLA compliance),
      Client portfolio composition. No commercial/billing section — no
      billing data exists yet (Phase 3) to report on; see
      `/docs/decision-log.md` for why that's a visible, deliberate gap
      rather than a silent one.

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
QA gates and recovery procedures are incomplete.** Quality's first slice is
live (see Phase 2 above) — a real gate now exists, though a coarser one
than the target model — and a real incident-response/backup runbook is
still the other gating item, not done.

## Immediate next slice (recommendation)

Every item on Phase 2's checklist is now live: Client Portal, Quality,
Requests, Meetings & decisions, Capacity planning, and Reporting. Phase 2
itself is complete — the natural next move is Phase 3 (Commercial
management: time entry, budgets/retainers, invoicing, realisation/
profitability reporting), which also unlocks the commercial/billing
reporting section Reports currently and deliberately omits. Before
starting Phase 3, close two things flagged along the way: the
virus-scanning gap on Documents (now more pressing with clients able to
upload their own files through the portal, not just staff) and a real
incident-response/backup runbook — the brief's own gate on Phase 4 also
names both, and neither is Phase-3-specific work, so closing them now
rather than mid-Phase-3 avoids retrofitting them onto a commercial system
handling real money.
