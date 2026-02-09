import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASS = process.env.ADMIN_PASS;
const TOKEN = 'moderniman_admin_token';

function getTokenValue() {
  if (!ADMIN_PASS) return null;
  return Buffer.from(ADMIN_PASS).toString('base64');
}

export async function POST(req) {
  if (!ADMIN_PASS) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 503 });
  }
  try {
    const { password } = await req.json();
    if (password !== ADMIN_PASS) {
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
