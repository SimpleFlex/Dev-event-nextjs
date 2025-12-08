import mongoose, { Mongoose } from "mongoose";

/**
 * MongoDB connection URI.
 *
 * Should be provided via environment variables, e.g. in `.env.local`:
 *   MONGODB_URI="your-connection-string"
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // Fail fast if the URI is not configured so the app doesn't start
  // in a broken state.
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

/**
 * Shape of our cached Mongoose connection.
 *
 * In Next.js (especially during development), the dev server reloads modules
 * frequently. Without caching, each reload would open a new DB connection
 * and quickly exhaust your MongoDB connection pool.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Augment the Node.js global type to include our cached Mongoose instance.
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

/**
 * Cache instance stored on the global object so it persists across
 * hot‑reload cycles in development. In production, this module is loaded
 * once per server process, so the cache is also effective there.
 */
const cached: MongooseCache = global._mongoose ?? {
  conn: null,
  promise: null,
};

if (!global._mongoose) {
  global._mongoose = cached;
}

/**
 * Establishes (or reuses) a Mongoose connection to MongoDB.
 *
 * Safe to call from API routes, server components, and server actions.
 * Reuses an existing connection when available; otherwise creates a new one.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // Reuse existing connection if already established.
  if (cached.conn) {
    return cached.conn;
  }

  // If there is no active connection promise, create one.
  if (!cached.promise) {
    // Optional global Mongoose configuration.
    mongoose.set("strictQuery", true);

    cached.promise = mongoose.connect(MONGODB_URI, {
      // Example options (tune as needed for your app):
      // serverSelectionTimeoutMS: 5000,
      // maxPoolSize: 10,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection failed, clear the cached promise so future calls
    // can attempt to reconnect instead of reusing a failed promise.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

/**
 * Default export for convenience.
 *
 * Example:
 *   import connectToDatabase from "@/lib/mongodb";
 */
export default connectToDatabase;
