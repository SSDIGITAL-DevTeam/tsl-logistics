import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import api from '../lib/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { ConfirmModal } from '../components/ui/ConfirmModal';
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
  const [confirmDelete, setConfirmDelete] = useState<BlogCategory | null>(null);

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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-categories'] });
      qc.invalidateQueries({ queryKey: ['categories'] });
      setShowModal(false);
      toast.success(editTarget ? 'Category updated' : 'Category created');
    },
    onError: () => toast.error('Failed to save category'),
  });

  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/admin/blog-categories/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-categories'] });
      toast.success('Category deleted');
      setConfirmDelete(null);
    },
    onError: () => toast.error('Failed to delete category'),
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Categories</h1>
          <p className="text-sm text-gray-400 mt-0.5">Organise posts by topic</p>
        </div>
        <Button size="sm" onClick={openCreate}>
          <Plus className="h-3.5 w-3.5" /> Add Category
        </Button>
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                {['Name', 'Slug', 'Description', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(4)].map((_, j) => (
                      <td key={j} className="px-4 py-3.5">
                        <div className="h-3.5 rounded-lg bg-gray-100" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : categories?.length ? (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-amber-50/20 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-semibold text-gray-900">{cat.name}</p>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-400 font-mono">/{cat.slug}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-500 max-w-72 truncate">
                      {cat.description || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(cat)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => setConfirmDelete(cat)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-14 text-center text-sm text-gray-400">
                    No categories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editTarget ? 'Edit Category' : 'New Category'}
      >
        <form onSubmit={handleSubmit((d) => save.mutate(d))} className="space-y-4">
          <Input label="Name *" error={errors.name?.message} {...register('name')} />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Description</label>
            <textarea
              rows={2}
              className="rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
              {...register('description')}
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" loading={isSubmitting || save.isPending}>
              {editTarget ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => confirmDelete && del.mutate(confirmDelete.id)}
        title="Delete category?"
        message={confirmDelete ? `"${confirmDelete.name}" will be permanently deleted. Posts using this category will be unaffected.` : ''}
        confirmLabel="Delete"
        isPending={del.isPending}
      />
    </div>
  );
}
