'use client';

import Link from 'next/link';
import { FiArrowLeft, FiTrendingUp, FiUsers, FiDollarSign, FiGlobe, FiLayers, FiBarChart2, FiMail, FiCalendar } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';
import Footer from '@/components/Footer';

const METRICS = [
  { label: 'TAM (Remittance)', value: '$6B+', sub: 'Annual Ethiopia remittance', icon: FiDollarSign },
  { label: 'TAM (Marketplace)', value: '$2B+', sub: 'Diaspora commerce', icon: FiTrendingUp },
  { label: 'US Diaspora', value: '2M+', sub: 'Ethiopian & Eritrean', icon: FiUsers },
  { label: 'Addressable Users', value: '900K', sub: 'Top 5 US metros', icon: FiGlobe },
];

const FEATURES = [
  { name: 'Jobs Board', status: 'Live', desc: 'Community-relevant job listings' },
  { name: 'Housing', status: 'Live', desc: 'Verified apartments & rooms' },
  { name: 'Events', status: 'Live', desc: 'Cultural events & networking' },
  { name: 'Marketplace', status: 'Live', desc: 'Community commerce' },
  { name: 'Dating', status: 'Live', desc: 'Culturally-aware matching' },
  { name: 'Community Forums', status: 'Live', desc: 'Discussions & Q&A' },
  { name: 'Remittance', status: 'Beta', desc: '1% flat fee transfers' },
  { name: 'Edir/Equb Groups', status: 'Q3 2026', desc: 'Traditional savings digitized' },
];

const TIMELINE = [
  { q: 'Q2 2026', title: 'Public Launch', items: ['Core features live', 'First 10K users', 'Seed round'] },
  { q: 'Q3 2026', title: 'Financial Services', items: ['Remittance live', 'Edir/Equb groups', 'Pro subscriptions'] },
  { q: 'Q4 2026', title: 'Scale', items: ['50K users', 'Revenue generating', 'Series A prep'] },
  { q: '2027', title: 'Expand', items: ['Mobile apps', 'Other diasporas', '$10M+ ARR target'] },
];

export default function InvestorsPage() {
  useAnalytics();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex h-1">
        <div className="flex-1 bg-green-600" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-red-600" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-sm">
          <FiArrowLeft /> Back to HabeshaHub
        </Link>

        {/* Hero */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
            <FiBarChart2 size={14} /> Investor Relations
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The super app for the<br />
            <span className="text-amber-400">$8B+ Habesha diaspora market</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            2M+ diaspora in the US. $6B+ in annual remittance. Zero purpose-built platforms.
            HabeshaHub is building the digital infrastructure for Africa&apos;s largest underserved diaspora.
          </p>
        </div>

        {/* Market metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <m.icon className="text-amber-400 mb-3" size={24} />
              <div className="text-3xl font-bold text-amber-400 mb-1">{m.value}</div>
              <div className="text-sm font-medium text-white">{m.label}</div>
              <div className="text-xs text-gray-500">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* The Problem / Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">The Problem</h2>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>• Community needs scattered across 50+ Facebook groups per city</li>
              <li>• No search, no verification, no trust signals</li>
              <li>• Remittance fees averaging 8-15% ($500M+ wasted annually)</li>
              <li>• Zero culturally-intelligent digital products</li>
              <li>• Second-gen diaspora demanding modern solutions</li>
            </ul>
          </div>
          <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 text-green-400">HabeshaHub Solution</h2>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>• All-in-one super app: jobs, housing, events, marketplace, dating, remittance</li>
              <li>• Community trust scores and verified listings</li>
              <li>• 1% flat remittance fee (saving $450M+ vs. incumbents)</li>
              <li>• Built by Habesha, for Habesha — deep cultural understanding</li>
              <li>• Network effects across every feature vertical</li>
            </ul>
          </div>
        </div>

        {/* Product status */}
        <h2 className="text-2xl font-bold mb-6">Product Status</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {FEATURES.map((f) => (
            <div key={f.name} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{f.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  f.status === 'Live' ? 'bg-green-500/10 text-green-400' :
                  f.status === 'Beta' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-gray-800 text-gray-400'
                }`}>{f.status}</span>
              </div>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Revenue model */}
        <h2 className="text-2xl font-bold mb-6">Revenue Model</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { stream: 'Remittance Fees', detail: '1% on transfer volume', potential: '$60M+ at scale' },
              { stream: 'Subscriptions', detail: 'Pro ($9.99/mo) + Business ($29.99/mo)', potential: '$15M+ ARR' },
              { stream: 'Marketplace Take Rate', detail: '5-10% on transactions', potential: '$20M+ at scale' },
              { stream: 'Promoted Listings', detail: 'Featured jobs, housing, events', potential: '$5M+ ARR' },
            ].map((r) => (
              <div key={r.stream} className="flex justify-between items-start p-4 bg-gray-800/50 rounded-xl">
                <div>
                  <div className="font-semibold">{r.stream}</div>
                  <div className="text-sm text-gray-400">{r.detail}</div>
                </div>
                <div className="text-amber-400 font-bold text-sm whitespace-nowrap">{r.potential}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <h2 className="text-2xl font-bold mb-6">Roadmap</h2>
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {TIMELINE.map((t, i) => (
            <div key={t.q} className={`rounded-2xl p-6 ${i === 0 ? 'bg-amber-500/10 border-2 border-amber-500/30' : 'bg-gray-900 border border-gray-800'}`}>
              <div className={`text-sm font-bold mb-1 ${i === 0 ? 'text-amber-400' : 'text-gray-400'}`}>{t.q}</div>
              <div className="font-bold mb-3">{t.title}</div>
              <ul className="space-y-1.5">
                {t.items.map((item) => (
                  <li key={item} className="text-sm text-gray-400">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in Investing?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We are currently raising our seed round. If you believe in the future of diaspora tech,
            let us talk.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://calendly.com/habeshahub"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              <FiCalendar /> Schedule a Call
            </a>
            <a
              href="mailto:investors@habeshahub.com"
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
            >
              <FiMail /> investors@habeshahub.com
            </a>
          </div>
        </div>
      </div>
          <Footer />
    </div>
  );
}
