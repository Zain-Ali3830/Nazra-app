import { useState } from 'react';
import { BackArrowIcon, KalmaIcon, ChevronRightIcon } from '../components/IslamicIcons';
import type { Kalma } from '../types';
import { PageHeader } from '../components/PageHeader';
import { BilingualText } from '../components/BilingualText';

interface SixKalmasProps {
  kalmas: Kalma[];
  onBack: () => void;
}

const KALMA_COLORS = [
  'from-mint-500/20 to-teal-500/10 border-mint-300/40 dark:border-mint-600/30',
  'from-gold-400/20 to-yellow-500/10 border-gold-300/40 dark:border-gold-600/30',
  'from-purple-400/20 to-indigo-500/10 border-purple-300/40 dark:border-purple-600/30',
  'from-rose-400/20 to-pink-500/10 border-rose-300/40 dark:border-rose-600/30',
  'from-sky-400/20 to-cyan-500/10 border-sky-300/40 dark:border-sky-600/30',
  'from-emerald-400/20 to-green-500/10 border-emerald-300/40 dark:border-emerald-600/30',
];

const KALMA_NUMBER_COLORS = [
  'text-mint-600 dark:text-mint-400',
  'text-gold-600 dark:text-gold-400',
  'text-purple-600 dark:text-purple-400',
  'text-rose-600 dark:text-rose-400',
  'text-sky-600 dark:text-sky-400',
  'text-emerald-600 dark:text-emerald-400',
];

export function SixKalmas({ kalmas, onBack }: SixKalmasProps) {
  const [selected, setSelected] = useState<Kalma | null>(null);

  if (selected) {
    const colorClass = KALMA_COLORS[selected.number - 1] ?? KALMA_COLORS[0];
    const numColorClass = KALMA_NUMBER_COLORS[selected.number - 1] ?? KALMA_NUMBER_COLORS[0];

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-28 md:pb-12">
        {/* Detail header */}
        <div className="neu-surface p-4 mb-6 flex items-center gap-3">
          <button
            onClick={() => setSelected(null)}
            aria-label="Back to Kalmas list"
            className="neu-badge w-10 h-10 hover:shadow-neu-inset-sm transition-shadow shrink-0"
          >
            <BackArrowIcon className="w-5 h-5 text-mint-700 dark:text-gold-300" strokeWidth={1.75} />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-xs font-bold uppercase tracking-widest ${numColorClass}`}>
                Kalma #{selected.number}
              </span>
            </div>
            <p dir="rtl" lang="ur" className="font-urdu text-lg leading-[3] text-ink-800 dark:text-parchment-100">
              {selected.name_ur}
            </p>
            <p className="text-sm font-semibold text-ink-700 dark:text-parchment-200">{selected.name_en}</p>
          </div>
        </div>

        {/* Arabic + translations */}
        <BilingualText
          arabic={selected.arabic}
          transliteration={selected.transliteration}
          translation_en={selected.translation_en}
          translation_ur={selected.translation_ur}
        />

        {/* Virtue / benefit */}
        {(selected.virtue_en || selected.virtue_ur) && (
          <div className={`mt-6 p-5 rounded-2xl bg-gradient-to-br border ${colorClass}`}>
            <div className="flex items-center gap-2 mb-3">
              <KalmaIcon className="w-5 h-5 text-mint-600 dark:text-gold-300" strokeWidth={1.5} />
              <h2 className="font-semibold text-sm text-ink-800 dark:text-parchment-100">Virtue & Significance</h2>
            </div>
            {selected.virtue_ur && (
              <p dir="rtl" lang="ur" className="font-urdu text-base leading-loose text-ink-700 dark:text-parchment-200 mb-3">
                {selected.virtue_ur}
              </p>
            )}
            {selected.virtue_en && (
              <p className="text-sm leading-relaxed text-ink-600 dark:text-parchment-300">
                {selected.virtue_en}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-28 md:pb-12">
      <PageHeader
        title_en="Six Kalmas"
        title_ur="چھ کلمے"
        onBack={onBack}
      >
        <p className="text-sm text-ink-600 dark:text-parchment-300 mt-2">
          The Six Kalmas are the core declarations of Islamic faith. Tap any Kalma to read the full text with translation.
        </p>
      </PageHeader>

      <div className="flex flex-col gap-4">
        {kalmas.map((kalma) => {
          const colorClass = KALMA_COLORS[kalma.number - 1] ?? KALMA_COLORS[0];
          const numColorClass = KALMA_NUMBER_COLORS[kalma.number - 1] ?? KALMA_NUMBER_COLORS[0];

          return (
            <button
              key={kalma.id}
              onClick={() => setSelected(kalma)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl bg-gradient-to-br border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99] group ${colorClass}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  {/* Number badge */}
                  <div className={`neu-badge w-10 h-10 shrink-0 font-bold text-sm ${numColorClass}`}>
                    {kalma.number}
                  </div>
                  <div className="min-w-0">
                    <p dir="rtl" lang="ur" className="font-urdu text-xl leading-snug text-ink-800 dark:text-parchment-100 mb-3">
                      {kalma.name_ur}
                    </p>
                    <p className="text-sm font-semibold text-ink-600 dark:text-parchment-200">
                      {kalma.name_en}
                    </p>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-ink-400 dark:text-parchment-400 shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
              </div>
              {/* Arabic preview */}
              <p
                dir="rtl"
                lang="ar"
                style={{ lineHeight: '2.5em' }}
                className="font-arabic text-lg sm:text-xl text-center text-ink-700 dark:text-parchment-100 mt-4 line-clamp-2"
              >
                {kalma.arabic}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
