'use client';

import React, { ChangeEvent } from 'react';
import { formatRupiah, parseRupiahInput } from '@/lib/formatting/currency';

interface CurrencyInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function CurrencyInput({
  id,
  label,
  value,
  onChange,
  placeholder = '0',
  hint,
  disabled = false,
  required = false,
  className = '',
}: CurrencyInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const parsed = parseRupiahInput(raw);
    onChange(parsed);
  };

  const displayValue = value > 0 ? formatRupiah(value, false) : '';

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="font-display text-xs font-semibold text-primary-800 sm:text-sm">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {hint && <span className="text-[11px] text-primary-400">{hint}</span>}
      </div>

      <div className="relative flex items-center rounded-xl border border-stone-300 bg-white shadow-subtle transition-all focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20">
        <span className="flex select-none items-center pl-3.5 pr-2 font-mono text-sm font-semibold text-primary-500">
          Rp
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full rounded-xl bg-transparent py-2.5 pr-3.5 font-mono text-base font-semibold tracking-tight text-primary-900 tabular-nums placeholder:text-stone-300 focus:outline-none sm:text-lg"
        />
      </div>
    </div>
  );
}
