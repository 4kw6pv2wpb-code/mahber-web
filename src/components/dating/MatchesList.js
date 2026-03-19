'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import Link from 'next/link';
import { FiUser } from 'react-icons/fi';

const MOCK_MATCHES = [
  { id: 'm1', name: 'Selam', isNew: true },
  { id: 'm2', name: 'Dawit', isNew: true },
  { id: 'm3', name: 'Hiwet', isNew: false },
  { id: 'm4', name: 'Yonas', isNew: false },
  { id: 'm5', name: 'Meron', isNew: false },
];

export function MatchesList() {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Your Matches</h3>
        <Link
          href="/dating/matches"
          className="text-xs font-medium text-primary hover:underline"
        >
          See all
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {MOCK_MATCHES.map((match) => (
          <Link
            key={match.id}
            href="/dating/matches"
            className="flex flex-shrink-0 flex-col items-center gap-1"
          >
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-500">
                <FiUser size={24} className="text-white/60" />
              </div>
              {match.isNew && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-white ring-2 ring-white dark:ring-dark-800">
                  !
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {match.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
