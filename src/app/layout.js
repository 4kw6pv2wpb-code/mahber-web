import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: {
    default: 'HabeshaHub — The Diaspora Super App',
    template: '%s | HabeshaHub',
  },
  description:
    'All-in-one platform for Ethiopian, Eritrean & Somali communities worldwide. Community, Jobs, Housing, Events, Marketplace, Dating, Remittance & more.',
  keywords:
    'habesha, ethiopian, eritrean, somali, diaspora, community, jobs, housing, events, marketplace, dating, remittance, super app',
  authors: [{ name: 'HabeshaHub' }],
  creator: 'HabeshaHub',
  publisher: 'HabeshaHub',
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
  metadataBase: new URL('https://habeshahub-web-production.up.railway.app'),
  alternates: {
    canonical: 'https://habeshahub-web-production.up.railway.app',
  },
  themeColor: '#0F172A',
  openGraph: {
    title: 'HabeshaHub — The Diaspora Super App',
    description:
      'All-in-one platform for Ethiopian, Eritrean & Somali communities worldwide. Community, Jobs, Housing, Events, Marketplace, Dating, Remittance & more.',
    siteName: 'HabeshaHub',
    url: 'https://habeshahub-web-production.up.railway.app',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://habeshahub-web-production.up.railway.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HabeshaHub — The Diaspora Super App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HabeshaHub — The Diaspora Super App',
    description:
      'All-in-one platform for Ethiopian, Eritrean & Somali communities worldwide. Community, Jobs, Housing, Events, Marketplace, Dating, Remittance & more.',
    images: ['https://habeshahub-web-production.up.railway.app/og-image.png'],
    creator: '@habeshahubapp',
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
              name: 'HabeshaHub',
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
