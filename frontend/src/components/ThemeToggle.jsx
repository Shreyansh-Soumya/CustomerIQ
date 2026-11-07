import { Moon, Sun } from "lucide-react";

import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { mode, toggle } = useTheme();
  const dark = mode === "dark";
  const label = dark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className="inline-flex size-9 items-center justify-center rounded-input border border-rule-2 text-ink-2 transition-colors duration-200 hover:border-field hover:bg-surface-2 hover:text-ink"
      aria-pressed={dark}
      aria-label={label}
      title={label}
      onClick={toggle}
    >
      {dark ? (
        <Sun size={16} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Moon size={16} strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}
