'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiUser, FiMail, FiLock, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { setToken, setRefreshToken } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useAnalytics } from '@/lib/useAnalytics';

const LANGUAGES = ['English', 'Amharic', 'Tigrinya', 'Somali', 'Oromo'];
const LANGUAGE_MAP = { English: 'EN', Amharic: 'AM', Tigrinya: 'TI', Somali: 'SO', Oromo: 'OR' };

export default function RegisterPage() {
  useAnalytics();
  const router = useRouter();
  const { updateUser } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', city: '', languages: ['English'] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleLang = (lang) => {
    setForm((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', ...form, languages: form.languages.map(l => LANGUAGE_MAP[l] || l) }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(typeof data.error === 'string' ? data.error : 'Registration failed. Please try again.');
      } else {
        // Store token and user in localStorage
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
            Join the <br />
            <span className="text-amber-400">Habesha Diaspora</span>
          </h2>
          <p className="mt-4 max-w-sm text-gray-400">
            Connect with Ethiopian, Eritrean, and Somali communities worldwide. One platform, everything you need.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-6">
            {[
              { value: '500+', label: 'Community Members' },
              { value: '8+', label: 'Features' },
              { value: '5', label: 'Languages' },
              { value: '100%', label: 'Free' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-amber-400">{stat.value}</p>
                <p className="mt-0.5 text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
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
            <h1 className="text-2xl font-bold text-navy">Create your account</h1>
            <p className="mt-1 text-sm text-gray-500">Join in seconds — it&apos;s free</p>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    placeholder="Min 6 characters"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    placeholder="Seattle, WA"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Languages</label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLang(lang)}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                        form.languages.includes(lang)
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'border border-gray-200 bg-gray-50 text-gray-600 hover:border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
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
                {loading ? 'Creating account...' : <>Create Account <FiArrowRight size={16} /></>}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-amber-600 hover:text-amber-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
