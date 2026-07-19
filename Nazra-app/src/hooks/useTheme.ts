import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'islamic-basics:theme';

type Theme = 'light' | 'dark';

function readTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === 'light' || raw === 'dark') return raw;
  } catch {
    /* ignore */
  }
  return 'light';
}

/** Light/dark theme toggle persisted in localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
