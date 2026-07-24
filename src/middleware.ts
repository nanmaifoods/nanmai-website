import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Serves the /admin/* routes at the root of the "admin." subdomain instead
// of under a public /admin path on the main site.
//   admin.nanmai.co.in/orders  -> rewritten internally to /admin/orders
//   nanmai.co.in/admin/orders  -> redirected to admin.nanmai.co.in/orders
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = (req.headers.get("host") || "").split(":")[0];
  const isAdminHost = hostname.startsWith("admin.");

  if (isAdminHost) {
    if (!url.pathname.startsWith("/admin")) {
      const rewriteUrl = url.clone();
      rewriteUrl.pathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(rewriteUrl);
    }
    return NextResponse.next();
  }

  // Not on the admin subdomain: don't serve /admin/* here at all.
  if (url.pathname.startsWith("/admin")) {
    const target = url.clone();
    target.hostname = `admin.${hostname}`;
    target.pathname = url.pathname.replace(/^\/admin/, "") || "/";
    return NextResponse.redirect(target, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
