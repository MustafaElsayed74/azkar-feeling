export interface DuaItem {
  title: string;
  title_arabic?: string;
  feeling_slug?: string;
  arabic: string | null;
  transliteration: string | null;
  translation: string | null;
  description: string | null;
  benefit: string | null;
  virtue: string | null;
  hadith: string | null;
  context_arabic?: string | null;
  reference: string | null;
  source: string;
  quran_reference: string | null;
  surah: string | null;
  ayah: number | null;
  narrator: string | null;
  repeat_count: number | null;
  audio_url: string | null;
  image_url: string | null;
  source_url: string;
}

export interface FeelingGroup {
  feeling: string;
  slug: string;
  url: string;
  items_count: number;
  duas: DuaItem[];
  arabic_name?: string;
}

export interface FeelingMeta {
  feeling_name: string;
  feeling_slug: string;
  feeling_url: string;
  image_url: string;
  description: string;
  arabic_name?: string;
}

export interface FlatDuaItem extends DuaItem {
  feeling: string;
  feeling_slug: string;
  arabic_feeling?: string;
}

export interface SearchFeeling {
  name: string;
  slug: string;
  arabic_name: string;
}

export interface SearchDuaItem extends DuaItem {
  feelings: SearchFeeling[];
}
