import { type Db, MongoClient } from "mongodb";

const url = process.env.MONGODB_URI ?? "mongodb://localhost:27017/explorerdb";
const databaseName = process.env.MONGODB_DB ?? "explorerdb";

// Cache the MongoDB connection to reuse it across requests
let cachedClient: MongoClient | null = null;
let cachedDatabase: Db | null = null;

function updateCache(client: MongoClient, database: Db): void {
  cachedClient = client;
  cachedDatabase = database;
}

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  database: Db;
}> {
  const clientSnapshot = cachedClient;
  const databaseSnapshot = cachedDatabase;

  // If we already have a connection, use it
  if (clientSnapshot && databaseSnapshot) {
    return { client: clientSnapshot, db: databaseSnapshot };
  }
  
  // If no connection exists, create a new one
  try {
    const client = new MongoClient(url);
    await client.connect();
    const database = client.db(databaseName);

    updateCache(client, database);
    
    console.log("Connected to MongoDB successfully");
    return { client, database };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Unable to connect to database");
  }
}
