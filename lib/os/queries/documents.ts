import "server-only";

import { db } from "@/lib/os/db";

const UPLOADER_SELECT = { select: { displayName: true, email: true } } as const;

export async function getDocumentsForClient(
  organizationId: string,
  clientId: string,
  accessibleClientIds: string[] | null,
) {
  if (accessibleClientIds !== null && !accessibleClientIds.includes(clientId)) {
    return [];
  }
  return db.document.findMany({
    where: { organizationId, clientId },
    orderBy: { createdAt: "desc" },
    include: { uploadedBy: UPLOADER_SELECT },
  });
}

// A document with no clientId ("General") isn't scoped to any client, so it
// carries nothing to leak — scoping still lets a restricted role see it.
function clientOrGeneralScope(accessibleClientIds: string[] | null) {
  return accessibleClientIds === null
    ? {}
    : { OR: [{ clientId: null }, { clientId: { in: accessibleClientIds } }] };
}

export async function getDocumentList(organizationId: string, accessibleClientIds: string[] | null) {
  return db.document.findMany({
    where: { organizationId, ...clientOrGeneralScope(accessibleClientIds) },
    orderBy: { createdAt: "desc" },
    include: {
      uploadedBy: UPLOADER_SELECT,
      client: { select: { id: true, name: true } },
    },
  });
}

export async function getDocumentById(
  organizationId: string,
  documentId: string,
  accessibleClientIds: string[] | null,
) {
  return db.document.findFirst({
    where: { id: documentId, organizationId, ...clientOrGeneralScope(accessibleClientIds) },
  });
}

/**
 * Scoped by `clientId`, not `organizationId` — see the note at the top of
 * lib/os/queries/portal-work.ts for why the portal's isolation boundary has
 * to be one level stricter than the internal side's.
 */
export async function getDocumentForPortalClient(clientId: string, documentId: string) {
  return db.document.findFirst({
    where: { id: documentId, clientId },
  });
}

export async function getDocumentsForPortalClient(clientId: string) {
  return db.document.findMany({
    where: { clientId },
    orderBy: { createdAt: "desc" },
    include: {
      uploadedBy: UPLOADER_SELECT,
      uploadedByClientMembership: { select: { displayName: true, email: true } },
    },
  });
}
