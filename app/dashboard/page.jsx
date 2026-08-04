'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardNav from '@/components/DashboardNav';
import TripCard from '@/components/trip/TripCard';
import TripFormModal from '@/components/trip/TripFormModal';
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
              className={`inline-flex items-center justify-center gap-2 ${BTN_GRADIENT} text-[14px] font-bold px-5 py-3 rounded-xl ${BTN_GLOW}`}
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {trips.map((trip) => (
                <TripCard key={trip._id} trip={trip} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </main>

        {showForm && <TripFormModal onClose={() => setShowForm(false)} onCreated={handleCreated} />}
      </div>
    </ProtectedRoute>
  );
}

function EmptyState({ onCreate }) {
  return (
    <div className="text-center py-16 sm:py-20 px-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
      <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/30 flex items-center  justify-center mx-auto mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 ">
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
