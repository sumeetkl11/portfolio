import { neon, neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';
import dotenv from 'dotenv';

dotenv.config();

// Required for @neondatabase/serverless in Node.js environments
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('Warning: DATABASE_URL environment variable is missing.');
}

// Simple query client for serverless style (SQL template literals)
export const sql = connectionString ? neon(connectionString) : null;

// Pool for connection pooling (standard pg-pool style)
export const pool = new Pool({
  connectionString: connectionString || undefined,
  ssl: true,
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
