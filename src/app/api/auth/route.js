import { NextResponse } from 'next/server';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://habeshahub-backend-production.up.railway.app/api';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, ...userData } = body;

    if (action === 'logout') {
      const response = NextResponse.json({ ok: true });
      response.cookies.delete('hh_token');
      return response;
    }

    const endpoint = action === 'register' ? '/auth/register' : '/auth/login';

    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok || data.success === false) {
      const errorMsg =
        (typeof data.error === 'string' ? data.error : data.error?.message) ||
        data.message ||
        'Something went wrong';
      return NextResponse.json({ error: errorMsg }, { status: res.status });
    }

    const token = data.token || data.data?.token;
    const response = NextResponse.json({
      token,
      user: data.user || data.data?.user,
      refreshToken: data.refreshToken || data.data?.refreshToken,
    });

    if (token) {
      response.cookies.set('hh_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
    }

    return response;
  } catch (error) {
    console.error('Auth proxy error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const token = request.cookies.get('hh_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const backendRes = await fetch(`${BACKEND_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!backendRes.ok) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const data = await backendRes.json();
    return NextResponse.json({ user: data.user || data.data || data });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
