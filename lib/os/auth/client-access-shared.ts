import { OrgRole } from "@/lib/os/auth/rbac";

/**
 * The org-wide-visibility role set, split out from client-access.ts (which
 * is `server-only`) so client components — the invite form's role-aware
 * "which clients can they see" toggle — can import just this constant
 * without pulling in server-only query code. client-access.ts re-exports
 * `hasOrgWideClientAccess` built on this same set, so there's one
 * definition, not two to keep in sync.
 */
export const ORG_WIDE_ROLE_VALUES: ReadonlySet<OrgRole> = new Set([
  OrgRole.MANAGING_PARTNER,
  OrgRole.PRACTICE_ADMIN,
  OrgRole.PORTFOLIO_LEAD,
]);
