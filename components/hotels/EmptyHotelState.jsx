'use client';

import Link from 'next/link';
import { BTN_GRADIENT, BTN_GLOW } from '@/lib/uiTokens';

export default function EmptyHotelState({
  title = 'No hotels found',
  description = 'Try changing your destination or dates and search again.',
  ctaHref,
  ctaLabel,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 py-16 px-4 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/30">
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#EA580C"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21V7a2 2 0 0 1 2-2h4v16M15 21V9a2 2 0 0 0-2-2H9M15 21h6V11a2 2 0 0 0-2-2h-4M7 9h.01M7 13h.01M7 17h.01" />
        </svg>
      </div>

      <h3 className="mb-2 text-lg font-semibold">{title}</h3>

      <p className="mx-auto mb-6 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        {description}
      </p>

      {ctaHref && (
        <Link
          href={ctaHref}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold ${BTN_GRADIENT} ${BTN_GLOW}`}
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}