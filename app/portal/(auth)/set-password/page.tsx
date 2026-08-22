import type { Metadata } from "next";
import { requirePortalActor } from "@/lib/os/auth/portal-session";
import { SetPasswordForm } from "@/components/os/portal/set-password-form";

export const metadata: Metadata = { title: "Set your password — Client Portal" };

/**
 * Reached right after app/portal/auth/callback/route.ts exchanges an invite
 * link's code for a session. requirePortalActor() here does double duty:
 * it's the guard (bounce to /portal/login if this isn't actually a valid
 * client-portal sign-in), and — since it's the first call to
 * getCurrentPortalActor() this session — it's also what claims the pending
 * ClientMembership invite row by email. See lib/os/auth/portal-session.ts.
 */
export default async function SetPasswordPage() {
  const actor = await requirePortalActor();

  return <SetPasswordForm email={actor.email} />;
}
