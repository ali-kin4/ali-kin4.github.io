import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(uri);
  await client.connect();
  cachedDb = client.db();
  return cachedDb;
}
