'use client';

import { useState } from 'react';
import { FiBriefcase, FiMessageCircle, FiCalendar, FiUsers, FiBell, FiHeart, FiDollarSign, FiCheck } from 'react-icons/fi';
import AppLayout from '@/components/layout/AppLayout';
import { useAnalytics } from '@/lib/useAnalytics';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'job', icon: FiBriefcase, color: 'text-amber-400 bg-amber-500/10', title: 'New job match: CNA - Certified Nursing Assistant', body: 'Habesha Home Health in Seattle posted a job matching your profile.', time: '10 min ago', read: false },
  { id: 2, type: 'message', icon: FiMessageCircle, color: 'text-blue-400 bg-blue-500/10', title: 'New message from Meron T.', body: '"Hey! Are you still looking for a roommate? I have a room available in..."', time: '30 min ago', read: false },
  { id: 3, type: 'event', icon: FiCalendar, color: 'text-green-400 bg-green-500/10', title: 'Event Reminder: Habesha Professional Networking Night', body: 'Starts tomorrow at 7:00 PM at The Loft, Washington DC', time: '1h ago', read: false },
  { id: 4, type: 'community', icon: FiUsers, color: 'text-purple-400 bg-purple-500/10', title: 'Yonas M. replied to your post', body: '"Great idea! I would be interested in the developer meetup. Count me in..."', time: '2h ago', read: false },
  { id: 5, type: 'dating', icon: FiHeart, color: 'text-pink-400 bg-pink-500/10', title: 'New match on HabeshaMatch!', body: 'You and Sara have matched. Send a message to start the conversation.', time: '3h ago', read: true },
  { id: 6, type: 'waitlist', icon: FiBell, color: 'text-amber-400 bg-amber-500/10', title: 'HabeshaHub Launch Update', body: 'We are launching April 1st! You are #47 on the waitlist. Share with friends to move up.', time: '5h ago', read: true },
  { id: 7, type: 'money', icon: FiDollarSign, color: 'text-green-400 bg-green-500/10', title: 'Remittance sent successfully', body: 'Your transfer of $300 to Addis Ababa has been completed. Recipient: Abeba T.', time: '1d ago', read: true },
  { id: 8, type: 'community', icon: FiUsers, color: 'text-purple-400 bg-purple-500/10', title: '15 upvotes on your post', body: '"Best Ethiopian restaurant in Seattle?" is gaining traction in the community.', time: '1d ago', read: true },
  { id: 9, type: 'job', icon: FiBriefcase, color: 'text-amber-400 bg-amber-500/10', title: 'Your job application was viewed', body: 'Habesha Tech Solutions viewed your application for IT Support Specialist.', time: '2d ago', read: true },
  { id: 10, type: 'event', icon: FiCalendar, color: 'text-green-400 bg-green-500/10', title: 'Ethiopian Coffee Ceremony this weekend', body: 'Buna Cafe, Atlanta — Saturday at 5:00 PM. You RSVP\'d!', time: '3d ago', read: true },
];

export default function NotificationsPage() {
  useAnalytics();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  const unread = notifications.filter((n) => !n.read).length;
  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter((n) => !n.read) : notifications.filter((n) => n.type === filter);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            {unread > 0 && <p className="text-amber-400 text-sm">{unread} unread</p>}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
              <FiCheck size={14} /> Mark all read
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {['all', 'unread', 'job', 'message', 'event', 'community', 'dating', 'money'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap capitalize transition-colors ${
                filter === f ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notification list */}
        <div className="space-y-2">
          {filtered.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markRead(notif.id)}
              className={`flex gap-3 p-4 rounded-xl cursor-pointer transition-colors ${
                notif.read ? 'bg-gray-900/50 hover:bg-gray-900' : 'bg-gray-900 border border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.color}`}>
                <notif.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm font-medium ${notif.read ? 'text-gray-400' : 'text-white'}`}>
                    {notif.title}
                  </h3>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1.5" />}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{notif.body}</p>
                <span className="text-xs text-gray-600 mt-1 block">{notif.time}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">No notifications</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
