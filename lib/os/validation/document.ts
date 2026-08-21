import { z } from "zod";
import { ALLOWED_DOCUMENT_MIME_TYPES, MAX_DOCUMENT_SIZE_BYTES } from "@/lib/os/documents-shared";

export const requestUploadSchema = z.object({
  fileName: z.string().trim().min(1, "File name is required").max(200),
  mimeType: z.enum(ALLOWED_DOCUMENT_MIME_TYPES, {
    error: "That file type isn't supported. Use PDF, Word, Excel, PowerPoint, CSV or an image.",
  }),
  sizeBytes: z
    .coerce.number()
    .int()
    .positive()
    .max(MAX_DOCUMENT_SIZE_BYTES, "File is larger than the 25 MB limit."),
  clientId: z.string().uuid().nullable(),
});

export const confirmUploadSchema = z.object({
  storagePath: z.string().trim().min(1),
  fileName: z.string().trim().min(1).max(200),
  mimeType: z.string().trim().min(1),
  sizeBytes: z.coerce.number().int().positive(),
  clientId: z.string().uuid().nullable(),
});
