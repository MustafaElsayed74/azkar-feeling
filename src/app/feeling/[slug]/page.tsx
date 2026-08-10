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
    <div className="flex flex-col min-h-screen dir-rtl bg-[#0b1329]">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors mb-4"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع لجميع المشاعر</span>
        </Link>

        {/* Minimal Category Header */}
        <div className="clean-card p-5 sm:p-6 mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl shrink-0">
              {theme.emoji}
            </div>
            <div>
              <span className="text-[11px] font-medium text-emerald-400 block">
                أدعية وأذكار عند
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {group.arabic_name}
              </h1>
            </div>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            {group.items_count} {group.items_count === 1 ? 'دعاء' : 'أدعية'}
          </span>
        </div>

        {/* Duas List */}
        <DuaListClient group={group} />

        {/* Pagination */}
        <div className="flex items-center justify-between gap-4 mt-8 pt-4 border-t border-slate-800/60 text-xs">
          {prevGroup ? (
            <Link
              href={`/feeling/${prevGroup.slug}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl clean-card text-slate-300 hover:text-white"
            >
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              <span>{prevGroup.arabic_name || prevGroup.feeling}</span>
            </Link>
          ) : <div />}

          {nextGroup && (
            <Link
              href={`/feeling/${nextGroup.slug}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl clean-card text-slate-300 hover:text-white"
            >
              <span>{nextGroup.arabic_name || nextGroup.feeling}</span>
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
