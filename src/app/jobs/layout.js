export const metadata = {
  title: 'Jobs Board — Find Habesha Community Jobs & Opportunities',
  description:
    'Find jobs posted by and for the Ethiopian, Eritrean & Somali diaspora. Full-time, part-time, remote, and contract roles across the US and worldwide.',
  openGraph: {
    title: 'Jobs Board | HabeshaHub',
    description:
      'Find jobs posted by and for the Ethiopian, Eritrean & Somali diaspora. Full-time, part-time, remote, and contract roles.',
    url: 'https://habeshahub-web-production.up.railway.app/jobs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HabeshaHub Jobs Board' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs Board | HabeshaHub',
    description: 'Find Habesha community jobs — full-time, part-time, remote & contract roles.',
    images: ['/og-image.png'],
  },
};

export default function JobsLayout({ children }) {
  return children;
}
