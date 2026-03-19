/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const WAITLIST_FILE = path.join(DATA_DIR, 'waitlist.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(WAITLIST_FILE)) fs.writeFileSync(WAITLIST_FILE, '[]');
}

function readWaitlist() {
  ensureDataDir();
  try {
    return JSON.parse(fs.readFileSync(WAITLIST_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeWaitlist(data) {
  ensureDataDir();
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const waitlist = readWaitlist();
    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicate
    if (waitlist.some((entry) => entry.email === normalizedEmail)) {
      return NextResponse.json({ message: 'Already on the waitlist!', count: waitlist.length });
    }

    waitlist.push({
      email: normalizedEmail,
      source: source || 'unknown',
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    });

    writeWaitlist(waitlist);

    return NextResponse.json({
      message: 'Welcome to the waitlist!',
      count: waitlist.length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    const waitlist = readWaitlist();

    // If password provided, return full list (for admin)
    if (password === 'mahber2026') {
      return NextResponse.json({ count: waitlist.length, entries: waitlist });
    }

    // Public: just count
    return NextResponse.json({ count: waitlist.length });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
