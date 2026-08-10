'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, Search, Compass } from 'lucide-react';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  bookmarkCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery = '', onSearchChange, bookmarkCount = 0 }) => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
              أذكار وأدعية
            </span>
            <span className="block text-[11px] font-bold text-emerald-400/90 tracking-wide">
              حسب شعورك وإحساسك
            </span>
          </div>
        </Link>

        {/* Desktop Search Bar */}
        {onSearchChange && (
          <div className="flex-1 max-w-md hidden md:block relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن شعور، دعاء، آية، أو حديث..."
              className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl pr-10 pl-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 transition-all dir-rtl"
            />
          </div>
        )}

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>المشاعر</span>
          </Link>

          <Link
            href="/bookmarks"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-colors relative"
          >
            <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400/30" />
            <span>المحفوظات</span>
            {bookmarkCount > 0 && (
              <span className="bg-emerald-500 text-slate-950 font-extrabold text-xs px-2 py-0.5 rounded-full mr-1">
                {bookmarkCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Bookmark Badge Indicator */}
        <div className="sm:hidden flex items-center gap-2">
          <Link
            href="/bookmarks"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 relative"
          >
            <Heart className="w-5 h-5 fill-emerald-400/30" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-emerald-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {bookmarkCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
