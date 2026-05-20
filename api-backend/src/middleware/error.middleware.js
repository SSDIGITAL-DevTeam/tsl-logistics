import { logger } from '../lib/logger.js';

export function errorMiddleware(err, req, res, next) {
  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'File too large. Maximum size is 5MB.' });
  }
  if (err.code === 'INVALID_FILE_TYPE') {
    return res.status(415).json({ message: err.message });
  }

  // CORS errors
  if (err.message?.includes('not allowed by CORS')) {
    return res.status(403).json({ message: err.message });
  }

  logger.error({ err, url: req.url, method: req.method }, 'Unhandled error');

  const status = err.status ?? err.statusCode ?? 500;
  const message =
    process.env.NODE_ENV === 'production' && status === 500
      ? 'Internal server error'
      : (err.message ?? 'Internal server error');

  res.status(status).json({ message });
}
