/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'mahber-secret-2026';

function readUsers() {
  try { return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')); } catch { return []; }
}

function writeUsers(data) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

function verifyToken(token) {
  try {
    const [data, sig] = token.split('.');
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
    if (sig !== expectedSig) return null;
    return JSON.parse(Buffer.from(data, 'base64url').toString());
  } catch { return null; }
}

export async function PUT(request) {
  try {
    const token = request.cookies.get('mahber_token')?.value;
    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const updates = await request.json();
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === payload.id);
    if (idx === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const allowed = ['name', 'bio', 'city', 'languages', 'avatar'];
    allowed.forEach((key) => {
      if (updates[key] !== undefined) users[idx][key] = updates[key];
    });

    writeUsers(users);
    const { password: _, ...safeUser } = users[idx];
    return NextResponse.json({ user: safeUser });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
