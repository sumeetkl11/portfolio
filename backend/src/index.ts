import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { query } from './db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await query('SELECT NOW()');
    res.json({
      status: 'ok',
      timestamp: new Date(),
      dbTime: result.rows[0].now,
      service: 'the-digital-nexus-backend'
    });
  } catch (err: any) {
    console.error('Database connection error in health check:', err);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// A route to submit messages directly to Neon DB
app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    const queryText = `
      INSERT INTO messages (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING message_id, name, email, message, created_at
    `;
    const result = await query(queryText, [name, email, message]);
    res.status(201).json({ success: true, message: result.rows[0] });
  } catch (err: any) {
    console.error('Error inserting message:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Start Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
