import { type Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/explorerdb";
const databaseName = process.env.MONGODB_DB ?? "explorerdb";

// Cache the MongoDB connection to reuse it across requests
let cachedDatabase: Db | null = null;

function updateCache(database: Db): void {
  cachedDatabase = database;
}

export async function connectToDatabase(): Promise<Db>
> {
  const databaseSnapshot = cachedDatabase;

  // If we already have a connection, use it
  if ( databaseSnapshot) {
    return databaseSnapshot;
  }
  
  // If no connection exists, create a new one
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db(databaseName);

    updateCache(database);
    
    console.log("Connected to MongoDB successfully");
    return database;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Unable to connect to database");
  }
}
