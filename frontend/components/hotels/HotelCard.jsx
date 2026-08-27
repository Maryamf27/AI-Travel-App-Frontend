'use client';

import { useState } from 'react';

function getName(hotel) {
  return hotel.name || hotel.hotel_name || hotel.title || 'Unnamed hotel';
}
function getAddress(hotel) {
  return hotel.address || hotel.formatted_address || hotel.location?.address || null;
}
function getRating(hotel) {
  return hotel.rating ?? hotel.stars ?? null;
}
function getCategories(hotel) {
  return hotel.categories || hotel.types || hotel.tags || [];
}
function getDistance(hotel) {
  const value = hotel.distance ?? hotel.distance_km ?? hotel.distance_from_center;
  if (value === undefined || value === null || value === '') return null;
  return typeof value === 'number' ? `${value} km away` : value;
}
function getImage(hotel) {
  return hotel.image || hotel.photo || hotel.thumbnail || hotel.images?.[0] || null;
}
function isOpenNow(hotel) {
  if (hotel.open_now !== undefined) return hotel.open_now;
  if (hotel.isOpenNow !== undefined) return hotel.isOpenNow;
  return null;
}
function getDetailsUrl(hotel) {
  return hotel.url || hotel.website || hotel.link || null;
}

export default function HotelCard({ hotel }) {
  const [expanded, setExpanded] = useState(false);

  const name = getName(hotel);
  const address = getAddress(hotel);
  const rating = getRating(hotel);
  const categories = getCategories(hotel);
  const distance = getDistance(hotel);
  const image = getImage(hotel);
  const openNow = isOpenNow(hotel);
  const detailsUrl = getDetailsUrl(hotel);

  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 overflow-hidden hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-900/50 transition flex flex-col">
      <div className="relative h-40 bg-zinc-100 dark:bg-zinc-900 shrink-0">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-300 dark:text-zinc-700">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
              <path d="M3 21V7a2 2 0 0 1 2-2h4v16M15 21V9a2 2 0 0 0-2-2H9M15 21h6V11a2 2 0 0 0-2-2h-4M7 9h.01M7 13h.01M7 17h.01" />
            </svg>
          </div>
        )}

        {openNow !== null && (
          <span
            className={`absolute top-2.5 right-2.5 text-[10.5px] font-semibold px-2.5 py-1 rounded-full backdrop-blur ${
              openNow
                ? 'bg-emerald-50/90 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400'
                : 'bg-zinc-100/90 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400'
            }`}
          >
            {openNow ? 'Open now' : 'Closed'}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-[15px] font-semibold leading-snug wrap-break-word">{name}</h3>
          {rating !== null && (
            <span className="shrink-0 inline-flex items-center gap-1 text-[12px] font-bold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 px-2 py-0.5 rounded-full">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.6 6.7L12 16.9 5.8 20.3l1.6-6.7-5.2-4.6 6.9-.7L12 2z" />
              </svg>
              {rating}
            </span>
          )}
        </div>

        {address && (
          <p className="text-[12.5px] text-zinc-500 dark:text-zinc-400 mb-2 wrap-break-word">{address}</p>
        )}

        {distance && (
          <div className="flex items-center gap-1.5 text-[12px] text-zinc-400 dark:text-zinc-500 mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
              <path d="M12 22c4.4-4.2 8-8.3 8-12.5A8 8 0 1 0 4 9.5C4 13.7 7.6 17.8 12 22z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {distance}
          </div>
        )}

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {categories.slice(0, 3).map((cat, idx) => (
              <span
                key={idx}
                className="text-[10.5px] font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full"
              >
                {typeof cat === 'string' ? cat : cat?.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-1">
          {detailsUrl ? (
            <a
              href={detailsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-[13px] font-semibold py-2.5 rounded-[10px] border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:border-purple-300 dark:hover:border-purple-900/50 hover:text-purple-600 dark:hover:text-purple-400 transition"
            >
              View Details
            </a>
          ) : (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="w-full text-center text-[13px] font-semibold py-2.5 rounded-[10px] border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:border-purple-300 dark:hover:border-purple-900/50 hover:text-purple-600 dark:hover:text-purple-400 transition"
            >
              {expanded ? 'Hide Details' : 'View Details'}
            </button>
          )}
        </div>

        {expanded && !detailsUrl && (
          <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[12.5px] text-zinc-500 dark:text-zinc-400 space-y-1">
            {address && <p>Address: {address}</p>}
            {rating !== null && <p>Rating: {rating}</p>}
            {categories.length > 0 && (
              <p>Categories: {categories.map((c) => (typeof c === 'string' ? c : c?.name)).join(', ')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
