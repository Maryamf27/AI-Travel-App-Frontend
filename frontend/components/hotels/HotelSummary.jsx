'use client';

export default function HotelSummary({ aiResult }) {
  if (!aiResult) return null;

  const summaryText = typeof aiResult === 'string' ? aiResult : aiResult.summary;
  const highlights = Array.isArray(aiResult?.highlights) ? aiResult.highlights : [];
  const tips = Array.isArray(aiResult?.tips) ? aiResult.tips : [];

  return (
    <div className="rounded-2xl border border-purple-200 dark:border-purple-900/40 bg-purple-50 dark:bg-purple-950/30 p-5 sm:p-6 mb-6 sm:mb-8">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 rounded-xl bg-linear-to-r from-cyan-500 via-purple-500 to-pink-600 dark:from-cyan-600 dark:via-purple-600 dark:to-pink-700 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
            <path d="M12 2l1.9 5.5L19 9.5l-5.1 2L12 17l-1.9-5.5L5 9.5l5.1-2L12 2z" />
            <path d="M19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z" />
          </svg>
        </div>
        <h2 className="text-[14.5px] sm:text-[15px] font-semibold">AI Recommendation</h2>
      </div>

      {summaryText && (
        <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-zinc-700 dark:text-zinc-200 wrap-break-word">
          {summaryText}
        </p>
      )}

      {highlights.length > 0 && (
        <ul className="mt-4 space-y-2">
          {highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[13.5px] text-zinc-700 dark:text-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
              {typeof item === 'string' ? item : item?.name || JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}

      {tips.length > 0 && (
        <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-900/40">
          <p className="text-[11px] uppercase tracking-wide text-purple-700 dark:text-purple-400 font-semibold mb-2">Tips</p>
          <ul className="space-y-1.5">
            {tips.map((tip, idx) => (
              <li key={idx} className="text-[13px] text-zinc-600 dark:text-zinc-300">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!summaryText && highlights.length === 0 && tips.length === 0 && (
        <p className="text-[13.5px] text-zinc-500 dark:text-zinc-400">No AI summary available for this search.</p>
      )}
    </div>
  );
}
