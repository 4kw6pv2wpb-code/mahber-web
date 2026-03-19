'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

export default function BlogPost() {
  useAnalytics();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex h-1">
        <div className="flex-1 bg-green-600" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-red-600" />
      </div>
      <article className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-sm">
          <FiArrowLeft /> Back to Blog
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">Market Analysis</span>
          <span className="text-gray-500 text-xs flex items-center gap-1"><FiCalendar size={12} /> March 8, 2026</span>
          <span className="text-gray-500 text-xs flex items-center gap-1"><FiClock size={12} /> 8 min read</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">The $6B Opportunity: Serving the Habesha Diaspora</h1>
        <div className="flex items-center gap-3 mb-10 pb-10 border-b border-gray-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-sm font-bold">ET</div>
          <div><div className="font-medium text-sm">Eyob Tesfayohanes</div><div className="text-gray-500 text-xs">Founder, Mahber</div></div>
        </div>
        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-gray-300 leading-relaxed">
          <p className="text-xl text-gray-200 font-medium">
            The Ethiopian, Eritrean, and Somali diaspora represents one of the largest underserved
            digital markets in the world. Here is why the numbers demand attention.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Numbers</h2>
          <p>Let us start with the raw figures:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">2M+</strong> Ethiopian and Eritrean diaspora in the US alone</li>
            <li><strong className="text-white">$6B+</strong> in annual remittance to Ethiopia (World Bank, 2024)</li>
            <li><strong className="text-white">$2B+</strong> estimated diaspora marketplace spend (housing, goods, services)</li>
            <li><strong className="text-white">5M+</strong> Horn of Africa diaspora worldwide</li>
            <li><strong className="text-white">900K</strong> directly addressable users in the first 5 major US metros</li>
          </ul>
          <p>
            These are not abstract projections. This is real, measurable economic activity that currently
            flows through fragmented, inefficient channels — Facebook groups, WhatsApp chains, and legacy
            money transfer services charging 8-15% fees.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Remittance Goldmine</h2>
          <p>
            Ethiopia is one of the top remittance-receiving countries in Africa. The $6B+ that flows from
            the diaspora annually is a lifeline for millions of families. Yet the average remittance fee
            to East Africa is 8.5% — well above the global average of 6.2% and far above the UN&apos;s
            Sustainable Development Goal of 3%.
          </p>
          <p>
            At Mahber, we are building remittance at a flat 1% fee. On $6B in annual volume, reducing
            fees from 8.5% to 1% would save the diaspora over <strong className="text-white">$450 million per year</strong>.
            That is money that goes back to families — to school fees, to medical bills, to small businesses.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Community Commerce Gap</h2>
          <p>
            Beyond remittance, the diaspora marketplace is enormous and completely underserved.
            Consider just a few categories:
          </p>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
            <div className="flex justify-between"><span>Jobs & Recruiting</span><span className="text-amber-400 font-bold">$200M+</span></div>
            <div className="flex justify-between"><span>Housing & Rentals</span><span className="text-amber-400 font-bold">$800M+</span></div>
            <div className="flex justify-between"><span>Events & Tickets</span><span className="text-amber-400 font-bold">$150M+</span></div>
            <div className="flex justify-between"><span>Marketplace (goods)</span><span className="text-amber-400 font-bold">$400M+</span></div>
            <div className="flex justify-between"><span>Dating & Social</span><span className="text-amber-400 font-bold">$100M+</span></div>
            <div className="flex justify-between"><span>Immigration Services</span><span className="text-amber-400 font-bold">$300M+</span></div>
            <div className="flex justify-between border-t border-gray-700 pt-3 mt-3"><span className="font-bold text-white">Total Addressable</span><span className="text-amber-400 font-bold">$8B+</span></div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why Now</h2>
          <p>Three converging trends make this the right moment:</p>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-white">Smartphone penetration</strong> — 95%+ of the US diaspora is smartphone-first. Mobile super apps are no longer a foreign concept.</li>
            <li><strong className="text-white">Generational shift</strong> — Second-gen Habesha Americans (18-35) are digital natives who expect modern tools. They will not tolerate Facebook groups forever.</li>
            <li><strong className="text-white">Fintech infrastructure</strong> — APIs for payments, KYC, and remittance (Stripe, Plaid, Wise) make it possible to build financial services without a banking license.</li>
          </ol>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Competitive Landscape</h2>
          <p>
            There is no direct competitor. Dendasho tried a simple listing site but lacked depth.
            Konjo focused only on dating. Facebook groups serve as the de facto platform but offer
            none of the features our community needs — no payments, no verification, no trust systems.
          </p>
          <p>
            Mahber is the first platform attempting to consolidate the entire diaspora experience
            into one application. First mover advantage in a $8B+ market with zero established incumbents.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Path to $100M</h2>
          <p>Our revenue model is multi-layered:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Remittance transaction fees (1% on billions in volume)</li>
            <li>Pro subscriptions ($9.99/mo) and Business plans ($29.99/mo)</li>
            <li>Promoted listings and featured placements</li>
            <li>Event ticketing commissions</li>
            <li>Marketplace transaction fees</li>
          </ul>
          <p>
            Even capturing 5% of the addressable market yields $400M+ in annual GMV and $40M+ in revenue.
            This is a venture-scale opportunity hiding in plain sight.
          </p>

          <div className="not-prose mt-8 flex gap-4">
            <Link href="/investors" className="inline-flex px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors">
              Investor Information
            </Link>
            <Link href="/landing" className="inline-flex px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors">
              Join Waitlist
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
