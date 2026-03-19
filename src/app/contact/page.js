'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiMapPin, FiSend, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';
import Footer from '@/components/Footer';

export default function ContactPage() {
  useAnalytics();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex h-1">
        <div className="flex-1 bg-green-600" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-red-600" />
      </div>
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-sm">
          <FiArrowLeft /> Back to Mahber
        </Link>
        <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
        <p className="text-gray-400 mb-10">Have a question, partnership idea, or feedback? We would love to hear from you.</p>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="flex items-start gap-3">
            <FiMail className="text-amber-400 mt-1" />
            <div>
              <div className="font-semibold">Email</div>
              <div className="text-gray-400 text-sm">hello@mahber.com</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FiMapPin className="text-amber-400 mt-1" />
            <div>
              <div className="font-semibold">Location</div>
              <div className="text-gray-400 text-sm">Seattle, Washington</div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 resize-none"
              placeholder="Tell us what's on your mind..."
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : status === 'success' ? <><FiCheck /> Sent!</> : <><FiSend /> Send Message</>}
          </button>
          {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
        </form>
      </div>
          <Footer />
    </div>
  );
}
