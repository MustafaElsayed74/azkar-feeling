'use client';

import { useEffect, useId, useState } from 'react';
import {
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Heart,
  Image as ImageIcon,
  Link2,
  LoaderCircle,
  MessageSquareText,
  Repeat,
  Share2,
  Volume2,
} from 'lucide-react';
import type { DuaItem } from '@/types';
import { SITE_URL } from '@/lib/constants';
import { getArabicDuaTitle } from '@/lib/dua-titles';
import { formatArabicReference } from '@/lib/references';
import { AudioPlayer } from './AudioPlayer';
import { Toast } from './Toast';

interface DuaCardProps {
  dua: DuaItem;
  feelingName?: string;
  feelingSlug?: string;
  isBookmarked?: boolean;
  onToggleBookmark?: (dua: DuaItem) => void;
}

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height,
  );
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function wrapCanvasText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let line = '';

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });

  if (line) lines.push(line);
  return lines;
}

function fitArabicText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontFamily: string,
) {
  const comfortableLineCount = 15;

  for (let fontSize = 54; fontSize >= 32; fontSize -= 2) {
    context.font = `400 ${fontSize}px ${fontFamily}`;
    const lines = wrapCanvasText(context, text, maxWidth);
    if (lines.length <= comfortableLineCount) {
      return { fontSize, lines };
    }
  }

  context.font = `400 32px ${fontFamily}`;
  return { fontSize: 32, lines: wrapCanvasText(context, text, maxWidth) };
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Could not generate the dua image.'));
    }, 'image/png');
  });
}

function wasShareCancelled(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

export function DuaCard({
  dua,
  feelingName,
  feelingSlug,
  isBookmarked = false,
  onToggleBookmark,
}: DuaCardProps) {
  const shareOptionsId = useId();
  const [copied, setCopied] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareStatus, setShareStatus] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCreatingImage, setIsCreatingImage] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  useEffect(() => {
    if (!shareStatus) return;
    const timeout = window.setTimeout(() => setShareStatus(''), 3500);
    return () => window.clearTimeout(timeout);
  }, [shareStatus]);

  const relatedFeelings =
    'feelings' in dua && Array.isArray(dua.feelings) ? dua.feelings : [];
  const embeddedSlug = dua.feeling_slug || relatedFeelings[0]?.slug;
  const targetSlug = feelingSlug || embeddedSlug;
  const duaUrl = targetSlug ? `${SITE_URL}/feeling/${targetSlug}` : SITE_URL;
  const arabicTitle = getArabicDuaTitle(dua, feelingName);
  const arabicReference = formatArabicReference(
    dua.quran_reference || dua.reference,
  );
  const hasDetails = Boolean(
    dua.translation ||
      dua.transliteration ||
      dua.context_arabic,
  );
  const shareText = [
    `✨ ${arabicTitle}`,
    dua.arabic,
    `المصدر: ${arabicReference}`,
  ]
    .filter(Boolean)
    .join('\n\n');

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
      triggerToast('تم نسخ الذكر بنجاح ✨');
    } catch {
      setCopied(false);
    }
  };

  const handleShareText = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: arabicTitle, text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        triggerToast('تم نسخ نص الذكر بنجاح ✨');
      }
      setShowShareOptions(false);
    } catch (error) {
      if (!wasShareCancelled(error)) {
        setShareStatus('تعذرت مشاركة النص. حاول نسخه بدلًا من ذلك.');
      }
    }
  };

  const handleShareLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: arabicTitle, url: duaUrl });
      } else {
        await navigator.clipboard.writeText(duaUrl);
        triggerToast('تم نسخ رابط الذكر بنجاح ✨');
      }
      setShowShareOptions(false);
    } catch (error) {
      if (!wasShareCancelled(error)) {
        setShareStatus('تعذر إرسال الرابط.');
      }
    }
  };

  const createDuaImage = async () => {
    await document.fonts.ready;

    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas is unavailable.');

    const styles = getComputedStyle(document.documentElement);
    const cairoFont = styles.getPropertyValue('--font-cairo').trim() || 'sans-serif';
    const amiriFont = styles.getPropertyValue('--font-amiri').trim() || 'serif';

    context.direction = 'rtl';
    context.font = `700 48px ${cairoFont}`;
    const titleLines = wrapCanvasText(context, arabicTitle, 840).slice(0, 2);
    const dividerY = titleLines.length > 1 ? 390 : 325;
    const fittedText = fitArabicText(context, dua.arabic || '', 810, amiriFont);
    const lineHeight = fittedText.fontSize * 1.65;
    const arabicStartY = dividerY + 90;
    const arabicEndY =
      arabicStartY + Math.max(0, fittedText.lines.length - 1) * lineHeight;
    const referenceY = Math.max(1200, arabicEndY + 130);
    canvas.height = Math.ceil(referenceY + 145);

    context.direction = 'rtl';
    context.fillStyle = '#FBFAF8';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawRoundedRect(context, 60, 55, 960, canvas.height - 110, 40);
    context.fillStyle = '#FFFFFF';
    context.fill();
    context.strokeStyle = '#E3DCE5';
    context.lineWidth = 3;
    context.stroke();

    context.fillStyle = '#CBA1D4';
    context.fillRect(60, 55, 960, 16);

    drawRoundedRect(context, 744, 105, 216, 64, 32);
    context.fillStyle = '#FEEB9C';
    context.fill();
    context.fillStyle = '#332737';
    context.font = `700 28px ${cairoFont}`;
    context.textAlign = 'center';
    context.fillText('مأوى', 852, 147);

    context.textAlign = 'right';
    context.font = `700 48px ${cairoFont}`;
    titleLines.forEach((line, index) => {
      context.fillText(line, 930, 235 + index * 66);
    });

    context.strokeStyle = '#E3DCE5';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(130, dividerY);
    context.lineTo(950, dividerY);
    context.stroke();

    context.font = `400 ${fittedText.fontSize}px ${amiriFont}`;
    context.fillStyle = '#332737';
    fittedText.lines.forEach((line, index) => {
      context.fillText(line, 930, arabicStartY + index * lineHeight);
    });

    context.fillStyle = '#CBA1D4';
    context.fillRect(130, referenceY - 65, 820, 5);
    context.fillStyle = '#756B78';
    context.font = `600 28px ${cairoFont}`;
    context.fillText(arabicReference, 930, referenceY);
    context.font = `500 24px ${cairoFont}`;
    context.fillText('مأوى — أذكار وأدعية حسب شعورك', 930, referenceY + 50);

    return canvasToBlob(canvas);
  };

  const handleShareImage = async () => {
    setIsCreatingImage(true);

    try {
      const imageBlob = await createDuaImage();
      const file = new File([imageBlob], `dua-${targetSlug || 'azkar'}.png`, {
        type: 'image/png',
      });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: arabicTitle, files: [file] });
      } else {
        const downloadUrl = URL.createObjectURL(imageBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = file.name;
        downloadLink.click();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
        triggerToast('تم تنزيل صورة الذكر بنجاح ✨');
      }
      setShowShareOptions(false);
    } catch (error) {
      if (!wasShareCancelled(error)) {
        setShareStatus('تعذر إنشاء صورة الذكر.');
      }
    } finally {
      setIsCreatingImage(false);
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
              className={`icon-button ${isBookmarked ? 'is-bookmarked animate-heart-pulse' : ''}`}
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
        <AudioPlayer src={dua.audio_url} />
      )}

      {showEnglish && hasDetails && (
        <div className="details-drawer mt-4 space-y-4 p-4 text-sm">
          {dua.context_arabic && (
            <section>
              <h4 className="detail-heading">السياق والفضل</h4>
              <p lang="ar" dir="rtl" className="detail-copy detail-copy-arabic">
                {dua.context_arabic}
              </p>
            </section>
          )}

          {dua.translation && (
            <section>
              <h4 className="detail-heading">الترجمة الإنجليزية</h4>
              <p dir="ltr" lang="en" className="detail-copy">
                {dua.translation}
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
          {hasDetails && (
            <button
              type="button"
              onClick={() => setShowEnglish((visible) => !visible)}
              className="secondary-button compact"
              aria-expanded={showEnglish}
            >
              {showEnglish
                ? 'إخفاء التفاصيل'
                : (dua.translation || dua.transliteration)
                  ? 'الترجمة والسياق'
                  : 'السياق والفضل'}
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
            onClick={() => setShowShareOptions((visible) => !visible)}
            className="icon-button"
            aria-label="خيارات مشاركة الذكر"
            aria-expanded={showShareOptions}
            aria-controls={shareOptionsId}
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </footer>

      {showShareOptions && (
        <div
          id={shareOptionsId}
          className="share-options"
          role="group"
          aria-label="اختر طريقة المشاركة"
        >
          <button type="button" className="share-option" onClick={handleShareText}>
            <MessageSquareText className="h-5 w-5" />
            <span>كنص</span>
          </button>
          <button
            type="button"
            className="share-option"
            onClick={handleShareImage}
            disabled={isCreatingImage}
            aria-busy={isCreatingImage}
          >
            {isCreatingImage ? (
              <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
              <ImageIcon className="h-5 w-5" />
            )}
            <span>{isCreatingImage ? 'جارٍ الإنشاء' : 'كصورة'}</span>
          </button>
          <button type="button" className="share-option" onClick={handleShareLink}>
            <Link2 className="h-5 w-5" />
            <span>كرابط</span>
          </button>
        </div>
      )}

      {shareStatus && (
        <p className="share-status" role="status">
          {shareStatus}
        </p>
      )}

      <Toast message={toastMessage} />

      <span className="sr-only" aria-live="polite">
        {copied ? 'تم نسخ الذكر' : ''}
      </span>
    </article>
  );
}
