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
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">Vision</span>
          <span className="text-gray-500 text-xs flex items-center gap-1"><FiCalendar size={12} /> March 5, 2026</span>
          <span className="text-gray-500 text-xs flex items-center gap-1"><FiClock size={12} /> 7 min read</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">From Facebook Groups to Super App: Our Vision</h1>
        <div className="flex items-center gap-3 mb-10 pb-10 border-b border-gray-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-sm font-bold">ET</div>
          <div><div className="font-medium text-sm">Eyob Tesfayohanes</div><div className="text-gray-500 text-xs">Founder, Mahber</div></div>
        </div>
        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-gray-300 leading-relaxed">
          <p className="text-xl text-gray-200 font-medium">
            Five million people. Zero purpose-built platforms. Here is how we plan to change that.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Facebook Group Era Is Over</h2>
          <p>
            Open your phone right now. If you are Habesha, you are probably a member of at least 5-10
            Facebook groups: your city&apos;s Ethiopian community group, the Eritrean one, the job posting
            group, the housing group, the buy/sell group, the events group. Maybe a dating one too.
          </p>
          <p>
            Each group has somewhere between 500 and 50,000 members. Each is moderated (loosely) by
            volunteers. Posts are chronological — no search, no filtering, no categories. Want to find
            a 2-bedroom apartment in Columbia Heights? Scroll. Keep scrolling. Maybe it was posted last
            Tuesday. Or was it in the other group?
          </p>
          <p>
            This system was acceptable in 2015. In 2026, with the tools and technology available to us,
            it is unacceptable. Our community is too large, too economically significant, and too
            digitally savvy to keep operating this way.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">What a Super App Means</h2>
          <p>
            The concept of a super app is not new — WeChat in China, Grab in Southeast Asia, Gojek in
            Indonesia. These platforms started with one use case and expanded to become the digital
            operating system for their users&apos; daily lives.
          </p>
          <p>
            Mahber follows this model but adapted for diaspora life. We are not trying to replace
            WhatsApp or Instagram. We are consolidating the <em>community-specific</em> functions that
            are currently scattered across a dozen platforms:
          </p>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Finding a job:</span> <span className="line-through text-gray-600">Facebook group</span> → <span className="text-amber-400">Mahber Jobs</span></div>
              <div><span className="text-gray-500">Finding housing:</span> <span className="line-through text-gray-600">Craigslist + FB</span> → <span className="text-amber-400">Mahber Housing</span></div>
              <div><span className="text-gray-500">Sending money:</span> <span className="line-through text-gray-600">WU/hawala</span> → <span className="text-amber-400">Mahber Remit</span></div>
              <div><span className="text-gray-500">Finding events:</span> <span className="line-through text-gray-600">Flyers on WhatsApp</span> → <span className="text-amber-400">Mahber Events</span></div>
              <div><span className="text-gray-500">Dating:</span> <span className="line-through text-gray-600">Tinder/random</span> → <span className="text-amber-400">MahberMatch</span></div>
              <div><span className="text-gray-500">Buying/selling:</span> <span className="line-through text-gray-600">FB Marketplace</span> → <span className="text-amber-400">Mahber Market</span></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Network Effect Advantage</h2>
          <p>
            Here is what makes this exciting from a product perspective: every feature strengthens
            every other feature. The person who finds a job through Mahber also needs housing in
            their new city. The person who lists an apartment also sells traditional clothing on the
            marketplace. The person who attends events also sends money home.
          </p>
          <p>
            This cross-pollination is impossible when each function lives on a separate platform.
            On Mahber, it happens naturally. One login, one profile, one trust score, one
            community identity — across every aspect of diaspora life.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Three-Phase Rollout</h2>
          <p><strong className="text-white">Phase 1 (Launch — Q2 2026):</strong> Core community features — jobs, housing, events, marketplace, community forums, dating. Establish the daily habit loop.</p>
          <p><strong className="text-white">Phase 2 (Q3-Q4 2026):</strong> Financial services — remittance, edir/equb savings groups, community lending. This is where revenue scales dramatically.</p>
          <p><strong className="text-white">Phase 3 (2027+):</strong> Platform expansion — API marketplace for Habesha businesses, white-label solutions for community organizations, expansion to other African diaspora communities.</p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why This Will Work</h2>
          <p>
            Three words: <strong className="text-white">community trust density</strong>. The Habesha
            diaspora is one of the most tightly knit immigrant communities in America. We already
            operate on trust networks — edir savings groups, equb rotating credit, community
            guarantees for housing. Mahber does not create trust from scratch. It digitizes
            and amplifies the trust networks that already exist.
          </p>
          <p>
            When your cousin in DC vouches for a job posting, that means something. When your
            church community verifies a housing listing, that means something. Mahber makes
            these trust signals visible, searchable, and scalable.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Future Is Ours to Build</h2>
          <p>
            We are not waiting for Silicon Valley to build this. They will not. They do not understand
            what an edir is. They do not know why injera is a marketplace category. They have never
            navigated US immigration as a Horn of Africa refugee.
          </p>
          <p>
            This is our opportunity. Built by the diaspora, for the diaspora, with the diaspora.
            The Facebook group era is over. The super app era begins now.
          </p>

          <div className="not-prose mt-8 flex gap-4">
            <Link href="/landing" className="inline-flex px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors">
              Join the Waitlist
            </Link>
            <Link href="/about" className="inline-flex px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
