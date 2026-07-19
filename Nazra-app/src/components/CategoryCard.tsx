import type { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title_en: string;
  title_ur: string;
  icon: LucideIcon;
  progress?: { learned: number; total: number };
  onClick: () => void;
}

export function CategoryCard({
  title_en,
  title_ur,
  icon: Icon,
  progress,
  onClick,
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="neu-surface w-full p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-neu active:translate-y-0 active:shadow-neu-inset group focus:outline-none focus-visible:ring-2 focus-visible:ring-mint-400"
    >
      <div className="flex items-start gap-4">
        <div className="neu-badge w-14 h-14 shrink-0 group-active:shadow-neu-inset-sm transition-shadow">
          <Icon className="w-6 h-6 text-mint-600 dark:text-gold-300" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p
            dir="rtl"
            lang="ur"
            className="font-urdu text-lg leading-tight text-ink-800 dark:text-parchment-100 mb-0.5"
          >
            {title_ur}
          </p>
          <p className="font-medium text-ink-700 dark:text-parchment-200 text-sm">{title_en}</p>

          {progress && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-mint-200/60 dark:bg-charcoal-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-mint-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${progress.total ? (progress.learned / progress.total) * 100 : 0}%`,
                  }}
                />
              </div>
              <span className="text-xs text-mint-600 dark:text-gold-300 font-medium tabular-nums whitespace-nowrap">
                {progress.learned}/{progress.total}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
