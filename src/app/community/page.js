'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { DiscussionCard } from '@/components/community/DiscussionCard';
import { FiPlus, FiTrendingUp, FiHash, FiLoader } from 'react-icons/fi';
import { feedApi } from '@/lib/api';
import { useAnalytics } from '@/lib/useAnalytics';

const TABS = ['All Posts', 'Questions', 'Discussions', 'Announcements'];

export default function CommunityPage() {
  useAnalytics();
  const [tab, setTab] = useState('All Posts');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const params = { limit: 20 };
        if (tab !== 'All Posts') params.tag = tab;
        const res = await feedApi.getPosts(params);
        setPosts(res.data?.data || res.data || []);
      } catch (err) {
        setError('Could not load community posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [tab]);

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white">
            <FiPlus /> New Post
          </button>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
                tab === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <FiLoader className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center my-4">{error}</div>
        )}

        {!loading && posts.length === 0 && !error && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
            <p className="text-lg font-medium">No posts yet</p>
            <p className="mt-1">Start a discussion with the community!</p>
          </div>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <DiscussionCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
