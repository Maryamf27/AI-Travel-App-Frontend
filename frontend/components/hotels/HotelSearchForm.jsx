'use client';

import { useState } from 'react';
import { searchHotels } from '@/services/hotelService';
import { BTN_GRADIENT, BTN_GLOW } from '@/lib/uiTokens';

const inputClass =
  'w-full px-3.5 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[10px] text-[14px] text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition focus:border-purple-600 focus:ring-4 focus:ring-purple-600/15 disabled:opacity-60';

const labelClass = 'block text-[12.5px] font-semibold mb-1.5';

function today() {
  return new Date().toISOString().split('T')[0];
}

function validate(form) {
  const errors = {};

  if (!form.destination.trim()) {
    errors.destination = 'Please enter a destination.';
  }

  if (!form.checkIn) {
    errors.checkIn = 'Please choose a check-in date.';
  }

  if (!form.checkOut) {
    errors.checkOut = 'Please choose a check-out date.';
  }

  if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn) {
    errors.checkOut = 'Check-out must be after check-in.';
  }

  const guests = Number(form.guests);
  if (!form.guests || Number.isNaN(guests) || guests < 1) {
    errors.guests = 'Guests must be at least 1.';
  }

  return errors;
}

export default function HotelSearchForm({ onSuccess, onError }) {
  const [form, setForm] = useState({ destination: '', checkIn: '', checkOut: '', guests: '2' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setLoading(true);
    try {
      const data = await searchHotels({
        destination: form.destination.trim(),
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: Number(form.guests),
      });
      const hotelSearch = data?.hotelSearch || data;
      onSuccess?.(hotelSearch);
    } catch (err) {
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-xl p-5 sm:p-7"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <label className={labelClass}>Destination</label>
          <input
            type="text"
            placeholder="e.g. Dubai"
            className={inputClass}
            value={form.destination}
            onChange={(e) => updateField('destination', e.target.value)}
            disabled={loading}
          />
          {errors.destination && <p className="mt-1.5 text-[12px] text-red-600 dark:text-red-400">{errors.destination}</p>}
        </div>

        <div>
          <label className={labelClass}>Check-in</label>
          <input
            type="date"
            min={today()}
            className={inputClass}
            value={form.checkIn}
            onChange={(e) => updateField('checkIn', e.target.value)}
            disabled={loading}
          />
          {errors.checkIn && <p className="mt-1.5 text-[12px] text-red-600 dark:text-red-400">{errors.checkIn}</p>}
        </div>

        <div>
          <label className={labelClass}>Check-out</label>
          <input
            type="date"
            min={form.checkIn || today()}
            className={inputClass}
            value={form.checkOut}
            onChange={(e) => updateField('checkOut', e.target.value)}
            disabled={loading}
          />
          {errors.checkOut && <p className="mt-1.5 text-[12px] text-red-600 dark:text-red-400">{errors.checkOut}</p>}
        </div>

        <div>
          <label className={labelClass}>Guests</label>
          <input
            type="number"
            min="1"
            placeholder="2"
            className={inputClass}
            value={form.guests}
            onChange={(e) => updateField('guests', e.target.value)}
            disabled={loading}
          />
          {errors.guests && <p className="mt-1.5 text-[12px] text-red-600 dark:text-red-400">{errors.guests}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 mt-5 ${BTN_GRADIENT} disabled:opacity-60 rounded-[10px] text-[15px] font-bold ${BTN_GLOW} flex items-center justify-center gap-2`}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Searching hotels…
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Search Hotels
          </>
        )}
      </button>
    </form>
  );
}
