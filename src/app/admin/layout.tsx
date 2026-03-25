import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminModeProvider } from "@/store/adminModeContext";
import { AdminGuard } from "@/components/admin/AdminGuard";
import AdminLayoutWrapper from "./AdminLayoutWrapper";

export const metadata: Metadata = {
  title: { default: "Admin Panel", template: "%s | Nanmai Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminModeProvider>
      <AdminGuard>
        <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
      </AdminGuard>
    </AdminModeProvider>
  );
}
