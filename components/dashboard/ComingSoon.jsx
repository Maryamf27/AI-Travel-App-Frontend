import { Sparkles } from 'lucide-react';
import { ACCENT_TEXT } from '@/lib/uiTokens';

export default function ComingSoon({ title, description }) {
  return (
    <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 py-16 sm:py-20 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center mx-auto mb-5">
        <Sparkles className="w-6 h-6 text-teal-600 dark:text-teal-400" strokeWidth={1.8} />
      </div>
      <p className={`text-[11px] font-bold uppercase tracking-wide mb-2 ${ACCENT_TEXT}`}>Coming soon</p>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[13.5px] sm:text-[14px] text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        {description || "We're building this feature. It'll appear here as soon as it's ready."}
      </p>
    </div>
  );
}
