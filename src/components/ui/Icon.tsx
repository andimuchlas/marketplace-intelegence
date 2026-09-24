import React from 'react';

export interface GoogleIconProps {
  name: string;
  className?: string;
  size?: number | string;
  filled?: boolean;
}

/**
 * Clean Google Fonts Material Symbol Icon (https://fonts.google.com/icons)
 * Provides crisp, zero-emoji, utilitarian UI iconography.
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

// Convenient drop-in icon helpers replacing lucide-react across components
export type IconHelperProps = Omit<GoogleIconProps, 'name'>;

export const IconStar = ({ filled = true, className = 'text-amber-500', size = 16, ...props }: IconHelperProps) => (
  <GoogleIcon name="star" filled={filled} className={className} size={size} {...props} />
);

export const IconMapPin = ({ size = 14, className = 'text-stone-400', ...props }: IconHelperProps) => (
  <GoogleIcon name="location_on" size={size} className={className} {...props} />
);

export const IconVerified = ({ size = 16, filled = true, className = 'text-emerald-600', ...props }: IconHelperProps) => (
  <GoogleIcon name="verified" size={size} filled={filled} className={className} {...props} />
);

export const IconShieldCheck = ({ size = 16, filled = true, className = 'text-emerald-600', ...props }: IconHelperProps) => (
  <GoogleIcon name="verified_user" size={size} filled={filled} className={className} {...props} />
);

export const IconTrophy = ({ size = 16, filled = true, className = 'text-amber-500', ...props }: IconHelperProps) => (
  <GoogleIcon name="emoji_events" size={size} filled={filled} className={className} {...props} />
);

export const IconExternalLink = ({ size = 16, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="open_in_new" size={size} className={className} {...props} />
);

export const IconSearch = ({ size = 18, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="search" size={size} className={className} {...props} />
);

export const IconChevronLeft = ({ size = 18, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="chevron_left" size={size} className={className} {...props} />
);

export const IconChevronRight = ({ size = 18, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="chevron_right" size={size} className={className} {...props} />
);

export const IconChevronDown = ({ size = 18, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="expand_more" size={size} className={className} {...props} />
);

export const IconArrowRight = ({ size = 16, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="arrow_forward" size={size} className={className} {...props} />
);

export const IconSparkles = ({ size = 18, filled = true, className = 'text-emerald-500', ...props }: IconHelperProps) => (
  <GoogleIcon name="auto_awesome" size={size} filled={filled} className={className} {...props} />
);

export const IconRotateCcw = ({ size = 16, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="refresh" size={size} className={className} {...props} />
);

export const IconSliders = ({ size = 18, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="tune" size={size} className={className} {...props} />
);

export const IconCalculator = ({ size = 18, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="calculate" size={size} className={className} {...props} />
);

export const IconCompare = ({ size = 18, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="compare_arrows" size={size} className={className} {...props} />
);

export const IconClock = ({ size = 16, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="schedule" size={size} className={className} {...props} />
);

export const IconTrendingUp = ({ size = 16, className = 'text-emerald-600', ...props }: IconHelperProps) => (
  <GoogleIcon name="trending_up" size={size} className={className} {...props} />
);

export const IconTrendingDown = ({ size = 16, className = 'text-rose-600', ...props }: IconHelperProps) => (
  <GoogleIcon name="trending_down" size={size} className={className} {...props} />
);

export const IconTag = ({ size = 16, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="sell" size={size} className={className} {...props} />
);

export const IconStore = ({ size = 16, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="storefront" size={size} className={className} {...props} />
);

export const IconBag = ({ size = 16, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="shopping_bag" size={size} className={className} {...props} />
);

export const IconClose = ({ size = 18, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="close" size={size} className={className} {...props} />
);

export const IconCheck = ({ size = 16, className = 'text-emerald-600', ...props }: IconHelperProps) => (
  <GoogleIcon name="check" size={size} className={className} {...props} />
);

export const IconCheckCircle = ({ size = 16, filled = true, className = 'text-emerald-600', ...props }: IconHelperProps) => (
  <GoogleIcon name="check_circle" size={size} filled={filled} className={className} {...props} />
);

export const IconAlertCircle = ({ size = 16, filled = true, className = 'text-amber-500', ...props }: IconHelperProps) => (
  <GoogleIcon name="error" size={size} filled={filled} className={className} {...props} />
);

export const IconHome = ({ size = 16, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="home" size={size} className={className} {...props} />
);

export const IconFileText = ({ size = 16, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="description" size={size} className={className} {...props} />
);

export const IconRadar = ({ size = 18, className = '', ...props }: IconHelperProps) => (
  <GoogleIcon name="radar" size={size} className={className} {...props} />
);
