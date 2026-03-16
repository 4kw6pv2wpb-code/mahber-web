'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/Button';
import { FiPlus, FiSearch, FiLoader } from 'react-icons/fi';
import { eventsApi } from '@/lib/api';
import { useAnalytics } from '@/lib/useAnalytics';

const TABS = ['Upcoming', 'This Week', 'This Month', 'Past'];

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
      <div className="mx-auto max-w-5xl px-4 py-6">
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

        <div className="mb-6 flex gap-2">
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

        {loading && (
          <div className="flex justify-center py-12">
            <FiLoader className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center my-4">
            {error}
          </div>
        )}

        {!loading && events.length === 0 && !error && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
            <p className="text-lg font-medium">No events found</p>
            <p className="mt-1">Check back later or create your own event!</p>
          </div>
        )}

        {featured && !loading && (
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white shadow-lg">
            <span className="text-xs font-semibold uppercase tracking-wide opacity-80">Featured Event</span>
            <h2 className="mt-2 text-2xl font-bold">{featured.title}</h2>
            <p className="mt-1 opacity-90">
              {featured.date ? new Date(featured.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : ''}
              {featured.venue ? ` at ${featured.venue}` : ''}
            </p>
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
