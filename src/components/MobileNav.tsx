'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Heart, Search, Sparkles } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isBookmarks = pathname === '/bookmarks';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-slate-800/90 px-6 py-2.5 backdrop-blur-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            isHome ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${isHome ? 'bg-emerald-500/20 text-emerald-400' : ''}`}>
            <Compass className="w-5 h-5" />
          </div>
          <span>المشاعر</span>
        </Link>

        <Link
          href="/bookmarks"
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            isBookmarks ? 'text-rose-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${isBookmarks ? 'bg-rose-500/20 text-rose-400' : ''}`}>
            <Heart className={`w-5 h-5 ${isBookmarks ? 'fill-rose-400' : ''}`} />
          </div>
          <span>المحفوظات</span>
        </Link>
      </div>
    </div>
  );
};
