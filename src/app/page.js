'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import LandingPage from './landing/page';

export default function RootPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/home');
    }
  }, [user, isLoading, router]);

  // Show nothing while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-dark-950">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white">H</div>
          <div className="h-1 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-dark-700">
            <div className="h-full w-1/2 animate-[shimmer_1s_ease-in-out_infinite] rounded-full bg-primary" />
          </div>
        </div>
      </div>
    );
  }

  // Logged-in users redirect to /home (handled by useEffect above)
  if (user) return null;

  // Guests see the landing page
  return <LandingPage />;
}
