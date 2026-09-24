export type AdPosition = 'top' | 'bottom' | 'in-content';

export interface AdSlotConfig {
  position: AdPosition;
  label: string;
  minHeight: string;
  slotId?: string;
  dimensions: {
    desktop: string;
    mobile: string;
  };
}

export const ADS_CONFIG = {
  // Global feature flag: controlled via environment variable
  enabled: process.env.NEXT_PUBLIC_ADS_ENABLED !== 'false',
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-2244563747369803',
  slots: {
    top: {
      position: 'top',
      label: 'Ruang Iklan - Top Banner',
      minHeight: 'min-h-[50px] sm:min-h-[90px]',
      slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP || '',
      dimensions: { desktop: '728x90', mobile: '320x50' },
    },
    'in-content': {
      position: 'in-content',
      label: 'Ruang Iklan - In-Content',
      minHeight: 'min-h-[100px] sm:min-h-[120px]',
      slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT || '',
      dimensions: { desktop: '728x90', mobile: '300x250' },
    },
    bottom: {
      position: 'bottom',
      label: 'Ruang Iklan - Bottom',
      minHeight: 'min-h-[90px] sm:min-h-[120px]',
      slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM || '',
      dimensions: { desktop: '728x90', mobile: '300x250' },
    },
  } as Record<AdPosition, AdSlotConfig>,
};
