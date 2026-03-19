'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


export function Input({ label, error, icon: Icon, className = '', ...rest }) {
  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />}
        <input className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 dark:bg-dark-800 dark:text-white ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary focus:ring-primary dark:border-dark-600'}`} {...rest} />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
