'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { PostCard } from '@/components/feed/PostCard';
import { Badge } from '@/components/ui/Badge';
import { FiMapPin, FiCalendar, FiEdit2, FiBriefcase, FiGlobe, FiLoader } from 'react-icons/fi';
import { useAuth } from '@/lib/auth-context';
import { communityApi, feedApi } from '@/lib/api';
import { useAnalytics } from '@/lib/useAnalytics';

const TABS = ['Posts', 'About', 'Photos', 'Connections'];

export default function ProfilePage() {
  useAnalytics();
  const { user } = useAuth();
  const [tab, setTab] = useState('Posts');
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const [profileRes, postsRes] = await Promise.allSettled([
          communityApi.getMyProfile(),
          feedApi.getPosts({ userId: 'me', limit: 10 }),
        ]);
        if (profileRes.status === 'fulfilled') {
          setProfile(profileRes.value.data?.data || profileRes.value.data || null);
        }
        if (postsRes.status === 'fulfilled') {
          setPosts(postsRes.value.data?.data || postsRes.value.data || []);
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const displayProfile = profile || user || {};

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl">
        <div className="h-48 bg-gradient-to-r from-primary/30 via-eritrean-blue/20 to-habesha-green/30 sm:h-56" />
        <div className="relative px-4">
          <div className="-mt-16 flex flex-col items-center sm:flex-row sm:items-end sm:gap-4">
            <Avatar name={displayProfile.name || 'User'} size="xl" className="ring-4 ring-white" />
            <div className="mt-3 text-center sm:text-left sm:mt-0 sm:mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{displayProfile.name || 'Your Name'}</h1>
              <p className="text-sm text-gray-500">{displayProfile.bio || ''}</p>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-auto sm:mb-2">
              <Button className="flex items-center gap-2"><FiEdit2 /> Edit Profile</Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            {displayProfile.location && (
              <span className="flex items-center gap-1"><FiMapPin />{displayProfile.location}</span>
            )}
            {displayProfile.work && (
              <span className="flex items-center gap-1"><FiBriefcase />{displayProfile.work}</span>
            )}
          </div>

          <div className="mt-4 flex gap-6 text-sm">
            <span><strong>{displayProfile.followers || 0}</strong> Followers</span>
            <span><strong>{displayProfile.following || 0}</strong> Following</span>
            <span><strong>{displayProfile.posts || posts.length}</strong> Posts</span>
          </div>
        </div>

        <div className="mt-6 border-b border-gray-200">
          <div className="flex gap-1 px-4">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                  tab === t ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-6">
          {loading && (
            <div className="flex justify-center py-12">
              <FiLoader className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {tab === 'Posts' && !loading && (
            posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p className="text-lg font-medium">No posts yet</p>
                <p className="mt-1">Share your first post with the community!</p>
              </div>
            )
          )}

          {tab === 'About' && !loading && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">About</h3>
              <p className="text-gray-600">{displayProfile.bio || 'No bio yet'}</p>
              {displayProfile.education && (
                <div><span className="text-sm text-gray-500">Education:</span> <span className="text-gray-700">{displayProfile.education}</span></div>
              )}
              {displayProfile.languages && (
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(displayProfile.languages) ? displayProfile.languages : []).map(l => (
                    <Badge key={l}>{l}</Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
