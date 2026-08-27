'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import { BTN_GRADIENT, BTN_GLOW, ACCENT_TEXT } from '@/lib/uiTokens';
import { getRoleHome } from '@/lib/roleRedirect';

const inputClass =
  'w-full px-3.5 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[10px] text-[14px] text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition focus:border-purple-600 focus:ring-4 focus:ring-purple-600/15';

function AuthPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, register } = useAuth();

  const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', phone: '', role: 'traveler' });

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loggedInUser = await login(loginForm);
      router.push(getRoleHome(loggedInUser.role));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError('');
    if (signupForm.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const newUser = await register(signupForm);
      router.push(getRoleHome(newUser.role));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] bg-white dark:bg-zinc-950 transition-colors">
      {/* Brand Panel */}
      <div
        className="hidden lg:flex relative overflow-hidden flex-col justify-between p-10 xl:p-14 text-[#F5EFE9] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1761560819601-b17bb6c06613?auto=format&fit=crop&w=1400&q=80')" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#1C0A03]/85 via-[#3B0764]/75 to-[#1C0A03]/90" />
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{ background: 'radial-gradient(120% 120% at 15% 0%, rgba(168,85,247,0.45) 0%, transparent 45%)' }}
        />
        <div className="relative flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[9px] bg-linear-to-r from-cyan-500 via-purple-500 to-pink-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <path d="M2 12h20M12 2c2.5 2.7 4 6.4 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.4-4-10s1.5-7.3 4-10z" />
            </svg>
          </div>
          <span className="text-[17px] font-semibold text-white">
            Travel<span className="text-purple-400">AI</span>
          </span>
        </div>

        <div className="relative max-w-105">
          <p className="text-[11px] uppercase tracking-[2px] text-white/50 mb-4">Enterprise Travel Platform</p>
          <h1 className="text-3xl xl:text-4xl font-semibold leading-tight text-white mb-4">
            Plan smarter.<br />Travel <span className="text-purple-400">safer.</span>
          </h1>
          <p className="text-[14.5px] xl:text-[15px] leading-relaxed text-white/65">
            AI-generated itineraries, live safety scores, and budget tracking — trusted by travelers and travel agents.
          </p>
        </div>

        <div className="relative flex gap-9 pt-6 border-t border-white/10">
          <div>
            <div className="text-xl font-semibold text-white">120k+</div>
            <div className="text-[11.5px] text-white/50 mt-0.5">Itineraries generated</div>
          </div>
          <div>
            <div className="text-xl font-semibold text-white">4,800</div>
            <div className="text-[11.5px] text-white/50 mt-0.5">Verified agents</div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="relative flex flex-col items-center justify-center px-5 sm:px-6 py-10 sm:py-7 lg:px-9">
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 lg:top-8 lg:right-10">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-95">
          <div className="flex bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1 mb-5 sm:mb-6">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2.5 rounded-[9px] text-[13.5px] font-semibold transition ${mode === 'login' ? 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 shadow' : 'text-zinc-500 dark:text-zinc-400'
                }`}
            >
              Sign in
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-2.5 rounded-[9px] text-[13.5px] font-semibold transition ${mode === 'signup' ? 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 shadow' : 'text-zinc-500 dark:text-zinc-400'
                }`}
            >
              Create account
            </button>
          </div>

          {error && (
            <div className="mb-4 text-[13px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-1.5">Welcome back</h2>
              <p className="text-[13.5px] sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6 sm:mb-7">Sign in to continue planning your next trip.</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <Field label="Email">
                  <input type="email" required placeholder="you@company.com" className={inputClass} value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
                </Field>
                <Field label="Password">
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} required placeholder="••••••••••" className={inputClass} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                    <EyeToggle show={showPw} onClick={() => setShowPw((v) => !v)} />
                  </div>
                </Field>
                <SubmitButton loading={loading} label="Sign in" />
              </form>

              <p className="text-center mt-6 text-[13.5px] text-zinc-500 dark:text-zinc-400">
                New here? <button onClick={() => setMode('signup')} className={`font-bold ${ACCENT_TEXT}`}>Create an account</button>
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-1">Create your account</h2>
              <p className="text-[13.5px] sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6 sm:mb-7">Start planning AI-powered trips in minutes.</p>

              <form onSubmit={handleSignup} className="space-y-2.5">
                <Field label="Full name">
                  <input type="text" required placeholder="Your name" className={inputClass} value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} />
                </Field>
                <Field label="Email">
                  <input type="email" required placeholder="you@company.com" className={inputClass} value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} />
                </Field>
                <Field label="Phone (optional)">
                  <input type="tel" placeholder="+92 300 1234567" className={inputClass} value={signupForm.phone} onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })} />
                </Field>
                <Field label="Password">
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} required minLength={8} placeholder="Min. 8 characters" className={inputClass} value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} />
                    <EyeToggle show={showPw} onClick={() => setShowPw((v) => !v)} />
                  </div>
                </Field>
                <Field label="I am a">
                  <div className="grid grid-cols-2 gap-2">
                    {[{ value: 'traveler', label: 'Traveler' }, { value: 'travel_agent', label: 'Travel Agent' }].map((r) => (
                      <button
                        type="button"
                        key={r.value}
                        onClick={() => setSignupForm({ ...signupForm, role: r.value })}
                        className={`py-2.5 rounded-[10px] text-[13.5px] font-semibold border transition ${signupForm.role === r.value ? `${BTN_GRADIENT} border-transparent` : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300'
                          }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </Field>
                <SubmitButton loading={loading} label="Create account" />
              </form>

              <p className="text-center mt-6 text-[13.5px] text-zinc-500 dark:text-zinc-400">
                Already have an account? <button onClick={() => setMode('login')} className={`font-bold ${ACCENT_TEXT}`}>Sign in</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthPageFallback />}>
      <AuthPageContent />
    </Suspense>
  );
}

function AuthPageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[12.5px] font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function EyeToggle({ show, onClick }) {
  return (
    <button type="button" onClick={onClick} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.25 h-4.25">
        {show ? (
          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.6 21.6 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.6 21.6 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24M1 1l22 22" />
        ) : (
          <>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </>
        )}
      </svg>
    </button>
  );
}

function SubmitButton({ loading, label }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-3.5 ${BTN_GRADIENT} disabled:opacity-60 rounded-[10px] text-[14.5px] font-bold ${BTN_GLOW}`}
    >
      {loading ? 'Please wait…' : label}
    </button>
  );
}
