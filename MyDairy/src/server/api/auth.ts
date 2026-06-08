import { getDb } from '@/integrations/mongodb/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'replace-me-with-secure-secret';
const TOKEN_NAME = 'mydiary_token';
const COOKIE_OPTIONS = {
  httpOnly: true,
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7,
};

async function jsonResponse(body: any, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

function createSessionCookie(token: string) {
  return cookie.serialize(TOKEN_NAME, token, COOKIE_OPTIONS);
}

function clearSessionCookie() {
  return cookie.serialize(TOKEN_NAME, '', { ...COOKIE_OPTIONS, maxAge: 0 });
}

export async function fetch(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/auth/signup' && request.method === 'POST') {
    const payload = await request.json();
    const { email, password } = payload;
    if (!email || !password) return jsonResponse({ error: 'Missing email or password' }, 400);
    const db = await getDb();
    const users = db.collection('users');
    const existing = await users.findOne({ email });
    if (existing) return jsonResponse({ error: 'Email already registered' }, 400);
    const hashed = await bcrypt.hash(password, 10);
    const res = await users.insertOne({ email, password: hashed, createdAt: new Date() });
    const user = { id: res.insertedId.toString(), email };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    return new Response(JSON.stringify({ user }), {
      status: 201,
      headers: {
        'content-type': 'application/json',
        'set-cookie': createSessionCookie(token),
      },
    });
  }

  if (path === '/api/auth/login' && request.method === 'POST') {
    const { email, password } = await request.json();
    if (!email || !password) return jsonResponse({ error: 'Missing email or password' }, 400);
    const db = await getDb();
    const users = db.collection('users');
    const user = await users.findOne({ email });
    if (!user) return jsonResponse({ error: 'Invalid credentials' }, 401);
    const ok = await bcrypt.compare(password, user.password as string);
    if (!ok) return jsonResponse({ error: 'Invalid credentials' }, 401);
    const token = jwt.sign({ id: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    return new Response(JSON.stringify({ user: { id: user._id.toString(), email: user.email } }), {
      status: 200,
      headers: { 'content-type': 'application/json', 'set-cookie': createSessionCookie(token) },
    });
  }

  if (path === '/api/auth/logout' && request.method === 'POST') {
    return new Response(null, { status: 204, headers: { 'set-cookie': clearSessionCookie() } });
  }

  if (path === '/api/auth/session' && request.method === 'GET') {
    const cookieHeader = request.headers.get('cookie') || '';
    const parsed = cookie.parse(cookieHeader || '');
    const token = parsed[TOKEN_NAME];
    if (!token) return jsonResponse({ user: null });
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return jsonResponse({ user: { id: decoded.id, email: decoded.email } });
    } catch {
      return jsonResponse({ user: null });
    }
  }

  return jsonResponse({ error: 'Not found' }, 404);
}
