'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { FiMapPin, FiBookmark, FiMaximize } from 'react-icons/fi';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import Link from 'next/link';

export function ListingCard({ listing }) {
  const type = listing.type || listing.listingType || 'Apartment';
  const price = listing.price || (listing.rent ? `$${listing.rent}` : '$0');
  const beds = listing.beds || listing.bedrooms || 0;
  const baths = listing.baths || listing.bathrooms || 0;
  const sqft = listing.sqft || listing.squareFeet || '';
  const location = listing.location || [listing.city, listing.country].filter(Boolean).join(', ') || '';
  const posterName = listing.poster?.name || listing.poster || 'Owner';
  const posted = listing.posted || (listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : '');
  const imageUrl = listing.photoUrls?.[0] || listing.imageUrl || '';

  return (
    <Link href={`/housing/${listing.id}`} className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className={`relative h-48 ${imageUrl ? '' : 'bg-gradient-to-br from-primary/20 to-primary/5'}`}>
        {imageUrl && <img src={imageUrl} alt={listing.title} className="h-full w-full object-cover" />}
        <div className="absolute left-3 top-3"><Badge variant={type === 'Apartment' ? 'blue' : type === 'House' ? 'green' : 'gray'}>{type}</Badge></div>
        <button onClick={(e) => e.preventDefault()} className="absolute right-3 top-3 rounded-full bg-white/80 p-2 hover:bg-white">
          <FiBookmark size={16} />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{price}<span className="text-sm font-normal text-gray-500">/mo</span></span>
          {sqft && <span className="flex items-center gap-1 text-xs text-gray-500"><FiMaximize size={12} /> {sqft} sqft</span>}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white">{listing.title}</h3>
        {location && <p className="mt-0.5 flex items-center gap-1 text-sm text-gray-500"><FiMapPin size={12} />{location}</p>}
        <div className="mt-2 flex gap-3 text-xs text-gray-500">
          <span>{beds} bed</span><span>{baths} bath</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2"><Avatar name={typeof posterName === 'string' ? posterName : 'Owner'} size="sm" /><span className="text-xs text-gray-500">{typeof posterName === 'string' ? posterName : 'Owner'}</span></div>
          {posted && <span className="text-xs text-gray-400">{posted}</span>}
        </div>
      </div>
    </Link>
  );
}
