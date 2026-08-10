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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800/80 px-6 py-2 backdrop-blur-md" style={{ backgroundColor: 'rgba(11,19,41,0.96)' }}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-[10px] font-bold transition-colors"
          style={{ color: isHome ? '#CBA1D4' : '#94a3b8' }}
        >
          <Compass className="w-5 h-5" />
          <span>المشاعر</span>
        </Link>

        <Link
          href="/bookmarks"
          className="flex flex-col items-center gap-1 text-[10px] font-bold transition-colors"
          style={{ color: isBookmarks ? '#f43f5e' : '#94a3b8' }}
        >
          <Heart className={`w-5 h-5 ${isBookmarks ? 'fill-rose-400' : ''}`} />
          <span>المحفوظات</span>
        </Link>
      </div>
    </div>
  );
};
