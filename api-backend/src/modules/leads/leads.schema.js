import { z } from 'zod';

export const createLeadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone is required').max(50),
  enquiry: z.string().max(255).optional(),
  message: z.string().max(5000).optional(),
  source: z.string().min(1, 'Source is required').max(100),
  pagePath: z.string().max(255).optional(),
  // Honeypot — must be empty
  website: z.string().max(0, 'Bot detected').optional(),
});

export const listLeadsQuerySchema = z.object({
  page: z.string().optional().default('1').transform(Number),
  limit: z.string().optional().default('20').transform(Number),
  q: z.string().optional(),
  source: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});
