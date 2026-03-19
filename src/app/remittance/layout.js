/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

export const metadata = {
  title: 'Send Money Home — Low-Fee Remittance to East Africa',
  description:
    'Send money to Ethiopia, Eritrea, Somalia & more with low 1% fees. Fast, secure remittance for the Habesha diaspora — arrives in minutes.',
  openGraph: {
    title: 'Send Money Home | Mahber',
    description:
      'Send money to Ethiopia, Eritrea, Somalia & more with low 1% fees. Fast, secure remittance for the Habesha diaspora.',
    url: 'https://habeshahub-web-production.up.railway.app/remittance',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mahber Remittance' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Send Money Home | Mahber',
    description: 'Low-fee remittance to East Africa — arrives in minutes.',
    images: ['/og-image.png'],
  },
};

export default function RemittanceLayout({ children }) {
  return children;
}
