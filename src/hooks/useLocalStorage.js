import { useCallback } from 'react';

export default function useLocalStorage() {
  const read = useCallback((key, fallback = null) => {
    if (typeof window === 'undefined') {
      return fallback;
    }

    const value = window.localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }, []);

  const write = useCallback((key, value) => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
      return true;
    } catch {
      return false;
    }
  }, []);

  const remove = useCallback((key) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  }, []);

  const clear = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  }, []);

  return {
    read,
    write,
    remove,
    clear,
  };
}
