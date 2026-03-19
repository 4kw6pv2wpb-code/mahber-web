/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

export const metadata = {
  title: 'Housing — Find Habesha-Friendly Rentals, Rooms & Housing',
  description:
    'Find apartments, rooms, houses, and sublets in Habesha communities across Seattle, DC, LA, Atlanta, Minneapolis, and more cities nationwide.',
  openGraph: {
    title: 'Housing | Mahber',
    description:
      'Find apartments, rooms, houses, and sublets in Habesha communities across the US.',
    url: 'https://habeshahub-web-production.up.railway.app/housing',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mahber Housing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Housing | Mahber',
    description: 'Habesha-friendly rentals, rooms & housing across the US.',
    images: ['/og-image.png'],
  },
};

export default function HousingLayout({ children }) {
  return children;
}
