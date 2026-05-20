import { Router } from 'express';
import { authRateLimit } from '../../middleware/rate-limit.middleware.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './auth.schema.js';
import {
  login,
  refresh,
  logout,
  me,
  forgotPassword,
  resetPassword,
} from './auth.controller.js';

const router = Router();

router.post('/login', authRateLimit, validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authMiddleware, me);
router.post('/forgot-password', authRateLimit, validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', authRateLimit, validate(resetPasswordSchema), resetPassword);

export { router as authRoutes };
