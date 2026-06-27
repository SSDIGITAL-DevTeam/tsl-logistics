import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download, Search, X } from 'lucide-react';
import api from '../lib/api';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import type { Lead, PaginatedResponse } from '../types';
import dayjs from 'dayjs';

const SOURCE_COLORS: Record<string, 'gold' | 'info' | 'success' | 'warning'> = {};
const palette = ['gold', 'info', 'success', 'warning'] as const;
let colorIdx = 0;
function getSourceColor(source: string) {
  if (!SOURCE_COLORS[source]) SOURCE_COLORS[source] = palette[colorIdx++ % palette.length];
  return SOURCE_COLORS[source];
}

interface Filters { q: string; source: string; dateFrom: string; dateTo: string; }

const inputCls =
  'rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary hover:border-gray-300 transition-colors w-full';

export function LeadsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState<Filters>({ q: '', source: '', dateFrom: '', dateTo: '' });
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Debounce text search by 400ms
  useEffect(() => {
    const t = setTimeout(() => {
      setFilters((f) => ({ ...f, q: searchInput }));
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const updateFilter = (key: keyof Omit<Filters, 'q'>, value: string) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  };

  const clearAll = () => {
    setSearchInput('');
    setFilters({ q: '', source: '', dateFrom: '', dateTo: '' });
    setPage(1);
  };

  const hasFilters = searchInput || filters.source || filters.dateFrom || filters.dateTo;

  const params = new URLSearchParams({
    page: String(page),
    limit: '20',
    ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v)),
  });

  const { data, isLoading } = useQuery<PaginatedResponse<Lead>>({
    queryKey: ['leads', page, filters],
    queryFn: () => api.get(`/api/v1/admin/leads?${params}`).then((r) => r.data),
  });

  const { data: sources } = useQuery<{ source: string }[]>({
    queryKey: ['lead-sources'],
    queryFn: () => api.get('/api/v1/admin/leads/sources').then((r) => r.data),
  });

  const exportCsv = async () => {
    const exportParams = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
    );
    const res = await api.get(`/api/v1/admin/leads/export?${exportParams}`, { responseType: 'blob' });
    const url = URL.createObjectURL(res.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${dayjs().format('YYYY-MM-DD')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-400 mt-0.5">All contact form submissions</p>
        </div>
        <Button variant="secondary" size="sm" onClick={exportCsv}>
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </Button>
      </div>

      {/* Filters — live, no submit needed */}
      <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              placeholder="Search name, email…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={`${inputCls} pl-9`}
            />
          </div>
          <Select
            value={filters.source}
            onChange={(v) => updateFilter('source', v)}
            placeholder="All Sources"
            options={[
              { value: '', label: 'All Sources' },
              ...(sources?.map(({ source }) => ({ value: source, label: source })) ?? []),
            ]}
          />
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => updateFilter('dateFrom', e.target.value)}
            className={inputCls}
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => updateFilter('dateTo', e.target.value)}
            className={inputCls}
          />
        </div>
        {hasFilters && (
          <div className="mt-3">
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="h-3 w-3" /> Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                {['Name', 'Email', 'Phone', 'Enquiry', 'Description', 'Source', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="px-4 py-3.5">
                        <div className="h-3.5 rounded-lg bg-gray-100" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : data?.rows?.length ? (
                data.rows.map((lead) => (
                  <tr key={lead.id} className="hover:bg-amber-50/20 transition-colors">
                    <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{lead.email}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{lead.phone}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-400 max-w-50 truncate">{lead.enquiry || '—'}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-500 max-w-64">
                      {lead.notes || lead.message ? (
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="max-w-64 truncate text-left text-[#9A7D2D] underline-offset-2 hover:underline"
                        >
                          {lead.notes || lead.message}
                        </button>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={getSourceColor(lead.source)}>{lead.source}</Badge>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-400">{dayjs(lead.createdAt).format('DD MMM YYYY')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-14 text-center text-sm text-gray-400">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-50 px-4 py-3">
            <p className="text-xs text-gray-400">
              {(page - 1) * 20 + 1}–{Math.min(page * 20, data.total)} of {data.total} leads
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
      <Modal
        open={Boolean(selectedLead)}
        onClose={() => setSelectedLead(null)}
        title="Lead Description"
        size="lg"
      >
        {selectedLead && (
          <div className="space-y-5">
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Name</p>
                <p className="mt-1 text-gray-900">{selectedLead.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Source</p>
                <p className="mt-1 text-gray-900">{selectedLead.source}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email</p>
                <p className="mt-1 text-gray-900">{selectedLead.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Phone</p>
                <p className="mt-1 text-gray-900">{selectedLead.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Description</p>
              <p className="mt-2 whitespace-pre-wrap rounded-xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
                {selectedLead.notes || selectedLead.message || 'No description provided.'}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
