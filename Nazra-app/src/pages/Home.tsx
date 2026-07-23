import type { SVGProps } from 'react';
import {
  WuduDropIcon,
  CrescentStarIcon,
  QuranIcon,
  CrescentMoonIcon,
  DuaHandsIcon,
  ScrollIcon,
  KalmaIcon,
} from '../components/IslamicIcons';

type IconComponent = (props: SVGProps<SVGSVGElement> & { strokeWidth?: number }) => JSX.Element;
import type { CategoryId } from '../types';
import { CategoryCard } from '../components/CategoryCard';

interface HomeProps {
  onNavigate: (id: CategoryId) => void;
  getProgress: (id: CategoryId) => { learned: number; total: number };
}

interface CategoryMeta {
  id: CategoryId;
  title_en: string;
  title_ur: string;
  icon: IconComponent;
  hasProgress: boolean;
}

const CATEGORIES: CategoryMeta[] = [
  { id: 'wudu', title_en: 'Wudu (Ablution)', title_ur: 'وضو', icon: WuduDropIcon, hasProgress: true },
  { id: 'salah', title_en: 'Salah (Prayer Method)', title_ur: 'نماز', icon: CrescentStarIcon, hasProgress: true },
  { id: 'ayatulKursi', title_en: 'Ayat-ul-Kursi', title_ur: 'آیت الکرسی', icon: QuranIcon, hasProgress: false },
  { id: 'duaQunoot', title_en: 'Dua-e-Qunoot', title_ur: 'دعائے قنوت', icon: CrescentMoonIcon, hasProgress: false },
  { id: 'sunnahDuas', title_en: 'Sunnah Duas', title_ur: 'سنت دعائیں', icon: DuaHandsIcon, hasProgress: false },
  { id: 'nazra', title_en: 'Nazra Basics', title_ur: 'ناظرہ', icon: ScrollIcon, hasProgress: false },
  { id: 'sixKalmas', title_en: 'Six Kalmas', title_ur: 'چھ کلمے', icon: KalmaIcon, hasProgress: false },
];

export function Home({ onNavigate, getProgress }: HomeProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-28 md:pb-12">
      <header className="text-center mb-8 sm:mb-10">
        <div className="neu-badge w-16 h-16 mx-auto mb-4">
          <QuranIcon className="w-8 h-8 text-mint-600 dark:text-gold-300" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-ink-800 dark:text-parchment-100 mb-1">Islamic Basics</h1>
        <p dir="rtl" lang="ur" className="font-urdu text-xl text-mint-600 dark:text-gold-300 mb-2">
          اسلامی بنیادیں
        </p>
        <p className="text-sm text-ink-600 dark:text-parchment-300 max-w-md mx-auto text-balance">
          Learn the fundamentals of Islam — Wudu, Salah, and essential duas — in Urdu and English.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            title_en={cat.title_en}
            title_ur={cat.title_ur}
            icon={cat.icon}
            progress={cat.hasProgress ? getProgress(cat.id) : undefined}
            onClick={() => onNavigate(cat.id)}
          />
        ))}
      </div>

      <footer className="text-center mt-10 text-xs text-mint-500 dark:text-parchment-300">
        <p dir="rtl" lang="ur" className="font-urdu mb-1">
          اللہ ہمیں صحیح راہ دکھائے
        </p>
        <p>May Allah guide us on the straight path.</p>
      </footer>
    </div>
  );
}
