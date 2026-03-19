/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

export const metadata = {
  title: 'Dating — Meet Habesha Singles & Build Meaningful Connections',
  description:
    'Meet Ethiopian, Eritrean & Somali singles for meaningful relationships. Habesha dating made easy — connect with singles near you.',
  openGraph: {
    title: 'Dating | Mahber',
    description:
      'Meet Ethiopian, Eritrean & Somali singles for meaningful relationships. Habesha dating made easy.',
    url: 'https://habeshahub-web-production.up.railway.app/dating',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mahber Dating' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dating | Mahber',
    description: 'Meet Habesha singles near you — Ethiopian, Eritrean & Somali dating.',
    images: ['/og-image.png'],
  },
};

export default function DatingLayout({ children }) {
  return children;
}
