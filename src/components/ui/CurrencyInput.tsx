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
  quickSteps?: number[]; // e.g. [5000, 10000, 25000, 50000]
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
  quickSteps,
  className = '',
}: CurrencyInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const parsed = parseRupiahInput(raw);
    onChange(parsed);
  };

  const handleStep = (increment: number) => {
    onChange(Math.max(0, value + increment));
  };

  const displayValue = value > 0 ? formatRupiah(value, false) : '';

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Normalized Header: exactly h-10 with flex items-end to ensure perfect horizontal alignment */}
      <div className="flex h-10 items-end justify-between pb-1.5">
        <label htmlFor={id} className="font-display text-xs font-semibold leading-tight text-primary-800 sm:text-sm">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {hint && (
          <span className="text-[11px] leading-tight text-primary-400 truncate max-w-[50%] text-right" title={hint}>
            {hint}
          </span>
        )}
      </div>

      {/* Normalized Input Container: exactly h-12 (48px) */}
      <div className="relative flex h-12 w-full items-center rounded-xl border border-stone-300 bg-white shadow-subtle transition-all focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20">
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
          className="h-full w-full rounded-xl bg-transparent pr-3.5 font-mono text-base font-semibold tracking-tight text-primary-900 tabular-nums placeholder:text-stone-300 focus:outline-none sm:text-lg"
        />
      </div>

      {/* Optional Quick Step Chips */}
      {quickSteps && quickSteps.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {quickSteps.map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => handleStep(step)}
              className="rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 font-mono text-[11px] font-medium text-primary-700 transition-colors hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800 active:scale-95"
            >
              +{step >= 1000 ? `${step / 1000}rb` : `${step}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
