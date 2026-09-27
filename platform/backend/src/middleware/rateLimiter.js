/**
 * src/middleware/rateLimiter.js
 * Anti-spam rate limiting middleware for form submissions.
 * Tunable via env: RATE_LIMIT_WINDOW_MS (ms) and RATE_LIMIT_MAX (reqs/window).
 * Reads env after `import 'dotenv/config'` runs in src/server.js.
 */
import rateLimit from 'express-rate-limit';

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000;
const max = parseInt(process.env.RATE_LIMIT_MAX, 10) || 15;
const windowMinutes = Math.max(1, Math.round(windowMs / 60000));

export const contactRateLimiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: `Muitos pedidos enviados a partir deste IP. Por favor tente novamente após ${windowMinutes} minuto(s).`,
  },
});
