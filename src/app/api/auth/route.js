import { NextResponse } from 'next/server';

const BACKEND_URL =
  process.env.BACKEND_URL ||
  'https://habeshahub-backend-production.up.railway.app/api';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, email, password, name, city, languages } = body;

    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
      }

      const backendRes = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await backendRes.json();

      if (!backendRes.ok || data.success === false) {
        const errMsg =
          (typeof data.error === 'string' ? data.error : data.error?.message) ||
          data.message ||
          'Invalid email or password';
        return NextResponse.json(
          { error: errMsg },
          { status: backendRes.ok ? 400 : backendRes.status },
        );
      }

      const response = NextResponse.json({
        user: data.user || data.data?.user,
        token: data.token || data.data?.token,
        refreshToken: data.refreshToken || data.data?.refreshToken,
      });

      // Also set an httpOnly cookie for SSR auth if the backend returns a token
      const token = data.token || data.data?.token;
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
    }

    if (action === 'register') {
      if (!name || !email || !password) {
        return NextResponse.json({ error: 'Name, email, and password required' }, { status: 400 });
      }

      const backendRes = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, city, languages }),
      });

      const data = await backendRes.json();

      if (!backendRes.ok || data.success === false) {
        const errMsg =
          (typeof data.error === 'string' ? data.error : data.error?.message) ||
          data.message ||
          'Registration failed';
        return NextResponse.json(
          { error: errMsg },
          { status: backendRes.ok ? 400 : backendRes.status },
        );
      }

      const response = NextResponse.json({
        user: data.user || data.data?.user,
        token: data.token || data.data?.token,
        refreshToken: data.refreshToken || data.data?.refreshToken,
      });

      const token = data.token || data.data?.token;
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
    }

    if (action === 'logout') {
      const response = NextResponse.json({ ok: true });
      response.cookies.delete('hh_token');
      return response;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (e) {
    console.error('Auth route error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const token = request.cookies.get('hh_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Try to get user profile from the backend
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
