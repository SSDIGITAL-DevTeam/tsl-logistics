import { and, desc, eq, like, or, sql } from 'drizzle-orm';
import { db } from '../../../drizzle/db.js';
import { blogPosts, blogCategories, users } from '../../../drizzle/schema.js';

const postWithRelations = {
  id: blogPosts.id,
  title: blogPosts.title,
  slug: blogPosts.slug,
  excerpt: blogPosts.excerpt,
  coverImage: blogPosts.coverImage,
  status: blogPosts.status,
  metaTitle: blogPosts.metaTitle,
  metaDescription: blogPosts.metaDescription,
  ogImage: blogPosts.ogImage,
  readingTime: blogPosts.readingTime,
  publishedAt: blogPosts.publishedAt,
  createdAt: blogPosts.createdAt,
  updatedAt: blogPosts.updatedAt,
  categoryId: blogPosts.categoryId,
  authorId: blogPosts.authorId,
};

export async function findPublishedPosts({ page = 1, limit = 10, category, q }) {
  const offset = (page - 1) * limit;
  const where = buildPublicWhere({ category, q });

  const [rows, [{ count }]] = await Promise.all([
    db
      .select({
        ...postWithRelations,
        categoryName: blogCategories.name,
        categorySlug: blogCategories.slug,
      })
      .from(blogPosts)
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(where)
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(blogPosts)
      .where(where),
  ]);

  return { rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
}

export async function findPublishedPostBySlug(slug) {
  const [row] = await db
    .select({
      ...postWithRelations,
      content: blogPosts.content,
      categoryName: blogCategories.name,
      categorySlug: blogCategories.slug,
      authorName: users.name,
    })
    .from(blogPosts)
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, 'published')))
    .limit(1);

  return row ?? null;
}

export async function findAllSlugs() {
  return db
    .select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt })
    .from(blogPosts)
    .where(eq(blogPosts.status, 'published'))
    .orderBy(desc(blogPosts.publishedAt));
}

export async function findAdminPosts({ page = 1, limit = 10, status, category, q }) {
  const offset = (page - 1) * limit;
  const where = buildAdminWhere({ status, category, q });

  const [rows, [{ count }]] = await Promise.all([
    db
      .select({
        ...postWithRelations,
        categoryName: blogCategories.name,
      })
      .from(blogPosts)
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(where)
      .orderBy(desc(blogPosts.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(blogPosts)
      .where(where),
  ]);

  return { rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
}

export async function findPostById(id) {
  const [row] = await db
    .select({
      ...postWithRelations,
      content: blogPosts.content,
      categoryName: blogCategories.name,
    })
    .from(blogPosts)
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(eq(blogPosts.id, id))
    .limit(1);

  return row ?? null;
}

export async function findPostBySlug(slug) {
  const [row] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return row ?? null;
}

export async function insertPost(data) {
  await db.insert(blogPosts).values(data);
  return findPostById(data.id);
}

export async function updatePost(id, data) {
  await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
  return findPostById(id);
}

export async function deletePost(id) {
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

function buildPublicWhere({ category, q }) {
  const conditions = [eq(blogPosts.status, 'published')];
  if (category) conditions.push(eq(blogCategories.slug, category));
  if (q) conditions.push(or(like(blogPosts.title, `%${q}%`), like(blogPosts.excerpt, `%${q}%`)));
  return and(...conditions);
}

function buildAdminWhere({ status, category, q }) {
  const conditions = [];
  if (status) conditions.push(eq(blogPosts.status, status));
  if (category) conditions.push(eq(blogCategories.slug, category));
  if (q) conditions.push(or(like(blogPosts.title, `%${q}%`), like(blogPosts.excerpt, `%${q}%`)));
  return conditions.length > 0 ? and(...conditions) : undefined;
}
