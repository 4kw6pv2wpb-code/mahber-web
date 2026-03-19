'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import Link from 'next/link';
import { FiShoppingBag, FiMapPin, FiStar, FiMessageCircle } from 'react-icons/fi';

const CONDITION_STYLES = {
  New: 'bg-habesha-green/10 text-habesha-green',
  Used: 'bg-gray-100 text-gray-600 dark:bg-dark-700 dark:text-gray-400',
  'Like New': 'bg-eritrean-blue/10 text-eritrean-blue',
  'Used - Like New': 'bg-eritrean-blue/10 text-eritrean-blue',
};

export function ProductCard({ product }) {
  const conditionStyle = CONDITION_STYLES[product.condition] || CONDITION_STYLES['Used'];
  const sellerName = typeof product.seller === 'string' ? product.seller : product.seller?.name || 'Seller';
  const price = typeof product.price === 'number' ? `$${product.price}` : product.price;

  return (
    <Link href={`/marketplace/${product.id}`} className="block">
      <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-primary/30 hover:shadow-md dark:border-dark-700 dark:bg-dark-800 dark:hover:border-primary/40">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-amber-100 dark:from-primary/20 dark:to-amber-900/20">
              <FiShoppingBag size={40} className="text-primary/40" />
            </div>
          )}
          {/* Condition badge */}
          {product.condition && (
            <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-medium ${conditionStyle}`}>
              {product.condition}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Price */}
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {price}
          </p>

          {/* Title */}
          <h3 className="mb-2 line-clamp-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            {product.title}
          </h3>

          {/* Seller info */}
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-500 text-[8px] font-bold text-white">
              {sellerName.charAt(0)}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {sellerName}
            </span>
            {product.seller?.rating && (
              <div className="flex items-center gap-0.5 text-xs text-amber-500">
                <FiStar size={10} className="fill-current" />
                <span>{product.seller.rating}</span>
              </div>
            )}
          </div>

          {/* Location */}
          {product.location && (
            <div className="mb-3 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <FiMapPin size={12} />
              <span>{product.location}</span>
            </div>
          )}

          {/* Message button */}
          <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-primary/30 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/5 dark:border-primary/40">
            <FiMessageCircle size={14} />
            Message Seller
          </button>
        </div>
      </div>
    </Link>
  );
}
