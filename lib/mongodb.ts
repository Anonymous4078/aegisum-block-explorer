import { MongoClient, Db } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/explorerdb"
const MONGODB_DB = process.env.MONGODB_DB ?? "explorerdb"

// Cache the MongoDB connection to reuse it across requests
let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // If no connection exists, create a new one
  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    const db = client.db(MONGODB_DB)

    // Cache the connection
    cachedClient = client
    cachedDb = db

    console.log("Connected to MongoDB successfully")
    return { client, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw new Error("Unable to connect to database")
  }
}
