/**
 * test/api.test.js
 * Smoke tests for the PRESTUS API using node:test (no extra dependencies).
 * Runs without Firebase/SMTP credentials: firebase.js falls back to the in-memory mock.
 */
import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import supertest from 'supertest';

process.env.NODE_ENV = 'test';
// Keep the shared rate limiter out of the way of the suite (env read at import).
process.env.RATE_LIMIT_MAX = '1000';

const { default: app } = await import('../src/server.js');
const request = supertest(app);

before(async () => {
  // Give the app a tick to initialize (dotenv, firebase mock)
  await new Promise((resolve) => setTimeout(resolve, 50));
});

describe('GET /api/health', () => {
  it('returns ok status', async () => {
    const res = await request.get('/api/health').expect(200);
    assert.equal(res.body.status, 'ok');
    assert.equal(res.body.service, 'PRESTUS API');
    assert.equal(res.body.database, 'in-memory-mock');
  });
});

describe('GET /api/services', () => {
  it('lists the 10 services', async () => {
    const res = await request.get('/api/services').expect(200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.length, 10);
  });
});

describe('GET /api/news', () => {
  it('lists initial articles', async () => {
    const res = await request.get('/api/news').expect(200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.length >= 4);
  });

  it('filters by featured=true', async () => {
    const res = await request.get('/api/news?featured=true').expect(200);
    res.body.data.forEach((article) => assert.equal(article.featured, true));
  });

  it('filters by category (PT value)', async () => {
    const res = await request.get('/api/news?category=Institucional').expect(200);
    assert.ok(res.body.data.length >= 1);
    res.body.data.forEach((article) => assert.equal(article.category, 'Institucional'));
  });

  it('filters by category (EN value)', async () => {
    const res = await request.get('/api/news?category=Corporate').expect(200);
    assert.ok(res.body.data.length >= 1);
    res.body.data.forEach((article) => assert.equal(article.categoryEn, 'Corporate'));
  });

  it('returns a single article by slug', async () => {
    const res = await request
      .get('/api/news/renovacao-credenciais-sncp-conformidade-tributaria-agt')
      .expect(200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.slug, 'renovacao-credenciais-sncp-conformidade-tributaria-agt');
    assert.equal(typeof res.body.data.authorEn, 'string');
    assert.ok(res.body.data.authorEn.length > 0);
  });

  it('returns 404 for unknown slug', async () => {
    await request.get('/api/news/nao-existe').expect(404);
  });
});

describe('POST /api/contact', () => {
  const validLead = {
    name: 'Manuel Silva',
    email: 'manuel@example.ao',
    phone: '+244 923 677 253',
    service: 'construcao',
    message: 'Preciso de uma proposta para obra',
  };

  it('accepts a valid lead', async () => {
    const res = await request.post('/api/contact').send(validLead).expect(201);
    assert.equal(res.body.success, true);
  });

  it('rejects short name', async () => {
    await request
      .post('/api/contact')
      .send({ ...validLead, name: 'A' })
      .expect(400);
  });

  it('rejects invalid email', async () => {
    await request
      .post('/api/contact')
      .send({ ...validLead, email: 'not-an-email' })
      .expect(400);
  });

  it('rejects invalid phone', async () => {
    await request
      .post('/api/contact')
      .send({ ...validLead, phone: 'abc' })
      .expect(400);
  });

  it('rejects missing service', async () => {
    const { service, ...withoutService } = validLead;
    await request.post('/api/contact').send(withoutService).expect(400);
  });

  it('silently accepts honeypot submissions without saving', async () => {
    const res = await request
      .post('/api/contact')
      .send({ ...validLead, honeypot: 'http://spam.example' })
      .expect(200);
    assert.equal(res.body.success, true);
  });

  it('rejects unknown service id', async () => {
    await request
      .post('/api/contact')
      .send({ ...validLead, service: 'nao-existe' })
      .expect(400);
  });

  it('rejects overlong message', async () => {
    await request
      .post('/api/contact')
      .send({ ...validLead, message: 'x'.repeat(5001) })
      .expect(400);
  });

  it('rejects overlong company name', async () => {
    await request
      .post('/api/contact')
      .send({ ...validLead, company: 'x'.repeat(151) })
      .expect(400);
  });
});

describe('POST /api/quote', () => {
  const validQuote = {
    name: 'Maria Costa',
    email: 'maria@gov.ao',
    service: 'saude',
  };

  it('accepts a valid quote', async () => {
    const res = await request.post('/api/quote').send(validQuote).expect(201);
    assert.equal(res.body.success, true);
  });

  it('rejects invalid email (same rules as /contact)', async () => {
    await request
      .post('/api/quote')
      .send({ ...validQuote, email: 'broken' })
      .expect(400);
  });

  it('rejects invalid phone when provided', async () => {
    await request
      .post('/api/quote')
      .send({ ...validQuote, phone: 'x1' })
      .expect(400);
  });

  it('rejects missing service', async () => {
    const { service, ...withoutService } = validQuote;
    await request.post('/api/quote').send(withoutService).expect(400);
  });

  it('silently accepts honeypot submissions', async () => {
    const res = await request
      .post('/api/quote')
      .send({ ...validQuote, honeypot: 'http://spam.example' })
      .expect(200);
    assert.equal(res.body.success, true);
  });

  it('rejects unknown service id', async () => {
    await request
      .post('/api/quote')
      .send({ ...validQuote, service: 'nao-existe' })
      .expect(400);
  });

  it('rejects overlong description', async () => {
    await request
      .post('/api/quote')
      .send({ ...validQuote, description: 'x'.repeat(5001) })
      .expect(400);
  });

  it('rejects overlong company name', async () => {
    await request
      .post('/api/quote')
      .send({ ...validQuote, company: 'x'.repeat(151) })
      .expect(400);
  });
});

describe('malformed payloads', () => {
  it('returns 400 (not 500) for invalid JSON bodies', async () => {
    const res = await request
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send('{"nome": invalido')
      .expect(400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /JSON/i);
  });
});

describe('payload limits', () => {
  it('returns 413 for bodies over the 50kb limit', async () => {
    const res = await request
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ name: 'Too Big', junk: 'a'.repeat(60 * 1024) }))
      .expect(413);
    assert.equal(res.body.success, false);
  });
});

describe('security headers & CORS', () => {
  it('sets helmet security headers', async () => {
    const res = await request.get('/api/health').expect(200);
    assert.equal(res.headers['x-content-type-options'], 'nosniff');
  });

  it('allows requests from the configured origin', async () => {
    const res = await request
      .get('/api/health')
      .set('Origin', 'http://localhost:5173')
      .expect(200);
    assert.equal(res.headers['access-control-allow-origin'], 'http://localhost:5173');
  });

  it('does not grant CORS to unknown origins', async () => {
    const res = await request
      .get('/api/health')
      .set('Origin', 'https://evil.example')
      .expect(200);
    assert.equal(res.headers['access-control-allow-origin'], undefined);
  });
});

describe('unknown routes', () => {
  it('returns 404 JSON', async () => {
    const res = await request.get('/api/nao-existe').expect(404);
    assert.equal(res.body.success, false);
  });
});
