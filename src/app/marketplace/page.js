'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSearch, FiMapPin, FiGrid, FiPlus, FiShoppingBag, FiMessageCircle } from 'react-icons/fi';
import AppLayout from '@/components/layout/AppLayout';
import { marketplaceApi } from '@/lib/api';
import { useAnalytics } from '@/lib/useAnalytics';

const CATEGORIES = ['All', 'Traditional', 'Food & Spice', 'Art & Decor', 'Jewelry', 'Clothing', 'Books', 'Electronics', 'Services'];

const MOCK_ITEMS = [
  { id: '1', title: 'Handmade Jebena Coffee Set', price: '$85', category: 'Traditional', seller: 'Abel G.', location: 'Minneapolis, MN', img: '\u2615' },
  { id: '2', title: 'Traditional Coffee Ceremony Kit', price: '$120', category: 'Traditional', seller: 'Meron T.', location: 'Seattle, WA', img: '\ud83e\uded6' },
  { id: '3', title: 'Habesha Kemis - White/Gold', price: '$180', category: 'Clothing', seller: 'Almaz N.', location: 'Washington, DC', img: '\ud83d\udc57' },
  { id: '4', title: 'Netela (Traditional Shawl)', price: '$65', category: 'Clothing', seller: 'Sara A.', location: 'Atlanta, GA', img: '\ud83e\udde3' },
  { id: '5', title: 'Mesob (Injera Basket)', price: '$95', category: 'Traditional', seller: 'Dawit K.', location: 'Seattle, WA', img: '\ud83e\udea7' },
  { id: '6', title: 'Berbere Spice Mix (1lb)', price: '$15', category: 'Food & Spice', seller: 'Helen B.', location: 'Los Angeles, CA', img: '\ud83c\udf36\ufe0f' },
  { id: '7', title: 'Mitmita Hot Spice Blend', price: '$12', category: 'Food & Spice', seller: 'Helen B.', location: 'Los Angeles, CA', img: '\ud83e\uded9' },
  { id: '8', title: 'Ethiopian Cross Necklace - Silver', price: '$45', category: 'Jewelry', seller: 'Tigist L.', location: 'Atlanta, GA', img: '\u271d\ufe0f' },
  { id: '9', title: 'Habesha Gold Earrings', price: '$75', category: 'Jewelry', seller: 'Rahel W.', location: 'Washington, DC', img: '\ud83d\udc8d' },
  { id: '10', title: 'Ethiopian Canvas Art - Addis Skyline', price: '$150', category: 'Art & Decor', seller: 'Samuel D.', location: 'Seattle, WA', img: '\ud83c\udfa8' },
  { id: '11', title: 'Queen of Sheba Painting (framed)', price: '$200', category: 'Art & Decor', seller: 'Yonas M.', location: 'Washington, DC', img: '\ud83d\uddbc\ufe0f' },
  { id: '12', title: 'Teff Flour (5lb bag)', price: '$18', category: 'Food & Spice', seller: 'Merkato Market', location: 'Seattle, WA', img: '\ud83c\udf3e' },
  { id: '13', title: 'Traditional Eritrean Dress', price: '$160', category: 'Clothing', seller: 'Fatima O.', location: 'Minneapolis, MN', img: '\ud83d\udc58' },
  { id: '14', title: "Ge'ez Script Wall Art", price: '$80', category: 'Art & Decor', seller: 'Bereket H.', location: 'Atlanta, GA', img: '\ud83d\udcdc' },
  { id: '15', title: 'Ethiopian History Book Collection', price: '$45', category: 'Books', seller: 'Michael A.', location: 'Washington, DC', img: '\ud83d\udcda' },
  { id: '16', title: "Amharic Children's Books (set of 5)", price: '$35', category: 'Books', seller: 'Kidist R.', location: 'Minneapolis, MN', img: '\ud83d\udcd6' },
  { id: '17', title: 'Handwoven Habesha Basket Set', price: '$55', category: 'Art & Decor', seller: 'Liya F.', location: 'Los Angeles, CA', img: '\ud83e\udeba' },
  { id: '18', title: 'Ethiopian Flag Bracelet', price: '$20', category: 'Jewelry', seller: 'Robel T.', location: 'Seattle, WA', img: '\ud83c\uddea\ud83c\uddf9' },
  { id: '19', title: 'Shiro Powder (2lb)', price: '$10', category: 'Food & Spice', seller: 'Tsehay G.', location: 'Atlanta, GA', img: '\ud83e\udd58' },
  { id: '20', title: 'iPhone 14 Pro (used, great condition)', price: '$550', category: 'Electronics', seller: 'Ephrem B.', location: 'Washington, DC', img: '\ud83d\udcf1' },
  { id: '21', title: 'Traditional Zuriya Dress', price: '$140', category: 'Clothing', seller: 'Hiwot Z.', location: 'Los Angeles, CA', img: '\ud83d\udc57' },
  { id: '22', title: 'Handmade Incense & Etan Set', price: '$25', category: 'Traditional', seller: 'Abel G.', location: 'Minneapolis, MN', img: '\ud83d\udd6f\ufe0f' },
  { id: '23', title: 'Habesha Spice Gift Box', price: '$40', category: 'Food & Spice', seller: 'Merkato Market', location: 'Seattle, WA', img: '\ud83c\udf81' },
  { id: '24', title: 'Photography: Habesha Weddings', price: '$3,000', category: 'Services', seller: 'Henok G.', location: 'Washington, DC', img: '\ud83d\udcf8' },
];

function MarketplaceSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden">
          <div className="skeleton aspect-square !bg-gray-800 rounded-none" />
          <div className="p-3 space-y-2">
            <div className="skeleton h-4 w-16 !bg-gray-700" />
            <div className="skeleton h-3 w-full !bg-gray-700" />
            <div className="skeleton h-3 w-2/3 !bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MarketplacePage() {
  useAnalytics();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [items, setItems] = useState(MOCK_ITEMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      try {
        const res = await marketplaceApi.getItems();
        const raw = res.data?.data ?? res.data?.items ?? res.data;
        const data = Array.isArray(raw) ? raw : [];
        if (data.length > 0) {
          // Normalize API data to match the shape the UI expects
          const normalized = data.map((item) => ({
            id: item.id,
            title: item.title || '',
            price: typeof item.price === 'number' ? `$${item.price.toLocaleString()}` : item.price || '',
            category: item.category || '',
            seller: typeof item.seller === 'object' ? item.seller?.name : item.seller || '',
            location: item.location || '',
            img: item.img || item.imageUrl || item.image || '\ud83d\udce6',
          }));
          setItems(normalized);
        }
      } catch (err) {
        console.error('Failed to fetch marketplace, using mock data:', err);
        // Keep MOCK_ITEMS that were set as initial state
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  const filtered = items.filter((item) => {
    if (category !== 'All' && item.category !== category) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()) && !(item.seller || '').toLowerCase().includes(search.toLowerCase())) return false;
    if (priceRange !== 'All') {
      const priceStr = typeof item.price === 'number' ? String(item.price) : item.price;
      const price = parseInt(priceStr.replace(/[$,]/g, ''));
      if (priceRange === 'Under $25' && price >= 25) return false;
      if (priceRange === '$25-$100' && (price < 25 || price > 100)) return false;
      if (priceRange === '$100-$500' && (price < 100 || price > 500)) return false;
      if (priceRange === '$500+' && price < 500) return false;
    }
    return true;
  });

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-6 page-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Marketplace</h1>
            <p className="text-gray-400 text-sm">{items.length} items from the community</p>
          </div>
          <button className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-sm flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20">
            <FiPlus size={16} /> List Item
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search marketplace..."
            className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  category === cat ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['All', 'Under $25', '$25-$100', '$100-$500', '$500+'].map((range) => (
            <button
              key={range}
              onClick={() => setPriceRange(range)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                priceRange === range ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-500 hover:bg-gray-800'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {loading && <MarketplaceSkeleton />}

        {/* Items grid */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`/marketplace/${item.id}`}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden card-hover hover:border-gray-700 transition-all group"
              >
                <div className="relative aspect-square bg-gray-800 flex items-center justify-center text-4xl overflow-hidden">
                  {item.img && item.img.startsWith('http') ? (
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    item.img || '\ud83d\udce6'
                  )}
                  {/* Dark gradient overlay for readability */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Contact Seller overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-black shadow-lg">
                      <FiMessageCircle size={14} /> Contact Seller
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-amber-400 font-bold mb-1">{typeof item.price === 'number' ? `$${item.price}` : item.price}</div>
                  <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <FiMapPin size={10} /> {item.location}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{item.seller || item.user?.name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
              <FiShoppingBag className="text-gray-500" size={28} />
            </div>
            <p className="text-lg font-semibold text-white">No items match your filters</p>
            <p className="text-gray-500 mt-1">Try adjusting your search or be the first to list!</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
