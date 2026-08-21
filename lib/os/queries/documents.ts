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
