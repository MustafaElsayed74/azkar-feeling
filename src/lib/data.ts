import feelingsData from "@/data/feelings.json";
import duasByFeelingData from "@/data/duas_by_feeling.json";
import duasFlatData from "@/data/duas_flat.json";
import { getArabicDuaTitle } from "@/lib/dua-titles";
import {
  FeelingMeta,
  FeelingGroup,
  FlatDuaItem,
  DuaItem,
  SearchDuaItem,
} from "@/types";

export const EMOTION_ARABIC_NAMES: Record<string, string> = {
  sad: "حزين",
  anxious: "قلق",
  angry: "غاضب",
  lonely: "وحيد",
  depressed: "مكتئب",
  grateful: "شاكر",
  happy: "سعيد",
  confused: "حائر",
  scared: "خائف",
  suicidal: "في ضيق شديد",
  bored: "ملول",
  confident: "واثق",
  content: "راضٍ",
  doubtful: "متردد وشاكّ",
  greedy: "حريص وطماع",
  guilty: "مذنب",
  hurt: "مجروح",
  indecisive: "متردد",
  hypocritical: "خائف من النفاق",
  jealous: "خائف من الحسد",
  lazy: "كسلان وعاجز",
  lost: "تائه",
  nervous: "متوتر",
  overwhelmed: "مثقل ومجهد",
  regret: "نادم",
  tired: "متعب",
  unloved: "تشعر بالجفاء",
  weak: "ضعيف",
};

export const EMOTION_THEMES: Record<
  string,
  { emoji: string; bg: string; border: string; text: string; gradient: string }
> = {
  sad: {
    emoji: "🌧️",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    gradient: "from-blue-600 to-sky-400",
  },
  anxious: {
    emoji: "🌩️",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    text: "text-indigo-400",
    gradient: "from-indigo-600 to-purple-400",
  },
  angry: {
    emoji: "🔥",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-400",
    gradient: "from-rose-600 to-red-400",
  },
  lonely: {
    emoji: "🌙",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
    gradient: "from-violet-600 to-indigo-400",
  },
  depressed: {
    emoji: "⛈️",
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
    text: "text-slate-400",
    gradient: "from-slate-600 to-gray-400",
  },
  grateful: {
    emoji: "✨",
    bg: "bg-[#CBA1D4]/10",
    border: "border-[#CBA1D4]/30",
    text: "text-[#CBA1D4]",
    gradient: "from-[#CBA1D4] to-teal-400",
  },
  happy: {
    emoji: "☀️",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    gradient: "from-amber-500 to-yellow-300",
  },
  confused: {
    emoji: "🌫️",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    gradient: "from-cyan-600 to-teal-400",
  },
  scared: {
    emoji: "🕯️",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-400",
    gradient: "from-orange-600 to-amber-400",
  },
  suicidal: {
    emoji: "🛡️",
    bg: "bg-red-500/15",
    border: "border-red-500/40",
    text: "text-red-400",
    gradient: "from-red-700 to-rose-500",
  },
  bored: {
    emoji: "⏳",
    bg: "bg-teal-500/10",
    border: "border-teal-500/30",
    text: "text-teal-400",
    gradient: "from-teal-600 to-[#CBA1D4]",
  },
  confident: {
    emoji: "🦁",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    gradient: "from-amber-600 to-yellow-400",
  },
  content: {
    emoji: "🌱",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-400",
    gradient: "from-green-600 to-[#CBA1D4]",
  },
  doubtful: {
    emoji: "🧩",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-400",
    gradient: "from-purple-600 to-indigo-400",
  },
  greedy: {
    emoji: "🌾",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    gradient: "from-yellow-600 to-amber-400",
  },
  guilty: {
    emoji: "🕊️",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    text: "text-sky-400",
    gradient: "from-sky-600 to-blue-400",
  },
  hurt: {
    emoji: "🩹",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    text: "text-pink-400",
    gradient: "from-pink-600 to-rose-400",
  },
  indecisive: {
    emoji: "🔀",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    gradient: "from-blue-600 to-cyan-400",
  },
  hypocritical: {
    emoji: "🪞",
    bg: "bg-stone-500/10",
    border: "border-stone-500/30",
    text: "text-stone-400",
    gradient: "from-stone-600 to-zinc-400",
  },
  jealous: {
    emoji: "👁️",
    bg: "bg-lime-500/10",
    border: "border-lime-500/30",
    text: "text-lime-400",
    gradient: "from-lime-600 to-green-400",
  },
  lazy: {
    emoji: "🔋",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/30",
    text: "text-zinc-400",
    gradient: "from-zinc-600 to-slate-400",
  },
  lost: {
    emoji: "🧭",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    gradient: "from-cyan-600 to-blue-400",
  },
  nervous: {
    emoji: "💓",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-400",
    gradient: "from-rose-600 to-pink-400",
  },
  overwhelmed: {
    emoji: "🌊",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    gradient: "from-blue-600 to-teal-400",
  },
  regret: {
    emoji: "💧",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    text: "text-indigo-400",
    gradient: "from-indigo-600 to-blue-400",
  },
  tired: {
    emoji: "🛌",
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
    text: "text-slate-400",
    gradient: "from-slate-600 to-zinc-400",
  },
  unloved: {
    emoji: "🤍",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    text: "text-pink-400",
    gradient: "from-pink-600 to-purple-400",
  },
  weak: {
    emoji: "⛰️",
    bg: "bg-[#CBA1D4]/10",
    border: "border-[#CBA1D4]/30",
    text: "text-[#CBA1D4]",
    gradient: "from-[#CBA1D4] to-teal-400",
  },
};

export const DEFAULT_THEME = {
  emoji: "🤲",
  bg: "bg-[#CBA1D4]/10",
  border: "border-[#CBA1D4]/30",
  text: "text-[#CBA1D4]",
  gradient: "from-[#CBA1D4] to-teal-400",
};

function enrichQuranMetadata<T extends DuaItem>(dua: T): T {
  if (dua.quran_reference || dua.ayah) return dua;

  const match = dua.translation?.match(/\((\d{1,3}):(\d{1,3})\)/);
  if (!match) return dua;

  const [, surahNumber, ayahNumber] = match;
  return {
    ...dua,
    quran_reference: `Quran ${surahNumber}:${ayahNumber}`,
    surah: surahNumber,
    ayah: Number(ayahNumber),
  };
}

export function getEmotionArabicName(
  slug: string,
  englishName?: string,
): string {
  return EMOTION_ARABIC_NAMES[slug.toLowerCase()] || englishName || slug;
}

export function getEmotionTheme(slug: string) {
  return EMOTION_THEMES[slug.toLowerCase()] || DEFAULT_THEME;
}

export function getAllFeelings(): FeelingMeta[] {
  return (feelingsData as FeelingMeta[]).map((f) => ({
    ...f,
    arabic_name: getEmotionArabicName(f.feeling_slug, f.feeling_name),
  }));
}

export function getFeelingsWithGroups(): FeelingGroup[] {
  return (duasByFeelingData as { feelings: FeelingGroup[] }).feelings.map(
    (g) => ({
      ...g,
      arabic_name: getEmotionArabicName(g.slug, g.feeling),
      duas: g.duas.map((dua) => ({
        ...enrichQuranMetadata(dua),
        title_arabic: getArabicDuaTitle(
          dua,
          getEmotionArabicName(g.slug, g.feeling),
        ),
      })),
    }),
  );
}

export function getFeelingBySlug(
  slug: string,
): (FeelingGroup & { arabic_name: string }) | undefined {
  const groups = getFeelingsWithGroups();
  const group = groups.find((g) => g.slug.toLowerCase() === slug.toLowerCase());
  if (group) {
    return {
      ...group,
      arabic_name: getEmotionArabicName(group.slug, group.feeling),
    };
  }
  return undefined;
}

export function getAllDuasFlat(): FlatDuaItem[] {
  return (duasFlatData as FlatDuaItem[]).map((d) => ({
    ...enrichQuranMetadata(d),
    arabic_feeling: getEmotionArabicName(d.feeling_slug, d.feeling),
    title_arabic: getArabicDuaTitle(
      d,
      getEmotionArabicName(d.feeling_slug, d.feeling),
    ),
  }));
}

export { getArabicDuaTitle } from "@/lib/dua-titles";

/**
 * Build one client-search record per unique dua and retain its many-to-many
 * relationship with feelings. This removes repeated search cards and avoids
 * shipping the nested and flat datasets to the browser.
 */
export function getSearchDuas(): SearchDuaItem[] {
  const uniqueDuas = new Map<string, SearchDuaItem>();

  for (const dua of getAllDuasFlat()) {
    const key = `${dua.title}\u0000${dua.arabic ?? ""}`;
    const feeling = {
      name: dua.feeling,
      slug: dua.feeling_slug,
      arabic_name: dua.arabic_feeling || dua.feeling,
    };
    const existing = uniqueDuas.get(key);

    if (existing) {
      if (!existing.feelings.some((item) => item.slug === feeling.slug)) {
        existing.feelings.push(feeling);
      }
      continue;
    }

    const item: DuaItem = {
      title: dua.title,
      title_arabic: dua.title_arabic,
      arabic: dua.arabic,
      transliteration: dua.transliteration,
      translation: dua.translation,
      description: dua.description,
      benefit: dua.benefit,
      virtue: dua.virtue,
      hadith: dua.hadith,
      reference: dua.reference,
      source: dua.source,
      quran_reference: dua.quran_reference,
      surah: dua.surah,
      ayah: dua.ayah,
      narrator: dua.narrator,
      repeat_count: dua.repeat_count,
      audio_url: dua.audio_url,
      image_url: dua.image_url,
      source_url: dua.source_url,
    };
    uniqueDuas.set(key, { ...item, feelings: [feeling] });
  }

  return Array.from(uniqueDuas.values());
}
