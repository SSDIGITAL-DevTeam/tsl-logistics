import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import type { BlogCategory } from '../types';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function CategoriesPage() {
  const qc = useQueryClient();
  const [editTarget, setEditTarget] = useState<BlogCategory | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data: categories, isLoading } = useQuery<BlogCategory[]>({
    queryKey: ['admin-categories'],
    queryFn: () => api.get('/api/v1/admin/blog-categories').then((r) => r.data),
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const openCreate = () => { setEditTarget(null); reset({ name: '', description: '' }); setShowModal(true); };
  const openEdit = (cat: BlogCategory) => { setEditTarget(cat); reset({ name: cat.name, description: cat.description ?? '' }); setShowModal(true); };

  const save = useMutation({
    mutationFn: (data: FormData) =>
      editTarget
        ? api.put(`/api/v1/admin/blog-categories/${editTarget.id}`, data)
        : api.post('/api/v1/admin/blog-categories', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-categories'] }); qc.invalidateQueries({ queryKey: ['categories'] }); setShowModal(false); },
  });

  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/admin/blog-categories/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-categories'] }),
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Blog Categories</h1>
        <Button size="sm" onClick={openCreate}><Plus className="h-4 w-4" /> Add Category</Button>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="h-10 rounded bg-gray-100 animate-pulse" />)}
          </div>
        ) : categories?.length ? (
          <ul className="divide-y divide-gray-50">
            {categories.map((cat) => (
              <li key={cat.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                  <p className="text-xs text-gray-400">/{cat.slug}</p>
                  {cat.description && <p className="mt-0.5 text-xs text-gray-500">{cat.description}</p>}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => openEdit(cat)}><Pencil className="h-4 w-4" /></Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      if (window.confirm(`Delete category "${cat.name}"?`)) del.mutate(cat.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-12 text-center text-sm text-gray-400">No categories yet.</p>
        )}
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editTarget ? 'Edit Category' : 'New Category'}
      >
        <form onSubmit={handleSubmit((d) => save.mutate(d))} className="space-y-4">
          <Input label="Name *" error={errors.name?.message} {...register('name')} />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={2}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
              {...register('description')}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" loading={isSubmitting || save.isPending}>
              {editTarget ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
