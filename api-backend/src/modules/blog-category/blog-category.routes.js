import { Router } from 'express';
import { validate } from '../../middleware/validate.middleware.js';
import { createCategorySchema, updateCategorySchema } from './blog-category.schema.js';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from './blog-category.controller.js';

// Public router — mounted at /api/v1/blog-categories
export const blogCategoryPublicRouter = Router();
blogCategoryPublicRouter.get('/', getCategories);

// Admin router — mounted at /api/v1/admin/blog-categories (auth in index.js)
export const blogCategoryAdminRouter = Router();
blogCategoryAdminRouter.get('/', getCategories);
blogCategoryAdminRouter.post('/', validate(createCategorySchema), createCategory);
blogCategoryAdminRouter.put('/:id', validate(updateCategorySchema), updateCategory);
blogCategoryAdminRouter.delete('/:id', deleteCategory);
