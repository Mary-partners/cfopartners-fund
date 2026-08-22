import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Scoped entirely to the /os and /portal subtrees (see the matcher below) —
// this must never intercept the public marketing site.
const PUBLIC_PATHS = [
  "/os/login",
  "/os/signup",
  "/os/auth/callback",
  "/portal/login",
  "/portal/auth/callback",
];

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Fail closed with a clear message rather than an uncaught exception
  // (which Vercel reports as an opaque MIDDLEWARE_INVOCATION_FAILED 500) —
  // this only happens if the Supabase env vars haven't been set on this
  // deployment yet. See /docs/setup.md.
  if (!supabaseUrl || !supabaseAnonKey) {
    return new NextResponse(
      "CFOIP OS is not configured yet: Supabase environment variables " +
        "(NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) are " +
        "missing on this deployment. See /docs/setup.md.",
      { status: 503 },
    );
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // IMPORTANT: getUser() (not getSession()) revalidates the token against
  // Supabase Auth on every request — getSession() only reads the (possibly
  // stale/forged) cookie.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isPortalPath = pathname.startsWith("/portal");
  const loginPath = isPortalPath ? "/portal/login" : "/os/login";
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (!user && !isPublicPath) {
    const redirectUrl = new URL(loginPath, request.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Deliberately NOT bouncing an authenticated user away from /os/login or
  // /portal/login here (an earlier version of this middleware did, for the
  // /os side). Since internal staff and client-portal users share the same
  // Supabase auth.users table and session cookies (see
  // /docs/security.md "Client Portal identity separation"), a Supabase
  // session existing tells you nothing about which side someone belongs
  // to — a client-portal user's session would satisfy `user` here just as
  // well as staff's, and bouncing them off /os/login into /os/dashboard
  // would immediately bounce right back (dashboard's requireActor() now
  // correctly refuses a client-portal user), an infinite redirect loop.
  // Telling which side a session belongs to needs a Prisma query this Edge
  // middleware doesn't make; each side's own login page
  // (app/os/(auth)/login/page.tsx, app/portal/(auth)/login/page.tsx)
  // already redirects an already-signed-in visitor away after resolving
  // that with a real DB lookup, so this shortcut isn't needed here.

  return response;
}

export const config = {
  // Scoped to the OS and Portal subtrees only — the public marketing site
  // must never pass through Supabase auth middleware.
  matcher: ["/os/:path*", "/portal/:path*"],
};
