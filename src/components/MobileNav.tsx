'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Heart } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isBookmarks = pathname === '/bookmarks';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b1329]/95 border-t border-slate-800/80 px-6 py-2 backdrop-blur-md">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
            isHome ? 'text-lavender-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>المشاعر</span>
        </Link>

        <Link
          href="/bookmarks"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
            isBookmarks ? 'text-rose-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className={`w-5 h-5 ${isBookmarks ? 'fill-rose-400' : ''}`} />
          <span>المحفوظات</span>
        </Link>
      </div>
    </div>
  );
};
