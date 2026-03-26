// Admin URL utility functions for subdomain routing

const ADMIN_SUBDOMAIN = process.env.NEXT_PUBLIC_ADMIN_SUBDOMAIN || "";

/**
 * Get the admin subdomain URL prefix
 * Returns the protocol and subdomain for admin routes
 */
export function getAdminSubdomain(): string {
  if (ADMIN_SUBDOMAIN) {
    return ADMIN_SUBDOMAIN;
  }

  // For development, return empty string to use relative paths
  // The middleware will handle the subdomain routing
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;

    // Check if already on admin subdomain
    if (hostname.startsWith("admin.")) {
      return "";
    }

    // Handle Vercel preview domains (admin.nanmai-website.vercel.app)
    if (hostname.includes(".vercel.app") && !hostname.startsWith("admin.")) {
      const parts = hostname.split(".");
      if (parts.length >= 3) {
        // Reconstruct with admin prefix: admin.nanmai-website.vercel.app
        return `https://admin.${parts.slice(1).join(".")}`;
      }
    }
  }

  return "";
}

/**
 * Generate an admin URL with the correct subdomain
 */
export function getAdminUrl(path: string = ""): string {
  const adminSubdomain = getAdminSubdomain();

  if (!adminSubdomain) {
    // Use relative path - middleware handles subdomain routing
    return `/admin${path}`;
  }

  return `${adminSubdomain}/admin${path}`;
}

/**
 * Check if the current page is on the admin subdomain
 */
export function isOnAdminSubdomain(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname.startsWith("admin.");
}

/**
 * Get the base URL for admin routes
 */
export function getAdminBaseUrl(): string {
  const subdomain = getAdminSubdomain();
  return subdomain || "";
}
