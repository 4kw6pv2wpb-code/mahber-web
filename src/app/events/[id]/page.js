'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { FiArrowLeft, FiMapPin, FiClock, FiUsers, FiShare2, FiCalendar } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

const MOCK = {
  title: 'Seattle Habesha Night', time: 'Saturday, March 15, 2026 · 8:00 PM – 2:00 AM', venue: 'The Showbox', address: '1426 1st Ave, Seattle, WA 98101', attendees: 234, price: '$25',
  description: 'Join us for the biggest Habesha night in Seattle! Live DJ playing the best Ethiopian and Eritrean music — from classic Teddy Afro to Eritrean guayla beats. Traditional and modern dress welcome. VIP tables available. 21+ only. Come celebrate our culture and connect with the community!',
  organizer: { name: 'Seattle Habesha Events', members: 1200 },
  attendeeNames: ['Selam T.', 'Dawit M.', 'Hiwet G.', 'Yonas H.', 'Kidist A.', 'Meron B.'],
};

export default function EventDetailPage() {
  useAnalytics();
  const { id } = useParams();
  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-4 py-6">
        <Link href="/events" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary dark:text-gray-400"><FiArrowLeft size={16} /> Back to Events</Link>

        <div className="mb-6 h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 to-habesha-red/30" />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
              <Badge variant="primary">{MOCK.price === 'Free' ? 'Free' : MOCK.price}</Badge>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{MOCK.title}</h1>
              <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p className="flex items-center gap-2"><FiClock size={16} className="text-primary" /> {MOCK.time}</p>
                <p className="flex items-center gap-2"><FiMapPin size={16} className="text-primary" /> {MOCK.venue} · {MOCK.address}</p>
                <p className="flex items-center gap-2"><FiUsers size={16} className="text-primary" /> {MOCK.attendees} people going</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="lg" className="flex-1">RSVP — {MOCK.price}</Button>
                <button className="rounded-xl border border-gray-200 p-3 text-gray-400 hover:bg-gray-50 hover:text-primary dark:border-dark-600"><FiShare2 size={20} /></button>
                <button className="rounded-xl border border-gray-200 p-3 text-gray-400 hover:bg-gray-50 hover:text-primary dark:border-dark-600"><FiCalendar size={20} /></button>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
              <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">About</h2>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{MOCK.description}</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
              <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Attendees ({MOCK.attendees})</h2>
              <div className="flex flex-wrap gap-3">
                {MOCK.attendeeNames.map(name => (
                  <div key={name} className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 dark:bg-dark-700">
                    <Avatar name={name} size="sm" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
                  </div>
                ))}
                <div className="flex items-center rounded-full bg-gray-50 px-3 py-1.5 text-sm text-gray-500 dark:bg-dark-700">+{MOCK.attendees - 6} more</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-dark-700 dark:bg-dark-800">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Organizer</h3>
              <div className="flex items-center gap-3">
                <Avatar name={MOCK.organizer.name} size="lg" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{MOCK.organizer.name}</p>
                  <p className="text-xs text-gray-500">{MOCK.organizer.members} members</p>
                </div>
              </div>
              <Button variant="secondary" className="mt-3 w-full" size="md">Follow</Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-dark-700">
              <div className="h-40 bg-gray-200 dark:bg-dark-700 flex items-center justify-center text-sm text-gray-400">📍 Map</div>
              <div className="bg-white p-3 dark:bg-dark-800">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{MOCK.venue}</p>
                <p className="text-xs text-gray-500">{MOCK.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
