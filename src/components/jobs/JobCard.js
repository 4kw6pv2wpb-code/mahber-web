'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { FiMapPin, FiClock, FiBookmark } from 'react-icons/fi';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { timeAgo, nameColor } from '@/lib/utils';

function formatSalary(amount) {
  if (!amount || amount === 0) return '';
  if (amount >= 1000) return `$${Math.floor(amount / 1000)}k`;
  return `$${amount}/hr`;
}

export function JobCard({ job }) {
  const typeMap = { FULL_TIME: 'Full-time', PART_TIME: 'Part-time', CONTRACT: 'Contract', INTERNSHIP: 'Internship' };
  const typeDisplay = typeMap[job.jobType] || job.jobType || job.type || 'Other';
  const typeColors = {
    'Full-time': 'green',
    'Part-time': 'blue',
    'Remote': 'primary',
    'Contract': 'accent',
    'Internship': 'gray',
  };
  const company = job.company || job.poster?.name || 'Company';
  const location = job.location || [job.city, job.country].filter(Boolean).join(', ') || 'Remote';
  const salary = job.salary || (job.payMin && job.payMax ? `${formatSalary(job.payMin)} - ${formatSalary(job.payMax)}` : job.payMin ? `${formatSalary(job.payMin)}+` : '');
  const posted = job.posted || timeAgo(job.createdAt);
  const companyColor = nameColor(company);

  return (
    <Link href={`/jobs/${job.id}`} className="block rounded-xl border border-gray-200 bg-white p-5 card-hover dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {/* Colored company initial circle */}
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${companyColor} text-lg font-bold text-white shadow-sm`}>
            {company[0]?.toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{company}</p>
          </div>
        </div>
        <button onClick={(e) => { e.preventDefault(); }} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition-colors">
          <FiBookmark size={18} />
        </button>
      </div>

      {/* Badges */}
      <div className="mt-3 flex flex-wrap gap-2">
        <Badge variant={typeColors[typeDisplay] || 'gray'}>{typeDisplay}</Badge>
        {job.isRemote && <Badge variant="primary">Remote</Badge>}
        {location && <span className="flex items-center gap-1 text-xs text-gray-500"><FiMapPin size={12} />{location}</span>}
      </div>

      {/* Salary - prominent */}
      {salary && (
        <div className="mt-3">
          <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{salary}</span>
        </div>
      )}

      <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{job.description}</p>

      <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        {posted && <span className="flex items-center gap-1 text-xs text-gray-400"><FiClock size={12} />{posted}</span>}
        <span className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-bold text-black hover:bg-amber-600 transition-colors shadow-sm">Apply</span>
      </div>
    </Link>
  );
}
