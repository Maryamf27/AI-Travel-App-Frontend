'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, MapPin, Briefcase, Compass, UserCog, Settings, Activity } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { adminApi } from '@/lib/api';
import StatCard from '@/components/dashboard/StatCard';
import EmptyState from '@/components/dashboard/EmptyState';

const QUICK_ACTIONS = [
  { href: '/admin/users', label: 'Manage users', icon: UserCog },
  { href: '/admin/agents', label: 'Manage agents', icon: Briefcase },
  { href: '/admin/settings', label: 'Platform settings', icon: Settings },
];

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    adminApi
      .getStats()
      .then((data) => {
        if (active) setStats(data.stats);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      {/* Welcome card */}
      <div className="rounded-2xl bg-linear-to-br from-orange-600 to-red-600 dark:from-orange-800 dark:to-rose-900 p-6 sm:p-8 mb-8 text-white">
        <p className="text-[11px] uppercase tracking-[2px] text-white/70 mb-2">Admin Console</p>
        <h1 className="text-xl sm:text-2xl font-semibold mb-1.5">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-[13.5px] sm:text-[14px] text-white/80 max-w-lg">
          A quick overview of everything happening across the platform.
        </p>
      </div>

      {error && (
        <div className="mb-6 text-[13px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-3.5 py-2.5">
          Couldn&apos;t load live stats: {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
        <StatCard icon={Users} label="Total Users" value={stats?.totalUsers ?? 0} loading={loading} />
        <StatCard icon={Compass} label="Travelers" value={stats?.totalTravelers ?? 0} loading={loading} />
        <StatCard icon={Briefcase} label="Travel Agents" value={stats?.totalAgents ?? 0} loading={loading} />
        <StatCard icon={MapPin} label="Total Trips" value={stats?.totalTrips ?? 0} loading={loading} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2">
          <h2 className="text-[15px] font-semibold mb-4">Recent Activity</h2>
          <EmptyState
            icon={Activity}
            title="No recent activity to show"
            description="Platform-wide activity logging isn't wired up yet. Once it is, new signups, bookings, and key events will appear here."
          />
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-[15px] font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2.5">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 px-4 py-3.5 hover:border-orange-200 dark:hover:border-orange-900/50 hover:shadow-sm transition"
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-orange-600 dark:text-orange-400" strokeWidth={2.2} />
                  </div>
                  <span className="text-[13.5px] font-semibold">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
