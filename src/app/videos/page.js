'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiBookmark,
  FiMusic,
  FiVolume2,
  FiVolumeX,
  FiPlay,
  FiChevronUp,
  FiChevronDown,
  FiPlus,
} from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

const MOCK_VIDEOS = [
  {
    id: 1,
    creator: 'Selam Tekle',
    handle: '@selamcooks',
    caption: 'How to make perfect injera from scratch — fermented teff batter, the right bubbles, and the flip technique your emaye taught you 🫓✨ #HabeshaFood #Injera',
    likes: 12400,
    comments: 843,
    shares: 2100,
    saved: 4500,
    song: 'Traditional Mezmur',
    gradient: 'from-amber-800 via-amber-900 to-yellow-900',
    emoji: '🫓',
    verified: true,
    following: false,
  },
  {
    id: 2,
    creator: 'Dawit Mekonnen',
    handle: '@dawitdances',
    caption: 'Eskista tutorial part 3 — the shoulder roll breakdown! Once you get this, you unlock the whole dance 💃🕺 #Eskista #HabeshaDance #Ethiopian',
    likes: 8900,
    comments: 567,
    shares: 1800,
    saved: 3200,
    song: 'Teddy Afro — Alhed Ale',
    gradient: 'from-emerald-800 via-teal-900 to-emerald-950',
    emoji: '🕺',
    verified: true,
    following: true,
  },
  {
    id: 3,
    creator: 'Hiwet Ghebrehiwet',
    handle: '@hiwetstyle',
    caption: 'Habesha kemis styling for modern diaspora women — traditional meets streetwear 🇪🇷✨ This zuria combo is everything #HabeshaFashion #Eritrean',
    likes: 15200,
    comments: 1023,
    shares: 3400,
    saved: 6700,
    song: 'Eritrean Guayla Beat',
    gradient: 'from-rose-800 via-pink-900 to-rose-950',
    emoji: '👗',
    verified: false,
    following: false,
  },
  {
    id: 4,
    creator: 'Yonas Haile',
    handle: '@yonasbuna',
    caption: 'The art of Ethiopian coffee ceremony — from roasting to pouring. Three rounds: Abol, Tona, Bereka. This is not just coffee, it\'s community ☕🤎 #BunaCeremony #CoffeeCeremony',
    likes: 22100,
    comments: 1456,
    shares: 5200,
    saved: 9800,
    song: 'Ambient Buna Sounds',
    gradient: 'from-yellow-900 via-amber-950 to-stone-900',
    emoji: '☕',
    verified: true,
    following: false,
  },
  {
    id: 5,
    creator: 'Kidist Abebe',
    handle: '@kidistcreates',
    caption: 'POV: You\'re helping your mom make doro wot for Fasika (Ethiopian Easter) and she says "add a little more berbere" for the 5th time 😂🌶️ #HabeshaKid #DoroWot',
    likes: 31500,
    comments: 2100,
    shares: 7800,
    saved: 11000,
    song: 'Aster Aweke — Tizita',
    gradient: 'from-red-800 via-red-900 to-orange-950',
    emoji: '🌶️',
    verified: true,
    following: true,
  },
  {
    id: 6,
    creator: 'Meron Berhe',
    handle: '@meronbeats',
    caption: 'Making a beat with traditional krar sounds mixed with trap 🎵🔥 Habesha music going global! Wait for the drop... #HabeshaBeats #MusicProducer #Krar',
    likes: 9700,
    comments: 612,
    shares: 1900,
    saved: 3800,
    song: 'Original — Krar Trap Fusion',
    gradient: 'from-violet-800 via-purple-900 to-indigo-950',
    emoji: '🎵',
    verified: false,
    following: false,
  },
];

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

function VideoCard({ video, isActive, isMuted, onToggleMute }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [paused, setPaused] = useState(false);
  const [following, setFollowing] = useState(video.following);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="relative flex h-full w-full snap-start snap-always items-center justify-center">
      {/* Video background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${video.gradient}`}
        onClick={() => setPaused(!paused)}
      >
        {/* Big emoji as "video" content placeholder */}
        <div className="flex h-full items-center justify-center">
          <span
            className={`text-[120px] transition-transform duration-300 sm:text-[160px] ${
              isActive && !paused ? 'animate-pulse' : ''
            }`}
          >
            {video.emoji}
          </span>
        </div>

        {/* Pause overlay */}
        {paused && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="rounded-full bg-black/40 p-4">
              <FiPlay size={40} className="text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom gradient for readability */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />

      {/* Creator info + caption — bottom left */}
      <div className="absolute bottom-4 left-4 right-20 z-10">
        <div className="mb-3 flex items-center gap-2">
          <Avatar name={video.creator} size="sm" />
          <span className="text-sm font-bold text-white">{video.handle}</span>
          {video.verified && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] text-white">
              ✓
            </span>
          )}
          {!following && (
            <button
              onClick={() => setFollowing(true)}
              className="rounded-md border border-white/60 px-2 py-0.5 text-xs font-semibold text-white hover:bg-white/20"
            >
              Follow
            </button>
          )}
        </div>
        <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-white/90">
          {video.caption}
        </p>
        <div className="flex items-center gap-2 text-xs text-white/70">
          <FiMusic size={12} className="animate-spin-slow" />
          <span className="truncate">{video.song}</span>
        </div>
      </div>

      {/* Action buttons — right side */}
      <div className="absolute bottom-20 right-3 z-10 flex flex-col items-center gap-5">
        <button onClick={toggleLike} className="flex flex-col items-center gap-1">
          <div
            className={`rounded-full p-2.5 backdrop-blur-sm ${
              liked ? 'bg-accent/30' : 'bg-black/20'
            }`}
          >
            <FiHeart
              size={24}
              className={liked ? 'fill-accent text-accent' : 'text-white'}
            />
          </div>
          <span className="text-xs font-semibold text-white">
            {formatCount(likeCount)}
          </span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="rounded-full bg-black/20 p-2.5 backdrop-blur-sm">
            <FiMessageCircle size={24} className="text-white" />
          </div>
          <span className="text-xs font-semibold text-white">
            {formatCount(video.comments)}
          </span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="rounded-full bg-black/20 p-2.5 backdrop-blur-sm">
            <FiShare2 size={24} className="text-white" />
          </div>
          <span className="text-xs font-semibold text-white">
            {formatCount(video.shares)}
          </span>
        </button>

        <button
          onClick={() => setSaved(!saved)}
          className="flex flex-col items-center gap-1"
        >
          <div
            className={`rounded-full p-2.5 backdrop-blur-sm ${
              saved ? 'bg-primary/30' : 'bg-black/20'
            }`}
          >
            <FiBookmark
              size={24}
              className={saved ? 'fill-primary text-primary' : 'text-white'}
            />
          </div>
          <span className="text-xs font-semibold text-white">
            {formatCount(video.saved)}
          </span>
        </button>

        {/* Mute toggle */}
        <button onClick={onToggleMute} className="flex flex-col items-center gap-1">
          <div className="rounded-full bg-black/20 p-2.5 backdrop-blur-sm">
            {isMuted ? (
              <FiVolumeX size={20} className="text-white" />
            ) : (
              <FiVolume2 size={20} className="text-white" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

export default function VideosPage() {
  useAnalytics();
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const scrollRef = useRef(null);

  const scrollTo = useCallback(
    (direction) => {
      const next =
        direction === 'up'
          ? Math.max(0, activeIndex - 1)
          : Math.min(MOCK_VIDEOS.length - 1, activeIndex + 1);
      setActiveIndex(next);
      if (scrollRef.current) {
        const children = scrollRef.current.children;
        if (children[next]) {
          children[next].scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    [activeIndex],
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.6 },
    );

    Array.from(container.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <AppLayout>
      <div className="relative mx-auto flex h-[calc(100vh-4rem)] max-w-lg justify-center overflow-hidden bg-black lg:pb-0 pb-16">
        {/* Feed header */}
        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-white drop-shadow-md">Videos</h1>
          <button className="rounded-full bg-primary p-2 text-white shadow-lg hover:bg-primary/90">
            <FiPlus size={20} />
          </button>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="h-full w-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
        >
          {MOCK_VIDEOS.map((video, idx) => (
            <div
              key={video.id}
              data-index={idx}
              className="h-full w-full shrink-0 snap-start"
            >
              <VideoCard
                video={video}
                isActive={idx === activeIndex}
                isMuted={muted}
                onToggleMute={() => setMuted(!muted)}
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows (desktop) */}
        <div className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
          <button
            onClick={() => scrollTo('up')}
            disabled={activeIndex === 0}
            className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50 disabled:opacity-30"
          >
            <FiChevronUp size={20} />
          </button>
          <button
            onClick={() => scrollTo('down')}
            disabled={activeIndex === MOCK_VIDEOS.length - 1}
            className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50 disabled:opacity-30"
          >
            <FiChevronDown size={20} />
          </button>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-1 lg:bottom-4">
          {MOCK_VIDEOS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all ${
                idx === activeIndex ? 'w-6 bg-primary' : 'w-1 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
