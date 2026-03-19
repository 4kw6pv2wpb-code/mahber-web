/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MOCK_POSTS = [
  { id: '1', author: 'Meron T.', title: 'Best Ethiopian restaurant in Seattle?', body: 'Just moved to Seattle from DC. Where should I eat? I miss Zenebech but need a new spot.', category: 'Food', upvotes: 24, comments: 12, time: '2h ago' },
  { id: '2', author: 'Dawit K.', title: 'Anyone else sending money through Mahber?', body: 'The 1% fee is life changing compared to what I was paying before. My family in Addis got the money same day.', category: 'Finance', upvotes: 45, comments: 8, time: '4h ago' },
  { id: '3', author: 'Sara A.', title: 'Looking for Tigrinya tutor for my kids', body: 'My kids (8 and 10) are losing their Tigrinya. Anyone offer lessons in the Atlanta area? Will pay well.', category: 'Education', upvotes: 18, comments: 15, time: '6h ago' },
  { id: '4', author: 'Yonas M.', title: 'Habesha developers — lets connect!', body: 'Starting a monthly meetup for Habesha software engineers in the DMV. Who is interested?', category: 'Tech', upvotes: 67, comments: 31, time: '8h ago' },
  { id: '5', author: 'Helen B.', title: 'Advice for first-gen college students?', body: 'I am the first in my family going to university. Any advice from those who went through it?', category: 'Education', upvotes: 89, comments: 42, time: '12h ago' },
  { id: '6', author: 'Abel G.', title: 'Selling authentic Ethiopian coffee set', body: 'Jebena, cups, and rekebot. Hand-made from Harar. $85. DM if interested. Located in Minneapolis.', category: 'Marketplace', upvotes: 12, comments: 5, time: '1d ago' },
  { id: '7', author: 'Liya F.', title: 'Immigration lawyer recommendations?', body: 'Need a good immigration lawyer in LA for family petition. Anyone have experience with a specific firm?', category: 'Legal', upvotes: 33, comments: 19, time: '1d ago' },
  { id: '8', author: 'Bereket H.', title: 'Starting an edir group in Seattle', body: 'Looking for 10-15 people to start a monthly edir. $100/month contribution. Serious people only.', category: 'Community', upvotes: 28, comments: 14, time: '1d ago' },
  { id: '9', author: 'Rahel W.', title: 'Habesha wedding photographer needed - June', body: 'Getting married June 20 in DC. Need a photographer who understands Habesha weddings. Budget $3K.', category: 'Services', upvotes: 15, comments: 9, time: '2d ago' },
  { id: '10', author: 'Tewodros S.', title: 'Why dont we have our own banking app?', body: 'Seriously. 2M+ Habesha in America and we dont have a single fintech app made for us. The remittance fees alone...', category: 'Tech', upvotes: 156, comments: 67, time: '2d ago' },
  { id: '11', author: 'Fatima O.', title: 'Somali-Ethiopian cultural exchange event', body: 'Planning a cultural exchange dinner in Minneapolis. Somali food + Ethiopian food + conversation. Who is in?', category: 'Events', upvotes: 42, comments: 22, time: '2d ago' },
  { id: '12', author: 'Michael A.', title: 'First-gen Habesha homebuyer tips', body: 'Just closed on my first house in Atlanta! Here are 10 things I wish I knew...', category: 'Finance', upvotes: 203, comments: 55, time: '3d ago' },
  { id: '13', author: 'Tigist L.', title: 'Teaching my American-born kids Amharic', body: 'What resources have worked for you? Apps, books, Saturday school? My 6yo is resistant.', category: 'Education', upvotes: 71, comments: 38, time: '3d ago' },
  { id: '14', author: 'Samuel D.', title: 'Habesha small business owners — unite', body: 'Let us create a directory of all Habesha-owned businesses in each city. Start with yours below.', category: 'Business', upvotes: 134, comments: 88, time: '4d ago' },
  { id: '15', author: 'Kidist R.', title: 'Moving to Minneapolis — what to expect?', body: 'Got a job offer in Minneapolis. I hear there is a big Habesha community. What areas should I look at?', category: 'Housing', upvotes: 37, comments: 25, time: '4d ago' },
  { id: '16', author: 'Ephrem B.', title: 'Eritrean coffee vs Ethiopian coffee — debate', body: 'I said what I said. Eritrean coffee ceremony hits different. Come at me.', category: 'Food', upvotes: 89, comments: 102, time: '5d ago' },
  { id: '17', author: 'Hiwot Z.', title: 'Free ESL classes for parents', body: 'Offering free English classes for Habesha parents in the Seattle area. Saturdays 10am-12pm at the community center.', category: 'Education', upvotes: 56, comments: 11, time: '5d ago' },
  { id: '18', author: 'Robel T.', title: 'Need ride to SeaTac Airport - Friday', body: 'Flight is at 6am Friday. Can anyone give me a ride from Rainier Beach? Will pay gas + $20.', category: 'Help', upvotes: 8, comments: 6, time: '6d ago' },
  { id: '19', author: 'Almaz N.', title: 'Habesha kemis for sale — handmade', body: '3 beautiful handmade traditional dresses. Sizes S, M, L. $150 each or $400 for all three. Photos in comments.', category: 'Marketplace', upvotes: 22, comments: 13, time: '6d ago' },
  { id: '20', author: 'Henok G.', title: 'Is anyone else tired of Facebook groups?', body: 'No search, no organization, scammers everywhere. We need something better. Oh wait... 😉', category: 'Meta', upvotes: 312, comments: 89, time: '1w ago' },
];

function getPosts() {
  try {
    if (fs.existsSync(POSTS_FILE)) return JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
  } catch {}
  return MOCK_POSTS;
}

function savePosts(posts) {
  ensureDataDir();
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

export async function GET() {
  return NextResponse.json({ posts: getPosts() });
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Handle upvote/downvote
    if (body.action === 'vote') {
      const posts = getPosts();
      const post = posts.find((p) => p.id === body.postId);
      if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      post.upvotes += body.direction === 'up' ? 1 : -1;
      savePosts(posts);
      return NextResponse.json({ upvotes: post.upvotes });
    }

    // Create new post
    const posts = getPosts();
    const newPost = {
      id: String(Date.now()),
      author: body.author || 'Anonymous',
      title: body.title,
      body: body.body,
      category: body.category || 'General',
      upvotes: 0,
      comments: 0,
      time: 'just now',
    };
    posts.unshift(newPost);
    savePosts(posts);
    return NextResponse.json({ post: newPost });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
