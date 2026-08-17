'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Compass, GraduationCap, Search, Sparkles, Sun, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FeelingCard } from '@/components/FeelingCard';
import { DuaCard } from '@/components/DuaCard';
import { useBookmarks } from '@/hooks/useBookmarks';
import type { FeelingMeta, SearchDuaItem } from '@/types';

interface FeelingSummary extends FeelingMeta {
  arabic_name: string;
  count: number;
}

interface HomeClientProps {
  feelings: FeelingSummary[];
  searchDuas: SearchDuaItem[];
}

export function HomeClient({ feelings, searchDuas }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'daily' | 'situational' | 'emotional'>('all');
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return searchDuas.filter((dua) => {
      const matchTitle = (dua.title || '').toLowerCase().includes(query);
      const matchArabicTitle = (dua.title_arabic || '').includes(query);
      const matchArabic = (dua.arabic || '').includes(query);
      const matchTranslation = (dua.translation || '').toLowerCase().includes(query);
      const matchFeelings = dua.feelings.some((f) =>
        (f.arabic_name || '').includes(query) || (f.name || '').toLowerCase().includes(query)
      );

      return matchTitle || matchArabicTitle || matchArabic || matchTranslation || matchFeelings;
    });
  }, [searchQuery, searchDuas]);

  const filteredFeelings = useMemo(() => {
    if (activeTab === 'all') return feelings;
    if (activeTab === 'daily') return feelings.filter((f) => f.category === 'daily');
    if (activeTab === 'situational') return feelings.filter((f) => f.category === 'situational');
    return feelings.filter((f) => (f.category || 'emotional') === 'emotional');
  }, [feelings, activeTab]);

  const searchingDuas = searchQuery.trim().length > 0;

  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Header />

      <main className="container mx-auto max-w-4xl flex-1 px-3 py-4 sm:px-4 sm:py-6">
        <div className="relative mb-4 sm:mb-6">
          <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="ابحث عن شعور أو أذكار الصباح والمذاكرة..."
            className="theme-input w-full rounded-2xl py-2 pl-9 pr-10 text-xs sm:py-2.5 sm:text-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-[var(--muted)] hover:text-[var(--ink)]"
              aria-label="مسح البحث"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Compact & Ultra Sleek Hero Panel on Mobile */}
        <section className="hero-panel px-4 py-4 text-center sm:px-8 sm:py-8">
          <span className="hero-kicker text-[11px] sm:text-xs">
            <Sparkles className="h-3 w-3 text-[var(--ink)] sm:h-3.5 sm:w-3.5" />
            <span>مأوى القلوب وسكينة النفوس</span>
          </span>
          <h1 className="mt-2 text-xl font-extrabold tracking-tight text-[var(--ink)] sm:mt-3 sm:text-3xl">
            أذكارك اليومية وما تطمئن به روحك
          </h1>
          <p className="theme-muted mx-auto mt-2 hidden max-w-xl text-xs font-medium leading-6 sm:block sm:text-sm sm:leading-7">
            ابتدئ يومك بأذكار الصباح والمساء، أو اختر ما يمر به قلبك الآن لتجد الأدعية والأذكار المأثورة من القرآن الكريم والسُنّة النبوية الشريفة.
          </p>

          {/* Horizontal Scrolling Pill Cloud on Mobile */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar scroll-mask-x sm:mt-5 sm:flex-wrap sm:justify-center sm:gap-2 sm:mask-none">
            {feelings.slice(0, 10).map((feeling) => (
              <Link
                key={feeling.feeling_slug}
                href={`/feeling/${feeling.feeling_slug}`}
                className="filter-pill shrink-0 text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 hover:scale-105 transition-transform"
              >
                <span className="filter-dot" aria-hidden="true" />
                <span>{feeling.arabic_name}</span>
              </Link>
            ))}
          </div>
        </section>

        {searchingDuas ? (
          <section className="my-6" aria-labelledby="search-results-title">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id="search-results-title" className="section-heading">
                <Search className="h-5 w-5" />
                <span>نتائج البحث ({searchResults.length})</span>
              </h2>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-link text-sm font-bold"
              >
                إلغاء البحث
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((dua) => (
                  <DuaCard
                    key={`${dua.title}-${dua.arabic}`}
                    dua={dua}
                    feelingName={dua.feelings
                      .slice(0, 3)
                      .map((feeling) => feeling.arabic_name)
                      .join('، ')}
                    feelingSlug={dua.feelings[0]?.slug}
                    isBookmarked={isBookmarked(dua)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state clean-card p-8 text-center">
                <BookOpen className="mx-auto mb-3 h-8 w-8" />
                <p className="font-semibold text-sm">
                  لم نجد نتائج تطابق &quot;{searchQuery}&quot;
                </p>
              </div>
            )}
          </section>
        ) : (
          <section className="my-6" aria-labelledby="feelings-title">
            {/* Single-Line Mobile Friendly Category Navigation Bar */}
            <div className="my-4 rounded-2xl bg-[var(--surface-soft)] p-1 sm:p-1.5 border border-[var(--border)] shadow-sm">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar sm:grid sm:grid-cols-4 sm:gap-1.5">
                {[
                  {
                    id: 'all' as const,
                    label: 'جميع الأقسام',
                    shortLabel: 'الكل',
                    icon: Compass,
                    count: filteredFeelings.length,
                  },
                  {
                    id: 'daily' as const,
                    label: 'الأذكار اليومية',
                    shortLabel: '🌅 اليومية',
                    icon: Sun,
                    count: feelings.filter((f) => f.category === 'daily').length,
                  },
                  {
                    id: 'situational' as const,
                    label: 'المواقف والرقية',
                    shortLabel: '🎓 المواقف',
                    icon: GraduationCap,
                    count: feelings.filter((f) => f.category === 'situational').length,
                  },
                  {
                    id: 'emotional' as const,
                    label: 'أذكار المشاعر',
                    shortLabel: '🤍 المشاعر',
                    icon: BookOpen,
                    count: feelings.filter((f) => (f.category || 'emotional') === 'emotional').length,
                  },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-1 shrink-0 items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-extrabold sm:px-3 sm:py-2.5 sm:text-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-[var(--ink)] text-white shadow-md scale-[1.01]'
                          : 'text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]'
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 ${isActive ? 'text-[var(--butter)]' : ''}`} />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.shortLabel}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h2 id="feelings-title" className="section-heading text-sm sm:text-base">
                <Compass className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>أقسام الأذكار والأدعية ({filteredFeelings.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
              {filteredFeelings.map((feeling) => (
                <FeelingCard
                  key={feeling.feeling_slug}
                  name={feeling.feeling_name}
                  arabicName={feeling.arabic_name}
                  slug={feeling.feeling_slug}
                  count={feeling.count}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
