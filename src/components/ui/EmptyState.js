'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { Button } from './Button';

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-dark-800"><Icon size={32} className="text-gray-400" /></div>}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      {actionLabel && onAction && <Button onClick={onAction} className="mt-4">{actionLabel}</Button>}
    </div>
  );
}
