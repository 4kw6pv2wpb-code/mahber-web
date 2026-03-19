'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState } from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiPlus, FiTrendingUp } from 'react-icons/fi';
import AppLayout from '@/components/layout/AppLayout';
import { useAnalytics } from '@/lib/useAnalytics';

const MOCK_GROUPS = [
  { id: 1, name: 'Seattle Habesha Edir', type: 'Edir', members: 24, maxMembers: 30, contribution: '$100/mo', collected: 18500, goal: 24000, nextMeeting: 'April 5, 2026', frequency: 'Monthly', desc: 'Mutual aid society for Seattle Habesha community. Emergency fund and community support.' },
  { id: 2, name: 'DC Women Equb Circle', type: 'Equb', members: 12, maxMembers: 12, contribution: '$200/mo', collected: 9600, goal: 14400, nextMeeting: 'April 1, 2026', frequency: 'Monthly', desc: 'Rotating savings for Habesha women in the DMV area. Established 2024.' },
  { id: 3, name: 'Atlanta Youth Savings', type: 'Equb', members: 8, maxMembers: 15, contribution: '$50/mo', collected: 2400, goal: 4500, nextMeeting: 'April 10, 2026', frequency: 'Monthly', desc: 'Young professionals building savings together. Ages 21-35.' },
  { id: 4, name: 'Minneapolis Community Edir', type: 'Edir', members: 40, maxMembers: 50, contribution: '$75/mo', collected: 42000, goal: 45000, nextMeeting: 'March 28, 2026', frequency: 'Monthly', desc: 'The largest Habesha edir in Minnesota. Funeral support and emergency assistance.' },
  { id: 5, name: 'Tech Professionals Equb', type: 'Equb', members: 10, maxMembers: 10, contribution: '$500/mo', collected: 25000, goal: 30000, nextMeeting: 'April 15, 2026', frequency: 'Monthly', desc: 'High-value rotating savings for Habesha tech workers. Investment-focused.' },
  { id: 6, name: 'LA Eritrean Edir', type: 'Edir', members: 18, maxMembers: 25, contribution: '$80/mo', collected: 10800, goal: 15000, nextMeeting: 'April 3, 2026', frequency: 'Monthly', desc: 'Eritrean community mutual aid in greater Los Angeles area.' },
  { id: 7, name: 'Habesha Moms Equb', type: 'Equb', members: 15, maxMembers: 15, contribution: '$150/mo', collected: 11250, goal: 13500, nextMeeting: 'April 8, 2026', frequency: 'Monthly', desc: 'Savings circle for Habesha mothers. Supporting each other financially.' },
  { id: 8, name: 'Seattle New Arrivals Fund', type: 'Edir', members: 12, maxMembers: 20, contribution: '$60/mo', collected: 4320, goal: 7200, nextMeeting: 'April 12, 2026', frequency: 'Monthly', desc: 'Helping newly arrived Habesha community members get settled in Seattle.' },
];

export default function EdirPage() {
  useAnalytics();
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? MOCK_GROUPS : MOCK_GROUPS.filter((g) => g.type === filter);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-white">Edir & Equb Groups</h1>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-sm flex items-center gap-2">
            <FiPlus size={16} /> Create Group
          </button>
        </div>
        <p className="text-gray-400 text-sm mb-6">Traditional community savings, digitized. Join a group or start your own.</p>

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
            <h3 className="font-semibold text-amber-400 mb-1">What is Edir?</h3>
            <p className="text-sm text-gray-400">A mutual aid society where members contribute monthly to support each other during emergencies, funerals, and hardships.</p>
          </div>
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
            <h3 className="font-semibold text-blue-400 mb-1">What is Equb?</h3>
            <p className="text-sm text-gray-400">A rotating savings circle where members contribute equally and take turns receiving the full pot. Like a community-powered savings account.</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {['All', 'Edir', 'Equb'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === t ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Groups grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((group) => {
            const progress = Math.round((group.collected / group.goal) * 100);
            return (
              <div key={group.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    group.type === 'Edir' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {group.type}
                  </span>
                  <span className="text-xs text-gray-500">{group.frequency}</span>
                </div>
                <h3 className="font-bold text-white mb-1">{group.name}</h3>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{group.desc}</p>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">${group.collected.toLocaleString()} collected</span>
                    <span className="text-amber-400 font-medium">{progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${group.type === 'Edir' ? 'bg-amber-500' : 'bg-blue-500'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><FiUsers size={12} /> {group.members}/{group.maxMembers}</span>
                  <span className="flex items-center gap-1"><FiDollarSign size={12} /> {group.contribution}</span>
                  <span className="flex items-center gap-1"><FiCalendar size={12} /> {group.nextMeeting}</span>
                </div>

                <button className={`w-full py-2 rounded-lg text-sm font-bold transition-colors ${
                  group.members >= group.maxMembers
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-600 text-black'
                }`} disabled={group.members >= group.maxMembers}>
                  {group.members >= group.maxMembers ? 'Full' : 'Join Group'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
