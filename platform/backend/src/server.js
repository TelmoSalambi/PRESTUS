/**
 * src/server.js
 * PRESTUS Backend API entry point.
 */
// Single place where .env is loaded — must be the first import so every
// module below (firebase, rate limiter, mailer) sees the variables.
import 'dotenv/config';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import healthRoutes from './routes/health.js';
import serviceRoutes from './routes/services.js';
import contactRoutes from './routes/contact.js';
import quoteRoutes from './routes/quote.js';
import newsRoutes from './routes/news.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Behind a reverse proxy (Nginx, Cloudflare, Render, Railway...), trust X-Forwarded-*
// so express-rate-limit sees the real client IP instead of the proxy's IP.
// Set TRUST_PROXY=1 (hops) or TRUST_PROXY=10.0.0.1 for your topology. Default: 1.
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', process.env.TRUST_PROXY || 1);
}

// Security & Parsing Middlewares
app.use(
  helmet({
    // COEP would block the Google Maps iframe and fonts (no CORP headers).
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        // Google Fonts (@import in CSS) and the embedded Google Maps iframe.
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'frame-src': ["'self'", 'https://maps.google.com', 'https://www.google.com'],
        'img-src': ["'self'", 'data:', 'https:'],
      },
    },
  }),
);

// Comma-separated list of allowed origins, e.g.
// FRONTEND_URL=https://www.prestus.ao,https://prestus.ao
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const hasWildcardOrigin = allowedOrigins.some((origin) => origin.includes('*'));

if (process.env.NODE_ENV === 'production') {
  if (hasWildcardOrigin) {
    console.error('[CORS] ❌ Wildcard origin is not allowed in production. Set FRONTEND_URL to the exact site origin(s).');
    process.exit(1);
  }
} else if (hasWildcardOrigin) {
  console.warn('[CORS] WARNING: Wildcard origin with credentials is insecure. Set FRONTEND_URL properly.');
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (no Origin header) and listed origins.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
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

// Unknown API routes always answer JSON (API contract).
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada.',
  });
});

// Serve the built SPA (platform/frontend/dist) when it exists, with an
// index.html fallback for any other GET route (single-page app).
const distPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../frontend/dist',
);
if (process.env.NODE_ENV !== 'test' && existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Fallback 404 (dev without a built frontend, non-GET routes, ...).
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

  // Mensagem clara quando a porta já estiver em uso (ex.: processo órfão de um
  // dev server anterior), em vez de um stack trace de 'Unhandled error event'.
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `\n❌ A porta ${PORT} já está em uso por outro processo.\n` +
          `   Feche o processo que a utiliza ou corra 'npm run dev' na raiz do projeto\n` +
          `   (o script predev liberta as portas 5000 e 5173 automaticamente).\n`
      );
      process.exit(1);
    }
    throw err;
  });
}

export default app;
