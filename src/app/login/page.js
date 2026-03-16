'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '@/lib/auth-context';
import { setToken, setRefreshToken } from '@/lib/api';
import { useAnalytics } from '@/lib/useAnalytics';

export default function LoginPage() {
  useAnalytics();
  const router = useRouter();
  const { updateUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(typeof data.error === 'string' ? data.error : 'Invalid email or password.');
      } else {
        // Store token and user in localStorage via api helpers
        if (data.token) setToken(data.token);
        if (data.refreshToken) setRefreshToken(data.refreshToken);
        if (data.user) {
          localStorage.setItem('habeshahub_user', JSON.stringify(data.user));
          // Update auth context so the app knows the user is logged in
          updateUser(data.user);
        }
        router.push('/home');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel — brand */}
      <div className="relative hidden w-1/2 overflow-hidden bg-navy lg:flex lg:flex-col lg:items-center lg:justify-center">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        {/* Flag accent */}
        <div className="absolute left-0 top-0 flex h-full w-1">
          <div className="h-1/3 w-full bg-habesha-green" />
          <div className="h-1/3 w-full bg-habesha-yellow" />
          <div className="h-1/3 w-full bg-habesha-red" />
        </div>

        <div className="relative z-10 px-12 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-2xl font-bold text-white shadow-lg shadow-amber-500/20">
              H
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Welcome back to <br />
            <span className="text-amber-400">HabeshaHub</span>
          </h2>
          <p className="mt-4 max-w-sm text-gray-400">
            The all-in-one platform for the Ethiopian, Eritrean, and Somali diaspora.
          </p>

          {/* Mini feature list */}
          <div className="mt-10 space-y-3 text-left">
            {['Community & Forums', 'Jobs & Housing', 'Events & Dating', 'Remittance & More'].map(
              (item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                    <svg className="h-3.5 w-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex w-full items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-xl font-bold text-white shadow-lg shadow-amber-500/20">
              H
            </div>
            <span className="text-2xl font-bold text-navy">
              Habesha<span className="text-amber-500">Hub</span>
            </span>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100/50 sm:p-10">
            <h1 className="text-2xl font-bold text-navy">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" className="text-xs font-medium text-amber-600 hover:text-amber-700">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600 hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'Signing in...' : <>Sign In <FiArrowRight size={16} /></>}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              New here?{' '}
              <Link href="/register" className="font-semibold text-amber-600 hover:text-amber-700">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
