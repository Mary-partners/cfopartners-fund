"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/os/db";
import { requirePortalActor } from "@/lib/os/auth/portal-session";
import { canPortal } from "@/lib/os/auth/portal-rbac";
import { recordAuditEvent } from "@/lib/os/audit";
import { requestPortalUploadSchema, confirmPortalUploadSchema } from "@/lib/os/validation/portal-documents";
import { buildStoragePath, createUploadUrl, deleteStorageFile } from "@/lib/os/storage";

export type ActionState = { error?: string; fieldErrors?: Record<string, string> };

export type RequestUploadResult = { error: string } | { signedUrl: string; token: string; path: string };

/** Portal mirror of requestDocumentUploadAction — see that function's own comment. */
export async function requestPortalDocumentUploadAction(input: {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}): Promise<RequestUploadResult> {
  const actor = await requirePortalActor();
  if (!canPortal(actor.clientMembership.role, "document:upload")) {
    return { error: "You don't have permission to upload documents." };
  }

  const parsed = requestPortalUploadSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid file." };
  }

  const storagePath = buildStoragePath(actor.organizationId, actor.clientId, parsed.data.fileName);

  try {
    const upload = await createUploadUrl(storagePath);
    return { signedUrl: upload.signedUrl, token: upload.token, path: upload.path };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return { error: `Couldn't prepare the upload: ${detail}` };
  }
}

export type ConfirmUploadResult = { error?: string; documentId?: string };

export async function confirmPortalDocumentUploadAction(input: {
  storagePath: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}): Promise<ConfirmUploadResult> {
  const actor = await requirePortalActor();
  if (!canPortal(actor.clientMembership.role, "document:upload")) {
    return { error: "You don't have permission to upload documents." };
  }

  const parsed = confirmPortalUploadSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Invalid upload." };
  }

  const document = await db.document.create({
    data: {
      organizationId: actor.organizationId,
      clientId: actor.clientId,
      uploadedByClientMembershipId: actor.clientMembership.id,
      fileName: parsed.data.fileName,
      storagePath: parsed.data.storagePath,
      mimeType: parsed.data.mimeType,
      sizeBytes: parsed.data.sizeBytes,
    },
  });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorLabel: `client:${actor.email}`,
    action: "DOCUMENT_UPLOADED",
    targetType: "Document",
    targetId: document.id,
    metadata: { fileName: document.fileName, clientId: document.clientId },
  });

  revalidatePath("/portal/documents");
  // Staff should see a client's upload on the client's own 360 page too.
  revalidatePath(`/os/clients/${actor.clientId}`);
  revalidatePath("/os/documents");

  return { documentId: document.id };
}

export async function deletePortalDocumentAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requirePortalActor();
  if (!canPortal(actor.clientMembership.role, "document:delete")) {
    return { error: "You don't have permission to delete documents." };
  }

  const documentId = formData.get("documentId");
  if (typeof documentId !== "string" || !documentId) {
    return { error: "Missing document." };
  }

  const document = await db.document.findFirst({
    where: { id: documentId, clientId: actor.clientId },
  });
  if (!document) {
    return { error: "Document not found." };
  }
  // Self-service correction only — a client can remove a file they uploaded
  // by mistake, never a document staff delivered to them. See the comment
  // on document:delete in lib/os/auth/portal-rbac.ts.
  if (document.uploadedByClientMembershipId !== actor.clientMembership.id) {
    return { error: "You can only delete documents you uploaded yourself." };
  }

  try {
    await deleteStorageFile(document.storagePath);
  } catch {
    // Storage object may already be gone — proceed either way, same as
    // deleteDocumentAction's own reasoning.
  }

  await db.document.delete({ where: { id: document.id } });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorLabel: `client:${actor.email}`,
    action: "DOCUMENT_DELETED",
    targetType: "Document",
    targetId: document.id,
    metadata: { fileName: document.fileName, clientId: document.clientId },
  });

  revalidatePath("/portal/documents");
  revalidatePath(`/os/clients/${actor.clientId}`);
  revalidatePath("/os/documents");

  return {};
}
