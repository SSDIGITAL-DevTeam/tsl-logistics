import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Eye, Upload } from 'lucide-react';
import api from '../lib/api';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { RichTextEditor } from '../components/RichTextEditor';
import type { BlogCategory, BlogPost } from '../types';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(10, 'Content is required'),
  categoryId: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  metaTitle: z.string().max(255).optional(),
  metaDescription: z.string().max(320).optional(),
  ogImage: z.string().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

export function BlogEditorPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>('');

  const { data: post, isLoading: loadingPost } = useQuery<BlogPost>({
    queryKey: ['admin-post', id],
    queryFn: () => api.get(`/api/v1/admin/blog/${id}`).then((r) => r.data),
    enabled: isEdit,
  });

  const { data: categories } = useQuery<BlogCategory[]>({
    queryKey: ['categories'],
    queryFn: () => api.get('/api/v1/admin/blog-categories').then((r) => r.data),
  });

  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'draft', content: '' },
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? '',
        content: post.content ?? '',
        categoryId: post.categoryId ?? '',
        status: post.status,
        metaTitle: post.metaTitle ?? '',
        metaDescription: post.metaDescription ?? '',
        ogImage: post.ogImage ?? '',
      });
      if (post.coverImage) setCoverPreview(`${import.meta.env.VITE_API_URL}${post.coverImage}`);
    }
  }, [post, reset]);

  const save = useMutation({
    mutationFn: async (data: FormData) => {
      const form = new FormData();
      Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== '') form.append(k, String(v)); });
      if (coverFile) form.append('coverImage', coverFile);

      if (isEdit) return api.put(`/api/v1/admin/blog/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      return api.post('/api/v1/admin/blog', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-posts'] });
      navigate('/blog');
    },
  });

  const onCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  if (isEdit && loadingPost) {
    return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#C8A84B] border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/blog')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Post' : 'New Post'}</h1>
      </div>

      <form onSubmit={handleSubmit((d) => save.mutate(d))} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
              <Input label="Title *" placeholder="Post title..." error={errors.title?.message} {...register('title')} />
              <Input label="Slug (auto-generated if blank)" placeholder="post-slug" {...register('slug')} />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Excerpt</label>
                <textarea
                  rows={2}
                  placeholder="Short description for listings and SEO..."
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
                  {...register('excerpt')}
                />
                {errors.excerpt && <p className="text-xs text-red-600">{errors.excerpt.message}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Content *</label>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.content && <p className="text-xs text-red-600">{errors.content.message}</p>}
              </div>
            </div>

            {/* SEO */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
              <h2 className="font-semibold text-gray-900">SEO</h2>
              <Input label="Meta Title" placeholder="Leave blank to use post title" {...register('metaTitle')} />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  rows={2}
                  placeholder="Search engine description (max 320 chars)..."
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
                  {...register('metaDescription')}
                />
              </div>
              <Input label="OG Image URL (optional override)" placeholder="https://..." {...register('ogImage')} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Publish */}
            <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 space-y-4">
              <h2 className="font-semibold text-gray-900">Publish</h2>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
                  {...register('status')}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <Button type="submit" loading={isSubmitting || save.isPending} className="w-full">
                <Save className="h-4 w-4" />
                {isEdit ? 'Update Post' : 'Save Post'}
              </Button>
            </div>

            {/* Category */}
            <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
              <h2 className="mb-3 font-semibold text-gray-900">Category</h2>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
                {...register('categoryId')}
              >
                <option value="">No Category</option>
                {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            {/* Cover Image */}
            <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 space-y-3">
              <h2 className="font-semibold text-gray-900">Cover Image</h2>
              {coverPreview && (
                <img src={coverPreview} alt="Cover preview" className="w-full rounded-lg object-cover aspect-video" />
              )}
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 px-4 py-3 text-sm text-gray-500 hover:border-[#C8A84B] hover:text-[#C8A84B] transition-colors">
                <Upload className="h-4 w-4" />
                {coverPreview ? 'Change Image' : 'Upload Cover'}
                <input type="file" accept="image/*" className="hidden" onChange={onCoverChange} />
              </label>
            </div>
          </div>
        </div>

        {save.isError && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            Failed to save post. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}
