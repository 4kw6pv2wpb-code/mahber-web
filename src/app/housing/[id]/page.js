'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { FiArrowLeft, FiMapPin, FiMessageSquare, FiHeart, FiShare2, FiCheck } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

const MOCK = {
  title: '2BR Near Little Ethiopia', type: 'Apartment', price: 1800, location: 'Fairfax Ave, Los Angeles, CA', beds: 2, baths: 1, sqft: 850,
  description: 'Beautiful 2-bedroom apartment just steps from Little Ethiopia on Fairfax. Walking distance to Meals by Genet, Rosalind\'s, and other favorite Habesha restaurants. Recently renovated with modern kitchen and in-unit laundry. Perfect for a Habesha roommate situation — we do Sunday injera tradition!',
  amenities: ['In-unit Laundry', 'Parking', 'Air Conditioning', 'Dishwasher', 'Pet Friendly', 'Near Public Transit', 'Near Habesha Shops'],
  poster: { name: 'Hiwet Ghebrehiwet', memberSince: 'Jan 2024', responseTime: '< 1 hour', listings: 3 },
  images: ['bg-gradient-to-br from-eritrean-blue/20 to-habesha-green/20', 'bg-gradient-to-br from-primary/20 to-accent/20', 'bg-gradient-to-br from-habesha-green/30 to-primary/20', 'bg-gradient-to-br from-habesha-yellow/20 to-habesha-red/20'],
};

export default function HousingDetailPage() {
  useAnalytics();
  const { id } = useParams();
  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-4 py-6">
        <Link href="/housing" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary dark:text-gray-400"><FiArrowLeft size={16} /> Back to Housing</Link>

        <div className="mb-6 grid grid-cols-2 gap-2 overflow-hidden rounded-xl">
          <div className={`h-64 ${MOCK.images[0]}`} />
          <div className="grid grid-cols-2 gap-2">
            {MOCK.images.slice(1).map((bg, i) => <div key={i} className={`h-[7.5rem] ${bg} rounded-lg`} />)}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="blue">{MOCK.type}</Badge>
                  <h1 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">{MOCK.title}</h1>
                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-500"><FiMapPin size={14} /> {MOCK.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${MOCK.price}<span className="text-sm font-normal text-gray-500">/mo</span></p>
                </div>
              </div>
              <div className="mt-3 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{MOCK.beds} Bedrooms</span><span>{MOCK.baths} Bathroom</span><span>{MOCK.sqft} sqft</span>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
              <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Description</h2>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{MOCK.description}</p>
              <h3 className="mb-2 mt-6 font-semibold text-gray-900 dark:text-white">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {MOCK.amenities.map(a => <span key={a} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><FiCheck size={14} className="text-habesha-green" />{a}</span>)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-dark-700 dark:bg-dark-800">
              <div className="mb-4 flex items-center gap-3">
                <Avatar name={MOCK.poster.name} size="lg" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{MOCK.poster.name}</p>
                  <p className="text-xs text-gray-500">Member since {MOCK.poster.memberSince}</p>
                </div>
              </div>
              <div className="mb-4 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                <p>⚡ Responds {MOCK.poster.responseTime}</p>
                <p>🏠 {MOCK.poster.listings} active listings</p>
              </div>
              <Button className="w-full" size="lg"><FiMessageSquare size={16} className="mr-1" /> Message</Button>
              <div className="mt-3 flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-dark-600 dark:text-gray-400 dark:hover:bg-dark-700"><FiHeart size={16} /> Save</button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-dark-600 dark:text-gray-400 dark:hover:bg-dark-700"><FiShare2 size={16} /> Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
