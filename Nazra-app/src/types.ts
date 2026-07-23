import type data from '../data/data.json';

export type CategoryId =
  | 'wudu'
  | 'salah'
  | 'ayatulKursi'
  | 'duaQunoot'
  | 'sunnahDuas'
  | 'nazra'
  | 'sixKalmas';

export interface Kalma {
  id: string;
  number: number;
  name_en: string;
  name_ur: string;
  arabic: string;
  transliteration: string;
  translation_en: string;
  translation_ur: string;
  virtue_en?: string;
  virtue_ur?: string;
}

export interface Category {
  id: CategoryId;
  title_en: string;
  title_ur: string;
  icon: string;
}

export interface BilingualStep {
  id: string;
  title_en: string;
  title_ur: string;
  instruction_en?: string;
  instruction_ur?: string;
  arabic?: string;
  transliteration?: string;
  translation_en?: string;
  translation_ur?: string;
  // Durood Ibrahim + Dua Masoorah (salah-8)
  durood_arabic?: string;
  durood_transliteration?: string;
  durood_en?: string;
  durood_ur?: string;
  dua_arabic?: string;
  dua_transliteration?: string;
  dua_en?: string;
  dua_ur?: string;
}

export interface BilingualItem {
  en: string;
  ur: string;
}

export interface Surah {
  title_en: string;
  title_ur: string;
  arabic: string;
  transliteration: string;
  translation_en: string;
  translation_ur: string;
}

export interface NazraLesson {
  id: string;
  title_en: string;
  title_ur: string;
  content_en?: string;
  content_ur?: string;
  letters?: string[];
  rules?: string[];
  examples?: string[];
}

export interface BilingualSection {
  title_en: string;
  title_ur: string;
  intro_en?: string;
  intro_ur?: string;
  steps?: BilingualStep[];
  faraid?: BilingualItem[];
  sunan?: BilingualItem[];
  surahs?: { alFatiha?: Surah; alIkhlas?: Surah };
  note_en?: string;
  note_ur?: string;
  reference?: string;
  arabic?: string;
  transliteration?: string;
  translation_en?: string;
  translation_ur?: string;
  virtues_en?: string;
  virtues_ur?: string;
  usage_en?: string;
  usage_ur?: string;
  plannedSections?: { id: string; title_en: string; title_ur: string }[];
  lessons?: NazraLesson[];
}

export interface Dua {
  id: string;
  occasion_en: string;
  occasion_ur: string;
  arabic: string;
  transliteration: string;
  translation_en: string;
  translation_ur: string;
}

export type AppData = typeof data;
