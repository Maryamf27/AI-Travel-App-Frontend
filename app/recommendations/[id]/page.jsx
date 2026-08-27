'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardNav from '@/components/DashboardNav';
import RecommendationDetails from '../../../components/recommendation/RecommendationDetails';
import Toast from '@/components/Toast';
import { useToast } from '@/lib/useToast';
import { recommendationApi } from '@/lib/api';

export default function RecommendationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const { toast, showToast, clearToast } = useToast();

  useEffect(() => {
    recommendationApi
      .getRecommendationById(id)
      .then((data) => setRecommendation(data?.recommendation || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    setDeleting(true);
    try {
      await recommendationApi.deleteRecommendation(id);
      showToast('Recommendation deleted.', 'success');
      setTimeout(() => router.push('/recommendations'), 500);
    } catch (err) {
      showToast(err.message || 'Failed to delete recommendation.', 'error');
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <ProtectedRoute allowedRoles={['traveler']}>
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <DashboardNav />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={() => router.push('/recommendations')}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to recommendations
            </button>

            {recommendation && !loading && (
              !confirming ? (
                <button
                  onClick={() => setConfirming(true)}
                  className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 px-4 py-2.5 rounded-[10px] transition shrink-0"
                >
                  Delete recommendation
                </button>
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setConfirming(false)}
                    disabled={deleting}
                    className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-[10px] hover:text-slate-700 dark:hover:text-slate-200 transition disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="text-[13px] font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2.5 rounded-[10px] transition disabled:opacity-60"
                  >
                    {deleting ? 'Deleting…' : 'Confirm delete'}
                  </button>
                </div>
              )
            )}
          </div>

          {loading && (
            <div className="space-y-4">
              <div className="h-10 w-1/2 rounded-lg bg-slate-50 dark:bg-slate-900 animate-pulse" />
              <div className="h-40 rounded-2xl bg-slate-50 dark:bg-slate-900 animate-pulse" />
            </div>
          )}

          {error && (
            <div className="text-[13px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {recommendation && !loading && <RecommendationDetails recommendation={recommendation} />}
        </main>

        <Toast toast={toast} onClose={clearToast} />
      </div>
    </ProtectedRoute>
  );
}
