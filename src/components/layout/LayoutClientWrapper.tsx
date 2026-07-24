"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Local dev without the admin subdomain (e.g. localhost:3000/admin) still
  // works via the path prefix; in production the admin subdomain rewrite
  // strips it, so we also detect the host on the client after mount.
  const [isAdminHost, setIsAdminHost] = useState(false);

  useEffect(() => {
    setIsAdminHost(window.location.hostname.startsWith("admin."));
  }, []);

  const isAdmin = pathname?.startsWith("/admin") || isAdminHost;

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTop />}
    </>
  );
}
