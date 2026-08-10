'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getEmotionTheme, getEmotionArabicName } from '@/lib/data';

interface FeelingCardProps {
  name: string;
  slug: string;
  count: number;
}

export const FeelingCard: React.FC<FeelingCardProps> = ({ name, slug, count }) => {
  const theme = getEmotionTheme(slug);
  const arabicName = getEmotionArabicName(slug, name);

  return (
    <Link href={`/feeling/${slug}`} className="group block active:scale-98 transition-transform">
      <div className={`glass-card p-4 sm:p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-full border ${theme.border}`}>
        {/* Background Radial Glow */}
        <div className={`absolute -left-8 -top-8 w-24 h-24 rounded-full ${theme.bg} blur-2xl group-hover:scale-150 transition-transform duration-500`} />

        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
            {theme.emoji}
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300">
            {count} {count === 1 ? 'دعاء' : 'أدعية'}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-300 transition-colors flex items-center justify-between">
            <span>عندما تشعر بأنك {arabicName}</span>
            <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all text-emerald-400" />
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">
            أدعية وأذكار عند الشعور بـ ({arabicName})
          </p>
        </div>
      </div>
    </Link>
  );
};
