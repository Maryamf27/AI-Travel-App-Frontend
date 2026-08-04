'use client';

export default function LoadingSkeleton({ count = 6, variant = 'card' }) {
  const height = variant === 'history' ? 'h-40' : 'h-64';

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`${height} rounded-2xl bg-zinc-50 dark:bg-zinc-900 animate-pulse`}
        />
      ))}
    </div>
  );
}
