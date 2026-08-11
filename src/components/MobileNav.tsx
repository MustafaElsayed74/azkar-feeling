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
      className="mobile-nav fixed bottom-0 left-0 right-0 z-50 px-6 py-2 backdrop-blur-md md:hidden"
      aria-label="التنقل الرئيسي"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link
          href="/"
          className={`mobile-nav-link ${isHome ? 'is-active' : ''}`}
          aria-current={isHome ? 'page' : undefined}
        >
          <Compass className="w-5 h-5" />
          <span>المشاعر</span>
        </Link>

        <Link
          href="/bookmarks"
          className={`mobile-nav-link ${isBookmarks ? 'is-active' : ''}`}
          aria-current={isBookmarks ? 'page' : undefined}
        >
          <Heart className={`h-5 w-5 ${isBookmarks ? 'fill-current' : ''}`} />
          <span>المحفوظات</span>
        </Link>
      </div>
    </nav>
  );
};
