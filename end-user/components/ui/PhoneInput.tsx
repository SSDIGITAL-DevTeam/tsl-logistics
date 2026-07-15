"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  type CountryCode,
} from "libphonenumber-js";

function isoToFlagEmoji(iso: string) {
  return iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

const regionNames =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

type CountryOption = {
  iso: CountryCode;
  name: string;
  callingCode: string;
  flag: string;
};

const countryOptions: CountryOption[] = getCountries()
  .map((iso) => ({
    iso,
    name: regionNames?.of(iso) ?? iso,
    callingCode: getCountryCallingCode(iso),
    flag: isoToFlagEmoji(iso),
  }))
  .sort((a, b) => {
    if (a.iso === "SG") return -1;
    if (b.iso === "SG") return 1;
    return a.name.localeCompare(b.name);
  });

interface PhoneInputProps {
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export default function PhoneInput({
  onChange,
  error,
  placeholder = "9123 4567",
}: PhoneInputProps) {
  const [country, setCountry] = useState<CountryCode>("SG");
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = useMemo(
    () => countryOptions.find((c) => c.iso === country) ?? countryOptions[0],
    [country],
  );

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return countryOptions;
    return countryOptions.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.iso.toLowerCase().includes(query) ||
        c.callingCode.includes(query),
    );
  }, [search]);

  useEffect(() => {
    const combined = number ? `+${selected.callingCode} ${number}`.trim() : "";
    onChange(combined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, number]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div>
      <div className="flex">
        <div ref={ref} className="relative shrink-0">
          <button
            type="button"
            onClick={() =>
              setOpen((v) => {
                const next = !v;
                if (next) {
                  setSearch("");
                  requestAnimationFrame(() => searchRef.current?.focus());
                }
                return next;
              })
            }
            className="flex h-11 items-center gap-1.5 border border-r-0 border-gray-300 bg-white px-3 text-sm transition-colors hover:border-gray-400 focus:border-[#C8A84B] focus:outline-none"
          >
            <span>{selected.flag}</span>
            <span className="text-[#252525]">+{selected.callingCode}</span>
            <svg
              className={`h-3.5 w-3.5 shrink-0 text-gray-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute z-50 mt-1 w-72 border border-gray-200 bg-white shadow-lg">
              <div className="border-b border-gray-100 p-2">
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search country or code..."
                  className="w-full border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-[#C8A84B]"
                />
              </div>
              <div className="max-h-56 overflow-y-auto py-1">
                {filteredOptions.length === 0 && (
                  <p className="px-3 py-3 text-sm text-gray-400">No country found.</p>
                )}
                {filteredOptions.map((c) => (
                  <button
                    key={c.iso}
                    type="button"
                    onClick={() => {
                      setCountry(c.iso);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                      country === c.iso ? "bg-[#C8A84B]/5 font-medium text-[#C8A84B]" : "text-[#252525]"
                    }`}
                  >
                    <span className="shrink-0">{c.flag}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="shrink-0 text-gray-400">+{c.callingCode}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <input
          type="tel"
          inputMode="tel"
          value={number}
          onChange={(event) => setNumber(event.target.value.replace(/[^\d\s]/g, ""))}
          placeholder={placeholder}
          className="h-11 w-full border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-[#C8A84B]"
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function isPhoneValueValid(value: string) {
  return value.length > 0 && isValidPhoneNumber(value);
}
