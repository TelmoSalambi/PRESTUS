/**
 * src/routes/health.js
 * API Health Check & status endpoint.
 */
import { Router } from 'express';
import { isMock } from '../config/firebase.js';

const router = Router();

router.get('/', (req, res) => {
  // Don't advertise an unconfigured database in production.
  const database = isMock
    ? process.env.NODE_ENV === 'production'
      ? 'unconfigured'
      : 'in-memory-mock'
    : 'firestore-cloud';

  res.json({
    status: 'ok',
    service: 'PRESTUS API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database,
  });
});

export default router;
