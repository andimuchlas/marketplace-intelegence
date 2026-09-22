export type AdPosition =
  | 'top'
  | 'sidebar-left'
  | 'sidebar-right'
  | 'in-content'
  | 'bottom'
  | 'mobile-anchor';

export interface AdSlotConfig {
  position: AdPosition;
  label: string;
  minHeight: string;
  dimensions: {
    desktop: string;
    mobile: string;
  };
}

export const ADS_CONFIG = {
  // Global feature flag: controlled via environment variable
  enabled: process.env.NEXT_PUBLIC_ADS_ENABLED !== 'false',
  slots: {
    top: {
      position: 'top',
      label: 'Ruang Iklan - Top Banner',
      minHeight: 'min-h-[90px]',
      dimensions: { desktop: '728x90', mobile: '320x50' },
    },
    'sidebar-left': {
      position: 'sidebar-left',
      label: 'Ruang Iklan - Sidebar Kiri',
      minHeight: 'min-h-[600px]',
      dimensions: { desktop: '160x600 / 300x600', mobile: 'hidden' },
    },
    'sidebar-right': {
      position: 'sidebar-right',
      label: 'Ruang Iklan - Sidebar Kanan',
      minHeight: 'min-h-[600px]',
      dimensions: { desktop: '300x250 / 300x600', mobile: 'hidden' },
    },
    'in-content': {
      position: 'in-content',
      label: 'Ruang Iklan - In-Content',
      minHeight: 'min-h-[120px]',
      dimensions: { desktop: '728x90', mobile: '300x250' },
    },
    bottom: {
      position: 'bottom',
      label: 'Ruang Iklan - Bottom',
      minHeight: 'min-h-[90px]',
      dimensions: { desktop: '728x90', mobile: '320x50' },
    },
    'mobile-anchor': {
      position: 'mobile-anchor',
      label: 'Ruang Iklan - Mobile Anchor',
      minHeight: 'min-h-[50px]',
      dimensions: { desktop: 'hidden', mobile: '320x50' },
    },
  } as Record<AdPosition, AdSlotConfig>,
};
