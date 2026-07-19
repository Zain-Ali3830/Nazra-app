import { Home, Droplets, Sparkles, BookOpen, Moon, HeartHandshake, ScrollText, Sun } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CategoryId } from '../types';

export interface NavItem {
  id: CategoryId;
  label_en: string;
  label_ur: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'wudu', label_en: 'Wudu', label_ur: 'وضو', icon: Droplets },
  { id: 'salah', label_en: 'Salah', label_ur: 'نماز', icon: Sparkles },
  { id: 'ayatulKursi', label_en: 'Ayat-ul-Kursi', label_ur: 'آیت الکرسی', icon: BookOpen },
  { id: 'duaQunoot', label_en: 'Dua-e-Qunoot', label_ur: 'دعائے قنوت', icon: Moon },
  { id: 'sunnahDuas', label_en: 'Sunnah Duas', label_ur: 'سنت دعائیں', icon: HeartHandshake },
  { id: 'nazra', label_en: 'Nazra', label_ur: 'ناظرہ', icon: ScrollText },
];

interface NavigationProps {
  active: CategoryId | 'home';
  onNavigate: (id: CategoryId | 'home') => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Navigation({ active, onNavigate, theme, onToggleTheme }: NavigationProps) {
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <>
      {/* Mobile: top bar with theme toggle + bottom tab bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 px-3 pt-3">
        <div className="flex justify-end">
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="neu-badge w-10 h-10"
          >
            <ThemeIcon className="w-5 h-5 text-gold-500 dark:text-gold-300" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40">
        <div className="mx-3 mb-3 neu-surface px-2 py-2 flex items-center justify-around overflow-x-auto no-scrollbar">
          <button
            onClick={() => onNavigate('home')}
            aria-label="Home"
            className={`neu-badge w-11 h-11 shrink-0 ${
              active === 'home' ? 'shadow-neu-inset-sm dark:shadow-neu-dark-inset-sm text-mint-700 dark:text-gold-300' : 'text-mint-600 dark:text-gold-300'
            }`}
          >
            <Home className="w-5 h-5" strokeWidth={1.75} />
          </button>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-label={item.label_en}
                className={`neu-badge w-11 h-11 shrink-0 transition-all ${
                  isActive ? 'shadow-neu-inset-sm dark:shadow-neu-dark-inset-sm text-mint-700 dark:text-gold-300' : 'text-mint-600 dark:text-gold-300'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={1.75} />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop: persistent sidebar with theme toggle at bottom */}
      <aside className="hidden md:flex flex-col gap-2 w-64 shrink-0 p-4 sticky top-0 h-screen overflow-y-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`neu-surface-sm p-3 flex items-center gap-3 text-left transition-all ${
            active === 'home' ? 'shadow-neu-inset-sm dark:shadow-neu-dark-inset-sm text-mint-700 dark:text-gold-300' : 'text-ink-700 dark:text-parchment-200'
          }`}
        >
          <Home className="w-5 h-5 text-mint-600 dark:text-gold-300 shrink-0" strokeWidth={1.75} />
          <div>
            <p className="font-medium text-sm">Home</p>
            <p dir="rtl" lang="ur" className="font-urdu text-sm text-ink-600 dark:text-parchment-300 leading-tight">
              ہوم
            </p>
          </div>
        </button>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`neu-surface-sm p-3 flex items-center gap-3 text-left transition-all ${
                isActive ? 'shadow-neu-inset-sm dark:shadow-neu-dark-inset-sm text-mint-700 dark:text-gold-300' : 'text-ink-700 dark:text-parchment-200'
              }`}
            >
              <Icon className="w-5 h-5 text-mint-600 dark:text-gold-300 shrink-0" strokeWidth={1.75} />
              <div className="min-w-0">
                <p className="font-medium text-sm">{item.label_en}</p>
                <p dir="rtl" lang="ur" className="font-urdu text-sm text-ink-600 dark:text-parchment-300 leading-tight">
                  {item.label_ur}
                </p>
              </div>
            </button>
          );
        })}

        <div className="mt-auto pt-4">
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="neu-surface-sm p-3 flex items-center gap-3 text-left w-full text-ink-700 dark:text-parchment-200"
          >
            <ThemeIcon className="w-5 h-5 text-gold-500 dark:text-gold-300 shrink-0" strokeWidth={1.75} />
            <span className="font-medium text-sm">
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
