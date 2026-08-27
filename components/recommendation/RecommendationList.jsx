'use client';

import Link from 'next/link';
import RecommendationCard from './RecommendationCard';
import { BTN_GRADIENT, BTN_GLOW } from '@/lib/uiTokens';

export default function RecommendationList({ recommendations, loading, onDelete }) {
  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-44 rounded-2xl bg-slate-50 dark:bg-slate-900 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {recommendations.map((rec) => (
        <RecommendationCard key={rec._id} recommendation={rec} onDelete={onDelete} />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 sm:py-20 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
      <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center mx-auto mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 2l1.9 5.5L19 9.5l-5.1 2L12 17l-1.9-5.5L5 9.5l5.1-2L12 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-1.5">No recommendations yet</h3>
      <p className="text-[13.5px] sm:text-[14px] text-slate-500 dark:text-slate-400 mb-6">
        Generate your first AI-powered travel recommendation in seconds.
      </p>
      <Link
        href="/recommendations/create"
        className={`inline-flex items-center gap-2 ${BTN_GRADIENT} text-[14px] font-bold px-5 py-3 rounded-xl ${BTN_GLOW}`}
      >
        Generate Recommendation
      </Link>
    </div>
  );
}
