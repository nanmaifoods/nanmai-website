"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getAdminUrl } from "@/lib/admin";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login" || pathname === getAdminUrl("/login")) {
      setChecking(false);
      return;
    }

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";

    if (!isAuthenticated) {
      router.push(getAdminUrl("/login"));
    } else {
      setChecking(false);
    }
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2
            size={40}
            className="animate-spin text-brand-pink mx-auto mb-4"
          />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render admin layout for login page
  if (pathname === "/admin/login" || pathname === getAdminUrl("/login")) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
