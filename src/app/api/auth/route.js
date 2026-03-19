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

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]');
}

function readUsers() {
  ensureDataDir();
  try { return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')); } catch { return []; }
}

function writeUsers(data) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + JWT_SECRET).digest('hex');
}

function createToken(user) {
  const payload = { id: user.id, email: user.email, name: user.name };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
  return `${data}.${sig}`;
}

function verifyToken(token) {
  try {
    const [data, sig] = token.split('.');
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
    if (sig !== expectedSig) return null;
    return JSON.parse(Buffer.from(data, 'base64url').toString());
  } catch { return null; }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'register') {
      const { name, email, password, languages, city } = body;
      if (!name || !email || !password) {
        return NextResponse.json({ error: 'Name, email, and password required' }, { status: 400 });
      }
      const users = readUsers();
      if (users.some((u) => u.email === email.toLowerCase().trim())) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
      }
      const user = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashPassword(password),
        languages: languages || ['English'],
        city: city || '',
        bio: '',
        avatar: '',
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      writeUsers(users);
      const token = createToken(user);
      const { password: _, ...safeUser } = user;
      const response = NextResponse.json({ user: safeUser, token });
      response.cookies.set('mahber_token', token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 30, path: '/' });
      return response;
    }

    if (action === 'login') {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
      }
      const users = readUsers();
      const user = users.find((u) => u.email === email.toLowerCase().trim());
      if (!user || user.password !== hashPassword(password)) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
      const token = createToken(user);
      const { password: _, ...safeUser } = user;
      const response = NextResponse.json({ user: safeUser, token });
      response.cookies.set('mahber_token', token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 30, path: '/' });
      return response;
    }

    if (action === 'logout') {
      const response = NextResponse.json({ ok: true });
      response.cookies.delete('mahber_token');
      return response;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const token = request.cookies.get('mahber_token')?.value;
    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    const users = readUsers();
    const user = users.find((u) => u.id === payload.id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const { password: _, ...safeUser } = user;
    return NextResponse.json({ user: safeUser });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
