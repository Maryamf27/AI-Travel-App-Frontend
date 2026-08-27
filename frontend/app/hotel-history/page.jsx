'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardNav from '@/components/DashboardNav';
import HotelHistoryCard from '@/components/hotels/HotelHistoryCard';
import LoadingSkeleton from '@/components/hotels/LoadingSkeleton';
import EmptyHotelState from '@/components/hotels/EmptyHotelState';
import Toast from '@/components/Toast';
import { useToast } from '@/lib/useToast';
import { getMyHotelSearches, deleteHotelSearch } from '@/services/hotelService';
import { BTN_GRADIENT, BTN_GLOW } from '@/lib/uiTokens';

export default function HotelHistoryPage() {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { toast, showToast, clearToast } = useToast();

  useEffect(() => {
    loadSearches();
  }, []);

  async function loadSearches() {
    setLoading(true);
    setError('');
    try {
      const data = await getMyHotelSearches();
      setSearches(data?.hotelSearches || data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteHotelSearch(id);
      setSearches((prev) => prev.filter((s) => s._id !== id));
      showToast('Hotel search deleted.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to delete hotel search.', 'error');
    }
  }

  return (
    <ProtectedRoute allowedRoles={['traveler']}>
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <DashboardNav />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold">Hotel Search History</h1>
              <p className="text-[13.5px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 mt-1">
                {searches.length} {searches.length === 1 ? 'search' : 'searches'} saved so far
              </p>
            </div>
            <Link
              href="/hotel-search"
              className={`inline-flex items-center justify-center gap-2 ${BTN_GRADIENT} text-[14px] font-bold px-5 py-3 rounded-xl ${BTN_GLOW}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New Hotel Search
            </Link>
          </div>

          {error && (
            <div className="mb-6 text-[13px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {loading ? (
            <LoadingSkeleton count={6} variant="history" />
          ) : searches.length === 0 ? (
            <EmptyHotelState
              title="No hotel searches yet"
              description="Run your first AI-powered hotel search and it will show up here."
              ctaHref="/hotel-search"
              ctaLabel="Search Hotels"
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {searches.map((search) => (
                <HotelHistoryCard key={search._id} search={search} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </main>

        <Toast toast={toast} onClose={clearToast} />
      </div>
    </ProtectedRoute>
  );
}
