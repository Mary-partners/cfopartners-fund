import "server-only";

import { db } from "@/lib/os/db";

const UPLOADER_SELECT = { select: { displayName: true, email: true } } as const;

export async function getDocumentsForClient(organizationId: string, clientId: string) {
  return db.document.findMany({
    where: { organizationId, clientId },
    orderBy: { createdAt: "desc" },
    include: { uploadedBy: UPLOADER_SELECT },
  });
}

export async function getDocumentList(organizationId: string) {
  return db.document.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
    include: {
      uploadedBy: UPLOADER_SELECT,
      client: { select: { id: true, name: true } },
    },
  });
}

export async function getDocumentById(organizationId: string, documentId: string) {
  return db.document.findFirst({
    where: { id: documentId, organizationId },
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
