'use client';

import Link from 'next/link';
import { FiArrowLeft, FiMapPin, FiClock, FiBriefcase, FiCode, FiSmartphone, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';
import Footer from '@/components/Footer';

const ROLES = [
  {
    title: 'Full-Stack Engineer',
    type: 'Full-time',
    location: 'Remote (US)',
    icon: FiCode,
    desc: 'Build the core platform — from React frontends to Node.js APIs to database design. You will own entire features from conception to deployment. We move fast and ship daily.',
    reqs: ['3+ years with React/Next.js and Node.js', 'Experience with PostgreSQL or MongoDB', 'Comfortable with AWS or Railway/Vercel', 'Bonus: experience with fintech or payment systems', 'Bonus: Habesha community member'],
    mailto: 'careers@habeshahub.com?subject=Full-Stack Engineer Application',
  },
  {
    title: 'Mobile Developer',
    type: 'Full-time',
    location: 'Remote (US)',
    icon: FiSmartphone,
    desc: 'Lead our mobile app development with React Native. Build beautiful, performant iOS and Android apps that serve millions of diaspora members. Camera, payments, real-time messaging — the full stack.',
    reqs: ['2+ years with React Native (iOS + Android)', 'Published apps on App Store and Google Play', 'Experience with real-time features (WebSocket/push)', 'Bonus: experience with Expo', 'Bonus: Amharic, Tigrinya, or Somali speaker'],
    mailto: 'careers@habeshahub.com?subject=Mobile Developer Application',
  },
  {
    title: 'Community Manager',
    type: 'Full-time',
    location: 'Seattle, WA / Remote',
    icon: FiUsers,
    desc: 'Be the bridge between HabeshaHub and the diaspora. Manage our social presence, engage community leaders, moderate forums, and ensure every user feels heard. You ARE the community.',
    reqs: ['Deep connection to Ethiopian, Eritrean, or Somali diaspora', 'Experience managing online communities (5K+ members)', 'Fluent in English + at least one: Amharic, Tigrinya, Somali', 'Social media management experience', 'Based in a major Habesha community hub city'],
    mailto: 'careers@habeshahub.com?subject=Community Manager Application',
  },
  {
    title: 'Growth Marketing Lead',
    type: 'Full-time',
    location: 'Remote (US)',
    icon: FiTrendingUp,
    desc: 'Drive user acquisition from 0 to 100K. Build viral loops, run paid campaigns, partner with community influencers, and own every growth metric. This is a greenfield opportunity to build a marketing engine from scratch.',
    reqs: ['3+ years in growth/performance marketing', 'Experience scaling consumer products (0→100K users)', 'Proficiency with analytics tools (GA, Mixpanel, etc.)', 'Understanding of diaspora community dynamics', 'Bonus: experience with marketplace or social platforms'],
    mailto: 'careers@habeshahub.com?subject=Growth Marketing Lead Application',
  },
];

export default function CareersPage() {
  useAnalytics();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex h-1">
        <div className="flex-1 bg-green-600" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-red-600" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-sm">
          <FiArrowLeft /> Back to HabeshaHub
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Join the team building the<br />
          <span className="text-amber-400">future of diaspora tech</span>
        </h1>
        <p className="text-xl text-gray-400 mb-4 max-w-2xl">
          HabeshaHub is a small, fast-moving team on a mission to build the digital infrastructure
          for 5 million+ Habesha diaspora members worldwide.
        </p>
        <p className="text-gray-500 mb-12">
          We are remote-first, community-driven, and obsessed with shipping. If you want to build
          something that matters for a community that deserves it — keep reading.
        </p>

        {/* Perks */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {[
            { title: 'Remote First', desc: 'Work from anywhere in the US' },
            { title: 'Equity', desc: 'Meaningful ownership in what we build' },
            { title: 'Community Impact', desc: 'Your work serves millions of people' },
          ].map((p) => (
            <div key={p.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="font-semibold mb-1">{p.title}</div>
              <div className="text-sm text-gray-400">{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Open Roles */}
        <h2 className="text-2xl font-bold mb-6">Open Roles ({ROLES.length})</h2>
        <div className="space-y-4 mb-16">
          {ROLES.map((role) => (
            <div key={role.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <role.icon className="text-amber-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{role.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><FiBriefcase size={12} /> {role.type}</span>
                      <span className="flex items-center gap-1"><FiMapPin size={12} /> {role.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{role.desc}</p>
              <div className="mb-4">
                <div className="text-xs font-medium text-gray-500 uppercase mb-2">Requirements</div>
                <ul className="space-y-1">
                  {role.reqs.map((r) => (
                    <li key={r} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={`mailto:${role.mailto}`}
                className="inline-flex px-5 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg text-sm transition-colors"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>

        {/* Don't see your role */}
        <div className="bg-gray-900 border border-dashed border-gray-700 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-bold mb-2">Do not see your role?</h3>
          <p className="text-gray-400 text-sm mb-4">
            We are always looking for talented people passionate about the diaspora. Send us your info.
          </p>
          <a
            href="mailto:careers@habeshahub.com?subject=General Application"
            className="inline-flex px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg text-sm transition-colors"
          >
            Send General Application
          </a>
        </div>
      </div>
          <Footer />
    </div>
  );
}
