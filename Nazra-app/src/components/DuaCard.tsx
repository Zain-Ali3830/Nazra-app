import { ChevronRightIcon } from './IslamicIcons';
import type { Dua } from '../types';

interface DuaCardProps {
  dua: Dua;
  onClick: () => void;
}

export function DuaCard({ dua, onClick }: DuaCardProps) {
  return (
    <button
      onClick={onClick}
      className="neu-surface w-full p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-neu active:shadow-neu-inset group"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p dir="rtl" lang="ur" className="font-urdu text-lg leading-tight text-ink-800 dark:text-parchment-100">
            {dua.occasion_ur}
          </p>
          <p className="font-medium text-sm text-ink-600 dark:text-parchment-200 mt-0.5">{dua.occasion_en}</p>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-mint-500 dark:text-gold-300 shrink-0 group-active:translate-x-0.5 transition-transform" />
      </div>
      <p dir="rtl" lang="ar" className="font-arabic text-xl text-center text-ink-700 dark:text-parchment-100 mt-3 leading-relaxed line-clamp-2">
        {dua.arabic}
      </p>
    </button>
  );
}
