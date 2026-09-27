/**
 * src/config/firebase.js
 * Firebase Admin & Firestore initialization with graceful local in-memory fallback.
 */
import admin from 'firebase-admin';

let db;
let isMock = false;

// In-memory mock store for local development before credentials are provided
class MockCollection {
  constructor(name) {
    this.name = name;
    this.items = [];
  }

async add(data) {
    const docId = 'mock_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const item = { id: docId, ...data };
    this.items.push(item);
    console.log(`[MockFirestore] Added document to '${this.name}' with keys: ${Object.keys(data).join(', ')}`);
    return { id: docId };
  }

  async get() {
    return {
      empty: this.items.length === 0,
      size: this.items.length,
      docs: this.items.map((item) => ({
        id: item.id,
        data: () => item,
      })),
    };
  }
}

class MockFirestore {
  constructor() {
    this.collections = {};
  }

  collection(name) {
    if (!this.collections[name]) {
      this.collections[name] = new MockCollection(name);
    }
    return this.collections[name];
  }
}

// Check for Firebase credentials
const hasServiceAccount = Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const hasEnvCredentials = Boolean(
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY
);

// In production the API must never silently accept leads into an in-memory
// store that disappears on restart. ALLOW_MOCK_DB=1 is the explicit escape
// hatch for staging/demo environments.
const allowMockDb = process.env.ALLOW_MOCK_DB === '1';
const isProduction = process.env.NODE_ENV === 'production';

function failFast(message) {
  if (isProduction && !allowMockDb) {
    console.error(`❌ [Firebase] ${message}`);
    console.error('   Defina credenciais Firebase (ver .env.example) ou ALLOW_MOCK_DB=1 para permitir o mock em produção.');
    process.exit(1);
  }
}

if (hasServiceAccount || hasEnvCredentials) {
  try {
    if (admin.apps.length === 0) {
if (hasEnvCredentials) {
        if (!process.env.FIREBASE_PRIVATE_KEY) {
          throw new Error('FIREBASE_PRIVATE_KEY is set but empty');
        }
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          }),
        });
      } else {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
        });
      }
    }
    db = admin.firestore();
    console.log(' [Firebase] Connected successfully to Cloud Firestore.');
  } catch (err) {
    failFast(`Initialization failed: ${err.message}`);
    console.warn('⚠️ [Firebase] Initialization failed, using local mock store:', err.message);
    db = new MockFirestore();
    isMock = true;
  }
} else {
  failFast('No credentials found in environment.');
  console.log('ℹ️ [Firebase] No credentials found in environment. Using local in-memory store for development.');
  db = new MockFirestore();
  isMock = true;
}

export { db, isMock };
export default db;
