import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getOrCreateCurrentActor } from "@/lib/os/auth/session";
import { SignupForm } from "@/components/os/auth/signup-form";

export const metadata: Metadata = { title: "Create account" };

export default async function SignupPage() {
  // See app/os/(auth)/login/page.tsx's comment for why this is a DB-backed
  // check here rather than a middleware shortcut.
  const actor = await getOrCreateCurrentActor();
  if (actor) {
    redirect("/os/dashboard");
  }

  return <SignupForm />;
}
