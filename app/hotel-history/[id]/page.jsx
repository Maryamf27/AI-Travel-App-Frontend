'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardNav from '@/components/DashboardNav';
import HotelSummary from '@/components/hotels/HotelSummary';
import HotelGrid from '@/components/hotels/HotelGrid';
import Toast from '@/components/Toast';
import { useToast } from '@/lib/useToast';
import { getHotelSearchById, deleteHotelSearch } from '@/services/hotelService';

function formatDate(value) {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '—';
  }
}

export default function HotelSearchDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [hotelSearch, setHotelSearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const { toast, showToast, clearToast } = useToast();

  useEffect(() => {
    getHotelSearchById(id)
      .then((data) => setHotelSearch(data?.hotelSearch || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteHotelSearch(id);
      showToast('Hotel search deleted.', 'success');
      setTimeout(() => router.push('/hotel-history'), 500);
    } catch (err) {
      showToast(err.message || 'Failed to delete hotel search.', 'error');
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <ProtectedRoute allowedRoles={['traveler']}>
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <DashboardNav />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={() => router.push('/hotel-history')}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 transition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to hotel history
            </button>

            {hotelSearch && !loading && (
              !confirming ? (
                <button
                  onClick={() => setConfirming(true)}
                  className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 px-4 py-2.5 rounded-[10px] transition shrink-0"
                >
                  Delete search
                </button>
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setConfirming(false)}
                    disabled={deleting}
                    className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2.5 rounded-[10px] hover:text-zinc-700 dark:hover:text-zinc-200 transition disabled:opacity-60"
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
              <div className="h-10 w-1/2 rounded-lg bg-zinc-50 dark:bg-zinc-900 animate-pulse" />
              <div className="h-40 rounded-2xl bg-zinc-50 dark:bg-zinc-900 animate-pulse" />
            </div>
          )}

          {error && (
            <div className="text-[13px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {hotelSearch && !loading && (
            <>
              <div className="mb-8">
                <p className="text-[12px] uppercase tracking-wide text-zinc-600 dark:text-zinc-500 mb-1">
                  Hotel search for
                </p>
                <h1 className="text-2xl sm:text-3xl font-semibold wrap-break-word mb-3">
                  {hotelSearch.destination}
                </h1>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-zinc-500 dark:text-zinc-400">
                  <span>Check-in: {formatDate(hotelSearch.checkIn)}</span>
                  <span>Check-out: {formatDate(hotelSearch.checkOut)}</span>
                  <span>Guests: {hotelSearch.guests ?? '—'}</span>
                  <span>Hotels found: {hotelSearch.hotels?.length ?? 0}</span>
                </div>
              </div>

              <HotelSummary aiResult={hotelSearch.aiResult} />

              <HotelGrid hotels={hotelSearch.hotels} loading={false} />
            </>
          )}
        </main>

        <Toast toast={toast} onClose={clearToast} />
      </div>
    </ProtectedRoute>
  );
}
