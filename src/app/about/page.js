'use client';

import Link from 'next/link';
import { FiArrowLeft, FiTarget, FiEye, FiHeart, FiGlobe, FiUsers, FiZap } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';
import Footer from '@/components/Footer';

const VALUES = [
  { icon: FiHeart, title: 'Community First', desc: 'Every feature is built with our community in mind. We listen, we iterate, we serve.' },
  { icon: FiGlobe, title: 'Diaspora Connected', desc: 'Whether you are in Seattle, DC, or Addis, HabeshaHub keeps you plugged in.' },
  { icon: FiZap, title: 'Built Different', desc: 'No more scattered Facebook groups. One platform, every need, beautifully integrated.' },
  { icon: FiUsers, title: 'By Us, For Us', desc: 'Founded by a first-gen Habesha developer who lived the problem.' },
];

export default function AboutPage() {
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

        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our community deserves<br />
            <span className="text-amber-400">better than scattered Facebook groups.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            HabeshaHub is the all-in-one platform for the Ethiopian, Eritrean, and Somali diaspora.
            Built in Seattle by a first-generation Habesha developer who grew up watching our community
            struggle with fragmented tools and disconnected resources.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <FiTarget className="text-amber-400 mb-4" size={28} />
            <h2 className="text-xl font-bold mb-3">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To unite the Habesha diaspora through technology — providing a single, beautiful platform
              for jobs, housing, events, marketplace, dating, remittance, and community connection.
              We believe that when our community has the right tools, incredible things happen.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <FiEye className="text-amber-400 mb-4" size={28} />
            <h2 className="text-xl font-bold mb-3">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              To become the definitive digital home for over 5 million Habesha diaspora members worldwide.
              A platform so essential that every Ethiopian, Eritrean, and Somali abroad considers it
              their first stop for anything community-related.
            </p>
          </div>
        </div>

        {/* Values */}
        <h2 className="text-2xl font-bold mb-8">What We Believe</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {VALUES.map((v) => (
            <div key={v.title} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <v.icon className="text-amber-400" size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <h2 className="text-2xl font-bold mb-8">The Team</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Founder */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-2xl font-bold text-white">
                ET
              </div>
              <div>
                <h3 className="font-bold text-lg">Eyob Tesfayohanes</h3>
                <p className="text-amber-400 text-sm">Founder & CEO</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              First-generation US-born Eritrean. Grew up in Seattle watching the Habesha community
              rely on word-of-mouth and Facebook groups for everything from finding apartments to
              sending money home. Built HabeshaHub to change that.
            </p>
          </div>

          {/* Advisor placeholders */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 border-dashed">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-gray-600">
                <FiUsers size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-500">Advisory Board</h3>
                <p className="text-gray-600 text-sm">Coming Soon</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              We are assembling an advisory board of diaspora entrepreneurs, community leaders,
              and tech veterans. Interested?{' '}
              <Link href="/contact" className="text-amber-400 hover:underline">
                Get in touch
              </Link>.
            </p>
          </div>
        </div>

        {/* The Story */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold mb-6">The Story</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              If you have ever been part of the Habesha diaspora in America, you know the drill.
              Need a roommate? Check the local Ethiopian Facebook group. Looking for a job? Ask around
              at the next church gathering. Want to send money to family back home? Pay insane fees
              through legacy transfer services.
            </p>
            <p>
              For a community of over 2 million people in the US alone — representing billions in
              economic activity — we have been stuck using tools that were never built for us.
              Facebook groups with no search, no verification, no trust signals.
              Dating apps where nobody understands why you can't bring a non-Habesha person to
              your grandmother's house.
            </p>
            <p>
              HabeshaHub changes everything. It is the super app our community deserves — jobs,
              housing, events, marketplace, dating, remittance, immigration resources, and
              community forums, all in one platform built specifically for us, by us.
            </p>
            <p className="text-white font-medium">
              We are not just building an app. We are building the digital infrastructure for the
              entire Habesha diaspora.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
          <p className="text-gray-400 mb-6">Be part of building the future of diaspora tech.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/landing" className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors">
              Join the Waitlist
            </Link>
            <Link href="/careers" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors">
              View Open Roles
            </Link>
            <Link href="/investors" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors">
              Investor Info
            </Link>
          </div>
        </div>
      </div>
          <Footer />
    </div>
  );
}
