'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FiSearch, FiBriefcase, FiHome, FiCalendar, FiShoppingBag, FiUsers } from 'react-icons/fi';
import AppLayout from '@/components/layout/AppLayout';
import { useAnalytics } from '@/lib/useAnalytics';

const TABS = [
  { key: 'all', label: 'All', icon: FiSearch },
  { key: 'jobs', label: 'Jobs', icon: FiBriefcase },
  { key: 'events', label: 'Events', icon: FiCalendar },
  { key: 'community', label: 'Community', icon: FiUsers },
  { key: 'marketplace', label: 'Market', icon: FiShoppingBag },
];

export default function SearchPage() {
  useAnalytics();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('all');
  const [results, setResults] = useState({ jobs: [], events: [], posts: [] });
  const [loading, setLoading] = useState(false);

  const search = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const [jobsRes, eventsRes, postsRes] = await Promise.all([
        fetch('/api/jobs').then((r) => r.json()),
        fetch('/api/events').then((r) => r.json()),
        fetch('/api/posts').then((r) => r.json()),
      ]);
      const q = query.toLowerCase();
      setResults({
        jobs: (jobsRes.jobs || []).filter((j) => j.title.toLowerCase().includes(q) || j.company?.toLowerCase().includes(q) || j.location?.toLowerCase().includes(q)),
        events: (eventsRes.events || []).filter((e) => e.title.toLowerCase().includes(q) || e.location?.toLowerCase().includes(q)),
        posts: (postsRes.posts || []).filter((p) => p.title.toLowerCase().includes(q) || p.body?.toLowerCase().includes(q)),
      });
    } catch {}
    setLoading(false);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  const totalResults = results.jobs.length + results.events.length + results.posts.length;

  const showJobs = tab === 'all' || tab === 'jobs';
  const showEvents = tab === 'all' || tab === 'events';
  const showPosts = tab === 'all' || tab === 'community';

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-4">Search</h1>

        {/* Search input */}
        <div className="relative mb-4">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs, events, community posts..."
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
            autoFocus
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.key ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {loading && <div className="text-center text-gray-500 py-8">Searching...</div>}

        {!loading && query && totalResults === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">No results for &ldquo;{query}&rdquo;</div>
            <p className="text-gray-600 text-sm">Try different keywords or browse categories</p>
          </div>
        )}

        {!loading && query && (
          <div className="space-y-8">
            {/* Jobs results */}
            {showJobs && results.jobs.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><FiBriefcase className="text-amber-400" /> Jobs ({results.jobs.length})</h2>
                <div className="space-y-2">
                  {results.jobs.slice(0, tab === 'jobs' ? 20 : 5).map((job) => (
                    <Link key={job.id} href={`/jobs/${job.id}`} className="block bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                      <div className="font-medium text-white">{job.title}</div>
                      <div className="text-sm text-gray-400">{job.company} • {job.location} • {job.salary}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Events results */}
            {showEvents && results.events.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><FiCalendar className="text-green-400" /> Events ({results.events.length})</h2>
                <div className="space-y-2">
                  {results.events.slice(0, tab === 'events' ? 20 : 5).map((event) => (
                    <Link key={event.id} href={`/events/${event.id}`} className="block bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                      <div className="font-medium text-white">{event.title}</div>
                      <div className="text-sm text-gray-400">{event.date} • {event.location} • {event.price}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Community results */}
            {showPosts && results.posts.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><FiUsers className="text-purple-400" /> Community ({results.posts.length})</h2>
                <div className="space-y-2">
                  {results.posts.slice(0, tab === 'community' ? 20 : 5).map((post) => (
                    <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                      <div className="font-medium text-white">{post.title}</div>
                      <div className="text-sm text-gray-400 line-clamp-1">{post.body}</div>
                      <div className="text-xs text-gray-500 mt-1">{post.author} • {post.upvotes} upvotes • {post.comments} comments</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="text-center py-12">
            <FiSearch className="mx-auto text-gray-700 mb-3" size={48} />
            <p className="text-gray-500">Search across all of Mahber</p>
            <p className="text-gray-600 text-sm mt-1">Jobs, events, community posts, marketplace, and more</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
