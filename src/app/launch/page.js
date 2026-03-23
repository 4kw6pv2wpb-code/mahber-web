'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiArrowRight,
  FiCheck,
  FiMail,
  FiTwitter,
  FiInstagram,
  FiShare2,
  FiHeart,
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiVideo,
  FiUsers,
  FiShoppingBag,
  FiGlobe,
  FiMessageCircle,
} from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

/* ------------------------------------------------------------------ */
/* Waitlist helpers (shared with landing)                               */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/* Countdown                                                           */
/* ------------------------------------------------------------------ */

const LAUNCH_DATE = new Date('2026-04-01T00:00:00-07:00'); // April 1, 2026 PDT

function useCountdown(target) {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());
      setRemaining({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return remaining;
}

/* ------------------------------------------------------------------ */
/* Components                                                          */
/* ------------------------------------------------------------------ */

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-3xl font-extrabold text-white backdrop-blur-sm sm:h-24 sm:w-24 sm:text-4xl">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-2 text-xs font-medium uppercase tracking-wider text-white/60">{label}</span>
    </div>
  );
}

const LAUNCH_FEATURES = [
  { icon: FiBriefcase, label: 'Jobs' },
  { icon: FiUsers, label: 'Community' },
  { icon: FiDollarSign, label: 'Remittance' },
  { icon: FiCalendar, label: 'Events' },
  { icon: FiHeart, label: 'Dating' },
  { icon: FiMapPin, label: 'Housing' },
  { icon: FiShoppingBag, label: 'Marketplace' },
  { icon: FiVideo, label: 'Videos' },
  { icon: FiMessageCircle, label: 'Translation' },
  { icon: FiGlobe, label: 'Immigration' },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function LaunchPage() {
  useAnalytics();
  const countdown = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'launch' }),
      });
      const data = await res.json();
      const added = data.message !== 'Already on the waitlist!' && !data.error;
      setStatus(added ? 'success' : 'duplicate');
      if (added) setEmail('');
    } catch { setStatus('duplicate'); }
    setTimeout(() => setStatus('idle'), 4000);
  };

  const isLive = countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0;

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gray-900">
      {/* Decorative blurred circles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-habesha-green/15 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-eritrean-blue/10 blur-[120px]" />
      </div>

      {/* Tricolor top */}
      <div className="flex h-1">
        <div className="flex-1 bg-habesha-green" />
        <div className="flex-1 bg-habesha-yellow" />
        <div className="flex-1 bg-habesha-red" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white shadow-lg shadow-primary/30">M</div>
          <span className="text-2xl font-bold text-white">Mah<span className="text-primary">ber</span></span>
        </Link>

        {/* Headline */}
        {isLive ? (
          <>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-habesha-green/20 px-4 py-1.5 text-sm font-semibold text-habesha-green">
              <span className="flex h-2 w-2 rounded-full bg-habesha-green animate-pulse" />
              We&apos;re Live!
            </div>
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
              Mahber is{' '}
              <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">here</span>
            </h1>
          </>
        ) : (
          <>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Launching Soon
            </div>
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
              Something{' '}
              <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">big</span>{' '}
              is coming
            </h1>
          </>
        )}

        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
          The all-in-one platform for the Ethiopian, Eritrean &amp; Somali diaspora.
          Built by the community, for the community.
        </p>

        {/* Countdown */}
        {!isLive && (
          <div className="mt-10 flex gap-4 sm:gap-6">
            <CountdownUnit value={countdown.days} label="Days" />
            <CountdownUnit value={countdown.hours} label="Hours" />
            <CountdownUnit value={countdown.minutes} label="Min" />
            <CountdownUnit value={countdown.seconds} label="Sec" />
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 w-full max-w-lg">
          {isLive ? (
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Join Now — It&apos;s Free <FiArrowRight size={20} />
            </Link>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-gray-700 bg-gray-800 py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-full bg-primary px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-[0.98]"
              >
                {status === 'success' ? (
                  <span className="flex items-center gap-1.5"><FiCheck size={16} /> You&apos;re in!</span>
                ) : status === 'duplicate' ? (
                  'Already signed up!'
                ) : (
                  <span className="flex items-center gap-1.5">Notify Me <FiArrowRight size={16} /></span>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Features preview */}
        <div className="mt-14">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500">Launching with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {LAUNCH_FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-sm">
                <f.icon size={14} className="text-primary" />
                {f.label}
              </div>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mt-12 flex items-center gap-3">
          <span className="text-sm text-gray-500">Share the news:</span>
          <a href="#" className="rounded-full bg-white/10 p-2.5 text-gray-400 hover:bg-primary hover:text-white transition-colors"><FiTwitter size={16} /></a>
          <a href="#" className="rounded-full bg-white/10 p-2.5 text-gray-400 hover:bg-primary hover:text-white transition-colors"><FiInstagram size={16} /></a>
          <a href="#" className="rounded-full bg-white/10 p-2.5 text-gray-400 hover:bg-primary hover:text-white transition-colors"><FiShare2 size={16} /></a>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-gray-800 py-6 text-center">
        <div className="flex items-center justify-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-habesha-green" />
          <span className="h-2 w-2 rounded-full bg-habesha-yellow" />
          <span className="h-2 w-2 rounded-full bg-habesha-red" />
          <span className="ml-2 text-xs text-gray-500">&copy; {new Date().getFullYear()} Mahber — Built for the culture</span>
        </div>
      </div>
    </div>
  );
}
