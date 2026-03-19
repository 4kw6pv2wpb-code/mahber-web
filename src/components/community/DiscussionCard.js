'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import Link from 'next/link';
import { FiMessageCircle, FiHeart, FiEye } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

const TAG_COLORS = {
  Question: 'bg-eritrean-blue/10 text-eritrean-blue',
  Discussion: 'bg-primary/10 text-primary',
  Announcement: 'bg-habesha-red/10 text-habesha-red',
  Advice: 'bg-habesha-green/10 text-habesha-green',
  Culture: 'bg-accent/10 text-accent',
  Food: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
  Business: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
  Language: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400',
};

export function DiscussionCard({ post }) {
  // Map API fields to component fields
  const tag = post.tag || 'Discussion';
  const title = post.title || (post.content ? post.content.substring(0, 80) + (post.content.length > 80 ? '...' : '') : 'Untitled');
  const preview = post.preview || post.content || '';
  const replyCount = post.replyCount || post.commentsCount || 0;
  const likeCount = post.likeCount || post.likesCount || 0;
  const views = post.views || 0;
  const authorName = typeof post.author === 'string' ? post.author : post.author?.name || 'User';
  const tagColor = TAG_COLORS[tag] || 'bg-gray-100 text-gray-600 dark:bg-dark-700 dark:text-gray-400';

  let timeAgo = '';
  try {
    timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  } catch {
    timeAgo = '';
  }

  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md dark:border-dark-700 dark:bg-dark-800 dark:hover:border-primary/30">
      {/* Tag */}
      <div className="mb-2">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColor}`}>
          {tag}
        </span>
      </div>

      {/* Title */}
      <Link href={`/community/${post.id}`}>
        <h3 className="mb-1 text-base font-semibold text-gray-900 group-hover:text-primary dark:text-white">
          {title}
        </h3>
      </Link>

      {/* Preview text */}
      <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
        {preview}
      </p>

      {/* Author + Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {authorName.charAt(0)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">{authorName}</span>
            <span>&middot;</span>
            <span>{timeAgo}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <FiMessageCircle size={14} />
            {replyCount}
          </span>
          <span className="flex items-center gap-1">
            <FiHeart size={14} />
            {likeCount}
          </span>
          <span className="flex items-center gap-1">
            <FiEye size={14} />
            {views}
          </span>
        </div>
      </div>
    </div>
  );
}
