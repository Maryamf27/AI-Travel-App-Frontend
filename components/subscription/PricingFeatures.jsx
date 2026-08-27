const CheckIcon = ({ accent }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-3.5 h-3.5 shrink-0 ${accent ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-slate-400'}`}
  >
    <path d="M5 12l4 4 10-10" />
  </svg>
);

export default function PricingFeatures({ features, accent = false }) {
  return (
    <ul className="space-y-3">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2.5">
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              accent
                ? 'bg-teal-50 dark:bg-teal-950/30'
                : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            <CheckIcon accent={accent} />
          </span>
          <span className="text-[13.5px] text-slate-700 dark:text-slate-300 leading-snug">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
