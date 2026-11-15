"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "cafe-theme";
const THEME_CHANGE_EVENT = "cafe-theme-change";

/**
 * Публичный сайт всегда тёмный.
 * Инфраструктура сохранена; переключение на light отключено.
 */
function getThemeSnapshot(): Theme {
  return "dark";
}

function subscribeToTheme(onStoreChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onStoreChange();
  };
  const onThemeChange = () => onStoreChange();

  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
  };
}

function applyDarkTheme() {
  document.documentElement.classList.add("dark");
  try {
    if (localStorage.getItem(STORAGE_KEY) === "light") {
      localStorage.setItem(STORAGE_KEY, "dark");
    }
  } catch {
    /* ignore */
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => "dark" as Theme,
  );

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!mounted) return;
    applyDarkTheme();
  }, [mounted]);

  const setTheme = useCallback((next: Theme) => {
    void next;
    applyDarkTheme();
    try {
      localStorage.setItem(STORAGE_KEY, "dark");
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme("dark");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme, mounted };
}
