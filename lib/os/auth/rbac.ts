import { OrgRole } from "@/generated/prisma/enums";

export { OrgRole };

/**
 * Permissions actually enforced by the Phase 0/1 slice. This list grows as
 * each subsequent phase ships (billing, quality review, documents, ...) —
 * see /docs/security.md for the full target permission surface and
 * /docs/implementation-plan.md for what unlocks each one.
 */
export type Permission =
  | "client:view"
  | "client:create"
  | "client:edit"
  | "client:managePortalAccess"
  | "membership:view"
  | "membership:changeRole"
  | "membership:deactivate"
  | "audit:view"
  | "settings:manage"
  | "billing:view" // gated now; billing module ships Phase 3
  | "workflow:manageTemplates"
  | "workflow:instantiate"
  | "task:updateStatus"
  | "task:assign"
  | "document:view"
  | "document:upload"
  | "document:delete"
  | "quality:view"
  | "quality:review"
  | "request:view"
  | "request:triage"
  | "request:resolve"
  | "meeting:view"
  | "meeting:manage"
  | "team:view"
  | "team:manageCapacity"
  // --- AI CFO (Phase 4) — none of these are enforced by any action yet,
  // since no AI CFO action exists to gate. Added now, alongside the schema,
  // so the role/permission plumbing and the tables it will govern land
  // together — see decision #4 in /docs/decision-log.md for the mapping
  // this matrix is built from.
  | "aicfo:view" // CFO Inbox, Financial Reviews, findings, risks, actions for accessible clients
  | "aicfo:viewAgentActivity" // Agent Activity — model/prompt/cost detail, a narrower audience than aicfo:view
  | "aicfo:uploadClassify" // upload source documents, trigger classification/extraction
  | "aicfo:draftReports"
  | "aicfo:approveLowMedium" // final approval of Low/Medium findings
  | "aicfo:recommendHighCritical" // Senior CFO Reviewer recommends; does not finally approve
  | "aicfo:approveHighCritical" // Managing Partner only, per decision #5's approval routing
  | "aicfo:returnForCorrection"
  | "aicfo:releaseReports" // Managing Partner unconditionally; Portfolio Lead only if Membership.canReleaseReports is also set — see that field's comment
  | "aicfo:configureThresholds";

const ALL_INTERNAL_PERMISSIONS: Permission[] = [
  "client:view",
  "client:create",
  "client:edit",
  "client:managePortalAccess",
  "membership:view",
  "membership:changeRole",
  "membership:deactivate",
  "audit:view",
  "settings:manage",
  "billing:view",
  "workflow:manageTemplates",
  "workflow:instantiate",
  "task:updateStatus",
  "task:assign",
  "document:view",
  "document:upload",
  "document:delete",
  "quality:view",
  "quality:review",
  "request:view",
  "request:triage",
  "request:resolve",
  "meeting:view",
  "meeting:manage",
  "team:view",
  "team:manageCapacity",
  "aicfo:view",
  "aicfo:viewAgentActivity",
  "aicfo:uploadClassify",
  "aicfo:draftReports",
  "aicfo:approveLowMedium",
  "aicfo:recommendHighCritical",
  "aicfo:approveHighCritical",
  "aicfo:returnForCorrection",
  "aicfo:releaseReports",
  "aicfo:configureThresholds",
];

/**
 * Authority matrix — mirrors the "Core authority" column of the roles table
 * in the product spec. Financial/commercial permissions (billing:view) are
 * intentionally withheld from roles the spec marks as not needing them
 * (Preparer/Analyst, Independent Reviewer, Read-only/Auditor).
 */
const ROLE_PERMISSIONS: Record<OrgRole, ReadonlySet<Permission>> = {
  [OrgRole.MANAGING_PARTNER]: new Set(ALL_INTERNAL_PERMISSIONS),
  [OrgRole.PRACTICE_ADMIN]: new Set([
    "client:view",
    "client:create",
    "client:edit",
    "client:managePortalAccess",
    "membership:view",
    "membership:changeRole",
    "membership:deactivate",
    "audit:view",
    "settings:manage",
    "workflow:manageTemplates",
    "workflow:instantiate",
    "document:view",
    "document:upload",
    "document:delete",
    "quality:view",
    "quality:review",
    "request:view",
    "request:triage",
    "request:resolve",
    "meeting:view",
    "meeting:manage",
    "team:view",
    "team:manageCapacity",
    // View-only — the spec's approval chain names Managing Partner and
    // Senior CFO Reviewer, not Practice Administrator; see decision #4.
    "aicfo:view",
    "aicfo:viewAgentActivity",
  ]),
  [OrgRole.PORTFOLIO_LEAD]: new Set([
    "client:view",
    "client:create",
    "client:edit",
    "client:managePortalAccess",
    "membership:view",
    "billing:view",
    "workflow:instantiate",
    "task:updateStatus",
    "task:assign",
    "document:view",
    "document:upload",
    "quality:view",
    "quality:review",
    "request:view",
    "request:triage",
    "request:resolve",
    "meeting:view",
    "meeting:manage",
    "team:view",
    // Senior CFO Reviewer, per decision #4: full working access, final
    // approval on Low/Medium findings, recommends (doesn't finally decide)
    // High/Critical, can return work for correction, and can release
    // routine reports only where Membership.canReleaseReports is also
    // set — see that field's comment. Cannot configure materiality
    // thresholds or approve High/Critical — those stay Managing-Partner-only.
    "aicfo:view",
    "aicfo:viewAgentActivity",
    "aicfo:uploadClassify",
    "aicfo:draftReports",
    "aicfo:approveLowMedium",
    "aicfo:recommendHighCritical",
    "aicfo:returnForCorrection",
    "aicfo:releaseReports",
  ]),
  [OrgRole.RELATIONSHIP_MANAGER]: new Set([
    "client:view",
    "client:edit",
    "client:managePortalAccess",
    "membership:view",
    "document:view",
    "document:upload",
    "quality:view",
    "request:view",
    "request:triage",
    "request:resolve",
    "meeting:view",
    "meeting:manage",
    "team:view",
  ]),
  [OrgRole.SERVICE_LEAD]: new Set([
    "client:view",
    "client:edit",
    "membership:view",
    "workflow:manageTemplates",
    "workflow:instantiate",
    "task:updateStatus",
    "task:assign",
    "document:view",
    "document:upload",
    "quality:view",
    "quality:review",
    "request:view",
    "request:triage",
    "request:resolve",
    "meeting:view",
    "meeting:manage",
    "team:view",
  ]),
  [OrgRole.PREPARER_ANALYST]: new Set([
    "client:view",
    "task:updateStatus",
    "document:view",
    "document:upload",
    "quality:view",
    "request:view",
    "meeting:view",
    "team:view",
    // Finance Associate, per decision #4: uploads/classifies, drafts
    // reports and actions, responds to exceptions — never approves or
    // releases. No aicfo:viewAgentActivity — that's operational/cost
    // detail for reviewers, not part of a Finance Associate's job.
    "aicfo:view",
    "aicfo:uploadClassify",
    "aicfo:draftReports",
  ]),
  [OrgRole.INDEPENDENT_REVIEWER]: new Set([
    "client:view",
    "document:view",
    "quality:view",
    "quality:review",
    "request:view",
    "meeting:view",
    "team:view",
  ]),
  [OrgRole.FINANCE_BILLING]: new Set([
    "client:view",
    "billing:view",
    "document:view",
    "quality:view",
    "request:view",
    "meeting:view",
    "team:view",
  ]),
  [OrgRole.READ_ONLY_AUDITOR]: new Set([
    "client:view",
    "audit:view",
    "document:view",
    "quality:view",
    "request:view",
    "meeting:view",
    "team:view",
    // Auditor / External Reviewer, per decision #4: read-only by default.
    // Time-bound, client/period-scoped access is a separate, not-yet-built
    // mechanism (see /docs/decision-log.md "AI CFO foundation" — deferred
    // until ClientAccessGrant, built on claude/client-access-scoping,
    // merges and can carry an expiry). This permission alone does not grant
    // that scoping; it only says the role *can* see AI CFO material once
    // scoped access exists.
    "aicfo:view",
  ]),
};

export function can(role: OrgRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.has(permission) ?? false;
}

export function requirePermission(role: OrgRole, permission: Permission): void {
  if (!can(role, permission)) {
    throw new Error(
      `Forbidden: role ${role} does not have permission "${permission}".`,
    );
  }
}

export const ROLE_LABELS: Record<OrgRole, string> = {
  [OrgRole.MANAGING_PARTNER]: "Managing Partner",
  [OrgRole.PRACTICE_ADMIN]: "Practice Administrator",
  [OrgRole.PORTFOLIO_LEAD]: "Portfolio Lead / CFO",
  [OrgRole.RELATIONSHIP_MANAGER]: "Client Relationship Manager",
  [OrgRole.SERVICE_LEAD]: "Service Lead",
  [OrgRole.PREPARER_ANALYST]: "Preparer / Analyst",
  [OrgRole.INDEPENDENT_REVIEWER]: "Independent Reviewer",
  [OrgRole.FINANCE_BILLING]: "Finance / Billing",
  [OrgRole.READ_ONLY_AUDITOR]: "Read-only / Auditor",
};

/**
 * Segregation of duties: a reviewer must never be the same person who
 * prepared the work they're reviewing. Enforced in
 * app/os/(app)/quality/actions.ts submitReviewAction before a Review row
 * is ever created — kept here, not inlined there, so the rule lives in one
 * place regardless of what else calls it later (a future Deliverable-level
 * review, for instance).
 */
export function canReview(preparerMembershipId: string, reviewerMembershipId: string): boolean {
  return preparerMembershipId !== reviewerMembershipId;
}
