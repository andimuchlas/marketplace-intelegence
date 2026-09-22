/**
 * Currency and numerical formatting utilities for Indonesian Rupiah (IDR).
 * Strictly enforces integer precision to eliminate IEEE 754 floating-point inaccuracies.
 */

export function formatRupiah(amount: number, withPrefix: boolean = true): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return withPrefix ? 'Rp 0' : '0';
  }

  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.round(amount));

  // Indonesian number format uses '.' as thousand separator and ',' as decimal separator
  const formattedNumber = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(absAmount);

  if (withPrefix) {
    return isNegative ? `-Rp ${formattedNumber}` : `Rp ${formattedNumber}`;
  }

  return isNegative ? `-${formattedNumber}` : formattedNumber;
}

export function formatCompactRupiah(amount: number): string {
  if (isNaN(amount)) return 'Rp 0';
  const isNegative = amount < 0;
  const abs = Math.abs(Math.round(amount));

  let formatted = '';
  if (abs >= 1_000_000_000) {
    formatted = `${(abs / 1_000_000_000).toFixed(1).replace('.', ',')}M`;
  } else if (abs >= 1_000_000) {
    formatted = `${(abs / 1_000_000).toFixed(1).replace('.', ',')}jt`;
  } else if (abs >= 1_000) {
    formatted = `${(abs / 1_000).toFixed(1).replace('.', ',')}rb`;
  } else {
    formatted = `${abs}`;
  }

  return isNegative ? `-Rp ${formatted}` : `Rp ${formatted}`;
}

export function formatPercentage(value: number, decimals: number = 1): string {
  if (isNaN(value)) return '0%';
  const rounded = Number(value.toFixed(decimals));
  // Replace period with comma for Indonesian locale if desired, or standard percentage
  return `${rounded.toString().replace('.', ',')}%`;
}

export function parseRupiahInput(raw: string): number {
  if (!raw) return 0;
  // Strip everything except digits
  const cleaned = raw.replace(/\D/g, '');
  if (!cleaned) return 0;
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? 0 : parsed;
}
