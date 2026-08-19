import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Scoped entirely to the /os subtree (see the matcher below) — this must
// never intercept the public marketing site.
const PUBLIC_PATHS = ["/os/login", "/os/signup", "/os/auth/callback"];

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
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (!user && !isPublicPath) {
    const redirectUrl = new URL("/os/login", request.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && (pathname === "/os/login" || pathname === "/os/signup")) {
    return NextResponse.redirect(new URL("/os/dashboard", request.url));
  }

  return response;
}

export const config = {
  // Scoped to the OS subtree only — the public marketing site must never
  // pass through Supabase auth middleware.
  matcher: ["/os/:path*"],
};
