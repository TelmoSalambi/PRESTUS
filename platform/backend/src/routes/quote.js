/**
 * src/routes/quote.js
 * Detailed RFQ (Request for Quote) endpoint.
 */
import { Router } from 'express';
import { db } from '../config/firebase.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';
import { validateEmail, validatePhone, escapeHtml, sanitizeSubject, VALID_SERVICES } from '../utils/validators.js';
import { sendNotificationEmail } from '../utils/mailer.js';

const router = Router();

const MAX_NAME = 100;
const MAX_COMPANY = 150;
const MAX_EMAIL = 254;
const MAX_PHONE = 20;
const MAX_BUDGET = 50;
const MAX_DEADLINE = 100;
const MAX_DESCRIPTION = 5000;

router.post('/', contactRateLimiter, async (req, res, next) => {
  try {
    const { name, company, email, phone, service, budget, deadline, description, honeypot } = req.body;

    // Trap for spam bots: acknowledge silently, but log it for visibility.
    if (honeypot) {
      console.warn(`[Honeypot] Quote submission ignored from ${req.ip}`);
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

    if (company && String(company).trim().length > MAX_COMPANY) {
      return res.status(400).json({
        success: false,
        message: 'Nome da empresa demasiado longo.',
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

    const docRef = await db.collection('quotes').add(quoteData);

    sendNotificationEmail({
      subject: sanitizeSubject(`🔔 Novo Pedido de Orçamento: ${quoteData.name} (${quoteData.service})`),
      html: `
            <h2>Novo Pedido de Orçamento (RFQ)</h2>
            <p><strong>Nome:</strong> ${escapeHtml(quoteData.name)}</p>
            <p><strong>Empresa:</strong> ${escapeHtml(quoteData.company || 'N/A')}</p>
            <p><strong>Email:</strong> ${escapeHtml(quoteData.email)}</p>
            <p><strong>Telefone:</strong> ${escapeHtml(quoteData.phone || 'N/A')}</p>
            <p><strong>Área de Interesse:</strong> ${escapeHtml(quoteData.service)}</p>
            <p><strong>Orçamento:</strong> ${escapeHtml(quoteData.budget || 'N/A')}</p>
            <p><strong>Prazo:</strong> ${escapeHtml(quoteData.deadline || 'N/A')}</p>
            <p><strong>Descrição:</strong></p>
            <blockquote>${escapeHtml(quoteData.description || 'Sem descrição adicional')}</blockquote>
            <hr/>
            <p><small>ID no Firestore: ${escapeHtml(docRef.id)} | Data: ${escapeHtml(quoteData.createdAt)}</small></p>
          `,
    });

    return res.status(201).json({
      success: true,
      message: 'Solicitação de orçamento registada com sucesso.',
    });
  } catch (err) {
    next(err);
  }
});

export default router;