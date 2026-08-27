'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, paymentApi } from '@/lib/api';

const AuthContext = createContext(null);

const PENDING_PAYMENT_KEY = 'travelai_pending_payment_session';
const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 15; 

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

  useEffect(() => {
    const sessionId = localStorage.getItem(PENDING_PAYMENT_KEY);
    if (!sessionId) return;

    let cancelled = false;
    let attempts = 0;
    let timer;

    async function poll() {
      try {
        const result = await paymentApi.getPaymentBySession(sessionId);

        if (cancelled) return;

        if (result?.payment?.status === 'paid') {
          localStorage.removeItem(PENDING_PAYMENT_KEY);
          const data = await authApi.me();
          if (!cancelled) setUser(data.user);
          return;
        }

        if (
          result?.payment?.status === 'failed' ||
          result?.payment?.status === 'cancelled'
        ) {
          localStorage.removeItem(PENDING_PAYMENT_KEY);
          return;
        }

        attempts += 1;
        if (attempts >= MAX_POLL_ATTEMPTS) {
          localStorage.removeItem(PENDING_PAYMENT_KEY);
          return;
        }

        timer = setTimeout(poll, POLL_INTERVAL_MS);
      } catch {
        attempts += 1;
        if (!cancelled && attempts < MAX_POLL_ATTEMPTS) {
          timer = setTimeout(poll, POLL_INTERVAL_MS);
        } else {
          localStorage.removeItem(PENDING_PAYMENT_KEY);
        }
      }
    }

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
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

  async function refreshUser() {
    try {
      const data = await authApi.me();
      setUser(data.user);
      return data.user;
    } catch {
      return null;
    }
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
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
