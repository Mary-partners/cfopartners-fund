import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentPortalActor } from "@/lib/os/auth/portal-session";
import { PortalLoginForm } from "@/components/os/portal/login-form";

export const metadata: Metadata = { title: "Sign in — Client Portal" };

export default async function PortalLoginPage() {
  // See app/os/(auth)/login/page.tsx's comment — same DB-backed check,
  // mirrored for the portal side.
  const actor = await getCurrentPortalActor();
  if (actor) {
    redirect("/portal/work");
  }

  return (
    <Suspense>
      <PortalLoginForm />
    </Suspense>
  );
}
