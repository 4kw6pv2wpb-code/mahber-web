/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MOCK_EVENTS = [
  { id: '1', title: 'Ethiopian New Year Celebration 2019 EC', date: '2026-09-11', time: '6:00 PM', location: 'Ethiopian Community Center, Seattle', category: 'Cultural', attendees: 250, price: '$15', desc: 'Ring in the Ethiopian New Year with traditional food, music, and dance. Live band performance.' },
  { id: '2', title: 'Habesha Professional Networking Night', date: '2026-04-15', time: '7:00 PM', location: 'The Loft, Washington DC', category: 'Networking', attendees: 80, price: 'Free', desc: 'Monthly networking event for Habesha professionals in the DMV area. Appetizers provided.' },
  { id: '3', title: 'Kidane Mehret Church Sunday Service', date: '2026-03-22', time: '9:00 AM', location: 'Kidane Mehret Church, Los Angeles', category: 'Religious', attendees: 150, price: 'Free', desc: 'Weekly Sunday service followed by community lunch. All welcome.' },
  { id: '4', title: 'Ethiopian Coffee Ceremony & Poetry Night', date: '2026-04-05', time: '5:00 PM', location: 'Buna Cafe, Atlanta', category: 'Cultural', attendees: 40, price: '$10', desc: 'Traditional coffee ceremony paired with Amharic and English poetry readings.' },
  { id: '5', title: 'Habesha Singles Mixer', date: '2026-04-12', time: '8:00 PM', location: 'Skyline Rooftop Bar, Seattle', category: 'Social', attendees: 60, price: '$20', desc: 'Meet other Habesha singles in a relaxed rooftop setting. Ages 25-40.' },
  { id: '6', title: 'Eritrean Independence Day Festival', date: '2026-05-24', time: '12:00 PM', location: 'Gasworks Park, Seattle', category: 'Cultural', attendees: 500, price: 'Free', desc: 'Annual celebration of Eritrean independence. Food vendors, live music, kids activities.' },
  { id: '7', title: 'Diaspora Tech Meetup', date: '2026-04-20', time: '6:30 PM', location: 'WeWork, Minneapolis', category: 'Networking', attendees: 35, price: 'Free', desc: 'Monthly meetup for Habesha tech workers. Lightning talks, demos, networking.' },
  { id: '8', title: 'Meskel Celebration', date: '2026-09-27', time: '4:00 PM', location: 'Community Park, Washington DC', category: 'Religious', attendees: 300, price: 'Free', desc: 'Traditional Meskel bonfire celebration. Bring your family.' },
  { id: '9', title: 'Habesha Business Summit 2026', date: '2026-06-15', time: '9:00 AM', location: 'Marriott Conference Center, Atlanta', category: 'Business', attendees: 200, price: '$50', desc: 'Full-day summit for Habesha entrepreneurs. Keynotes, panels, investor meetings.' },
  { id: '10', title: 'Timkat Festival', date: '2027-01-19', time: '8:00 AM', location: 'Ethiopian Orthodox Church, Los Angeles', category: 'Religious', attendees: 400, price: 'Free', desc: 'Celebrate the Epiphany with traditional processions and ceremonies.' },
  { id: '11', title: 'Habesha Food Festival', date: '2026-07-04', time: '11:00 AM', location: 'Lake Union Park, Seattle', category: 'Cultural', attendees: 1000, price: '$5', desc: 'The biggest Habesha food event in the PNW. 20+ restaurant vendors, cooking competitions.' },
  { id: '12', title: 'Youth Mentorship Workshop', date: '2026-04-08', time: '2:00 PM', location: 'Boys & Girls Club, Minneapolis', category: 'Education', attendees: 30, price: 'Free', desc: 'Workshop connecting Habesha youth with community mentors. Career guidance, college prep.' },
  { id: '13', title: 'Habesha Wedding Expo', date: '2026-05-10', time: '10:00 AM', location: 'Convention Center, Washington DC', category: 'Cultural', attendees: 150, price: '$25', desc: 'Everything for your Habesha wedding. Vendors, fashion shows, traditional and modern ideas.' },
  { id: '14', title: 'Genna (Christmas) Celebration', date: '2027-01-07', time: '6:00 PM', location: 'Community Hall, Atlanta', category: 'Religious', attendees: 200, price: '$10', desc: 'Ethiopian Christmas dinner and celebration. Traditional food, music, and gift exchange.' },
  { id: '15', title: 'Startup Pitch Night - Diaspora Edition', date: '2026-04-25', time: '7:00 PM', location: 'Capital Factory, Los Angeles', category: 'Business', attendees: 50, price: 'Free', desc: '5 Habesha founders pitch to angel investors. $10K prize for best pitch.' },
];

function getEvents() {
  try {
    if (fs.existsSync(EVENTS_FILE)) return JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf-8'));
  } catch {}
  return MOCK_EVENTS;
}

function saveEvents(events) {
  ensureDataDir();
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
}

export async function GET() {
  return NextResponse.json({ events: getEvents() });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const events = getEvents();
    const newEvent = { id: String(Date.now()), ...body, attendees: 0 };
    events.unshift(newEvent);
    saveEvents(events);
    return NextResponse.json({ event: newEvent });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
