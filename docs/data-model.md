# Data model

Source of truth: `prisma/schema.prisma`. This document explains the
*why* behind it and lists what's deliberately not modelled yet.

## Entity relationship diagram (Phase 0/1 slice)

```
Organization 1───* Membership *───1 (Supabase auth.users, by userId — no local table)
     │                  │  ▲              ▲              ▲
     │                  │  └── portfolioLeadId ──┐        └── assigneeMembershipId
     │                  │  └── relationshipOwnerId┤                    │
     │                  │                          │                    *
     1                  *                          │                  Task
     └───────────────* Client ──────────────────────┘                   1
                          │                                             │
                          1                                             *
                          ├───* ClientContact                WorkflowInstance
                          │                                             │
                          *                                             *
                    WorkflowInstance ─────────────────────────────────┘
                          │                                    (also: *───1 Client)
                          *
              WorkflowTemplate (optional — instance may be one-off)
                          │
                          1
                          └───* TaskTemplate

Organization 1───* AuditEvent *───0..1 Membership (actor)
Organization 1───* WorkflowTemplate
Organization 1───* WorkflowInstance
Organization 1───* Document *───0..1 Client
                        └──────0..1 Membership (uploadedBy)
Task 1───* Review *───1 Membership (reviewer)
              └────0..1 Membership (preparer)
```

## Why these tables and not the full section-20 list

The original brief lists ~30 entities across workflow, quality, billing,
documents, requests, meetings, health scoring and integrations. Building all
of them before any UI exists on top of them would mean a schema with no
proof it's the *right* shape. Phase 0/1 instead models exactly what the
shipped UI (Command Centre, Clients list, Client 360, Team, Documents)
needs, and grows the schema alongside each subsequent phase's UI. The full
target entity list — grouped by the phase that introduces it — is in
`/docs/implementation-plan.md`.

## Tables

### `organizations`
One row per practice tenant. CFOIP runs a single row today
(`slug = "cfoip"`), created lazily on first sign-in
(`getOrCreateDefaultOrganization()` in `lib/os/auth/session.ts`).

### `memberships`
Links a Supabase `auth.users.id` (`userId`, uuid) to an `Organization` with
an `OrgRole`. There is deliberately no local `users` table — email and
display name are copied onto `Membership` at creation time (from the
Supabase user) rather than joined live, so the app never needs a second
round-trip to Supabase Auth just to render a name. `(organizationId,
userId)` is unique.

`OrgRole` enum: `MANAGING_PARTNER`, `PRACTICE_ADMIN`, `PORTFOLIO_LEAD`,
`RELATIONSHIP_MANAGER`, `SERVICE_LEAD`, `PREPARER_ANALYST`,
`INDEPENDENT_REVIEWER`, `FINANCE_BILLING`, `READ_ONLY_AUDITOR`. Client-facing
roles (`CLIENT_ADMIN`, `CLIENT_COLLABORATOR` in the original brief) are not
modelled yet — they arrive with the client portal in Phase 2, likely as a
separate `ClientMembership` table scoped to one `Client` rather than the
whole `Organization`, since a client user must never see another client's
data even within the same practice.

### `clients`
One row per client company. `lifecycleStage` (`PROSPECT` → `ONBOARDING` →
`ACTIVE` → `WATCH`/`AT_RISK`/`RENEWING`/`PAUSED` → `OFFBOARDING` →
`OFFBOARDED`) and `serviceBucket` (`MONTHLY_CFO`, `BOOKKEEPING_OVERSIGHT`,
`CASH_FLOW_ADVISORY`, `INVESTOR_READINESS`, `AD_HOC_PROJECTS`) are enums for
now. `serviceBucket` becomes a configurable `ServicePackage` entity once
Templates & Automations (Phase 1 tail / Phase 2) needs administrators to
define new service lines without a schema change — tracked in
`/docs/decision-log.md`.

`healthScore`/`healthStatus` are nullable columns, written to manually for
now (seed data only). The weighted scoring model from the brief (delivery
timeliness 20%, responsiveness 15%, quality 15%, relationship 15%, payment
15%, scope stability 10%, strategic outcomes 10%) is Phase 4 work — it needs
Work, Quality and Billing data feeding it first.

### `client_contacts`
Simple contact list per client (name, email, role, primary flag). Expands
into the full company-profile model (registration info, directors/UBOs,
banking/accounting systems) in Phase 1's Client 360 "Company profile" tab.

### `audit_events`
Append-only. `AuditAction` is a closed enum extended as each module adds
actions worth auditing (today: sign-up, membership role changes, client
create, workflow template/task-template creation, workflow instantiation,
task status change, task assignment, document upload/delete, task review).
Never updated or deleted from application code — see `/docs/security.md`.

### `workflow_templates` / `task_templates`
A `WorkflowTemplate` is a reusable recipe ("Monthly Management Accounts");
its `TaskTemplate` rows are the blueprint tasks, each carrying
`relativeDueDays` — days after whatever period the template gets
instantiated for starts. `recurrence` (`ONE_OFF`/`WEEKLY`/`MONTHLY`/
`QUARTERLY`/`ANNUAL`) drives `computePeriodEnd()`
(`lib/os/workflow/period.ts`) when instantiating. `defaultAssigneeRole` on
`TaskTemplate` is present but unused — see "Simplifications" in
`/docs/implementation-plan.md`.

### `workflow_instances` / `tasks`
One `WorkflowInstance` is a `WorkflowTemplate` (optional — can be null for a
one-off, template-less workflow) instantiated for one `Client` over one
`periodStart`–`periodEnd`. `name`/`serviceBucket` are copied from the
template at instantiation time, not joined live, so renaming or deleting a
template never rewrites the record of what was actually delivered. Each
`Task` belongs to exactly one instance; `status` is one of `NOT_STARTED` →
`IN_PROGRESS`/`BLOCKED`/`AWAITING_CLIENT` → `UNDER_REVIEW` → `APPROVED` →
`DELIVERED`. **"Overdue" is not a status** — `computeIsOverdue()`
(`lib/os/workflow/status.ts`) derives it from `dueDate < now() &&
status !== DELIVERED` at read time, so fixing a due date or delivering a
task always immediately clears it rather than leaving a stale flag.

### `documents`
File metadata only — the bytes live in Supabase Storage (bucket
`documents`), never in Postgres. `storagePath` is the Storage object key
and is `@unique`; `clientId` is nullable so the practice can store
org-wide files (templates, policies) alongside client-specific ones.
`uploadedByMembershipId` is nullable (`onDelete: SetNull`) so deactivating
or removing a membership never deletes the documents they uploaded. No
`DocumentVersion` yet — re-uploading a same-named file creates an
independent row, not a new version of an existing one. See
`/docs/security.md` "Document storage" for the access-control model
(signed URLs, not RLS on the Storage side) and
`/docs/implementation-plan.md` for what's deliberately deferred
(versioning, virus scanning).

### `reviews`
One row per review pass on a `Task`, taken while it sits at
`TaskStatus.UNDER_REVIEW`. No `organizationId` column — same reasoning as
`tasks`: it belongs to exactly one task, which belongs to exactly one
workflow instance, so scoping joins up through
`task.workflowInstance.organizationId` rather than denormalizing.
`preparerMembershipId` copies the task's assignee *at review time*, not
joined live, so the segregation-of-duties record survives a later
reassignment; both `preparerMembershipId` and `reviewerMembershipId` are
nullable-safe against membership removal (`onDelete: SetNull` /
no-op respectively — reviewer is required, `NOT NULL`, since a review
without a reviewer isn't meaningful). `outcome` (`APPROVED` /
`CHANGES_REQUESTED`) drives the task back to `APPROVED` or `IN_PROGRESS` —
see `submitReviewAction` in `app/os/(app)/quality/actions.ts`. No separate
`Deliverable`/`SignOff` concept yet; see `/docs/implementation-plan.md`
"Simplifications" for what a fuller Quality model would add.

## Conventions

- **IDs**: UUID primary keys (`@default(uuid())`), matching Supabase's own
  `auth.users.id` type so foreign-key-shaped joins (`Membership.userId`) are
  possible without a type cast.
- **Timestamps**: `createdAt`/`updatedAt` on every table that's mutated
  after creation; stored as Postgres `timestamp(3)` (UTC implicitly — the
  app never writes a timezone-aware value), displayed in the org's
  `timezone` field (`Africa/Nairobi` default).
- **Table names**: snake_case via `@@map` (`organizations`, `client_contacts`,
  ...); Prisma field names stay camelCase, so generated SQL always quotes
  identifiers like `"organizationId"` — this is normal Prisma output, not a
  hand-editing mistake, and matters if you ever write raw SQL against these
  tables (see the RLS migration for the exact quoting).
- **Money**: not yet modelled (no billing tables in Phase 0/1). When Phase 3
  adds them, money is stored as integer minor units + an ISO currency code
  per the original brief, never as floating point.
- **Soft delete**: not used anywhere yet, including `documents` — deleting a
  document genuinely removes the row and the underlying Storage object
  (`deleteDocumentAction`). Nothing in Phase 0/1 has a business reason to
  soft-delete rather than genuinely remove; this is revisited per-table as
  retention requirements land (documents, financial records) — a real
  question for CFOIP's eventual records-retention policy, not a technical
  one.

## Migrations

`prisma/migrations/` — eight so far:

1. `20260819092543_init` — organizations, memberships, clients,
   client_contacts, audit_events.
2. `20260819092604_enable_row_level_security` — RLS policies for the above
   (see `/docs/security.md`). Deliberately a separate migration from `init`
   so the schema and its security policies have independent, reviewable
   history.
3. `20260819094204_workflow_engine` — workflow_templates, task_templates,
   workflow_instances, tasks.
4. `20260819094215_workflow_engine_rls` — RLS policies for the workflow
   tables, same pattern as (2).
5. `20260821131927_add_documents` — the `documents` table, plus
   `DOCUMENT_UPLOADED`/`DOCUMENT_DELETED` added to the `AuditAction` enum.
6. `20260821132500_documents_rls` — RLS policy for `documents`, same pattern
   as (2) and (4).
7. `20260821174144_add_reviews` — the `reviews` table and `ReviewOutcome`
   enum, plus `TASK_REVIEWED` added to `AuditAction`.
8. `20260821174500_reviews_rls` — RLS policy for `reviews`, same
   EXISTS-through-a-join pattern as `tasks`' own policy (see (4)), since
   `reviews` has no `organizationId` column either.

All eight were generated and applied against a real local Postgres 16
instance during development (not just written by hand and hoped correct) —
see `/docs/setup.md` "Verifying migrations locally" if you need to do the
same.
