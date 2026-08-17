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

      <main className="container mx-auto max-w-4xl flex-1 px-4 py-6">
        <div className="relative mb-6">
          <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="ابحث عن شعور أو أذكار الصباح والمذاكرة..."
            className="theme-input w-full rounded-2xl py-2.5 pl-9 pr-10 text-sm"
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

        <section className="hero-panel px-5 py-8 text-center sm:px-8 sm:py-10">
          <span className="hero-kicker">
            <Sparkles className="h-3.5 w-3.5 text-[var(--ink)]" />
            <span>مأوى القلوب وسكينة النفوس</span>
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--ink)]">
            أذكارك اليومية وما تطمئن به روحك
          </h1>
          <p className="theme-muted mx-auto mt-3 max-w-xl text-sm font-medium leading-7">
            ابتدئ يومك بأذكار الصباح والمساء، أو اختر ما يمر به قلبك الآن لتجد الأدعية والأذكار المأثورة من القرآن الكريم والسُنّة النبوية الشريفة.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 py-1">
            {feelings.slice(0, 10).map((feeling) => (
              <Link
                key={feeling.feeling_slug}
                href={`/feeling/${feeling.feeling_slug}`}
                className="filter-pill shrink-0 hover:scale-105 transition-transform"
              >
                <span className="filter-dot" aria-hidden="true" />
                <span>{feeling.arabic_name}</span>
              </Link>
            ))}
          </div>
        </section>

        {searchingDuas ? (
          <section className="my-8" aria-labelledby="search-results-title">
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
              <div className="space-y-5">
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
              <div className="empty-state clean-card p-10 text-center">
                <BookOpen className="mx-auto mb-3 h-9 w-9" />
                <p className="font-semibold">
                  لم نجد نتائج تطابق &quot;{searchQuery}&quot;
                </p>
              </div>
            )}
          </section>
        ) : (
          <section className="my-8" aria-labelledby="feelings-title">
            {/* Premium Segmented Category Control */}
            <div className="my-6 rounded-2xl bg-[var(--surface-soft)] p-1.5 border border-[var(--border)] shadow-sm">
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {[
                  {
                    id: 'all' as const,
                    label: 'جميع الأقسام',
                    icon: Compass,
                    count: filteredFeelings.length,
                  },
                  {
                    id: 'daily' as const,
                    label: 'الأذكار اليومية',
                    icon: Sun,
                    count: filteredFeelings.filter((f) => f.category === 'daily').length,
                  },
                  {
                    id: 'situational' as const,
                    label: 'المواقف والرقية',
                    icon: GraduationCap,
                    count: filteredFeelings.filter((f) => f.category === 'situational').length,
                  },
                  {
                    id: 'emotional' as const,
                    label: 'أذكار المشاعر',
                    icon: BookOpen,
                    count: filteredFeelings.filter((f) => (f.category || 'emotional') === 'emotional').length,
                  },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-extrabold sm:text-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-[var(--ink)] text-white shadow-md scale-[1.01]'
                          : 'text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? 'text-[var(--butter)]' : ''}`} />
                      <span>{tab.label}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
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

            <div className="mb-5 flex items-center justify-between">
              <h2 id="feelings-title" className="section-heading">
                <Compass className="h-5 w-5" />
                <span>أقسام الأذكار والأدعية ({filteredFeelings.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
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
