'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { FiSend, FiFileText, FiShield, FiUsers, FiGlobe, FiBook, FiStar, FiMapPin } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

const EXAMPLE_QS = ['How to apply for asylum?', 'Green card timeline', 'Work permit process', 'Family sponsorship', 'DACA updates', 'Citizenship requirements'];

const RESOURCES = [
  { icon: FiFileText, title: 'Visa Types', description: 'H-1B, F-1, B-1/B-2, and more — understand your options', color: 'text-primary' },
  { icon: FiShield, title: 'Green Card', description: 'Permanent residency through family, employment, or diversity lottery', color: 'text-habesha-green' },
  { icon: FiGlobe, title: 'Citizenship', description: 'Naturalization process, requirements, and study materials', color: 'text-eritrean-blue' },
  { icon: FiUsers, title: 'Asylum', description: 'Seeking protection — process, timelines, and legal rights', color: 'text-habesha-red' },
  { icon: FiBook, title: 'Work Permits', description: 'EAD applications, renewals, and employment authorization', color: 'text-accent' },
  { icon: FiFileText, title: 'Legal Aid', description: 'Free and low-cost immigration lawyers serving our community', color: 'text-primary' },
];

const LAWYERS = [
  { name: 'Attorney Mekonnen Tadesse', specialty: 'Asylum & Refugee Law', rating: 4.9, location: 'Washington, DC', reviews: 47 },
  { name: 'Counselor Rahel Gebremedhin', specialty: 'Family Immigration', rating: 4.8, location: 'Los Angeles, CA', reviews: 32 },
  { name: 'Attorney Samuel Berhe', specialty: 'Employment Visas', rating: 4.7, location: 'Seattle, WA', reviews: 28 },
];

const INITIAL_MESSAGES = [
  { role: 'user', text: 'What documents do I need for a green card application?' },
  { role: 'ai', text: 'For a family-based green card application, you typically need:\n\n• Form I-130 (Petition for Alien Relative)\n• Form I-485 (Adjustment of Status)\n• Valid passport and birth certificate\n• Marriage certificate (if spouse-sponsored)\n• Two passport-style photos\n• Proof of financial support (Form I-864)\n• Medical exam results (Form I-693)\n• Evidence of relationship to petitioner\n\nTimelines vary, but family-sponsored cases currently take 12–24 months. Would you like help finding an immigration lawyer in your area?' },
];

export default function ImmigrationPage() {
  useAnalytics();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }, { role: 'ai', text: 'Thank you for your question. Our AI immigration assistant is processing your query. In the meantime, you can explore the resource cards below or connect with one of our recommended immigration attorneys for personalized guidance.' }]);
    setInput('');
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Immigration Resources</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Navigate your journey with community support</p>
        </div>

        {/* AI Chat */}
        <Card className="mb-6 overflow-hidden" hover={false}>
          <div className="border-b border-gray-100 bg-gradient-to-r from-primary/5 to-eritrean-blue/5 p-4 dark:border-dark-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">🤖 Immigration AI Assistant</h2>
            <p className="text-xs text-gray-500">Ask questions about visas, green cards, citizenship, and more</p>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 dark:bg-dark-700 dark:text-gray-200'}`}>
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 p-3 dark:border-dark-700">
            <div className="mb-2 flex flex-wrap gap-2">
              {EXAMPLE_QS.map(q => (
                <button key={q} onClick={() => setInput(q)} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-primary/10 hover:text-primary dark:bg-dark-700 dark:text-gray-400">{q}</button>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Ask about immigration..." className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-dark-600 dark:bg-dark-800 dark:text-white" />
              <Button onClick={sendMessage}><FiSend size={16} /></Button>
            </div>
          </div>
        </Card>

        {/* Resources */}
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Resources</h2>
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map(r => (
            <Card key={r.title} className="p-5 border-l-4 border-l-primary">
              <r.icon size={24} className={r.color} />
              <h3 className="mt-2 font-semibold text-gray-900 dark:text-white">{r.title}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{r.description}</p>
              <button className="mt-3 text-sm font-medium text-primary hover:underline">Learn More →</button>
            </Card>
          ))}
        </div>

        {/* Lawyers */}
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Immigration Attorneys</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LAWYERS.map(l => (
            <Card key={l.name} className="p-5">
              <div className="flex items-center gap-3">
                <Avatar name={l.name} size="lg" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{l.name}</h3>
                  <p className="text-xs text-gray-500">{l.specialty}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><FiStar size={14} className="text-primary fill-primary" /> {l.rating} ({l.reviews})</span>
                <span className="flex items-center gap-1"><FiMapPin size={14} /> {l.location}</span>
              </div>
              <Button variant="secondary" className="mt-3 w-full" size="sm">Contact</Button>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
