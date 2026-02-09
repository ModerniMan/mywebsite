import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readContent, writeContent } from '@/lib/data';
import translations from '@/lib/translations';

const ADMIN_PASS = process.env.ADMIN_PASS;
const TOKEN = 'moderniman_admin_token';

function isAuth() {
  if (!ADMIN_PASS) return false;
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN);
  const tokenValue = Buffer.from(ADMIN_PASS).toString('base64');
  return token?.value === tokenValue;
}

// GET — return current content
export async function GET() {
  const saved = readContent();
  return NextResponse.json(saved || translations);
}

// PUT — update content (requires auth)
export async function PUT(req) {
  if (!isAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await req.json();
    writeContent(data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

// PATCH — update a specific section (requires auth)
export async function PATCH(req) {
  if (!isAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { lang, section, data } = await req.json();
    const content = readContent() || JSON.parse(JSON.stringify(translations));
    if (!content[lang]) {
      return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
    }
    content[lang][section] = data;
    writeContent(content);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
