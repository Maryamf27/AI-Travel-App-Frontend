'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BTN_GRADIENT } from '@/lib/uiTokens';

function formatDate(value) {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '—';
  }
}

export default function RecommendationCard({ recommendation, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await onDelete(recommendation._id);
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5 hover:shadow-lg hover:border-orange-200 dark:hover:border-orange-900/50 transition">
      <div className="mb-3">
        <p className="text-[11px] uppercase tracking-wide text-zinc-700 dark:text-zinc-400">Destination</p>
        <h3 className="text-lg font-semibold truncate">{recommendation.destination}</h3>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {recommendation.interests?.slice(0, 3).map((i) => (
          <span
            key={i}
            className="text-[10.5px] font-semibold text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-full"
          >
            {i}
          </span>
        ))}
        {recommendation.interests?.length > 3 && (
          <span className="text-[10.5px] font-semibold text-zinc-700 dark:text-zinc-400 px-2 py-0.5">
            +{recommendation.interests.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 mb-5 text-[12px] text-zinc-700 dark:text-zinc-400">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
          <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        </svg>
        {formatDate(recommendation.createdAt)}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/recommendations/${recommendation._id}`}
          className={`flex-1 text-center text-[13px] font-semibold py-2.5 rounded-[10px] ${BTN_GRADIENT}`}
        >
          View
        </Link>

        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="w-10 h-10 flex items-center justify-center rounded-[10px] border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-red-300 dark:hover:border-red-900/50 hover:text-red-600 dark:hover:text-red-400 transition shrink-0"
            aria-label="Delete recommendation"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-[12px] font-bold px-3 h-10 rounded-[10px] bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-60 shrink-0"
          >
            {deleting ? '…' : 'Confirm'}
          </button>
        )}
      </div>
    </div>
  );
}
