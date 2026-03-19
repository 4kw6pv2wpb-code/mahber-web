'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import Link from 'next/link';

const FOOTER_LINKS = {
  Product: [
    { label: 'Jobs', href: '/jobs' },
    { label: 'Housing', href: '/housing' },
    { label: 'Events', href: '/events' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Dating', href: '/dating' },
    { label: 'Remittance', href: '/remittance' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Investors', href: '/investors' },
    { label: 'Contact', href: '/contact' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'DMCA Policy', href: '/dmca' },
  ],
  Connect: [
    { label: 'Instagram', href: 'https://instagram.com/mahberapp' },
    { label: 'TikTok', href: 'https://tiktok.com/@mahberapp' },
    { label: 'X / Twitter', href: 'https://x.com/mahberapp' },
    { label: 'Download App', href: '/download' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
                H
              </div>
              <span className="font-bold text-white">
                Habesha<span className="text-amber-400">Hub</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              The all-in-one platform for the Habesha diaspora.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-3">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('http') ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex h-0.5 mb-6">
          <div className="flex-1 bg-green-600/30" />
          <div className="flex-1 bg-yellow-400/30" />
          <div className="flex-1 bg-red-600/30" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Mahber, Inc. All rights reserved. Built in Seattle.
          </p>
          <p className="text-gray-700 text-xs">
            Made with love for the Habesha diaspora
          </p>
        </div>
      </div>
    </footer>
  );
}
