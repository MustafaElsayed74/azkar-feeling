'use client';

import React from 'react';
import Link from 'next/link';
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
    <Link href={`/feeling/${slug}`} className="block group">
      <div className="clean-card p-4 flex items-center justify-between gap-3 hover:border-emerald-500/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-xl shrink-0">
            {theme.emoji}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
              {arabicName}
            </h3>
            <p className="text-[11px] text-slate-400">
              أدعية وأذكار عند {arabicName}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
          {count}
        </span>
      </div>
    </Link>
  );
};
