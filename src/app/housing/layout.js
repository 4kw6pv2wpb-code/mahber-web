export const metadata = {
  title: 'Housing — Find Habesha-Friendly Rentals, Rooms & Housing',
  description:
    'Find apartments, rooms, houses, and sublets in Habesha communities across Seattle, DC, LA, Atlanta, Minneapolis, and more cities nationwide.',
  openGraph: {
    title: 'Housing | HabeshaHub',
    description:
      'Find apartments, rooms, houses, and sublets in Habesha communities across the US.',
    url: 'https://habeshahub-web-production.up.railway.app/housing',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HabeshaHub Housing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Housing | HabeshaHub',
    description: 'Habesha-friendly rentals, rooms & housing across the US.',
    images: ['/og-image.png'],
  },
};

export default function HousingLayout({ children }) {
  return children;
}
