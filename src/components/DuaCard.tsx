'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Heart, Volume2, Share2, Repeat, BookOpen } from 'lucide-react';
import { DuaItem } from '@/types';
import { SITE_URL } from '@/lib/constants';
import { getArabicDuaTitle } from '@/lib/data';

interface DuaCardProps {
  dua: DuaItem;
  feelingName?: string;
  feelingSlug?: string;
  isBookmarked?: boolean;
  onToggleBookmark?: (dua: DuaItem) => void;
}

/**
 * Format English reference string into dignified Arabic reference
 */
function formatArabicReference(ref: string | null): string {
  if (!ref) return 'من الأذكار المأثورة';

  return ref
    .replace(/Nasā'ī\s*(\d+)/gi, 'سنن النسائي (رقم $1)')
    .replace(/Bukhārī\s*(\d+)/gi, 'صحيح البخاري (رقم $1)')
    .replace(/Muslim\s*(\d+)/gi, 'صحيح مسلم (رقم $1)')
    .replace(/Tirmidhī\s*(\d+)/gi, 'سنن الترمذي (رقم $1)')
    .replace(/Abū Dāwūd\s*(\d+)/gi, 'سنن أبي داود (رقم $1)')
    .replace(/Aḥmad\s*(\d+)/gi, 'مسند الإمام أحمد (رقم $1)')
    .replace(/Ibn Mājah\s*(\d+)/gi, 'سنن ابن ماجه (رقم $1)')
    .replace(/\((\d+):(\d+)\)/g, 'سورة رقم $1 - الآية $2');
}

export const DuaCard: React.FC<DuaCardProps> = ({
  dua,
  feelingName,
  feelingSlug,
  isBookmarked = false,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(isBookmarked);
  const [showEnglish, setShowEnglish] = useState(false);
  const [showAudio, setShowAudio] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked);
  }, [isBookmarked]);

  const targetSlug = feelingSlug || (dua as any).feeling_slug;
  const duaUrl = targetSlug ? `${SITE_URL}/feeling/${targetSlug}` : SITE_URL;
  const arabicTitle = getArabicDuaTitle(dua, feelingName);
  const arabicRef = formatArabicReference(dua.quran_reference || dua.reference);

  const handleCopy = () => {
    const textToCopy = `✨ ${arabicTitle}\n\n${dua.arabic || ''}\n\nالمصدر: ${arabicRef}\nرابط الذكر: ${duaUrl}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: arabicTitle,
        text: `✨ ${arabicTitle}\n${dua.arabic || ''}`,
        url: duaUrl,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const hasEnglishDetails = dua.translation || dua.transliteration || dua.hadith || dua.virtue || dua.benefit || dua.description;

  return (
    <div className="clean-card p-5 sm:p-7 relative border border-slate-800/80 bg-[#111a33] text-right dir-rtl">
      {/* Top Header: Arabic Title & Controls */}
      <div className="flex items-start justify-between gap-3 pb-3 mb-4 border-b border-slate-800/60">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
            {arabicTitle}
          </h3>
          {feelingName && (
            <span className="text-[11px] text-lavender-400 font-semibold block mt-0.5">
              الشعور: {feelingName}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {dua.repeat_count && (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1">
              <Repeat className="w-3 h-3" />
              <span>{dua.repeat_count} مرات</span>
            </span>
          )}

          {onToggleBookmark && (
            <button
              onClick={() => {
                setSaved(!saved);
                onToggleBookmark(dua);
              }}
              className={`p-1.5 rounded-lg border transition-colors ${
                saved
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                  : 'border-slate-800 text-slate-400 hover:text-rose-400'
              }`}
              title={saved ? 'إزالة من المحفوظات' : 'حفظ في المحفوظات'}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-rose-400' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Pure Arabic Text Box */}
      {dua.arabic && (
        <div className="py-4 my-2 text-right">
          <p className="font-arabic text-2xl sm:text-3xl text-lavender-200 leading-loose tracking-wide select-all">
            {dua.arabic}
          </p>
        </div>
      )}

      {/* Audio Player (if active) */}
      {showAudio && dua.audio_url && (
        <div className="my-3 p-2.5 bg-slate-900/90 rounded-xl border border-slate-800">
          <audio controls autoPlay className="w-full h-8 accent-lavender-500">
            <source src={dua.audio_url} />
            المتصفح لا يدعم التشغيل الصوتي.
          </audio>
        </div>
      )}

      {/* Optional English Translation / Transliteration Drawer (Hidden by default for 100% Arabic purity) */}
      {showEnglish && hasEnglishDetails && (
        <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-3 text-xs text-slate-300">
          {dua.translation && (
            <div>
              <span className="font-bold text-lavender-400 block mb-1">الترجمة الإنجليزية (English Translation):</span>
              <p className="text-slate-300 font-sans dir-ltr text-left bg-slate-900/50 p-3 rounded-lg border border-slate-800 leading-relaxed">
                {dua.translation}
              </p>
            </div>
          )}

          {(dua.hadith || dua.virtue || dua.benefit || dua.description) && (
            <div>
              <span className="font-bold text-amber-300 block mb-1">سبب الورود والفضل (Hadith & Context):</span>
              <p className="text-slate-300 font-sans dir-ltr text-left bg-slate-900/50 p-3 rounded-lg border border-slate-800 leading-relaxed">
                {dua.hadith || dua.virtue || dua.benefit || dua.description}
              </p>
            </div>
          )}

          {dua.transliteration && (
            <div>
              <span className="font-bold text-slate-400 block mb-1">النطق الصوتي (Transliteration):</span>
              <p className="text-slate-400 font-sans italic dir-ltr text-left bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
                {dua.transliteration}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bottom Footer Toolbar */}
      <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        {/* Arabic Reference */}
        <div className="flex items-center gap-1.5 text-slate-300">
          <BookOpen className="w-3.5 h-3.5 text-lavender-400 shrink-0" />
          <span className="font-semibold text-[11px] truncate max-w-[200px] sm:max-w-xs">
            {arabicRef}
          </span>
        </div>

        {/* Action Control Buttons */}
        <div className="flex items-center gap-1.5">
          {hasEnglishDetails && (
            <button
              onClick={() => setShowEnglish(!showEnglish)}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showEnglish ? 'إخفاء الإنجليزية' : 'English / الترجمة'}
            </button>
          )}

          {dua.audio_url && (
            <button
              onClick={() => setShowAudio(!showAudio)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-lavender-400 transition-colors"
              title="تلاوة صوتية"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="نسخ الذكر"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-lavender-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="مشاركة"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
