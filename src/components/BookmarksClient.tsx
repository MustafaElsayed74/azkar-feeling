'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Heart, Trash2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DuaCard } from '@/components/DuaCard';
import { useBookmarks } from '@/hooks/useBookmarks';

export function BookmarksClient() {
  const {
    bookmarks,
    toggleBookmark,
    clearBookmarks,
  } = useBookmarks();

  const handleClearAll = () => {
    if (window.confirm('هل تريد مسح جميع الأدعية والأذكار المحفوظة؟')) {
      clearBookmarks();
    }
  };

  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Header bookmarkCount={bookmarks.length} />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-7 sm:px-6 sm:py-10">
        <Link href="/" className="back-link mb-5">
          <ArrowRight className="h-4 w-4" />
          <span>الرجوع لجميع المشاعر</span>
        </Link>

        <section className="hero-panel mb-8 flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="heart-icon-wrap">
              <Heart className="h-7 w-7 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-3xl">
                الأدعية والأذكار المحفوظة
              </h1>
              <p className="theme-muted mt-1 text-sm font-medium">
                مجموعتك الخاصة محفوظة على هذا الجهاز
              </p>
            </div>
          </div>

          {bookmarks.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="danger-button"
            >
              <Trash2 className="h-4 w-4" />
              <span>مسح الكل</span>
            </button>
          )}
        </section>

        {bookmarks.length > 0 ? (
          <div className="space-y-6 sm:space-y-8">
            {bookmarks.map((dua) => (
              <DuaCard
                key={`${dua.title}-${dua.arabic}`}
                dua={dua}
                isBookmarked
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state clean-card mx-auto max-w-md p-10 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12" />
            <h2 className="text-lg font-extrabold">لا توجد أدعية محفوظة بعد</h2>
            <p className="theme-muted mt-2 text-sm font-medium leading-7">
              اضغط على أيقونة القلب في أي بطاقة لحفظ الدعاء والعودة إليه لاحقًا.
            </p>
            <Link href="/" className="primary-button mt-6 inline-flex">
              تصفح المشاعر الآن
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
