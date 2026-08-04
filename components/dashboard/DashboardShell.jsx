'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import { ACCENT_TEXT } from '@/lib/uiTokens';

function isLinkActive(href, pathname) {
  return pathname === href || pathname?.startsWith(`${href}/`);
}

function BrandMark() {
  return (
    <div className="w-8 h-8 rounded-[9px] bg-linear-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-rose-800 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
        <path d="M2 12h20M12 2c2.5 2.7 4 6.4 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.4-4-10s1.5-7.3 4-10z" />
      </svg>
    </div>
  );
}

function SidebarLinks({ navItems, pathname, onNavigate }) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {navItems.map((item) => {
        const active = isLinkActive(item.href, pathname);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold transition ${
              active
                ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900'
            }`}
          >
            {Icon && <Icon className="w-4.5 h-4.5 shrink-0" strokeWidth={2.2} />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardShell({ navItems, roleLabel, pageTitle, children }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-zinc-100 dark:border-zinc-900 shrink-0">
          <BrandMark />
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-tight truncate">
              Travel<span className={ACCENT_TEXT}>AI</span>
            </p>
            <p className="text-[10.5px] text-zinc-400 dark:text-zinc-500 leading-tight">{roleLabel}</p>
          </div>
        </div>
        <SidebarLinks navItems={navItems} pathname={pathname} />
        <div className="p-3 border-t border-zinc-100 dark:border-zinc-900">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition"
          >
            <LogOut className="w-4.5 h-4.5" strokeWidth={2.2} />
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[80%] bg-white dark:bg-zinc-950 flex flex-col shadow-2xl">
            <div className="h-16 flex items-center justify-between gap-2.5 px-5 border-b border-zinc-100 dark:border-zinc-900 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <BrandMark />
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-tight truncate">
                    Travel<span className={ACCENT_TEXT}>AI</span>
                  </p>
                  <p className="text-[10.5px] text-zinc-400 dark:text-zinc-500 leading-tight">{roleLabel}</p>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-zinc-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarLinks navItems={navItems} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            <div className="p-3 border-t border-zinc-100 dark:border-zinc-900">
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition"
              >
                <LogOut className="w-4.5 h-4.5" strokeWidth={2.2} />
                Log out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-100 dark:border-zinc-900">
          <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="lg:hidden w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 shrink-0"
              >
                <Menu className="w-4.5 h-4.5" />
              </button>
              {pageTitle && <h1 className="text-[15px] sm:text-[16px] font-semibold truncate">{pageTitle}</h1>}
            </div>

            <div className="flex items-center gap-2 sm:gap-5">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-2.5 pl-4 border-l border-zinc-200 dark:border-zinc-800">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-[13px] font-bold text-orange-700 dark:text-orange-400 shrink-0">
                  {user?.name?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-tight truncate max-w-40">{user?.name}</p>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-tight capitalize">
                    {user?.role?.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
