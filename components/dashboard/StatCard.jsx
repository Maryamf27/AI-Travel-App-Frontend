export default function StatCard({ icon: Icon, label, value, hint, loading }) {
  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center">
          {Icon && <Icon className="w-5 h-5 text-orange-600 dark:text-orange-400" strokeWidth={2.2} />}
        </div>
        {hint && (
          <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500">
            {hint}
          </span>
        )}
      </div>
      {loading ? (
        <div className="h-7 w-16 rounded-md bg-zinc-100 dark:bg-zinc-800 animate-pulse mb-1.5" />
      ) : (
        <p className="text-2xl font-semibold mb-0.5">{value}</p>
      )}
      <p className="text-[12.5px] text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
  );
}
