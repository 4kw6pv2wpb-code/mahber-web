'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiMapPin, FiGlobe } from 'react-icons/fi';
import { useAuth } from '@/lib/auth-context';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAnalytics } from '@/lib/useAnalytics';

const COUNTRIES = ['Ethiopia', 'Eritrea', 'Somalia', 'Djibouti', 'United States', 'Canada', 'United Kingdom', 'Germany', 'Sweden', 'Other'];

export default function RegisterPage() {
  useAnalytics();
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', country: '', city: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (!agreed) { setError('Please agree to the terms'); return; }
    setLoading(true);
    setError('');
    try {
      await register({ name: form.name, email: form.email, password: form.password, country: form.country, city: form.city });
      router.push('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-white to-eritrean-blue/5 px-4 py-12 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950">
      <div className="fixed left-0 right-0 top-0 flex h-1">
        <div className="flex-1 bg-habesha-green" /><div className="flex-1 bg-habesha-yellow" /><div className="flex-1 bg-habesha-red" />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white">H</div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">Habesha<span className="text-primary">Hub</span></span>
          </Link>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Join the diaspora community</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-dark-700 dark:bg-dark-800">
          <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Create Account</h2>

          {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" placeholder="Selam Tekle" icon={FiUser} value={form.name} onChange={set('name')} required />
            <Input label="Email" type="email" placeholder="you@example.com" icon={FiMail} value={form.email} onChange={set('email')} required />
            <Input label="Password" type="password" placeholder="••••••••" icon={FiLock} value={form.password} onChange={set('password')} required />
            <Input label="Confirm Password" type="password" placeholder="••••••••" icon={FiLock} value={form.confirmPassword} onChange={set('confirmPassword')} required />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Country of Origin</label>
              <div className="relative">
                <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select value={form.country} onChange={set('country')} className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-dark-600 dark:bg-dark-800 dark:text-white" required>
                  <option value="">Select country</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <Input label="City" placeholder="Seattle, WA" icon={FiMapPin} value={form.city} onChange={set('city')} />

            <label className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 rounded border-gray-300 text-primary focus:ring-primary" />
              <span>I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a></span>
            </label>

            <Button type="submit" loading={loading} className="w-full" size="lg">Create Account</Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
