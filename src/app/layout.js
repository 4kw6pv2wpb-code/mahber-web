/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0F172A',
};

export const metadata = {
  title: {
    default: 'Mahber — The Diaspora Super App',
    template: '%s | Mahber',
  },
  description:
    'The all-in-one platform for Ethiopian, Eritrean, and Somali diaspora communities. Jobs, housing, events, marketplace, dating, immigration resources, remittance, and more — all in one place.',
  keywords: [
    'habesha',
    'Ethiopian diaspora',
    'Eritrean diaspora',
    'Somali diaspora',
    'habesha app',
    'African diaspora',
    'ethiopian jobs',
    'habesha dating',
    'remittance ethiopia',
    'habesha community',
    'horn of africa diaspora',
    'jobs',
    'housing',
    'events',
    'marketplace',
    'dating',
    'immigration',
    'remittance',
    'community',
  ],
  authors: [{ name: 'Mahber' }],
  creator: 'Mahber',
  publisher: 'Mahber',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.svg',
  },
  metadataBase: new URL('https://mahber-web-production.up.railway.app'),
  openGraph: {
    title: 'Mahber — The Diaspora Super App',
    description:
      'Connect with the Ethiopian, Eritrean, and Somali diaspora. Jobs, housing, events, marketplace, dating, immigration help, and more.',
    siteName: 'Mahber',
    url: 'https://mahber-web-production.up.railway.app',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://habeshahub-web-production.up.railway.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mahber — The Diaspora Super App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahber — The Diaspora Super App',
    description:
      'Connect with the Ethiopian, Eritrean, and Somali diaspora. Jobs, housing, events, marketplace, dating, immigration help, and more.',
    images: ['/og-image.png'],
    creator: '@mahberapp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Mahber',
              description:
                'The all-in-one super app for the Ethiopian, Eritrean & Somali diaspora',
              url: 'https://habeshahub-web-production.up.railway.app',
              applicationCategory: 'SocialNetworkingApplication',
              operatingSystem: 'Web',
            }),
          }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
