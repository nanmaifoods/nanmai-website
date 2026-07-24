"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/login") {
      setChecking(false);
      return;
    }

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";

    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setChecking(false);
    }
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner size={152} className="mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render admin layout for login page
  if (pathname === "/login") {
    return <>{children}</>;
  }

  return <>{children}</>;
}
