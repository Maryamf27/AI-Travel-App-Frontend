'use client';

import { useCallback, useEffect, useState } from 'react';
import { Search, Trash2, ShieldCheck } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/lib/useToast';
import Toast from '@/components/Toast';
import EmptyState from '@/components/dashboard/EmptyState';

const ROLE_STYLES = {
  traveler: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400',
  travel_agent: 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400',
  admin: 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400',
};

function roleLabel(role) {
  if (role === 'travel_agent') return 'Travel Agent';
  if (role === 'admin') return 'Admin';
  return 'Traveler';
}

export default function UserManagementTable({ roleFilter, emptyTitle, emptyDescription }) {
  const { user: currentUser } = useAuth();
  const { toast, showToast, clearToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchUsers = useCallback(async (q) => {
    setLoading(true);
    try {
      const data = await adminApi.getUsers({ role: roleFilter, search: q });
      setUsers(data.users);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [roleFilter, showToast]);

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(search), 350);
    return () => clearTimeout(timer);
  }, [search, fetchUsers]);

  async function handleDelete(id, name) {
    if (!confirm(`Remove ${name}'s account? This can't be undone.`)) return;
    setDeletingId(id);
    try {
      await adminApi.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      showToast('User removed successfully.');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <Toast toast={toast} onClose={clearToast} />

      <div className="relative mb-5 max-w-sm">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[10px] text-[13.5px] outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/15 transition"
        />
      </div>

      {loading ? (
        <div className="space-y-2.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 animate-pulse" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title={emptyTitle || 'No users found'}
          description={emptyDescription || 'Try a different search term.'}
        />
      ) : (
        <div className="rounded-2xl border border-zinc-300 dark:border-zinc-800 overflow-hidden">
          <div className="hidden sm:grid grid-cols-[1.6fr_1.4fr_1fr_1fr_40px] gap-3 px-5 py-3 bg-zinc-50 dark:bg-zinc-900/60 text-[11px] font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Joined</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {users.map((u) => (
              <div key={u._id} className="px-5 py-4">
                {/* Mobile view */}
                <div className="flex sm:hidden items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-[13px] font-bold text-orange-700 dark:text-orange-400 shrink-0">
                      {u.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold truncate">{u.name}</p>
                      <p className="text-[12px] text-zinc-500 dark:text-zinc-400 truncate">{u.email}</p>
                    </div>
                  </div>
                  {u._id !== currentUser?._id && u.role !== 'admin' && (
                    <button
                      onClick={() => handleDelete(u._id, u.name)}
                      disabled={deletingId === u._id}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition disabled:opacity-50 shrink-0"
                      aria-label={`Remove ${u.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex sm:hidden items-center gap-2 mt-2.5 pl-11.5">
                  <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${ROLE_STYLES[u.role] || ''}`}>
                    {roleLabel(u.role)}
                  </span>
                  <span className="text-[12px] text-zinc-400 dark:text-zinc-500">
                    Joined {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                  </span>
                </div>

                {/* Desktop view */}
                <div className="hidden sm:grid grid-cols-[1.6fr_1.4fr_1fr_1fr_40px] gap-3 items-center">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-[12px] font-bold text-orange-700 dark:text-orange-400 shrink-0">
                      {u.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <span className="text-[13.5px] font-semibold truncate">{u.name}</span>
                  </div>
                  <span className="text-[13px] text-zinc-500 dark:text-zinc-400 truncate">{u.email}</span>
                  <span>
                    <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${ROLE_STYLES[u.role] || ''}`}>
                      {roleLabel(u.role)}
                    </span>
                  </span>
                  <span className="text-[12.5px] text-zinc-400 dark:text-zinc-500">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                  </span>
                  <div className="flex justify-end">
                    {u._id !== currentUser?._id && u.role !== 'admin' && (
                      <button
                        onClick={() => handleDelete(u._id, u.name)}
                        disabled={deletingId === u._id}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition disabled:opacity-50"
                        aria-label={`Remove ${u.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
