import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Check if request is coming from admin subdomain (development or production)
  const isAdminSubdomain =
    hostname.startsWith("admin.") ||
    (hostname.includes(".localhost") && hostname.includes("admin"));

  // Admin subdomain detection (e.g., admin.localhost:3000 or admin.nanmaifoods.com)
  const adminSubdomainPattern = /^admin\./;
  const isAdminHost = adminSubdomainPattern.test(hostname);

  // If accessing admin subdomain, rewrite the URL to internal /admin/* routes
  if (isAdminHost) {
    const url = request.nextUrl.clone();

    // Map admin subdomain paths to internal /admin/* routes
    if (pathname.startsWith("/login")) {
      url.pathname = `/admin/login`;
    } else if (pathname === "/" || !pathname.startsWith("/admin")) {
      url.pathname = pathname === "/" ? "/admin" : `/admin${pathname}`;
    }

    return NextResponse.rewrite(url);
  }

  // If accessing /admin/* from main domain in production, redirect to admin subdomain
  // Skip this redirect in development to make testing easier
  if (pathname.startsWith("/admin") && !hostname.includes("localhost")) {
    const url = request.nextUrl.clone();
    const baseDomain = hostname.replace(/^www\./, "");
    const adminUrl = `https://admin.${baseDomain}${pathname}`;
    return NextResponse.redirect(new URL(adminUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
  ],
};
