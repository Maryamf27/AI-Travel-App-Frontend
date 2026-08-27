'use client';

import Link from 'next/link';
import DashboardNav from '@/components/DashboardNav';
import { BTN_GRADIENT, BTN_GLOW } from '@/lib/uiTokens';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <DashboardNav />

      <main className="max-w-lg mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 px-6 sm:px-10 py-12 sm:py-14">
          <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold mb-2">Payment canceled</h1>
          <p className="text-[13.5px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 mb-8">
            No worries — your card was not charged. You can upgrade to Premium anytime.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pricing"
              className={`inline-flex items-center justify-center gap-2 ${BTN_GRADIENT} text-[14px] font-bold px-6 py-3 rounded-xl w-full sm:w-auto ${BTN_GLOW}`}
            >
              Back to Pricing
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 text-[14px] font-semibold px-6 py-3 rounded-xl w-full sm:w-auto border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
