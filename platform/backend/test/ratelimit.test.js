/**
 * test/ratelimit.test.js
 * Rate limiting answers 429 with a friendly, window-aware JSON message.
 * Runs in its own process (node --test) so its env does not leak into
 * api.test.js — RATE_LIMIT_MAX is read when the limiter module is imported.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import supertest from 'supertest';

process.env.NODE_ENV = 'test';
process.env.RATE_LIMIT_MAX = '3';
process.env.RATE_LIMIT_WINDOW_MS = '60000';

const { default: app } = await import('../src/server.js');
const request = supertest(app);

const lead = {
  name: 'Rate Limit Test',
  email: 'ratelimit@example.ao',
  phone: '+244 923 677 111',
  service: 'construcao',
  message: 'Teste de rate limiting',
};

describe('rate limiting on POST /api/contact', () => {
  it('answers 429 with a friendly message after RATE_LIMIT_MAX requests', async () => {
    for (let i = 0; i < 3; i += 1) {
      await request.post('/api/contact').send(lead).expect(201);
    }

    const res = await request.post('/api/contact').send(lead).expect(429);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /tente novamente/i);
    // Window is 60000ms => the message must mention the configured window.
    assert.match(res.body.message, /1 minuto/);
  });
});
