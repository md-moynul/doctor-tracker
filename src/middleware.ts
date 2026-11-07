import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for Better Auth session token in cookies
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/signin");

  // If user is NOT authenticated and trying to access a protected route -> redirect to /login
  if (!sessionToken && !isAuthPage) {
    const loginUrl = new URL("/login", request.url);
    // Preserve the original requested URL as a query param so they can return after login
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user IS authenticated and trying to access /login or /signup -> redirect to /dashboard
  if (sessionToken && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (needed for authentication API)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

