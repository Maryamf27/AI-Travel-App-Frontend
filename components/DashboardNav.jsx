'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import { ACCENT_TEXT } from '@/lib/uiTokens';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Trips' },
  { href: '/recommendations', label: 'Recommendations' },
  { href: '/hotel-search', label: 'Hotels' },
  { href: '/hotel-history', label: 'Hotel History' },
];

function isLinkActive(link, pathname) {
  if (pathname === link.href || pathname?.startsWith(`${link.href}/`)) return true;
  return link.altPrefixes?.some((prefix) => pathname?.startsWith(prefix)) || false;
}

export default function DashboardNav() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-100 dark:border-zinc-900 w-full max-w-full overflow-x-hidden">
      <div className="max-w-8xl mx-auto px-3 sm:px-6 min-h-16 flex items-center justify-between gap-2 sm:gap-3 py-2">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-[9px] bg-linear-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-rose-800 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <path d="M2 12h20M12 2c2.5 2.7 4 6.4 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.4-4-10s1.5-7.3 4-10z" />
            </svg>
          </div>
          <span className="text-[15px] sm:text-[17px] font-semibold whitespace-nowrap">
            Travel<span className={ACCENT_TEXT}>AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 overflow-x-auto flex-nowrap min-w-0">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[12.5px] lg:text-[13.5px] font-semibold px-2.5 lg:px-3.5 py-2 rounded-full transition whitespace-nowrap shrink-0 ${active
                  ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 shrink-0">
          <ThemeToggle />
          <div className="hidden lg:flex items-center gap-2.5 pl-4 border-l border-zinc-200 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-[13px] font-bold text-orange-700 dark:text-orange-400 shrink-0">
              {user?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-tight truncate max-w-35">{user?.name}</p>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-tight capitalize truncate">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="text-[12px] sm:text-[13px] border px-3 sm:px-4 py-2 rounded-full border-zinc-200 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition whitespace-nowrap shrink-0"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden w-full">
        <nav className="flex flex-wrap items-center gap-1.5 px-3 sm:px-6 pb-3 -mt-1 ">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full transition whitespace-nowrap  ${active
                  ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400'
                  : 'text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

    </header>
  );
}