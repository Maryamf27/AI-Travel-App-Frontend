'use client';

import { LayoutDashboard, Users, Briefcase, Settings, UserCircle } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardShell from '@/components/dashboard/DashboardShell';

const ADMIN_NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/agents', label: 'Agent Management', icon: Briefcase },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/profile', label: 'Profile', icon: UserCircle },
];

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardShell navItems={ADMIN_NAV} roleLabel="Administrator">
        {children}
      </DashboardShell>
    </ProtectedRoute>
  );
}
