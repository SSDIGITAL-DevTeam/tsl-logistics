import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from './cn';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  label?: string;
}

export function Select({ value, onChange, options, placeholder = 'Select…', className, label }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-[#C8A84B] hover:border-[#C8A84B]/60 transition-colors"
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={cn('h-4 w-4 text-gray-400 shrink-0 transition-transform duration-150', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-xl overflow-hidden animate-[modalIn_0.15s_cubic-bezier(0.16,1,0.3,1)_both]">
          <div className="max-h-52 overflow-y-auto py-1">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={cn(
                  'flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-gray-50',
                  value === opt.value ? 'text-[#C8A84B] font-medium bg-[#C8A84B]/5' : 'text-gray-700'
                )}
              >
                <span>{opt.label}</span>
                {value === opt.value && <Check className="h-3.5 w-3.5 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
