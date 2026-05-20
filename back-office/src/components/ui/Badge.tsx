import { cn } from './cn';

const variants = {
  default:  { dot: 'bg-gray-400',   pill: 'bg-gray-100 text-gray-600' },
  success:  { dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700' },
  warning:  { dot: 'bg-amber-400',   pill: 'bg-amber-50 text-amber-700' },
  danger:   { dot: 'bg-red-500',     pill: 'bg-red-50 text-red-700' },
  info:     { dot: 'bg-blue-500',    pill: 'bg-blue-50 text-blue-700' },
  gold:     { dot: 'bg-[#C8A84B]',   pill: 'bg-[#C8A84B]/10 text-[#a8883b]' },
};

interface BadgeProps {
  variant?: keyof typeof variants;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  const v = variants[variant];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        v.pill,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', v.dot)} />
      {children}
    </span>
  );
}

export function statusToBadgeVariant(status: string): keyof typeof variants {
  switch (status) {
    case 'published': return 'success';
    case 'draft':     return 'warning';
    case 'archived':  return 'default';
    default:          return 'default';
  }
}
