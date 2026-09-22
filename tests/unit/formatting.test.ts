import { describe, it, expect } from 'vitest';
import { formatRupiah, formatCompactRupiah, formatPercentage, parseRupiahInput } from '@/lib/formatting/currency';

describe('Currency & Formatting Utilities', () => {
  it('formats whole Rupiah amounts with standard thousand separators', () => {
    expect(formatRupiah(100000)).toBe('Rp 100.000');
    expect(formatRupiah(1250500)).toBe('Rp 1.250.500');
    expect(formatRupiah(0)).toBe('Rp 0');
  });

  it('formats negative amounts cleanly', () => {
    expect(formatRupiah(-15000)).toBe('-Rp 15.000');
  });

  it('formats compact representations for badges', () => {
    expect(formatCompactRupiah(17600)).toBe('Rp 17,6rb');
    expect(formatCompactRupiah(1500000)).toBe('Rp 1,5jt');
    expect(formatCompactRupiah(2500000000)).toBe('Rp 2,5M');
  });

  it('formats percentages correctly', () => {
    expect(formatPercentage(17.6)).toBe('17,6%');
    expect(formatPercentage(4.25, 2)).toBe('4,25%');
    expect(formatPercentage(0)).toBe('0%');
  });

  it('parses raw user inputs reliably', () => {
    expect(parseRupiahInput('Rp 100.000')).toBe(100000);
    expect(parseRupiahInput('100.000')).toBe(100000);
    expect(parseRupiahInput('Rp 50,000')).toBe(50000);
    expect(parseRupiahInput('')).toBe(0);
    expect(parseRupiahInput('abc')).toBe(0);
  });
});
