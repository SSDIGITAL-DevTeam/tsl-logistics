import { randomUUID } from 'crypto';
import {
  mysqlTable,
  varchar,
  text,
  longtext,
  timestamp,
  mysqlEnum,
  int,
  index,
} from 'drizzle-orm/mysql-core';

const uuid = () =>
  varchar('id', { length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => randomUUID());

const timestamps = () => ({
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const users = mysqlTable('users', {
  ...{ id: uuid() },
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('admin'),
  refreshToken: text('refresh_token'),
  status: mysqlEnum('status', ['active', 'inactive']).notNull().default('active'),
  ...timestamps(),
});

export const blogCategories = mysqlTable('blog_categories', {
  ...{ id: uuid() },
  name: varchar('name', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  ...timestamps(),
});

export const blogPosts = mysqlTable(
  'blog_posts',
  {
    ...{ id: uuid() },
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    excerpt: varchar('excerpt', { length: 500 }),
    content: longtext('content').notNull(),
    coverImage: varchar('cover_image', { length: 500 }),
    categoryId: varchar('category_id', { length: 36 }).references(
      () => blogCategories.id,
      { onDelete: 'restrict' }
    ),
    authorId: varchar('author_id', { length: 36 }).references(() => users.id, {
      onDelete: 'set null',
    }),
    status: mysqlEnum('status', ['draft', 'published', 'archived'])
      .notNull()
      .default('draft'),
    metaTitle: varchar('meta_title', { length: 255 }),
    metaDescription: varchar('meta_description', { length: 320 }),
    ogImage: varchar('og_image', { length: 500 }),
    readingTime: int('reading_time'),
    publishedAt: timestamp('published_at'),
    ...timestamps(),
  },
  (table) => [
    index('idx_blog_posts_status').on(table.status),
    index('idx_blog_posts_status_published').on(table.status, table.publishedAt),
    index('idx_blog_posts_category').on(table.categoryId),
  ]
);

export const leads = mysqlTable(
  'leads',
  {
    ...{ id: uuid() },
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 50 }).notNull(),
    enquiry: varchar('enquiry', { length: 255 }),
    message: text('message'),
    source: varchar('source', { length: 100 }).notNull(),
    pagePath: varchar('page_path', { length: 255 }),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: varchar('user_agent', { length: 255 }),
    ...timestamps(),
  },
  (table) => [
    index('idx_leads_source').on(table.source),
    index('idx_leads_created_at').on(table.createdAt),
  ]
);

export const passwordResets = mysqlTable(
  'password_resets',
  {
    ...{ id: uuid() },
    email: varchar('email', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [index('idx_password_resets_token').on(table.token)]
);
