'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSave, FiUser, FiCamera } from 'react-icons/fi';
import AppLayout from '@/components/layout/AppLayout';
import { useAnalytics } from '@/lib/useAnalytics';

const LANGUAGES = ['English', 'Amharic', 'Tigrinya', 'Somali', 'Oromo', 'Afar'];

export default function EditProfilePage() {
  useAnalytics();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', bio: '', city: '', languages: [], avatar: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/auth')
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setForm({
            name: data.user.name || '',
            bio: data.user.bio || '',
            city: data.user.city || '',
            languages: data.user.languages || ['English'],
            avatar: data.user.avatar || '',
          });
        }
      })
      .catch(() => {});
  }, []);

  const toggleLang = (lang) => {
    setForm((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.user) {
        setMessage('Profile updated!');
        setTimeout(() => router.push('/profile'), 1500);
      } else {
        setMessage(data.error || 'Error saving');
      }
    } catch {
      setMessage('Error saving profile');
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/profile" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm">
          <FiArrowLeft /> Back to Profile
        </Link>
        <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>

        <form onSubmit={save} className="space-y-6">
          {/* Avatar placeholder */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
              <FiUser className="text-gray-500" size={32} />
            </div>
            <button type="button" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 flex items-center gap-2">
              <FiCamera size={14} /> Upload Photo
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 resize-none"
              placeholder="Tell the community about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
            <input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
              placeholder="Seattle, WA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Languages</label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLang(lang)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    form.languages.includes(lang)
                      ? 'bg-amber-500 text-black'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {message && (
            <div className={`text-sm text-center py-2 rounded-lg ${message.includes('Error') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FiSave /> {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
