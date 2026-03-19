'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


const sizeMap = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base', xl: 'h-16 w-16 text-lg' };
const iconSizeMap = { sm: 14, md: 18, lg: 22, xl: 30 };
const colors = ['bg-primary', 'bg-accent', 'bg-habesha-green', 'bg-eritrean-blue', 'bg-habesha-red'];

function UserSilhouette({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

export function Avatar({ name = '', src, size = 'md', online = false, className = '' }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const colorIdx = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  const hasInitials = initials && initials !== 'U' && name !== 'User';

  return (
    <div className={`relative inline-flex shrink-0 items-center justify-center rounded-full ${sizeMap[size]} ${className}`}>
      {src ? (
        <img src={src} alt={name} className={`rounded-full object-cover ${sizeMap[size]}`} />
      ) : hasInitials ? (
        <div className={`flex items-center justify-center rounded-full ${sizeMap[size]} ${colors[colorIdx]} font-semibold text-white`}>{initials}</div>
      ) : (
        <div className={`flex items-center justify-center rounded-full ${sizeMap[size]} bg-gradient-to-br from-gray-400 to-gray-500`}>
          <UserSilhouette size={iconSizeMap[size]} />
        </div>
      )}
      {online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-dark-800" />}
    </div>
  );
}
