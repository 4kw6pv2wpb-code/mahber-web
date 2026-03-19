'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState } from 'react';
import { FiGlobe, FiBell, FiShield, FiMoon, FiTrash2, FiSave } from 'react-icons/fi';
import AppLayout from '@/components/layout/AppLayout';
import { useAnalytics } from '@/lib/useAnalytics';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'Amharic (አማርኛ)' },
  { code: 'ti', label: 'Tigrinya (ትግርኛ)' },
  { code: 'so', label: 'Somali (Soomaali)' },
];

export default function SettingsPage() {
  useAnalytics();
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    messages: true,
    events: true,
    community: false,
    marketing: false,
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showOnline: true,
    showLocation: false,
    allowMessages: true,
  });
  const [saved, setSaved] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toggleNotif = (key) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  const togglePrivacy = (key) => setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

        {/* Language */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FiGlobe className="text-amber-400" /> Language</h2>
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-3 rounded-xl text-sm font-medium transition-colors text-left ${
                  language === lang.code ? 'bg-amber-500 text-black' : 'bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </section>

        {/* Theme */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FiMoon className="text-amber-400" /> Theme</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'dark', label: 'Dark', desc: 'Easy on the eyes' },
              { key: 'light', label: 'Light', desc: 'Classic bright' },
              { key: 'system', label: 'System', desc: 'Match device' },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTheme(t.key)}
                className={`p-3 rounded-xl text-sm transition-colors text-left ${
                  theme === t.key ? 'bg-amber-500 text-black' : 'bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800'
                }`}
              >
                <div className="font-medium">{t.label}</div>
                <div className={`text-xs ${theme === t.key ? 'text-black/60' : 'text-gray-500'}`}>{t.desc}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FiBell className="text-amber-400" /> Notifications</h2>
          <div className="space-y-3">
            {[
              { key: 'jobAlerts', label: 'Job Alerts', desc: 'New job matches for your profile' },
              { key: 'messages', label: 'Messages', desc: 'New direct messages' },
              { key: 'events', label: 'Event Reminders', desc: 'Upcoming events you RSVP\'d to' },
              { key: 'community', label: 'Community Replies', desc: 'Replies to your posts and comments' },
              { key: 'marketing', label: 'Updates & News', desc: 'Mahber product updates' },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div>
                  <div className="text-sm font-medium text-white">{n.label}</div>
                  <div className="text-xs text-gray-500">{n.desc}</div>
                </div>
                <button
                  onClick={() => toggleNotif(n.key)}
                  className={`w-12 h-7 rounded-full transition-colors relative ${notifications[n.key] ? 'bg-amber-500' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${notifications[n.key] ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FiShield className="text-amber-400" /> Privacy</h2>
          <div className="space-y-3">
            {[
              { key: 'profileVisible', label: 'Public Profile', desc: 'Allow others to view your profile' },
              { key: 'showOnline', label: 'Show Online Status', desc: 'Let others see when you are active' },
              { key: 'showLocation', label: 'Show Location', desc: 'Display your city on your profile' },
              { key: 'allowMessages', label: 'Allow Messages', desc: 'Receive messages from non-connections' },
            ].map((p) => (
              <div key={p.key} className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div>
                  <div className="text-sm font-medium text-white">{p.label}</div>
                  <div className="text-xs text-gray-500">{p.desc}</div>
                </div>
                <button
                  onClick={() => togglePrivacy(p.key)}
                  className={`w-12 h-7 rounded-full transition-colors relative ${privacy[p.key] ? 'bg-amber-500' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${privacy[p.key] ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Save */}
        <button
          onClick={save}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mb-8"
        >
          <FiSave /> {saved ? 'Saved!' : 'Save Settings'}
        </button>

        {/* Danger zone */}
        <section className="border border-red-500/20 rounded-xl p-6">
          <h2 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2"><FiTrash2 /> Danger Zone</h2>
          <p className="text-sm text-gray-400 mb-4">Once you delete your account, there is no going back. All your data will be permanently removed.</p>
          {!showDelete ? (
            <button onClick={() => setShowDelete(true)} className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors">
              Delete Account
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-400 font-medium">Are you sure? This cannot be undone.</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors">
                  Yes, Delete My Account
                </button>
                <button onClick={() => setShowDelete(false)} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}
