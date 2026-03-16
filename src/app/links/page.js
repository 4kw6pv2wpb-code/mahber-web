'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiBriefcase,
  FiMapPin,
  FiHeart,
  FiShoppingBag,
  FiDollarSign,
  FiCalendar,
  FiVideo,
  FiUsers,
  FiGlobe,
  FiMessageCircle,
  FiArrowRight,
  FiCheck,
  FiMail,
  FiExternalLink,
} from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';


const LINKS = [
  { icon: FiBriefcase, label: 'Jobs Board', desc: 'Find Habesha community opportunities', href: '/jobs', color: 'from-primary to-amber-600' },
  { icon: FiMapPin, label: 'Housing', desc: 'Apartments & rooms from community members', href: '/housing', color: 'from-eritrean-blue to-blue-600' },
  { icon: FiHeart, label: 'HabeshaMatch Dating', desc: 'Meet someone who gets your culture', href: '/dating', color: 'from-accent to-pink-600' },
  { icon: FiShoppingBag, label: 'Marketplace', desc: 'Buy & sell within the community', href: '/marketplace', color: 'from-habesha-green to-emerald-600' },
  { icon: FiDollarSign, label: 'Send Money Home', desc: '1% flat fee — fast & transparent', href: '/remittance', color: 'from-primary to-amber-600' },
  { icon: FiCalendar, label: 'Events', desc: 'Cultural celebrations & networking', href: '/events', color: 'from-habesha-red to-red-600' },
  { icon: FiVideo, label: 'Videos', desc: 'Short-form Habesha content', href: '/videos', color: 'from-eritrean-blue to-indigo-600' },
  { icon: FiUsers, label: 'Community Forums', desc: 'Discussions & Q&A', href: '/community', color: 'from-habesha-green to-teal-600' },
  { icon: FiMessageCircle, label: 'Translation', desc: 'Amharic · Tigrinya · Oromo · Somali', href: '/translation', color: 'from-accent to-rose-600' },
  { icon: FiGlobe, label: 'Immigration Resources', desc: 'AI-powered guidance & lawyer directory', href: '/immigration', color: 'from-primary to-yellow-600' },
];

const SOCIALS = [
  { label: 'Instagram', handle: '@habeshahubapp', href: 'https://instagram.com/habeshahubapp', svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { label: 'TikTok', handle: '@habeshahubapp', href: 'https://tiktok.com/@habeshahubapp', svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
  { label: 'X / Twitter', handle: '@habeshahubapp', href: 'https://x.com/habeshahubapp', svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
];

export default function LinksPage() {
  useAnalytics();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [count, setCount] = useState(0);

  useEffect(() => { fetch('/api/waitlist').then(r=>r.json()).then(d=>setCount(d.count||0)).catch(()=>{}); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'links' }),
      });
      const data = await res.json();
      const added = data.message !== 'Already on the waitlist!' && !data.error;
      setStatus(added ? 'success' : 'duplicate');
      if (added) { setEmail(''); setCount(data.count || count + 1); }
    } catch { setStatus('duplicate'); }
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Tricolor */}
      <div className="flex h-1">
        <div className="flex-1 bg-habesha-green" /><div className="flex-1 bg-habesha-yellow" /><div className="flex-1 bg-habesha-red" />
      </div>

      {/* Decorative glows */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-habesha-green/10 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-md px-4 py-10">
        {/* Avatar + Bio */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-amber-600 text-3xl font-bold text-white shadow-xl shadow-primary/30">
            H
          </div>
          <h1 className="text-xl font-bold text-white">
            Habesha<span className="text-primary">Hub</span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">The Diaspora Super App</p>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">
            Jobs · Housing · Dating · Marketplace · Remittance · Events · Videos<br />
            Built by the community, for the community
          </p>
        </div>

        {/* Waitlist */}
        <form onSubmit={submit} className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Join the waitlist"
              className="w-full rounded-xl border border-gray-700 bg-gray-800/80 py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button type="submit" className="shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all">
            {status === 'success' ? <FiCheck size={18} /> : status === 'duplicate' ? '✓' : <FiArrowRight size={18} />}
          </button>
        </form>
        {status === 'success' && <p className="mb-4 -mt-4 text-center text-xs text-habesha-green">You&apos;re on the list!</p>}

        {/* Feature links */}
        <div className="space-y-2.5">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-800/50 p-3.5 backdrop-blur-sm transition-all hover:border-gray-600 hover:bg-gray-800/80 hover:shadow-lg active:scale-[0.98]"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${link.color} text-white shadow-sm`}>
                <link.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{link.label}</p>
                <p className="truncate text-xs text-gray-500">{link.desc}</p>
              </div>
              <FiExternalLink size={14} className="shrink-0 text-gray-600 transition-colors group-hover:text-primary" />
            </Link>
          ))}
        </div>

        {/* Social links */}
        <div className="mt-8 border-t border-gray-800 pt-6">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-gray-600">Follow us</p>
          <div className="flex justify-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20"
                title={`${s.label}: ${s.handle}`}
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-xs text-gray-600 hover:text-primary transition-colors">
            habeshahub.com
          </Link>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-habesha-green" />
            <span className="h-1.5 w-1.5 rounded-full bg-habesha-yellow" />
            <span className="h-1.5 w-1.5 rounded-full bg-habesha-red" />
          </div>
        </div>
      </div>
    </div>
  );
}
