import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Check if request is coming from admin subdomain
  // Handles: admin.localhost, admin.domain.com, admin.nanmai-website.vercel.app
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

  // If accessing /admin/* from main Vercel domain, redirect to admin subdomain
  // This applies to preview/custom domains, not localhost
  if (pathname.startsWith("/admin") && !hostname.includes("localhost")) {
    const url = request.nextUrl.clone();

    // Get the base domain (everything after the first subdomain for vercel.app)
    // e.g., nanmai-website from nanmai-website.vercel.app
    let baseDomain: string;

    if (hostname.includes(".vercel.app")) {
      // For Vercel preview domains: admin.nanmai-website.vercel.app
      baseDomain = hostname.replace(/^[^.]+\./, ""); // Removes first subdomain
    } else {
      // For custom domains: admin.yourdomain.com
      baseDomain = hostname.replace(/^www\./, "");
    }

    // Build the admin subdomain URL
    let adminUrl: string;
    if (hostname.includes(".vercel.app")) {
      // For Vercel: admin.nanmai-website.vercel.app
      const parts = hostname.split(".");
      if (parts.length >= 3) {
        adminUrl = `https://${parts[0]}.${parts.slice(1).join(".")}${pathname}`;
      } else {
        adminUrl = `https://admin.${hostname}${pathname}`;
      }
    } else {
      adminUrl = `https://admin.${baseDomain}${pathname}`;
    }

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
