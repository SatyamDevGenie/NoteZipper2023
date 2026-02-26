import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const SunIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25a9.753 9.753 0 009.752 9.752 9.753 9.753 0 009.752-9.752 9.718 9.718 0 000-3.748z" />
  </svg>
);

const DocumentIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const labels = { light: "Light", dark: "Dark", classic: "Classic" };
const icons = {
  light: SunIcon,
  dark: MoonIcon,
  classic: DocumentIcon,
};

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const CurrentIcon = icons[theme] || SunIcon;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-theme bg-theme-card text-theme hover:bg-theme-tertiary transition-colors"
        aria-label="Change theme"
        title={`Theme: ${labels[theme]}`}
      >
        <CurrentIcon className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 py-1 rounded-xl border border-theme bg-theme-card shadow-lg z-50">
          {themes.map((t) => {
            const Icon = icons[t];
            return (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTheme(t);
                  setOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  theme === t
                    ? "bg-theme-tertiary text-theme font-medium"
                    : "text-theme-muted hover:bg-theme-tertiary hover:text-theme"
                }`}
              >
                <Icon className="w-4 h-4 mr-3 opacity-80" />
                {labels[t]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
