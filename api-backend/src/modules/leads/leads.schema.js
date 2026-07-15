import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const createLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(255)
    .regex(/^[\p{L}][\p{L}\s'.-]*$/u, "Name may only contain letters, spaces, and ' - ."),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z
    .string()
    .trim()
    .refine((v) => isValidPhoneNumber(v), 'Invalid phone number'),
  enquiry: z.string().max(255).optional(),
  message: z.string().max(5000).optional(),
  notes: z.string().max(5000).optional(),
  source: z.string().min(1, 'Source is required').max(100),
  pagePath: z.string().max(255).optional(),
  // Honeypot — must be empty
  _h: z.string().max(0, 'Bot detected').optional(),
});

export const listLeadsQuerySchema = z.object({
  page: z.string().optional().default('1').transform(Number),
  limit: z.string().optional().default('20').transform(Number),
  q: z.string().optional(),
  source: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});
