'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiMapPin, FiGrid, FiPlus } from 'react-icons/fi';
import AppLayout from '@/components/layout/AppLayout';
import { useAnalytics } from '@/lib/useAnalytics';

const CATEGORIES = ['All', 'Traditional', 'Food & Spice', 'Art & Decor', 'Jewelry', 'Clothing', 'Books', 'Electronics', 'Services'];

const ITEMS = [
  { id: '1', title: 'Handmade Jebena Coffee Set', price: '$85', category: 'Traditional', seller: 'Abel G.', location: 'Minneapolis, MN', img: '☕' },
  { id: '2', title: 'Traditional Coffee Ceremony Kit', price: '$120', category: 'Traditional', seller: 'Meron T.', location: 'Seattle, WA', img: '🫖' },
  { id: '3', title: 'Habesha Kemis - White/Gold', price: '$180', category: 'Clothing', seller: 'Almaz N.', location: 'Washington, DC', img: '👗' },
  { id: '4', title: 'Netela (Traditional Shawl)', price: '$65', category: 'Clothing', seller: 'Sara A.', location: 'Atlanta, GA', img: '🧣' },
  { id: '5', title: 'Mesob (Injera Basket)', price: '$95', category: 'Traditional', seller: 'Dawit K.', location: 'Seattle, WA', img: '🧺' },
  { id: '6', title: 'Berbere Spice Mix (1lb)', price: '$15', category: 'Food & Spice', seller: 'Helen B.', location: 'Los Angeles, CA', img: '🌶️' },
  { id: '7', title: 'Mitmita Hot Spice Blend', price: '$12', category: 'Food & Spice', seller: 'Helen B.', location: 'Los Angeles, CA', img: '🫙' },
  { id: '8', title: 'Ethiopian Cross Necklace - Silver', price: '$45', category: 'Jewelry', seller: 'Tigist L.', location: 'Atlanta, GA', img: '✝️' },
  { id: '9', title: 'Habesha Gold Earrings', price: '$75', category: 'Jewelry', seller: 'Rahel W.', location: 'Washington, DC', img: '💍' },
  { id: '10', title: 'Ethiopian Canvas Art - Addis Skyline', price: '$150', category: 'Art & Decor', seller: 'Samuel D.', location: 'Seattle, WA', img: '🎨' },
  { id: '11', title: 'Queen of Sheba Painting (framed)', price: '$200', category: 'Art & Decor', seller: 'Yonas M.', location: 'Washington, DC', img: '🖼️' },
  { id: '12', title: 'Teff Flour (5lb bag)', price: '$18', category: 'Food & Spice', seller: 'Merkato Market', location: 'Seattle, WA', img: '🌾' },
  { id: '13', title: 'Traditional Eritrean Dress', price: '$160', category: 'Clothing', seller: 'Fatima O.', location: 'Minneapolis, MN', img: '👘' },
  { id: '14', title: 'Ge\'ez Script Wall Art', price: '$80', category: 'Art & Decor', seller: 'Bereket H.', location: 'Atlanta, GA', img: '📜' },
  { id: '15', title: 'Ethiopian History Book Collection', price: '$45', category: 'Books', seller: 'Michael A.', location: 'Washington, DC', img: '📚' },
  { id: '16', title: 'Amharic Children\'s Books (set of 5)', price: '$35', category: 'Books', seller: 'Kidist R.', location: 'Minneapolis, MN', img: '📖' },
  { id: '17', title: 'Handwoven Habesha Basket Set', price: '$55', category: 'Art & Decor', seller: 'Liya F.', location: 'Los Angeles, CA', img: '🪺' },
  { id: '18', title: 'Ethiopian Flag Bracelet', price: '$20', category: 'Jewelry', seller: 'Robel T.', location: 'Seattle, WA', img: '🇪🇹' },
  { id: '19', title: 'Shiro Powder (2lb)', price: '$10', category: 'Food & Spice', seller: 'Tsehay G.', location: 'Atlanta, GA', img: '🥘' },
  { id: '20', title: 'iPhone 14 Pro (used, great condition)', price: '$550', category: 'Electronics', seller: 'Ephrem B.', location: 'Washington, DC', img: '📱' },
  { id: '21', title: 'Traditional Zuriya Dress', price: '$140', category: 'Clothing', seller: 'Hiwot Z.', location: 'Los Angeles, CA', img: '👗' },
  { id: '22', title: 'Handmade Incense & Etan Set', price: '$25', category: 'Traditional', seller: 'Abel G.', location: 'Minneapolis, MN', img: '🕯️' },
  { id: '23', title: 'Habesha Spice Gift Box', price: '$40', category: 'Food & Spice', seller: 'Merkato Market', location: 'Seattle, WA', img: '🎁' },
  { id: '24', title: 'Photography: Habesha Weddings', price: '$3,000', category: 'Services', seller: 'Henok G.', location: 'Washington, DC', img: '📸' },
];

export default function MarketplacePage() {
  useAnalytics();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  const filtered = ITEMS.filter((item) => {
    if (category !== 'All' && item.category !== category) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()) && !item.seller.toLowerCase().includes(search.toLowerCase())) return false;
    if (priceRange !== 'All') {
      const price = parseInt(item.price.replace(/[$,]/g, ''));
      if (priceRange === 'Under $25' && price >= 25) return false;
      if (priceRange === '$25-$100' && (price < 25 || price > 100)) return false;
      if (priceRange === '$100-$500' && (price < 100 || price > 500)) return false;
      if (priceRange === '$500+' && price < 500) return false;
    }
    return true;
  });

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Marketplace</h1>
            <p className="text-gray-400 text-sm">{ITEMS.length} items from the community</p>
          </div>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-sm flex items-center gap-2">
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
            className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 scrollbar-hide">
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
        <div className="flex gap-2 mb-6">
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

        {/* Items grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <Link
              key={item.id}
              href={`/marketplace/${item.id}`}
              className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors group"
            >
              <div className="aspect-square bg-gray-800 flex items-center justify-center text-4xl">
                {item.img}
              </div>
              <div className="p-3">
                <div className="text-amber-400 font-bold mb-1">{item.price}</div>
                <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                  <FiMapPin size={10} /> {item.location}
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.seller}</div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">No items match your filters</div>
        )}
      </div>
    </AppLayout>
  );
}
