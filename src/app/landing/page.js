'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  FiBriefcase,
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiHeart,
  FiMapPin,
  FiShoppingBag,
  FiVideo,
  FiArrowRight,
  FiCheck,
  FiStar,
  FiMail,
  FiTwitter,
  FiInstagram,
  FiUserPlus,
  FiGrid,
  FiChevronRight,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: FiUsers,
    title: 'Community',
    desc: 'Connect through forums, shared stories, and cultural discussions.',
    color: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    href: '/community',
  },
  {
    icon: FiBriefcase,
    title: 'Jobs Board',
    desc: 'Find career opportunities posted by and for the Habesha community.',
    color: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    href: '/jobs',
  },
  {
    icon: FiMapPin,
    title: 'Housing',
    desc: 'Apartments, rooms, and sublets from trusted community members.',
    color: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    href: '/housing',
  },
  {
    icon: FiCalendar,
    title: 'Events',
    desc: 'Cultural celebrations, meetups, concerts, and networking near you.',
    color: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    href: '/events',
  },
  {
    icon: FiShoppingBag,
    title: 'Marketplace',
    desc: 'Buy and sell habesha kemis, coffee, spices, art, and services.',
    color: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    href: '/marketplace',
  },
  {
    icon: FiHeart,
    title: 'Dating',
    desc: 'Find your match in the diaspora with heritage-first connections.',
    color: 'bg-pink-50',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    href: '/dating',
  },
  {
    icon: FiDollarSign,
    title: 'Remittance',
    desc: 'Send money home with a flat 1% fee and live exchange rates.',
    color: 'bg-teal-50',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    href: '/remittance',
  },
  {
    icon: FiVideo,
    title: 'Videos',
    desc: 'Short-form content — cooking, dance, fashion, and diaspora stories.',
    color: 'bg-indigo-50',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    href: '/videos',
  },
];

const HOW_IT_WORKS = [
  {
    icon: FiUserPlus,
    step: '01',
    title: 'Sign Up Free',
    desc: 'Create your account in seconds. No credit card required.',
  },
  {
    icon: FiUsers,
    step: '02',
    title: 'Connect with Community',
    desc: 'Find Habesha people in your city and join the conversation.',
  },
  {
    icon: FiGrid,
    step: '03',
    title: 'Access Everything',
    desc: 'Jobs, housing, events, dating, remittance — all in one place.',
  },
];

const TESTIMONIALS = [
  { name: 'Selam T.', location: 'Seattle, WA', heritage: 'Ethiopian', quote: 'I found my apartment, my first tech job, and my best friends here. Mahber is the community center the diaspora has always needed.', stars: 5 },
  { name: 'Berhane K.', location: 'Washington, DC', heritage: 'Eritrean', quote: 'Sending money home used to cost me $30+ in fees. With Mahber it\u2019s a flat 1\u0025. My family in Asmara gets more, and I spend less.', stars: 5 },
  { name: 'Fatima H.', location: 'Minneapolis, MN', heritage: 'Somali', quote: 'The immigration resources section literally changed my life. I found a lawyer who spoke my language and understood my case.', stars: 5 },
  { name: 'Dawit M.', location: 'Los Angeles, CA', heritage: 'Ethiopian', quote: 'I met my fianc\u00e9e on MahberMatch. We bonded over our shared Habesha values. This app gets us.', stars: 5 },
];

/* ------------------------------------------------------------------ */
/* Scroll observer hook                                                */
/* ------------------------------------------------------------------ */

function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const el = ref.current;
    if (el) {
      const children = el.querySelectorAll('.scroll-fade-in');
      children.forEach((child) => observer.observe(child));
      // Also observe the container itself
      if (el.classList.contains('scroll-fade-in')) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ------------------------------------------------------------------ */
/* Phone Mockup Component                                              */
/* ------------------------------------------------------------------ */

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] border-[6px] border-navy bg-navy p-1 shadow-2xl shadow-navy/30">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-navy" />
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2rem] bg-white">
          {/* Status bar */}
          <div className="flex items-center justify-between bg-navy px-5 pb-2 pt-8">
            <span className="text-[10px] font-medium text-white/80">9:41</span>
            <div className="flex gap-1">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <div className="h-2 w-3 rounded-sm bg-white/60" />
              <div className="h-2 w-4 rounded-sm bg-white/60" />
            </div>
          </div>

          {/* App header */}
          <div className="bg-white px-4 pb-3 pt-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-[10px] font-bold text-white">
                  M
                </div>
                <span className="text-sm font-bold text-navy">
                  Mah<span className="text-amber-500">ber</span>
                </span>
              </div>
              <div className="flex gap-2">
                <div className="h-5 w-5 rounded-full bg-gray-100" />
                <div className="h-5 w-5 rounded-full bg-gray-100" />
              </div>
            </div>
          </div>

          {/* Mini feed */}
          <div className="space-y-3 px-4 py-3">
            {/* Story row */}
            <div className="flex gap-3 overflow-hidden">
              {['S', 'D', 'F', 'B', 'M'].map((initial, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{
                      background: [
                        'linear-gradient(135deg, #F59E0B, #D97706)',
                        'linear-gradient(135deg, #078930, #059669)',
                        'linear-gradient(135deg, #DA121A, #DC2626)',
                        'linear-gradient(135deg, #4189DD, #3B82F6)',
                        'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                      ][i],
                    }}
                  >
                    {initial}
                  </div>
                  <span className="text-[8px] text-gray-400">
                    {['Selam', 'Dawit', 'Fatima', 'Berhane', 'Meron'][i]}
                  </span>
                </div>
              ))}
            </div>

            {/* Post 1 */}
            <div className="rounded-xl border border-gray-100 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[8px] font-bold text-white">
                  ST
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-800">Selam T.</p>
                  <p className="text-[8px] text-gray-400">2h ago</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-600 leading-relaxed">
                Just landed my dream job through Mahber! The community here is amazing 🎉
              </p>
              <div className="mt-2 flex gap-3">
                <span className="text-[8px] text-gray-400">❤️ 24</span>
                <span className="text-[8px] text-gray-400">💬 8</span>
              </div>
            </div>

            {/* Post 2 */}
            <div className="rounded-xl border border-gray-100 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-[8px] font-bold text-white">
                  DM
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-800">Dawit M.</p>
                  <p className="text-[8px] text-gray-400">5h ago</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-600 leading-relaxed">
                Anyone going to the Ethiopian New Year event in DC? 🇪🇹
              </p>
              <div className="mt-2 flex gap-3">
                <span className="text-[8px] text-gray-400">❤️ 42</span>
                <span className="text-[8px] text-gray-400">💬 15</span>
              </div>
            </div>
          </div>

          {/* Bottom nav */}
          <div className="flex items-center justify-around border-t border-gray-100 px-2 py-2">
            {['🏠', '💼', '🏪', '❤️', '💬'].map((emoji, i) => (
              <div
                key={i}
                className={`rounded-lg px-2 py-1 text-xs ${i === 0 ? 'bg-amber-50' : ''}`}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Glow effect */}
      <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-b from-amber-400/20 via-amber-500/10 to-transparent blur-2xl" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Feature Card                                                        */
/* ------------------------------------------------------------------ */

function FeatureCard({ feature }) {
  return (
    <Link href={feature.href} className="group block scroll-fade-in">
      <div className="relative h-full rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-gray-200/50">
        <div
          className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor} transition-transform duration-300 group-hover:scale-110`}
        >
          <feature.icon size={22} />
        </div>
        <h3 className="mb-1.5 text-base font-bold text-navy">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-gray-500">{feature.desc}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
          Explore <FiChevronRight size={14} />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  useAnalytics();
  const [email, setEmail] = useState('');
  const [ctaStatus, setCtaStatus] = useState('idle');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroRef = useScrollReveal();
  const proofRef = useScrollReveal();
  const featuresRef = useScrollReveal();
  const howRef = useScrollReveal();
  const testimonialsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  const submitCta = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email.trim()) return;
      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), source: 'landing' }),
        });
        const data = await res.json();
        setCtaStatus(
          !data.error && data.message !== 'Already on the waitlist!' ? 'success' : 'duplicate'
        );
        if (!data.error) setEmail('');
      } catch {
        setCtaStatus('duplicate');
      }
      setTimeout(() => setCtaStatus('idle'), 4000);
    },
    [email]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ── Ethiopian tricolor top accent ── */}
      <div className="flex h-0.5">
        <div className="flex-1 bg-habesha-green" />
        <div className="flex-1 bg-habesha-yellow" />
        <div className="flex-1 bg-habesha-red" />
      </div>

      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 font-bold text-white shadow-sm">
              M
            </div>
            <span className="text-xl font-bold text-navy">
              Mah<span className="text-amber-500">ber</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-gray-500 md:flex">
            <a href="#features" className="transition-colors hover:text-navy">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-navy">
              How It Works
            </a>
            <a href="#testimonials" className="transition-colors hover:text-navy">
              Community
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full px-5 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-navy sm:block"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-amber-600 hover:shadow-md"
            >
              Get Started Free
            </Link>
            {/* Mobile menu button */}
            <button
              className="ml-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-2">
              <a
                href="#features"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </a>
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-amber-100/40 blur-3xl" />
          <div className="absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-emerald-100/30 blur-3xl" />
        </div>

        <div
          ref={heroRef}
          className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-28"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column — Copy */}
            <div className="scroll-fade-in text-center lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700">
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                Built for the diaspora
              </div>

              <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-6xl">
                The Super App for the{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                    Habesha Diaspora
                  </span>
                </span>
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-gray-500 sm:text-xl lg:max-w-lg">
                Community, Jobs, Housing, Events, Marketplace, Dating, Remittance &amp; More — all
                in one place for <strong className="text-navy">Ethiopian</strong>,{' '}
                <strong className="text-navy">Eritrean</strong> &amp;{' '}
                <strong className="text-navy">Somali</strong> communities worldwide.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.98]"
                >
                  Get Started Free <FiArrowRight size={18} />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
                >
                  Sign In
                </Link>
              </div>

              <p className="mt-5 text-sm text-gray-400">
                Free forever. No credit card required.
              </p>
            </div>

            {/* Right column — Phone mockup */}
            <div className="scroll-fade-in flex justify-center lg:justify-end" style={{ transitionDelay: '200ms' }}>
              <div className="animate-float">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SOCIAL PROOF BAR                                              */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-y border-gray-100 bg-white py-8" ref={proofRef}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
            <div className="scroll-fade-in flex items-center gap-3">
              <div className="flex -space-x-2">
                {['bg-amber-500', 'bg-emerald-500', 'bg-blue-500', 'bg-purple-500'].map(
                  (bg, i) => (
                    <div
                      key={i}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white ${bg}`}
                    >
                      {['S', 'D', 'F', 'B'][i]}
                    </div>
                  )
                )}
              </div>
              <span className="text-sm font-semibold text-navy">
                Join <span className="text-amber-600">500+</span> community members
              </span>
            </div>

            <div className="scroll-fade-in hidden h-8 w-px bg-gray-200 sm:block" />

            <div className="scroll-fade-in flex items-center gap-2">
              <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-500">
                Shared with <strong className="font-semibold text-navy">350K+</strong> members in
                Facebook groups
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* FEATURES GRID                                                 */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-20 sm:py-28 bg-slate-50" ref={featuresRef}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="scroll-fade-in mb-14 text-center">
            <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
              Everything your community needs
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-500">
              Eight powerful tools in one platform — no more juggling a dozen apps and Facebook
              groups.
            </p>
          </div>

          <div className="stagger-children grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS                                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-white" ref={howRef}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="scroll-fade-in mb-16 text-center">
            <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
              Get started in minutes
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-500">
              Three simple steps to connect with your community.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-transparent lg:block" />

            <div className="stagger-children grid gap-10 lg:grid-cols-3 lg:gap-8">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={i} className="scroll-fade-in relative text-center">
                  {/* Number circle */}
                  <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-amber-50" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 shadow-lg shadow-amber-500/20">
                      <step.icon size={24} className="text-white" />
                    </div>
                    <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mx-auto max-w-xs text-sm text-gray-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


                {/* — Why Mahber — */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Why Mahber?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500 dark:text-gray-400">
              Other apps serve one need. We serve your whole community.
            </p>
          </div>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">Feature</th>
                  <th className="py-4 px-4 text-sm font-bold text-primary text-center">Mahber</th>
                  <th className="py-4 px-4 text-sm font-bold text-gray-400 text-center">Dendasho</th>
                  <th className="py-4 px-4 text-sm font-bold text-gray-400 text-center">Facebook Groups</th>
                  <th className="py-4 px-4 text-sm font-bold text-gray-400 text-center">Konjo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Jobs Board', true, true, false, false],
                  ['Housing & Rooms', true, true, true, false],
                  ['Marketplace', true, true, true, false],
                  ['Remittance (1% fee)', true, false, false, false],
                  ['Dating (MahberMatch)', true, false, false, true],
                  ['Events & Community', true, false, true, false],
                  ['Video Feed', true, false, false, false],
                  ['Translation (6 languages)', true, false, false, false],
                  ['Immigration Resources', true, false, false, false],
                  ['Somali Community', true, false, false, false],
                ].map(([feature, hh, den, fb, konjo], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-dark-800' : ''}>
                    <td className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">{feature}</td>
                    <td className="py-3 px-4 text-center">{hh ? <FiCheck className="inline text-habesha-green text-lg" /> : <span className="text-gray-300">—</span>}</td>
                    <td className="py-3 px-4 text-center">{den ? <FiCheck className="inline text-gray-400 text-lg" /> : <span className="text-gray-300">—</span>}</td>
                    <td className="py-3 px-4 text-center">{fb ? <FiCheck className="inline text-gray-400 text-lg" /> : <span className="text-gray-300">—</span>}</td>
                    <td className="py-3 px-4 text-center">{konjo ? <FiCheck className="inline text-gray-400 text-lg" /> : <span className="text-gray-300">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            10 tools in one platform — no other app comes close.
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="bg-gray-50/50 py-20 dark:bg-dark-900/50" ref={testimonialsRef}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Voices from the community
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500 dark:text-gray-400">
              Real stories from diaspora members who use Mahber every day.
            </p>
          </div>

          <div className="stagger-children grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="scroll-fade-in rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.stars }, (_, i) => (
                    <FiStar
                      key={i}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-bold text-white">
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* FINAL CTA                                                     */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white" ref={ctaRef}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="scroll-fade-in overflow-hidden rounded-3xl bg-navy p-10 text-center sm:p-14 relative">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-amber-500/10 blur-3xl" />

            {/* Flag accent */}
            <div className="relative mx-auto mb-8 flex h-1 max-w-[120px] overflow-hidden rounded-full">
              <div className="flex-1 bg-habesha-green" />
              <div className="flex-1 bg-habesha-yellow" />
              <div className="flex-1 bg-habesha-red" />
            </div>

            <h2 className="relative font-display text-3xl font-extrabold text-white sm:text-4xl">
              Join Mahber Today
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Is Mahber free to use?', a: 'Yes! Joining the waitlist and core features are completely free. Premium features like promoted listings may have optional fees in the future.' },
              { q: 'Who is Mahber for?', a: 'Mahber is built for the Ethiopian, Eritrean, and Somali diaspora worldwide. Whether you are in the US, Canada, Europe, or the Middle East, this platform is for you.' },
              { q: 'How is Mahber different from Facebook groups?', a: 'Unlike scattered Facebook groups, Mahber is an all-in-one platform with 10 dedicated tools: jobs, housing, marketplace, remittance, dating, events, videos, translation, immigration resources, and community forums.' },
              { q: 'How does the remittance feature work?', a: 'Mahber offers money transfers to Ethiopia, Eritrea, and Somalia with a flat 1% fee and live exchange rates. Much cheaper than traditional services that charge $15-30 per transfer.' },
              { q: 'Is my data safe?', a: 'Absolutely. We use industry-standard encryption and never sell your data. Your privacy and security are our top priority.' },
              { q: 'When will the app launch?', a: 'We are currently in beta! Join the waitlist to get early access and be among the first to experience the full platform.' },
            ].map((faq, i) => (
              <details key={i} className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-800 p-4">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900 dark:text-white">
                  {faq.q}
                  <FiChevronRight className="transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* FOOTER                                                        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-gray-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-sm font-bold text-white">
                  M
                </div>
                <span className="text-lg font-bold text-navy">
                  Mah<span className="text-amber-500">ber</span>
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                The all-in-one platform for the Ethiopian, Eritrean, and Somali diaspora.
              </p>
              <div className="mt-5 flex gap-2.5">
                {[FiTwitter, FiInstagram, FiMail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-amber-500 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-navy">Product</h4>
              <div className="space-y-2.5 text-sm text-gray-500">
                <Link href="/jobs" className="block transition-colors hover:text-amber-600">
                  Jobs Board
                </Link>
                <Link href="/housing" className="block transition-colors hover:text-amber-600">
                  Housing
                </Link>
                <Link href="/events" className="block transition-colors hover:text-amber-600">
                  Events
                </Link>
                <Link href="/marketplace" className="block transition-colors hover:text-amber-600">
                  Marketplace
                </Link>
                <Link href="/remittance" className="block transition-colors hover:text-amber-600">
                  Remittance
                </Link>
              </div>
            </div>

            {/* Community */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-navy">Community</h4>
              <div className="space-y-2.5 text-sm text-gray-500">
                <Link href="/community" className="block transition-colors hover:text-amber-600">
                  Forums
                </Link>
                <Link href="/dating" className="block transition-colors hover:text-amber-600">
                  MahberMatch
                </Link>
                <Link href="/videos" className="block transition-colors hover:text-amber-600">
                  Videos
                </Link>
                <Link href="/translation" className="block transition-colors hover:text-amber-600">
                  Translation
                </Link>
                <Link href="/immigration" className="block transition-colors hover:text-amber-600">
                  Immigration
                </Link>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-navy">Company</h4>
              <div className="space-y-2.5 text-sm text-gray-500">
                <Link href="/about" className="block transition-colors hover:text-amber-600">
                  About Us
                </Link>
                <Link href="/careers" className="block transition-colors hover:text-amber-600">
                  Careers
                </Link>
                <Link href="/privacy" className="block transition-colors hover:text-amber-600">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block transition-colors hover:text-amber-600">
                  Terms of Service
                </Link>
                <Link href="/contact" className="block transition-colors hover:text-amber-600">
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 dark:border-dark-700 sm:flex-row">
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Mahber. All rights reserved.</p>
            <div className="flex items-center gap-1.5">
              {/* Ethiopian tricolor micro-bar */}
              <span className="h-2 w-2 rounded-full bg-habesha-green" />
              <span className="h-2 w-2 rounded-full bg-habesha-yellow" />
              <span className="h-2 w-2 rounded-full bg-habesha-red" />
              <span className="ml-1 text-xs text-gray-400">Built for the culture</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
