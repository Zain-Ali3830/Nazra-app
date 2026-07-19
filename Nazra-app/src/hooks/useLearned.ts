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

// Global state variables for synchronization across hooks and tabs
let globalLearned: LearnedSet = readSet();
const listeners = new Set<() => void>();

function updateGlobalLearned(next: LearnedSet) {
  globalLearned = next;
  writeSet(next);
  listeners.forEach((l) => l());
}

/**
 * Tracks "mark as learned" item ids in localStorage.
 * Synchronized globally across all hook instances and browser tabs.
 */
export function useLearned() {
  const [learned, setLearned] = useState<LearnedSet>(globalLearned);

  useEffect(() => {
    const handleUpdate = () => {
      setLearned(globalLearned);
    };
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  // Listen for storage events to synchronize changes made in other tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        updateGlobalLearned(readSet());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const isLearned = useCallback((id: string) => learned.has(id), [learned]);

  const toggleLearned = useCallback((id: string) => {
    const next = new Set(globalLearned);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    updateGlobalLearned(next);
  }, []);

  const learnedCount = useCallback(
    (ids: string[]) => ids.reduce((n, id) => (learned.has(id) ? n + 1 : n), 0),
    [learned],
  );

  return { isLearned, toggleLearned, learnedCount };
}
