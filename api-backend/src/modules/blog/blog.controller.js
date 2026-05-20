import { asyncHandler } from '../../utils/async-handler.js';
import {
  getPublishedPostsService,
  getPublishedPostBySlugService,
  getSlugListService,
  getAdminPostsService,
  getAdminPostByIdService,
  createPostService,
  updatePostService,
  deletePostService,
} from './blog.service.js';

// Public
export const getPublishedPosts = asyncHandler(async (req, res) => {
  const result = await getPublishedPostsService(req.query);
  res.json(result);
});

export const getSlugList = asyncHandler(async (req, res) => {
  const slugs = await getSlugListService();
  res.json(slugs);
});

export const getPublishedPostBySlug = asyncHandler(async (req, res) => {
  const post = await getPublishedPostBySlugService(req.params.slug);
  res.json(post);
});

// Admin
export const getAdminPosts = asyncHandler(async (req, res) => {
  const result = await getAdminPostsService(req.query);
  res.json(result);
});

export const getAdminPostById = asyncHandler(async (req, res) => {
  const post = await getAdminPostByIdService(req.params.id);
  res.json(post);
});

export const createPost = asyncHandler(async (req, res) => {
  const post = await createPostService(req.body, req.user.id, req.file);
  res.status(201).json(post);
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await updatePostService(req.params.id, req.body, req.file);
  res.json(post);
});

export const deletePost = asyncHandler(async (req, res) => {
  await deletePostService(req.params.id);
  res.json({ message: 'Post deleted' });
});

export const uploadContentImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image provided' });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});
