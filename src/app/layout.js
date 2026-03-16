import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'HabeshaHub — The Diaspora Super App',
  description:
    'The all-in-one platform for Ethiopian, Eritrean, and Somali diaspora communities. Jobs, housing, events, marketplace, dating, immigration resources, remittance, and more — all in one place.',
    keywords: ['habesha', 'ethiopian diaspora', 'eritrean diaspora', 'somali diaspora', 'habesha app', 'ethiopian jobs', 'habesha dating', 'remittance ethiopia', 'habesha community', 'horn of africa diaspora'],
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.svg',
  },
  metadataBase: new URL('https://habeshahub-web-production.up.railway.app'),
  openGraph: {
    title: 'HabeshaHub — The Diaspora Super App',
    description:
      'Connect with the Ethiopian, Eritrean, and Somali diaspora. Jobs, housing, events, marketplace, dating, immigration help, and more.',
    siteName: 'HabeshaHub',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'HabeshaHub — The Diaspora Super App',
    description:
      'Connect with the Ethiopian, Eritrean, and Somali diaspora. Jobs, housing, events, marketplace, dating, immigration help, and more.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
