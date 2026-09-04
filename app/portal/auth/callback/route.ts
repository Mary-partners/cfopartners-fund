import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/os/supabase/server";

// Reached from the invite email inviteClientUserAction sends
// (app/os/(app)/clients/[id]/portal-actions.ts). Always sends a successful
// exchange to set-password next — an invited client user has no password
// yet (they were never asked to choose one at sign-up, since there is no
// client-side sign-up), so this route is never a "just log me in" shortcut
// the way the /os callback can be.
//
// Handles two different link shapes, not just one: Supabase's own
// `inviteUserByEmail` (an admin action, not a browser-initiated flow) does
// not reliably produce the `?code=` PKCE-style link app/os/auth/callback
// was originally written for — its default email template instead links to
// Supabase's own `/auth/v1/verify` endpoint with `token_hash`/`type`
// params, which then redirects here with *those* params still attached
// (not a `code`). Try the PKCE path first since it's what a signed-in
// user's own actions (password reset, etc.) would use; fall back to the
// token_hash verify path Supabase's invite template actually sends today.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/portal/set-password`);
    }
    return NextResponse.redirect(
      `${origin}/portal/login?error=${encodeURIComponent(`Invite link exchange failed: ${error.message}`)}`,
    );
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) {
      return NextResponse.redirect(`${origin}/portal/set-password`);
    }
    return NextResponse.redirect(
      `${origin}/portal/login?error=${encodeURIComponent(`Invite link verification failed: ${error.message}`)}`,
    );
  }

  return NextResponse.redirect(
    `${origin}/portal/login?error=${encodeURIComponent("This invite link is missing its verification code — it may have already been used, or an email security scanner may have already visited it before you clicked it.")}`,
  );
}
