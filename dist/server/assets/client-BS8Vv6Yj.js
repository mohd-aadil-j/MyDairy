import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "";
if (!MONGO_URI) {
  console.warn("[MongoDB] MONGO_URI not set — MongoDB client will fail if used.");
}
let client = null;
async function getMongoClient() {
  if (client) return client;
  client = new MongoClient(MONGO_URI);
  await client.connect();
  return client;
}
async function getDb(dbName = "mydiary") {
  const c = await getMongoClient();
  return c.db(dbName);
}
export {
  getDb as g
};
