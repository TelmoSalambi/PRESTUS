/**
 * src/routes/health.js
 * API Health Check & status endpoint.
 */
import { Router } from 'express';
import { isMock } from '../config/firebase.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PRESTUS API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: isMock ? 'in-memory-mock' : 'firestore-cloud',
  });
});

export default router;
