import { MongoClient, type Db } from "mongodb";

const url = process.env.MONGODB_URI ?? "mongodb://localhost:27017/explorerdb";
const dbName = process.env.MONGODB_DB ?? "explorerdb";

// Cache the MongoDB connection to reuse it across requests
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // If no connection exists, create a new one
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);

    // Cache the connection
    cachedClient = client;
    cachedDb = db;

    console.log("Connected to MongoDB successfully");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Unable to connect to database");
  }
}
