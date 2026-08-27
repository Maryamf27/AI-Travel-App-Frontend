'use client';

import { LayoutDashboard, Users, CalendarCheck, Package, UserCircle } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardShell from '@/components/dashboard/DashboardShell';

const AGENT_NAV = [
  { href: '/agent/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/agent/clients', label: 'Clients', icon: Users },
  { href: '/agent/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/agent/packages', label: 'Packages', icon: Package },
  { href: '/agent/profile', label: 'Profile', icon: UserCircle },
];

export default function AgentLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['travel_agent']}>
      <DashboardShell navItems={AGENT_NAV} roleLabel="Travel Agent">
        {children}
      </DashboardShell>
    </ProtectedRoute>
  );
}
