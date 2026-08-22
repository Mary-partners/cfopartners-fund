import type { Metadata } from "next";
import { requirePortalActor } from "@/lib/os/auth/portal-session";
import { canPortal } from "@/lib/os/auth/portal-rbac";
import { getDocumentsForPortalClient } from "@/lib/os/queries/documents";
import { formatFileSize } from "@/lib/os/documents-shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { PortalDocumentUploadForm } from "@/components/os/portal/document-upload-form";
import { PortalDeleteDocumentButton } from "@/components/os/portal/delete-document-button";

export const metadata: Metadata = { title: "Documents" };

export default async function PortalDocumentsPage() {
  const actor = await requirePortalActor();
  const canView = canPortal(actor.clientMembership.role, "document:view");
  const canUpload = canPortal(actor.clientMembership.role, "document:upload");
  const documents = canView ? await getDocumentsForPortalClient(actor.clientId) : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Documents</h1>
        <p className="text-sm text-ink-2/70">Shared with and by {actor.clientName}.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All documents ({documents.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {documents.length === 0 ? (
              <p className="p-5 text-sm text-ink-2/60">No documents yet.</p>
            ) : (
              <ul className="divide-y divide-ink/5">
                {documents.map((doc) => {
                  const uploader =
                    doc.uploadedByClientMembership?.displayName ??
                    doc.uploadedByClientMembership?.email ??
                    doc.uploadedBy?.displayName ??
                    doc.uploadedBy?.email ??
                    "—";
                  const canDeleteThis =
                    doc.uploadedByClientMembershipId === actor.clientMembership.id &&
                    canPortal(actor.clientMembership.role, "document:delete");
                  return (
                    <li key={doc.id} className="flex items-center justify-between px-5 py-3">
                      <div>
                        <a
                          href={`/portal/documents/${doc.id}/download`}
                          className="text-sm font-medium text-ink hover:underline"
                        >
                          {doc.fileName}
                        </a>
                        <div className="text-xs text-ink-2/50">
                          {formatFileSize(doc.sizeBytes)} · {uploader} ·{" "}
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      {canDeleteThis ? (
                        <PortalDeleteDocumentButton documentId={doc.id} fileName={doc.fileName} />
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        {canUpload ? (
          <Card>
            <CardHeader>
              <CardTitle>Upload a document</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <PortalDocumentUploadForm />
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
