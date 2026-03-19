'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useEffect } from 'react';

const PASS = 'mahber2026';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [waitlist, setWaitlist] = useState({ count: 0, entries: [] });
  const [analytics, setAnalytics] = useState({ totalViews: 0, topPages: [], dailyViews: [], recentEntries: [] });
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('waitlist');

  const login = (e) => {
    e.preventDefault();
    if (password === PASS) {
      setAuthed(true);
      fetchData();
    } else {
      alert('Wrong password');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [wRes, aRes, cRes] = await Promise.all([
        fetch(`/api/waitlist?password=${PASS}`),
        fetch(`/api/analytics?password=${PASS}`),
        fetch(`/api/contact?password=${PASS}`),
      ]);
      setWaitlist(await wRes.json());
      setAnalytics(await aRes.json());
      const cData = await cRes.json();
      setContacts(cData.contacts || []);
    } catch (e) {
      console.error('Failed to fetch admin data', e);
    }
    setLoading(false);
  };

  const exportCSV = () => {
    const rows = [['Email', 'Source', 'Timestamp', 'IP']];
    waitlist.entries.forEach((e) => rows.push([e.email, e.source, e.timestamp, e.ip]));
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mahber-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAnalyticsCSV = () => {
    const rows = [['Page', 'Timestamp', 'Referrer', 'IP']];
    analytics.recentEntries.forEach((e) => rows.push([e.page, e.timestamp, e.referrer, e.ip]));
    const csv = rows.map((r) => r.map((c) => `"${(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mahber-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <form onSubmit={login} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 mb-4 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  const maxDaily = Math.max(...(analytics.dailyViews?.map((d) => d.views) || [1]), 1);
  const maxPage = Math.max(...(analytics.topPages?.map((p) => p.views) || [1]), 1);

  // Signups per day from waitlist entries
  const signupsPerDay = {};
  (waitlist.entries || []).forEach((e) => {
    const day = e.timestamp?.split('T')[0];
    if (day) signupsPerDay[day] = (signupsPerDay[day] || 0) + 1;
  });
  const signupDays = Object.entries(signupsPerDay)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-14);
  const maxSignups = Math.max(...signupDays.map((d) => d[1]), 1);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
              H
            </div>
            <span className="font-bold text-lg">Mahber Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : '↻ Refresh'}
            </button>
            <button
              onClick={() => { setAuthed(false); setPassword(''); }}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-400"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Waitlist Signups" value={waitlist.count || 0} color="amber" />
          <StatCard label="Total Page Views" value={analytics.totalViews || 0} color="blue" />
          <StatCard label="Contacts" value={contacts.length} color="green" />
          <StatCard
            label="Today's Views"
            value={
              analytics.dailyViews?.find((d) => d.date === new Date().toISOString().split('T')[0])?.views || 0
            }
            color="purple"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['waitlist', 'analytics', 'traffic', 'contacts'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                tab === t ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Waitlist Tab */}
        {tab === 'waitlist' && (
          <div className="space-y-6">
            {/* Signups per day chart */}
            {signupDays.length > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Signups Per Day</h3>
                <div className="flex items-end gap-2 h-40">
                  {signupDays.map(([date, count]) => (
                    <div key={date} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-gray-400">{count}</span>
                      <div
                        className="w-full bg-amber-500 rounded-t-md transition-all"
                        style={{ height: `${(count / maxSignups) * 100}%`, minHeight: 4 }}
                      />
                      <span className="text-[10px] text-gray-500 rotate-[-45deg] origin-top-left mt-1 whitespace-nowrap">
                        {date.slice(5)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Email list */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">
                  Waitlist Emails ({waitlist.count || 0})
                </h3>
                <button
                  onClick={exportCSV}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
                >
                  ↓ Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-left text-gray-400">
                      <th className="pb-3 pr-4">#</th>
                      <th className="pb-3 pr-4">Email</th>
                      <th className="pb-3 pr-4">Source</th>
                      <th className="pb-3 pr-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(waitlist.entries || []).slice().reverse().map((entry, i) => (
                      <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="py-2 pr-4 text-gray-500">{waitlist.entries.length - i}</td>
                        <td className="py-2 pr-4 font-mono text-amber-400">{entry.email}</td>
                        <td className="py-2 pr-4">
                          <span className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300">
                            {entry.source}
                          </span>
                        </td>
                        <td className="py-2 pr-4 text-gray-400">
                          {new Date(entry.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                      </tr>
                    ))}
                    {(!waitlist.entries || waitlist.entries.length === 0) && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-500">
                          No signups yet. Share the link!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {tab === 'analytics' && (
          <div className="space-y-6">
            {/* Daily views chart */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Daily Page Views (Last 30 Days)</h3>
              <div className="flex items-end gap-1 h-40">
                {(analytics.dailyViews || []).map((d) => (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-400">{d.views}</span>
                    <div
                      className="w-full bg-blue-500 rounded-t-md transition-all"
                      style={{ height: `${(d.views / maxDaily) * 100}%`, minHeight: 4 }}
                    />
                    <span className="text-[10px] text-gray-500 rotate-[-45deg] origin-top-left mt-1 whitespace-nowrap">
                      {d.date.slice(5)}
                    </span>
                  </div>
                ))}
                {(!analytics.dailyViews || analytics.dailyViews.length === 0) && (
                  <div className="w-full text-center text-gray-500 py-8">No data yet</div>
                )}
              </div>
            </div>

            {/* Top pages */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Top Pages</h3>
                <button
                  onClick={exportAnalyticsCSV}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                >
                  ↓ Export CSV
                </button>
              </div>
              <div className="space-y-2">
                {(analytics.topPages || []).map((p, i) => (
                  <div key={p.page} className="flex items-center gap-3">
                    <span className="text-gray-500 w-6 text-right text-sm">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-sm">{p.page}</span>
                        <span className="text-sm text-gray-400">{p.views} views</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${(p.views / maxPage) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* Contacts Tab */}
        {tab === 'contacts' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Contact Submissions ({contacts.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-left text-gray-400">
                    <th className="pb-3 pr-4">Name</th>
                    <th className="pb-3 pr-4">Email</th>
                    <th className="pb-3 pr-4">Message</th>
                    <th className="pb-3 pr-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.slice().reverse().map((c, i) => (
                    <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="py-2 pr-4 font-medium">{c.name}</td>
                      <td className="py-2 pr-4 text-amber-400 font-mono text-xs">{c.email}</td>
                      <td className="py-2 pr-4 text-gray-400 max-w-[300px] truncate">{c.message}</td>
                      <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">
                        {new Date(c.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr><td colSpan={4} className="py-8 text-center text-gray-500">No contact submissions yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Traffic Tab */}
        {tab === 'traffic' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Recent Page Views</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-left text-gray-400">
                    <th className="pb-3 pr-4">Page</th>
                    <th className="pb-3 pr-4">Referrer</th>
                    <th className="pb-3 pr-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {(analytics.recentEntries || []).map((entry, i) => (
                    <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="py-2 pr-4 font-mono text-blue-400">{entry.page}</td>
                      <td className="py-2 pr-4 text-gray-400 truncate max-w-[200px]">
                        {entry.referrer || '—'}
                      </td>
                      <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">
                        {new Date(entry.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = {
    amber: 'border-amber-500/30 bg-amber-500/5',
    blue: 'border-blue-500/30 bg-blue-500/5',
    green: 'border-green-500/30 bg-green-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
  };
  const textColors = {
    amber: 'text-amber-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
  };

  return (
    <div className={`rounded-2xl border p-5 ${colors[color]}`}>
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className={`text-3xl font-bold ${textColors[color]}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
  );
}
