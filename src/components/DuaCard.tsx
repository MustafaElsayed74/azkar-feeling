'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Heart, Volume2, Share2, Sparkles, Repeat, BookOpen, Quote, Type } from 'lucide-react';
import { DuaItem } from '@/types';

interface DuaCardProps {
  dua: DuaItem;
  feelingName?: string;
  isBookmarked?: boolean;
  onToggleBookmark?: (dua: DuaItem) => void;
}

export const DuaCard: React.FC<DuaCardProps> = ({ dua, feelingName, isBookmarked = false, onToggleBookmark }) => {
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(isBookmarked);

  useEffect(() => {
    setSaved(isBookmarked);
  }, [isBookmarked]);

  const handleCopy = () => {
    const textToCopy = `✨ ${dua.title}\n\n${dua.arabic || ''}\n\nالتفسير:\n${dua.translation || ''}\n\nالمصدر: ${dua.reference || dua.quran_reference || 'أذكار وأدعية'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: dua.title,
        text: `${dua.title}\n${dua.arabic || ''}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-8 relative border border-slate-800/90 shadow-2xl overflow-hidden group dir-rtl">
      {/* Top Gradient Highlight Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-l from-emerald-500 via-teal-400 to-amber-400 opacity-90" />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
              {dua.title}
            </h3>
            {feelingName && (
              <span className="text-xs text-emerald-400 font-semibold block mt-0.5">
                الشعور: {feelingName}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex items-center gap-2">
          {/* Repeat Badge */}
          {dua.repeat_count && (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300">
              <Repeat className="w-3.5 h-3.5" />
              <span>يكرر {dua.repeat_count} مرات</span>
            </span>
          )}

          {/* Transliteration Toggle */}
          {dua.transliteration && (
            <button
              onClick={() => setShowTransliteration(!showTransliteration)}
              className={`text-xs px-3 py-1.5 rounded-xl border font-bold transition-all active:scale-95 ${
                showTransliteration
                  ? 'bg-slate-800 border-slate-700 text-emerald-400'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="النطق بالإنجليزية"
            >
              النطق الصوتية
            </button>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all active:scale-95"
            title="نسخ النص"
          >
            {copied ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all active:scale-95"
            title="مشاركة"
          >
            <Share2 className="w-4.5 h-4.5" />
          </button>

          {/* Bookmark Button */}
          {onToggleBookmark && (
            <button
              onClick={() => {
                setSaved(!saved);
                onToggleBookmark(dua);
              }}
              className={`p-2.5 rounded-xl border transition-all active:scale-95 ${
                saved
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-rose-400 hover:border-slate-700'
              }`}
              title={saved ? 'إزالة من المحفوظات' : 'حفظ في المفضلة'}
            >
              <Heart className={`w-4.5 h-4.5 ${saved ? 'fill-rose-400' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Main Arabic Text Box */}
      {dua.arabic && (
        <div className="bg-slate-900/95 border border-emerald-900/40 rounded-2xl p-6 sm:p-8 my-5 text-right shadow-inner">
          <p className="font-arabic text-2xl sm:text-3xl text-emerald-200 leading-loose tracking-wide select-all">
            {dua.arabic}
          </p>
        </div>
      )}

      {/* Audio Recitation Player */}
      {dua.audio_url && (
        <div className="my-4 p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center gap-3">
          <Volume2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <audio controls className="w-full h-8 accent-emerald-500">
            <source src={dua.audio_url} />
            متصفحك لا يدعم تشغيل الصوت.
          </audio>
        </div>
      )}

      {/* Transliteration Guide */}
      {showTransliteration && dua.transliteration && (
        <div className="my-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-left dir-ltr">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            English Transliteration
          </span>
          <p className="text-sm italic text-slate-300 leading-relaxed font-sans">
            {dua.transliteration}
          </p>
        </div>
      )}

      {/* Translation / Meaning */}
      {dua.translation && (
        <div className="my-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            التفسير والمعنى بالإنجليزية
          </span>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans text-left dir-ltr bg-slate-900/30 p-3.5 rounded-xl border border-slate-800/40">
            {dua.translation}
          </p>
        </div>
      )}

      {/* Hadith / Virtue Context Note */}
      {(dua.hadith || dua.virtue || dua.benefit || dua.description) && (
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-200 text-sm leading-relaxed">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs mb-2">
            <Quote className="w-4 h-4 text-amber-400" />
            <span>فضل هذا الذكر والمناسبة</span>
          </div>
          <p className="text-slate-200 font-medium">
            {dua.virtue || dua.hadith || dua.benefit || dua.description}
          </p>
        </div>
      )}

      {/* Reference Footer */}
      {(dua.reference || dua.quran_reference) && (
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-300">
              {dua.quran_reference || dua.reference}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            مصدر موثوق
          </span>
        </div>
      )}
    </div>
  );
};
