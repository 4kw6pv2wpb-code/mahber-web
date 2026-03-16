'use client';

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
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400">Origin Story</span>
          <span className="text-gray-500 text-xs flex items-center gap-1"><FiCalendar size={12} /> March 10, 2026</span>
          <span className="text-gray-500 text-xs flex items-center gap-1"><FiClock size={12} /> 6 min read</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">Why We Built HabeshaHub</h1>

        <div className="flex items-center gap-3 mb-10 pb-10 border-b border-gray-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-sm font-bold">ET</div>
          <div>
            <div className="font-medium text-sm">Eyob Tesfayohanes</div>
            <div className="text-gray-500 text-xs">Founder, HabeshaHub</div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-gray-300 leading-relaxed">
          <p className="text-xl text-gray-200 font-medium">
            I grew up in Seattle as a first-generation Eritrean-American. My parents came to this country
            with nothing but hope and a community that caught them when they fell. That community — the
            Habesha diaspora — raised me. And now I am building something to give back.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Problem Everyone Knows But Nobody Fixes</h2>
          <p>
            Ask any Habesha person in America how they find a roommate, and they will tell you the same
            thing: &ldquo;I posted in the Facebook group.&rdquo; Ask how they find community events: &ldquo;Someone
            shared a flyer on WhatsApp.&rdquo; Ask how they send money home: &ldquo;I pay whatever fee the
            transfer service charges.&rdquo;
          </p>
          <p>
            For a community of over 2 million people in the United States — representing billions in
            economic activity — we have zero purpose-built digital infrastructure. Zero. We have been
            making do with tools that were never designed for us.
          </p>
          <p>
            Facebook groups with thousands of members and no search functionality. No verification.
            No trust signals. No way to tell the legitimate job posting from the scam. Every major
            city has 5-10 overlapping Habesha groups, each run by a different volunteer, with no
            coordination between them.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Moment It Clicked</h2>
          <p>
            Last year, my cousin moved to Atlanta. She spent three weeks trying to find an apartment
            through Facebook groups. She got scammed once — sent a deposit for a place that did not
            exist. She found her actual apartment through a friend of a friend of someone at church.
          </p>
          <p>
            That same month, a family friend was sending $500 to Asmara through a traditional hawala
            network. The fee was $75 — fifteen percent. For a family where $500 is a month&apos;s expenses,
            that $75 is not a rounding error. It is the difference between the kids getting new school
            supplies or not.
          </p>
          <p>
            I sat down and started listing every problem: jobs, housing, events, dating, marketplace,
            remittance, immigration help, language translation. The list kept growing. And for every
            single category, the &ldquo;solution&rdquo; was the same: a Facebook group, a WhatsApp chain, or
            word of mouth.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">What HabeshaHub Actually Is</h2>
          <p>
            HabeshaHub is not another social network. It is not another listing site. It is a super app —
            a single platform that consolidates every digital need of the Habesha diaspora into one
            beautifully designed, culturally intelligent experience.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Jobs Board</strong> — with verified employers and community-relevant positions</li>
            <li><strong className="text-white">Housing</strong> — apartments, rooms, and sublets with trust scores</li>
            <li><strong className="text-white">Events</strong> — from church services to New Year celebrations to networking</li>
            <li><strong className="text-white">Marketplace</strong> — buy and sell within the community</li>
            <li><strong className="text-white">Dating</strong> — because Habesha Match should understand why family approval matters</li>
            <li><strong className="text-white">Remittance</strong> — send money home at 1% flat, not 15%</li>
            <li><strong className="text-white">Immigration</strong> — AI-powered guidance and lawyer directories</li>
            <li><strong className="text-white">Community</strong> — forums, Q&A, and real connection</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Built By Us, For Us</h2>
          <p>
            The reason no one has built this yet is simple: you need to be from the community to
            understand it. You need to know that a coffee ceremony is not just coffee — it is how
            we make decisions, share news, and build trust. You need to know that &ldquo;Habesha time&rdquo;
            is real and event reminders need to account for it. You need to know that the community
            in DC is different from Seattle is different from Minneapolis.
          </p>
          <p>
            I know these things because I lived them. And the team we are building knows them too.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Join Us</h2>
          <p>
            HabeshaHub is launching soon. If you believe the Habesha diaspora deserves better digital
            infrastructure — if you are tired of Facebook groups and WhatsApp chains — join the waitlist.
            Be part of building something that has been needed for decades.
          </p>

          <div className="not-prose mt-8">
            <Link href="/landing" className="inline-flex px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors">
              Join the Waitlist
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
