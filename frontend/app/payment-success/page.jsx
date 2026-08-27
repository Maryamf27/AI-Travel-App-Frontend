'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import DashboardNav from '@/components/DashboardNav';
import { BTN_GRADIENT, BTN_GLOW } from '@/lib/uiTokens';
import { paymentApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 8;

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { refreshUser } = useAuth();

  const [status, setStatus] = useState(sessionId ? 'checking' : 'missing');

  useEffect(() => {
    if (!sessionId) return;

    let attempts = 0;
    let cancelled = false;
    let timer;

    async function poll() {
      try {
        const result = await paymentApi.getPaymentBySession(sessionId);

        if (cancelled) return;

        if (result?.payment?.status === 'paid') {
          setStatus('paid');
          localStorage.removeItem('travelai_pending_payment_session');
          refreshUser?.();
          return;
        }

        attempts += 1;
        if (attempts >= MAX_POLL_ATTEMPTS) {
          setStatus('pending');
          return;
        }

        timer = setTimeout(poll, POLL_INTERVAL_MS);
      } catch (error) {
        if (cancelled) return;
        console.error('Failed to verify payment session:', error);
        setStatus('error');
      }
    }

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [sessionId]);

  const copy = {
    checking: {
      title: 'Confirming your payment…',
      lines: ["Hang tight while we confirm this with Stripe — this only takes a moment."],
    },
    paid: {
      title: 'Payment successful',
      lines: [
        "You're all set — TravelAI Premium is now active on your account.",
        'A receipt has been sent to your email.',
      ],
    },
    pending: {
      title: 'Payment is still processing',
      lines: [
        "Stripe hasn't confirmed this payment yet. It should finish shortly — refresh this page in a minute, or check your dashboard.",
      ],
    },
    error: {
      title: "We couldn't confirm this payment",
      lines: [
        'Something went wrong while checking your payment status. If you were charged, your account will update automatically once we hear back from Stripe.',
      ],
    },
    missing: {
      title: 'No payment reference found',
      lines: ['This page needs a valid checkout session to confirm a payment.'],
    },
  }[status];

  const isPaid = status === 'paid';

  return (
    <main className="max-w-lg mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 px-6 sm:px-10 py-12 sm:py-14">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
            isPaid
              ? 'bg-emerald-50 dark:bg-emerald-950/30'
              : 'bg-zinc-100 dark:bg-zinc-900'
          }`}
        >
          {isPaid ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-zinc-400"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl font-semibold mb-2">{copy.title}</h1>
        {copy.lines.map((line) => (
          <p
            key={line}
            className="text-[13.5px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 mb-1 last:mb-8"
          >
            {line}
          </p>
        ))}

        {sessionId && (
          <p className="text-[11.5px] text-zinc-400 dark:text-zinc-600 mb-8 break-all">
            Reference: {sessionId}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className={`inline-flex items-center justify-center gap-2 ${BTN_GRADIENT} text-[14px] font-bold px-6 py-3 rounded-xl w-full sm:w-auto ${BTN_GLOW}`}
          >
            Go to Dashboard
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 text-[14px] font-semibold px-6 py-3 rounded-xl w-full sm:w-auto border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            View Plans
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <DashboardNav />
      <Suspense fallback={null}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
