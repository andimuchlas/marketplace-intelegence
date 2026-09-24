'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleIcon } from './Icon';

export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

// Simple event-driven toast dispatcher without heavy external state libraries
type ToastListener = (toast: ToastMessage) => void;
const listeners: ToastListener[] = [];

export function toast(options: Omit<ToastMessage, 'id'> | string) {
  const toastItem: ToastMessage =
    typeof options === 'string'
      ? { id: Math.random().toString(36).substring(2, 9), message: options, type: 'info' }
      : { id: Math.random().toString(36).substring(2, 9), ...options };

  listeners.forEach((listener) => listener(toastItem));
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleNewToast = (item: ToastMessage) => {
      setToasts((prev) => [...prev, item]);
      const timer = setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== item.id));
      }, item.duration || 4000);
      return () => clearTimeout(timer);
    };

    listeners.push(handleNewToast);
    return () => {
      const idx = listeners.indexOf(handleNewToast);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  };

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-end gap-2 p-4 sm:items-end sm:p-6"
    >
      <AnimatePresence>
        {toasts.map((t) => {
          const isSuccess = t.type === 'success';
          const isError = t.type === 'error';

          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-md transition-all ${
                isSuccess
                  ? 'border-emerald-200/90 bg-emerald-50/95 text-emerald-950'
                  : isError
                  ? 'border-rose-200/90 bg-rose-50/95 text-rose-950'
                  : 'border-stone-200/90 bg-white/95 text-stone-900'
              }`}
            >
              <span className="mt-0.5 shrink-0">
                {isSuccess && <GoogleIcon name="check_circle" size={18} filled className="text-emerald-600" />}
                {isError && <GoogleIcon name="error" size={18} filled className="text-rose-600" />}
                {!isSuccess && !isError && <GoogleIcon name="info" size={18} filled className="text-stone-600" />}
              </span>

              <div className="flex-1 text-xs">
                {t.title && <div className="font-semibold">{t.title}</div>}
                <div className={`${t.title ? 'mt-0.5' : ''} text-stone-700 leading-relaxed`}>{t.message}</div>
              </div>

              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="shrink-0 rounded p-0.5 text-stone-400 hover:text-stone-700 transition-colors"
                aria-label="Tutup"
              >
                <GoogleIcon name="close" size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
