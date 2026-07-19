import { LearnedCheckIcon } from './IslamicIcons';
import type { BilingualStep, Surah } from '../types';
import { BilingualText } from './BilingualText';

interface StepItemProps {
  number: number;
  step: BilingualStep;
  learned: boolean;
  onToggle: () => void;
  surahs?: Surah[];
}

export function StepItem({ number, step, learned, onToggle, surahs }: StepItemProps) {
  const hasAtTahiyyat = Boolean(
    step.arabic && step.transliteration && step.translation_en && step.translation_ur,
  );
  const isAtTahiyyatStep = step.id === 'salah-7' && hasAtTahiyyat;
  const hasDurood = Boolean(step.durood_arabic || step.dua_arabic);

  return (
    <div className={learned ? 'neu-inset p-5' : 'neu-surface p-5'}>
      <div className="flex items-start gap-4">
        <div
          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
            learned
              ? 'bg-mint-500 text-white shadow-neu-inset-sm dark:bg-mint-600 dark:shadow-neu-dark-inset-sm'
              : 'neu-badge w-9 h-9 text-mint-700 dark:text-gold-300'
          }`}
        >
          {learned ? <LearnedCheckIcon className="w-4 h-4" strokeWidth={2.5} /> : number}
        </div>

        <div className="flex-1 min-w-0">
          <p
            dir="rtl"
            lang="ur"
            className="font-urdu text-lg leading-[1.95] text-ink-800 mb-1"
          >
            {step.title_ur}
          </p>
          <p className="font-medium text-ink-700 dark:text-parchment-200 text-sm mb-3">{step.title_en}</p>

          {(step.instruction_en || step.instruction_ur) && (
            <div className="mb-3 space-y-3">
              {step.instruction_ur && (
                <p dir="rtl" lang="ur" className="font-urdu text-base leading-relaxed text-ink-700 dark:text-parchment-200">
                  {step.instruction_ur}
                </p>
              )}
              {step.instruction_en && (
                <p dir="ltr" className="text-sm leading-relaxed text-ink-600 dark:text-parchment-300">
                  {step.instruction_en}
                </p>
              )}
            </div>
          )}

          {(step.arabic || step.transliteration || step.translation_en || step.translation_ur) && !isAtTahiyyatStep && (
            <BilingualText
              arabic={step.arabic}
              transliteration={step.transliteration}
              translation_en={step.translation_en}
              translation_ur={step.translation_ur}
            />
          )}

          {isAtTahiyyatStep && (
            <div className="glass-panel p-5 sm:p-6 mt-4">
              <div className="text-center mb-3">
                <p dir="rtl" lang="ur" className="font-urdu text-lg text-mint-600 dark:text-gold-300">
                  التاحیات
                </p>
                <p className="text-sm font-semibold text-ink-700 dark:text-parchment-200">
                  At-tahiyyat — full text
                </p>
              </div>
              <BilingualText
                arabic={step.arabic}
                transliteration={step.transliteration}
                translation_en={step.translation_en}
                translation_ur={step.translation_ur}
              />
            </div>
          )}

          {hasDurood && (
            <div className="glass-panel p-5 sm:p-6 mt-4 space-y-5">
              {step.durood_arabic && (
                <div>
                  <div className="text-center mb-2">
                    <p dir="rtl" lang="ur" className="font-urdu text-base text-mint-600 dark:text-gold-300">
                      درودِ ابراہیمی
                    </p>
                    <p className="text-sm font-semibold text-ink-700 dark:text-parchment-200">
                      Durood Ibrahim
                    </p>
                  </div>
                  <BilingualText
                    arabic={step.durood_arabic}
                    transliteration={step.durood_transliteration}
                    translation_en={step.durood_en}
                    translation_ur={step.durood_ur}
                  />
                </div>
              )}
              {step.dua_arabic && (
                <div>
                  <div className="text-center mb-2">
                    <p dir="rtl" lang="ur" className="font-urdu text-base text-mint-600 dark:text-gold-300">
                      دعائے ماثورہ
                    </p>
                    <p className="text-sm font-semibold text-ink-700 dark:text-parchment-200">
                      Dua Masoorah (Rabbij'alni)
                    </p>
                  </div>
                  <BilingualText
                    arabic={step.dua_arabic}
                    transliteration={step.dua_transliteration}
                    translation_en={step.dua_en}
                    translation_ur={step.dua_ur}
                  />
                </div>
              )}
            </div>
          )}

          {surahs && surahs.length > 0 && (
            <div className="mt-4 space-y-4">
              {surahs.map((surah, si) => (
                <div key={si}>
                  <div className="text-center mb-2">
                    <p dir="rtl" lang="ur" className="font-urdu text-base text-mint-600 dark:text-gold-300">
                      {surah.title_ur}
                    </p>
                    <p className="text-sm font-medium text-ink-700 dark:text-parchment-200">{surah.title_en}</p>
                  </div>
                  <BilingualText
                    arabic={surah.arabic}
                    transliteration={surah.transliteration}
                    translation_en={surah.translation_en}
                    translation_ur={surah.translation_ur}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onToggle}
        aria-pressed={learned}
        className={`neu-pill mt-4 ml-auto flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
          learned ? 'is-pressed text-mint-700 dark:text-gold-300' : 'text-mint-600 dark:text-gold-300'
        }`}
      >
        <LearnedCheckIcon className={`w-4 h-4 ${learned ? 'opacity-100' : 'opacity-40'}`} strokeWidth={2} />
        {learned ? 'Learned' : 'Mark as learned'}
      </button>
    </div>
  );
}
