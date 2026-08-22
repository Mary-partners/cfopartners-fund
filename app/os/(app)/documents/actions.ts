"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/os/db";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { recordAuditEvent } from "@/lib/os/audit";
import { requestUploadSchema, confirmUploadSchema } from "@/lib/os/validation/document";
import { buildStoragePath, createUploadUrl, deleteStorageFile } from "@/lib/os/storage";

export type ActionState = { error?: string; fieldErrors?: Record<string, string> };

function fieldErrorsFrom(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

async function assertClientInOrg(organizationId: string, clientId: string | null) {
  if (!clientId) return true;
  const client = await db.client.findFirst({ where: { id: clientId, organizationId } });
  return Boolean(client);
}

/**
 * A task-scoped document's clientId is never taken from the caller — it's
 * derived here from the task's own workflow instance, so it can't drift
 * out of sync with which client the task actually belongs to. Returns
 * null if the task doesn't exist in this org (including "wrong org").
 */
async function resolveTaskContext(organizationId: string, taskId: string) {
  const task = await db.task.findFirst({
    where: { id: taskId, workflowInstance: { organizationId } },
    select: { workflowInstanceId: true, workflowInstance: { select: { clientId: true } } },
  });
  if (!task) return null;
  return { workflowInstanceId: task.workflowInstanceId, clientId: task.workflowInstance.clientId };
}

export type RequestUploadResult =
  | { error: string }
  | { signedUrl: string; token: string; path: string };

/**
 * Step 1 of the upload flow: mints a one-time signed Storage upload URL.
 * The browser then PUTs the file bytes directly to Supabase Storage (never
 * through this server), and calls confirmDocumentUploadAction once that
 * succeeds — see components/os/document-upload-form.tsx.
 */
export async function requestDocumentUploadAction(input: {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  clientId: string | null;
  taskId?: string | null;
}): Promise<RequestUploadResult> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "document:upload")) {
    return { error: "You don't have permission to upload documents." };
  }

  const parsed = requestUploadSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid file." };
  }

  let clientId = parsed.data.clientId;
  if (parsed.data.taskId) {
    const taskContext = await resolveTaskContext(actor.organizationId, parsed.data.taskId);
    if (!taskContext) {
      return { error: "Task not found." };
    }
    clientId = taskContext.clientId;
  } else if (!(await assertClientInOrg(actor.organizationId, clientId))) {
    return { error: "Client not found." };
  }

  const storagePath = buildStoragePath(actor.organizationId, clientId, parsed.data.fileName);

  try {
    const upload = await createUploadUrl(storagePath);
    return { signedUrl: upload.signedUrl, token: upload.token, path: upload.path };
  } catch (err) {
    // Surfaced to the uploader rather than swallowed: this is an internal
    // staff tool, and "couldn't prepare the upload, try again" with no
    // detail is a dead end when the real cause (bad credentials, missing
    // bucket permissions, etc.) is something only an admin can fix, not
    // something retrying solves.
    const detail = err instanceof Error ? err.message : String(err);
    return { error: `Couldn't prepare the upload: ${detail}` };
  }
}

export type ConfirmUploadResult = { error?: string; documentId?: string };

/** Step 2: called once the browser's direct-to-Storage PUT has succeeded. */
export async function confirmDocumentUploadAction(input: {
  storagePath: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  clientId: string | null;
  taskId?: string | null;
}): Promise<ConfirmUploadResult> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "document:upload")) {
    return { error: "You don't have permission to upload documents." };
  }

  const parsed = confirmUploadSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Invalid upload." };
  }

  let clientId = parsed.data.clientId;
  let workflowInstanceId: string | null = null;
  if (parsed.data.taskId) {
    const taskContext = await resolveTaskContext(actor.organizationId, parsed.data.taskId);
    if (!taskContext) {
      return { error: "Task not found." };
    }
    clientId = taskContext.clientId;
    workflowInstanceId = taskContext.workflowInstanceId;
  } else if (!(await assertClientInOrg(actor.organizationId, clientId))) {
    return { error: "Client not found." };
  }

  const document = await db.document.create({
    data: {
      organizationId: actor.organizationId,
      clientId,
      taskId: parsed.data.taskId ?? null,
      uploadedByMembershipId: actor.membership.id,
      fileName: parsed.data.fileName,
      storagePath: parsed.data.storagePath,
      mimeType: parsed.data.mimeType,
      sizeBytes: parsed.data.sizeBytes,
    },
  });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "DOCUMENT_UPLOADED",
    targetType: "Document",
    targetId: document.id,
    metadata: { fileName: document.fileName, clientId: document.clientId, taskId: document.taskId },
  });

  revalidatePath("/os/documents");
  if (document.clientId) {
    revalidatePath(`/os/clients/${document.clientId}`);
  }
  if (workflowInstanceId) {
    revalidatePath(`/os/work/${workflowInstanceId}`);
  }

  return { documentId: document.id };
}

export async function deleteDocumentAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "document:delete")) {
    return { error: "You don't have permission to delete documents." };
  }

  const documentId = formData.get("documentId");
  if (typeof documentId !== "string" || !documentId) {
    return { error: "Missing document." };
  }

  const document = await db.document.findFirst({
    where: { id: documentId, organizationId: actor.organizationId },
    include: { task: { select: { workflowInstanceId: true } } },
  });
  if (!document) {
    return { error: "Document not found." };
  }

  try {
    await deleteStorageFile(document.storagePath);
  } catch {
    // Storage object may already be gone (e.g. a retried delete) — the
    // metadata row is the source of truth for the UI, so proceed either way
    // rather than leaving an orphaned row the user can't remove.
  }

  await db.document.delete({ where: { id: document.id } });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "DOCUMENT_DELETED",
    targetType: "Document",
    targetId: document.id,
    metadata: { fileName: document.fileName, clientId: document.clientId, taskId: document.taskId },
  });

  revalidatePath("/os/documents");
  if (document.clientId) {
    revalidatePath(`/os/clients/${document.clientId}`);
  }
  if (document.task) {
    revalidatePath(`/os/work/${document.task.workflowInstanceId}`);
  }

  return {};
}
