'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BTN_GRADIENT, CARD_HOVER, STATUS_STYLES, ACCENT_BG_SOFT } from '@/lib/uiTokens';

const DESTINATION_ICON_RULES = [
  { match: /beach|island|coast|bali|maldives|hawaii|goa|cancun/i, icon: '🏖️' },
  { match: /mountain|alps|himalay|hik|trek|aspen|colorado/i, icon: '⛰️' },
  { match: /japan|tokyo|kyoto|osaka/i, icon: '🎌' },
  { match: /paris|france/i, icon: '🗼' },
  { match: /italy|rome|venice|milan/i, icon: '🍝' },
  { match: /new york|nyc|chicago|usa|united states/i, icon: '🏙️' },
  { match: /dubai|uae/i, icon: '🕌' },
  { match: /desert|sahara|morocco/i, icon: '🏜️' },
  { match: /forest|amazon|jungle/i, icon: '🌴' },
  { match: /ski|snow|iceland|norway|finland/i, icon: '❄️' },
];

function getDestinationIcon(destination = '') {
  const found = DESTINATION_ICON_RULES.find((rule) => rule.match.test(destination));
  return found?.icon || '📍';
}

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
    <div
      className={`rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5 sm:p-6 hover:border-purple-200 dark:hover:border-purple-900/50 ${CARD_HOVER}`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0 flex items-start gap-3">
          <div className={`w-9 h-9 rounded-xl ${ACCENT_BG_SOFT} flex items-center justify-center text-base shrink-0`}>
            <span aria-hidden="true">{getDestinationIcon(trip.destination)}</span>
          </div>
          <div className="min-w-0">
            <p className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Destination
            </p>
            <h3 className="text-[17px] font-bold leading-snug truncate">{trip.destination}</h3>
          </div>
        </div>
        <span
          className={`text-[10.5px] font-bold px-2.5 py-1 rounded-full capitalize shrink-0 ${
            STATUS_STYLES[trip.status] || STATUS_STYLES.pending
          }`}
        >
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
          <span
            key={i}
            className="text-[10.5px] font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 px-2 py-0.5 rounded-full"
          >
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
          className={`flex-1 text-center text-[13px] font-semibold py-2.5 rounded-[10px] ${BTN_GRADIENT} shadow-[0_2px_8px_rgba(168,85,247,0.18)] hover:shadow-[0_6px_16px_rgba(168,85,247,0.3)] active:scale-[0.98] transition-all duration-200`}
        >
          View itinerary
        </Link>

        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="w-10 h-10 flex items-center justify-center rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 hover:border-red-300 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 shrink-0"
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
    <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 rounded-lg py-2.5">
      <p className="text-[13.5px] font-bold truncate px-1 text-zinc-900 dark:text-zinc-100">{value}</p>
      <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-500 mt-0.5">{label}</p>
    </div>
  );
}
