const API_URL = process.env.TSL_API_URL || 'https://api.tsllogistics.sg';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  categoryId: string | null;
  categoryName: string | null;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  readingTime: number | null;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  updatedAt: string;
}

export interface BlogSlug {
  slug: string;
  updatedAt: string;
}

export interface PaginatedPosts {
  rows: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  if (!API_URL) throw new Error('TSL_API_URL not configured');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    return await fetch(`${API_URL}${path}`, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function getBlogPosts(opts?: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<PaginatedPosts> {
  const qs = new URLSearchParams({
    page: String(opts?.page ?? 1),
    limit: String(opts?.limit ?? 9),
    ...(opts?.category ? { category: opts.category } : {}),
  });
  try {
    const res = await apiFetch(`/api/v1/blog?${qs}`, { cache: 'no-store' } as RequestInit);
    if (!res.ok) return { rows: [], total: 0, page: 1, limit: 9, totalPages: 0 };
    return res.json();
  } catch {
    return { rows: [], total: 0, page: 1, limit: 9, totalPages: 0 };
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await apiFetch(`/api/v1/blog/${slug}`, { cache: 'no-store' } as RequestInit);
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getBlogSlugs(): Promise<BlogSlug[]> {
  try {
    const res = await apiFetch('/api/v1/blog/slugs', { cache: 'no-store' } as RequestInit);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
