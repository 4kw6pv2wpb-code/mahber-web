'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FiArrowLeft, FiMapPin, FiDollarSign, FiClock, FiBriefcase, FiBookmark, FiShare2 } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';

const MOCK_JOB = {
  id: '1', title: 'Software Engineer', company: 'Habesha Tech Solutions', location: 'Seattle, WA', salary: '$120k–$160k', type: 'Full-time', posted: '2 days ago', logoBg: 'bg-primary',
  description: 'We are looking for a talented Software Engineer to join our growing team at Habesha Tech Solutions. You will be building technology products that serve the East African diaspora community, from remittance platforms to community engagement tools.',
  requirements: ['3+ years experience with React and Node.js', 'Experience with cloud services (AWS or GCP)', 'Strong understanding of RESTful APIs', 'Experience with PostgreSQL or similar databases', 'Excellent communication skills', 'Bonus: Knowledge of Amharic, Tigrinya, or Somali'],
  responsibilities: ['Design and implement new features for our platform', 'Collaborate with product and design teams', 'Write clean, maintainable, and well-tested code', 'Participate in code reviews and architecture discussions', 'Mentor junior developers'],
  benefits: ['Health, dental, and vision insurance', '401(k) with company match', 'Flexible remote work policy', 'Annual trip to Ethiopia/Eritrea for team retreat', 'Professional development budget'],
};

export default function JobDetailPage() {
  useAnalytics();
  const { id } = useParams();
  const job = MOCK_JOB;

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-4 py-6">
        <Link href="/jobs" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary dark:text-gray-400">
          <FiArrowLeft size={16} /> Back to Jobs
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
              <div className="flex items-start gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${job.logoBg} text-xl font-bold text-white`}>{job.company[0]}</div>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><FiMapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1"><FiDollarSign size={14} /> {job.salary}</span>
                    <span className="flex items-center gap-1"><FiBriefcase size={14} /> {job.type}</span>
                    <span className="flex items-center gap-1"><FiClock size={14} /> {job.posted}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="lg" className="flex-1">Apply Now</Button>
                <button className="rounded-xl border border-gray-200 p-3 text-gray-400 hover:bg-gray-50 hover:text-primary dark:border-dark-600 dark:hover:bg-dark-700"><FiBookmark size={20} /></button>
                <button className="rounded-xl border border-gray-200 p-3 text-gray-400 hover:bg-gray-50 hover:text-primary dark:border-dark-600 dark:hover:bg-dark-700"><FiShare2 size={20} /></button>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
              <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">About the Role</h2>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{job.description}</p>

              <h3 className="mb-2 mt-6 font-semibold text-gray-900 dark:text-white">Requirements</h3>
              <ul className="space-y-1.5">{job.requirements.map((r, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{r}</li>)}</ul>

              <h3 className="mb-2 mt-6 font-semibold text-gray-900 dark:text-white">Responsibilities</h3>
              <ul className="space-y-1.5">{job.responsibilities.map((r, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-habesha-green" />{r}</li>)}</ul>

              <h3 className="mb-2 mt-6 font-semibold text-gray-900 dark:text-white">Benefits</h3>
              <ul className="space-y-1.5">{job.benefits.map((b, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><span className="mt-1 text-primary">✓</span>{b}</li>)}</ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-dark-700 dark:bg-dark-800">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">About {job.company}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Building technology for the East African diaspora. Based in Seattle with a global team.</p>
              <div className="mt-3 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <p>🏢 51–200 employees</p>
                <p>🌐 habeshatech.com</p>
                <p>📍 Seattle, WA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
