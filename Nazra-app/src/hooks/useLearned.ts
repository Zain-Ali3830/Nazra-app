import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'islamic-basics:learned';

type LearnedSet = ReadonlySet<string>;

function readSet(): LearnedSet {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function writeSet(s: LearnedSet) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...s]));
  } catch {
    /* ignore quota / privacy-mode failures — progress just won't persist */
  }
}

/**
 * Tracks "mark as learned" item ids in localStorage.
 * Purely client-side, no backend sync, per app spec.
 */
export function useLearned() {
  const [learned, setLearned] = useState<LearnedSet>(() => readSet());

  useEffect(() => {
    writeSet(learned);
  }, [learned]);

  const isLearned = useCallback((id: string) => learned.has(id), [learned]);

  const toggleLearned = useCallback((id: string) => {
    setLearned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const learnedCount = useCallback(
    (ids: string[]) => ids.reduce((n, id) => (learned.has(id) ? n + 1 : n), 0),
    [learned],
  );

  return { isLearned, toggleLearned, learnedCount };
}
