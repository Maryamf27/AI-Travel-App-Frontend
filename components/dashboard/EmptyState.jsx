export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="text-center py-14 sm:py-16 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
      <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center mx-auto mb-4">
        {Icon ? (
          <Icon className="w-6 h-6 text-teal-600 dark:text-teal-400" strokeWidth={1.8} />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 2l1.9 5.5L19 9.5l-5.1 2L12 17l-1.9-5.5L5 9.5l5.1-2L12 2z" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-1.5">{title}</h3>
      {description && (
        <p className="text-[13.5px] sm:text-[14px] text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
