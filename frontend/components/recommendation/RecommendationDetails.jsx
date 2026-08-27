'use client';

const SECTIONS = [
  {
    key: 'hotels',
    title: 'Hotels',
    icon: (
      <path d="M3 21V7a2 2 0 0 1 2-2h4v16M15 21V9a2 2 0 0 0-2-2H9M15 21h6V11a2 2 0 0 0-2-2h-4M7 9h.01M7 13h.01M7 17h.01" />
    ),
  },
  {
    key: 'restaurants',
    title: 'Restaurants',
    icon: (
      <path d="M3 2v7c0 1.1.9 2 2 2s2-.9 2-2V2M5 11v11M9 2v9a2 2 0 0 1-2 2M17 2c-2.5 0-4 2-4 5s1.5 5 4 5v9" />
    ),
  },
  {
    key: 'touristAttractions',
    title: 'Tourist Attractions',
    icon: (
      <path d="M12 2l1.9 5.5L19 9.5l-5.1 2L12 17l-1.9-5.5L5 9.5l5.1-2L12 2z" />
    ),
  },
  {
    key: 'hiddenGems',
    title: 'Hidden Gems',
    icon: (
      <path d="M6 3h12l4 6-10 12L2 9l4-6zM2 9h20M12 21 8.5 9 12 3l3.5 6L12 21z" />
    ),
  },
  {
    key: 'cafes',
    title: 'Cafes',
    icon: (
      <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
    ),
  },
  {
    key: 'shoppingMalls',
    title: 'Shopping Malls',
    icon: (
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
    ),
  },
  {
    key: 'events',
    title: 'Events',
    icon: (
      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    ),
  },
  {
    key: 'localExperiences',
    title: 'Local Experiences',
    icon: (
      <path d="M12 22c4.4-4.2 8-8.3 8-12.5A8 8 0 1 0 4 9.5C4 13.7 7.6 17.8 12 22zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
    ),
  },
  {
    key: 'travelTips',
    title: 'Travel Tips',
    icon: (
      <path d="M12 2a7 7 0 0 0-4 12.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3A7 7 0 0 0 12 2zM9 21h6" />
    ),
  },
];

function formatDate(value) {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '—';
  }
}

export default function RecommendationDetails({ recommendation }) {
  const { destination, interests, createdAt, aiResult } = recommendation;

  return (
    <div>
      <div className="mb-8">
        <p className="text-[12px] uppercase tracking-wide text-zinc-800 dark:text-zinc-500 mb-1">Recommendation for</p>
        <h1 className="text-2xl sm:text-3xl font-semibold wrap-break-word mb-3">{destination}</h1>

        <div className="flex items-center gap-1.5 text-[12.5px] text-zinc-800 dark:text-zinc-400 mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
            <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          </svg>
          Generated on {formatDate(createdAt)}
        </div>

        <div className="flex flex-wrap gap-2">
          {interests?.map((i) => (
            <span
              key={i}
              className="text-[12px] font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 px-3 py-1 rounded-full"
            >
              {i}
            </span>
          ))}
        </div>
      </div>

      {aiResult ? (
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {SECTIONS.map(({ key, title, icon }) => {
            const items = aiResult[key];
            if (!items || items.length === 0) return null;
            return (
              <div key={key} className="rounded-2xl border border-zinc-300 dark:border-zinc-800 p-4 sm:p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-linear-to-r from-cyan-500 via-purple-500 to-pink-600 dark:from-cyan-600 dark:via-purple-600 dark:to-pink-700 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                      {icon}
                    </svg>
                  </div>
                  <h2 className="text-[14.5px] font-semibold">{title}</h2>
                </div>
                <ul className="space-y-2">
                  {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[13.5px] text-zinc-600 dark:text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                      {typeof item === 'string' ? item : item?.name || JSON.stringify(item)}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-[14px] text-zinc-800 dark:text-zinc-400">No AI results available for this recommendation.</p>
      )}
    </div>
  );
}
