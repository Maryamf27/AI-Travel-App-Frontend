'use client';

import { useRouter } from 'next/navigation';
import DashboardNav from '@/components/DashboardNav';
import PricingHeader from '@/components/subscription/PricingHeader';
import PricingCard from '@/components/subscription/PricingCard';
import Toast from '@/components/Toast';
import { useToast } from '@/lib/useToast';
import { useAuth } from '@/context/AuthContext';
import { paymentApi } from '@/lib/api';

const FREE_FEATURES = [
  'Create AI-powered travel plans',
  'Basic travel recommendations',
  'Hotel search',
  'View travel history',
  'Personalized trip planning',
  'Access to essential TravelAI features',
];

const PREMIUM_FEATURES = [
  'Everything included in Free',
  'Unlimited AI trip planning',
  'Advanced travel recommendations',
  'AI-powered hotel summaries',
  'Unlimited hotel searches',
  'Personalized travel insights',
  'Premium travel planning experience',
];

export default function PricingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast, showToast, clearToast } = useToast();

  function handleFreeClick() {
    if (user) {
      router.push('/dashboard');
      return;
    }
    router.push('/signup');
  }
async function handlePremiumClick() {
  if (!user) {
    router.push('/signup');
    return;
  }

  try {
    showToast('Creating secure checkout...', 'success');

    const result = await paymentApi.createCheckoutSession({
      description: 'TravelAI Premium',
      successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/payment-cancel`,
    });

    if (!result?.url) {
      throw new Error('Stripe checkout URL was not returned.');
    }
    if (result.sessionId) {
      localStorage.setItem('travelai_pending_payment_session', result.sessionId);
    }

    window.location.href = result.url;
  } catch (error) {
    console.error('Stripe checkout error:', error);

    showToast(
      error.message || 'Failed to start payment.',
      'error'
    );
  }
}

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <DashboardNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PricingHeader />

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-3xl mx-auto">
          <PricingCard
            variant="free"
            title="Get Started for Free"
            price="$0"
            billing="Forever"
            description="Everything you need to start planning your trips."
            features={FREE_FEATURES}
            buttonLabel="Get Started"
            onButtonClick={handleFreeClick}
          />

          <PricingCard
            variant="premium"
            badge="RECOMMENDED"
            title="TravelAI Premium"
            price="$9.99"
            billing="/ month"
            description="Unlock the complete AI-powered travel experience."
            features={PREMIUM_FEATURES}
            buttonLabel="Upgrade to Premium"
            onButtonClick={handlePremiumClick}
          />
        </div>
      </main>

      <Toast toast={toast} onClose={clearToast} />
    </div>
  );
}
