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

  const params = new URLSearchParams({ page: String(page), limit: '10', ...(statusFilter ? { status: statusFilter } : {}) });

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

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Blog Posts</h1>
          <Button size="sm" onClick={openCreate}>
            <Plus className="h-4 w-4" /> New Post
          </Button>
        </div>

        {/* Status filter */}
        <div className="flex gap-2 flex-wrap">
          {['', 'draft', 'published', 'archived'].map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                statusFilter === s
                  ? 'bg-[#C8A84B] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr className="bg-gray-50">
                  {['Title', 'Category', 'Status', 'Published', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {[...Array(5)].map((_, j) => (
                        <td key={j} className="px-4 py-3"><div className="h-4 rounded bg-gray-200" /></td>
                      ))}
                    </tr>
                  ))
                ) : data?.rows?.length ? (
                  data.rows.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900 max-w-[300px] truncate">{post.title}</p>
                        <p className="text-xs text-gray-400 truncate">/{post.slug}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{post.categoryName || '—'}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusToBadgeVariant(post.status)}>{post.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {post.publishedAt ? dayjs(post.publishedAt).format('DD MMM YYYY') : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" title="Edit" onClick={() => openEdit(post.id)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            title="Delete"
                            onClick={() => setConfirmDelete({ id: post.id, title: post.title })}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400">
                      No posts yet.{' '}
                      <button onClick={openCreate} className="text-[#C8A84B] hover:underline">Create your first post</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between border-t px-4 py-3">
              <p className="text-sm text-gray-500">{(page - 1) * 10 + 1}–{Math.min(page * 10, data.total)} of {data.total}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
                <Button size="sm" variant="secondary" disabled={page >= data.totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
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
