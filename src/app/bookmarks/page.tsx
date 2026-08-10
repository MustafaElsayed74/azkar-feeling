'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DuaCard } from '@/components/DuaCard';
import { DuaItem } from '@/types';
import { Heart, ArrowRight, Trash2, BookOpen } from 'lucide-react';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<DuaItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('azkar_bookmarks');
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const handleToggleBookmark = (dua: DuaItem) => {
    setBookmarks((prev) => {
      const updated = prev.filter((b) => !(b.title === dua.title && b.arabic === dua.arabic));
      try {
        localStorage.setItem('azkar_bookmarks', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleClearAll = () => {
    if (confirm('هل أنت تأكد من مسح جميع الأدعية والأذكار المحفوظة؟')) {
      setBookmarks([]);
      try {
        localStorage.removeItem('azkar_bookmarks');
      } catch (e) {}
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen dir-rtl">
      <Header bookmarkCount={bookmarks.length} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-lavender-400 transition-colors mb-5"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع لجميع المشاعر</span>
        </Link>

        {/* Page Title */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl mb-8 border border-lavender-500/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
              <Heart className="w-7 h-7 fill-rose-500/30" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                الأدعية والأذكار المحفوظة
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">
                مجموعتك الخاصة من الأدعية التي قمت بحفظها
              </p>
            </div>
          </div>

          {bookmarks.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 text-xs font-bold text-rose-400 hover:text-rose-300 px-3.5 py-2 rounded-xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 transition-all active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
              <span>مسح الكل</span>
            </button>
          )}
        </div>

        {/* Bookmarks List */}
        {bookmarks.length > 0 ? (
          <div className="space-y-6 sm:space-y-8">
            {bookmarks.map((dua, idx) => (
              <DuaCard
                key={`${dua.title}-${idx}`}
                dua={dua}
                isBookmarked={true}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card rounded-3xl p-8 max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-200">لا توجد أدعية محفوظة بعد</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed font-semibold">
              اضغط على أيقونة القلب على أي بطاقة دعاء أثناء تصفحك لحفظ الدعاء في مجموعتك المفضلة هنا.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-2xl bg-lavender-500 text-slate-950 font-black text-xs hover:bg-lavender-400 transition-colors shadow-lg shadow-lavender-500/20"
            >
              تصفح المشاعر الآن
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
