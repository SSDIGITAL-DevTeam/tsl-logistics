import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from './cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, children, className, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

    const variants = {
      primary:
        'bg-[#C8A84B] text-white hover:bg-[#B89438] active:bg-[#A8842E] shadow-sm hover:shadow focus-visible:ring-[#C8A84B]/60',
      secondary:
        'bg-white text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 hover:ring-gray-300 active:bg-gray-100 shadow-sm focus-visible:ring-gray-300',
      danger:
        'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm focus-visible:ring-red-400',
      ghost:
        'text-gray-600 hover:bg-gray-100 hover:text-gray-800 active:bg-gray-200 focus-visible:ring-gray-300',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-2.5 text-sm',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
