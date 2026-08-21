import "server-only";

import { getSupabaseAdmin } from "@/lib/os/supabase/admin";
import { DOCUMENTS_BUCKET, MAX_DOCUMENT_SIZE_BYTES } from "@/lib/os/documents-shared";

// File uploads go straight from the browser to Supabase Storage via a
// short-lived signed upload URL (see requestDocumentUploadAction in
// app/os/(app)/documents/actions.ts) — the file bytes never pass through a
// Next.js server action or route handler. That's a deliberate choice, not
// an optimization: Vercel Serverless Functions cap request bodies at
// ~4.5 MB, well under what a scanned financial statement or a management
// accounts pack can be. Routing bytes through the app would silently fail
// on anything larger.

let bucketEnsured = false;

/**
 * Creates the "documents" bucket on first use if it doesn't already exist.
 * Idempotent and cheap to call repeatedly (cached per warm server instance)
 * — means there's no separate manual "create a Storage bucket" dashboard
 * step in /docs/setup.md, unlike the Supabase project/database setup which
 * genuinely can't be done over HTTPS-only egress.
 */
async function ensureDocumentsBucket(): Promise<void> {
  if (bucketEnsured) return;

  const admin = getSupabaseAdmin();
  const { data: existing } = await admin.storage.getBucket(DOCUMENTS_BUCKET);

  if (!existing) {
    const { error } = await admin.storage.createBucket(DOCUMENTS_BUCKET, {
      public: false,
      fileSizeLimit: MAX_DOCUMENT_SIZE_BYTES,
    });
    // Ignore a race where another concurrent request created it first.
    if (error && !error.message.toLowerCase().includes("already exists")) {
      throw error;
    }
  }

  bucketEnsured = true;
}

function sanitizeFileName(fileName: string): string {
  return fileName.trim().replace(/[^a-zA-Z0-9._-]/g, "_").slice(-140);
}

/** `${organizationId}/${clientId or "general"}/${uuid}-${safeFileName}` */
export function buildStoragePath(
  organizationId: string,
  clientId: string | null,
  fileName: string,
): string {
  const safeName = sanitizeFileName(fileName);
  return `${organizationId}/${clientId ?? "general"}/${crypto.randomUUID()}-${safeName}`;
}

/** Mints a one-time URL the browser can PUT the file bytes to directly. */
export async function createUploadUrl(storagePath: string) {
  await ensureDocumentsBucket();
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.storage
    .from(DOCUMENTS_BUCKET)
    .createSignedUploadUrl(storagePath);
  if (error) throw error;
  return data; // { signedUrl, token, path }
}

/** Mints a short-lived (5 min) URL to download/view one object. */
export async function createDownloadUrl(storagePath: string) {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.storage
    .from(DOCUMENTS_BUCKET)
    .createSignedUrl(storagePath, 300);
  if (error) throw error;
  return data.signedUrl;
}

export async function deleteStorageFile(storagePath: string) {
  const admin = getSupabaseAdmin();
  const { error } = await admin.storage.from(DOCUMENTS_BUCKET).remove([storagePath]);
  if (error) throw error;
}
