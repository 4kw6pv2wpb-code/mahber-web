'use client';

import { useState, useEffect } from 'react';
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
  FiMessageCircle,
  FiGlobe,
  FiArrowRight,
  FiCheck,
  FiStar,
  FiMail,
  FiTwitter,
  FiInstagram,
  FiChevronRight,
} from 'react-icons/fi';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const FEATURES = [
  { icon: FiBriefcase, title: 'Jobs Board', desc: 'Find career opportunities posted by and for the Habesha community across the diaspora.', color: 'from-primary/20 to-amber-100 dark:from-primary/10 dark:to-amber-900/10', iconColor: 'text-primary', href: '/jobs' },
  { icon: FiUsers, title: 'Community', desc: 'Connect through discussion forums, Q\u0026A, and shared stories of the diaspora experience.', color: 'from-habesha-green/20 to-emerald-100 dark:from-habesha-green/10 dark:to-emerald-900/10', iconColor: 'text-habesha-green', href: '/community' },
  { icon: FiDollarSign, title: 'Remittance', desc: 'Send money home with a flat 1\u0025 fee and live exchange rates. Fast, transparent, and affordable.', color: 'from-eritrean-blue/20 to-blue-100 dark:from-eritrean-blue/10 dark:to-blue-900/10', iconColor: 'text-eritrean-blue', href: '/remittance' },
  { icon: FiCalendar, title: 'Events', desc: 'Discover cultural celebrations, meetups, concerts, and networking events near you.', color: 'from-accent/20 to-pink-100 dark:from-accent/10 dark:to-pink-900/10', iconColor: 'text-accent', href: '/events' },
  { icon: FiHeart, title: 'HabeshaMatch', desc: 'Find your other half in the diaspora. Swipe, match, and connect with heritage in mind.', color: 'from-habesha-red/20 to-red-100 dark:from-habesha-red/10 dark:to-red-900/10', iconColor: 'text-habesha-red', href: '/dating' },
  { icon: FiMapPin, title: 'Housing', desc: 'Apartments, rooms, and sublets from community members. Find your next home with people you trust.', color: 'from-primary/20 to-amber-100 dark:from-primary/10 dark:to-amber-900/10', iconColor: 'text-primary', href: '/housing' },
  { icon: FiShoppingBag, title: 'Marketplace', desc: 'Buy and sell habesha kemis, coffee, spices, art, and services within the community.', color: 'from-habesha-green/20 to-emerald-100 dark:from-habesha-green/10 dark:to-emerald-900/10', iconColor: 'text-habesha-green', href: '/marketplace' },
  { icon: FiVideo, title: 'Videos', desc: 'Short-form video feed — cooking tutorials, dance challenges, fashion, and diaspora stories.', color: 'from-eritrean-blue/20 to-blue-100 dark:from-eritrean-blue/10 dark:to-blue-900/10', iconColor: 'text-eritrean-blue', href: '/videos' },
  { icon: FiMessageCircle, title: 'Translation', desc: 'Translate between English, Amharic, Tigrinya, Oromo, Somali, and Arabic instantly.', color: 'from-accent/20 to-pink-100 dark:from-accent/10 dark:to-pink-900/10', iconColor: 'text-accent', href: '/translation' },
  { icon: FiGlobe, title: 'Immigration', desc: 'AI-powered immigration guidance, resource library, and a directory of community attorneys.', color: 'from-habesha-red/20 to-red-100 dark:from-habesha-red/10 dark:to-red-900/10', iconColor: 'text-habesha-red', href: '/immigration' },
];

const STATS = [
  { value: '2M+', label: 'Diaspora Reached' },
  { value: '$6B+', label: 'Remittance Market' },
  { value: '5', label: 'Countries Supported' },
  { value: '4', label: 'Languages' },
];

const TESTIMONIALS = [
  { name: 'Selam T.', location: 'Seattle, WA', heritage: 'Ethiopian', quote: 'I found my apartment, my first tech job, and my best friends here. HabeshaHub is the community center the diaspora has always needed.', stars: 5 },
  { name: 'Berhane K.', location: 'Washington, DC', heritage: 'Eritrean', quote: 'Sending money home used to cost me $30+ in fees. With HabeshaHub it\u2019s a flat 1\u0025. My family in Asmara gets more, and I spend less.', stars: 5 },
  { name: 'Fatima H.', location: 'Minneapolis, MN', heritage: 'Somali', quote: 'The immigration resources section literally changed my life. I found a lawyer who spoke my language and understood my case.', stars: 5 },
  { name: 'Dawit M.', location: 'Los Angeles, CA', heritage: 'Ethiopian', quote: 'I met my fianc\u00e9e on HabeshaMatch. We bonded over our shared Habesha values. This app gets us.', stars: 5 },
];

/* ------------------------------------------------------------------ */
/* Waitlist helpers                                                     */
/* ------------------------------------------------------------------ */

const WAITLIST_KEY = 'habeshahub_waitlist';

function getWaitlist() {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(WAITLIST_KEY) || '[]'); } catch { return []; }
}
function addToWaitlist(email) {
  const list = getWaitlist();
  if (list.some((e) => e.email === email)) return false;
  list.push({ email, ts: new Date().toISOString() });
  localStorage.setItem(WAITLIST_KEY, JSON.stringify(list));
  return true;
}

/* ------------------------------------------------------------------ */
/* Components                                                          */
/* ------------------------------------------------------------------ */

function WaitlistForm({ size = 'lg' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success | duplicate

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    const added = addToWaitlist(email.trim());
    setStatus(added ? 'success' : 'duplicate');
    if (added) setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  const isLg = size === 'lg';

  return (
    <form onSubmit={submit} className={`flex w-full ${isLg ? 'max-w-xl' : 'max-w-md'} flex-col gap-3 sm:flex-row`}>
      <div className="relative flex-1">
        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={isLg ? 20 : 16} />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`w-full rounded-full border border-gray-200 bg-white py-3 pr-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 ${isLg ? 'pl-12 text-base' : 'pl-10 text-sm'}`}
        />
      </div>
      <button
        type="submit"
        className={`shrink-0 rounded-full bg-primary font-semibold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] ${isLg ? 'px-8 py-3 text-base' : 'px-6 py-3 text-sm'}`}
      >
        {status === 'success' ? (
          <span className="flex items-center gap-1.5"><FiCheck size={16} /> You&apos;re on the list!</span>
        ) : status === 'duplicate' ? (
          'Already signed up!'
        ) : (
          <span className="flex items-center gap-1.5">Join the Waitlist <FiArrowRight size={16} /></span>
        )}
      </button>
    </form>
  );
}

function FeatureCard({ feature }) {
  return (
    <Link href={feature.href} className="group block">
      <div className={`rounded-2xl bg-gradient-to-br ${feature.color} p-6 transition-all hover:shadow-lg hover:-translate-y-1`}>
        <div className={`mb-4 inline-flex rounded-xl bg-white/80 p-3 shadow-sm dark:bg-dark-800/80 ${feature.iconColor}`}>
          <feature.icon size={24} />
        </div>
        <h3 className="mb-1.5 text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{feature.desc}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
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
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    setWaitlistCount(getWaitlist().length);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* ── Ethiopian tricolor top bar ── */}
      <div className="flex h-1">
        <div className="flex-1 bg-habesha-green" />
        <div className="flex-1 bg-habesha-yellow" />
        <div className="flex-1 bg-habesha-red" />
      </div>

      {/* ── Nav ── */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-dark-800 dark:bg-dark-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-white">H</div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Habesha<span className="text-primary">Hub</span></span>
          </Link>
          <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400 md:flex">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#stats" className="hover:text-primary transition-colors">Impact</a>
            <a href="#community" className="hover:text-primary transition-colors">Community</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-800 sm:block">
              Log In
            </Link>
            <Link href="/register" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Decorative bg */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-habesha-green/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-eritrean-blue/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 text-center sm:pt-24 md:pt-32">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            Now launching — join the movement
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
            The Diaspora{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary via-amber-500 to-primary bg-clip-text text-transparent">
                Super App
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/10 rounded-full" />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
            Connecting <strong className="text-gray-900 dark:text-white">Ethiopian</strong>,{' '}
            <strong className="text-gray-900 dark:text-white">Eritrean</strong> &amp;{' '}
            <strong className="text-gray-900 dark:text-white">Somali</strong> communities worldwide.
            Jobs, housing, events, remittance, dating, and more — built by the community, for the community.
          </p>

          {/* Waitlist form */}
          <div className="mt-10 flex justify-center">
            <WaitlistForm size="lg" />
          </div>
          <p className="mt-3 text-sm text-gray-400">
            {waitlistCount > 0 ? `${waitlistCount.toLocaleString()} people on the waitlist` : 'Free to join. No spam, ever.'}
          </p>

          {/* Flag colors divider */}
          <div className="mx-auto mt-16 flex h-1 max-w-xs overflow-hidden rounded-full">
            <div className="flex-1 bg-habesha-green" />
            <div className="flex-1 bg-habesha-yellow" />
            <div className="flex-1 bg-habesha-red" />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="bg-gray-50/50 py-20 dark:bg-dark-900/50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Everything your community needs
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500 dark:text-gray-400">
              Ten powerful tools in one platform — no more juggling a dozen apps and Facebook groups.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section id="stats" className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 px-8 py-14 shadow-2xl dark:from-dark-800 dark:to-dark-900">
            {/* Subtle flag accent */}
            <div className="mx-auto mb-10 flex h-1 max-w-xs overflow-hidden rounded-full opacity-40">
              <div className="flex-1 bg-habesha-green" />
              <div className="flex-1 bg-habesha-yellow" />
              <div className="flex-1 bg-habesha-red" />
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">{s.value}</p>
                  <p className="mt-1 text-sm font-medium text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


                {/* — Why HabeshaHub — */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Why HabeshaHub?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500 dark:text-gray-400">
              Other apps serve one need. We serve your whole community.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">Feature</th>
                  <th className="py-4 px-4 text-sm font-bold text-primary text-center">HabeshaHub</th>
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
                  ['Dating (HabeshaMatch)', true, false, false, true],
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
      <section id="community" className="bg-gray-50/50 py-20 dark:bg-dark-900/50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Voices from the community
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500 dark:text-gray-400">
              Real stories from diaspora members who use HabeshaHub every day.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-dark-700 dark:bg-dark-800">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.stars }, (_, i) => (
                    <FiStar key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.location} · {t.heritage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Ready to join your community?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500 dark:text-gray-400">
            Sign up today and be part of the movement connecting millions across the Horn of Africa diaspora.
          </p>
          <div className="mt-8 flex justify-center">
            <WaitlistForm size="lg" />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><FiCheck size={14} className="text-habesha-green" /> Free to join</span>
            <span className="flex items-center gap-1.5"><FiCheck size={14} className="text-habesha-green" /> No credit card</span>
            <span className="flex items-center gap-1.5"><FiCheck size={14} className="text-habesha-green" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-gray-50 dark:border-dark-800 dark:bg-dark-900">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-white text-sm">H</div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">Habesha<span className="text-primary">Hub</span></span>
              </Link>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                The all-in-one platform for the Ethiopian, Eritrean, and Somali diaspora.
              </p>
              <div className="mt-4 flex gap-3">
                <a href="#" className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-primary hover:text-white transition-colors dark:bg-dark-700 dark:text-gray-400"><FiTwitter size={16} /></a>
                <a href="#" className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-primary hover:text-white transition-colors dark:bg-dark-700 dark:text-gray-400"><FiInstagram size={16} /></a>
                <a href="#" className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-primary hover:text-white transition-colors dark:bg-dark-700 dark:text-gray-400"><FiMail size={16} /></a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Platform</h4>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/jobs" className="block hover:text-primary">Jobs Board</Link>
                <Link href="/housing" className="block hover:text-primary">Housing</Link>
                <Link href="/events" className="block hover:text-primary">Events</Link>
                <Link href="/marketplace" className="block hover:text-primary">Marketplace</Link>
                <Link href="/remittance" className="block hover:text-primary">Remittance</Link>
              </div>
            </div>

            {/* Community */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Community</h4>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/community" className="block hover:text-primary">Forums</Link>
                <Link href="/dating" className="block hover:text-primary">HabeshaMatch</Link>
                <Link href="/videos" className="block hover:text-primary">Videos</Link>
                <Link href="/translation" className="block hover:text-primary">Translation</Link>
                <Link href="/immigration" className="block hover:text-primary">Immigration</Link>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Company</h4>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <a href="#" className="block hover:text-primary">About Us</a>
                <a href="#" className="block hover:text-primary">Careers</a>
                <a href="#" className="block hover:text-primary">Privacy Policy</a>
                <a href="#" className="block hover:text-primary">Terms of Service</a>
                <a href="#" className="block hover:text-primary">Contact</a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 dark:border-dark-700 sm:flex-row">
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} HabeshaHub. All rights reserved.</p>
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
