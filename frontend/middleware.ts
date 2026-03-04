import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {

  const session = await auth.api.getSession({
    headers: req.headers
  })

  const isLoggedIn = !!session

  const { pathname } = req.nextUrl


  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  if (isLoggedIn && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard/student", req.url))
  }
  console.log(req.cookies.getAll())

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/onboarding/:path*"],
}

