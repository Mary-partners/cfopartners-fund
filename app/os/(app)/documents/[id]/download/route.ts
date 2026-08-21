import { NextResponse, type NextRequest } from "next/server";
import { can } from "@/lib/os/auth/rbac";
import { requireActor } from "@/lib/os/auth/session";
import { getDocumentById } from "@/lib/os/queries/documents";
import { createDownloadUrl } from "@/lib/os/storage";

// Every download goes through here rather than a client ever holding a
// Storage URL directly: this route checks RBAC + org scoping on every
// request, then mints a signed URL that's valid for 5 minutes and redirects
// to it. The signed URL itself carries no ongoing authorization once handed
// out, so it's kept as short-lived and single-purpose as possible.
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const actor = await requireActor();

  if (!can(actor.membership.role, "document:view")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const document = await getDocumentById(actor.organizationId, params.id);
  if (!document) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const signedUrl = await createDownloadUrl(document.storagePath);
  return NextResponse.redirect(signedUrl);
}
