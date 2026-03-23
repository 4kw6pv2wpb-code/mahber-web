'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useAnalytics } from '@/lib/useAnalytics';
import Footer from '@/components/Footer';

export default function DownloadPage() {
  useAnalytics();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Tricolor bar */}
      <div className="flex h-1">
        <div className="flex-1 bg-green-600" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-red-600" />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-amber-500/20">
            H
          </div>
          <span className="text-3xl font-bold">
            Mah<span className="text-amber-400">ber</span>
          </span>
        </div>

        {/* Coming soon badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Coming Soon to iOS & Android
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get the App
        </h1>
        <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
          Mahber is launching on mobile soon. Be the first to download when we go live.
        </p>

        {/* Phone mockup */}
        <div className="relative mx-auto w-64 h-[480px] bg-gray-900 rounded-[3rem] border-4 border-gray-700 mb-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-700 rounded-b-2xl" />
          <div className="h-full flex flex-col items-center justify-center p-6">
            <div className="w-20 h-20 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-bold text-4xl mb-4">
              H
            </div>
            <div className="text-xl font-bold mb-2">
              Mah<span className="text-amber-400">ber</span>
            </div>
            <div className="text-sm text-gray-400 mb-6">The Diaspora Super App</div>
            <div className="flex gap-2 flex-wrap justify-center">
              {['Jobs', 'Housing', 'Dating', 'Events'].map((f) => (
                <span key={f} className="text-[10px] px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* App Store buttons (placeholder) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            disabled
            className="flex items-center gap-3 px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl opacity-60 cursor-not-allowed"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] text-gray-400">Coming soon on</div>
              <div className="text-base font-semibold text-white">App Store</div>
            </div>
          </button>

          <button
            disabled
            className="flex items-center gap-3 px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl opacity-60 cursor-not-allowed"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
              <path d="M3.18 23.71L14.32 12.57 3.18.43c-.32-.33-.18-.75.31-.93l.57-.22c.23-.09.51-.04.7.14L18.7 11.86c.39.39.39 1.02 0 1.41L4.76 23.71c-.19.18-.47.23-.7.14l-.57-.22c-.49-.18-.63-.6-.31-.92z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] text-gray-400">Coming soon on</div>
              <div className="text-base font-semibold text-white">Google Play</div>
            </div>
          </button>
        </div>

        {/* QR Code placeholder */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 inline-block mb-8">
          <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
            {/* Simple QR-like pattern */}
            <svg viewBox="0 0 100 100" className="w-40 h-40">
              <rect x="5" y="5" width="25" height="25" rx="3" fill="#1a1a2e" />
              <rect x="70" y="5" width="25" height="25" rx="3" fill="#1a1a2e" />
              <rect x="5" y="70" width="25" height="25" rx="3" fill="#1a1a2e" />
              <rect x="10" y="10" width="15" height="15" rx="2" fill="#D4A017" />
              <rect x="75" y="10" width="15" height="15" rx="2" fill="#D4A017" />
              <rect x="10" y="75" width="15" height="15" rx="2" fill="#D4A017" />
              <rect x="35" y="5" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="48" y="5" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="35" y="18" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="48" y="18" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="35" y="35" width="30" height="30" rx="4" fill="#D4A017" />
              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">M</text>
              <rect x="5" y="40" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="18" y="40" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="5" y="53" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="18" y="53" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="70" y="40" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="83" y="40" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="70" y="53" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="83" y="53" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="35" y="75" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="48" y="75" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="35" y="88" width="8" height="8" rx="1" fill="#1a1a2e" />
              <rect x="70" y="70" width="25" height="25" rx="3" fill="none" stroke="#1a1a2e" strokeWidth="3" />
              <rect x="75" y="75" width="15" height="15" rx="2" fill="#D4A017" />
            </svg>
          </div>
          <p className="text-sm text-gray-400">Scan to visit Mahber</p>
        </div>

        <p className="text-gray-500 text-sm">
          Web app available now at{' '}
          <a href="/" className="text-amber-400 hover:underline">
            mahber.com
          </a>
        </p>
      </div>
          <Footer />
    </div>
  );
}
