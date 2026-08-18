import { eq, desc } from 'drizzle-orm';
import { db } from '../../../drizzle/db.js';
import { blogCategories } from '../../../drizzle/schema.js';

export async function findAllCategories() {
  return db.select().from(blogCategories).orderBy(desc(blogCategories.createdAt));
}

export async function findCategoryById(id) {
  const [row] = await db.select().from(blogCategories).where(eq(blogCategories.id, id)).limit(1);
  return row ?? null;
}

export async function findCategoryBySlug(slug) {
  const [row] = await db.select().from(blogCategories).where(eq(blogCategories.slug, slug)).limit(1);
  return row ?? null;
}

export async function insertCategory(data) {
  await db.insert(blogCategories).values(data);
  return findCategoryBySlug(data.slug);
}

export async function updateCategory(id, data) {
  await db.update(blogCategories).set({ ...data, updatedAt: new Date() }).where(eq(blogCategories.id, id));
  return findCategoryById(id);
}

export async function deleteCategory(id) {
  await db.delete(blogCategories).where(eq(blogCategories.id, id));
}
