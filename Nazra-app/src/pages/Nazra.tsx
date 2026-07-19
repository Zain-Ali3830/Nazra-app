import { useState } from 'react';
import { BackArrowIcon, LearnedCheckIcon, QuranIcon } from '../components/IslamicIcons';
import type { BilingualSection, NazraLesson } from '../types';
import { useLearned } from '../hooks/useLearned';
import { useCelebrate } from '../context/CelebrationContext';
import { PageHeader } from '../components/PageHeader';

interface NazraProps {
  section: BilingualSection;
  onBack: () => void;
}

export function Nazra({ section, onBack }: NazraProps) {
  const lessons = section.lessons ?? [];
  const { isLearned, toggleLearned, learnedCount } = useLearned();
  const celebrate = useCelebrate();
  const [selected, setSelected] = useState<NazraLesson | null>(null);

  const ids = lessons.map((l) => `nazra:${l.id}`);
  const learned = learnedCount(ids);

  if (selected) {
    const selId = `nazra:${selected.id}`;
    const learnedSel = isLearned(selId);
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-28 md:pb-12">
        <div className="neu-surface p-4 mb-6 flex items-center gap-3">
          <button
            onClick={() => setSelected(null)}
            aria-label="Back to lessons"
            className="neu-badge w-10 h-10 hover:shadow-neu-inset-sm dark:hover:shadow-neu-dark-inset-sm transition-shadow"
          >
            <BackArrowIcon className="w-5 h-5 text-mint-700 dark:text-gold-300" strokeWidth={1.75} />
          </button>
          <div className="min-w-0">
            <p dir="rtl" lang="ur" className="font-urdu text-lg leading-[1.9] text-ink-800 dark:text-parchment-100 mb-1">
              {selected.title_ur}
            </p>
            <h1 className="text-sm font-semibold text-ink-700 dark:text-parchment-200">{selected.title_en}</h1>
          </div>
        </div>

        {(selected.content_en || selected.content_ur) && (
          <div className="glass-panel p-5 mb-6">
            {selected.content_ur && (
              <p dir="rtl" lang="ur" className="font-urdu text-lg leading-[2.2] text-ink-800 dark:text-parchment-100 mb-4">
                {selected.content_ur}
              </p>
            )}
            {selected.content_en && (
              <p dir="ltr" className="text-sm leading-relaxed text-ink-700 dark:text-parchment-200 mt-3">
                {selected.content_en}
              </p>
            )}
          </div>
        )}

        {selected.rules && selected.rules.length > 0 && (
          <div className="glass-panel p-5 mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-300 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Rules of Pronunciation (قواعدِ تجوید)
            </h3>
            <ul className="space-y-3">
              {selected.rules.map((rule, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-ink-700 dark:text-parchment-200 leading-relaxed">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-mint-200 dark:bg-mint-800/40 text-mint-700 dark:text-gold-300 flex items-center justify-center text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selected.examples && selected.examples.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-ink-700 dark:text-parchment-200 mb-3 text-center">
              Practice Examples (مثالیں)
            </h3>
            <div className="flex flex-wrap justify-center gap-3" dir="rtl">
              {selected.examples.map((example, i) => {
                const isLong = example.length > 4;
                return (
                  <div
                    key={i}
                    className="neu-surface-sm flex items-center justify-center px-4 py-3 min-h-[64px] min-w-[64px] transition-all hover:scale-105 duration-200"
                  >
                    <span dir="rtl" lang="ar" className={`font-arabic text-ink-800 dark:text-parchment-100 ${isLong ? 'text-xl sm:text-2xl' : 'text-3xl'}`}>
                      {example}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selected.letters && selected.letters.length > 0 && (
          <div className="mb-6" dir="rtl">
            <h3 className="text-sm font-semibold text-ink-700 dark:text-parchment-200 mb-3 text-center">
              Letters to practice
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3" dir="rtl">
              {selected.letters.map((letter, i) => (
                <div
                  key={i}
                  className="neu-surface-sm aspect-square flex items-center justify-center"
                >
                  <span dir="rtl" lang="ar" className="font-arabic text-3xl text-ink-800 dark:text-parchment-100">
                    {letter}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => { celebrate(selId, !learnedSel); toggleLearned(selId); }}
          aria-pressed={learnedSel}
          className={`neu-pill flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
            learnedSel ? 'is-pressed text-mint-700 dark:text-gold-300' : 'text-mint-600 dark:text-gold-300'
          }`}
        >
          <LearnedCheckIcon className={`w-4 h-4 ${learnedSel ? 'opacity-100' : 'opacity-40'}`} strokeWidth={2} />
          {learnedSel ? 'Learned' : 'Mark as learned'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-28 md:pb-12">
      <PageHeader
        title_en={section.title_en}
        title_ur={section.title_ur}
        onBack={onBack}
        progress={{ learned, total: lessons.length }}
      >
        {(section.intro_en || section.intro_ur) && (
          <div className="mt-3">
            {section.intro_ur && (
              <p dir="rtl" lang="ur" className="font-urdu text-base leading-relaxed text-ink-700 dark:text-parchment-200 mb-2">
                {section.intro_ur}
              </p>
            )}
            {section.intro_en && (
              <p dir="ltr" className="text-sm leading-relaxed text-ink-600 dark:text-parchment-300">
                {section.intro_en}
              </p>
            )}
          </div>
        )}
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" dir="ltr">
        {lessons.map((lesson, i) => {
          const id = `nazra:${lesson.id}`;
          const done = isLearned(id);
          return (
            <button
              key={lesson.id}
              onClick={() => setSelected(lesson)}
              className={`neu-surface p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-neu dark:hover:shadow-neu-dark active:shadow-neu-inset dark:active:shadow-neu-dark-inset group ${
                done ? 'shadow-neu-inset dark:shadow-neu-dark-inset' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    done
                      ? 'bg-mint-500 text-white shadow-neu-inset-sm dark:bg-mint-600 dark:shadow-neu-dark-inset-sm'
                      : 'neu-badge w-9 h-9 text-mint-700 dark:text-gold-300'
                  }`}
                >
                  {done ? <LearnedCheckIcon className="w-4 h-4" strokeWidth={2.5} /> : i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p dir="rtl" lang="ur" className="font-urdu text-base leading-[2] text-ink-800 dark:text-parchment-100 mb-1">
                    {lesson.title_ur}
                  </p>
                  <p className="font-medium text-xs text-ink-600 dark:text-parchment-300 mt-0.5 line-clamp-2">
                    {lesson.title_en}
                  </p>
                </div>
                {(lesson.letters || lesson.examples) && (
                  <QuranIcon className="w-4 h-4 text-mint-500 dark:text-gold-300 shrink-0" strokeWidth={1.5} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {(section.note_en || section.note_ur) && (
        <div className="glass-panel p-4 mt-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-300 mb-2">
            Note
          </p>
          {section.note_ur && (
            <p dir="rtl" lang="ur" className="font-urdu text-sm leading-relaxed text-ink-700 dark:text-parchment-200 mb-2">
              {section.note_ur}
            </p>
          )}
          {section.note_en && (
            <p dir="ltr" className="text-xs leading-relaxed text-ink-600 dark:text-parchment-300">
              {section.note_en}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
