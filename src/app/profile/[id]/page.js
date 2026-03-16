'use client';

import { useParams } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PostCard } from '@/components/feed/PostCard';
import { FiMapPin, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

const MOCK = {
  name: 'Selam Tekle', bio: 'Community organizer & coffee enthusiast ☕ | Addis Ababa → Seattle', location: 'Seattle, WA', heritage: 'Ethiopian',
  joined: 'March 2024', followers: 412, following: 267, posts: 83,
};

const POSTS = [
  { id: 1, author: 'Selam Tekle', time: '5h ago', location: 'Seattle, WA', content: 'Organized another successful coffee ceremony meetup at Buna this weekend. 30+ people showed up! Nothing brings us together like buna ☕', likes: 67, comments: 18, shares: 4 },
];

export default function UserProfilePage() {
  useAnalytics();
  const { id } = useParams();
  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl">
        <div className="h-48 bg-gradient-to-r from-habesha-green/30 via-habesha-yellow/20 to-habesha-red/30 sm:h-56" />
        <div className="relative px-4">
          <div className="-mt-16 flex flex-col items-center sm:flex-row sm:items-end sm:gap-4">
            <div className="rounded-full border-4 border-white dark:border-dark-900"><Avatar name={MOCK.name} size="xl" className="!h-32 !w-32 !text-3xl" /></div>
            <div className="mt-2 flex-1 text-center sm:mb-2 sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{MOCK.name}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{MOCK.bio}</p>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 sm:justify-start">
                <span className="flex items-center gap-1"><FiMapPin size={12} /> {MOCK.location}</span>
                <span className="flex items-center gap-1"><FiCalendar size={12} /> Joined {MOCK.joined}</span>
                <Badge variant="green">{MOCK.heritage}</Badge>
              </div>
            </div>
            <div className="mt-3 flex gap-2 sm:mt-0 sm:mb-2">
              <Button size="md">Follow</Button>
              <Button variant="secondary" size="md"><FiMessageSquare size={14} className="mr-1" /> Message</Button>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-6 border-b border-gray-200 pb-4 dark:border-dark-700 sm:justify-start">
            <div className="text-center"><span className="block text-lg font-bold text-gray-900 dark:text-white">{MOCK.posts}</span><span className="text-xs text-gray-500">Posts</span></div>
            <div className="text-center"><span className="block text-lg font-bold text-gray-900 dark:text-white">{MOCK.followers}</span><span className="text-xs text-gray-500">Followers</span></div>
            <div className="text-center"><span className="block text-lg font-bold text-gray-900 dark:text-white">{MOCK.following}</span><span className="text-xs text-gray-500">Following</span></div>
          </div>
        </div>
        <div className="mx-auto max-w-2xl space-y-4 px-4 py-4">
          {POSTS.map(p => <PostCard key={p.id} post={p} />)}
        </div>
      </div>
    </AppLayout>
  );
}
