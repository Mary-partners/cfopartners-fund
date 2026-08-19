import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/os/supabase/server";

// Exchanges the confirmation-link code Supabase sends for a session, then
// sends the user into the app. Reached from the signup confirmation email.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/os/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/os/login?error=auth-callback-failed`);
}
