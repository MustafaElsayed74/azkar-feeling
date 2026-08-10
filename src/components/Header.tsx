'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Search } from 'lucide-react';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  bookmarkCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery = '', onSearchChange, bookmarkCount = 0 }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b1329]/90 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#CBA1D4]/15 border border-[#CBA1D4]/30 flex items-center justify-center text-[#CBA1D4] font-bold text-lg">
            🤲
          </div>
          <div>
            <span className="text-base font-bold text-slate-100 block">
              أذكار وأدعية
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              حسب الشعور
            </span>
          </div>
        </Link>

        {/* Search Bar (Desktop) */}
        {onSearchChange && (
          <div className="flex-1 max-w-sm hidden sm:block relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن إحساس أو دعاء..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pr-9 pl-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#CBA1D4]/50 transition-colors"
            />
          </div>
        )}

        {/* Saved Items Link */}
        <Link
          href="/bookmarks"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
        >
          <Heart className="w-4 h-4 text-rose-400" />
          <span>المحفوظات</span>
          {bookmarkCount > 0 && (
            <span className="bg-[#CBA1D4] text-slate-950 font-bold text-[10px] px-1.5 py-0.5 rounded-full mr-0.5">
              {bookmarkCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};
