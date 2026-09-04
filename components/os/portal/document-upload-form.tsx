"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  requestPortalDocumentUploadAction,
  confirmPortalDocumentUploadAction,
} from "@/app/portal/(app)/documents/actions";
import { createClient } from "@/lib/os/supabase/client";
import { Button } from "@/components/os/ui/button";
import { Label } from "@/components/os/ui/label";
import { DOCUMENTS_BUCKET, MAX_DOCUMENT_SIZE_BYTES } from "@/lib/os/documents-shared";

/** Portal mirror of components/os/document-upload-form.tsx — see that file's comment for why this is a two-step upload rather than a plain form action. Always uploads to the signed-in actor's own client; there's no client picker. */
export function PortalDocumentUploadForm() {
  const router = useRouter();
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
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

    const requested = await requestPortalDocumentUploadAction({
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
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

    const confirmed = await confirmPortalDocumentUploadAction({
      storagePath: requested.path,
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
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

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={fileInputId}>File</Label>
        <input
          ref={fileInputRef}
          id={fileInputId}
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
