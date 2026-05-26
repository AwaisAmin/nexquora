import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAdminLogin = path === "/admin/login";
  const isAdminRoute = path.startsWith("/admin");

  const token = req.cookies.get("nx_session")?.value;
  const session = await decrypt(token);
  const isAuthenticated = !!session?.role;

  if (isAdminLogin && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  if (isAdminRoute && !isAdminLogin && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
