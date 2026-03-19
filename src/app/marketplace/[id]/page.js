'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import {
  FiArrowLeft,
  FiShoppingBag,
  FiMapPin,
  FiStar,
  FiClock,
  FiMessageCircle,
  FiDollarSign,
  FiShare2,
  FiFlag,
  FiHeart,
} from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

const MOCK_PRODUCT_MAP = {
  '1': {
    id: '1',
    title: 'Traditional Habesha Dress (Habesha Kemis)',
    price: '$150',
    condition: 'New',
    category: 'Fashion',
    description:
      'Beautiful hand-embroidered traditional Ethiopian dress (Habesha Kemis). Made with high-quality cotton fabric and intricate tibeb patterns. Perfect for holidays, weddings, and cultural celebrations. Available in white with colorful embroidery along the borders. Size Medium — fits US sizes 6-8. Can be adjusted by a tailor if needed.',
    seller: {
      name: 'Tigist Wolde',
      rating: 4.9,
      reviews: 27,
      memberSince: 'March 2024',
      responseTime: 'Usually responds within 1 hour',
    },
    location: 'Washington, DC',
  },
  '2': {
    id: '2',
    title: 'Ethiopian Coffee Beans (5lb)',
    price: '$35',
    condition: 'New',
    category: 'Food',
    description:
      'Premium Ethiopian Yirgacheffe coffee beans, freshly roasted. Single origin from the Sidama region. These beans have a bright, fruity flavor with floral notes — the best Ethiopian coffee you can get in the US. Whole bean, 5lb bag. Perfect for daily brew or traditional Ethiopian coffee ceremony (buna).',
    seller: {
      name: 'Abebe Kebede',
      rating: 4.8,
      reviews: 43,
      memberSince: 'January 2024',
      responseTime: 'Usually responds within 2 hours',
    },
    location: 'Silver Spring, MD',
  },
};

const SIMILAR_ITEMS = [
  {
    id: '3',
    title: 'Hand-woven Basket (Mesob)',
    price: '$80',
    condition: 'New',
    seller: { name: 'Hiwet Tekle', rating: 5.0 },
    location: 'Seattle, WA',
  },
  {
    id: '4',
    title: 'Gold Jewelry Set',
    price: '$250',
    condition: 'New',
    seller: { name: 'Selam Gebremedhin', rating: 4.7 },
    location: 'Dallas, TX',
  },
  {
    id: '6',
    title: 'Eritrean Silver Cross Pendant',
    price: '$65',
    condition: 'New',
    seller: { name: 'Yonas Berhe', rating: 4.9 },
    location: 'Oakland, CA',
  },
  {
    id: '9',
    title: 'Traditional Paintings',
    price: '$100',
    condition: 'New',
    seller: { name: 'Amanuel Fisseha', rating: 4.8 },
    location: 'Denver, CO',
  },
];

// Fallback for any ID not in the map
const DEFAULT_PRODUCT = {
  id: '1',
  title: 'Traditional Habesha Dress (Habesha Kemis)',
  price: '$150',
  condition: 'New',
  category: 'Fashion',
  description:
    'Beautiful hand-embroidered traditional Ethiopian dress (Habesha Kemis). Made with high-quality cotton fabric and intricate tibeb patterns. Perfect for holidays, weddings, and cultural celebrations.',
  seller: {
    name: 'Tigist Wolde',
    rating: 4.9,
    reviews: 27,
    memberSince: 'March 2024',
    responseTime: 'Usually responds within 1 hour',
  },
  location: 'Washington, DC',
};

export default function ProductDetailPage() {
  useAnalytics();
  const params = useParams();
  const product = MOCK_PRODUCT_MAP[params.id] || DEFAULT_PRODUCT;
  const [saved, setSaved] = useState(false);

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Back link */}
        <Link
          href="/marketplace"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
        >
          <FiArrowLeft size={16} />
          Back to Marketplace
        </Link>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left: Image gallery placeholder */}
          <div className="flex-1">
            <div className="flex h-72 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-amber-100 dark:from-primary/20 dark:to-amber-900/20 sm:h-96">
              <FiShoppingBag size={64} className="text-primary/30" />
            </div>
            {/* Thumbnail row */}
            <div className="mt-3 flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex h-16 w-16 items-center justify-center rounded-lg ${
                    i === 1
                      ? 'border-2 border-primary bg-primary/10'
                      : 'border border-gray-200 bg-gray-50 dark:border-dark-700 dark:bg-dark-800'
                  }`}
                >
                  <FiShoppingBag size={16} className="text-primary/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product info */}
          <div className="w-full lg:w-96">
            {/* Price + condition */}
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  product.condition === 'New'
                    ? 'bg-habesha-green/10 text-habesha-green'
                    : product.condition === 'Like New'
                      ? 'bg-eritrean-blue/10 text-eritrean-blue'
                      : 'bg-gray-100 text-gray-600 dark:bg-dark-700 dark:text-gray-400'
                }`}
              >
                {product.condition}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{product.title}</h1>

            {/* Location */}
            <div className="mb-4 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <FiMapPin size={14} />
              {product.location}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Description</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{product.description}</p>
            </div>

            {/* Action buttons */}
            <div className="mb-6 flex flex-col gap-2">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90">
                <FiMessageCircle size={18} />
                Message Seller
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5">
                <FiDollarSign size={18} />
                Make Offer
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setSaved(!saved)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-medium transition-colors ${
                    saved
                      ? 'border-accent/30 bg-accent/5 text-accent'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-dark-700 dark:text-gray-400'
                  }`}
                >
                  <FiHeart size={16} className={saved ? 'fill-current' : ''} />
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 dark:border-dark-700 dark:text-gray-400">
                  <FiShare2 size={16} />
                  Share
                </button>
                <button className="flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-600 dark:border-dark-700">
                  <FiFlag size={16} />
                </button>
              </div>
            </div>

            {/* Seller card */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-dark-700 dark:bg-dark-800">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-500 text-lg font-bold text-white">
                  {product.seller.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{product.seller.name}</p>
                  <div className="flex items-center gap-1 text-sm text-amber-500">
                    <FiStar size={13} className="fill-current" />
                    <span>{product.seller.rating}</span>
                    <span className="text-gray-400">({product.seller.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <FiClock size={12} />
                  {product.seller.responseTime}
                </div>
                <p>Member since {product.seller.memberSince}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar items */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Similar Items</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIMILAR_ITEMS.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
