import { useEffect, useState } from "react";

const STORAGE_KEY = "customeriq-theme";
const THEME_COLORS = { light: "#f7f3ef", dark: "#241f1c" };

function initialMode() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.mode === "dark" ? "dark" : "light";
}

export function useTheme() {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLORS[mode]);
  }, [mode]);

  function toggle() {
    setMode((current) => {
      const next = current === "dark" ? "light" : "dark";

      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // The theme still applies for this session when storage is unavailable.
      }

      return next;
    });
  }

  return { mode, toggle };
}
