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
  morning: "أذكار الصباح",
  evening: "أذكار المساء",
  sleep: "أذكار النوم والاستيقاظ",
  prayer: "أذكار الصلاة",
  study: "أذكار المذاكرة والامتحانات",
  travel: "أذكار السفر والتنقل",
  healing: "أدعية الشفاء والرقية",
  sustenance: "أدعية الرزق والفرج",
};

export const CATEGORY_MAP: Record<string, 'daily' | 'situational' | 'emotional'> = {
  morning: 'daily',
  evening: 'daily',
  sleep: 'daily',
  prayer: 'daily',
  study: 'situational',
  travel: 'situational',
  healing: 'situational',
  sustenance: 'situational',
};

export function getCategoryBySlug(slug: string): 'daily' | 'situational' | 'emotional' {
  return CATEGORY_MAP[slug.toLowerCase()] || 'emotional';
}

export const EMOTION_THEMES: Record<
  string,
  { emoji: string; bg: string; border: string; text: string; gradient: string }
> = {
  morning: { emoji: "🌅", bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", gradient: "from-amber-500 to-yellow-300" },
  evening: { emoji: "🌆", bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", gradient: "from-purple-600 to-indigo-400" },
  sleep: { emoji: "🌙", bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", gradient: "from-indigo-600 to-slate-400" },
  prayer: { emoji: "🕌", bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", gradient: "from-emerald-600 to-teal-400" },
  study: { emoji: "📚", bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", gradient: "from-blue-600 to-indigo-400" },
  travel: { emoji: "🧭", bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", gradient: "from-cyan-600 to-blue-400" },
  healing: { emoji: "🌿", bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-400", gradient: "from-teal-600 to-emerald-400" },
  sustenance: { emoji: "✨", bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400", gradient: "from-yellow-500 to-amber-300" },
  sad: { emoji: "🌧️", bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", gradient: "from-blue-600 to-sky-400" },
  anxious: { emoji: "🌩️", bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", gradient: "from-indigo-600 to-purple-400" },
  angry: { emoji: "🔥", bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", gradient: "from-rose-600 to-red-400" },
  lonely: { emoji: "🌙", bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-400", gradient: "from-violet-600 to-indigo-400" },
  depressed: { emoji: "⛈️", bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-400", gradient: "from-slate-600 to-gray-400" },
  grateful: { emoji: "✨", bg: "bg-[#CBA1D4]/10", border: "border-[#CBA1D4]/30", text: "text-[#CBA1D4]", gradient: "from-[#CBA1D4] to-teal-400" },
  happy: { emoji: "☀️", bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", gradient: "from-amber-500 to-yellow-300" },
  confused: { emoji: "🌫️", bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", gradient: "from-cyan-600 to-teal-400" },
  scared: { emoji: "🕯️", bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", gradient: "from-orange-600 to-amber-400" },
  suicidal: { emoji: "🛡️", bg: "bg-red-500/15", border: "border-red-500/40", text: "text-red-400", gradient: "from-red-700 to-rose-500" },
  bored: { emoji: "⏳", bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-400", gradient: "from-teal-600 to-[#CBA1D4]" },
  confident: { emoji: "🦁", bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", gradient: "from-amber-600 to-yellow-400" },
  content: { emoji: "🌱", bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", gradient: "from-green-600 to-[#CBA1D4]" },
  doubtful: { emoji: "🧩", bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", gradient: "from-purple-600 to-indigo-400" },
  greedy: { emoji: "🌾", bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400", gradient: "from-yellow-600 to-amber-400" },
  guilty: { emoji: "🕊️", bg: "bg-sky-500/10", border: "border-sky-500/30", text: "text-sky-400", gradient: "from-sky-600 to-blue-400" },
  hurt: { emoji: "🩹", bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-400", gradient: "from-pink-600 to-rose-400" },
  indecisive: { emoji: "🔀", bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", gradient: "from-blue-600 to-cyan-400" },
  hypocritical: { emoji: "🪞", bg: "bg-stone-500/10", border: "border-stone-500/30", text: "text-stone-400", gradient: "from-stone-600 to-zinc-400" },
  jealous: { emoji: "👁️", bg: "bg-lime-500/10", border: "border-lime-500/30", text: "text-lime-400", gradient: "from-lime-600 to-green-400" },
  lazy: { emoji: "🔋", bg: "bg-zinc-500/10", border: "border-zinc-500/30", text: "text-zinc-400", gradient: "from-zinc-600 to-slate-400" },
  lost: { emoji: "🧭", bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", gradient: "from-cyan-600 to-blue-400" },
  nervous: { emoji: "💓", bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", gradient: "from-rose-600 to-pink-400" },
  overwhelmed: { emoji: "🌊", bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", gradient: "from-blue-600 to-teal-400" },
  regret: { emoji: "💧", bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", gradient: "from-indigo-600 to-blue-400" },
  tired: { emoji: "🛌", bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-400", gradient: "from-slate-600 to-zinc-400" },
  unloved: { emoji: "🤍", bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-400", gradient: "from-pink-600 to-purple-400" },
  weak: { emoji: "⛰️", bg: "bg-[#CBA1D4]/10", border: "border-[#CBA1D4]/30", text: "text-[#CBA1D4]", gradient: "from-[#CBA1D4] to-teal-400" },
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

const MANUAL_ARABIC_CONTEXTS: Record<string, string> = {
  "Istiʿadhah #1":
    "قال الله تعالى: ﴿فَإِذَا قَرَأْتَ الْقُرْآنَ فَاسْتَعِذْ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ﴾. (سورة النحل: ٩٨)",
  "Ayat al-Kursi in the Morning":
    "عن أبي بن كعب رضي الله عنه أن النبي ﷺ قال في آية الكرسي: من قالها حين يصبح أُجير من الجن حتى يمسي، ومن قالها حين يمسي أُجير منهم حتى يصبح. (رواه الحاكم وصححه الألباني)",
  "Sayyid al-Istighfar (Master of Forgiveness)":
    "عن شداد بن أوس رضي الله عنه عن النبي ﷺ قال: سيد الاستغفار أن يقول العبد: اللهم أنت ربي لا إله إلا أنت... ومن قالها من النهار موقناً بها فمات من يومه قبل أن يمسي فهو من أهل الجنة. (رواه البخاري)",
  "Shielding against Harm in Earth and Heaven":
    "عن عثمان بن عفان رضي الله عنه قال: قال رسول الله ﷺ: ما من عبد يقول في صباح كل يوم ومساء كل ليلة: بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم ثلاث مرات لم يضره شيء. (رواه الترمذي وأبو داود)",
  "Contentment with Allah as Lord and Islam as Religion":
    "عن المنيذر رضي الله عنه صاحب رسول الله ﷺ قال: سمعت رسول الله ﷺ يقول: من قال إذا أصبح رضيت بالله رباً وبالإسلام ديناً وبمحمد نبياً فأنا الزعيم لأخذن بيده حتى أدخله الجنة. (رواه الطبراني بإسناد حسن)",
  "Protection from the Punishment on the Day of Resurrection":
    "عن حذيفة رضي الله عنه أن النبي ﷺ كان إذا أراد أن ينام وضع يده تحت خده الأيمن ثم قال: اللهم قني عذابك يوم تبعث عبادك ثلاث مرات. (رواه الترمذي وأبو داود)",
  "Tasbih, Tahmid, and Takbir After Obligatory Prayer":
    "عن أبي هريرة رضي الله عنه عن رسول الله ﷺ قال: من سبح الله في دبر كل صلاة ثلاثاً وثلاثين، وحمد الله ثلاثاً وثلاثين، وكبر الله ثلاثاً وثلاثين، فتلك تسعة وتسعون، وقال تمام المائة: لا إله إلا الله وحده لا شريك له له الملك وله الحمد وهو على كل شيء قدير، غفرت خطاياه وإن كانت مثل زبد البحر. (رواه مسلم)",
  "Supplication for Easing Difficulty in Study and Exams":
    "عن أنس بن مالك رضي الله عنه أن رسول الله ﷺ قال: اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً. (رواه ابن حبان في صحيحه والضياء المقدسي)",
  "Sevenfold Supplication for Sick Person":
    "عن ابن عباس رضي الله عنهما عن النبي ﷺ قال: ما من عبد مسلم يعود مريضاً لم يحضر أجله فيقول عنده سبع مرار: أسأل الله العظيم رب العرش العظيم أن يشفيك إلا عوفا. (رواه أبو داود والترمذي)",
  "Supplication for Halal Sustenance and Freedom from Debt":
    "عن علي رضي الله عنه أن مكاتباً جاءه فقال: إني عجزت عن كتابتي فأعني، قال: ألا أعلمك كلمات علمنيهن رسول الله ﷺ لو كان عليك مثل جبل ثبير ديناً أداه الله عنك؟ قل: اللهم اكفني بحلالك عن حرامك وأغنني بفضلك عمن سواك. (رواه الترمذي)",
};

function getPrimaryArabicText(value: string | null): string | null {
  if (!value) return value;
  return value.split(/\r?\n/, 1)[0]?.trim() || value.trim();
}

function getEmbeddedArabicContext(value: string | null): string | null {
  if (!value) return null;
  const [, ...contextLines] = value.split(/\r?\n/);
  const context = contextLines.join("\n").trim();
  return context || null;
}

function getArabicReferenceText(value: string | null): string | null {
  if (!value) return null;

  const arabicLines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /[\u0600-\u06ff]/.test(line));

  return arabicLines.join("\n").trim() || null;
}

function isSubstantiveArabicContext(value: string | null): value is string {
  if (!value) return false;
  return value.replace(/[^\u0621-\u064a]/g, "").length >= 45;
}

function findArabicContext(dua: DuaItem): string | null {
  const candidates = [
    dua.hadith ?? null,
    dua.virtue ?? null,
    getArabicReferenceText(dua.reference),
    getEmbeddedArabicContext(dua.arabic),
    MANUAL_ARABIC_CONTEXTS[dua.title] ?? null,
  ].filter(isSubstantiveArabicContext);

  if (candidates.length === 0) return null;

  return candidates.sort((a, b) => b.length - a.length)[0] ?? null;
}

function enrichArabicContent<T extends DuaItem>(dua: T): T {
  const primaryArabic = getPrimaryArabicText(dua.arabic);
  const context_arabic = findArabicContext(dua);

  return {
    ...dua,
    arabic: primaryArabic,
    context_arabic: context_arabic ?? dua.context_arabic ?? null,
  };
}

function enrichDua<T extends DuaItem>(dua: T): T {
  return enrichQuranMetadata(enrichArabicContent(dua));
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
    category: getCategoryBySlug(f.feeling_slug),
  }));
}

export function getFeelingsWithGroups(): FeelingGroup[] {
  return (duasByFeelingData as { feelings: FeelingGroup[] }).feelings.map(
    (g) => ({
      ...g,
      arabic_name: getEmotionArabicName(g.slug, g.feeling),
      category: getCategoryBySlug(g.slug),
      duas: g.duas.map((dua) => ({
        ...enrichDua(dua),
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
    ...enrichDua(d),
    arabic_feeling: getEmotionArabicName(d.feeling_slug, d.feeling),
    title_arabic: getArabicDuaTitle(
      d,
      getEmotionArabicName(d.feeling_slug, d.feeling),
    ),
  }));
}

export { getArabicDuaTitle } from "@/lib/dua-titles";

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
      context_arabic: dua.context_arabic,
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
