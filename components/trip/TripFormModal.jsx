'use client';

import { useState } from 'react';
import { tripApi } from '@/lib/api';
import { BTN_GRADIENT, BTN_GLOW } from '@/lib/uiTokens';

const INTERESTS = ['Adventure', 'Nature', 'Luxury', 'Food', 'Shopping', 'Beaches', 'Historical Places'];

const inputClass =
  'w-full px-3.5 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[10px] text-[14px] text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-600/15';

export default function TripFormModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ destination: '', budget: '', travelers: '', duration: '', interests: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function toggleInterest(interest) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest) ? f.interests.filter((i) => i !== interest) : [...f.interests, interest],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={loading ? undefined : onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl p-5 sm:p-7">
        <div className="flex items-start justify-between mb-5 sm:mb-6 gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">Plan a new trip</h2>
            <p className="text-[12.5px] sm:text-[13px] text-zinc-500 dark:text-zinc-400 mt-1">Our AI will generate a full itinerary from these details.</p>
          </div>
          <button onClick={onClose} disabled={loading} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 text-[13px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-3 py-2">
            {error}
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
                      active ? `${BTN_GRADIENT} border-transparent` : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-orange-300 dark:hover:border-orange-900/50'
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
