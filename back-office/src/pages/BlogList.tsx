import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import api from '../lib/api';
import { Button } from '../components/ui/Button';
import { Badge, statusToBadgeVariant } from '../components/ui/Badge';
import type { BlogPost, PaginatedResponse } from '../types';
import dayjs from 'dayjs';

export function BlogListPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const params = new URLSearchParams({ page: String(page), limit: '10', ...(statusFilter ? { status: statusFilter } : {}) });

  const { data, isLoading } = useQuery<PaginatedResponse<BlogPost>>({
    queryKey: ['admin-posts', page, statusFilter],
    queryFn: () => api.get(`/api/v1/admin/blog?${params}`).then((r) => r.data),
  });

  const { mutate: deletePost, isPending: deleting } = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/admin/blog/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-posts'] }),
  });

  const confirmDelete = (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) deletePost(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Link to="/blog/new">
          <Button size="sm">
            <Plus className="h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>

      {/* Status filter */}
      <div className="flex gap-2">
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
                        <Link to={`/blog/${post.id}/edit`}>
                          <Button size="sm" variant="ghost" title="Edit">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="ghost"
                          title="Delete"
                          onClick={() => confirmDelete(post.id, post.title)}
                          disabled={deleting}
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
                    <Link to="/blog/new" className="text-[#C8A84B] hover:underline">Create your first post</Link>
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
  );
}
