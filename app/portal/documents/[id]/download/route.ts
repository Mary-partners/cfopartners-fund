import { NextResponse, type NextRequest } from "next/server";
import { canPortal } from "@/lib/os/auth/portal-rbac";
import { requirePortalActor } from "@/lib/os/auth/portal-session";
import { getDocumentForPortalClient } from "@/lib/os/queries/documents";
import { createDownloadUrl } from "@/lib/os/storage";

// Mirrors app/os/(app)/documents/[id]/download/route.ts, scoped to the
// portal actor's own clientId (not organizationId) — see
// lib/os/queries/portal-work.ts for why that's the boundary that matters
// here.
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const actor = await requirePortalActor();

  if (!canPortal(actor.clientMembership.role, "document:view")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const document = await getDocumentForPortalClient(actor.clientId, params.id);
  if (!document) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const signedUrl = await createDownloadUrl(document.storagePath);
  return NextResponse.redirect(signedUrl);
}
