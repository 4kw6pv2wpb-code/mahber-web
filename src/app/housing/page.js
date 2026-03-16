'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiMapPin, FiHome, FiPlus, FiUser } from 'react-icons/fi';
import AppLayout from '@/components/layout/AppLayout';
import { useAnalytics } from '@/lib/useAnalytics';

const CITIES = ['All Cities', 'Seattle, WA', 'Washington, DC', 'Los Angeles, CA', 'Atlanta, GA', 'Minneapolis, MN', 'Columbus, OH'];
const TYPES = ['All Types', 'Apartment', 'Room', 'House', 'Sublet'];

const LISTINGS = [
  { id: '1', title: '2BR Apartment in Rainier Beach', price: '$1,450/mo', beds: 2, type: 'Apartment', city: 'Seattle, WA', poster: 'Meron T.', posted: '2 days ago', desc: 'Spacious 2BR near Ethiopian restaurants. Laundry in building. Bus line nearby.' },
  { id: '2', title: 'Room in Columbia Heights townhouse', price: '$850/mo', beds: 1, type: 'Room', city: 'Washington, DC', poster: 'Kidist M.', posted: '1 day ago', desc: 'Furnished room in Habesha household. Shared kitchen. Female preferred.' },
  { id: '3', title: '1BR near Little Ethiopia', price: '$1,800/mo', beds: 1, type: 'Apartment', city: 'Los Angeles, CA', poster: 'Liya F.', posted: '3 days ago', desc: 'Walking distance to Fairfax District. Modern building with gym.' },
  { id: '4', title: 'Room for rent near Clarkston', price: '$600/mo', beds: 1, type: 'Room', city: 'Atlanta, GA', poster: 'Bereket H.', posted: '4 days ago', desc: 'Quiet room in the Habesha community area. All utilities included.' },
  { id: '5', title: '3BR House in Cedar-Riverside', price: '$1,800/mo', beds: 3, type: 'House', city: 'Minneapolis, MN', poster: 'Yonas M.', posted: '1 day ago', desc: 'Family home in the heart of the East African community. Fenced yard.' },
  { id: '6', title: 'Studio in Capitol Hill', price: '$1,200/mo', beds: 0, type: 'Apartment', city: 'Seattle, WA', poster: 'Dawit K.', posted: '5 days ago', desc: 'Cozy studio near Ethiopian restaurants on Cherry St. Pet friendly.' },
  { id: '7', title: 'Summer Sublet - U Street', price: '$1,100/mo', beds: 1, type: 'Sublet', city: 'Washington, DC', poster: 'Helen B.', posted: '2 days ago', desc: 'Subletting June-August. Furnished 1BR. Walk to Adams Morgan.' },
  { id: '8', title: '2BR in Koreatown near Ethiopian strip', price: '$2,100/mo', beds: 2, type: 'Apartment', city: 'Los Angeles, CA', poster: 'Samuel D.', posted: '6 days ago', desc: 'New construction. In-unit laundry. Near several Habesha restaurants.' },
  { id: '9', title: 'Room in family home - south Atlanta', price: '$550/mo', beds: 1, type: 'Room', city: 'Atlanta, GA', poster: 'Tigist L.', posted: '3 days ago', desc: 'Room in Habesha family home. Home-cooked meals available. Students welcome.' },
  { id: '10', title: '1BR Apartment near Somali Mall', price: '$950/mo', beds: 1, type: 'Apartment', city: 'Minneapolis, MN', poster: 'Fatima O.', posted: '1 day ago', desc: 'Affordable 1BR in Lake Street area. Close to halal groceries and restaurants.' },
  { id: '11', title: '2BR near Columbus Habesha community', price: '$1,100/mo', beds: 2, type: 'Apartment', city: 'Columbus, OH', poster: 'Abel G.', posted: '4 days ago', desc: 'Growing Habesha community in Columbus. Close to Ethiopian church.' },
  { id: '12', title: 'Shared Room - Central District', price: '$650/mo', beds: 1, type: 'Room', city: 'Seattle, WA', poster: 'Robel T.', posted: '2 days ago', desc: 'Room in shared house with 3 other Habesha guys. Chill vibe. Close to downtown.' },
  { id: '13', title: '1BR Sublet - Silver Spring', price: '$1,300/mo', beds: 1, type: 'Sublet', city: 'Washington, DC', poster: 'Sara A.', posted: '5 days ago', desc: '3-month sublet in Silver Spring. Near Ethiopian restaurants on Georgia Ave.' },
  { id: '14', title: '4BR Family Home', price: '$2,500/mo', beds: 4, type: 'House', city: 'Atlanta, GA', poster: 'Michael A.', posted: '1 week ago', desc: 'Large family home in Clarkston. Near International market. Great schools.' },
  { id: '15', title: 'Room in Columbus apartment', price: '$500/mo', beds: 1, type: 'Room', city: 'Columbus, OH', poster: 'Ephrem B.', posted: '3 days ago', desc: 'Looking for Habesha roommate. Close to OSU campus. Utilities split.' },
];

export default function HousingPage() {
  useAnalytics();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('All Cities');
  const [type, setType] = useState('All Types');
  const [priceMax, setPriceMax] = useState('');

  const filtered = LISTINGS.filter((l) => {
    if (city !== 'All Cities' && l.city !== city) return false;
    if (type !== 'All Types' && l.type !== type) return false;
    if (search && !l.title.toLowerCase().includes(search.toLowerCase()) && !l.desc.toLowerCase().includes(search.toLowerCase())) return false;
    if (priceMax) {
      const price = parseInt(l.price.replace(/[$,/mo]/g, ''));
      if (price > parseInt(priceMax)) return false;
    }
    return true;
  });

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Housing</h1>
            <p className="text-gray-400 text-sm">{LISTINGS.length} listings from the community</p>
          </div>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-sm flex items-center gap-2">
            <FiPlus size={16} /> Post Listing
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search housing..."
            className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-amber-500"
          >
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-amber-500"
          >
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder="Max $/mo"
            className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 w-28 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Listings */}
        <div className="space-y-3">
          {filtered.map((listing) => (
            <Link
              key={listing.id}
              href={`/housing/${listing.id}`}
              className="block bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">{listing.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                    <span className="flex items-center gap-1"><FiMapPin size={12} /> {listing.city}</span>
                    <span className="flex items-center gap-1"><FiHome size={12} /> {listing.beds === 0 ? 'Studio' : `${listing.beds}BR`}</span>
                    <span className="px-2 py-0.5 bg-gray-800 rounded text-xs">{listing.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-amber-400">{listing.price}</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 line-clamp-1 mb-2">{listing.desc}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FiUser size={10} /> Posted by {listing.poster} • {listing.posted}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">No listings match your filters</div>
        )}
      </div>
    </AppLayout>
  );
}
