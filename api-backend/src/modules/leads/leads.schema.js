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
  // Attribution. The BFF (end-user/app/api/contact/route.ts) sends explicit
  // nulls rather than omitting absent params, so .nullable() is required —
  // .optional() alone would 400 every submission. Capped at 255 to match the
  // VARCHAR(255) columns; an over-long campaign name would otherwise 500.
  // gbraid/wbraid are the iOS 14.5+ replacements Google Ads sends instead of
  // gclid, so all three must be accepted to classify paid clicks correctly.
  utmSource: z.string().max(255).nullable().optional(),
  utmMedium: z.string().max(255).nullable().optional(),
  utmCampaign: z.string().max(255).nullable().optional(),
  gclid: z.string().max(255).nullable().optional(),
  gbraid: z.string().max(255).nullable().optional(),
  wbraid: z.string().max(255).nullable().optional(),
  // Honeypot — must be empty
  _h: z.string().max(0, 'Bot detected').optional(),
});

export const listLeadsQuerySchema = z.object({
  page: z.string().optional().default('1').transform(Number),
  limit: z.string().optional().default('20').transform(Number),
  q: z.string().optional(),
  source: z.string().optional(),
  channel: z.enum(['google-ads']).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});
