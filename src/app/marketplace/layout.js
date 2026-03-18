export const metadata = {
  title: 'Marketplace — Buy & Sell Within the Habesha Community',
  description:
    'Buy and sell traditional items, spices, clothing, jewelry, art, and more from Ethiopian, Eritrean & Somali sellers across the US.',
  openGraph: {
    title: 'Marketplace | HabeshaHub',
    description:
      'Buy and sell traditional items, spices, clothing, jewelry, art and more from the Habesha community.',
    url: 'https://habeshahub-web-production.up.railway.app/marketplace',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HabeshaHub Marketplace' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketplace | HabeshaHub',
    description: 'Habesha community marketplace — buy & sell traditional items, spices & more.',
    images: ['/og-image.png'],
  },
};

export default function MarketplaceLayout({ children }) {
  return children;
}
