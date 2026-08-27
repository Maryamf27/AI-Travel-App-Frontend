import PricingFeatures from './PricingFeatures';
import { BTN_GRADIENT, BTN_GLOW, ACCENT_TEXT } from '@/lib/uiTokens';

export default function PricingCard({
  variant = 'free',
  badge,
  title,
  price,
  billing,
  description,
  features,
  buttonLabel,
  onButtonClick,
}) {
  const isPremium = variant === 'premium';

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 sm:p-8 h-full ${
        isPremium
          ? 'bg-white dark:bg-zinc-900/40 border-2 border-purple-300 dark:border-purple-900/60 shadow-xl'
          : 'bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-sm'
      }`}
    >
      {badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10.5px] font-bold tracking-wide px-3 py-1 rounded-full ${BTN_GRADIENT} ${BTN_GLOW}`}
        >
          {badge}
        </span>
      )}

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-[13px] text-zinc-600 dark:text-zinc-400 mt-1.5 min-h-9">{description}</p>

      <div className="flex items-end gap-1.5 mt-5 mb-1">
        <span className="text-3xl sm:text-4xl font-bold tracking-tight">{price}</span>
        <span className="text-[13px] text-zinc-500 dark:text-zinc-400 pb-1.5">{billing}</span>
      </div>

      <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-6" />

      <div className="flex-1">
        <PricingFeatures features={features} accent={isPremium} />
      </div>

      <button
        onClick={onButtonClick}
        className={`mt-8 w-full text-center text-[14px] font-bold py-3 rounded-xl transition ${
          isPremium
            ? `${BTN_GRADIENT} ${BTN_GLOW}`
            : 'border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:border-purple-300 dark:hover:border-purple-900/50 hover:text-purple-700 dark:hover:text-purple-400'
        }`}
      >
        {buttonLabel}
      </button>

      {isPremium && (
        <p className={`text-[11.5px] text-center mt-3 ${ACCENT_TEXT}`}>Cancel anytime</p>
      )}
    </div>
  );
}
