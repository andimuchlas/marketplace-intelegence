import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'outline' | 'warning';
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'border-transparent bg-primary-900 text-white',
    secondary: 'border-transparent bg-stone-100 text-stone-800',
    success: 'border-emerald-200/80 bg-emerald-50 text-emerald-800',
    destructive: 'border-rose-200/80 bg-rose-50 text-rose-700',
    outline: 'border-stone-200 text-stone-700 bg-white/70',
    warning: 'border-amber-200/80 bg-amber-50 text-amber-800',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
