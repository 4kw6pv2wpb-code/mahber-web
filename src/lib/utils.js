/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

/**
 * Convert a date string/Date to a human-readable relative time.
 * e.g. "2 hours ago", "Yesterday", "3 days ago"
 */
export function timeAgo(date) {
  if (!date) return '';
  const now = new Date();
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';

  const seconds = Math.floor((now - d) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Deterministic color for a name string — used for company/user initial circles.
 */
const BRAND_COLORS = [
  'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500',
  'bg-amber-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-teal-500',
  'bg-pink-500', 'bg-orange-500',
];

export function nameColor(name = '') {
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return BRAND_COLORS[hash % BRAND_COLORS.length];
}
