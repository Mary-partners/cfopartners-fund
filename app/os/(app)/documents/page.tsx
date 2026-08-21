import type { Metadata } from "next";
import Link from "next/link";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { getDocumentList } from "@/lib/os/queries/documents";
import { getClientOptions } from "@/lib/os/queries/clients";
import { formatFileSize } from "@/lib/os/documents-shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { DocumentUploadForm } from "@/components/os/document-upload-form";
import { DeleteDocumentButton } from "@/components/os/delete-document-button";

export const metadata: Metadata = { title: "Documents" };

export default async function DocumentsPage() {
  const actor = await requireActor();
  const canView = can(actor.membership.role, "document:view");
  const canUpload = can(actor.membership.role, "document:upload");
  const canDelete = can(actor.membership.role, "document:delete");

  if (!canView) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-ink">Documents</h1>
        <p className="text-sm text-ink-2/60">
          Your role doesn&apos;t have permission to view documents.
        </p>
      </div>
    );
  }

  const [documents, clients] = await Promise.all([
    getDocumentList(actor.organizationId),
    getClientOptions(actor.organizationId),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Documents</h1>
        <p className="text-sm text-ink-2/70">{documents.length} on file.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            {documents.length === 0 ? (
              <p className="p-5 text-sm text-ink-2/60">
                No documents yet.
                {canUpload ? " Upload the first one from the panel on the right." : ""}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-2/50">
                      <th scope="col" className="px-5 py-3 font-medium">File</th>
                      <th scope="col" className="px-5 py-3 font-medium">Client</th>
                      <th scope="col" className="px-5 py-3 font-medium">Uploaded by</th>
                      <th scope="col" className="px-5 py-3 font-medium">Size</th>
                      <th scope="col" className="px-5 py-3 font-medium">Date</th>
                      <th scope="col" className="px-5 py-3 font-medium" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-ink/[0.02]">
                        <td className="px-5 py-3">
                          <a
                            href={`/os/documents/${doc.id}/download`}
                            className="font-medium text-ink hover:underline"
                          >
                            {doc.fileName}
                          </a>
                        </td>
                        <td className="px-5 py-3 text-ink-2">
                          {doc.client ? (
                            <Link href={`/os/clients/${doc.client.id}`} className="hover:underline">
                              {doc.client.name}
                            </Link>
                          ) : (
                            <span className="text-ink-2/50">General</span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-ink-2">
                          {doc.uploadedBy?.displayName ?? doc.uploadedBy?.email ?? "—"}
                        </td>
                        <td className="px-5 py-3 text-ink-2">{formatFileSize(doc.sizeBytes)}</td>
                        <td className="px-5 py-3 text-ink-2">
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-3 text-right">
                          {canDelete ? (
                            <DeleteDocumentButton documentId={doc.id} fileName={doc.fileName} />
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload a document</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            {canUpload ? (
              <DocumentUploadForm clients={clients} />
            ) : (
              <p className="text-sm text-ink-2/60">
                Your role doesn&apos;t have permission to upload documents.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
