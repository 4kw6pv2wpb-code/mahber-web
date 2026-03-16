'use client';

import Link from 'next/link';
import { FiArrowLeft, FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';
import Footer from '@/components/Footer';

const POSTS = [
  {
    slug: 'why-we-built-habeshahub',
    title: 'Why We Built HabeshaHub',
    excerpt: 'The Habesha diaspora deserves more than scattered Facebook groups. Here is the story of why we are building the super app our community needs.',
    date: 'March 10, 2026',
    readTime: '6 min read',
    tag: 'Origin Story',
    tagColor: 'bg-amber-500/10 text-amber-400',
  },
  {
    slug: 'the-6b-opportunity',
    title: 'The $6B Opportunity: Serving the Habesha Diaspora',
    excerpt: 'With $6B+ in annual remittance, 2M+ diaspora in the US alone, and zero purpose-built platforms — the market opportunity is massive.',
    date: 'March 8, 2026',
    readTime: '8 min read',
    tag: 'Market Analysis',
    tagColor: 'bg-blue-500/10 text-blue-400',
  },
  {
    slug: 'from-facebook-groups-to-super-app',
    title: 'From Facebook Groups to Super App: Our Vision',
    excerpt: 'How we plan to consolidate the fragmented digital experience of 5 million diaspora members into one powerful platform.',
    date: 'March 5, 2026',
    readTime: '7 min read',
    tag: 'Vision',
    tagColor: 'bg-green-500/10 text-green-400',
  },
];

export default function BlogPage() {
  useAnalytics();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex h-1">
        <div className="flex-1 bg-green-600" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-red-600" />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-sm">
          <FiArrowLeft /> Back to HabeshaHub
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-400 mb-12">Thoughts on building for the diaspora.</p>

        <div className="space-y-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 hover:border-gray-700 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.tagColor}`}>
                  {post.tag}
                </span>
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <FiCalendar size={12} /> {post.date}
                </span>
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <FiClock size={12} /> {post.readTime}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-amber-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">{post.excerpt}</p>
              <span className="text-amber-400 text-sm font-medium flex items-center gap-1">
                Read more <FiArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
          <Footer />
    </div>
  );
}
