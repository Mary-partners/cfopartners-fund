import { z } from "zod";
import { ALLOWED_DOCUMENT_MIME_TYPES, MAX_DOCUMENT_SIZE_BYTES } from "@/lib/os/documents-shared";

/**
 * No clientId/taskId fields, unlike lib/os/validation/document.ts's
 * internal-side schemas — a portal upload is always for the signed-in
 * actor's own clientId, never a value the caller supplies. See
 * app/portal/(app)/documents/actions.ts.
 */
export const requestPortalUploadSchema = z.object({
  fileName: z.string().trim().min(1, "File name is required").max(200),
  mimeType: z.enum(ALLOWED_DOCUMENT_MIME_TYPES, {
    error: "That file type isn't supported. Use PDF, Word, Excel, PowerPoint, CSV or an image.",
  }),
  sizeBytes: z
    .coerce.number()
    .int()
    .positive()
    .max(MAX_DOCUMENT_SIZE_BYTES, "File is larger than the 25 MB limit."),
});

export const confirmPortalUploadSchema = z.object({
  storagePath: z.string().trim().min(1),
  fileName: z.string().trim().min(1).max(200),
  mimeType: z.string().trim().min(1),
  sizeBytes: z.coerce.number().int().positive(),
});
