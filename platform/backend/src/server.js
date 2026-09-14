/**
 * src/server.js
 * PRESTUS Backend API entry point.
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import healthRoutes from './routes/health.js';
import serviceRoutes from './routes/services.js';
import contactRoutes from './routes/contact.js';
import quoteRoutes from './routes/quote.js';
import newsRoutes from './routes/news.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Behind a reverse proxy (Nginx, Cloudflare, Render, Railway...), trust X-Forwarded-*
// so express-rate-limit sees the real client IP instead of the proxy's IP.
// Set TRUST_PROXY=1 (hops) or TRUST_PROXY=10.0.0.1 for your topology. Default: 1.
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', process.env.TRUST_PROXY || 1);
}

// Security & Parsing Middlewares
app.use(helmet());
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

if (process.env.NODE_ENV === 'production' && (allowedOrigin === '*' || allowedOrigin.includes('*'))) {
  console.error('[CORS] WARNING: Wildcard origin with credentials is insecure. Set FRONTEND_URL properly.');
}

app.use(
  cors({
    origin: allowedOrigin,
    credentials: process.env.NODE_ENV !== 'production' || allowedOrigin !== '*',
    methods: ['GET', 'POST'],
  })
);
app.use(express.json({ limit: '50kb' }));

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/quote', quoteRoutes);
app.use('/api/news', newsRoutes);

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada.',
  });
});

// Centralized Error Handler
app.use(errorHandler);

// Only bind the port when run directly (`node src/server.js`), not when the
// app is imported by tests (which use supertest to start/stop the server).
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`🚀 PRESTUS API server running on port ${PORT} [http://localhost:${PORT}]`);
  });
}

export default app;
