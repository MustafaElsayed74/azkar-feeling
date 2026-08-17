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
    <nav
      className="mobile-nav fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-white/90 px-6 py-1.5 backdrop-blur-md pb-[max(0.375rem,env(safe-area-inset-bottom))] md:hidden"
      aria-label="التنقل الرئيسي"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link
          href="/"
          className={`mobile-nav-link min-h-[44px] min-w-[44px] justify-center px-4 ${isHome ? 'is-active' : ''}`}
          aria-current={isHome ? 'page' : undefined}
        >
          <Compass className="w-5 h-5" />
          <span>المشاعر</span>
        </Link>

        <Link
          href="/bookmarks"
          className={`mobile-nav-link min-h-[44px] min-w-[44px] justify-center px-4 ${isBookmarks ? 'is-active' : ''}`}
          aria-current={isBookmarks ? 'page' : undefined}
        >
          <Heart className={`h-5 w-5 ${isBookmarks ? 'fill-current' : ''}`} />
          <span>المحفوظات</span>
        </Link>
      </div>
    </nav>
  );
};
