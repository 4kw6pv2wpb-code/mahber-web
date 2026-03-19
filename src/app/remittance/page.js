'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useMemo } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import {
  FiDollarSign,
  FiArrowRight,
  FiArrowDown,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiRepeat,
  FiInfo,
  FiPlus,
  FiGlobe,
  FiTrendingUp,
  FiShield,
} from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

const SEND_COUNTRIES = [
  { code: 'US', name: 'United States', currency: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', currency: 'EUR', symbol: '€', flag: '🇩🇪' },
  { code: 'SE', name: 'Sweden', currency: 'SEK', symbol: 'kr', flag: '🇸🇪' },
  { code: 'CA', name: 'Canada', currency: 'CAD', symbol: 'CA$', flag: '🇨🇦' },
];

const RECEIVE_COUNTRIES = [
  { code: 'ET', name: 'Ethiopia', currency: 'ETB', symbol: 'Br', flag: '🇪🇹', rate: 56.85 },
  { code: 'ER', name: 'Eritrea', currency: 'ERN', symbol: 'Nfk', flag: '🇪🇷', rate: 15.0 },
  { code: 'SO', name: 'Somalia', currency: 'SOS', symbol: 'Sh', flag: '🇸🇴', rate: 571.0 },
  { code: 'DJ', name: 'Djibouti', currency: 'DJF', symbol: 'Fdj', flag: '🇩🇯', rate: 177.72 },
  { code: 'KE', name: 'Kenya', currency: 'KES', symbol: 'KSh', flag: '🇰🇪', rate: 129.5 },
];

const FEE_RATE = 0.01;

const TRANSFER_HISTORY = [
  {
    id: 'TXN-2026-0847',
    recipient: 'Almaz Tesfaye',
    country: 'Ethiopia',
    flag: '🇪🇹',
    amount: 500,
    received: '28,425 ETB',
    date: 'Mar 10, 2026',
    status: 'completed',
  },
  {
    id: 'TXN-2026-0831',
    recipient: 'Berhane Kidane',
    country: 'Eritrea',
    flag: '🇪🇷',
    amount: 300,
    received: '4,500 ERN',
    date: 'Mar 5, 2026',
    status: 'completed',
  },
  {
    id: 'TXN-2026-0819',
    recipient: 'Almaz Tesfaye',
    country: 'Ethiopia',
    flag: '🇪🇹',
    amount: 200,
    received: '11,370 ETB',
    date: 'Feb 28, 2026',
    status: 'completed',
  },
  {
    id: 'TXN-2026-0812',
    recipient: 'Fatima Hassan',
    country: 'Somalia',
    flag: '🇸🇴',
    amount: 150,
    received: '85,650 SOS',
    date: 'Feb 20, 2026',
    status: 'pending',
  },
  {
    id: 'TXN-2026-0798',
    recipient: 'Berhane Kidane',
    country: 'Eritrea',
    flag: '🇪🇷',
    amount: 400,
    received: '6,000 ERN',
    date: 'Feb 15, 2026',
    status: 'failed',
  },
];

const SAVED_RECIPIENTS = [
  { name: 'Almaz Tesfaye', country: 'Ethiopia', flag: '🇪🇹', bank: 'Commercial Bank of Ethiopia' },
  { name: 'Berhane Kidane', country: 'Eritrea', flag: '🇪🇷', bank: 'Himbol Bank' },
  { name: 'Fatima Hassan', country: 'Somalia', flag: '🇸🇴', bank: 'Dahabshiil' },
];

function StatusBadge({ status }) {
  const config = {
    completed: { variant: 'green', icon: FiCheckCircle, label: 'Completed' },
    pending: { variant: 'primary', icon: FiClock, label: 'Pending' },
    failed: { variant: 'red', icon: FiXCircle, label: 'Failed' },
  };
  const c = config[status] || config.pending;
  return (
    <Badge variant={c.variant}>
      <c.icon size={10} className="mr-1" />
      {c.label}
    </Badge>
  );
}

export default function RemittancePage() {
  useAnalytics();
  const [sendFrom, setSendFrom] = useState(SEND_COUNTRIES[0]);
  const [receiveTo, setReceiveTo] = useState(RECEIVE_COUNTRIES[0]);
  const [amount, setAmount] = useState('500');
  const [tab, setTab] = useState('send');

  const parsedAmount = parseFloat(amount) || 0;
  const fee = useMemo(() => parsedAmount * FEE_RATE, [parsedAmount]);
  const totalCharged = useMemo(() => parsedAmount + fee, [parsedAmount, fee]);
  const receivedAmount = useMemo(
    () => parsedAmount * receiveTo.rate,
    [parsedAmount, receiveTo],
  );

  const handleSendFromChange = (code) => {
    setSendFrom(SEND_COUNTRIES.find((c) => c.code === code) || SEND_COUNTRIES[0]);
  };

  const handleReceiveToChange = (code) => {
    setReceiveTo(RECEIVE_COUNTRIES.find((c) => c.code === code) || RECEIVE_COUNTRIES[0]);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Send Money Home
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fast, affordable transfers to East Africa — 1% flat fee, no hidden charges
          </p>
        </div>

        {/* Trust badges */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-habesha-green/10 px-3 py-1.5 text-xs font-medium text-habesha-green">
            <FiShield size={12} /> Bank-level security
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <FiTrendingUp size={12} /> Best exchange rates
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-eritrean-blue/10 px-3 py-1.5 text-xs font-medium text-eritrean-blue">
            <FiClock size={12} /> Arrives in minutes
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
            <FiGlobe size={12} /> 5+ countries
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setTab('send')}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab === 'send'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-300'
            }`}
          >
            Send Money
          </button>
          <button
            onClick={() => setTab('history')}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab === 'history'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-300'
            }`}
          >
            Transfer History
          </button>
          <button
            onClick={() => setTab('recipients')}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab === 'recipients'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-300'
            }`}
          >
            Recipients
          </button>
        </div>

        {tab === 'send' && (
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Calculator — left */}
            <div className="lg:col-span-3 space-y-4">
              {/* You Send */}
              <Card className="p-5" hover={false}>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  You send
                </label>
                <div className="flex gap-3">
                  <select
                    value={sendFrom.code}
                    onChange={(e) => handleSendFromChange(e.target.value)}
                    className="w-36 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm font-medium focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-dark-600 dark:bg-dark-700 dark:text-white"
                  >
                    {SEND_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.currency}
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-400">
                      {sendFrom.symbol}
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="1"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-right text-2xl font-bold text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-dark-600 dark:bg-dark-800 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </Card>

              {/* Fee + Exchange breakdown */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200 dark:bg-dark-700" />
                <div className="relative z-10 flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs dark:border-dark-700 dark:bg-dark-800">
                  <span className="text-gray-500 dark:text-gray-400">
                    Fee: {sendFrom.symbol}
                    {fee.toFixed(2)} (1%)
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <span className="font-semibold text-primary">
                    1 {sendFrom.currency} = {receiveTo.rate.toLocaleString()} {receiveTo.currency}
                  </span>
                  <FiArrowDown size={14} className="text-primary" />
                </div>
              </div>

              {/* They Receive */}
              <Card className="p-5" hover={false}>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  They receive
                </label>
                <div className="flex gap-3">
                  <select
                    value={receiveTo.code}
                    onChange={(e) => handleReceiveToChange(e.target.value)}
                    className="w-36 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm font-medium focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-dark-600 dark:bg-dark-700 dark:text-white"
                  >
                    {RECEIVE_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.currency}
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-400">
                      {receiveTo.symbol}
                    </span>
                    <div className="flex h-[54px] items-center rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-right text-2xl font-bold text-habesha-green dark:border-dark-600 dark:bg-dark-700">
                      {receivedAmount.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Summary + Send */}
              <Card className="overflow-hidden" hover={false}>
                <div className="space-y-2 bg-gray-50 p-4 dark:bg-dark-800/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">You send</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {sendFrom.symbol}
                      {parsedAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Transfer fee (1%)
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {sendFrom.symbol}
                      {fee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Exchange rate</span>
                    <span className="font-medium text-primary">
                      1 {sendFrom.currency} = {receiveTo.rate} {receiveTo.currency}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 dark:border-dark-600">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Total charged
                      </span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {sendFrom.symbol}
                        {totalCharged.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Recipient gets
                      </span>
                      <span className="text-lg font-bold text-habesha-green">
                        {receiveTo.symbol}{' '}
                        {receivedAmount.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <Button className="w-full" size="lg">
                    <FiArrowRight size={18} className="mr-2" /> Send{' '}
                    {sendFrom.symbol}
                    {parsedAmount.toFixed(2)} to {receiveTo.name}
                  </Button>
                  <p className="mt-2 flex items-center justify-center gap-1 text-xs text-gray-400">
                    <FiInfo size={12} /> Estimated delivery: 15–30 minutes
                  </p>
                </div>
              </Card>
            </div>

            {/* Saved Recipients — right */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-5" hover={false}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Saved Recipients
                  </h3>
                  <button className="rounded-lg bg-primary/10 p-1.5 text-primary hover:bg-primary/20">
                    <FiPlus size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  {SAVED_RECIPIENTS.map((r) => (
                    <button
                      key={r.name}
                      className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-gray-50 dark:hover:bg-dark-700"
                    >
                      <Avatar name={r.name} size="md" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {r.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {r.flag} {r.country} · {r.bank}
                        </p>
                      </div>
                      <FiArrowRight size={16} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-5" hover={false}>
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                  Exchange Rates
                </h3>
                <div className="space-y-2">
                  {RECEIVE_COUNTRIES.map((c) => (
                    <div
                      key={c.code}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600 dark:text-gray-400">
                        {c.flag} {c.currency}
                      </span>
                      <span className="font-mono font-semibold text-gray-900 dark:text-white">
                        {c.rate.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 flex items-center gap-1 text-[10px] text-gray-400">
                  <FiRepeat size={10} /> Rates update every 30 minutes
                </p>
              </Card>

              <Card className="p-5" hover={false}>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  Quick Send
                </h3>
                <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                  Popular amounts
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[50, 100, 200, 300, 500, 1000].map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(String(a))}
                      className={`rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                        parseInt(amount) === a
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary dark:border-dark-600 dark:text-gray-300'
                      }`}
                    >
                      ${a}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {tab === 'history' && (
          <Card className="overflow-hidden" hover={false}>
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-3 dark:border-dark-700 dark:bg-dark-800/50">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Recent Transfers
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-dark-700">
              {TRANSFER_HISTORY.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-dark-800/50"
                >
                  <Avatar name={txn.recipient} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {txn.recipient}
                      </p>
                      <span className="text-xs text-gray-400">
                        {txn.flag} {txn.country}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {txn.id} · {txn.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      ${txn.amount}
                    </p>
                    <p className="text-xs text-gray-500">{txn.received}</p>
                  </div>
                  <StatusBadge status={txn.status} />
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === 'recipients' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Your Recipients
              </h3>
              <Button size="sm">
                <FiPlus size={14} className="mr-1" /> Add Recipient
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SAVED_RECIPIENTS.map((r) => (
                <Card key={r.name} className="p-5">
                  <div className="flex items-center gap-3">
                    <Avatar name={r.name} size="lg" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {r.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {r.flag} {r.country}
                      </p>
                      <p className="text-xs text-gray-400">{r.bank}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="flex-1">
                      Send Money
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
