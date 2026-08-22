import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/os/supabase/server";

// Reached from the invite email inviteClientUserAction sends
// (app/os/(app)/clients/[id]/portal-actions.ts). Same code-exchange pattern
// as app/os/auth/callback/route.ts. Always sends a successful exchange to
// set-password next — an invited client user has no password yet (they
// were never asked to choose one at sign-up, since there is no client-side
// sign-up), so this route is never a "just log me in" shortcut the way the
// /os callback can be.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/portal/set-password`);
    }
  }

  return NextResponse.redirect(`${origin}/portal/login?error=auth-callback-failed`);
}
