import { ClientRole } from "@/generated/prisma/enums";

export { ClientRole };

/**
 * Deliberately its own type, not a widened Permission — a client-portal
 * permission string must never collide with (or be checked against) an
 * internal Permission from lib/os/auth/rbac.ts. The two roles (ClientRole,
 * OrgRole) are already kept fully separate; this keeps the permission
 * vocabularies separate too, so `can(role, permission)` can't accidentally
 * be called with the wrong pair.
 */
export type PortalPermission =
  | "work:view"
  | "document:view"
  | "document:upload"
  | "document:delete"
  | "approval:submit";

const ALL_PORTAL_PERMISSIONS: PortalPermission[] = [
  "work:view",
  "document:view",
  "document:upload",
  "document:delete",
  "approval:submit",
];

/**
 * Both client roles see the same client's Work and Documents — the
 * distinction is authority to sign off. A Collaborator can prepare
 * everything an Admin can (view work, upload requested documents, delete a
 * document they uploaded by mistake) but only a Client Admin can approve a
 * task or request changes on it, mirroring how most client organizations
 * actually delegate financial sign-off.
 *
 * `document:delete` here only gates *whether this role can ever delete
 * anything* — it's not "can delete any document for this client". The
 * stronger rule (only ever your own upload, never a staff-delivered
 * document) can't be expressed as a static role→permission set, so it's
 * enforced separately in deletePortalDocumentAction
 * (app/portal/(app)/documents/actions.ts) — the same shape as canReview()
 * in lib/os/auth/rbac.ts, a second, situational check layered on top of a
 * static role→permission table rather than folded into it.
 */
const PORTAL_ROLE_PERMISSIONS: Record<ClientRole, ReadonlySet<PortalPermission>> = {
  [ClientRole.CLIENT_ADMIN]: new Set(ALL_PORTAL_PERMISSIONS),
  [ClientRole.CLIENT_COLLABORATOR]: new Set([
    "work:view",
    "document:view",
    "document:upload",
    "document:delete",
  ]),
};

export function canPortal(role: ClientRole, permission: PortalPermission): boolean {
  return PORTAL_ROLE_PERMISSIONS[role]?.has(permission) ?? false;
}

export function requirePortalPermission(role: ClientRole, permission: PortalPermission): void {
  if (!canPortal(role, permission)) {
    throw new Error(`Forbidden: client role ${role} does not have permission "${permission}".`);
  }
}

export const CLIENT_ROLE_LABELS: Record<ClientRole, string> = {
  [ClientRole.CLIENT_ADMIN]: "Client Admin",
  [ClientRole.CLIENT_COLLABORATOR]: "Client Collaborator",
};
