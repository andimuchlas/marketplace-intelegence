'use client';

import { ADS_CONFIG, AdPosition } from '@/config/ads';
import { clsx } from 'clsx';

interface AdSlotProps {
  position: AdPosition;
  className?: string;
}

export function AdSlot({ position, className }: AdSlotProps) {
  if (!ADS_CONFIG.enabled) {
    return null;
  }

  const slot = ADS_CONFIG.slots[position];
  if (!slot) return null;

  return (
    <aside
      aria-label="Iklan Sponsor"
      className={clsx(
        'group relative my-4 flex w-full select-none flex-col items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50/70 p-3 text-center transition-colors',
        slot.minHeight,
        className
      )}
    >
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-stone-400">
          [ {slot.label} ]
        </span>
        <span className="text-[10px] text-stone-400/80">
          Slot Penempatan Iklan ({slot.dimensions.desktop})
        </span>
      </div>
    </aside>
  );
}
