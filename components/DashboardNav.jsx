'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import VoiceAssistant from '@/components/voice/VoiceAssistant';
import { ACCENT_TEXT } from '@/lib/uiTokens';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Trips' },
  { href: '/recommendations', label: 'Recommendations' },
  { href: '/hotel-search', label: 'Hotels' },
  { href: '/hotel-history', label: 'Hotel History' },
  { href: '/pricing', label: 'Pricing' },
];

function isLinkActive(link, pathname) {
  if (pathname === link.href || pathname?.startsWith(`${link.href}/`)) return true;
  return link.altPrefixes?.some((prefix) => pathname?.startsWith(prefix)) || false;
}

export default function DashboardNav() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isPremium = user?.plan === 'premium' && user?.subscriptionStatus === 'active';

  return (
    <>
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-slate-100 dark:border-slate-900 w-full max-w-full overflow-x-hidden">
      <div className="max-w-8xl mx-auto px-3 sm:px-6 min-h-16 flex items-center justify-between gap-2 sm:gap-3 py-2">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-[9px] bg-teal-500 dark:bg-teal-400 flex items-center justify-center shrink-0">
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
                className={`text-[12.5px] lg:text-[13.5px] font-semibold px-2.5 lg:px-3.5 py-2 rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 ${active
                  ? 'bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 shrink-0">
          <ThemeToggle />
          <div className="hidden lg:flex items-center gap-2.5 pl-4 border-l border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-950/40 flex items-center justify-center text-[13px] font-bold text-teal-700 dark:text-teal-400 shrink-0">
              {user?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-tight truncate max-w-35">{user?.name}</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight capitalize truncate">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>
          {user?.role === 'traveler' && (
            <Link
              href="/pricing"
              className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-full whitespace-nowrap shrink-0 transition-all duration-150 ${
                isPremium
                  ? 'bg-teal-500 text-white shadow-[0_2px_10px_rgba(6,182,212,0.28)] hover:shadow-[0_4px_14px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-900/50 hover:text-teal-600 dark:hover:text-teal-400'
              }`}
            >
              <svg viewBox="0 0 24 24" fill={isPremium ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M2 20h20M4 20V9l5 3 3-6 3 6 5-3v11" />
              </svg>
              {isPremium ? 'Premium' : 'Free plan'}
            </Link>
          )}
          <button
            onClick={logout}
            className="text-[12px] sm:text-[13px] border px-3 sm:px-4 py-2 rounded-full border-slate-200 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900/40 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden w-full">
        {user?.role === 'traveler' && (
          <div className="px-3 sm:px-6 pb-2 -mt-1">
            <Link
              href="/pricing"
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                isPremium
                  ? 'bg-teal-500 text-white shadow-[0_2px_10px_rgba(6,182,212,0.28)]'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <svg viewBox="0 0 24 24" fill={isPremium ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M2 20h20M4 20V9l5 3 3-6 3 6 5-3v11" />
              </svg>
              {isPremium ? 'Premium' : 'Free plan'}
            </Link>
          </div>
        )}
        <nav className="flex flex-wrap items-center gap-1.5 px-3 sm:px-6 pb-3 -mt-1 ">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full transition whitespace-nowrap  ${active
                  ? 'bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400'
                  : 'text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

    </header>
    {user?.role === 'traveler' && <VoiceAssistant />}
    </>
  );
}