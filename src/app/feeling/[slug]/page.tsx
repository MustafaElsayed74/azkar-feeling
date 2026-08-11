import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DuaListClient } from '@/components/DuaListClient';
import { CrisisSupport } from '@/components/CrisisSupport';
import { getFeelingBySlug, getFeelingsWithGroups, getEmotionTheme } from '@/lib/data';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  const groups = getFeelingsWithGroups();
  return groups.map((g) => ({
    slug: g.slug,
  }));
}

interface FeelingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: FeelingPageProps) {
  const { slug } = await params;
  const group = getFeelingBySlug(slug);
  if (!group) return { title: 'الشعور غير موجود' };

  return {
    title: `أدعية وأذكار عند الشعور بـ (${group.arabic_name}) | أذكار وأدعية`,
    description: `الأدعية والأذكار النبوية المستحبة عند الشعور بـ (${group.arabic_name}) من القرآن الكريم والسنة المطهرة.`,
    alternates: {
      canonical: `/feeling/${group.slug}`,
    },
  };
}

export default async function FeelingPage({ params }: FeelingPageProps) {
  const { slug } = await params;
  const group = getFeelingBySlug(slug);
  if (!group) {
    notFound();
  }

  const theme = getEmotionTheme(group.slug);
  const allGroups = getFeelingsWithGroups();
  const currentIndex = allGroups.findIndex((g) => g.slug === group.slug);
  const prevGroup = currentIndex > 0 ? allGroups[currentIndex - 1] : null;
  const nextGroup = currentIndex < allGroups.length - 1 ? allGroups[currentIndex + 1] : null;

  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Back Link */}
        <Link
          href="/"
          className="back-link mb-4"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع لجميع المشاعر</span>
        </Link>

        {/* Minimal Category Header */}
        <div className="hero-panel mb-6 flex items-center justify-between gap-4 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="theme-icon-wrap h-12 w-12 shrink-0 rounded-2xl text-2xl">
              {theme.emoji}
            </div>
            <div>
              <span className="feeling-label block text-[11px] font-bold">
                أدعية وأذكار عند
              </span>
              <h1 className="mt-0.5 text-xl font-extrabold sm:text-2xl">
                {group.arabic_name}
              </h1>
            </div>
          </div>

          <span className="theme-badge rounded-xl px-3 py-1 text-xs font-bold">
            {group.items_count} {group.items_count === 1 ? 'دعاء' : 'أدعية'}
          </span>
        </div>

        {group.slug === 'suicidal' && <CrisisSupport />}

        {/* Duas List */}
        <DuaListClient group={group} />

        {/* Pagination */}
        <div className="divider mt-8 flex items-center justify-between gap-4 pt-4 text-xs">
          {prevGroup ? (
            <Link
              href={`/feeling/${prevGroup.slug}`}
              className="pagination-link"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>{prevGroup.arabic_name || prevGroup.feeling}</span>
            </Link>
          ) : <div />}

          {nextGroup && (
            <Link
              href={`/feeling/${nextGroup.slug}`}
              className="pagination-link"
            >
              <span>{nextGroup.arabic_name || nextGroup.feeling}</span>
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
