import { Info } from 'lucide-react';
import { RADAR_PRICE_DISCLAIMER } from '@/domain/radar/normalizer';

export function RadarDisclaimerBox() {
  return (
    <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-4 text-xs leading-relaxed text-amber-900 shadow-subtle">
      <div className="flex items-start gap-2.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        <div>
          <strong className="font-semibold text-amber-950">Catatan Transparansi Harga:</strong>{' '}
          {RADAR_PRICE_DISCLAIMER}
        </div>
      </div>
    </div>
  );
}
