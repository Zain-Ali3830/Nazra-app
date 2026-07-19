import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { BilingualItem } from '../types';

interface ChecklistSectionProps {
  title_en: string;
  title_ur: string;
  items: BilingualItem[];
  defaultOpen?: boolean;
}

/** A collapsible bilingual checklist — visually lighter (glass panel) than the
 *  main step walkthrough, so users understand these are a summary, not steps. */
export function ChecklistSection({ title_en, title_ur, items, defaultOpen = false }: ChecklistSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="glass-panel overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 p-4 text-left"
      >
        <div className="min-w-0">
          <p dir="rtl" lang="ur" className="font-urdu text-lg leading-tight text-ink-800 dark:text-parchment-100">
            {title_ur}
          </p>
          <p className="font-medium text-sm text-ink-700 dark:text-parchment-200">{title_en}</p>
          <p className="text-xs text-mint-600 dark:text-gold-300 mt-0.5">{items.length} items</p>
        </div>
        <ChevronRight className={`w-5 h-5 text-mint-600 dark:text-gold-300 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-t border-white/30 dark:border-white/10 first:border-t-0">
              <span className="shrink-0 w-6 h-6 rounded-full bg-mint-200/60 dark:bg-charcoal-700 text-mint-700 dark:text-gold-300 text-xs font-semibold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p dir="rtl" lang="ur" className="font-urdu text-base leading-relaxed text-ink-700 dark:text-parchment-200">
                  {item.ur}
                </p>
                <p dir="ltr" className="text-sm leading-relaxed text-ink-600 dark:text-parchment-300 mt-0.5">
                  {item.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
