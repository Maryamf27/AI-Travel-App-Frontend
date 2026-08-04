'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getRoleHome } from '@/lib/roleRedirect';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const isRoleAllowed = !allowedRoles || (user && allowedRoles.includes(user.role));

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    if (!isRoleAllowed) {
      router.replace(getRoleHome(user.role));
    }
  }, [loading, user, isRoleAllowed, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isRoleAllowed) return null;

  return children;
}
