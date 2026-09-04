import type { Metadata } from "next";
import { requireActor } from "@/lib/os/auth/session";
import { SetPasswordForm } from "@/components/os/auth/set-password-form";

export const metadata: Metadata = { title: "Set your password" };

/**
 * Reached right after app/os/auth/callback/route.ts verifies an admin-invite
 * link. requireActor() here does double duty, same as the portal
 * equivalent: it's the guard, and — since it's the first call to
 * getOrCreateCurrentActor() this session — it's also what claims the
 * pending staff-invite Membership row by email. See
 * lib/os/auth/session.ts.
 */
export default async function SetPasswordPage() {
  const actor = await requireActor();

  return <SetPasswordForm email={actor.email} />;
}
