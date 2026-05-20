import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download, Search, Filter, X } from 'lucide-react';
import api from '../lib/api';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import type { Lead, PaginatedResponse } from '../types';
import dayjs from 'dayjs';

const SOURCE_COLORS: Record<string, 'gold' | 'info' | 'success' | 'warning'> = {};
const palette = ['gold', 'info', 'success', 'warning'] as const;
let colorIdx = 0;
function getSourceColor(source: string) {
  if (!SOURCE_COLORS[source]) {
    SOURCE_COLORS[source] = palette[colorIdx++ % palette.length];
  }
  return SOURCE_COLORS[source];
}

interface Filters { q: string; source: string; dateFrom: string; dateTo: string; }

export function LeadsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({ q: '', source: '', dateFrom: '', dateTo: '' });
  const [draft, setDraft] = useState<Filters>(filters);

  const params = new URLSearchParams({ page: String(page), limit: '20', ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v)) });

  const { data, isLoading } = useQuery<PaginatedResponse<Lead>>({
    queryKey: ['leads', page, filters],
    queryFn: () => api.get(`/api/v1/admin/leads?${params}`).then((r) => r.data),
  });

  const { data: sources } = useQuery<{ source: string }[]>({
    queryKey: ['lead-sources'],
    queryFn: () => api.get('/api/v1/admin/leads/sources').then((r) => r.data),
  });

  const applyFilters = () => { setFilters(draft); setPage(1); };
  const clearFilters = () => { const empty = { q: '', source: '', dateFrom: '', dateTo: '' }; setDraft(empty); setFilters(empty); setPage(1); };

  const exportCsv = async () => {
    const exportParams = new URLSearchParams(Object.fromEntries(Object.entries(filters).filter(([, v]) => v)));
    const res = await api.get(`/api/v1/admin/leads/export?${exportParams}`, { responseType: 'blob' });
    const url = URL.createObjectURL(res.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${dayjs().format('YYYY-MM-DD')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <Button variant="secondary" size="sm" onClick={exportCsv}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search name, email..."
              value={draft.q}
              onChange={(e) => setDraft((d) => ({ ...d, q: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
            />
          </div>
          <Select
            value={draft.source}
            onChange={(v) => setDraft((d) => ({ ...d, source: v }))}
            placeholder="All Sources"
            options={[
              { value: '', label: 'All Sources' },
              ...(sources?.map(({ source }) => ({ value: source, label: source })) ?? []),
            ]}
          />
          <input
            type="date"
            value={draft.dateFrom}
            onChange={(e) => setDraft((d) => ({ ...d, dateFrom: e.target.value }))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
          />
          <input
            type="date"
            value={draft.dateTo}
            onChange={(e) => setDraft((d) => ({ ...d, dateTo: e.target.value }))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
          />
        </div>
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={applyFilters}>
            <Filter className="h-3 w-3" /> Apply
          </Button>
          {hasFilters && (
            <Button size="sm" variant="ghost" onClick={clearFilters}>
              <X className="h-3 w-3" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="bg-gray-50">
                {['Name', 'Email', 'Phone', 'Enquiry', 'Source', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 rounded bg-gray-200" /></td>
                    ))}
                  </tr>
                ))
              ) : data?.rows?.length ? (
                data.rows.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{lead.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{lead.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{lead.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 max-w-[200px] truncate">{lead.enquiry || '—'}</td>
                    <td className="px-4 py-3">
                      <Badge variant={getSourceColor(lead.source)}>{lead.source}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{dayjs(lead.createdAt).format('DD MMM YYYY')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">No leads found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-sm text-gray-500">
              {(page - 1) * 20 + 1}–{Math.min(page * 20, data.total)} of {data.total}
            </p>
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
