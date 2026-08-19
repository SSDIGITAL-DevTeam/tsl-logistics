export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  enquiry: string | null;
  message: string | null;
  notes: string | null;
  source: string;
  pagePath: string | null;
  ipAddress: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  gclid: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  rows: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  status: 'draft' | 'published' | 'archived';
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  readingTime: number | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  categoryId: string | null;
  categoryName: string | null;
  authorId: string | null;
  content?: string;
}

export interface DashboardStats {
  totalLeads: number;
  totalPosts: number;
  leadsBySource: { source: string; count: number }[];
  postsByStatus: { status: string; count: number }[];
  recentLeads: Pick<Lead, 'id' | 'name' | 'email' | 'source' | 'createdAt'>[];
}
