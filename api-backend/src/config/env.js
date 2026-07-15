import { z } from 'zod';

// Accepts a bare email or nodemailer's "Display Name <email>" format.
const emailOrNamedEmail = z
  .string()
  .refine(
    (v) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(v) || /^[^<>]+<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$/.test(v),
    { message: 'Must be a valid email or "Name <email>" format' },
  );

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z
    .string()
    .default('3000')
    .transform((v) => parseInt(v, 10)),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  ACCESS_TOKEN_SECRET: z.string().min(20, 'ACCESS_TOKEN_SECRET must be at least 20 chars'),
  REFRESH_TOKEN_SECRET: z.string().min(20, 'REFRESH_TOKEN_SECRET must be at least 20 chars'),
  ACCESS_TOKEN_TTL: z.string().default('15m'),
  REFRESH_TOKEN_TTL: z.string().default('7d'),
  COOKIE_DOMAIN: z.string().optional(),
  ORIGIN: z.string().default('http://localhost:3000,http://localhost:5173'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : undefined)),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((v) => v === 'true'),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM: emailOrNamedEmail.default('no-reply@tsl-logistics.com'),
  LEAD_NOTIFY_TO: z.string().email().optional(),
  LEAD_NOTIFY_TSL_LOGISTICS: z.string().email().default('sales@tsllogistics.sg'),
  LEAD_NOTIFY_TSL_MOVER: z.string().email().default('ops@tslmovers.sg'),
  LEAD_NOTIFY_TSL_EXPRESS: z.string().email().default('ops@tslexpress.sg'),
  RESET_LINK_URL: z
    .string()
    .url()
    .default('http://localhost:5173/reset-password'),
  UPLOAD_DIR: z.string().default('./uploads'),
  RECAPTCHA_SECRET: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  for (const [key, errors] of Object.entries(parsed.error.flatten().fieldErrors)) {
    console.error(`  ${key}: ${errors.join(', ')}`);
  }
  process.exit(1);
}

export const env = parsed.data;
