import type { BilingualSection } from '../types';
import { PageHeader } from '../components/PageHeader';
import { BilingualText } from '../components/BilingualText';

interface TextPageProps {
  section: BilingualSection;
  onBack: () => void;
}

export function TextPage({ section, onBack }: TextPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-28 md:pb-12">
      <PageHeader title_en={section.title_en} title_ur={section.title_ur} onBack={onBack} />

      {(section.intro_en || section.intro_ur) && (
        <div className="glass-panel p-5 mb-6">
          {section.intro_ur && (
            <p dir="rtl" lang="ur" className="font-urdu text-lg leading-relaxed text-ink-800 mb-2">
              {section.intro_ur}
            </p>
          )}
          {section.intro_en && (
            <p dir="ltr" className="text-sm leading-relaxed text-ink-700">
              {section.intro_en}
            </p>
          )}
        </div>
      )}

      <BilingualText
        arabic={section.arabic}
        transliteration={section.transliteration}
        translation_en={section.translation_en}
        translation_ur={section.translation_ur}
      />

      {section.reference && (
        <p className="text-center text-sm text-gold-600 dark:text-gold-300 mt-4 italic">{section.reference}</p>
      )}

      {section.usage_en && (
        <div className="neu-surface p-5 mt-6">
          <h3 className="font-semibold text-ink-800 dark:text-parchment-100 mb-2 text-sm">When it is recited</h3>
          {section.usage_ur && (
            <p dir="rtl" lang="ur" className="font-urdu text-base leading-relaxed text-ink-700 dark:text-parchment-200 mb-2">
              {section.usage_ur}
            </p>
          )}
          <p dir="ltr" className="text-sm leading-relaxed text-ink-600 dark:text-parchment-300">
            {section.usage_en}
          </p>
        </div>
      )}

      {(section.virtues_en || section.virtues_ur) && (
        <div className="neu-surface p-5 mt-6">
          <h3 className="font-semibold text-ink-800 dark:text-parchment-100 mb-2 text-sm">Virtues</h3>
          {section.virtues_ur && (
            <p dir="rtl" lang="ur" className="font-urdu text-base leading-relaxed text-ink-700 dark:text-parchment-200 mb-2">
              {section.virtues_ur}
            </p>
          )}
          {section.virtues_en && (
            <p dir="ltr" className="text-sm leading-relaxed text-ink-600 dark:text-parchment-300">
              {section.virtues_en}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
