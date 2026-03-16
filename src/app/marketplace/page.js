'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { FiPlus, FiSearch, FiLoader } from 'react-icons/fi';
import api from '@/lib/api';

const CATEGORIES = ['All', 'Fashion', 'Food', 'Electronics', 'Services', 'Vehicles', 'Other'];

const DEMO_PRODUCTS = [
  {
    id: 'demo-1',
    title: 'Handwoven Habesha Kemis',
    description: 'Beautiful traditional Ethiopian dress, handwoven with intricate tilf patterns. Perfect for holidays and celebrations.',
    price: 250,
    currency: 'USD',
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400',
    seller: { name: 'Tigist Designs', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tigist' },
    location: 'Washington, DC',
    condition: 'New',
    createdAt: '2026-03-14T10:00:00Z',
  },
  {
    id: 'demo-2',
    title: 'Fresh Teff Flour — 5kg Bag',
    description: 'Premium brown teff flour imported directly from Ethiopia. Perfect for making injera at home.',
    price: 35,
    currency: 'USD',
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    seller: { name: 'Habesha Foods Market', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=foods' },
    location: 'Seattle, WA',
    condition: 'New',
    createdAt: '2026-03-13T15:00:00Z',
  },
  {
    id: 'demo-3',
    title: 'Jebena Coffee Set — Handmade Clay',
    description: 'Traditional Ethiopian coffee ceremony set. Includes jebena pot, rekebot tray, and 6 cini cups.',
    price: 85,
    currency: 'USD',
    category: 'Other',
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
    seller: { name: 'Abeba Crafts', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=abeba' },
    location: 'Atlanta, GA',
    condition: 'New',
    createdAt: '2026-03-12T09:00:00Z',
  },
  {
    id: 'demo-4',
    title: 'Eritrean Gold Jewelry Set',
    description: 'Elegant 18k gold-plated necklace and earring set with traditional Eritrean design motifs.',
    price: 180,
    currency: 'USD',
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1515562141589-67f0d569b986?w=400',
    seller: { name: 'Semhar Gold', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=semhar' },
    location: 'Dallas, TX',
    condition: 'New',
    createdAt: '2026-03-11T12:00:00Z',
  },
  {
    id: 'demo-5',
    title: 'Berbere Spice Mix — Homemade',
    description: 'Authentic homemade berbere spice blend. Family recipe passed down through generations. 500g bag.',
    price: 18,
    currency: 'USD',
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
    seller: { name: 'Mama Zewdi Kitchen', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zewdi' },
    location: 'Minneapolis, MN',
    condition: 'New',
    createdAt: '2026-03-10T08:00:00Z',
  },
  {
    id: 'demo-6',
    title: 'iPhone 14 Pro — Unlocked',
    description: 'Gently used iPhone 14 Pro, 256GB, Space Black. Unlocked, works with all carriers. Comes with case.',
    price: 650,
    currency: 'USD',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400',
    seller: { name: 'Dawit Tech', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dawit2' },
    location: 'San Jose, CA',
    condition: 'Used - Like New',
    createdAt: '2026-03-09T14:00:00Z',
  },
];

export default function MarketplacePage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (category !== 'All') params.category = category;
        if (search) params.search = search;
        const res = await api.get('/marketplace', { params });
        const data = res.data?.data || res.data || [];
        setProducts(data.length > 0 ? data : DEMO_PRODUCTS);
      } catch (err) {
        // Marketplace API may not be available yet — use demo data
        setProducts(DEMO_PRODUCTS);
        console.error('Marketplace fetch:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [category, search]);

  const filtered = products.filter((p) => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Marketplace</h1>
          <button className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark">
            <FiPlus size={16} />
            Sell Item
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search marketplace..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none dark:border-dark-700 dark:bg-dark-800 dark:text-white"
          />
        </div>

        {/* Categories */}
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <FiLoader className="animate-spin text-primary" size={24} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl bg-gray-50 p-8 text-center dark:bg-dark-800">
            <p className="font-semibold text-gray-700 dark:text-gray-300">No products found</p>
            <p className="text-sm text-gray-500">Try a different category or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
