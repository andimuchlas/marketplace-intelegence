import { GoogleIcon } from '@/components/ui/Icon';
import { RADAR_PRICE_DISCLAIMER } from '@/domain/radar/normalizer';

export function RadarDisclaimerBox() {
  return (
    <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-4 text-xs leading-relaxed text-amber-900 shadow-2xs">
      <div className="flex items-start gap-2.5">
        <GoogleIcon name="info" size={16} filled className="mt-0.5 shrink-0 text-amber-600" />
        <div>
          <strong className="font-semibold text-amber-950">Catatan Transparansi Harga:</strong>{' '}
          {RADAR_PRICE_DISCLAIMER}
        </div>
      </div>
    </div>
  );
}
