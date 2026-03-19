'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { StoryRow } from '@/components/feed/StoryRow';
import { CreatePostBox } from '@/components/feed/CreatePostBox';
import { PostCard } from '@/components/feed/PostCard';
import { Avatar } from '@/components/ui/Avatar';
import { FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { useAuth } from '@/lib/auth-context';
import { feedApi, eventsApi } from '@/lib/api';
import { useAnalytics } from '@/lib/useAnalytics';

function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-dark-700 dark:bg-dark-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="skeleton h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <div className="skeleton h-3 w-24 rounded" />
              <div className="skeleton h-2 w-16 rounded" />
            </div>
          </div>
          <div className="skeleton h-3 w-full rounded mb-2" />
          <div className="skeleton h-3 w-3/4 rounded mb-3" />
          <div className="skeleton h-40 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  useAnalytics();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [postsRes, eventsRes] = await Promise.allSettled([
          feedApi.getPosts({ limit: 20 }),
          eventsApi.getEvents({ limit: 5 }),
        ]);
        if (postsRes.status === 'fulfilled') {
          setPosts(postsRes.value.data?.data || postsRes.value.data || []);
        }
        if (eventsRes.status === 'fulfilled') {
          setEvents(eventsRes.value.data?.data || eventsRes.value.data || []);
        }
      } catch (err) {
        setError('Could not load feed. Please try again.');
        console.error('Feed fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 page-fade-in">
        <div className="flex gap-6">
          {/* Main Feed */}
          <div className="flex-1 min-w-0 space-y-4">
            <StoryRow />
            <CreatePostBox
              onPost={() => setShowCreateModal(true)}
              user={user}
            />

            {loading && <FeedSkeleton />}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
                {error}
              </div>
            )}

            {!loading && posts.length === 0 && !error && (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <FiTrendingUp className="text-primary" size={28} />
                </div>
                <p className="text-lg font-semibold text-gray-900">No posts yet</p>
                <p className="mt-1 text-gray-500">Be the first to share something with the community!</p>
              </div>
            )}

            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-80 space-y-4">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm p-4 card-hover">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <FiCalendar className="text-primary" /> Upcoming Events
              </h3>
              {events.length === 0 && !loading && (
                <p className="text-sm text-gray-500">No upcoming events</p>
              )}
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 py-2 border-b last:border-0"
                >
                  <div className="bg-primary/10 rounded-lg p-2 text-center min-w-[48px]">
                    <span className="text-xs text-primary font-medium">
                      {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {event.venue || event.location || ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trending */}
            <div className="bg-white rounded-xl shadow-sm p-4 card-hover">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <FiTrendingUp className="text-primary" /> Trending
              </h3>
              <div className="flex flex-wrap gap-2">
                {['#HabeshaInTech', '#EritreanIndependenceDay', '#DiasporaVotes'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full hover:bg-primary/20 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
