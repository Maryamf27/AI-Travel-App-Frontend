'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardNav from '@/components/DashboardNav';
import RecommendationForm from '../../../components/recommendation/RecommendationForm';
import Toast from '@/components/Toast';
import { useToast } from '@/lib/useToast';

export default function CreateRecommendationPage() {
    const router = useRouter();
    const { toast, showToast, clearToast } = useToast();

    function handleSuccess(recommendation) {
        showToast('Recommendation generated successfully!', 'success');
        const id = recommendation?._id;
        setTimeout(() => {
            if (id) {
                router.push(`/recommendations/${id}`);
            } else {
                router.push('/recommendations');
            }
        }, 600);
    }

    function handleError(message) {
        showToast(message || 'Failed to generate recommendation.', 'error');
    }

    return (
        <ProtectedRoute allowedRoles={['traveler']}>
            <div className="min-h-screen bg-white dark:bg-slate-950">
                <DashboardNav/>

                <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                    <button
                        onClick={() => router.push('/recommendations')}
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 mb-6 transition"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to recommendations
                    </button>

                    <div className="flex justify-center">
                        <RecommendationForm onSuccess={handleSuccess} onError={handleError} />
                    </div>
                </main>

                <Toast toast={toast} onClose={clearToast} />
            </div>
        </ProtectedRoute>
    );
}
