// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-in-prod"
);

const protectedPaths = ["/admin"];
const publicPaths = ["/auth/sign-in"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isPublicPath = publicPaths.includes(pathname);

  if (!token) {
    if (isProtectedPath) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    return NextResponse.next();
  }

  try {
    await jwtVerify(token, JWT_SECRET);

    if (isPublicPath) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  } catch {
    const response = isProtectedPath
      ? NextResponse.redirect(new URL("/auth/sign-in", request.url))
      : NextResponse.next();

    response.cookies.delete("auth-token");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/auth/sign-in"],
};
