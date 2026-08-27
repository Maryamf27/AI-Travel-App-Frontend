export default function StatCard({ icon: Icon, label, value, hint, loading }) {
  return (
    <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center">
          {Icon && <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" strokeWidth={2.2} />}
        </div>
        {hint && (
          <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500">
            {hint}
          </span>
        )}
      </div>
      {loading ? (
        <div className="h-7 w-16 rounded-md bg-slate-100 dark:bg-slate-800 animate-pulse mb-1.5" />
      ) : (
        <p className="text-2xl font-semibold mb-0.5 truncate" title={typeof value === 'string' ? value : undefined}>{value}</p>
      )}
      <p className="text-[12.5px] text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}
