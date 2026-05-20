import { Router } from 'express';
import { leadsRateLimit } from '../../middleware/rate-limit.middleware.js';
import { validate, validateQuery } from '../../middleware/validate.middleware.js';
import { createLeadSchema, listLeadsQuerySchema } from './leads.schema.js';
import { createLead, listLeads, exportLeads, getLeadSources } from './leads.controller.js';

// Public router — mounted at /api/v1/leads
export const leadsPublicRouter = Router();
leadsPublicRouter.post('/', leadsRateLimit, validate(createLeadSchema), createLead);

// Admin router — mounted at /api/v1/admin/leads (auth applied in index.js)
export const leadsAdminRouter = Router();
leadsAdminRouter.get('/', validateQuery(listLeadsQuerySchema), listLeads);
leadsAdminRouter.get('/export', validateQuery(listLeadsQuerySchema), exportLeads);
leadsAdminRouter.get('/sources', getLeadSources);
