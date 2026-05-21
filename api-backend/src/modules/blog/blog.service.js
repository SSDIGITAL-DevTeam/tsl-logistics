import { randomUUID } from 'crypto';
import path from 'path';
import fs from 'fs/promises';
import {
  findPublishedPosts,
  findPublishedPostBySlug,
  findAllSlugs,
  findAdminPosts,
  findPostById,
  findPostBySlug,
  insertPost,
  updatePost,
  deletePost,
} from './blog.repository.js';
import { slugify } from '../../utils/slugify.js';
import { uploadDir } from '../../config/uploads.js';

export async function getPublishedPostsService(query) {
  return findPublishedPosts(query);
}

export async function getPublishedPostBySlugService(slug) {
  const post = await findPublishedPostBySlug(slug);
  if (!post) throw Object.assign(new Error('Post not found'), { status: 404 });
  return post;
}

export async function getSlugListService() {
  return findAllSlugs();
}

export async function getAdminPostsService(query) {
  return findAdminPosts(query);
}

export async function getAdminPostByIdService(id) {
  const post = await findPostById(id);
  if (!post) throw Object.assign(new Error('Post not found'), { status: 404 });
  return post;
}

export async function createPostService(data, authorId, coverImageFile) {
  const slug = await resolveUniqueSlug(data.slug || data.title);

  const readingTime = estimateReadingTime(data.content);
  const id = randomUUID();
  const coverImage = coverImageFile ? buildImageUrl(coverImageFile.filename) : null;
  const publishedAt = data.status === 'published' ? (data.publishedAt ? new Date(data.publishedAt) : new Date()) : null;

  return insertPost({
    id,
    title: data.title.trim(),
    slug,
    excerpt: data.excerpt?.trim() || null,
    content: data.content,
    coverImage,
    categoryId: data.categoryId || null,
    authorId,
    status: data.status ?? 'draft',
    metaTitle: data.metaTitle?.trim() || null,
    metaDescription: data.metaDescription?.trim() || null,
    ogImage: data.ogImage?.trim() || null,
    readingTime,
    publishedAt,
  });
}

export async function updatePostService(id, data, coverImageFile) {
  const existing = await findPostById(id);
  if (!existing) throw Object.assign(new Error('Post not found'), { status: 404 });

  const updates = {};

  if (data.title !== undefined) {
    updates.title = data.title.trim();
    // Re-slug only if title changed and no explicit slug given
    if (!data.slug) updates.slug = await resolveUniqueSlug(data.title, id);
  }
  if (data.slug !== undefined) updates.slug = await resolveUniqueSlug(data.slug, id);
  if (data.content !== undefined) {
    updates.content = data.content;
    updates.readingTime = estimateReadingTime(data.content);
  }
  if (data.excerpt !== undefined) updates.excerpt = data.excerpt?.trim() || null;
  if (data.categoryId !== undefined) updates.categoryId = data.categoryId || null;
  if (data.metaTitle !== undefined) updates.metaTitle = data.metaTitle?.trim() || null;
  if (data.metaDescription !== undefined) updates.metaDescription = data.metaDescription?.trim() || null;
  if (data.ogImage !== undefined) updates.ogImage = data.ogImage?.trim() || null;

  if (coverImageFile) {
    updates.coverImage = buildImageUrl(coverImageFile.filename);
    // Delete old cover image file if it was one of our uploads
    if (existing.coverImage) await deleteUploadedFile(existing.coverImage);
  }

  if (data.status !== undefined) {
    updates.status = data.status;
    if (data.status === 'published' && !existing.publishedAt) {
      updates.publishedAt = data.publishedAt ? new Date(data.publishedAt) : new Date();
    }
  }

  return updatePost(id, updates);
}

export async function deletePostService(id) {
  const existing = await findPostById(id);
  if (!existing) throw Object.assign(new Error('Post not found'), { status: 404 });

  if (existing.coverImage) await deleteUploadedFile(existing.coverImage);
  await deletePost(id);
}

export function buildImageUrl(filename) {
  return `/uploads/${filename}`;
}

async function resolveUniqueSlug(titleOrSlug, excludeId) {
  let base = slugify(titleOrSlug);
  let slug = base;
  let i = 1;

  while (true) {
    const existing = await findPostBySlug(slug);
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${i++}`;
  }
}

function estimateReadingTime(htmlContent) {
  const text = htmlContent.replace(/<[^>]+>/g, ' ');
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

async function deleteUploadedFile(imageUrl) {
  try {
    const filename = path.basename(imageUrl);
    await fs.unlink(path.join(uploadDir, filename));
  } catch {
    // Non-critical: file may already be gone
  }
}
