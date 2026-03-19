/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(ANALYTICS_FILE)) fs.writeFileSync(ANALYTICS_FILE, '[]');
}

function readAnalytics() {
  ensureDataDir();
  try {
    return JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeAnalytics(data) {
  ensureDataDir();
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request) {
  try {
    const { page, referrer } = await request.json();

    if (!page) {
      return NextResponse.json({ error: 'Page required' }, { status: 400 });
    }

    const analytics = readAnalytics();

    analytics.push({
      page,
      referrer: referrer || '',
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || '',
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    });

    // Keep only last 50k entries to avoid huge files
    const trimmed = analytics.length > 50000 ? analytics.slice(-50000) : analytics;
    writeAnalytics(trimmed);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    if (password !== 'mahber2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const analytics = readAnalytics();

    // Aggregate by page
    const pageViews = {};
    const dailyViews = {};

    analytics.forEach((entry) => {
      // Page counts
      pageViews[entry.page] = (pageViews[entry.page] || 0) + 1;

      // Daily counts
      const day = entry.timestamp.split('T')[0];
      dailyViews[day] = (dailyViews[day] || 0) + 1;
    });

    // Sort pages by views
    const topPages = Object.entries(pageViews)
      .sort((a, b) => b[1] - a[1])
      .map(([page, views]) => ({ page, views }));

    // Last 30 days
    const sortedDays = Object.entries(dailyViews)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-30)
      .map(([date, views]) => ({ date, views }));

    return NextResponse.json({
      totalViews: analytics.length,
      topPages,
      dailyViews: sortedDays,
      recentEntries: analytics.slice(-50).reverse(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
