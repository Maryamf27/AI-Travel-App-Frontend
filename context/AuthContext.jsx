'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('travelai_token');
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .me()
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('travelai_token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login({ email, password }) {
    const data = await authApi.login({ email, password });
    localStorage.setItem('travelai_token', data.token);
    setUser(data.user);
    return data.user;
  }

  async function register({ name, email, password, role, phone }) {
    const data = await authApi.register({ name, email, password, role, phone });
    localStorage.setItem('travelai_token', data.token);
    setUser(data.user);
    return data.user;
  }

  async function logout() {
    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    localStorage.removeItem('travelai_token');
    setUser(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
