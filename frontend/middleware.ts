import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function hasSessionCookie(req: NextRequest): boolean {
  // Check for better-auth session cookie (could be session_token or session)
  return !!(
    req.cookies.get("better-auth.session_token")?.value ||
    req.cookies.get("better-auth.session")?.value ||
    req.cookies.get("__Secure-better-auth.session")?.value
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔐 Check if user has a session cookie
  const isLoggedIn = hasSessionCookie(req);

  // --------------------------------------------------
  // 1️⃣ Allow public routes always
  // --------------------------------------------------
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/" ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // --------------------------------------------------
  // 2️⃣ Not logged in → block protected routes
  // --------------------------------------------------
  if (!isLoggedIn) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/onboarding")
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  }

  // --------------------------------------------------
  // 3️⃣ Logged in → block auth pages
  // --------------------------------------------------
  if (pathname.startsWith("/auth")) {
    // Keep it simple: send logged-in users to student dashboard by default.
    // Client/server code can further route based on role if needed.
    return NextResponse.redirect(new URL("/dashboard/student", req.url));
  }

  return NextResponse.next();
}

// --------------------------------------------------
// Matcher (VERY IMPORTANT)
// --------------------------------------------------

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};