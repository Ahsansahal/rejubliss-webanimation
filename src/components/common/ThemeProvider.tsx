"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "rejubliss-theme";

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (next: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

const listeners = new Set<() => void>();

function notifyThemeListeners() {
  listeners.forEach((listener) => listener());
}

function subscribeTheme(callback: () => void) {
  listeners.add(callback);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      callback();
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getClientThemeSnapshot(): ThemeMode {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light") {
      return saved;
    }
  } catch {
    // Ignore storage access errors in restricted environments
  }
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot(): ThemeMode {
  return "light";
}

function applyDocumentTheme(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", mode);
  root.classList.toggle("dark", mode === "dark");
  root.style.colorScheme = mode;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getClientThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    applyDocumentTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: ThemeMode) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage write errors
    }
    applyDocumentTheme(next);
    notifyThemeListeners();
  }, []);

  const toggleTheme = useCallback(() => {
    const current = getClientThemeSnapshot();
    setTheme(current === "dark" ? "light" : "dark");
  }, [setTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
