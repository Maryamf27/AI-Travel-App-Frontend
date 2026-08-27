'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardNav from '@/components/DashboardNav';
import HotelSearchForm from '@/components/hotels/HotelSearchForm';
import HotelSummary from '@/components/hotels/HotelSummary';
import HotelGrid from '@/components/hotels/HotelGrid';
import Toast from '@/components/Toast';
import { useToast } from '@/lib/useToast';
import { ACCENT_TEXT } from '@/lib/uiTokens';

export default function HotelSearchPage() {
  const [hotelSearch, setHotelSearch] = useState(null);
  const [searched, setSearched] = useState(false);
  const { toast, showToast, clearToast } = useToast();

  function handleSuccess(result) {
    setHotelSearch(result);
    setSearched(true);
    showToast('Hotels loaded successfully.', 'success');
  }

  function handleError(message) {
    showToast(message || 'Failed to search hotels.', 'error');
  }

  return (
    <ProtectedRoute allowedRoles={['traveler']}>
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <DashboardNav />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* Hero */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight mb-3">
              Find the Best Hotels with <span className={ACCENT_TEXT}>AI</span>
            </h1>
            <p className="text-[13.5px] sm:text-[15px] text-slate-500 dark:text-slate-400">
              Search by destination and dates, and let our AI surface the best stays for your trip.
            </p>
            <Link
              href="/hotel-history"
              className={`inline-flex items-center gap-1.5 mt-4 text-[13px] font-semibold ${ACCENT_TEXT} hover:underline`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M3 3v5h5M3.05 13A9 9 0 1 0 6 5.3L3 8" />
                <path d="M12 7v5l4 2" />
              </svg>
              View past searches
            </Link>
          </div>

          <HotelSearchForm onSuccess={handleSuccess} onError={handleError} />

          {/* Results */}
          {searched && (
            <div className="mt-10 sm:mt-12">
              <HotelSummary aiResult={hotelSearch?.aiResult} />

              <div className="flex items-center justify-between gap-4 mb-5">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Hotels in {hotelSearch?.destination || 'your destination'}
                </h2>
                {hotelSearch?.hotels?.length > 0 && (
                  <span className="text-[13px] text-slate-500 dark:text-slate-400 shrink-0">
                    {hotelSearch.hotels.length} found
                  </span>
                )}
              </div>

              <HotelGrid hotels={hotelSearch?.hotels} loading={false} />
            </div>
          )}
        </main>

        <Toast toast={toast} onClose={clearToast} />
      </div>
    </ProtectedRoute>
  );
}
