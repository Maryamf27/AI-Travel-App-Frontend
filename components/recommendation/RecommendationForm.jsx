'use client';

import { useState } from 'react';
import { recommendationApi } from '@/lib/api';
import { BTN_GRADIENT, BTN_GLOW } from '@/lib/uiTokens';

const INTERESTS = ['Adventure', 'Nature', 'Luxury', 'Food', 'Shopping', 'Beaches', 'Historical Places'];

const inputClass =
  'w-full px-3.5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[10px] text-[14px] text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-600 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/15';

export default function RecommendationForm({ onSuccess, onError }) {
  const [form, setForm] = useState({ destination: '', interests: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function toggleInterest(interest) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter((i) => i !== interest)
        : [...f.interests, interest],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const destination = form.destination.trim();
    if (!destination) {
      setError('Please enter a destination.');
      return;
    }
    if (form.interests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }

    setLoading(true);
    try {
      const data = await recommendationApi.createRecommendation({
        destination,
        interests: form.interests,
      });
      const recommendation = data?.recommendation || data;
      onSuccess?.(recommendation);
    } catch (err) {
      setError(err.message);
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl p-5 sm:p-7">
      <div className="mb-5 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Generate a recommendation</h2>
        <p className="text-[12.5px] sm:text-[13px] text-slate-500 dark:text-slate-400 mt-1">
          Tell our AI where you're headed and what you're into.
        </p>
      </div>

      {error && (
        <div className="mb-4 text-[13px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[12.5px] font-semibold mb-1.5">Destination (Must be City) </label>
          <input
            type="text"
            required
            placeholder="e.g. Bali, Indonesia"
            className={inputClass}
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            disabled={loading}
          />
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
                  disabled={loading}
                  className={`text-[12.5px] font-semibold px-3 py-2 rounded-full border transition disabled:opacity-60 ${
                    active
                      ? `${BTN_GRADIENT} border-transparent`
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-teal-300 dark:hover:border-teal-900/50'
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
              Generating recommendation…
            </>
          ) : (
            'Generate recommendation'
          )}
        </button>
      </form>
    </div>
  );
}
