import { useState } from 'react';
import { BackArrowIcon } from '../components/IslamicIcons';
import type { Dua } from '../types';
import { PageHeader } from '../components/PageHeader';
import { DuaCard } from '../components/DuaCard';
import { BilingualText } from '../components/BilingualText';

interface SunnahDuasProps {
  duas: Dua[];
  onBack: () => void;
}

export function SunnahDuas({ duas, onBack }: SunnahDuasProps) {
  const [selected, setSelected] = useState<Dua | null>(null);

  if (selected) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-28 md:pb-12">
        <div className="neu-surface p-4 mb-6 flex items-center gap-3">
          <button
            onClick={() => setSelected(null)}
            aria-label="Back to list"
            className="neu-badge w-10 h-10 hover:shadow-neu-inset-sm transition-shadow"
          >
            <BackArrowIcon className="w-5 h-5 text-mint-700 dark:text-gold-300" strokeWidth={1.75} />
          </button>
          <div className="min-w-0">
            <p dir="rtl" lang="ur" className="font-urdu text-lg leading-tight text-ink-800 dark:text-parchment-100">
              {selected.occasion_ur}
            </p>
            <h1 className="text-sm font-semibold text-ink-700 dark:text-parchment-200">{selected.occasion_en}</h1>
          </div>
        </div>

        <BilingualText
          arabic={selected.arabic}
          transliteration={selected.transliteration}
          translation_en={selected.translation_en}
          translation_ur={selected.translation_ur}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-28 md:pb-12">
      <PageHeader
        title_en="Sunnah Duas"
        title_ur="سنت دعائیں"
        onBack={onBack}
      >
        <p className="text-sm text-ink-600 dark:text-parchment-300 mt-2">
          {duas.length} duas for daily occasions. Tap any card to see the full text.
        </p>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {duas.map((dua) => (
          <DuaCard key={dua.id} dua={dua} onClick={() => setSelected(dua)} />
        ))}
      </div>
    </div>
  );
}
