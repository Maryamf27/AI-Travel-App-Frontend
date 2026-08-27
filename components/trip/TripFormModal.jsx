'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tripApi } from '@/lib/api';
import { BTN_GRADIENT, BTN_GLOW } from '@/lib/uiTokens';

const INTERESTS = ['Adventure', 'Nature', 'Luxury', 'Food', 'Shopping', 'Beaches', 'Historical Places'];

const inputClass =
  'w-full px-3.5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[10px] text-[14px] text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-600 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/15';

export default function TripFormModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ destination: '', budget: '', travelers: '', duration: '', interests: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsUpgrade, setNeedsUpgrade] = useState(false);

  function toggleInterest(interest) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest) ? f.interests.filter((i) => i !== interest) : [...f.interests, interest],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setNeedsUpgrade(false);
    if (form.interests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }
    setLoading(true);
    try {
      const data = await tripApi.create({
        destination: form.destination.trim(),
        budget: Number(form.budget),
        travelers: Number(form.travelers),
        duration: Number(form.duration),
        interests: form.interests,
      });
      onCreated(data.trip);
    } catch (err) {
      if (err.code === 'PREMIUM_REQUIRED') {
        setNeedsUpgrade(true);
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={loading ? undefined : onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-7">
        <div className="flex items-start justify-between mb-5 sm:mb-6 gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">Plan a new trip</h2>
            <p className="text-[12.5px] sm:text-[13px] text-slate-500 dark:text-slate-400 mt-1">Our AI will generate a full itinerary from these details.</p>
          </div>
          <button onClick={onClose} disabled={loading} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 text-[13px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-3 py-2">
            {error}
            {needsUpgrade && (
              <Link
                href="/pricing"
                className="block mt-2 text-teal-700 dark:text-teal-400 font-bold underline underline-offset-2"
              >
                Upgrade to Premium →
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12.5px] font-semibold mb-1.5">Destination</label>
            <input type="text" required placeholder="e.g. Bali, Indonesia" className={inputClass} value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div>
              <label className="block text-[12px] sm:text-[12.5px] font-semibold mb-1.5">Budget ($)</label>
              <input type="number" min="1" required placeholder="1200" className={inputClass} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
            </div>
            <div>
              <label className="block text-[12px] sm:text-[12.5px] font-semibold mb-1.5">Travelers</label>
              <input type="number" min="1" required placeholder="2" className={inputClass} value={form.travelers} onChange={(e) => setForm({ ...form, travelers: e.target.value })} />
            </div>
            <div>
              <label className="block text-[12px] sm:text-[12.5px] font-semibold mb-1.5">Days</label>
              <input type="number" min="1" required placeholder="5" className={inputClass} value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="block text-[12.5px] font-semibold mb-2">Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => {
                const active = form.interests.includes(interest);
                return (
                  <button
                    type="button"
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`text-[12.5px] font-semibold px-3 py-2 rounded-full border transition ${
                      active ? `${BTN_GRADIENT} border-transparent` : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-teal-300 dark:hover:border-teal-900/50'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 mt-2 ${BTN_GRADIENT} disabled:opacity-60 rounded-[10px] text-[14.5px] font-bold ${BTN_GLOW} flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Generating itinerary…
              </>
            ) : (
              'Generate my trip'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
