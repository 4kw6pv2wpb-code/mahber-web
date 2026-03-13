'use client';

import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { StoryRow } from '@/components/feed/StoryRow';
import { CreatePostBox } from '@/components/feed/CreatePostBox';
import { PostCard } from '@/components/feed/PostCard';
import { Avatar } from '@/components/ui/Avatar';
import { FiCalendar, FiTrendingUp } from 'react-icons/fi';

const MOCK_POSTS = [
  { id: 1, author: 'Selam Tekle', time: '2h ago', location: 'Seattle, WA', content: 'Just had the most amazing coffee ceremony at my neighbor\'s place. Nothing beats the smell of freshly roasted Ethiopian coffee on a rainy Seattle day ☕️ Who else is keeping the tradition alive?', likes: 47, comments: 12, shares: 3, image: true, imageAlt: '☕ Coffee ceremony setup', imageBg: 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30' },
  { id: 2, author: 'Dawit Mekonnen', time: '4h ago', location: 'Washington, DC', content: 'Excited to announce that our Habesha Business Network just hit 500 members! 🎉 We\'re organizing a mixer next month in DC — entrepreneurs, creatives, and professionals all welcome. DM me for details.', likes: 92, comments: 23, shares: 15 },
  { id: 3, author: 'Hiwet Ghebrehiwet', time: '6h ago', location: 'Los Angeles, CA', content: 'Looking for roommates in LA! 2BR apartment near Little Ethiopia on Fairfax. $1,200/mo split. Habesha household preferred — we do injera Sundays 🥘 Check the housing section for full details.', likes: 31, comments: 18, shares: 7 },
  { id: 4, author: 'Kidist Abebe', time: '8h ago', location: 'Minneapolis, MN', content: 'My parents just got their citizenship today after 15 years! 🇺🇸🇪🇹 The journey was long but worth every step. If anyone needs help navigating the process, check out the immigration resources section — I\'ve been adding guides.', likes: 234, comments: 56, shares: 42, image: true, imageAlt: '🎉 Celebration photo', imageBg: 'bg-gradient-to-br from-habesha-green/20 via-habesha-yellow/20 to-habesha-red/20' },
  { id: 5, author: 'Yonas Haile', time: '12h ago', location: 'Seattle, WA', content: 'Anyone know a good Tigrinya tutor in the Seattle area? My kids are losing the language and I want them to connect with their roots. Virtual is fine too. Will pay well for a good teacher!', likes: 18, comments: 24, shares: 5 },
  { id: 6, author: 'Meron Berhe', time: '1d ago', location: 'Toronto, ON', content: 'Just launched my small business selling handmade Habesha jewelry! Each piece is inspired by traditional Eritrean designs with a modern twist. Check out my shop in the marketplace 💍✨', likes: 78, comments: 15, shares: 20, image: true, imageAlt: '💍 Handmade jewelry collection', imageBg: 'bg-gradient-to-br from-primary/20 to-accent/20' },
];

const UPCOMING_EVENTS = [
  { id: 1, title: 'Seattle Habesha Night', date: 'Mar 15', venue: 'The Showbox' },
  { id: 2, title: 'Injera Making Workshop', date: 'Mar 20', venue: 'Community Center' },
  { id: 3, title: 'Business Networking', date: 'Mar 25', venue: 'WeWork Capitol Hill' },
];

const TRENDING = ['#HabeshaInTech', '#EritreanIndependenceDay', '#InjiraNotInjera', '#DiasporaVotes', '#MeskelFlower'];

export default function HomePage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-6">
          {/* Main Feed */}
          <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
            <StoryRow />
            <CreatePostBox onOpen={() => setShowCreateModal(true)} />
            <div className="space-y-4">
              {MOCK_POSTS.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden w-80 shrink-0 space-y-4 lg:block">
            {/* Suggested People */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-dark-700 dark:bg-dark-800">
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Suggested for You</h3>
              <div className="space-y-3">
                {[{ name: 'Abel Kibrom', bio: 'Software Engineer · Eritrean' }, { name: 'Tigist Worku', bio: 'Chef · Ethiopian cuisine' }, { name: 'Semhar Tesfai', bio: 'Photographer · Asmara' }].map((p) => (
                  <div key={p.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar name={p.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{p.bio}</p>
                      </div>
                    </div>
                    <button className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/20">Follow</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-dark-700 dark:bg-dark-800">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                <FiCalendar size={16} className="text-primary" /> Upcoming Events
              </h3>
              <div className="space-y-3">
                {UPCOMING_EVENTS.map((evt) => (
                  <div key={evt.id} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <span className="text-xs font-bold leading-none">{evt.date.split(' ')[0]}</span>
                      <span className="text-[10px] leading-none">{evt.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{evt.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{evt.venue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-dark-700 dark:bg-dark-800">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                <FiTrendingUp size={16} className="text-accent" /> Trending
              </h3>
              <div className="flex flex-wrap gap-2">
                {TRENDING.map((tag) => (
                  <span key={tag} className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-primary/10 hover:text-primary dark:bg-dark-700 dark:text-gray-300">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
