'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiShoppingBag,
  FiHeart,
  FiMessageSquare,
  FiVideo,
  FiDollarSign,
  FiCalendar,
  FiMapPin,
  FiSearch,
  FiBell,
  FiMenu,
  FiX,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import { useAuth } from '@/lib/auth-context';

const NAV_ITEMS = [
  { href: '/home', label: 'Home', icon: FiHome },
  { href: '/community', label: 'Community', icon: FiUsers },
  { href: '/jobs', label: 'Jobs', icon: FiBriefcase },
  { href: '/marketplace', label: 'Marketplace', icon: FiShoppingBag },
  { href: '/housing', label: 'Housing', icon: FiMapPin },
  { href: '/events', label: 'Events', icon: FiCalendar },
  { href: '/dating', label: 'Dating', icon: FiHeart },
  { href: '/messages', label: 'Messages', icon: FiMessageSquare },
  { href: '/videos', label: 'Videos', icon: FiVideo },
  { href: '/remittance', label: 'Remittance', icon: FiDollarSign },
];

const MOBILE_NAV = [
  { href: '/home', label: 'Home', icon: FiHome },
  { href: '/community', label: 'Community', icon: FiUsers },
  { href: '/marketplace', label: 'Market', icon: FiShoppingBag },
  { href: '/dating', label: 'Dating', icon: FiHeart },
  { href: '/messages', label: 'Chat', icon: FiMessageSquare },
];

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-950">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 bg-white dark:border-dark-700 dark:bg-dark-900">
        <div className="flex h-full items-center justify-between px-4">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-800 lg:hidden"
            >
              {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            <Link href="/home" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-white">
                M
              </div>
              <span className="hidden text-xl font-bold text-gray-900 dark:text-white sm:block">
                Mah<span className="text-primary">ber</span>
              </span>
            </Link>
          </div>

          {/* Center: Search */}
          <div className="mx-4 hidden max-w-md flex-1 md:block">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search Mahber..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-dark-600 dark:bg-dark-800 dark:text-white"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-800">
              <FiBell size={20} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
            </button>
            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform overflow-y-auto border-r border-gray-200 bg-white transition-transform dark:border-dark-700 dark:bg-dark-900 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <nav className="flex flex-col gap-1 p-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-800'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary" />
                )}
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}

          <div className="my-2 border-t border-gray-200 dark:border-dark-700" />

          <Link
            href="/settings"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-800"
          >
            <FiSettings size={20} />
            Settings
          </Link>
          <button
            onClick={() => {
              logout();
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-800"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="min-h-[calc(100vh-4rem)] pb-20 lg:pb-6">{children}</div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white dark:border-dark-700 dark:bg-dark-900 lg:hidden">
        <div className="flex items-center justify-around py-2">
          {MOBILE_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs ${
                  isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
