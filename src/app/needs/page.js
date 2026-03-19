'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState } from 'react';
import { FiChevronUp, FiMessageCircle, FiHeart, FiPlus } from 'react-icons/fi';
import AppLayout from '@/components/layout/AppLayout';
import { useAnalytics } from '@/lib/useAnalytics';

const MOCK_NEEDS = [
  { id: 1, title: 'Need ride to SeaTac Airport - Friday 5am', author: 'Robel T.', location: 'Seattle, WA', category: 'Transportation', urgency: 'Urgent', votes: 8, comments: 6, helpers: 2, time: '2h ago' },
  { id: 2, title: 'Looking for Habesha roommate in Columbia Heights', author: 'Kidist M.', location: 'Washington, DC', category: 'Housing', urgency: 'Normal', votes: 15, comments: 9, helpers: 3, time: '5h ago' },
  { id: 3, title: 'Need Tigrinya tutor for my 8-year-old', author: 'Sara A.', location: 'Atlanta, GA', category: 'Education', urgency: 'Normal', votes: 22, comments: 14, helpers: 4, time: '8h ago' },
  { id: 4, title: 'Seeking immigration lawyer for family petition', author: 'Liya F.', location: 'Los Angeles, CA', category: 'Legal', urgency: 'Urgent', votes: 33, comments: 19, helpers: 5, time: '12h ago' },
  { id: 5, title: 'Need help moving to new apartment Saturday', author: 'Dawit K.', location: 'Minneapolis, MN', category: 'Moving', urgency: 'Urgent', votes: 11, comments: 7, helpers: 1, time: '1d ago' },
  { id: 6, title: 'Looking for Amharic-speaking babysitter', author: 'Helen B.', location: 'Seattle, WA', category: 'Childcare', urgency: 'Normal', votes: 19, comments: 11, helpers: 3, time: '1d ago' },
  { id: 7, title: 'Need traditional coffee set for ceremony', author: 'Meron T.', location: 'Atlanta, GA', category: 'Items', urgency: 'Low', votes: 7, comments: 4, helpers: 2, time: '2d ago' },
  { id: 8, title: 'Looking for Eritrean restaurant job in DC', author: 'Yonas M.', location: 'Washington, DC', category: 'Employment', urgency: 'Normal', votes: 14, comments: 8, helpers: 2, time: '2d ago' },
  { id: 9, title: 'Need someone to teach me to drive', author: 'Almaz N.', location: 'Minneapolis, MN', category: 'Education', urgency: 'Normal', votes: 10, comments: 5, helpers: 1, time: '3d ago' },
  { id: 10, title: 'Seeking Habesha mentor in tech industry', author: 'Samuel D.', location: 'Remote', category: 'Career', urgency: 'Low', votes: 28, comments: 16, helpers: 6, time: '3d ago' },
  { id: 11, title: 'Need translator for medical appointment', author: 'Tsehay G.', location: 'Seattle, WA', category: 'Translation', urgency: 'Urgent', votes: 25, comments: 10, helpers: 4, time: '4d ago' },
  { id: 12, title: 'Looking for carpool to Ethiopian church Sunday', author: 'Bereket H.', location: 'Los Angeles, CA', category: 'Transportation', urgency: 'Normal', votes: 6, comments: 3, helpers: 1, time: '4d ago' },
];

const CATEGORIES = ['All', 'Transportation', 'Housing', 'Education', 'Legal', 'Moving', 'Childcare', 'Items', 'Employment', 'Career', 'Translation'];

export default function NeedsPage() {
  useAnalytics();
  const [filter, setFilter] = useState('All');
  const [needs, setNeeds] = useState(MOCK_NEEDS);

  const filtered = filter === 'All' ? needs : needs.filter((n) => n.category === filter);

  const vote = (id) => {
    setNeeds((prev) => prev.map((n) => (n.id === id ? { ...n, votes: n.votes + 1 } : n)));
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Needs Board</h1>
            <p className="text-gray-400 text-sm">Community help requests — lend a hand</p>
          </div>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-sm flex items-center gap-2">
            <FiPlus size={16} /> Post a Need
          </button>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === cat ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Needs list */}
        <div className="space-y-3">
          {filtered.map((need) => (
            <div key={need.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
              <div className="flex gap-3">
                {/* Vote column */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <button onClick={() => vote(need.id)} className="text-gray-500 hover:text-amber-400 transition-colors">
                    <FiChevronUp size={20} />
                  </button>
                  <span className="text-sm font-bold text-gray-300">{need.votes}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {need.urgency === 'Urgent' && (
                      <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded-full font-medium">Urgent</span>
                    )}
                    <span className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded-full">{need.category}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{need.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{need.author}</span>
                    <span>{need.location}</span>
                    <span>{need.time}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white">
                      <FiMessageCircle size={14} /> {need.comments} comments
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full font-medium">
                      <FiHeart size={14} /> I Can Help ({need.helpers})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
