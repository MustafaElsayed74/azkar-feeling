import feelingsData from "@/data/feelings.json";
import duasByFeelingData from "@/data/duas_by_feeling.json";
import duasFlatData from "@/data/duas_flat.json";
import { FeelingMeta, FeelingGroup, FlatDuaItem, DuaItem } from "@/types";

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

export function getEmotionArabicName(
  slug: string,
  englishName?: string,
): string {
  return EMOTION_ARABIC_NAMES[slug.toLowerCase()] || englishName || slug;
}

export function getEmotionTheme(slug: string) {
  return EMOTION_THEMES[slug.toLowerCase()] || DEFAULT_THEME;
}

/**
 * Intelligent Arabic title converter to ensure 100% Arabic Dua titles
 */
export function getArabicDuaTitle(
  dua: DuaItem,
  emotionArabicName?: string,
): string {
  const t = dua.title || "";

  // If already contains Arabic characters, return as is
  if (/[\u0600-\u06FF]/.test(t)) {
    return t;
  }

  // Common Prophet & Surah title translations
  let arabicTitle = t
    .replace(/Duʿa of Prophet Sulayman ﷺ/gi, "دعاء نبي الله سليمان عليه السلام")
    .replace(/Duʿa of Prophet Yusuf ﷺ/gi, "دعاء نبي الله يوسف عليه السلام")
    .replace(
      /Duʿa of Prophet Yunus ﷺ/gi,
      "دعاء نبي الله يونس عليه السلام (ذو النون)",
    )
    .replace(/Duʿa of Prophet Ibrahim ﷺ/gi, "دعاء نبي الله إبراهيم عليه السلام")
    .replace(/Duʿa of Prophet Musa ﷺ/gi, "دعاء نبي الله موسى عليه السلام")
    .replace(/Duʿa of Prophet Ayyub ﷺ/gi, "دعاء نبي الله أيوب عليه السلام")
    .replace(/Duʿa of Prophet Isa ﷺ/gi, "دعاء نبي الله عيسى عليه السلام")
    .replace(/Duʿa of Prophet Adam ﷺ/gi, "دعاء آدم عليه السلام")
    .replace(/Duʿa of the Prophet ﷺ/gi, "دعاء النبي ﷺ")
    .replace(
      /Surah al-Fatihah: The Greatest Duʿa/gi,
      "سورة الفاتحة - أعظم دعاء وذِكر",
    )
    .replace(
      /Duʿa for Protection from Sadness & Anxiety/gi,
      "دعاء الوقاية من الهم والحزن",
    )
    .replace(/Duʿa for Protection from/gi, "دعاء الوقاية من")
    .replace(
      /Duʿa for Gratitude, Good Deeds & Pious Children/gi,
      "دعاء الشكر والعمل الصالح والذريّة الطيبة",
    )
    .replace(/Duʿa for Gratitude/gi, "دعاء الشكر والحمد")
    .replace(/Duʿa for A Good Ending/gi, "دعاء حسن الخاتمة")
    .replace(/Duʿa for Relief from Distress/gi, "دعاء الفرج وكشف الكرب")
    .replace(/Duʿa for Anxiety & Distress/gi, "دعاء الهم والحزن والكرب")
    .replace(/Duʿa for Forgiveness/gi, "دعاء الاستغفار وطلب المغفرة")
    .replace(/Duʿa for Patience/gi, "دعاء طلب الصبر والنزول على الحق")
    .replace(/Duʿa for Guidance/gi, "دعاء طلب الهداية والتوفيق")
    .replace(/Duʿa for Strength/gi, "دعاء طلب القوة والثبات")
    .replace(/Duʿa for Peace/gi, "دعاء طلب السكينة والطمأنينة")
    .replace(/Duʿa for Decision Making/gi, "دعاء الاستخارة وتيسير الأمور")
    .replace(/Duʿa for Healing & Health/gi, "دعاء الشفاء والعافية")
    .replace(/Duʿa for Wealth & Provision/gi, "دعاء سعة الرزق وقضاء الدين")
    .replace(/Duʿa for Anger/gi, "دعاء تسكين الغضب وتهدئة النفس")
    .replace(/Duʿa for Fear/gi, "دعاء الأمان وذهاب الخوف")
    .replace(/Duʿa for Laziness/gi, "دعاء التعوذ من العجز والكسل")
    .replace(/Duʿa for Loneliness/gi, "دعاء ذهاب الوحشة وتيسير الأنيس")
    .replace(/Duʿa for/gi, "دعاء")
    .replace(/Duʿa/gi, "دعاء مبارك")
    .replace(/for/gi, "في");

  // If after regex it's still pure English, construct a dignified Arabic title
  if (!/[\u0600-\u06FF]/.test(arabicTitle)) {
    if (emotionArabicName) {
      return `دعاء وذِكر عند الشعور بـ (${emotionArabicName})`;
    }
    return "دعاء مأثور من السنة والقرآن";
  }

  return arabicTitle;
}

export function getAllFeelings(): FeelingMeta[] {
  return (feelingsData as FeelingMeta[]).map((f) => ({
    ...f,
    arabic_name: getEmotionArabicName(f.feeling_slug, f.feeling_name),
  })) as any[];
}

export function getFeelingsWithGroups(): FeelingGroup[] {
  return (duasByFeelingData as { feelings: FeelingGroup[] }).feelings.map(
    (g) => ({
      ...g,
      arabic_name: getEmotionArabicName(g.slug, g.feeling),
    }),
  ) as any[];
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
    ...d,
    arabic_feeling: getEmotionArabicName(d.feeling_slug, d.feeling),
  })) as any[];
}
