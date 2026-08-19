import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';

import { env } from './config/env.js';
import { uploadDir } from './config/uploads.js';
import { logger } from './lib/logger.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { authMiddleware } from './middleware/auth.middleware.js';
import { apiRateLimit } from './middleware/rate-limit.middleware.js';

import { authRoutes } from './modules/auth/auth.routes.js';
import { leadsPublicRouter, leadsAdminRouter } from './modules/leads/leads.routes.js';
import { blogCategoryPublicRouter, blogCategoryAdminRouter } from './modules/blog-category/blog-category.routes.js';
import { blogPublicRouter, blogAdminRouter } from './modules/blog/blog.routes.js';
import { dashboardRoutes } from './modules/dashboard/dashboard.routes.js';

const app = express();

// Trust proxy (needed for correct IP behind Nginx/Passenger)
app.set('trust proxy', 1);

// Security headers
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// CORS
const allowedOrigins = env.ORIGIN.split(',').map((o) => o.trim()).filter(Boolean);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing & cookies
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// HTTP request logging
app.use(
  pinoHttp({
    logger,
    customLogLevel(req, res) {
      return res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    },
    serializers: {
      req(req) { return { method: req.method, url: req.url }; },
      res(res) { return { statusCode: res.statusCode }; },
    },
  })
);

// Global rate limit
app.use(apiRateLimit);

// Serve uploaded files
app.use(
  '/uploads',
  express.static(uploadDir, {
    setHeaders(res) {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    },
  })
);

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Public routes ────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/v1/leads', leadsPublicRouter);
app.use('/api/v1/blog-categories', blogCategoryPublicRouter);
app.use('/api/v1/blog', blogPublicRouter);

// ─── Admin routes (all require authentication) ────────────────────────────────
const adminRouter = express.Router();
adminRouter.use(authMiddleware);
adminRouter.use('/leads', leadsAdminRouter);
adminRouter.use('/blog-categories', blogCategoryAdminRouter);
adminRouter.use('/blog', blogAdminRouter);
adminRouter.use('/dashboard', dashboardRoutes);

app.use('/api/v1/admin', adminRouter);

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ─── Central error handler (must be last) ────────────────────────────────────
app.use(errorMiddleware);

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = env.PORT;
// The leads table's UTM/GCLID columns now come from drizzle migrations
// (0003_add_utm_gclid_tracking) rather than DDL on boot — see `npm run migrate`.
app.listen(PORT, () => {
  logger.info(`TSL API Backend running on port ${PORT} [${env.NODE_ENV}]`);
});

export default app;
