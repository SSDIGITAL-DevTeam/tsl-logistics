import { useQuery } from '@tanstack/react-query';
import { Users2, FileText, Layers, CheckCircle2 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import api from '../lib/api';
import { Badge, statusToBadgeVariant } from '../components/ui/Badge';
import type { DashboardStats } from '../types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const STAT_CONFIG = [
  {
    label: 'Total Leads',
    getValue: (s: DashboardStats) => s.totalLeads ?? 0,
    icon: Users2,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    label: 'Blog Posts',
    getValue: (s: DashboardStats) => s.totalPosts ?? 0,
    icon: FileText,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-500',
  },
  {
    label: 'Lead Sources',
    getValue: (s: DashboardStats) => s.leadsBySource?.length ?? 0,
    icon: Layers,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-500',
  },
  {
    label: 'Published Posts',
    getValue: (s: DashboardStats) => s.postsByStatus?.find((p) => p.status === 'published')?.count ?? 0,
    icon: CheckCircle2,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
  },
];

export function DashboardPage() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard'],
    queryFn: () => api.get('/api/v1/admin/dashboard').then((r) => r.data),
  });

  if (isLoading) return <PageSkeleton />;

  const chartData = stats?.leadsBySource?.map(({ source, count }) => ({
    source: source.charAt(0).toUpperCase() + source.slice(1),
    count,
  })) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-400 mt-0.5">{dayjs().format('dddd, D MMMM YYYY')}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_CONFIG.map(({ label, icon: Icon, iconBg, iconColor, getValue }) => {
          const value = stats ? getValue(stats) : 0;
          return (
            <div key={label} className="rounded-2xl bg-white p-5 ring-1 ring-black/5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
                  <p className="mt-2.5 text-3xl font-bold text-gray-900 tabular-nums leading-none">
                    {value.toLocaleString()}
                  </p>
                </div>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Leads by source — Recharts bar */}
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900 mb-5">Leads by Source</h2>
          {chartData.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barSize={32} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis
                  dataKey="source"
                  tick={{ fontSize: 12, fill: '#9ca3af', fontFamily: 'inherit' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9ca3af', fontFamily: 'inherit' }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(200,168,75,0.06)' }}
                  contentStyle={{
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(0,0,0,0.07)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    fontFamily: 'inherit',
                    fontSize: '13px',
                  }}
                  labelStyle={{ fontWeight: 600, color: '#374151', marginBottom: 2 }}
                  itemStyle={{ color: '#C8A84B' }}
                />
                <Bar dataKey="count" name="Leads" fill="#C8A84B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-55 items-center justify-center">
              <p className="text-sm text-gray-400">No leads yet.</p>
            </div>
          )}
        </div>

        {/* Recent leads */}
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900 mb-5">Recent Leads</h2>
          {stats?.recentLeads?.length ? (
            <div className="space-y-3">
              {stats.recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-sm font-bold text-gray-500">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate leading-tight">{lead.name}</p>
                    <p className="text-xs text-gray-400 truncate">{lead.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant="gold">{lead.source}</Badge>
                    <span className="text-[10px] text-gray-300">{dayjs(lead.createdAt).fromNow()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center py-10">
              <p className="text-sm text-gray-400">No leads yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Posts by status */}
      <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Posts by Status</h2>
        <div className="flex flex-wrap gap-3">
          {stats?.postsByStatus?.length ? (
            stats.postsByStatus.map(({ status, count }) => (
              <div key={status} className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-2.5">
                <Badge variant={statusToBadgeVariant(status)}>{status}</Badge>
                <span className="text-sm font-bold text-gray-900 tabular-nums">{count}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-1.5">
        <div className="h-7 w-32 rounded-lg bg-gray-200" />
        <div className="h-4 w-48 rounded bg-gray-100" />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-28 rounded-2xl bg-gray-200" />)}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="h-72 rounded-2xl bg-gray-200" />
        <div className="h-72 rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}
