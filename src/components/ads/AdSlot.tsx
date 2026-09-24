'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { ADS_CONFIG, AdPosition } from '@/config/ads';
import { clsx } from 'clsx';

interface AdSlotProps {
  position: AdPosition;
  className?: string;
  slotId?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdSlot({ position, className, slotId }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoadedRef = useRef(false);

  if (!ADS_CONFIG.enabled) {
    return null;
  }

  const slot = ADS_CONFIG.slots[position];
  if (!slot) return null;

  const actualSlotId = slotId || slot.slotId;
  const clientId = ADS_CONFIG.clientId;

  useEffect(() => {
    // Only attempt to push ad if real clientId exists and hasn't been initialized
    if (clientId && actualSlotId && !isLoadedRef.current) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isLoadedRef.current = true;
        }
      } catch (err) {
        console.error('AdSense initialization error:', err);
      }
    }
  }, [clientId, actualSlotId]);

  return (
    <aside
      aria-label="Iklan Sponsor"
      className={clsx(
        'group relative my-3 flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-200/80 bg-stone-50/60 p-2 text-center transition-colors',
        slot.minHeight,
        className
      )}
    >
      {/* Google AdSense Script (Injected once per client ID) */}
      {clientId && (
        <Script
          id="google-adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}

      {/* Compliance Label */}
      <div className="absolute right-2 top-1.5 select-none">
        <span className="font-mono text-[9px] font-semibold tracking-wider text-stone-400 uppercase">
          Sponsored
        </span>
      </div>

      {clientId && actualSlotId ? (
        // Real Google AdSense Unit
        <ins
          ref={adRef}
          className="adsbygoogle block w-full"
          style={{ display: 'block' }}
          data-ad-client={clientId}
          data-ad-slot={actualSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        // Clean Developer / Placeholder Preview
        <div className="flex flex-col items-center justify-center py-2 text-stone-400">
          <div className="flex items-center gap-2 font-mono text-[11px] font-medium tracking-wide text-stone-500 uppercase">
            <span>[ {slot.label} ]</span>
          </div>
          <p className="mt-0.5 text-[10px] text-stone-400">
            {slot.dimensions.desktop} (Desktop) / {slot.dimensions.mobile} (Mobile)
          </p>
        </div>
      )}
    </aside>
  );
}
