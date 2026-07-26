import { useEffect, useState, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export function useBookmarks() {
  const [ids, setIds] = useLocalStorage<string[]>('iot-prep-bookmarks', []);
  const toggle = useCallback(
    (id: string) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setIds]
  );
  const has = useCallback((id: string) => ids.includes(id), [ids]);
  return { ids, toggle, has };
}

export function useProgress() {
  const [seen, setSeen] = useLocalStorage<string[]>('iot-prep-progress', []);
  const mark = useCallback(
    (id: string) => setSeen((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [setSeen]
  );
  const reset = useCallback(() => setSeen([]), [setSeen]);
  return { seen, mark, reset, count: seen.length };
}
