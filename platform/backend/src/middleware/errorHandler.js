/**
 * src/middleware/errorHandler.js
 * Centralized error handler.
 * Known/operational errors (with err.expose) send their message;
 * unexpected errors send a generic message so internals never leak.
 */
export function errorHandler(err, req, res, next) {
  console.error('[ServerError]', err);

  const status = err.status || 500;
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
