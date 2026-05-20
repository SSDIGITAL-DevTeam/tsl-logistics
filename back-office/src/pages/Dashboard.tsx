import { useQuery } from '@tanstack/react-query';
import { Users2, FileText, TrendingUp, Clock } from 'lucide-react';
import api from '../lib/api';
import { Badge, statusToBadgeVariant } from '../components/ui/Badge';
import type { DashboardStats } from '../types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function DashboardPage() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard'],
    queryFn: () => api.get('/api/v1/admin/dashboard').then((r) => r.data),
  });

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Leads" value={stats?.totalLeads ?? 0} icon={<Users2 className="h-5 w-5 text-[#C8A84B]" />} />
        <StatCard label="Blog Posts" value={stats?.totalPosts ?? 0} icon={<FileText className="h-5 w-5 text-[#C8A84B]" />} />
        <StatCard label="Lead Sources" value={stats?.leadsBySource?.length ?? 0} icon={<TrendingUp className="h-5 w-5 text-[#C8A84B]" />} />
        <StatCard
          label="Published Posts"
          value={stats?.postsByStatus?.find((s) => s.status === 'published')?.count ?? 0}
          icon={<Clock className="h-5 w-5 text-[#C8A84B]" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Leads by source */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="mb-4 font-semibold text-gray-900">Leads by Source</h2>
          {stats?.leadsBySource?.length ? (
            <div className="space-y-3">
              {stats.leadsBySource.map(({ source, count }) => (
                <div key={source} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 capitalize">{source}</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 rounded-full bg-[#C8A84B]"
                      style={{ width: `${Math.max(20, (count / (stats.totalLeads || 1)) * 160)}px` }}
                    />
                    <span className="text-sm font-medium text-gray-900 w-6 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No leads yet.</p>
          )}
        </div>

        {/* Recent leads */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="mb-4 font-semibold text-gray-900">Recent Leads</h2>
          {stats?.recentLeads?.length ? (
            <div className="space-y-3">
              {stats.recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{lead.name}</p>
                    <p className="text-xs text-gray-500 truncate">{lead.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant="gold">{lead.source}</Badge>
                    <span className="text-xs text-gray-400">{dayjs(lead.createdAt).fromNow()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No leads yet.</p>
          )}
        </div>
      </div>

      {/* Posts by status */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <h2 className="mb-4 font-semibold text-gray-900">Posts by Status</h2>
        <div className="flex flex-wrap gap-3">
          {stats?.postsByStatus?.map(({ status, count }) => (
            <div key={status} className="flex items-center gap-2 rounded-lg border px-4 py-2">
              <Badge variant={statusToBadgeVariant(status)}>{status}</Badge>
              <span className="text-sm font-semibold text-gray-900">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{label}</span>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-40 rounded bg-gray-200" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-24 rounded-xl bg-gray-200" />)}
      </div>
    </div>
  );
}
