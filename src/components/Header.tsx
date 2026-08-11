'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Search } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  bookmarkCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery = '', onSearchChange, bookmarkCount }) => {
  const { bookmarks } = useBookmarks();
  const visibleBookmarkCount = bookmarkCount ?? bookmarks.length;

  return (
    <header className="site-header sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="theme-icon-wrap w-9 h-9 rounded-xl text-lg">
            🤲
          </div>
          <div>
            <span className="block text-base font-extrabold">أذكار وأدعية</span>
            <span className="theme-muted text-[10px] font-semibold">حسب الشعور</span>
          </div>
        </Link>

        {/* Search Bar (Desktop) */}
        {onSearchChange && (
          <div className="flex-1 max-w-sm hidden sm:block relative">
            <Search className="theme-muted absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <label htmlFor="desktop-search" className="sr-only">
              ابحث عن إحساس أو دعاء
            </label>
            <input
              id="desktop-search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن إحساس أو دعاء..."
              className="theme-input w-full rounded-xl py-2 pl-4 pr-9 text-xs"
            />
          </div>
        )}

        {/* Saved Items Link */}
        <Link
          href="/bookmarks"
          className="header-action"
        >
          <Heart className="h-4 w-4" />
          <span>المحفوظات</span>
          {visibleBookmarkCount > 0 && (
            <span className="bookmark-count">
              {visibleBookmarkCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};
