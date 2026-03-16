'use client';

import Link from 'next/link';
import { FiCheck, FiArrowLeft, FiStar, FiZap, FiShield } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';
import Footer from '@/components/Footer';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Everything you need to get started',
    icon: FiStar,
    color: 'border-gray-700',
    btnClass: 'bg-gray-800 hover:bg-gray-700 text-white',
    features: [
      'Browse all job listings',
      'Browse housing & marketplace',
      'Attend community events',
      'Join community forums',
      'Basic translation tools',
      'Immigration resources',
      'Send & receive messages',
      'Create a dating profile',
    ],
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    desc: 'For active community members',
    icon: FiZap,
    badge: 'Most Popular',
    color: 'border-amber-500',
    btnClass: 'bg-amber-500 hover:bg-amber-600 text-black',
    features: [
      'Everything in Free',
      'Featured job & housing listings',
      'Priority dating matching',
      'Verified badge on profile',
      'Analytics on your listings',
      'Reduced remittance fees (0.5%)',
      'Priority customer support',
      'Ad-free experience',
    ],
  },
  {
    name: 'Business',
    price: '$29.99',
    period: '/month',
    desc: 'For businesses & organizations',
    icon: FiShield,
    color: 'border-gray-700',
    btnClass: 'bg-gray-800 hover:bg-gray-700 text-white',
    features: [
      'Everything in Pro',
      'Unlimited job postings',
      'Promoted marketplace listings',
      'Business verified badge',
      'API access for integrations',
      'Bulk remittance tools',
      'Dedicated account manager',
      'Custom community sponsorships',
    ],
  },
];

export default function PricingPage() {
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

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent <span className="text-amber-400">Pricing</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start free. Upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-gray-900 border-2 ${plan.color} rounded-2xl p-8 flex flex-col`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                  {plan.badge}
                </div>
              )}
              <plan.icon className="text-amber-400 mb-4" size={28} />
              <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500 ml-1">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-400 mt-0.5 shrink-0" size={16} />
                    <span className="text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={`w-full py-3 rounded-xl font-bold text-center transition-colors ${plan.btnClass}`}
              >
                {plan.price === '$0' ? 'Get Started Free' : 'Start Free Trial'}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I switch plans anytime?', a: 'Yes. Upgrade, downgrade, or cancel at any time. No contracts.' },
              { q: 'Is there a free trial for Pro?', a: 'Yes, every paid plan comes with a 14-day free trial. No credit card required.' },
              { q: 'What payment methods do you accept?', a: 'Visa, Mastercard, Amex, and mobile payments including Apple Pay and Google Pay.' },
              { q: 'Do you offer discounts for nonprofits?', a: 'Yes! Habesha community organizations get 50% off any plan. Contact us for details.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
          <Footer />
    </div>
  );
}
