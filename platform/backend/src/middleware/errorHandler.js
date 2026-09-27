/**
 * src/middleware/errorHandler.js
 * Centralized error handler.
 * Known/operational errors (with err.expose) send their message;
 * unexpected errors send a generic message so internals never leak.
 */
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  // 4xx = client mistakes: one compact line, no stack trace (avoids leaking
  // internals and log spam). 5xx = real bug: log the full error.
  if (status >= 400 && status < 500) {
    console.warn(`[ServerError] ${status} ${req.method} ${req.originalUrl} - ${err.message}`);
  } else {
    console.error('[ServerError]', err);
  }

  // Body-parser failures are client errors, not 500s — reply with a clear,
  // non-technical message instead of leaking parser internals.
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Corpo da requisição JSON inválido.',
    });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Corpo da requisição demasiado grande.',
    });
  }

  const isClientError = status >= 400 && status < 500;
  const message =
    isClientError || err.expose
      ? err.message || 'Ocorreu um erro interno no servidor.'
      : 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.';

  res.status(status).json({
    success: false,
    message,
  });
}
