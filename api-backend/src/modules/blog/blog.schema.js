import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().max(500).optional(),
  categoryId: z.string().uuid().optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  metaTitle: z.string().max(255).optional(),
  metaDescription: z.string().max(320).optional(),
  ogImage: z.string().max(500).optional(),
  slug: z.string().max(255).optional(), // auto-generated if omitted
  publishedAt: z.string().datetime().optional().nullable(),
});

export const updatePostSchema = createPostSchema.partial();

export const listPostsQuerySchema = z.object({
  page: z.string().optional().default('1').transform(Number),
  limit: z.string().optional().default('10').transform(Number),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  category: z.string().optional(),
  q: z.string().optional(),
});
