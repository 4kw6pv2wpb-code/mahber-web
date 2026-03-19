'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { FiMapPin, FiUser, FiBriefcase, FiBook } from 'react-icons/fi';

export function ProfileCard({ profile }) {
  const name = profile.user?.name || profile.name || 'Unknown';
  const city = profile.user?.city || profile.city || '';
  const photoUrl = profile.photoUrls?.[0] || null;
  const age = profile.age || '';
  const headline = profile.headline || '';
  const aboutMe = profile.aboutMe || '';
  const interests = profile.interests || [];
  const occupation = profile.occupation || '';
  const education = profile.education || '';
  const goal = profile.goal || '';

  const goalLabel = {
    SERIOUS: 'Looking for something serious',
    CASUAL: 'Keeping it casual',
    FRIENDSHIP: 'Looking for friends',
    NETWORKING: 'Networking',
  }[goal] || '';

  return (
    <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-dark-700 dark:bg-dark-800">
      {/* Photo area */}
      <div className="relative h-96">
        {photoUrl ? (
          <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-end bg-gradient-to-b from-primary/20 via-primary/10 to-primary/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <FiUser size={80} className="text-primary/20" />
            </div>
          </div>
        )}

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Info overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-4">
          <h2 className="mb-0.5 text-2xl font-bold text-white">
            {name}{age ? `, ${age}` : ''}
          </h2>
          {headline && (
            <p className="mb-1 text-sm text-white/80">{headline}</p>
          )}
          {city && (
            <div className="flex items-center gap-1 text-xs text-white/70">
              <FiMapPin size={12} />
              <span>{city}</span>
            </div>
          )}
        </div>
      </div>

      {/* Details section */}
      <div className="p-4">
        {goalLabel && (
          <div className="mb-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {goalLabel}
            </span>
          </div>
        )}

        {aboutMe && (
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{aboutMe}</p>
        )}

        {(occupation || education) && (
          <div className="mb-3 space-y-1">
            {occupation && (
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <FiBriefcase size={12} />
                <span>{occupation}</span>
              </div>
            )}
            {education && (
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <FiBook size={12} />
                <span>{education}</span>
              </div>
            )}
          </div>
        )}

        {interests.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 dark:bg-dark-700 dark:text-gray-400"
              >
                {interest}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
