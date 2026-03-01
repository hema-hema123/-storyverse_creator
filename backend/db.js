import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let cachedDb = null;

export async function getCollection() {
  if (!cachedDb) {
    await client.connect();
    cachedDb = client.db(process.env.DB_NAME || "app");
  }
  return cachedDb.collection(process.env.COLLECTION || "creator_profiles");
}
