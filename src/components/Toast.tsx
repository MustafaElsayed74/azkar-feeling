'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--ink)] px-5 py-3 text-xs font-extrabold text-white shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 md:bottom-8"
    >
      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--butter)]" />
      <span>{message}</span>
    </div>
  );
};
