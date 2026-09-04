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
  | "quality:review";

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
  ]),
  [OrgRole.RELATIONSHIP_MANAGER]: new Set([
    "client:view",
    "client:edit",
    "client:managePortalAccess",
    "membership:view",
    "document:view",
    "document:upload",
    "quality:view",
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
  ]),
  [OrgRole.PREPARER_ANALYST]: new Set([
    "client:view",
    "task:updateStatus",
    "document:view",
    "document:upload",
    "quality:view",
  ]),
  [OrgRole.INDEPENDENT_REVIEWER]: new Set([
    "client:view",
    "document:view",
    "quality:view",
    "quality:review",
  ]),
  [OrgRole.FINANCE_BILLING]: new Set(["client:view", "billing:view", "document:view", "quality:view"]),
  [OrgRole.READ_ONLY_AUDITOR]: new Set(["client:view", "audit:view", "document:view", "quality:view"]),
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
