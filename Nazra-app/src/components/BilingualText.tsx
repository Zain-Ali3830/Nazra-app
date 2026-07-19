import { QuranIcon } from './IslamicIcons';

interface BilingualTextProps {
  arabic?: string;
  transliteration?: string;
  translation_en?: string;
  translation_ur?: string;
  /** When true, render inside a glassmorphic panel (default). */
  glass?: boolean;
}

/**
 * Renders Arabic → transliteration → Urdu → English together, all visible at once.
 * Arabic/Urdu blocks are dir="rtl"; English stays dir="ltr".
 * Mobile stacks vertically; md+ puts Urdu + English side by side.
 */
export function BilingualText({
  arabic,
  transliteration,
  translation_en,
  translation_ur,
  glass = true,
}: BilingualTextProps) {
  if (!arabic && !transliteration && !translation_en && !translation_ur) return null;

  return (
    <div className={glass ? 'glass-panel p-5 sm:p-6' : ''}>
      {arabic && (
        <p
          dir="rtl"
          lang="ar"
          className="font-arabic text-2xl sm:text-3xl leading-[3] py-8 text-center text-ink-900 dark:text-parchment-100 mb-6"
        >
          {arabic}
        </p>
      )}

      {transliteration && (
        <p
          dir="ltr"
          className="text-center text-gold-600 dark:text-gold-300 italic text-sm sm:text-base mb-6"
        >
          {transliteration}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {translation_ur && (
          <div dir="rtl" lang="ur" className="md:border-r md:border-white/40 dark:md:border-white/15 md:pr-4">
            <p className="font-urdu text-lg sm:text-xl leading-[2.5] text-ink-800 dark:text-parchment-100">
              {translation_ur}
            </p>
          </div>
        )}
        {translation_en && (
          <div dir="ltr" lang="en">
            <p className="text-base sm:text-[17px] leading-loose text-ink-700 dark:text-parchment-200">
              {translation_en}
            </p>
          </div>
        )}
      </div>

      {!translation_en && !translation_ur && !transliteration && (
        <div className="flex items-center justify-center gap-2 text-mint-500 text-sm pt-2">
          <QuranIcon className="w-4 h-4" />
          <span>Content pending</span>
        </div>
      )}
    </div>
  );
}
