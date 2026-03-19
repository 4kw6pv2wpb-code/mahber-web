'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FiArrowRight, FiRepeat, FiClock } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ' },
  { code: 'ti', name: 'Tigrinya', native: 'ትግርኛ' },
  { code: 'om', name: 'Oromo', native: 'Afaan Oromoo' },
  { code: 'so', name: 'Somali', native: 'Soomaali' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
];

const MOCK_HISTORY = [
  { from: 'English', to: 'Amharic', source: 'Good morning', result: 'እንደምን አደርክ', time: '2 hours ago' },
  { from: 'Tigrinya', to: 'English', source: 'ከመይ ኣለኻ', result: 'How are you?', time: '1 day ago' },
  { from: 'English', to: 'Amharic', source: 'Thank you very much', result: 'በጣም አመሰግናለሁ', time: '2 days ago' },
];

export default function TranslationPage() {
  useAnalytics();
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('am');
  const [sourceText, setSourceText] = useState('Welcome to Mahber');
  const [resultText, setResultText] = useState('እንኳን ደህና መጡ ወደ Mahber');
  const [loading, setLoading] = useState(false);

  const swap = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setSourceText(resultText);
    setResultText(sourceText);
  };

  const translate = async () => {
    setLoading(true);
    // Simulate translation
    setTimeout(() => {
      setResultText('(Translation will appear here when connected to the AI backend)');
      setLoading(false);
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Translation Tool</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Bridge languages across the diaspora</p>
        </div>

        <Card className="mb-6 overflow-hidden" hover={false}>
          {/* Language selectors */}
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3 dark:border-dark-700 dark:bg-dark-800/50">
            <select value={fromLang} onChange={(e) => setFromLang(e.target.value)} className="rounded-lg border-0 bg-transparent py-1 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-primary dark:text-white">
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.native} ({l.name})</option>)}
            </select>
            <button onClick={swap} className="rounded-full bg-white p-2 shadow-sm hover:bg-gray-100 dark:bg-dark-700 dark:hover:bg-dark-600 transition-colors">
              <FiRepeat size={18} className="text-primary" />
            </button>
            <select value={toLang} onChange={(e) => setToLang(e.target.value)} className="rounded-lg border-0 bg-transparent py-1 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-primary dark:text-white">
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.native} ({l.name})</option>)}
            </select>
          </div>

          <div className="grid md:grid-cols-2 md:divide-x md:divide-gray-100 dark:md:divide-dark-700">
            {/* Source */}
            <div className="p-4">
              <textarea value={sourceText} onChange={(e) => setSourceText(e.target.value)} placeholder="Enter text to translate..." rows={6} className="w-full resize-none border-0 bg-transparent text-sm leading-relaxed text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 dark:text-white" />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-400">{sourceText.length} characters</span>
              </div>
            </div>

            {/* Result */}
            <div className="border-t border-gray-100 bg-gray-50/50 p-4 dark:border-dark-700 dark:bg-dark-800/30 md:border-t-0">
              <div className="min-h-[8rem] text-sm leading-relaxed text-gray-900 dark:text-white">
                {loading ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0.1s' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0.2s' }} />
                    <span className="ml-1">Translating...</span>
                  </div>
                ) : resultText}
              </div>
            </div>
          </div>

          <div className="flex justify-center border-t border-gray-100 p-3 dark:border-dark-700">
            <Button onClick={translate} loading={loading} size="lg">
              <FiArrowRight size={16} className="mr-1" /> Translate
            </Button>
          </div>
        </Card>

        {/* History */}
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Recent Translations</h2>
        <div className="space-y-3">
          {MOCK_HISTORY.map((h, i) => (
            <Card key={i} className="flex items-center justify-between p-4 cursor-pointer" onClick={() => { setSourceText(h.source); setResultText(h.result); }}>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium">{h.from}</span><FiArrowRight size={10} /><span className="font-medium">{h.to}</span>
                </div>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{h.source}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{h.result}</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-gray-400"><FiClock size={12} /> {h.time}</span>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
