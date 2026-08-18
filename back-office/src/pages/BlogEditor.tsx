import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import api, { assetUrl } from '../lib/api';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { RichTextEditor } from '../components/RichTextEditor';
import type { BlogCategory, BlogPost } from '../types';

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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

interface Props {
  id?: string;
  onClose: () => void;
}

export function BlogEditor({ id, onClose }: Props) {
  const isEdit = !!id;
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

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'draft', content: '' },
  });

  const titleValue = watch('title');

  // Auto-generate slug from title (both creating and editing)
  useEffect(() => {
    setValue('slug', slugify(titleValue || ''), { shouldValidate: false, shouldDirty: true });
  }, [titleValue, setValue]);

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
      if (post.coverImage) setCoverPreview(assetUrl(post.coverImage));
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
      if (isEdit) {
        qc.invalidateQueries({ queryKey: ['admin-post', id] });
      }
      toast.success(isEdit ? 'Post updated' : 'Post created');
      onClose();
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || 'Failed to save post'),
  });

  const onCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  if (isEdit && loadingPost) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#C8A84B] border-t-transparent" />
      </div>
    );
  }

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' },
  ];

  const categoryOptions = [
    { value: '', label: 'No Category' },
    ...(categories?.map((c) => ({ value: c.id, label: c.name })) ?? []),
  ];

  return (
    <form onSubmit={handleSubmit((d) => save.mutate(d))} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
            <Input label="Title *" placeholder="Post title…" error={errors.title?.message} {...register('title')} />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Slug <span className="text-xs text-gray-400 font-normal">(auto-generated)</span>
              </label>
              <input
                readOnly
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
                {...register('slug')}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Excerpt</label>
              <textarea
                rows={2}
                placeholder="Short description for listings and SEO…"
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
                  <RichTextEditor value={field.value} onChange={field.onChange} />
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
                placeholder="Search engine description (max 320 chars)…"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
                {...register('metaDescription')}
              />
            </div>
            <Input label="OG Image URL (optional override)" placeholder="https://…" {...register('ogImage')} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish */}
          <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  label="Status"
                  value={field.value}
                  onChange={field.onChange}
                  options={statusOptions}
                />
              )}
            />
          </div>

          {/* Category */}
          <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  label="Category"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  options={categoryOptions}
                />
              )}
            />
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

      <div className="flex justify-end pt-2">
        <Button type="submit" loading={isSubmitting || save.isPending}>
          <Save className="h-4 w-4" />
          {isEdit ? 'Update Post' : 'Save Post'}
        </Button>
      </div>
    </form>
  );
}
