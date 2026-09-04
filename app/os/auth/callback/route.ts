import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/os/supabase/server";

// Handles two different link shapes — same split as
// app/portal/auth/callback/route.ts, and for the same reason. The self-serve
// signup confirmation email (signup-form.tsx's supabase.auth.signUp) sends a
// `?code=` PKCE link: the user already chose a password at signup, so a
// successful exchange goes straight to the app. inviteStaffMemberAction's
// admin-invite email (supabase.auth.admin.inviteUserByEmail) instead sends a
// `?token_hash=&type=invite` link — that invited person has no password yet,
// so a successful verify goes to /os/set-password, not straight in.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/os/dashboard";

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    return NextResponse.redirect(
      `${origin}/os/login?error=${encodeURIComponent(`Sign-in link failed: ${error.message}`)}`,
    );
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) {
      return NextResponse.redirect(`${origin}/os/set-password`);
    }
    return NextResponse.redirect(
      `${origin}/os/login?error=${encodeURIComponent(`Invite link verification failed: ${error.message}`)}`,
    );
  }

  return NextResponse.redirect(
    `${origin}/os/login?error=${encodeURIComponent("This link is missing its verification code — it may have already been used, or an email security scanner may have already visited it before you clicked it.")}`,
  );
}
