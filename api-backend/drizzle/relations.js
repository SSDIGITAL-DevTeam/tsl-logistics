import { relations } from 'drizzle-orm';
import { users, blogCategories, blogPosts } from './schema.js';

export const usersRelations = relations(users, ({ many }) => ({
  blogPosts: many(blogPosts),
}));

export const blogCategoriesRelations = relations(blogCategories, ({ many }) => ({
  blogPosts: many(blogPosts),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  category: one(blogCategories, {
    fields: [blogPosts.categoryId],
    references: [blogCategories.id],
  }),
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}));
