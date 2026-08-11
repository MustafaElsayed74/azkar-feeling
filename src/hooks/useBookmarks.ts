'use client';

import { useCallback, useSyncExternalStore } from 'react';
import type { DuaItem } from '@/types';

const STORAGE_KEY = 'azkar_bookmarks';
const EMPTY_BOOKMARKS: DuaItem[] = [];
const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedBookmarks: DuaItem[] = EMPTY_BOOKMARKS;

export function getDuaKey(dua: Pick<DuaItem, 'title' | 'arabic'>): string {
  return `${dua.title}\u0000${dua.arabic ?? ''}`;
}

function readBookmarks(): DuaItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedBookmarks;

    cachedRaw = raw;
    if (!raw) {
      cachedBookmarks = EMPTY_BOOKMARKS;
      return cachedBookmarks;
    }

    const parsed: unknown = JSON.parse(raw);
    cachedBookmarks = Array.isArray(parsed) ? (parsed as DuaItem[]) : EMPTY_BOOKMARKS;
    return cachedBookmarks;
  } catch {
    cachedBookmarks = EMPTY_BOOKMARKS;
    return cachedBookmarks;
  }
}

function emitChange(): void {
  cachedRaw = undefined;
  listeners.forEach((listener) => listener());
}

function writeBookmarks(bookmarks: DuaItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {
    cachedBookmarks = bookmarks;
  }
  emitChange();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) emitChange();
  };
  window.addEventListener('storage', handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', handleStorage);
  };
}

export function useBookmarks() {
  const bookmarks = useSyncExternalStore(
    subscribe,
    readBookmarks,
    () => EMPTY_BOOKMARKS,
  );

  const toggleBookmark = useCallback((dua: DuaItem) => {
    const current = readBookmarks();
    const key = getDuaKey(dua);
    const exists = current.some((item) => getDuaKey(item) === key);
    const updated = exists
      ? current.filter((item) => getDuaKey(item) !== key)
      : [...current, dua];
    writeBookmarks(updated);
  }, []);

  const clearBookmarks = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      cachedBookmarks = EMPTY_BOOKMARKS;
    }
    emitChange();
  }, []);

  const isBookmarked = useCallback(
    (dua: DuaItem) => {
      const key = getDuaKey(dua);
      return bookmarks.some((item) => getDuaKey(item) === key);
    },
    [bookmarks],
  );

  return { bookmarks, toggleBookmark, clearBookmarks, isBookmarked };
}
