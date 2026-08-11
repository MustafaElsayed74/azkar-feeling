'use client';

import { useEffect, useState } from 'react';
import {
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Heart,
  Repeat,
  Share2,
  Volume2,
} from 'lucide-react';
import type { DuaItem } from '@/types';
import { SITE_URL } from '@/lib/constants';
import { getArabicDuaTitle } from '@/lib/dua-titles';
import { formatArabicReference } from '@/lib/references';

interface DuaCardProps {
  dua: DuaItem;
  feelingName?: string;
  feelingSlug?: string;
  isBookmarked?: boolean;
  onToggleBookmark?: (dua: DuaItem) => void;
}

export function DuaCard({
  dua,
  feelingName,
  feelingSlug,
  isBookmarked = false,
  onToggleBookmark,
}: DuaCardProps) {
  const [copied, setCopied] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);
  const [showAudio, setShowAudio] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const relatedFeelings =
    'feelings' in dua && Array.isArray(dua.feelings) ? dua.feelings : [];
  const embeddedSlug = dua.feeling_slug || relatedFeelings[0]?.slug;
  const targetSlug = feelingSlug || embeddedSlug;
  const duaUrl = targetSlug ? `${SITE_URL}/feeling/${targetSlug}` : SITE_URL;
  const arabicTitle = getArabicDuaTitle(dua, feelingName);
  const arabicReference = formatArabicReference(
    dua.quran_reference || dua.reference,
  );
  const hasEnglishDetails = Boolean(
    dua.translation ||
      dua.transliteration ||
      dua.hadith ||
      dua.virtue ||
      dua.benefit ||
      dua.description,
  );

  const handleCopy = async () => {
    const text = [
      `✨ ${arabicTitle}`,
      dua.arabic,
      `المصدر: ${arabicReference}`,
      `رابط الذكر: ${duaUrl}`,
    ]
      .filter(Boolean)
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const handleShare = async () => {
    if (!navigator.share) {
      await handleCopy();
      return;
    }

    try {
      await navigator.share({
        title: arabicTitle,
        text: `✨ ${arabicTitle}\n${dua.arabic || ''}`,
        url: duaUrl,
      });
    } catch {
      // Closing the native share sheet is a normal user action.
    }
  };

  return (
    <article className="dua-card clean-card relative p-5 text-right sm:p-7">
      <header className="divider mb-4 flex items-start justify-between gap-3 pb-4">
        <div>
          <h3 className="text-lg font-extrabold leading-8 sm:text-xl">
            {arabicTitle}
          </h3>
          {feelingName && (
            <span className="feeling-label mt-1 block text-xs font-bold">
              الشعور: {feelingName}
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {dua.repeat_count && (
            <span className="repeat-badge">
              <Repeat className="h-3.5 w-3.5" />
              <span>{dua.repeat_count} مرات</span>
            </span>
          )}

          {onToggleBookmark && (
            <button
              type="button"
              onClick={() =>
                onToggleBookmark(
                  targetSlug ? { ...dua, feeling_slug: targetSlug } : dua,
                )
              }
              className={`icon-button ${isBookmarked ? 'is-bookmarked' : ''}`}
              aria-label={
                isBookmarked ? 'إزالة من المحفوظات' : 'حفظ في المحفوظات'
              }
              aria-pressed={isBookmarked}
            >
              <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </header>

      {dua.arabic && (
        <div className="dua-arabic-box my-3 px-4 py-5 sm:px-6">
          <p className="font-arabic select-all text-2xl leading-loose sm:text-3xl">
            {dua.arabic}
          </p>
        </div>
      )}

      {showAudio && dua.audio_url && (
        <div className="details-drawer my-4 p-3">
          <audio controls autoPlay className="h-9 w-full">
            <source src={dua.audio_url} />
            المتصفح لا يدعم التشغيل الصوتي.
          </audio>
        </div>
      )}

      {showEnglish && hasEnglishDetails && (
        <div className="details-drawer mt-4 space-y-4 p-4 text-sm">
          {dua.translation && (
            <section>
              <h4 className="detail-heading">الترجمة الإنجليزية</h4>
              <p dir="ltr" lang="en" className="detail-copy">
                {dua.translation}
              </p>
            </section>
          )}

          {(dua.hadith || dua.virtue || dua.benefit || dua.description) && (
            <section>
              <h4 className="detail-heading">السياق والفضل</h4>
              <p dir="ltr" lang="en" className="detail-copy">
                {dua.hadith || dua.virtue || dua.benefit || dua.description}
              </p>
            </section>
          )}

          {dua.transliteration && (
            <section>
              <h4 className="detail-heading">النطق بالحروف اللاتينية</h4>
              <p dir="ltr" lang="en" className="detail-copy italic">
                {dua.transliteration}
              </p>
            </section>
          )}
        </div>
      )}

      <footer className="divider mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 text-xs">
        <div className="min-w-0 flex-1">
          <div className="reference-label flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 shrink-0" />
            <span className="truncate font-bold">{arabicReference}</span>
          </div>
          {dua.source_url && (
            <a
              href={dua.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link mt-1.5 inline-flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              <span>عرض المصدر الأصلي</span>
            </a>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {hasEnglishDetails && (
            <button
              type="button"
              onClick={() => setShowEnglish((visible) => !visible)}
              className="secondary-button compact"
              aria-expanded={showEnglish}
            >
              {showEnglish ? 'إخفاء الترجمة' : 'الترجمة والسياق'}
            </button>
          )}

          {dua.audio_url && (
            <button
              type="button"
              onClick={() => setShowAudio((visible) => !visible)}
              className="icon-button"
              aria-label={showAudio ? 'إخفاء التلاوة' : 'تشغيل التلاوة'}
              aria-pressed={showAudio}
            >
              <Volume2 className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="icon-button"
            aria-label={copied ? 'تم نسخ الذكر' : 'نسخ الذكر'}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="icon-button"
            aria-label="مشاركة الذكر"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </footer>

      <span className="sr-only" aria-live="polite">
        {copied ? 'تم نسخ الذكر' : ''}
      </span>
    </article>
  );
}
