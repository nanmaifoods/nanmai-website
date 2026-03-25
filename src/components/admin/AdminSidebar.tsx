"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  BarChart3,
  Globe,
  LogOut,
  Leaf,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

const NAV = [
  {
    section: "Main",
    items: [
      { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/admin/orders", icon: ShoppingBag, label: "Orders" },
      { href: "/admin/products", icon: Package, label: "Products" },
      { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
    ],
  },
  {
    section: "System",
    items: [
      { href: "/admin/customers", icon: Users, label: "Customers" },
      { href: "/admin/settings", icon: Settings, label: "Settings" },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "bg-brand-dark text-white flex flex-col transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-xl bg-brand-pink/20 flex items-center justify-center shrink-0">
          <Leaf size={16} className="text-brand-pink" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-display font-bold text-base text-brand-pink leading-tight">
              NANMAI
            </div>
            <div className="text-[10px] text-brand-lime tracking-widest">
              ADMIN PANEL
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronRight
            size={14}
            className={clsx(
              "transition-transform",
              collapsed ? "" : "rotate-180",
            )}
          />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {NAV.map(({ section, items }) => (
          <div key={section}>
            {!collapsed && (
              <p className="text-[10px] text-white/40 uppercase tracking-widest px-3 mb-2 font-semibold">
                {section}
              </p>
            )}
            <ul className="space-y-1">
              {items.map(({ href, icon: Icon, label }) => {
                const active =
                  pathname === href ||
                  (href !== "/admin" && pathname.startsWith(href));
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      title={collapsed ? label : undefined}
                      className={clsx(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                        active
                          ? "bg-brand-pink text-white shadow-brand"
                          : "text-white/60 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      <Icon size={18} className="shrink-0" />
                      {!collapsed && <span>{label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <Globe size={18} className="shrink-0" />
          {!collapsed && <span>View Website</span>}
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-all mt-1">
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
