import React from 'react';

export interface GoogleIconProps {
  name: string;
  className?: string;
  size?: number | string;
  filled?: boolean;
}

/**
 * Clean Google Fonts Material Symbol Icon (https://fonts.google.com/icons)
 * Provides crisp, zero-AI-trope, utilitarian UI iconography.
 */
export function GoogleIcon({
  name,
  className = '',
  size = 20,
  filled = false,
}: GoogleIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: typeof size === 'number' ? `${size}px` : size,
        fontVariationSettings: filled ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 450",
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
