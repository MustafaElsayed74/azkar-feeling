'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FeelingCard } from '@/components/FeelingCard';
import { DuaCard } from '@/components/DuaCard';
import { getAllFeelings, getFeelingsWithGroups, getAllDuasFlat, getEmotionTheme } from '@/lib/data';
import { DuaItem, FlatDuaItem } from '@/types';
import { Search, Compass, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<DuaItem[]>([]);
  const feelings = getAllFeelings();
  const groups = getFeelingsWithGroups();
  const flatDuas = getAllDuasFlat();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('azkar_bookmarks');
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const handleToggleBookmark = (dua: DuaItem) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.title === dua.title && b.arabic === dua.arabic);
      let updated: DuaItem[];
      if (exists) {
        updated = prev.filter((b) => !(b.title === dua.title && b.arabic === dua.arabic));
      } else {
        updated = [...prev, dua];
      }
      try {
        localStorage.setItem('azkar_bookmarks', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const filteredFeelings = feelings.filter((f: any) =>
    f.arabic_name.includes(searchQuery) ||
    f.feeling_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchResults: FlatDuaItem[] = searchQuery.trim().length > 1
    ? flatDuas.filter((d: any) =>
        (d.arabic && d.arabic.includes(searchQuery)) ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.arabic_feeling && d.arabic_feeling.includes(searchQuery)) ||
        (d.translation && d.translation.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (d.hadith && d.hadith.includes(searchQuery)) ||
        (d.reference && d.reference.includes(searchQuery))
      )
    : [];

  return (
    <div className="flex flex-col min-h-screen dir-rtl bg-[#0b1329]">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        bookmarkCount={bookmarks.length}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Mobile Search Input */}
        <div className="sm:hidden mb-6 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن شعور أو دعاء..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Simple Clean Hero Header */}
        <div className="text-center my-4 sm:my-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            كيف تشعر الآن؟
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
            اختر إحساسك ليصلك الدعاء والذكر المناسب من الكتاب والسنة
          </p>

          {/* Quick Pill Slider */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {feelings.slice(0, 10).map((f: any) => {
              const theme = getEmotionTheme(f.feeling_slug);
              return (
                <Link
                  key={f.feeling_slug}
                  href={`/feeling/${f.feeling_slug}`}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-emerald-500/40 transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${theme.gradient}`}></span>
                  <span>{f.arabic_name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Search Results or Grid */}
        {searchQuery.trim().length > 1 ? (
          <div className="my-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" />
                <span>نتائج البحث ({searchResults.length})</span>
              </h2>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-emerald-400 hover:underline font-semibold"
              >
                إلغاء البحث
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((dua, idx) => (
                  <DuaCard
                    key={`${dua.feeling_slug}-${idx}`}
                    dua={dua}
                    feelingName={(dua as any).arabic_feeling || dua.feeling}
                    isBookmarked={bookmarks.some(
                      (b) => b.title === dua.title && b.arabic === dua.arabic
                    )}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 clean-card p-6">
                <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-400 font-semibold">لم نجد نتائج تطابق &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>
        ) : (
          /* Clean Feelings Grid */
          <div className="my-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>المشاعر والأحاسيس ({filteredFeelings.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredFeelings.map((feeling: any) => {
                const group = groups.find((g) => g.slug === feeling.feeling_slug);
                const count = group ? group.items_count : 0;

                return (
                  <FeelingCard
                    key={feeling.feeling_slug}
                    name={feeling.feeling_name}
                    slug={feeling.feeling_slug}
                    count={count}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
