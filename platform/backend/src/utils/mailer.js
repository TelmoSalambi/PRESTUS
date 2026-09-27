/**
 * src/utils/mailer.js
 * Shared Nodemailer transport for lead/quote email notifications.
 * The transport is only active when SMTP_USER and SMTP_PASS are configured.
 */
import nodemailer from 'nodemailer';

let transporter = null;
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Send a notification email to NOTIFICATION_EMAIL (fire-and-forget).
 * Failures are logged, never propagated — the lead is already saved.
 */
export function sendNotificationEmail({ subject, html }) {
  const recipient = process.env.NOTIFICATION_EMAIL;
  if (transporter && recipient) {
    transporter
      .sendMail({
        from: `"PRESTUS Website" <${process.env.SMTP_USER}>`,
        to: recipient,
        subject,
        html,
      })
      .catch((mailErr) => {
        console.warn('[Nodemailer] Falha ao enviar email:', mailErr.message);
      });
  } else if (recipient === undefined) {
    console.warn('[Mailer] NOTIFICATION_EMAIL not configured; skipping email notification.');
  }
}
