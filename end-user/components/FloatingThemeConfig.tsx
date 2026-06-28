"use client";

import { useEffect, useState } from "react";
import { Check, Layers3, X } from "lucide-react";

type ThemeVersion = "v1" | "v2";

const STORAGE_KEY = "tsl-theme-version";

const themeOptions: {
  version: ThemeVersion;
  label: string;
  description: string;
}[] = [
  {
    version: "v1",
    label: "Theme V1",
    description: "Current visual system.",
  },
  {
    version: "v2",
    label: "Theme V2",
    description: "Editorial logistics homepage.",
  },
];

function isThemeVersion(value: string | null): value is ThemeVersion {
  return value === "v1" || value === "v2";
}

function applyThemeVersion(version: ThemeVersion) {
  document.documentElement.dataset.themeVersion = version;
}

export default function FloatingThemeConfig() {
  const [open, setOpen] = useState(false);
  const [version, setVersion] = useState<ThemeVersion>("v1");

  useEffect(() => {
    const savedVersion = window.localStorage.getItem(STORAGE_KEY);
    const nextVersion = isThemeVersion(savedVersion) ? savedVersion : "v1";

    window.localStorage.setItem(STORAGE_KEY, nextVersion);
    applyThemeVersion(nextVersion);
    const syncTimer = window.setTimeout(() => setVersion(nextVersion), 0);

    return () => window.clearTimeout(syncTimer);
  }, []);

  const selectVersion = (nextVersion: ThemeVersion) => {
    setVersion(nextVersion);
    window.localStorage.setItem(STORAGE_KEY, nextVersion);
    applyThemeVersion(nextVersion);
  };

  return (
    <div className="fixed right-4 top-1/2 z-[95] flex -translate-y-1/2 items-center md:right-5">
      <div
        className={`absolute right-12 w-[260px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-4 opacity-0"
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-gray-100 px-3.5 py-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C8A84B]">
                Theme
              </p>
              <h2 className="text-sm font-bold text-[#1a1a1a]">
                Visual Version
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close theme config"
              className="grid h-7 w-7 place-items-center rounded-full text-[#555] transition hover:bg-gray-100 hover:text-[#1a1a1a]"
            >
              <X size={15} />
            </button>
          </div>

          <div className="space-y-1.5 p-2.5">
            {themeOptions.map((option) => {
              const active = version === option.version;
              return (
                <button
                  key={option.version}
                  type="button"
                  onClick={() => selectVersion(option.version)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
                    active
                      ? "border-[#C8A84B]/40 bg-[#C8A84B]/15 text-[#1a1a1a]"
                      : "border-gray-100 text-[#555] hover:border-[#C8A84B]/30 hover:bg-gray-50 hover:text-[#1a1a1a]"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-bold">
                      {option.label}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-[#777]">
                      {option.description}
                    </span>
                  </span>
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                      active
                        ? "bg-[#C8A84B] text-[#1a1a1a]"
                        : "bg-gray-100 text-transparent"
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? "Close theme config" : "Open theme config"}
        className="grid h-11 w-11 place-items-center rounded-full bg-[#1a1a1a] text-white shadow-lg transition hover:bg-[#2a2a2a] focus:outline-none focus:ring-4 focus:ring-[#C8A84B]/30 active:scale-95"
      >
        {open ? <X size={18} /> : <Layers3 size={18} />}
      </button>
    </div>
  );
}
