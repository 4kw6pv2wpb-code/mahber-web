/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MOCK_JOBS = [
  { id: '1', title: 'CNA - Certified Nursing Assistant', company: 'Habesha Home Health', location: 'Seattle, WA', salary: '$22-28/hr', type: 'Full-time', category: 'Healthcare', posted: '2026-03-14', desc: 'Provide quality care for elderly patients in home settings. Amharic/Tigrinya speakers preferred.' },
  { id: '2', title: 'Registered Nurse (RN)', company: 'Swedish Medical Center', location: 'Seattle, WA', salary: '$45-55/hr', type: 'Full-time', category: 'Healthcare', posted: '2026-03-13', desc: 'ICU nurse position. Diverse workplace that values multilingual staff.' },
  { id: '3', title: 'Uber/Lyft Driver Partner', company: 'Community Rideshare Co-op', location: 'Washington, DC', salary: '$25-40/hr', type: 'Flexible', category: 'Driving', posted: '2026-03-14', desc: 'Join our Habesha driver network. Know the best Ethiopian restaurants? Perfect.' },
  { id: '4', title: 'Restaurant Server', company: 'Lalibela Restaurant', location: 'Washington, DC', salary: '$15/hr + tips', type: 'Part-time', category: 'Restaurant', posted: '2026-03-12', desc: 'Experienced server for busy Ethiopian restaurant on U Street. Must know traditional service.' },
  { id: '5', title: 'Line Cook - Ethiopian Cuisine', company: 'Meskerem Restaurant', location: 'Los Angeles, CA', salary: '$18-22/hr', type: 'Full-time', category: 'Restaurant', posted: '2026-03-11', desc: 'Experienced Ethiopian cook. Must know injera, wot, and tibs preparation.' },
  { id: '6', title: 'IT Support Specialist', company: 'Habesha Tech Solutions', location: 'Atlanta, GA', salary: '$55-65K/yr', type: 'Full-time', category: 'Technology', posted: '2026-03-14', desc: 'Provide IT support for small businesses in the Habesha community. Bilingual preferred.' },
  { id: '7', title: 'Warehouse Associate', company: 'Amazon Fulfillment', location: 'Minneapolis, MN', salary: '$19-21/hr', type: 'Full-time', category: 'Warehouse', posted: '2026-03-13', desc: 'Warehouse positions with benefits. Many Habesha community members on team.' },
  { id: '8', title: 'Retail Sales Associate', company: 'Habesha Fashion Boutique', location: 'Seattle, WA', salary: '$17-20/hr', type: 'Part-time', category: 'Retail', posted: '2026-03-10', desc: 'Sell traditional and modern Habesha clothing. Fashion knowledge a plus.' },
  { id: '9', title: 'Medical Interpreter - Amharic', company: 'Harborview Medical Center', location: 'Seattle, WA', salary: '$30-35/hr', type: 'Contract', category: 'Healthcare', posted: '2026-03-14', desc: 'Provide Amharic interpretation for patients. Medical terminology training provided.' },
  { id: '10', title: 'Delivery Driver', company: 'Habesha Eats Delivery', location: 'Washington, DC', salary: '$18/hr + tips', type: 'Part-time', category: 'Driving', posted: '2026-03-09', desc: 'Deliver Ethiopian food orders. Must have own vehicle and know the DC metro area.' },
  { id: '11', title: 'Accounting Clerk', company: 'Ethio-American CPA', location: 'Atlanta, GA', salary: '$45-55K/yr', type: 'Full-time', category: 'Finance', posted: '2026-03-08', desc: 'Entry-level accounting position. Help community businesses with bookkeeping and tax prep.' },
  { id: '12', title: 'Home Health Aide', company: 'Selam Home Care', location: 'Minneapolis, MN', salary: '$16-20/hr', type: 'Full-time', category: 'Healthcare', posted: '2026-03-14', desc: 'Caring for elderly Habesha community members. Tigrinya or Amharic required.' },
  { id: '13', title: 'Software Developer', company: 'Techstars Startup', location: 'Remote', salary: '$90-120K/yr', type: 'Full-time', category: 'Technology', posted: '2026-03-13', desc: 'React/Node.js developer for diaspora-focused fintech startup. Equity included.' },
  { id: '14', title: 'Barista', company: 'Buna Coffee House', location: 'Los Angeles, CA', salary: '$16/hr + tips', type: 'Part-time', category: 'Restaurant', posted: '2026-03-12', desc: 'Traditional Ethiopian coffee ceremony experience preferred. Will train the right person.' },
  { id: '15', title: 'Security Guard', company: 'Allied Universal', location: 'Washington, DC', salary: '$18-22/hr', type: 'Full-time', category: 'Security', posted: '2026-03-11', desc: 'Security positions at various DC locations. Training provided. Stable hours.' },
  { id: '16', title: 'Childcare Provider', company: 'Habesha Kids Academy', location: 'Atlanta, GA', salary: '$15-18/hr', type: 'Full-time', category: 'Education', posted: '2026-03-10', desc: 'Daycare teacher for Habesha families. Teach basic Amharic to children.' },
  { id: '17', title: 'Taxi/Rideshare Driver', company: 'Yellow Cab', location: 'Minneapolis, MN', salary: '$20-35/hr', type: 'Flexible', category: 'Driving', posted: '2026-03-14', desc: 'Experienced drivers welcome. Flexible hours. Know your city.' },
  { id: '18', title: 'Grocery Store Clerk', company: 'Merkato Market', location: 'Seattle, WA', salary: '$17/hr', type: 'Part-time', category: 'Retail', posted: '2026-03-09', desc: 'Work at beloved Ethiopian grocery store. Stock shelves, help customers find injera ingredients.' },
  { id: '19', title: 'Real Estate Agent', company: 'Keller Williams - Habesha Team', location: 'Washington, DC', salary: 'Commission', type: 'Full-time', category: 'Real Estate', posted: '2026-03-08', desc: 'Licensed agent to help Habesha families buy their first homes. Massive demand.' },
  { id: '20', title: 'Community Outreach Coordinator', company: 'Ethiopian Community Center', location: 'Los Angeles, CA', salary: '$45-55K/yr', type: 'Full-time', category: 'Nonprofit', posted: '2026-03-07', desc: 'Connect community members with social services, ESL, and job training programs.' },
];

function getJobs() {
  try {
    if (fs.existsSync(JOBS_FILE)) {
      return JSON.parse(fs.readFileSync(JOBS_FILE, 'utf-8'));
    }
  } catch {}
  return MOCK_JOBS;
}

function saveJobs(jobs) {
  ensureDataDir();
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
}

export async function GET() {
  return NextResponse.json({ jobs: getJobs() });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const jobs = getJobs();
    const newJob = {
      id: String(Date.now()),
      ...body,
      posted: new Date().toISOString().split('T')[0],
    };
    jobs.unshift(newJob);
    saveJobs(jobs);
    return NextResponse.json({ job: newJob });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
