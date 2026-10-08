import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: env.NODE_ENV === 'production' ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});

export const leadsRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: env.NODE_ENV === 'production' ? 10 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many form submissions. Please try again later.' },
  keyGenerator: (req) => req.ip,
});

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again in 15 minutes.' },
  keyGenerator: (req) => req.ip,
});
