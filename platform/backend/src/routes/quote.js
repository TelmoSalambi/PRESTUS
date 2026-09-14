/**
 * src/routes/quote.js
 * Detailed RFQ (Request for Quote) endpoint.
 */
import { Router } from 'express';
import { db } from '../config/firebase.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';
import { validateEmail, validatePhone } from '../utils/validators.js';

const router = Router();

const MAX_NAME = 100;
const MAX_COMPANY = 150;
const MAX_EMAIL = 254;
const MAX_PHONE = 20;
const MAX_SERVICE = 50;
const MAX_BUDGET = 50;
const MAX_DEADLINE = 100;
const MAX_DESCRIPTION = 5000;

const VALID_SERVICES = [
  'construcao',
  'fiscalizacao',
  'saude',
  'limpeza',
  'informatica',
  'escritorio',
  'diversos',
  'alimentacao',
  'logistica',
  'pesca',
];

router.post('/', contactRateLimiter, async (req, res, next) => {
  try {
    const { name, company, email, phone, service, budget, deadline, description, honeypot } = req.body;

    // Silent trap for spam bots
    if (honeypot) {
      return res.status(200).json({
        success: true,
        message: 'Solicitação de orçamento registada com sucesso.',
      });
    }

    if (!name || String(name).trim().length < 2 || String(name).trim().length > MAX_NAME) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, insira o seu nome completo.',
      });
    }

    if (!email || !validateEmail(email) || String(email).trim().length > MAX_EMAIL) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, insira um e-mail válido.',
      });
    }

    if (phone && (!validatePhone(phone) || String(phone).trim().length > MAX_PHONE)) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, insira um número de telefone válido.',
      });
    }

    if (!service || !VALID_SERVICES.includes(String(service).trim())) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, selecione uma área de interesse válida.',
      });
    }

    if (budget && String(budget).trim().length > MAX_BUDGET) {
      return res.status(400).json({
        success: false,
        message: 'Orçamento demasiado longo.',
      });
    }

    if (deadline && String(deadline).trim().length > MAX_DEADLINE) {
      return res.status(400).json({
        success: false,
        message: 'Prazo demasiado longo.',
      });
    }

    if (description && String(description).trim().length > MAX_DESCRIPTION) {
      return res.status(400).json({
        success: false,
        message: 'Descrição demasiado longa (máximo 5000 caracteres).',
      });
    }

    const quoteData = {
      name: String(name).trim(),
      company: company ? String(company).trim() : '',
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      service: String(service).trim(),
      budget: budget ? String(budget).trim() : '',
      deadline: deadline ? String(deadline).trim() : '',
      description: description ? String(description).trim() : '',
      status: 'pendente_analise',
      createdAt: new Date().toISOString(),
      source: 'website_rfq',
    };

    await db.collection('quotes').add(quoteData);

    return res.status(201).json({
      success: true,
      message: 'Solicitação de orçamento registada com sucesso.',
    });
  } catch (err) {
    next(err);
  }
});

export default router;