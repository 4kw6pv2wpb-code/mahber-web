'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { FiPlus } from 'react-icons/fi';

const MOCK_STORIES = [
  { id: 1, name: 'Selam T.', color: 'from-amber-400 via-rose-500 to-purple-600' },
  { id: 2, name: 'Dawit M.', color: 'from-habesha-green via-emerald-400 to-eritrean-blue' },
  { id: 3, name: 'Hiwet G.', color: 'from-accent via-pink-500 to-primary' },
  { id: 4, name: 'Kidist A.', color: 'from-eritrean-blue via-cyan-400 to-habesha-green' },
  { id: 5, name: 'Yonas H.', color: 'from-habesha-red via-orange-500 to-primary' },
  { id: 6, name: 'Meron B.', color: 'from-primary via-amber-400 to-accent' },
  { id: 7, name: 'Abel K.', color: 'from-indigo-500 via-purple-500 to-pink-500' },
];

export function StoryRow() {
  return (
    <div className="mb-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {/* Add Story */}
      <div className="flex shrink-0 flex-col items-center gap-1">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-gray-300 transition-colors hover:border-primary dark:border-dark-600">
          <FiPlus size={20} className="text-gray-400" />
        </div>
        <span className="text-xs text-gray-500">Add Story</span>
      </div>
      {/* Stories with Instagram-style gradient rings */}
      {MOCK_STORIES.map((s) => (
        <div key={s.id} className="flex shrink-0 cursor-pointer flex-col items-center gap-1 group">
          <div className={`rounded-full bg-gradient-to-br ${s.color} p-[2.5px] transition-transform group-hover:scale-105`}>
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-gray-100 to-gray-200 text-sm font-bold text-gray-600 dark:border-dark-800 dark:from-dark-700 dark:to-dark-600 dark:text-gray-300">
              {s.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <span className="max-w-[64px] truncate text-xs text-gray-600 dark:text-gray-400">{s.name}</span>
        </div>
      ))}
    </div>
  );
}
