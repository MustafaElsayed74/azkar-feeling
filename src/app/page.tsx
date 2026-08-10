'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FeelingCard } from '@/components/FeelingCard';
import { DuaCard } from '@/components/DuaCard';
import { getAllFeelings, getFeelingsWithGroups, getAllDuasFlat, getEmotionTheme } from '@/lib/data';
import { DuaItem, FlatDuaItem } from '@/types';
import { Sparkles, Search, Filter, BookOpen, Heart } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen dir-rtl">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        bookmarkCount={bookmarks.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Mobile Search Input */}
        <div className="md:hidden mb-6 relative">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن إحساسك، ذكر، أو دعاء..."
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500/60 shadow-lg"
          />
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto my-4 sm:my-8 px-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>حصن المسلم حسب المشاعر والنفسية</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            كيف تشعر <span className="bg-gradient-to-l from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">الآن؟</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-semibold">
            اختر حالتك النفسية أو إحساسك ليظهر لك الدعاء والذكر النبوي المناسب من الكتاب والسنة.
          </p>

          {/* Quick Filter Horizontal Scroll Bar for Mobile */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
            {feelings.slice(0, 10).map((f: any) => {
              const theme = getEmotionTheme(f.feeling_slug);
              return (
                <Link
                  key={f.feeling_slug}
                  href={`/feeling/${f.feeling_slug}`}
                  className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-bold text-slate-200 hover:border-emerald-500/40 transition-all active:scale-95 shadow"
                >
                  <span>{theme.emoji}</span>
                  <span>{f.arabic_name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Search Results if user searched */}
        {searchQuery.trim().length > 1 ? (
          <div className="my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-400" />
                <span>نتائج البحث ({searchResults.length})</span>
              </h2>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-emerald-400 hover:underline"
              >
                مسح البحث
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
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
              <div className="text-center py-16 glass-card rounded-3xl p-6">
                <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <p className="text-slate-300 font-bold">لم نجد أدعية تطابق &quot;{searchQuery}&quot;</p>
                <p className="text-xs text-slate-500 mt-1 font-semibold">جرب البحث عن &quot;حزين&quot;، &quot;قلق&quot;، &quot;استغفار&quot;، أو &quot;فرَج&quot;</p>
              </div>
            )}
          </div>
        ) : (
          /* All Emotions Grid */
          <div className="my-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
                <Filter className="w-5 h-5 text-emerald-400" />
                <span>جميع المشاعر ({filteredFeelings.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
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
