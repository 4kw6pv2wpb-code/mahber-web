export const metadata = {
  title: 'Events — Discover Habesha Community Events & Festivals',
  description:
    'Discover Ethiopian, Eritrean & Somali community events, festivals, cultural celebrations, and networking meetups across the US and worldwide.',
  openGraph: {
    title: 'Events | HabeshaHub',
    description:
      'Discover Ethiopian, Eritrean & Somali community events, festivals, cultural celebrations, and networking meetups.',
    url: 'https://habeshahub-web-production.up.railway.app/events',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HabeshaHub Events' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events | HabeshaHub',
    description: 'Habesha community events, festivals, celebrations & meetups.',
    images: ['/og-image.png'],
  },
};

export default function EventsLayout({ children }) {
  return children;
}
