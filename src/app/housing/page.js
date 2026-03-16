'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { ListingCard } from '@/components/housing/ListingCard';
import { FiSearch, FiPlus, FiLoader } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { housingApi } from '@/lib/api';
import { useAnalytics } from '@/lib/useAnalytics';

const TABS = ['All', 'Apartments', 'Rooms', 'Houses', 'Sublets'];

export default function HousingPage() {
  useAnalytics();
  const [tab, setTab] = useState('All');
  const [search, setSearch] = useState('');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (tab !== 'All') params.type = tab;
        if (search) params.search = search;
        const res = await housingApi.getListings(params);
        setListings(res.data?.data || res.data || []);
      } catch (err) {
        setError('Could not load listings.');
        console.error('Housing fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, [tab]);

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Housing</h1>
          <Button className="flex items-center gap-2">
            <FiPlus /> Post Listing
          </Button>
        </div>

        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by location, title..."
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

        {!loading && listings.length === 0 && !error && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
            <p className="text-lg font-medium">No listings found</p>
            <p className="mt-1">Try a different search or post your own listing</p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
