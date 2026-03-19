'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { FiArrowLeft, FiHeart, FiUser, FiMessageCircle, FiSearch } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { useAnalytics } from '@/lib/useAnalytics';

const MOCK_MATCHES = [
  {
    id: 'm1',
    name: 'Selam Hailu',
    age: 27,
    heritage: 'Ethiopian',
    location: 'Washington, DC',
    matchedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    lastMessage: 'Hey! I saw you like coffee ceremonies too. Do you have a favorite spot in DC?',
    lastMessageAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isNew: true,
    unread: 2,
  },
  {
    id: 'm2',
    name: 'Dawit Mekonnen',
    age: 30,
    heritage: 'Eritrean',
    location: 'Silver Spring, MD',
    matchedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    lastMessage: 'That zigni recipe sounds amazing! We should cook together sometime.',
    lastMessageAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    isNew: true,
    unread: 1,
  },
  {
    id: 'm3',
    name: 'Hiwet Berhe',
    age: 25,
    heritage: 'Eritrean',
    location: 'Arlington, VA',
    matchedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastMessage: "I'd love to go hiking at Great Falls this weekend if you're free!",
    lastMessageAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    isNew: false,
    unread: 0,
  },
  {
    id: 'm4',
    name: 'Yonas Tekle',
    age: 29,
    heritage: 'Ethiopian',
    location: 'Bethesda, MD',
    matchedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    lastMessage: 'My mom makes the best doro wot. You should come for Sunday dinner!',
    lastMessageAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: false,
    unread: 0,
  },
  {
    id: 'm5',
    name: 'Meron Tadesse',
    age: 26,
    heritage: 'Ethiopian',
    location: 'Alexandria, VA',
    matchedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastMessage: 'Just finished a new painting inspired by Lalibela. Want to see it?',
    lastMessageAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: false,
    unread: 0,
  },
];

const HERITAGE_STYLES = {
  Ethiopian: 'bg-habesha-green/10 text-habesha-green',
  Eritrean: 'bg-eritrean-blue/10 text-eritrean-blue',
};

export default function MatchesPage() {
  useAnalytics();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMatches = MOCK_MATCHES.filter((match) => {
    if (!searchQuery) return true;
    return match.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl px-4 py-6">
        {/* Header */}
        <div className="mb-4">
          <Link
            href="/dating"
            className="mb-3 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
          >
            <FiArrowLeft size={16} />
            Back to HabeshaMatch
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                <FiHeart size={22} className="text-primary" />
                Your Matches
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {MOCK_MATCHES.length} matches — start a conversation!
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search matches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-dark-700 dark:bg-dark-800 dark:text-white"
          />
        </div>

        {/* Ethiopian tricolor divider */}
        <div className="mb-4 flex h-0.5 overflow-hidden rounded-full">
          <div className="flex-1 bg-habesha-green" />
          <div className="flex-1 bg-habesha-yellow" />
          <div className="flex-1 bg-habesha-red" />
        </div>

        {/* Matches list */}
        <div className="flex flex-col gap-2">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-all hover:border-primary/30 hover:shadow-md dark:border-dark-700 dark:bg-dark-800 dark:hover:border-primary/30"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-500">
                  <FiUser size={22} className="text-white/70" />
                </div>
                {match.isNew && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-white ring-2 ring-white dark:ring-dark-800">
                    !
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {match.name}, {match.age}
                  </h3>
                  <span
                    className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      HERITAGE_STYLES[match.heritage] || 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {match.heritage}
                  </span>
                </div>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {match.lastMessage}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-400">
                  <span>{match.location}</span>
                  <span>&middot;</span>
                  <span>
                    Matched {formatDistanceToNow(new Date(match.matchedAt), { addSuffix: true })}
                  </span>
                </div>
              </div>

              {/* Right side: unread badge + message */}
              <div className="flex flex-shrink-0 flex-col items-end gap-2">
                <span className="text-[10px] text-gray-400">
                  {formatDistanceToNow(new Date(match.lastMessageAt), { addSuffix: true })}
                </span>
                {match.unread > 0 ? (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                    {match.unread}
                  </span>
                ) : (
                  <button className="rounded-full p-1.5 text-gray-400 opacity-0 transition hover:bg-gray-100 group-hover:opacity-100 dark:hover:bg-dark-700">
                    <FiMessageCircle size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredMatches.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-white py-12 text-center dark:border-dark-700 dark:bg-dark-800">
              <FiHeart className="mx-auto mb-3 text-gray-300 dark:text-dark-600" size={40} />
              <p className="text-sm text-gray-500 dark:text-gray-400">No matches found.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
