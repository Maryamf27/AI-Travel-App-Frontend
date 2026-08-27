'use client';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-5 right-5 left-5 sm:left-auto z-100 sm:max-w-sm animate-[toast-in_0.25s_ease-out]">
      <div
        className={`flex items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-2xl backdrop-blur ${
          isError
            ? 'bg-red-50/95 dark:bg-red-950/90 border-red-200 dark:border-red-900/50'
            : 'bg-white/95 dark:bg-slate-900/95 border-slate-100 dark:border-slate-800'
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isError
              ? 'bg-red-100 dark:bg-red-900/40'
              : 'bg-teal-500 dark:bg-teal-400'
          }`}
        >
          {isError ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M5 12l4 4 10-10" />
            </svg>
          )}
        </div>
        <p className={`text-[13.5px] font-medium leading-snug pt-1 ${isError ? 'text-red-700 dark:text-red-300' : 'text-slate-700 dark:text-slate-200'}`}>
          {toast.message}
        </p>
        <button
          onClick={onClose}
          className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition shrink-0 mt-0.5"
          aria-label="Dismiss"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
