"use client";
import { Bell, Search, LogOut, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAdminMode } from "@/store/adminModeContext";
import { useSidebar } from "@/store/sidebarContext";
import { getAdminUrl } from "@/lib/admin";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/orders": "Orders",
  "/admin/products": "Products",
  "/admin/analytics": "Analytics",
  "/admin/customers": "Customers",
  "/admin/settings": "Settings",
};

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const title = PAGE_TITLES[pathname] || "Admin";
  const { mode, setMode, isTest } = useAdminMode();
  const { toggle } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminEmail");
    router.push(getAdminUrl("/login"));
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu Toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          title="Toggle Sidebar"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
        <h1 className="font-bold text-xl text-brand-dark">{title}</h1>

        {/* Test/Live Toggle */}
        <div className="flex items-center gap-2 ml-4">
          <div className="relative flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setMode("test")}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                isTest
                  ? "bg-yellow-400 text-yellow-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🧪 TEST
            </button>
            <button
              onClick={() => setMode("live")}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                !isTest
                  ? "bg-green-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🚀 LIVE
            </button>
          </div>
          <span
            className={`text-xs font-medium ${isTest ? "text-yellow-600" : "text-green-600"}`}
          >
            {isTest ? "Sample data" : "Real data"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search…"
            className="pl-9 pr-4 py-2 text-sm bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink/30 w-48"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <Bell size={18} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-pink rounded-full" />
        </button>

        {/* Profile & Logout */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-brand-pink text-white flex items-center justify-center text-sm font-bold">
            A
          </div>
          <div className="hidden md:block leading-tight">
            <div className="text-sm font-semibold text-brand-dark">Admin</div>
            <div className="text-xs text-gray-400">nanmaifoods.com</div>
          </div>
          <button
            onClick={handleLogout}
            className="ml-2 p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
