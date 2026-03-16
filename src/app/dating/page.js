'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { ProfileCard } from '@/components/dating/ProfileCard';
import { MatchesList } from '@/components/dating/MatchesList';
import { FiHeart, FiX, FiStar, FiUser, FiSettings, FiLoader } from 'react-icons/fi';
import { datingApi } from '@/lib/api';
import { useAnalytics } from '@/lib/useAnalytics';

const TABS = ['Discover', 'Matches'];

const DEMO_PROFILES = [
  {
    id: 'demo-1',
    user: { name: 'Selam Tesfaye', city: 'Seattle, WA', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=selam' },
    headline: 'Coffee lover & culture enthusiast',
    aboutMe: 'Born in Addis, raised in Seattle. I love buna ceremonies, hiking in the PNW, and cooking traditional dishes. Looking for someone who values family and culture.',
    interests: ['Coffee', 'Hiking', 'Cooking', 'Music', 'Travel'],
    age: 27,
    goal: 'SERIOUS',
    photoUrls: ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400'],
    education: 'UW Seattle',
    occupation: 'Software Engineer',
  },
  {
    id: 'demo-2',
    user: { name: 'Yonas Kidane', city: 'Renton, WA', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yonas' },
    headline: 'Ambitious & family-oriented',
    aboutMe: 'Eritrean-American working in tech. I enjoy playing soccer, watching movies, and spending time with family. Faith and respect matter to me.',
    interests: ['Soccer', 'Tech', 'Movies', 'Family', 'Faith'],
    age: 30,
    goal: 'SERIOUS',
    photoUrls: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'],
    education: 'WSU',
    occupation: 'Data Analyst',
  },
  {
    id: 'demo-3',
    user: { name: 'Hana Bekele', city: 'Bellevue, WA', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hana' },
    headline: 'Creative soul with big dreams',
    aboutMe: 'Ethiopian-American artist and nurse. I paint, dance eskista, and love trying new restaurants. Looking for genuine connection.',
    interests: ['Art', 'Dancing', 'Food', 'Healthcare', 'Reading'],
    age: 25,
    goal: 'SERIOUS',
    photoUrls: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'],
    education: 'Seattle University',
    occupation: 'Registered Nurse',
  },
  {
    id: 'demo-4',
    user: { name: 'Dawit Haile', city: 'Tacoma, WA', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dawit3' },
    headline: 'Building a better future',
    aboutMe: 'First-gen college grad, now in real estate. I value hard work, humor, and good injera. Weekend warrior who loves community events.',
    interests: ['Real Estate', 'Community', 'Basketball', 'Cooking', 'Business'],
    age: 32,
    goal: 'SERIOUS',
    photoUrls: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
    education: 'UW Tacoma',
    occupation: 'Real Estate Agent',
  },
  {
    id: 'demo-5',
    user: { name: 'Meron Abay', city: 'Federal Way, WA', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meron' },
    headline: 'Kind heart, adventurous spirit',
    aboutMe: 'Somali-Ethiopian background. Teacher by day, foodie by night. I love traveling, learning languages, and volunteering.',
    interests: ['Travel', 'Languages', 'Volunteering', 'Photography', 'Yoga'],
    age: 28,
    goal: 'SERIOUS',
    photoUrls: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400'],
    education: 'PLU',
    occupation: 'Elementary Teacher',
  },
];

export default function DatingPage() {
  useAnalytics();
  const [tab, setTab] = useState('Discover');
  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        if (tab === 'Discover') {
          const res = await datingApi.getDiscover();
          const data = res.data?.data || res.data || [];
          setProfiles(data.length > 0 ? data : DEMO_PROFILES);
          setCurrentIdx(0);
        } else {
          const res = await datingApi.getMatches();
          setMatches(res.data?.data || res.data || []);
        }
      } catch (err) {
        // Use demo profiles when not authenticated
        if (tab === 'Discover') {
          setProfiles(DEMO_PROFILES);
          setCurrentIdx(0);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [tab]);

  const currentProfile = profiles[currentIdx];

  function handleSwipe(direction) {
    if (currentIdx < profiles.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0); // Loop back
    }
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dating</h1>
          <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-700">
            <FiSettings size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                tab === t
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-300'
              }`}
            >
              {t === 'Discover' ? <><FiHeart className="mr-1.5 inline" size={14} />{t}</> : <><FiUser className="mr-1.5 inline" size={14} />{t}</>}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <FiLoader className="animate-spin text-primary" size={28} />
          </div>
        ) : tab === 'Discover' ? (
          currentProfile ? (
            <div className="relative">
              <ProfileCard profile={currentProfile} />
              {/* Swipe buttons */}
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => handleSwipe('LEFT')}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-300 text-red-400 transition hover:bg-red-50 hover:text-red-500 dark:border-red-800 dark:hover:bg-red-900/20"
                >
                  <FiX size={28} />
                </button>
                <button
                  onClick={() => handleSwipe('SUPER')}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-300 text-blue-400 transition hover:bg-blue-50 hover:text-blue-500 dark:border-blue-800 dark:hover:bg-blue-900/20"
                >
                  <FiStar size={24} />
                </button>
                <button
                  onClick={() => handleSwipe('RIGHT')}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-300 text-green-400 transition hover:bg-green-50 hover:text-green-500 dark:border-green-800 dark:hover:bg-green-900/20"
                >
                  <FiHeart size={24} />
                </button>
              </div>
              <p className="mt-3 text-center text-xs text-gray-400">{currentIdx + 1} of {profiles.length} profiles</p>
            </div>
          ) : (
            <div className="rounded-xl bg-gray-50 p-12 text-center dark:bg-dark-800">
              <FiHeart className="mx-auto mb-3 text-primary" size={40} />
              <p className="font-semibold text-gray-700 dark:text-gray-300">No more profiles</p>
              <p className="text-sm text-gray-500">Check back later for new people.</p>
            </div>
          )
        ) : (
          matches.length > 0 ? (
            <MatchesList matches={matches} />
          ) : (
            <div className="rounded-xl bg-gray-50 p-12 text-center dark:bg-dark-800">
              <FiHeart className="mx-auto mb-3 text-primary" size={40} />
              <p className="font-semibold text-gray-700 dark:text-gray-300">No matches yet</p>
              <p className="text-sm text-gray-500">Keep swiping to find your person!</p>
            </div>
          )
        )}
      </div>
    </AppLayout>
  );
}
