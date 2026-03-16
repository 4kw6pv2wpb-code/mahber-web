'use client';

import { useState } from 'react';
import { FiHeart, FiMessageCircle, FiShare2, FiBookmark, FiMoreHorizontal } from 'react-icons/fi';
import { Avatar } from '@/components/ui/Avatar';
import Image from 'next/image';

export function PostCard({ post }) {
  const authorName = typeof post.author === 'string' ? post.author : post.author?.name || 'User';
  const authorAvatar = typeof post.author === 'object' ? post.author?.avatarUrl : null;
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likesCount || post.likes || 0);
  const timeAgo = post.time || (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '');
  const image = post.image || post.mediaUrl;

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-dark-700 dark:bg-dark-800">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={authorName} src={authorAvatar} size="md" />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{authorName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}{post.location ? ` · ${post.location}` : ''}</p>
          </div>
        </div>
        <button className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700"><FiMoreHorizontal /></button>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-gray-800 dark:text-gray-200">{post.content}</p>
      {image && (
        <div className="mb-3 overflow-hidden rounded-lg">
          <img src={image} alt="" className="w-full object-cover" style={{ maxHeight: '400px' }} />
        </div>
      )}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-dark-700">
        <div className="flex gap-4">
          <button onClick={toggleLike} className={`flex items-center gap-1.5 text-sm ${liked ? 'text-red-500' : 'text-gray-500'}`}>
            <FiHeart size={18} className={liked ? 'fill-current' : ''} />{likeCount}
          </button>
          <button className="flex items-center gap-1.5 text-sm text-gray-500"><FiMessageCircle size={18} />{post.commentsCount || post.comments || 0}</button>
          <button className="flex items-center gap-1.5 text-sm text-gray-500"><FiShare2 size={18} /></button>
        </div>
        <button onClick={() => setSaved(!saved)} className={saved ? 'text-primary' : 'text-gray-400'}><FiBookmark size={18} className={saved ? 'fill-current' : ''} /></button>
      </div>
    </div>
  );
}
