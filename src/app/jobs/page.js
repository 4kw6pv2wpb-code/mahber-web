'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { JobCard } from '@/components/jobs/JobCard';
import { FiSearch, FiPlus, FiBriefcase } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { jobsApi } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useAnalytics } from '@/lib/useAnalytics';

const FILTERS = ['All', 'Full-time', 'Part-time', 'Remote', 'Contract'];

function JobsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-start gap-3">
            <div className="skeleton h-12 w-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-2/3" />
              <div className="skeleton h-3 w-1/3" />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <div className="skeleton h-6 w-20 rounded-full" />
            <div className="skeleton h-6 w-16 rounded-full" />
          </div>
          <div className="skeleton mt-3 h-5 w-28" />
          <div className="skeleton mt-2 h-3 w-full" />
          <div className="skeleton mt-1 h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}

export default function JobsPage() {
  useAnalytics();
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (filter !== 'All') params.type = filter;
        if (search) params.search = search;
        const res = await jobsApi.getJobs(params);
        setJobs(res.data?.data || res.data || []);
      } catch (err) {
        setError('Could not load jobs. Please try again.');
        console.error('Jobs fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [filter]);

  const handleSearch = (e) => {
    e.preventDefault();
    async function doSearch() {
      setLoading(true);
      try {
        const params = { search };
        if (filter !== 'All') params.type = filter;
        const res = await jobsApi.getJobs(params);
        setJobs(res.data?.data || res.data || []);
      } catch (err) {
        setError('Search failed.');
      } finally {
        setLoading(false);
      }
    }
    doSearch();
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 py-6 page-fade-in">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Jobs Board</h1>
          <Button
            onClick={() => alert('Create job coming soon!')}
            className="flex items-center gap-2"
          >
            <FiPlus /> Post a Job
          </Button>
        </div>

        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </form>

        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading && <JobsSkeleton />}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center my-4">
            {error}
          </div>
        )}

        {!loading && jobs.length === 0 && !error && (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <FiBriefcase className="text-primary" size={28} />
            </div>
            <p className="text-lg font-semibold text-gray-900">No jobs found</p>
            <p className="mt-1 text-gray-500">Try adjusting your search or check back later!</p>
          </div>
        )}

        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
