'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/lib/api';
import { BTN_GRADIENT, BTN_GLOW } from '@/lib/uiTokens';

const inputClass =
  'w-full px-3.5 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[10px] text-[14px] text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-600/15';

export default function ProfileForm() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password && form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      const payload = { name: form.name, email: form.email, phone: form.phone };
      if (form.password) payload.password = form.password;

      const data = await authApi.updateMe(payload);
      setUser(data.user);
      setForm((f) => ({ ...f, password: '' }));
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 sm:p-8 max-w-xl">
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-xl font-bold text-orange-700 dark:text-orange-400 shrink-0">
          {user?.name?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <p className="text-[15px] font-semibold">{user?.name}</p>
          <p className="text-[12.5px] text-zinc-400 dark:text-zinc-500 capitalize">{user?.role?.replace('_', ' ')}</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-[13px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-3 py-2">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-[13px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-lg px-3 py-2">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Full name">
          <input
            type="text"
            required
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            required
            className={inputClass}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>
        <Field label="Phone">
          <input
            type="tel"
            placeholder="+92 300 1234567"
            className={inputClass}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>
        <Field label="New password (optional)">
          <input
            type="password"
            placeholder="Leave blank to keep current password"
            className={inputClass}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className={`w-full sm:w-auto px-6 py-3 ${BTN_GRADIENT} disabled:opacity-60 rounded-[10px] text-[14px] font-bold ${BTN_GLOW}`}
        >
          {loading ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[12.5px] font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
