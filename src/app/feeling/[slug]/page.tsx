import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DuaListClient } from '@/components/DuaListClient';
import { getFeelingBySlug, getFeelingsWithGroups, getEmotionTheme } from '@/lib/data';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  const groups = getFeelingsWithGroups();
  return groups.map((g) => ({
    slug: g.slug,
  }));
}

interface FeelingPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: FeelingPageProps) {
  const group = getFeelingBySlug(params.slug);
  if (!group) return { title: 'الشعور غير موجود' };

  return {
    title: `أدعية وأذكار عند الشعور بـ (${group.arabic_name}) | أذكار وأدعية`,
    description: `الأدعية والأذكار النبوية المستحبة عند الشعور بـ (${group.arabic_name}) من القرآن الكريم والسنة المطهرة.`,
  };
}

export default function FeelingPage({ params }: FeelingPageProps) {
  const group = getFeelingBySlug(params.slug);
  if (!group) {
    notFound();
  }

  const theme = getEmotionTheme(group.slug);
  const allGroups = getFeelingsWithGroups();
  const currentIndex = allGroups.findIndex((g) => g.slug === group.slug);
  const prevGroup = currentIndex > 0 ? allGroups[currentIndex - 1] : null;
  const nextGroup = currentIndex < allGroups.length - 1 ? allGroups[currentIndex + 1] : null;

  return (
    <div className="flex flex-col min-h-screen dir-rtl">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-emerald-400 transition-colors mb-5"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع لجميع المشاعر</span>
        </Link>

        {/* Hero Header */}
        <div className={`glass-card p-6 sm:p-10 rounded-3xl mb-8 border ${theme.border} relative overflow-hidden`}>
          <div className={`absolute -left-10 -top-10 w-40 h-40 rounded-full ${theme.bg} blur-3xl`} />

          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-3xl sm:text-4xl shadow-xl">
                {theme.emoji}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">
                  عندما تشعر بأنك
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-white mt-0.5">
                  {group.arabic_name}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-bold text-slate-200 shadow">
                {group.items_count} {group.items_count === 1 ? "دعاء وذكر" : "أدعية وأذكار"}
              </span>
            </div>
          </div>
        </div>

        {/* Dua Cards List */}
        <DuaListClient group={group} />

        {/* Previous & Next Emotion Pagination */}
        <div className="flex items-center justify-between gap-4 mt-12 pt-6 border-t border-slate-800/80">
          {prevGroup ? (
            <Link
              href={`/feeling/${prevGroup.slug}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-card text-xs font-bold text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all active:scale-95"
            >
              <ArrowRight className="w-4 h-4 text-emerald-400" />
              <span>السابق: {prevGroup.arabic_name || prevGroup.feeling}</span>
            </Link>
          ) : <div />}

          {nextGroup && (
            <Link
              href={`/feeling/${nextGroup.slug}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-card text-xs font-bold text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all active:scale-95"
            >
              <span>التالي: {nextGroup.arabic_name || nextGroup.feeling}</span>
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
