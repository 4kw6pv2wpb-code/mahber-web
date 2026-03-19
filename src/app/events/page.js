'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/Button';
import { FiPlus, FiSearch, FiCalendar } from 'react-icons/fi';
import { eventsApi } from '@/lib/api';
import { useAnalytics } from '@/lib/useAnalytics';

const TABS = ['Upcoming', 'This Week', 'This Month', 'Past'];

function EventsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="skeleton h-40 w-full rounded-none" />
          <div className="p-4 space-y-2">
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-3 w-1/2" />
            <div className="skeleton h-3 w-2/3" />
            <div className="skeleton h-9 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventsPage() {
  useAnalytics();
  const [tab, setTab] = useState('Upcoming');
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (tab === 'Past') params.past = true;
        if (search) params.search = search;
        const res = await eventsApi.getEvents(params);
        setEvents(res.data?.data || res.data || []);
      } catch (err) {
        setError('Could not load events.');
        console.error('Events fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [tab]);

  const featured = events[0];

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 py-6 page-fade-in">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <Button className="flex items-center gap-2">
            <FiPlus /> Create Event
          </Button>
        </div>

        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                tab === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading && <EventsSkeleton />}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center my-4">
            {error}
          </div>
        )}

        {!loading && events.length === 0 && !error && (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <FiCalendar className="text-primary" size={28} />
            </div>
            <p className="text-lg font-semibold text-gray-900">No events found</p>
            <p className="mt-1 text-gray-500">Check back later or create your own event!</p>
          </div>
        )}

        {featured && !loading && (
          <div className="mb-6 relative rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-amber-600" />
            <div className="absolute inset-0 bg-ethiopian-pattern opacity-30" />
            <div className="relative p-6 text-white">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">Featured Event</span>
              <h2 className="mt-3 text-2xl font-bold">{featured.title}</h2>
              <p className="mt-1 opacity-90">
                {featured.date ? new Date(featured.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : ''}
                {featured.venue ? ` at ${featured.venue}` : ''}
              </p>
              <button className="mt-4 rounded-lg bg-white px-5 py-2 text-sm font-bold text-primary hover:bg-white/90 transition-colors">
                RSVP Now
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(featured ? 1 : 0).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
