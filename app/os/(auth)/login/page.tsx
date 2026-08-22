import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getOrCreateCurrentActor } from "@/lib/os/auth/session";
import { LoginForm } from "@/components/os/auth/login-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  // A DB-backed check, not a middleware guess — see middleware.ts's comment
  // on why bouncing an authenticated visitor off the login page can no
  // longer be done from middleware alone now that /portal shares the same
  // Supabase session cookies. getOrCreateCurrentActor() correctly resolves
  // to null (no redirect) for a signed-in client-portal user, since staff
  // sign-in and client-portal sign-in are separate identities.
  const actor = await getOrCreateCurrentActor();
  if (actor) {
    redirect("/os/dashboard");
  }

  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
