import { asyncHandler } from '../../utils/async-handler.js';
import {
  getCategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from './blog-category.service.js';

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await getCategoriesService();
  res.json(categories);
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await createCategoryService(req.body);
  res.status(201).json(category);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await updateCategoryService(req.params.id, req.body);
  res.json(category);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  await deleteCategoryService(req.params.id);
  res.json({ message: 'Category deleted' });
});
