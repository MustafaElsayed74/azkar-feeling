const ARABIC_CITATION = /\((?:صحيح|سنن|مسند|المستدرك|الأدب المفرد|عمل اليوم والليلة|فتح الباري|السنن الكبرى)[^)]+\)/g;

const SOURCE_PATTERNS: Array<[RegExp, string]> = [
  [/Bukh[aā]r[iī]\s*([\d٠-٩]+)/i, 'صحيح البخاري رقم $1'],
  [/Muslim\s*([\d٠-٩]+)/i, 'صحيح مسلم رقم $1'],
  [/Tirmidh[iī]\s*([\d٠-٩]+)/i, 'سنن الترمذي رقم $1'],
  [/Ab[uū]\s+D[aā]w[uū]d\s*([\d٠-٩]+)/i, 'سنن أبي داود رقم $1'],
  [/Nas[aā]['‘’]?i[iī]?\s*([\d٠-٩]+)/i, 'سنن النسائي رقم $1'],
  [/Ibn\s+M[aā]jah\s*([\d٠-٩]+)/i, 'سنن ابن ماجه رقم $1'],
  [/A[hḥ]mad\s*([\d٠-٩]+)/i, 'مسند الإمام أحمد رقم $1'],
  [/H[aā]kim\s*([\d٠-٩]+)/i, 'المستدرك للحاكم رقم $1'],
];

/** Build a short label without presenting long context text as a citation. */
export function formatArabicReference(reference: string | null): string {
  if (!reference) return 'لم يُذكر تخريج مختصر في البيانات';

  const quranMatch = reference.match(/(?:Quran|Qur['’]?an)\s*(\d{1,3}):(\d{1,3})/i);
  if (quranMatch) {
    return `القرآن الكريم: السورة ${quranMatch[1]}، الآية ${quranMatch[2]}`;
  }

  const arabicMatches = reference.match(ARABIC_CITATION);
  if (arabicMatches?.length) {
    return arabicMatches[arabicMatches.length - 1].slice(1, -1);
  }

  for (const [pattern, replacement] of SOURCE_PATTERNS) {
    if (pattern.test(reference)) return reference.match(pattern)?.[0].replace(pattern, replacement) ?? replacement;
  }

  const compactReference = reference.replace(/\s+/g, ' ').trim();
  return compactReference.length <= 140
    ? compactReference
    : 'التخريج والسياق مفصّلان في المصدر الأصلي';
}
