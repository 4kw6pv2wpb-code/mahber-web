/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

export const metadata = {
  title: 'Marketplace — Buy & Sell Within the Habesha Community',
  description:
    'Buy and sell traditional items, spices, clothing, jewelry, art, and more from Ethiopian, Eritrean & Somali sellers across the US.',
  openGraph: {
    title: 'Marketplace | Mahber',
    description:
      'Buy and sell traditional items, spices, clothing, jewelry, art and more from the Habesha community.',
    url: 'https://habeshahub-web-production.up.railway.app/marketplace',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mahber Marketplace' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketplace | Mahber',
    description: 'Habesha community marketplace — buy & sell traditional items, spices & more.',
    images: ['/og-image.png'],
  },
};

export default function MarketplaceLayout({ children }) {
  return children;
}
