'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSearch, FiMapPin, FiHome, FiPlus, FiUser, FiGrid } from 'react-icons/fi';
import AppLayout from '@/components/layout/AppLayout';
import { housingApi } from '@/lib/api';
import { useAnalytics } from '@/lib/useAnalytics';

const CITIES = ['All Cities', 'Seattle, WA', 'Washington, DC', 'Los Angeles, CA', 'Atlanta, GA', 'Minneapolis, MN', 'Columbus, OH'];
const TYPES = ['All Types', 'Apartment', 'Room', 'House', 'Sublet'];

const TYPE_GRADIENTS = {
  Apartment: 'from-blue-500/80 to-indigo-600/80',
  Room: 'from-violet-500/80 to-purple-600/80',
  House: 'from-emerald-500/80 to-green-600/80',
  Sublet: 'from-amber-500/80 to-orange-600/80',
};

const TYPE_ICONS = {
  Apartment: '🏢',
  Room: '🛏️',
  House: '🏡',
  Sublet: '📋',
};

const MOCK_LISTINGS = [
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

function HousingSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden">
          <div className="skeleton h-40 w-full rounded-none !bg-gray-800" />
          <div className="p-4 space-y-2">
            <div className="skeleton h-5 w-24 !bg-gray-700" />
            <div className="skeleton h-4 w-full !bg-gray-700" />
            <div className="skeleton h-3 w-2/3 !bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HousingPage() {
  useAnalytics();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('All Cities');
  const [type, setType] = useState('All Types');
  const [priceMax, setPriceMax] = useState('');
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const res = await housingApi.getListings();
        const raw = res.data?.data ?? res.data?.listings ?? res.data;
        const data = Array.isArray(raw) ? raw : [];
        if (data.length > 0) {
          const normalized = data.map((item) => ({
            id: item.id,
            title: item.title || '',
            price: typeof item.rent === 'number' ? `$${item.rent.toLocaleString()}/mo` : item.price || '',
            beds: item.bedrooms ?? item.beds ?? 0,
            type: item.listingType || item.type || '',
            city: item.city || item.location || '',
            poster: typeof item.poster === 'object' ? item.poster?.name : item.poster || 'Community member',
            posted: item.posted || '',
            desc: item.description || item.desc || '',
          }));
          setListings(normalized);
        }
      } catch (err) {
        console.error('Failed to fetch housing, using mock data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, []);

  const filtered = listings.filter((l) => {
    if (city !== 'All Cities' && l.city !== city) return false;
    if (type !== 'All Types' && l.type !== type) return false;
    if (search && !l.title.toLowerCase().includes(search.toLowerCase()) && !(l.desc || l.description || '').toLowerCase().includes(search.toLowerCase())) return false;
    if (priceMax) {
      const priceStr = typeof l.price === 'number' ? String(l.price) : l.price;
      const price = parseInt(priceStr.replace(/[$,/mo]/g, ''));
      if (price > parseInt(priceMax)) return false;
    }
    return true;
  });

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-6 page-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Housing</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{listings.length} listings from the community</p>
          </div>
          <button className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-sm flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20">
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
            className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-amber-500"
          >
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-amber-500"
          >
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder="Max $/mo"
            className="w-full sm:w-auto px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 w-28 focus:outline-none focus:border-amber-500"
          />
        </div>

        {loading && <HousingSkeleton />}

        {/* Listings — Card grid with images */}
        {!loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing) => {
              const gradient = TYPE_GRADIENTS[listing.type] || 'from-gray-500/80 to-gray-600/80';
              const icon = TYPE_ICONS[listing.type] || '🏠';
              return (
                <Link
                  key={listing.id}
                  href={`/housing/${listing.id}`}
                  className="group block bg-gray-900 border border-gray-800 rounded-xl overflow-hidden card-hover hover:border-gray-700 transition-all"
                >
                  {/* Gradient image placeholder */}
                  <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <span className="text-5xl opacity-40">{icon}</span>
                    {/* Price badge */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg">
                      <span className="text-lg font-bold text-amber-400">{typeof listing.price === 'number' ? `$${listing.price}/mo` : listing.price}</span>
                    </div>
                    {/* Type badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                        {listing.type}
                      </span>
                      <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                        <FiHome size={10} />
                        {listing.beds === 0 ? 'Studio' : `${listing.beds} BR`}
                      </span>
                    </div>
                  </div>

                  {/* Card details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-2">{listing.title}</h3>
                    <p className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                      <FiMapPin size={12} /> {listing.city || listing.location}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-2">{listing.desc || listing.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-800">
                      <FiUser size={10} /> {listing.poster || listing.user?.name || 'Community member'}
                      {listing.posted && <span className="text-gray-600">• {listing.posted}</span>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
              <FiHome className="text-gray-500" size={28} />
            </div>
            <p className="text-lg font-semibold text-white">No listings match your filters</p>
            <p className="text-gray-500 mt-1">Try adjusting your search criteria or be the first to post!</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
