'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { FiMapPin, FiUsers, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';

const EVENT_GRADIENTS = [
  'from-primary/30 via-amber-200/30 to-orange-300/20',
  'from-violet-300/30 via-purple-200/30 to-pink-200/20',
  'from-emerald-300/30 via-teal-200/30 to-cyan-200/20',
  'from-rose-300/30 via-pink-200/30 to-red-200/20',
  'from-blue-300/30 via-indigo-200/30 to-violet-200/20',
];

export function EventCard({ event }) {
  let month = event.month || '';
  let day = event.day || '';
  let time = event.time || '';
  let venue = event.venue || event.location || '';
  let attendees = event.attendees || event._count?.attendees || 0;
  let coverUrl = event.coverUrl || null;
  let city = event.city || '';

  if (event.date && !month) {
    try {
      const d = new Date(event.date);
      month = format(d, 'MMM').toUpperCase();
      day = format(d, 'd');
      // Format time in local timezone
      time = format(d, 'EEE, MMM d · h:mm a');
    } catch {}
  }

  if (!venue && city) {
    venue = city + (event.country ? `, ${event.country}` : '');
  }

  const price = event.price || 'Free';
  const gradientIdx = (event.title || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0) % EVENT_GRADIENTS.length;

  return (
    <Link href={`/events/${event.id}`} className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition-all card-hover hover:border-primary/30 dark:border-dark-700 dark:bg-dark-800 dark:hover:border-primary/40">
      {/* Cover image with fallback gradient + cultural pattern */}
      <div className="relative h-40">
        {coverUrl ? (
          <img src={coverUrl} alt={event.title} className="h-full w-full object-cover" />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${EVENT_GRADIENTS[gradientIdx]} bg-ethiopian-pattern dark:bg-ethiopian-pattern-dark`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl opacity-20">🎉</span>
            </div>
          </div>
        )}
        {/* Date badge */}
        <div className="absolute left-3 top-3 flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-white/95 shadow-md backdrop-blur-sm dark:bg-dark-800/95">
          <span className="text-xs font-bold uppercase text-primary">{month}</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">{day}</span>
        </div>
        {price && (
          <div className="absolute right-3 top-3">
            <Badge variant={price === 'Free' ? 'green' : 'primary'}>{price}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-primary dark:text-white transition-colors">{event.title}</h3>
        <div className="mt-2 space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
          {time && (
            <p className="flex items-center gap-1.5"><FiClock size={13} /> {time}</p>
          )}
          {venue && (
            <p className="flex items-center gap-1.5"><FiMapPin size={13} /> {venue}</p>
          )}
          <p className="flex items-center gap-1.5"><FiUsers size={13} /> {attendees} going{event.maxAttendees ? ` / ${event.maxAttendees} spots` : ''}</p>
        </div>
        <div className="mt-3">
          <button className="w-full rounded-lg bg-amber-500 py-2 text-sm font-semibold text-black hover:bg-amber-600 transition-colors shadow-sm">
            RSVP
          </button>
        </div>
      </div>
    </Link>
  );
}
