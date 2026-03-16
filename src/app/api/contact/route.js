import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(CONTACTS_FILE)) fs.writeFileSync(CONTACTS_FILE, '[]');
}

function readContacts() {
  ensureDataDir();
  try { return JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8')); } catch { return []; }
}

function writeContacts(data) {
  ensureDataDir();
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }
    const contacts = readContacts();
    contacts.push({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      read: false,
    });
    writeContacts(contacts);
    return NextResponse.json({ message: 'Message received! We\'ll get back to you soon.' });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('password') !== 'habeshahub2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ contacts: readContacts() });
}
