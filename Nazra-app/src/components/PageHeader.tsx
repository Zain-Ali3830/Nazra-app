import { BackArrowIcon } from './IslamicIcons';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title_en: string;
  title_ur: string;
  onBack: () => void;
  progress?: { learned: number; total: number };
  children?: ReactNode;
}

export function PageHeader({ title_en, title_ur, onBack, progress, children }: PageHeaderProps) {
  return (
    <div className="neu-surface p-5 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={onBack}
          aria-label="Back to home"
          className="neu-badge w-10 h-10 hover:shadow-neu-inset-sm transition-shadow"
        >
          <BackArrowIcon className="w-5 h-5 text-mint-700 dark:text-gold-300" strokeWidth={1.75} />
        </button>
        <div className="flex-1 min-w-0">
          <p dir="rtl" lang="ur" className="font-urdu text-xl leading-tight text-ink-800 dark:text-parchment-100 mb-1">
            {title_ur}
          </p>
          <h1 className="text-lg font-semibold text-ink-800 dark:text-parchment-100">{title_en}</h1>
        </div>
      </div>

      {progress && (
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-2 bg-mint-200/60 dark:bg-charcoal-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-mint-500 rounded-full transition-all duration-500"
              style={{
                width: `${progress.total ? (progress.learned / progress.total) * 100 : 0}%`,
              }}
            />
          </div>
          <span className="text-sm text-mint-700 dark:text-gold-300 font-medium tabular-nums whitespace-nowrap">
            {progress.learned}/{progress.total} learned
          </span>
        </div>
      )}

      {children}
    </div>
  );
}
