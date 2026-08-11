import duaTitlesArabic from "@/data/dua_titles_ar.json";
import type { DuaItem } from "@/types";

const REVIEWED_TITLES = duaTitlesArabic as Record<string, string>;

/** Return an exact reviewed Arabic title; never partially translate a title. */
export function getArabicDuaTitle(
  dua: Pick<DuaItem, "title" | "title_arabic">,
  emotionArabicName?: string,
): string {
  if (dua.title_arabic) return dua.title_arabic;
  if (/[\u0600-\u06FF]/.test(dua.title)) return dua.title;

  const reviewedTitle = REVIEWED_TITLES[dua.title];
  if (reviewedTitle) return reviewedTitle;

  return emotionArabicName
    ? `دعاء عند الشعور بـ ${emotionArabicName}`
    : "دعاء يحتاج إلى مراجعة عنوانه";
}

export function hasReviewedArabicTitle(title: string): boolean {
  return Boolean(REVIEWED_TITLES[title]);
}
