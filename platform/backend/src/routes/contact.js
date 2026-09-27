/**
 * src/routes/contact.js
 * Contact form endpoint: validates and saves incoming leads to Firestore.
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
const MAX_MESSAGE = 5000;

router.post('/', contactRateLimiter, async (req, res, next) => {
  try {
    const { name, company, email, phone, service, message, honeypot } = req.body;

    // Trap for spam bots: acknowledge silently, but log it for visibility.
    if (honeypot) {
      console.warn(`[Honeypot] Contact submission ignored from ${req.ip}`);
      return res.status(200).json({
        success: true,
        message: 'Mensagem recebida com sucesso.',
      });
    }

    // Validation
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

    if (!phone || !validatePhone(phone) || String(phone).trim().length > MAX_PHONE) {
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

    if (message && String(message).trim().length > MAX_MESSAGE) {
      return res.status(400).json({
        success: false,
        message: 'Mensagem demasiado longa (máximo 5000 caracteres).',
      });
    }

    // Document payload
    const leadData = {
      name: String(name).trim(),
      company: company ? String(company).trim() : '',
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      service: String(service).trim(),
      message: message ? String(message).trim() : '',
      status: 'novo',
      source: 'website_contact_form',
      createdAt: new Date().toISOString(),
    };

    // Save to Firestore
    const docRef = await db.collection('leads').add(leadData);

    // Send email notification asynchronously (non-blocking)
    sendNotificationEmail({
      subject: sanitizeSubject(`🔔 Novo Lead Recebido: ${leadData.name} (${leadData.service})`),
      html: `
            <h2>Novo Pedido de Proposta / Contacto</h2>
            <p><strong>Nome:</strong> ${escapeHtml(leadData.name)}</p>
            <p><strong>Empresa:</strong> ${escapeHtml(leadData.company || 'N/A')}</p>
            <p><strong>Email:</strong> ${escapeHtml(leadData.email)}</p>
            <p><strong>Telefone:</strong> ${escapeHtml(leadData.phone)}</p>
            <p><strong>Área de Interesse:</strong> ${escapeHtml(leadData.service)}</p>
            <p><strong>Mensagem:</strong></p>
            <blockquote>${escapeHtml(leadData.message || 'Sem mensagem adicional')}</blockquote>
            <hr/>
            <p><small>ID do Lead no Firestore: ${escapeHtml(docRef.id)} | Data: ${escapeHtml(leadData.createdAt)}</small></p>
          `,
    });

    return res.status(201).json({
      success: true,
      message: 'Pedido de proposta recebido com sucesso. Responderemos em breve.',
    });
  } catch (err) {
    next(err);
  }
});

export default router;