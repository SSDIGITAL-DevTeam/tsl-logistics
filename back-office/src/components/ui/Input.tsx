import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from './cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'rounded-xl border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary',
            error ? 'border-red-400 focus:ring-red-400/30 focus:border-red-400' : 'border-gray-200',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
