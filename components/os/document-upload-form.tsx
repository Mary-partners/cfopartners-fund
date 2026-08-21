"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  requestDocumentUploadAction,
  confirmDocumentUploadAction,
} from "@/app/os/(app)/documents/actions";
import { createClient } from "@/lib/os/supabase/client";
import { Button } from "@/components/os/ui/button";
import { Label } from "@/components/os/ui/label";
import { DOCUMENTS_BUCKET, MAX_DOCUMENT_SIZE_BYTES } from "@/lib/os/documents-shared";

type ClientOption = { id: string; name: string };

/**
 * Two-step upload, not a plain <form action>: the file goes straight from
 * this browser to Supabase Storage over a signed URL (step 1 mints it, step
 * 2 confirms the write and creates the Document row) — see
 * app/os/(app)/documents/actions.ts for why. useFormState doesn't fit that
 * shape, so this manages its own pending/error state instead.
 */
export function DocumentUploadForm({
  clients,
  fixedClientId,
}: {
  clients?: ClientOption[];
  fixedClientId?: string;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [clientId, setClientId] = useState<string>(fixedClientId ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Choose a file first.");
      setStatus("error");
      return;
    }

    setStatus("uploading");
    setError(null);

    const resolvedClientId = clientId || null;

    const requested = await requestDocumentUploadAction({
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      clientId: resolvedClientId,
    });
    if ("error" in requested) {
      setError(requested.error);
      setStatus("error");
      return;
    }

    const supabase = createClient();
    const { error: uploadError } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .uploadToSignedUrl(requested.path, requested.token, file);
    if (uploadError) {
      setError("Upload failed. Try again.");
      setStatus("error");
      return;
    }

    const confirmed = await confirmDocumentUploadAction({
      storagePath: requested.path,
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      clientId: resolvedClientId,
    });
    if (confirmed.error) {
      setError(confirmed.error);
      setStatus("error");
      return;
    }

    setStatus("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
    router.refresh();
  }

  const uploading = status === "uploading";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {clients && !fixedClientId ? (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="documentClientId">Client (optional)</Label>
          <select
            id="documentClientId"
            value={clientId}
            onChange={(event) => setClientId(event.target.value)}
            disabled={uploading}
            className="h-10 rounded-md border border-ink/20 bg-white px-3 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
          >
            <option value="">General (not client-specific)</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="documentFile">File</Label>
        <input
          ref={fileInputRef}
          id="documentFile"
          type="file"
          disabled={uploading}
          className="text-sm text-ink-2 file:mr-3 file:rounded-md file:border-0 file:bg-ink/5 file:px-3 file:py-2 file:text-sm file:font-medium file:text-ink disabled:opacity-50"
        />
        <p className="text-xs text-ink-2/50">
          PDF, Word, Excel, PowerPoint, CSV or image. Up to{" "}
          {Math.round(MAX_DOCUMENT_SIZE_BYTES / (1024 * 1024))} MB.
        </p>
      </div>

      <Button type="submit" disabled={uploading} className="mt-2">
        {uploading ? "Uploading…" : "Upload"}
      </Button>
    </form>
  );
}
