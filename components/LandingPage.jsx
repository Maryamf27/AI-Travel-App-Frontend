'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { BTN_GRADIENT, BTN_GLOW, ACCENT_TEXT, ACCENT_BG_SOFT, ACCENT_BORDER_SOFT } from '../lib/uiTokens';

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors overflow-x-hidden">
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <TrustBar />
      <Features />
      <Roles />
      <Dashboards />
      <CtaBanner />
      <Footer />
    </div>
  );
}

// Navbar
function Nav({ menuOpen, setMenuOpen }) {
  const anchorLinks = ['Features', 'Roles', 'Dashboard'];
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-slate-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-8 h-8 rounded-[9px] bg-teal-500 dark:bg-teal-400 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <path d="M2 12h20M12 2c2.5 2.7 4 6.4 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.4-4-10s1.5-7.3 4-10z" />
            </svg>
          </div>
          <span className="text-[16px] sm:text-[17px] font-semibold font-[Space_Grotesk]">
            Travel<span className={ACCENT_TEXT}>AI</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {anchorLinks.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[14px] font-medium text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition">
              {l}
            </a>
          ))}
          <Link href="/pricing" className="text-[14px] font-medium text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle  />

          <Link href="/login" className="hidden sm:inline-block text-[14px] font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition">
            Log in
          </Link>
          <Link
            href="/signup"
            className={`hidden sm:inline-flex items-center gap-1.5 ${BTN_GRADIENT} text-[13.5px] font-bold px-4 py-2.5 rounded-[10px] ${BTN_GLOW}`}
          >
            Get started free
          </Link>

          {/* mobile hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-900 px-4 sm:px-6 py-4 space-y-3 bg-white dark:bg-slate-950">
          {anchorLinks.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block text-[14.5px] font-medium text-slate-600 dark:text-slate-300"
            >
              {l}
            </a>
          ))}
          <Link
            href="/pricing"
            onClick={() => setMenuOpen(false)}
            className="block text-[14.5px] font-medium text-slate-600 dark:text-slate-300"
          >
            Pricing
          </Link>
          <div className="flex items-center gap-3 pt-2">
            <Link href="/login" className="flex-1 text-center text-[14px] font-semibold py-2.5 rounded-[10px] border border-slate-200 dark:border-slate-800">
              Log in
            </Link>
            <Link href="/signup" className={`flex-1 text-center ${BTN_GRADIENT} text-[14px] font-bold py-2.5 rounded-[10px]`}>
              Get started free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-30"
        style={{ background: 'radial-gradient(60% 50% at 85% 10%, rgba(6,182,212,0.14) 0%, transparent 60%)' }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-10 lg:gap-16 justify-center items-center relative">
        <div>
          <div className={`inline-flex items-center gap-2 ${ACCENT_BG_SOFT} border ${ACCENT_BORDER_SOFT} rounded-full px-3.5 py-1.5 mb-5 sm:mb-6`}>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-500" />
            <span className="text-[11.5px] sm:text-[12.5px] font-semibold text-teal-700 dark:text-teal-400">Enterprise Travel Platform</span>
          </div>

          <h1 className="text-[34px] leading-[1.12]  sm:text-5xl sm:leading-[1.08] font-semibold font-[Space_Grotesk] mb-5 sm:mb-6">
            Your whole trip,
            <br />
            planned by <span className={ACCENT_TEXT}>AI.</span>
          </h1>

          <p className="text-[15px] sm:text-[16.5px] leading-relaxed text-slate-600 dark:text-slate-400 max-w-md mb-8 sm:mb-9">
            Itineraries, hotels, flights, budgets, and safety scores — generated
            in seconds and managed in one place. Built for travelers and travel agents.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/signup"
              className={`inline-flex items-center gap-2 ${BTN_GRADIENT} text-[14.5px] sm:text-[15px] font-bold px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl ${BTN_GLOW}`}
            >
              Get started for free
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-semibold text-slate-700 dark:text-slate-300 px-2 py-3 sm:py-3.5 hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              Already have an account? Log in
            </Link>
          </div>

          <p className="text-[12px] sm:text-[12.5px] text-slate-400 dark:text-slate-600 mt-4 sm:mt-5">No credit card required · Free for travelers</p>
        </div>

        <div className="relative h-80 sm:h-96 lg:h-105 hidden lg:block">
          <div
            className="absolute inset-0 rounded-[28px] border border-teal-100 dark:border-slate-800 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1763455892848-39bbc7ca90a0?auto=format&fit=crop&w=1200&q=80')" }}
          >
            <div className="absolute inset-0 rounded-[28px] bg-linear-to-br from-white/10 via-white/0 to-white/30 dark:from-slate-950/40 dark:via-slate-950/10 dark:to-slate-950/50" />
          </div>

          <div className="absolute top-8 left-8 right-16 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-5 -rotate-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">Trip to</p>
                <p className="text-lg font-semibold font-[Space_Grotesk]">Bali, Indonesia</p>
              </div>
              <span className="text-[11px] font-bold bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 px-2.5 py-1 rounded-full">Day 2 of 5</span>
            </div>
            <div className="space-y-3">
              <ItineraryRow time="8:00 AM" title="Sunrise trek — Mt. Batur" tag="Adventure" />
              <ItineraryRow time="1:00 PM" title="Ubud rice terrace lunch" tag="Food" />
              <ItineraryRow time="4:30 PM" title="Tegallalang photo stop" tag="Nature" />
            </div>
          </div>

          <div className="absolute bottom-10 right-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-4 w-52 rotate-3">
            <p className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2">AI Safety Score</p>
            <div className="flex items-end gap-1.5 mb-2">
              <span className={`text-2xl font-bold font-[Space_Grotesk] ${ACCENT_TEXT}`}>92</span>
              <span className="text-xs text-slate-400 mb-1">/100</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full w-[92%] bg-teal-600 dark:bg-teal-600/80 rounded-full" />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Low crime · No advisories</p>
          </div>

          <div className="absolute bottom-6 left-4 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 px-3.5 py-2.5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-950/40 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Budget used</p>
              <p className="text-[13px] font-bold">$840 / $1,200</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ItineraryRow({ time, title, tag }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11.5px] font-semibold text-slate-400 dark:text-slate-500 w-15.5 shrink-0">{time}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
      <span className="text-[13px] font-medium flex-1">{title}</span>
      <span className="text-[10.5px] font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 px-2 py-0.5 rounded-full shrink-0">{tag}</span>
    </div>
  );
}

// Trust bar
function TrustBar() {
  const stats = [
    ['120k+', 'Itineraries generated'],
    ['4,800', 'Verified travel agents'],
    ['98.6%', 'Safety score accuracy'],
    ['20', 'Platform modules'],
  ];
  return (
    <section className="border-y border-slate-100 dark:border-slate-900 bg-slate-100 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto text-center  px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {stats.map(([num, label]) => (
          <div key={label}>
            <p className="text-xl sm:text-2xl font-semibold font-[Space_Grotesk] text-slate-900 dark:text-slate-50">{num}</p>
            <p className="text-[11.5px] sm:text-[12.5px] text-slate-500 dark:text-slate-400 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Features
const FEATURE_LIST = [
  { icon: 'sparkle', title: 'AI Trip Planner', desc: 'Full itinerary, daily schedule, expenses, and packing list — generated from your destination, budget, and interests.' },
  { icon: 'hotel', title: 'Smart Hotel & Flight Search', desc: 'Filter by price, rating, and amenities; AI summarizes reviews and compares prices across airlines.' },
  { icon: 'map', title: 'Interactive Maps', desc: 'Attractions, hotels, hospitals, and metro stations on one map, with walking, driving, and transit modes.' },
  { icon: 'wallet', title: 'Budget & Expense Tracking', desc: 'Estimate costs before you go, then track daily spending and remaining budget in real time.' },
  { icon: 'vault', title: 'Travel Document Vault', desc: 'Securely store passports, visas, tickets, insurance, and vaccination certificates in one place.' },
  { icon: 'chat', title: 'AI Chatbot', desc: 'Ask anything — "what should I do on day 2," "is it safe tonight," or "translate this phrase."' },
  { icon: 'shield', title: 'AI Safety Score', desc: 'Crime level, weather risk, health advisories, and local scam warnings, scored per destination.' },
  { icon: 'cloud', title: 'Weather Forecast', desc: 'Hourly and 7-day forecasts with rain alerts, UV index, humidity, and air quality.' },
];

function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-xl mb-10 sm:mb-14">
        <p className={`text-[11px] sm:text-[12px] uppercase tracking-[2px] font-semibold ${ACCENT_TEXT} mb-3`}>Core features</p>
        <h2 className="text-2xl sm:text-3xl font-semibold font-[Space_Grotesk] mb-3">Everything a trip needs</h2>
        <p className="text-slate-500 dark:text-slate-400 text-[14px] sm:text-[15px]">
          From AI itinerary generation to real-time emergency guides — here are the ones travelers use most.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {FEATURE_LIST.map((f) => (
          <div
            key={f.title}
            className="group rounded-2xl border border-slate-100 dark:border-slate-900 bg-slate-100 dark:bg-slate-900/40 p-5 sm:p-6 hover:border-teal-300 dark:hover:border-teal-900/60 hover:shadow-lg transition"
          >
            <div className="w-10 h-10 rounded-[10px] bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center mb-4 group-hover:bg-teal-500 dark:group-hover:bg-teal-400 transition">
              <FeatureIcon name={f.icon} />
            </div>
            <h3 className="text-[15px] font-semibold mb-1.5 font-[Space_Grotesk]">{f.title}</h3>
            <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureIcon({ name }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', className: 'w-5 h-5 text-teal-600 dark:text-teal-400 group-hover:text-white transition' };
  const paths = {
    sparkle: <path d="M12 2l1.9 5.5L19 9.5l-5.1 2L12 17l-1.9-5.5L5 9.5l5.1-2L12 2z" />,
    hotel: <><path d="M3 21h18M4 21V9l8-6 8 6v12" /><path d="M9 21v-6h6v6" /></>,
    map: <><path d="M9 4l6 2 5-2v16l-5 2-6-2-5 2V6l5-2z" /><path d="M9 4v16M15 6v16" /></>,
    wallet: <><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M16 12h.01M2 10h20" /></>,
    vault: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="12" cy="12" r="3" /></>,
    chat: <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 20l1-4.5A8.5 8.5 0 1 1 21 11.5z" />,
    shield: <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />,
    cloud: <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A4.5 4.5 0 0 0 6.5 19h11z" />,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

// Roles
const ROLES = [
  {
    name: 'Traveler',
    tagline: 'Plan, book, and travel smarter',
    items: ['Create trips & get AI itineraries', 'Hotel & flight recommendations', 'Track budget & bookmarks', 'Upload travel documents'],
    image: 'https://images.unsplash.com/photo-1771002382315-9be24abde4e4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Travel Agent',
    tagline: 'Build packages, manage customers',
    items: ['Create custom travel packages', 'Manage customers & offer discounts', 'Chat directly with travelers', 'View bookings on your packages'],
    image: 'https://images.unsplash.com/photo-1776001096399-af33d23cfce3?auto=format&fit=crop&w=1200&q=80',
  },
];

function Roles() {
  return (
    <section id="roles" className="bg-slate-50/60 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-xl mb-10 sm:mb-14">
          <p className={`text-[11px] sm:text-[12px] uppercase tracking-[2px] font-semibold ${ACCENT_TEXT} mb-3`}>Built for every role</p>
          <h2 className="text-2xl sm:text-3xl font-semibold font-[Space_Grotesk] mb-3">One platform, two roles</h2>
          <p className="text-slate-500 dark:text-slate-400 text-[14px] sm:text-[15px]">Travelers and travel agents each get a dedicated set of tools.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-7xl  ">
          {ROLES.map((r, i) => (
            <div
              key={r.name}
              className="relative overflow-hidden rounded-2xl p-6 sm:p-7 border border-transparent text-white bg-cover bg-center"
              style={{ backgroundImage: `url('${r.image}')` }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-slate-950/90 via-slate-950/75 to-slate-950/40" />
              <div className="relative">
                <span className={`inline-block text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mb-4 bg-white/15 text-white`}>
                  Role {i + 1}
                </span>
                <h3 className="text-xl font-semibold font-[Space_Grotesk] mb-1 text-white">{r.name}</h3>
                <p className="text-[13.5px] mb-5 text-white/70">{r.tagline}</p>
                <ul className="space-y-2.5">
                  {r.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[13.5px]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 shrink-0 text-teal-300">
                        <path d="M5 12l4 4 10-10" />
                      </svg>
                      <span className="text-white/90">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Dashboard
function Dashboards() {
  return (
    <section id="dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
        <p className={`text-[11px] sm:text-[12px] uppercase tracking-[2px] font-semibold ${ACCENT_TEXT} mb-3`}>Your dashboard</p>
        <h3 className="text-2xl sm:text-3xl font-semibold font-[Space_Grotesk] mb-3 sm:mb-4">Everything about your trip, at a glance</h3>
        <p className="text-slate-500 dark:text-slate-400 text-[14px] sm:text-[14.5px] leading-relaxed">
          Upcoming trips, budget overview, recent bookings, saved places, travel history, and AI suggestions — all on one screen.
        </p>
      </div>
      <div className="max-w-2xl mx-auto rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {['Upcoming trips', 'Budget overview', 'Recent bookings', 'Saved places', 'Travel history', 'AI suggestions'].map((m) => (
          <div key={m} className="flex items-center gap-2.5 text-[13px] sm:text-[13.5px] font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 rounded-xl px-3 py-2.5 border border-slate-100 dark:border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-500 shrink-0" />
            {m}
          </div>
        ))}
      </div>
    </section>
  );
}

// CTA Banner
function CtaBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
      <div
        className="relative overflow-hidden rounded-[28px] px-6 sm:px-10 py-12 sm:py-16 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551963838-0598cc18d5e4?auto=format&fit=crop&w=1600&q=80')" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#020617]/90 via-[#0E7490]/80 to-[#020617]/90" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(60% 80% at 50% 0%, rgba(6,182,212,0.35) 0%, transparent 60%)' }}
        />
        <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-semibold font-[Space_Grotesk] text-white mb-4">
          Start planning your next trip today
        </h2>
        <p className="relative text-white/65 text-[14px] sm:text-[15px] max-w-md mx-auto mb-7 sm:mb-8">
          Free for travelers. No credit card required. Your first AI itinerary takes under a minute.
        </p>
        <Link
          href="/signup"
          className={`relative inline-flex items-center gap-2 ${BTN_GRADIENT} text-[14.5px] sm:text-[15px] font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-[0_8px_24px_rgba(6,182,212,0.3)] dark:shadow-[0_8px_24px_rgba(8,145,178,0.2)]`}
        >
          Get started for free
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[7px] bg-teal-500 dark:bg-teal-400 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M2 12h20M12 2c2.5 2.7 4 6.4 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.4-4-10s1.5-7.3 4-10z" />
            </svg>
          </div>
          <span className="text-[13.5px] font-semibold font-[Space_Grotesk]">
            Travel<span className={ACCENT_TEXT}>AI</span>
          </span>
        </div>
        <p className="text-[12px] sm:text-[12.5px] text-slate-400 dark:text-slate-600">© {new Date().getFullYear()} TravelAI. All rights reserved.</p>
      </div>
    </footer>
  );
}
