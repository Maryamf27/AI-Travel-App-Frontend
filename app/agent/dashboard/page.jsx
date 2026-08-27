'use client';

import Link from 'next/link';
import { Users, CalendarCheck, Package, DollarSign, Plus, UserPlus, FileText } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import StatCard from '@/components/dashboard/StatCard';
import EmptyState from '@/components/dashboard/EmptyState';
import { BTN_GRADIENT, ACCENT_TEXT } from '@/lib/uiTokens';

const MOCK_STATS = {
  totalClients: 0,
  activeBookings: 0,
  travelPackages: 0,
  revenue: 0,
};

const QUICK_ACTIONS = [
  { href: '/agent/clients', label: 'Add a client', icon: UserPlus },
  { href: '/agent/bookings', label: 'View bookings', icon: FileText },
  { href: '/agent/packages', label: 'Create a package', icon: Plus },
];

export default function AgentDashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Welcome card */}
      <div className="rounded-2xl bg-teal-500 dark:bg-teal-600 p-6 sm:p-8 mb-8 text-white">
        <p className={`text-[11px] uppercase tracking-[2px] text-white/70 mb-2`}>Travel Agent Portal</p>
        <h1 className="text-xl sm:text-2xl font-semibold mb-1.5">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-[13.5px] sm:text-[14px] text-white/80 max-w-lg">
          Here&apos;s a snapshot of your book of business. Manage clients, bookings, and travel
          packages all from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
        <StatCard icon={Users} label="Total Clients" value={MOCK_STATS.totalClients} hint="Preview" />
        <StatCard icon={CalendarCheck} label="Active Bookings" value={MOCK_STATS.activeBookings} hint="Preview" />
        <StatCard icon={Package} label="Travel Packages" value={MOCK_STATS.travelPackages} hint="Preview" />
        <StatCard
          icon={DollarSign}
          label="Revenue"
          value={`$${MOCK_STATS.revenue.toLocaleString()}`}
          hint="Placeholder"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2">
          <h2 className="text-[15px] font-semibold mb-4">Recent Activity</h2>
          <EmptyState
            icon={CalendarCheck}
            title="No activity yet"
            description="Once you start adding clients and managing bookings, your recent activity will show up here."
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
                  className="flex items-center gap-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 px-4 py-3.5 hover:border-teal-200 dark:hover:border-teal-900/50 hover:shadow-sm transition"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-teal-600 dark:text-teal-400" strokeWidth={2.2} />
                  </div>
                  <span className="text-[13.5px] font-semibold">{action.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 px-4 py-3.5">
            <p className={`text-[12px] font-semibold ${ACCENT_TEXT} mb-1`}>Heads up</p>
            <p className="text-[12.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Client, booking, and package management are launching soon. Stats above are
              placeholders until those modules go live.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
