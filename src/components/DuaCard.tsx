'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Heart, Volume2, Share2, Repeat, BookOpen } from 'lucide-react';
import { DuaItem } from '@/types';
import { SITE_URL } from '@/lib/constants';

interface DuaCardProps {
  dua: DuaItem;
  feelingName?: string;
  feelingSlug?: string;
  isBookmarked?: boolean;
  onToggleBookmark?: (dua: DuaItem) => void;
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
  const [showDetails, setShowDetails] = useState(false);
  const [showAudio, setShowAudio] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked);
  }, [isBookmarked]);

  const targetSlug = feelingSlug || (dua as any).feeling_slug;
  const duaUrl = targetSlug ? `${SITE_URL}/feeling/${targetSlug}` : SITE_URL;

  const handleCopy = () => {
    const textToCopy = `✨ ${dua.title}\n\n${dua.arabic || ''}\n\nالمصدر: ${dua.reference || dua.quran_reference || 'أذكار وأدعية'}\n${duaUrl}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: dua.title,
        text: `${dua.title}\n${dua.arabic || ''}`,
        url: duaUrl,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const hasExtraInfo = dua.translation || dua.virtue || dua.hadith || dua.benefit || dua.description;

  return (
    <div className="clean-card p-5 sm:p-7 relative border border-slate-800/80 bg-[#111a33] text-right">
      {/* Top Header: Title & Bookmark */}
      <div className="flex items-start justify-between gap-3 pb-3 mb-4 border-b border-slate-800/60">
        <div>
          <h3 className="text-base font-bold text-slate-100">
            {dua.title}
          </h3>
          {feelingName && (
            <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">
              الشعور: {feelingName}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
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
              title={saved ? 'إزالة' : 'حفظ'}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-rose-400' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Main Arabic Text */}
      {dua.arabic && (
        <div className="py-3 my-2 text-right">
          <p className="font-arabic text-xl sm:text-2xl text-emerald-200 leading-relaxed select-all">
            {dua.arabic}
          </p>
        </div>
      )}

      {/* Audio Recitation (if active) */}
      {showAudio && dua.audio_url && (
        <div className="my-3 p-2 bg-slate-900/90 rounded-xl border border-slate-800">
          <audio controls autoPlay className="w-full h-8 accent-emerald-500">
            <source src={dua.audio_url} />
          </audio>
        </div>
      )}

      {/* Extra Details Accordion */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-3 text-xs text-slate-300">
          {dua.translation && (
            <div>
              <span className="font-bold text-emerald-400 block mb-1">التفسير بالإنجليزية:</span>
              <p className="text-slate-300 font-sans dir-ltr text-left bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                {dua.translation}
              </p>
            </div>
          )}

          {(dua.virtue || dua.hadith || dua.benefit || dua.description) && (
            <div>
              <span className="font-bold text-amber-300 block mb-1">فضائل وملاحظات:</span>
              <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                {dua.virtue || dua.hadith || dua.benefit || dua.description}
              </p>
            </div>
          )}

          {dua.transliteration && (
            <div>
              <span className="font-bold text-slate-400 block mb-1">Transliteration:</span>
              <p className="text-slate-400 font-sans italic dir-ltr text-left">
                {dua.transliteration}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bottom Minimal Action Bar */}
      <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        {/* Source Reference */}
        <div className="flex items-center gap-1.5 text-slate-400">
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span className="truncate max-w-[180px] sm:max-w-xs text-[11px]">
            {dua.quran_reference || dua.reference || 'مصدر موثوق'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {hasExtraInfo && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {showDetails ? 'إخفاء التفاصيل' : 'التفاصيل والمعنى'}
            </button>
          )}

          {dua.audio_url && (
            <button
              onClick={() => setShowAudio(!showAudio)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400"
              title="تشغيل التلاوة"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            title="نسخ"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            title="مشاركة"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
