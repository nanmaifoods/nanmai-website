'use client';
import { Bell, Search, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

const PAGE_TITLES: Record<string, string> = {
  '/admin':            'Dashboard',
  '/admin/orders':     'Orders',
  '/admin/products':   'Products',
  '/admin/analytics':  'Analytics',
  '/admin/blogs':      'Blog Manager',
  '/admin/cms':        'Site Content',
  '/admin/media':      'Media Library',
  '/admin/customers':  'Customers',
  '/admin/settings':   'Settings',
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || 'Admin';

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
      <h1 className="font-bold text-xl text-brand-dark">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-brand-pink text-white flex items-center justify-center text-sm font-bold">
            A
          </div>
          <div className="hidden md:block leading-tight">
            <div className="text-sm font-semibold text-brand-dark">Admin</div>
            <div className="text-xs text-gray-400">nanmaiappalam.com</div>
          </div>
        </div>
      </div>
    </header>
  );
}
