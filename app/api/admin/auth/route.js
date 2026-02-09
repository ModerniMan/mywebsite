import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASS = process.env.ADMIN_PASS;
const TOKEN = 'moderniman_admin_token';
const SECRET = process.env.ADMIN_PASS + '_moderniman_secret';

// Simple in-memory rate limiter
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
    return false;
  }
  entry.count++;
  return entry.count > MAX_ATTEMPTS;
}

function getTokenValue() {
  if (!ADMIN_PASS) return null;
  return crypto.createHmac('sha256', SECRET).update(ADMIN_PASS).digest('hex');
}

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }
  if (!ADMIN_PASS) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 503 });
  }
  try {
    const { password } = await req.json();
    if (!password || password !== ADMIN_PASS) {
      return NextResponse.json({ error: 'סיסמה שגויה' }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(TOKEN, getTokenValue(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24h
      path: '/',
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(TOKEN, '', { maxAge: 0, path: '/' });
  return res;
}

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN);
  const tokenValue = getTokenValue();
  const valid = tokenValue && token?.value === tokenValue;
  return NextResponse.json({ authenticated: valid });
}
