import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./lib/auth";
import { AUTH } from "./lib/constants";

const publicRoutes = [
  "/dashboard/login",
  "/dashboard/setup",
  "/api/v1/auth/login",
  "/api/v1/auth/change-password",
];

const apiPublicRoutes = [
  "/api/v1/tenants/",
  "/api/v1/health",
  "/api/v1/sitemap",
  "/api/v1/seed-admin",
  "/api/v1/seed-superadmin",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") return NextResponse.next();

  if (/\.(png|jpg|jpeg|svg|ico|webp|avif|css|js|woff2?)$/i.test(pathname)) {
    return NextResponse.next();
  }

  const isApiRoute = pathname.startsWith("/api/");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isApiRoute) {
    const isPublicApi = apiPublicRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (isPublicApi) return NextResponse.next();
    if (pathname.startsWith("/api/v1/auth/login")) return NextResponse.next();
  }

  if (isDashboardRoute) {
    const isPublicDashboard = publicRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (isPublicDashboard) return NextResponse.next();
  }

  const token =
    request.cookies.get(AUTH.COOKIE_NAME)?.value ??
    request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    if (isApiRoute) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", data: null, meta: {} },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  const user = await verifyJwt(token);
  if (!user || !user.businessId) {
    if (isApiRoute) {
      return NextResponse.json(
        { success: false, error: "Invalid token", data: null, meta: {} },
        { status: 401 }
      );
    }
    const response = NextResponse.redirect(
      new URL("/dashboard/login", request.url)
    );
    response.cookies.delete(AUTH.COOKIE_NAME);
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-business-id", user.businessId);
  requestHeaders.set("x-business-phone", user.phone);
  requestHeaders.set("x-business-slug", user.slug);
  requestHeaders.set("x-business-role", user.role || "business_owner");

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt).*)",
  ],
};
