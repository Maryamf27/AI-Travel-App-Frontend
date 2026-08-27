import './globals.css';
import Providers from './Providers';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'TravelAI — AI Travel Planner',
  description:
    'Plan smarter, travel safer — AI-powered itineraries, budgets, and safety scores.',
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors">
        <Providers>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}