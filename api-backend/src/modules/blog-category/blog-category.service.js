import {
  findAllCategories,
  findCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory,
} from './blog-category.repository.js';
import { slugify } from '../../utils/slugify.js';

export async function getCategoriesService() {
  return findAllCategories();
}

export async function createCategoryService({ name, description }) {
  const slug = slugify(name);
  return insertCategory({ name: name.trim(), slug, description: description?.trim() || null });
}

export async function updateCategoryService(id, data) {
  const existing = await findCategoryById(id);
  if (!existing) throw Object.assign(new Error('Category not found'), { status: 404 });

  const updates = {};
  if (data.name !== undefined) {
    updates.name = data.name.trim();
    updates.slug = slugify(data.name);
  }
  if (data.description !== undefined) updates.description = data.description?.trim() || null;

  return updateCategory(id, updates);
}

export async function deleteCategoryService(id) {
  const existing = await findCategoryById(id);
  if (!existing) throw Object.assign(new Error('Category not found'), { status: 404 });
  await deleteCategory(id);
}
