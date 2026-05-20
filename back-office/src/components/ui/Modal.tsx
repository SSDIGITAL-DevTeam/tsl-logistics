import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from './cn';

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  '5xl': 'max-w-5xl',
} as const;

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: keyof typeof sizes;
  className?: string;
}

export function Modal({ open, onClose, title, children, size = 'md', className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop — stays fixed, never scrolls */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Centering wrapper */}
      <div className="absolute inset-0 flex items-start justify-center p-4 py-10">
        {/* Modal panel — flex column, constrained height so body can scroll */}
        <div
          className={cn(
            'relative w-full flex flex-col bg-white rounded-xl shadow-2xl',
            'max-h-[calc(100vh-5rem)]',
            'animate-[modalIn_0.2s_cubic-bezier(0.16,1,0.3,1)_both]',
            sizes[size],
            className
          )}
        >
          {/* Header — never scrolls */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 shrink-0">
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
