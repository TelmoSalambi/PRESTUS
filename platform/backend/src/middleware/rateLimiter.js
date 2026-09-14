/**
 * src/middleware/rateLimiter.js
 * Anti-spam rate limiting middleware for form submissions.
 */
import rateLimit from 'express-rate-limit';

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Muitos pedidos enviados a partir deste IP. Por favor tente novamente após 15 minutos.',
  },
});
