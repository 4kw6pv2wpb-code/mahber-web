'use client';

import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { FiUser, FiShield, FiBell, FiSun, FiGlobe } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

const SECTIONS = [
  { id: 'account', label: 'Account', icon: FiUser },
  { id: 'privacy', label: 'Privacy', icon: FiShield },
  { id: 'notifications', label: 'Notifications', icon: FiBell },
  { id: 'appearance', label: 'Appearance', icon: FiSun },
  { id: 'language', label: 'Language', icon: FiGlobe },
];

function Toggle({ label, defaultChecked = false }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <button onClick={() => setOn(!on)} className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-primary' : 'bg-gray-300 dark:bg-dark-600'}`}>
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  useAnalytics();
  const [section, setSection] = useState('account');
  const [theme, setTheme] = useState('system');
  const [accentColor, setAccentColor] = useState('#D4A017');

  const ACCENT_COLORS = ['#D4A017', '#FF3366', '#078930', '#4189DD', '#DA121A', '#8B5CF6'];

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <div className="flex gap-2 overflow-x-auto lg:w-56 lg:flex-col lg:shrink-0">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setSection(s.id)} className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${section === s.id ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-800'}`}>
                <s.icon size={18} /> {s.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1">
            {section === 'account' && (
              <Card className="p-6" hover={false}>
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Account Settings</h2>
                <div className="space-y-4">
                  <Input label="Full Name" defaultValue="Eyob Tesfayohanes" />
                  <Input label="Email" type="email" defaultValue="eyob@habeshahub.com" />
                  <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
                  <div className="border-t border-gray-100 pt-4 dark:border-dark-700">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Change Password</h3>
                    <div className="space-y-3">
                      <Input label="Current Password" type="password" placeholder="••••••••" />
                      <Input label="New Password" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </div>
              </Card>
            )}

            {section === 'privacy' && (
              <Card className="p-6" hover={false}>
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Privacy Settings</h2>
                <div className="space-y-1">
                  <Toggle label="Public profile" defaultChecked />
                  <Toggle label="Show online status" defaultChecked />
                  <Toggle label="Allow messages from non-connections" defaultChecked />
                  <Toggle label="Show my location" />
                  <Toggle label="Show on dating (HabeshaMatch)" />
                </div>
                <div className="mt-6 border-t border-gray-100 pt-4 dark:border-dark-700">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Blocked Users</h3>
                  <p className="text-sm text-gray-500">You haven&apos;t blocked anyone yet.</p>
                </div>
              </Card>
            )}

            {section === 'notifications' && (
              <Card className="p-6" hover={false}>
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>
                <div className="space-y-1">
                  <Toggle label="Push notifications" defaultChecked />
                  <Toggle label="Email notifications" defaultChecked />
                  <Toggle label="New message alerts" defaultChecked />
                  <Toggle label="Job recommendations" defaultChecked />
                  <Toggle label="Event reminders" defaultChecked />
                  <Toggle label="Community activity" />
                  <Toggle label="Dating matches" defaultChecked />
                  <Toggle label="Housing alerts" />
                </div>
              </Card>
            )}

            {section === 'appearance' && (
              <Card className="p-6" hover={false}>
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Theme</h3>
                  <div className="flex gap-3">
                    {['light', 'dark', 'system'].map(t => (
                      <button key={t} onClick={() => setTheme(t)} className={`rounded-xl border-2 px-6 py-3 text-sm font-medium capitalize transition-all ${theme === t ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-dark-600 dark:text-gray-400'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Accent Color</h3>
                  <div className="flex gap-3">
                    {ACCENT_COLORS.map(c => (
                      <button key={c} onClick={() => setAccentColor(c)} className={`h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 ${accentColor === c ? 'border-gray-900 scale-110 dark:border-white' : 'border-transparent'}`} style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {section === 'language' && (
              <Card className="p-6" hover={false}>
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Language Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">App Language</label>
                    <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-dark-600 dark:bg-dark-800 dark:text-white">
                      <option>English</option><option>አማርኛ (Amharic)</option><option>ትግርኛ (Tigrinya)</option><option>Afaan Oromoo</option><option>Soomaali</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Content Language</label>
                    <p className="mb-2 text-xs text-gray-500">Select languages you want to see content in</p>
                    <div className="space-y-1">
                      <Toggle label="English" defaultChecked />
                      <Toggle label="አማርኛ (Amharic)" defaultChecked />
                      <Toggle label="ትግርኛ (Tigrinya)" defaultChecked />
                      <Toggle label="Afaan Oromoo" />
                      <Toggle label="Soomaali" />
                    </div>
                  </div>
                  <Button>Save Preferences</Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
