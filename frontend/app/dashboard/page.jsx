'use client';

import { useMemo, useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardNav from '@/components/DashboardNav';
import TripCard from '@/components/trip/TripCard';
import TripFormModal from '@/components/trip/TripFormModal';
import StatCard from '@/components/dashboard/StatCard';
import { useAuth } from '@/context/AuthContext';
import { tripApi } from '@/lib/api';
import { BTN_GRADIENT, BTN_GLOW } from '@/lib/uiTokens';

export default function DashboardPage() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTrips();
  }, []);

  async function loadTrips() {
    setLoading(true);
    setError('');
    try {
      const data = await tripApi.list();
      setTrips(data.trips);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCreated(trip) {
    setTrips((prev) => [trip, ...prev]);
    setShowForm(false);
  }

  async function handleDelete(id) {
    await tripApi.remove(id);
    setTrips((prev) => prev.filter((t) => t._id !== id));
  }

  const insights = useMemo(() => computeInsights(trips), [trips]);

  return (
    <ProtectedRoute allowedRoles={['traveler']}>
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <DashboardNav />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold">Welcome back, {user?.name?.split(' ')[0]}</h1>
              <p className="text-[13.5px] sm:text-[14px] text-zinc-700 dark:text-zinc-400 mt-1">
                {trips.length} {trips.length === 1 ? 'trip' : 'trips'} planned so far
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className={`inline-flex items-center justify-center gap-2 ${BTN_GRADIENT} text-[14px] font-bold px-5 py-3 rounded-xl ${BTN_GLOW} active:scale-[0.98]`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Create trip
            </button>
          </div>

          {error && (
            <div className="mb-6 text-[13px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 rounded-2xl bg-zinc-50 dark:bg-zinc-900 animate-pulse" />
              ))}
            </div>
          ) : trips.length === 0 ? (
            <EmptyState onCreate={() => setShowForm(true)} />
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {trips.map((trip) => (
                  <TripCard key={trip._id} trip={trip} onDelete={handleDelete} />
                ))}
              </div>

              {insights && (
                <section className="mt-10 sm:mt-12">
                  <h2 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                    Travel insights
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <StatCard icon={SuitcaseIcon} label="Total trips" value={insights.totalTrips} />
                    <StatCard icon={MapPinIcon} label="Most visited" value={insights.mostVisited} />
                    <StatCard icon={CalendarIcon} label="Total travel days" value={insights.totalDays} />
                    <StatCard icon={WalletIcon} label="Average trip budget" value={`$${insights.avgBudget}`} />
                  </div>
                </section>
              )}
            </>
          )}
        </main>

        {showForm && <TripFormModal onClose={() => setShowForm(false)} onCreated={handleCreated} />}
      </div>
    </ProtectedRoute>
  );
}

function computeInsights(trips) {
  if (!trips || trips.length === 0) return null;

  const totalDays = trips.reduce((sum, t) => sum + (Number(t.duration) || 0), 0);
  const totalBudget = trips.reduce((sum, t) => sum + (Number(t.budget) || 0), 0);
  const avgBudget = Math.round(totalBudget / trips.length);

  const destinationCounts = {};
  trips.forEach((t) => {
    if (!t.destination) return;
    destinationCounts[t.destination] = (destinationCounts[t.destination] || 0) + 1;
  });
  const mostVisited =
    Object.entries(destinationCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  return {
    totalTrips: trips.length,
    totalDays,
    avgBudget,
    mostVisited,
  };
}

function EmptyState({ onCreate }) {
  return (
    <div className="text-center py-16 sm:py-20 px-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
      <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/30 flex items-center  justify-center mx-auto mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 ">
          <path d="M12 2l1.9 5.5L19 9.5l-5.1 2L12 17l-1.9-5.5L5 9.5l5.1-2L12 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-1.5">No trips yet</h3>
      <p className="text-[13.5px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 mb-6">Create your first AI-generated itinerary in under a minute.</p>
      <button
        onClick={onCreate}
        className={`inline-flex items-center gap-2 ${BTN_GRADIENT} text-[14px] font-bold px-5 py-3 rounded-xl`}
      >
        Create your first trip
      </button>
    </div>
  );
}

function SuitcaseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
      <path d="M17 12a2 2 0 1 0 0 4h4v-4h-4Z" />
    </svg>
  );
}
