import type { BilingualSection } from '../types';
import { useLearned } from '../hooks/useLearned';
import { PageHeader } from '../components/PageHeader';
import { StepItem } from '../components/StepItem';
import { ChecklistSection } from '../components/ChecklistSection';

interface StepListPageProps {
  section: BilingualSection;
  onBack: () => void;
  storagePrefix: string;
}

export function StepListPage({ section, onBack, storagePrefix }: StepListPageProps) {
  const { isLearned, toggleLearned, learnedCount } = useLearned();
  const steps = section.steps ?? [];
  const ids = steps.map((s, i) => `${storagePrefix}:${s.id || i}`);
  const learned = learnedCount(ids);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-28 md:pb-12">
      <PageHeader
        title_en={section.title_en}
        title_ur={section.title_ur}
        onBack={onBack}
        progress={{ learned, total: steps.length }}
      />

      {(section.intro_en || section.intro_ur) && (
        <div className="glass-panel p-5 mb-6">
          {section.intro_ur && (
            <p dir="rtl" lang="ur" className="font-urdu text-lg leading-relaxed text-ink-800 dark:text-parchment-100 mb-2">
              {section.intro_ur}
            </p>
          )}
          {section.intro_en && (
            <p dir="ltr" className="text-sm leading-relaxed text-ink-700 dark:text-parchment-200">
              {section.intro_en}
            </p>
          )}
        </div>
      )}

      <div className="space-y-4">
        {steps.map((step, i) => {
          const id = ids[i];
          const surahs =
            step.id === 'salah-2' && section.surahs
              ? [section.surahs.alFatiha, section.surahs.alIkhlas].filter(Boolean)
              : undefined;
          return (
            <StepItem
              key={id}
              number={i + 1}
              step={step}
              learned={isLearned(id)}
              onToggle={() => toggleLearned(id)}
              surahs={surahs as any}
            />
          );
        })}
      </div>

      {(section.note_en || section.note_ur) && (
        <div className="glass-panel p-5 mt-6">
          {section.note_ur && (
            <p dir="rtl" lang="ur" className="font-urdu text-base leading-relaxed text-ink-700 dark:text-parchment-200 mb-2">
              {section.note_ur}
            </p>
          )}
          {section.note_en && (
            <p dir="ltr" className="text-sm leading-relaxed text-ink-600 dark:text-parchment-300">
              {section.note_en}
            </p>
          )}
        </div>
      )}

      {(section.faraid || section.sunan) && (
        <div className="mt-8 space-y-4">
          <div className="text-center">
            <h2 className="text-base font-semibold text-ink-800 dark:text-parchment-100">Summary</h2>
            <p dir="rtl" lang="ur" className="font-urdu text-base text-mint-600 dark:text-gold-300">
              خلاصہ
            </p>
          </div>
          {section.faraid && (
            <ChecklistSection
              title_en="Faraid of Wudu (Obligatory Acts)"
              title_ur="وضو کے فرائض"
              items={section.faraid}
              defaultOpen
            />
          )}
          {section.sunan && (
            <ChecklistSection
              title_en="Sunan of Wudu (Recommended Acts)"
              title_ur="وضو کی سنتیں"
              items={section.sunan}
            />
          )}
        </div>
      )}
    </div>
  );
}
