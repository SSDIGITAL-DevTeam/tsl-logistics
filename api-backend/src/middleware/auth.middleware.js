import { verifyAccessToken } from '../lib/jwt.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}
