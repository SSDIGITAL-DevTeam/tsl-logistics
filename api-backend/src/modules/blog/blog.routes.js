import { Router } from 'express';
import { validateQuery } from '../../middleware/validate.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { uploadImage } from '../../middleware/upload.middleware.js';
import { listPostsQuerySchema, createPostSchema, updatePostSchema } from './blog.schema.js';
import {
  getPublishedPosts,
  getSlugList,
  getPublishedPostBySlug,
  getAdminPosts,
  getAdminPostById,
  createPost,
  updatePost,
  deletePost,
  uploadContentImage,
} from './blog.controller.js';

// Public router — mounted at /api/v1/blog
export const blogPublicRouter = Router();
blogPublicRouter.get('/', validateQuery(listPostsQuerySchema), getPublishedPosts);
blogPublicRouter.get('/slugs', getSlugList);
blogPublicRouter.get('/:slug', getPublishedPostBySlug);

// Admin router — mounted at /api/v1/admin/blog (auth in index.js)
export const blogAdminRouter = Router();
blogAdminRouter.get('/', validateQuery(listPostsQuerySchema), getAdminPosts);
blogAdminRouter.post('/', uploadImage.single('coverImage'), validate(createPostSchema), createPost);
blogAdminRouter.get('/:id', getAdminPostById);
blogAdminRouter.put('/:id', uploadImage.single('coverImage'), validate(updatePostSchema), updatePost);
blogAdminRouter.delete('/:id', deletePost);
blogAdminRouter.post('/upload-image', uploadImage.single('image'), uploadContentImage);
