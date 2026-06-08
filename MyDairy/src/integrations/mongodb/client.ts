import dns from 'dns';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI?.trim() ?? '';
if (!MONGO_URI) {
  throw new Error(
    '[MongoDB] MONGO_URI is not set. Add it to your environment or .env file before starting the server.',
  );
}

let client: MongoClient | null = null;
const MONGO_OPTIONS = {
  connectTimeoutMS: 20000,
  serverSelectionTimeoutMS: 20000,
  socketTimeoutMS: 45000,
};

function redactUri(uri: string) {
  return uri.replace(/(mongodb(?:\+srv)?:\/\/)([^:]+):([^@]+)@/, '$1$2:*****@');
}

async function buildFallbackUri(uri: string): Promise<string | null> {
  const url = new URL(uri);
  if (url.protocol !== 'mongodb+srv:') return null;

  let records;
  try {
    records = await dns.promises.resolveSrv(`_mongodb._tcp.${url.hostname}`);
  } catch (error: any) {
    if (error?.code === 'ETIMEOUT' || error?.code === 'ENOTFOUND') {
      try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
        records = await dns.promises.resolveSrv(`_mongodb._tcp.${url.hostname}`);
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }

  if (!records?.length) return null;

  const hosts = records.map((record) => `${record.name}:${record.port}`).join(',');

  const params = new URLSearchParams(url.search);
  if (!params.has('tls') && !params.has('ssl')) {
    params.set('tls', 'true');
  }

  const auth = url.username
    ? `${encodeURIComponent(url.username)}${url.password ? `:${encodeURIComponent(url.password)}` : ''}@`
    : '';

  return `mongodb://${auth}${hosts}${url.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
}

export async function getMongoClient(): Promise<MongoClient> {
  if (client) return client;

  client = new MongoClient(MONGO_URI, MONGO_OPTIONS);

  try {
    await client.connect();
    return client;
  } catch (error: any) {
    console.error('[MongoDB] connection failed', {
      uri: redactUri(MONGO_URI),
      error,
    });
    client = null;

    if (
      error?.code === 'ETIMEOUT' &&
      error?.syscall === 'querySrv' &&
      MONGO_URI.startsWith('mongodb+srv://')
    ) {
      const fallbackUri = await buildFallbackUri(MONGO_URI);
      if (fallbackUri) {
        console.warn('[MongoDB] retrying with fallback mongodb:// URI to avoid SRV DNS timeout');
        client = new MongoClient(fallbackUri, MONGO_OPTIONS);
        await client.connect();
        return client;
      }
    }

    throw error;
  }
}

export async function getDb(dbName = 'mydiary') {
  const c = await getMongoClient();
  return c.db(dbName);
}
