'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BTN_GRADIENT } from '@/lib/uiTokens';

const statusStyles = {
  completed: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400',
  pending: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400',
  failed: 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400',
};

export default function TripCard({ trip, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await onDelete(trip._id);
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5 hover:shadow-lg hover:border-orange-200 dark:hover:border-orange-900/50 transition">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wide text-zinc-600 dark:text-zinc-500">Destination</p>
          <h3 className="text-lg font-semibold truncate">{trip.destination}</h3>
        </div>
        <span className={`text-[10.5px] font-bold px-2.5 py-1 rounded-full capitalize shrink-0 ${statusStyles[trip.status] || statusStyles.pending}`}>
          {trip.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <MiniStat label="Budget" value={`$${trip.budget}`} />
        <MiniStat label="Travelers" value={trip.travelers} />
        <MiniStat label="Days" value={trip.duration} />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {trip.interests?.slice(0, 3).map((i) => (
          <span key={i} className="text-[10.5px] font-semibold text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-full">
            {i}
          </span>
        ))}
        {trip.interests?.length > 3 && (
          <span className="text-[10.5px] font-semibold text-zinc-400 px-2 py-0.5">+{trip.interests.length - 3} more</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/dashboard/trips/${trip._id}`}
          className={`flex-1 text-center text-[13px] font-semibold py-2.5 rounded-[10px] ${BTN_GRADIENT}`}
        >
          View itinerary
        </Link>

        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="w-10 h-10 flex items-center justify-center rounded-[10px] border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-red-300 dark:hover:border-red-900/50 hover:text-red-600 dark:hover:text-red-400 transition shrink-0"
            aria-label="Delete trip"
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

function MiniStat({ label, value }) {
  return (
    <div className="bg-zinc-200 dark:bg-zinc-900 rounded-lg py-2">
      <p className="text-[13px] font-bold truncate px-1">{value}</p>
      <p className="text-[10px] text-zinc-800 dark:text-zinc-500">{label}</p>
    </div>
  );
}
