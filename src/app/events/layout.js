/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

export const metadata = {
  title: 'Events — Discover Habesha Community Events & Festivals',
  description:
    'Discover Ethiopian, Eritrean & Somali community events, festivals, cultural celebrations, and networking meetups across the US and worldwide.',
  openGraph: {
    title: 'Events | Mahber',
    description:
      'Discover Ethiopian, Eritrean & Somali community events, festivals, cultural celebrations, and networking meetups.',
    url: 'https://habeshahub-web-production.up.railway.app/events',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mahber Events' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events | Mahber',
    description: 'Habesha community events, festivals, celebrations & meetups.',
    images: ['/og-image.png'],
  },
};

export default function EventsLayout({ children }) {
  return children;
}
