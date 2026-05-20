import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../lib/api';
import { Button } from '../components/ui/Button';
import { Badge, statusToBadgeVariant } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { BlogEditor } from './BlogEditor';
import type { BlogPost, PaginatedResponse } from '../types';
import dayjs from 'dayjs';

export function BlogListPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editId, setEditId] = useState<string | undefined>();
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; title: string } | null>(null);

  const params = new URLSearchParams({
    page: String(page),
    limit: '10',
    ...(statusFilter ? { status: statusFilter } : {}),
  });

  const { data, isLoading } = useQuery<PaginatedResponse<BlogPost>>({
    queryKey: ['admin-posts', page, statusFilter],
    queryFn: () => api.get(`/api/v1/admin/blog?${params}`).then((r) => r.data),
  });

  const { mutate: deletePost, isPending: deleting } = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/admin/blog/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-posts'] });
      toast.success('Post deleted');
      setConfirmDelete(null);
    },
    onError: () => toast.error('Failed to delete post'),
  });

  const openCreate = () => { setEditId(undefined); setEditorOpen(true); };
  const openEdit = (id: string) => { setEditId(id); setEditorOpen(true); };
  const closeEditor = () => { setEditorOpen(false); setEditId(undefined); };

  const statusFilters = [
    { value: '', label: 'All' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' },
  ];

  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
            <p className="text-sm text-gray-400 mt-0.5">Create and manage blog content</p>
          </div>
          <Button size="sm" onClick={openCreate}>
            <Plus className="h-3.5 w-3.5" /> New Post
          </Button>
        </div>

        {/* Status filter */}
        <div className="flex gap-1.5 flex-wrap">
          {statusFilters.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => { setStatusFilter(value); setPage(1); }}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                statusFilter === value
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-gray-500 ring-1 ring-inset ring-gray-200 hover:ring-gray-300 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  {['Title', 'Category', 'Status', 'Published', 'Actions'].map((h) => (
                    <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400 ${
                      ['Status', 'Published', 'Actions'].includes(h) ? 'text-center' : 'text-left'
                    }`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {[...Array(5)].map((_, j) => (
                        <td key={j} className="px-4 py-3.5">
                          <div className="h-3.5 rounded-lg bg-gray-100" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : data?.rows?.length ? (
                  data.rows.map((post) => (
                    <tr key={post.id} className="hover:bg-amber-50/20 transition-colors">
                      <td className="px-4 py-3.5">
                        <p className="text-sm font-semibold text-gray-900 max-w-72 truncate">{post.title}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">/{post.slug}</p>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-500">{post.categoryName || '—'}</td>
                      <td className="px-4 py-3.5 text-center">
                        <Badge variant={statusToBadgeVariant(post.status)}>{post.status}</Badge>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-400 text-center">
                        {post.publishedAt ? dayjs(post.publishedAt).format('DD MMM YYYY') : '—'}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-center gap-1">
                          <Button size="sm" variant="ghost" title="Edit" onClick={() => openEdit(post.id)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            title="Delete"
                            onClick={() => setConfirmDelete({ id: post.id, title: post.title })}
                            className="text-red-400 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-14 text-center text-sm text-gray-400">
                      No posts yet.{' '}
                      <button onClick={openCreate} className="text-primary hover:underline font-medium">
                        Create your first post
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-50 px-4 py-3">
              <p className="text-xs text-gray-400">
                {(page - 1) * 10 + 1}–{Math.min(page * 10, data.total)} of {data.total} posts
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                  Previous
                </Button>
                <Button size="sm" variant="secondary" disabled={page >= data.totalPages} onClick={() => setPage((p) => p + 1)}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal open={editorOpen} onClose={closeEditor} title={editId ? 'Edit Post' : 'New Post'} size="5xl">
        <BlogEditor id={editId} onClose={closeEditor} />
      </Modal>

      <ConfirmModal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => confirmDelete && deletePost(confirmDelete.id)}
        title="Delete post?"
        message={confirmDelete ? `"${confirmDelete.title}" will be permanently deleted. This action cannot be undone.` : ''}
        confirmLabel="Delete"
        isPending={deleting}
      />
    </>
  );
}
