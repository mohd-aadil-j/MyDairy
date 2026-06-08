import { getDb } from '@/integrations/mongodb/client';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'replace-me-with-secure-secret';

async function jsonResponse(body: any, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

function getSessionUser(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const parsed = cookie.parse(cookieHeader);
  const token = parsed['mydiary_token'];
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
  } catch {
    return null;
  }
}

export async function fetch(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const user = getSessionUser(request);

  const db = await getDb();
  const entries = db.collection('entries');

  if (path === '/api/entries' && request.method === 'GET') {
    if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);
    const q = url.searchParams.get('q') || '';
    const docs = await entries.find({ user_id: user.id }).sort({ created_at: -1 }).toArray();
    const mapped = docs.map((d: any) => ({ id: d._id.toString(), title: d.title, content: d.content, created_at: d.created_at }));
    if (!q.trim()) return jsonResponse(mapped);
    const needle = q.toLowerCase();
    const filtered = mapped.filter((e: any) => {
      const dateStr = new Date(e.created_at).toLocaleDateString(undefined, { dateStyle: 'long' }).toLowerCase();
      return (
        (e.title || '').toLowerCase().includes(needle) ||
        (e.content || '').toLowerCase().includes(needle) ||
        dateStr.includes(needle)
      );
    });
    return jsonResponse(filtered);
  }

  if (path === '/api/entries' && request.method === 'POST') {
    if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);
    const payload = await request.json();
    const now = new Date().toISOString();
    const res = await entries.insertOne({
      user_id: user.id,
      title: payload.title ? String(payload.title).trim() : 'Untitled',
      content: payload.content ?? null,
      created_at: now,
    });
    return jsonResponse({ id: res.insertedId.toString(), created_at: now }, 201);
  }

  if (path.startsWith('/api/entries/') && request.method === 'GET') {
    if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);
    const id = path.replace('/api/entries/', '');
    if (!ObjectId.isValid(id)) return jsonResponse({ error: 'Not found' }, 404);
    const doc = await entries.findOne({ _id: new ObjectId(id), user_id: user.id });
    if (!doc) return jsonResponse({ error: 'Not found' }, 404);
    return jsonResponse({ id: doc._id.toString(), title: doc.title, content: doc.content, created_at: doc.created_at });
  }

  if (path.startsWith('/api/entries/') && request.method === 'DELETE') {
    if (!user) return jsonResponse({ error: 'Unauthorized' }, 401);
    const id = path.replace('/api/entries/', '');
    if (!ObjectId.isValid(id)) return jsonResponse({ error: 'Not found' }, 404);
    const result = await entries.deleteOne({ _id: new ObjectId(id), user_id: user.id });
    if (result.deletedCount === 0) return jsonResponse({ error: 'Not found' }, 404);
    return new Response(null, { status: 204 });
  }

  return jsonResponse({ error: 'Not found' }, 404);
}
