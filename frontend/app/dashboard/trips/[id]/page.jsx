'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardNav from '@/components/DashboardNav';
import { tripApi } from '@/lib/api';

export default function TripDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    tripApi
      .getById(id)
      .then((data) => setTrip(data.trip))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!confirm('Delete this trip? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await tripApi.remove(id);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  return (
    <ProtectedRoute allowedRoles={['traveler']}>
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <DashboardNav/>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to dashboard
          </button>

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

          {trip && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                <div className="min-w-0">
                  <p className="text-[12px] uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-1">Trip to</p>
                  <h1 className="text-2xl sm:text-3xl font-semibold wrap-break-word">{trip.destination}</h1>
                </div>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 px-4 py-2.5 rounded-[10px] transition disabled:opacity-60 shrink-0"
                >
                  {deleting ? 'Deleting…' : 'Delete trip'}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
                <Stat label="Budget" value={`$${trip.budget}`} />
                <Stat label="Travelers" value={trip.travelers} />
                <Stat label="Duration" value={`${trip.duration} days`} />
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {trip.interests?.map((i) => (
                  <span key={i} className="text-[12px] font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 px-3 py-1 rounded-full">
                    {i}
                  </span>
                ))}
              </div>

              {trip.aiResult && (
                <div className="space-y-8">
                  {trip.aiResult.itinerary && (
                    <Section title="Overview">
                      <p className="text-[14px] sm:text-[14.5px] leading-relaxed text-zinc-600 dark:text-zinc-300">{trip.aiResult.itinerary}</p>
                    </Section>
                  )}

                  {trip.aiResult.dailySchedule?.length > 0 && (
                    <Section title="Daily schedule">
                      <div className="space-y-4">
                        {trip.aiResult.dailySchedule.map((day) => (
                          <div key={day.day} className="rounded-2xl border border-zinc-100 dark:border-zinc-800 p-4 sm:p-5">
                            <p className="text-[12px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-3">Day {day.day}</p>
                            <ul className="space-y-2">
                              {day.activities?.map((a, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-[13.5px] text-zinc-600 dark:text-zinc-300">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                                  {a}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </Section>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    {trip.aiResult.estimatedExpenses && (
                      <Section title="Estimated expenses">
                        <p className="text-[14px] text-zinc-600 dark:text-zinc-300">{trip.aiResult.estimatedExpenses}</p>
                      </Section>
                    )}
                    {trip.aiResult.bestVisitingTime && (
                      <Section title="Best time to visit">
                        <p className="text-[14px] text-zinc-600 dark:text-zinc-300">{trip.aiResult.bestVisitingTime}</p>
                      </Section>
                    )}
                    {trip.aiResult.localTransportation && (
                      <Section title="Local transportation">
                        <p className="text-[14px] text-zinc-600 dark:text-zinc-300">{trip.aiResult.localTransportation}</p>
                      </Section>
                    )}
                  </div>

                  {trip.aiResult.packingChecklist?.length > 0 && (
                    <Section title="Packing checklist">
                      <div className="grid sm:grid-cols-2 gap-2">
                        {trip.aiResult.packingChecklist.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-[13.5px] text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 rounded-lg px-3 py-2">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
                              <path d="M5 12l4 4 10-10" />
                            </svg>
                            {item}
                          </div>
                        ))}
                      </div>
                    </Section>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

function Stat({ label, value, capitalize }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl px-3 sm:px-4 py-3 text-center">
      <p className={`text-[14px] sm:text-[15px] font-bold truncate ${capitalize ? 'capitalize' : ''}`}>{value}</p>
      <p className="text-[10.5px] sm:text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{label}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-[13px] font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-3">{title}</h2>
      {children}
    </div>
  );
}
