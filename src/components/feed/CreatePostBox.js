'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { FiImage, FiVideo, FiCalendar, FiBarChart2 } from 'react-icons/fi';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/lib/auth-context';

export function CreatePostBox({ onOpen }) {
  const { user } = useAuth();
  return (
    <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-dark-700 dark:bg-dark-800">
      <div className="flex items-center gap-3">
        <Avatar name={user?.name || 'User'} size="md" />
        <button onClick={onOpen} className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-left text-sm text-gray-500 hover:bg-gray-100 dark:border-dark-600 dark:bg-dark-700 dark:text-gray-400 dark:hover:bg-dark-600">
          What&apos;s on your mind?
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-1 border-t border-gray-100 pt-3 dark:border-dark-700">
        <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-700"><FiImage size={18} className="text-habesha-green" /> Photo</button>
        <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-700"><FiVideo size={18} className="text-habesha-red" /> Video</button>
        <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-700"><FiCalendar size={18} className="text-primary" /> Event</button>
        <button className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-700 sm:flex"><FiBarChart2 size={18} className="text-eritrean-blue" /> Poll</button>
      </div>
    </div>
  );
}
