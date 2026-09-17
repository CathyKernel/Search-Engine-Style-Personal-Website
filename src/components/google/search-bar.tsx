"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, Mic, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { suggest } from "@/lib/search-engine";
import type { Suggestion } from "@/lib/search-engine";

const HISTORY_KEY = "cathyli-search-history";
const HISTORY_MAX = 12;

export function loadHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function pushHistory(query: string) {
  const q = query.trim();
  if (q.length === 0 || typeof window === "undefined") return;
  const prev = loadHistory().filter((h) => h.toLowerCase() !== q.toLowerCase());
  const next = [q, ...prev].slice(0, HISTORY_MAX);
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch {
    /* storage full or unavailable — history is best-effort */
  }
}

export function SearchBar({
  initialQuery = "",
  onSearch,
  size = "lg",
  autoFocus = false,
  className,
}: {
  initialQuery?: string;
  onSearch: (query: string) => void;
  size?: "lg" | "sm";
  autoFocus?: boolean;
  className?: string;
}) {
  const [value, setValue] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const [history, setHistory] = useState<string[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  /* Close dropdown on outside click */
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHighlighted(-1);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const suggestions: Suggestion[] = open ? suggest(value, history) : [];

  const submit = useCallback(
    (query: string) => {
      const q = query.trim();
      if (q.length === 0) return;
      pushHistory(q);
      setHistory(loadHistory());
      setOpen(false);
      setHighlighted(-1);
      inputRef.current?.blur();
      onSearch(q);
    },
    [onSearch]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setOpen(true);
        setHighlighted((h) => (h + 1) % suggestions.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setHighlighted((h) => (h <= 0 ? suggestions.length - 1 : h - 1));
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      const picked = highlighted >= 0 ? suggestions[highlighted]?.text : value;
      submit(picked ?? value);
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlighted(-1);
    }
  };

  const tall = size === "lg";

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      {/* Input shell */}
      <div
        className={cn(
          "flex items-center gap-3 border border-transparent bg-white shadow-[0_1px_6px_rgba(32,33,36,0.28)] transition-shadow",
          "hover:shadow-[0_1px_10px_rgba(32,33,36,0.35)] focus-within:shadow-[0_1px_10px_rgba(32,33,36,0.35)]",
          "dark:bg-[#303134] dark:shadow-[0_1px_6px_rgba(0,0,0,0.6)]",
          open && suggestions.length > 0
            ? "rounded-t-3xl"
            : "rounded-full"
        )}
      >
        <Search
          aria-hidden="true"
          className={cn(
            "ml-4 shrink-0 text-[#9aa0a6] dark:text-[#bdc1c6]",
            tall ? "h-5 w-5" : "h-4.5 w-4.5"
          )}
        />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open && suggestions.length > 0}
          aria-controls="cathyli-suggestions"
          aria-label="Search everything about Cathy Li"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          value={highlighted >= 0 && suggestions[highlighted] ? suggestions[highlighted].text : value}
          autoFocus={autoFocus}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setHighlighted(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={tall ? "Search Cathy Li…" : ""}
          className={cn(
            "w-full bg-transparent text-[#202124] outline-none placeholder:text-[#9aa0a6] dark:text-[#e8eaed]",
            tall ? "h-12 text-base sm:h-13 sm:text-lg" : "h-10 text-sm sm:text-base"
          )}
        />
        {value.length > 0 && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setValue("");
              setHighlighted(-1);
              setOpen(true);
              inputRef.current?.focus();
            }}
            className="shrink-0 cursor-pointer p-1 text-[#70757a] transition-colors hover:text-[#202124] dark:text-[#9aa0a6] dark:hover:text-[#e8eaed]"
          >
            <X className={tall ? "h-5 w-5" : "h-4 w-4"} />
          </button>
        )}
        <div
          aria-hidden="true"
          className="mr-1 hidden h-6 w-px shrink-0 bg-[#dadce0] dark:bg-[#5f6368] sm:block"
        />
        <button
          type="button"
          aria-label="Search by voice (Cathy hums a hint)"
          title="Search by voice"
          onClick={() => submit("music")}
          className="mr-3 shrink-0 cursor-pointer p-1 text-[#4285f4] transition-transform hover:scale-110"
        >
          <Mic className={tall ? "h-5 w-5" : "h-4.5 w-4.5"} />
        </button>
      </div>

      {/* Autocomplete dropdown */}
      {open && suggestions.length > 0 && (
        <ul
          id="cathyli-suggestions"
          role="listbox"
          className="absolute inset-x-0 top-full z-50 overflow-hidden rounded-b-3xl border border-t-0 border-transparent bg-white pt-1 shadow-[0_4px_6px_rgba(32,33,36,0.28)] dark:border-0 dark:bg-[#303134]"
        >
          {suggestions.map((s, i) => (
            <li key={s.text} role="option" aria-selected={i === highlighted}>
              <button
                type="button"
                tabIndex={-1}
                onMouseEnter={() => setHighlighted(i)}
                onMouseLeave={() => setHighlighted(-1)}
                onClick={() => submit(s.text)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-4 px-4 py-2 text-left text-base text-[#202124] dark:text-[#e8eaed]",
                  i === highlighted && "bg-[#f8f9fa] dark:bg-[#3c4043]"
                )}
              >
                {s.fromHistory ? (
                  <Clock aria-hidden="true" className="h-4.5 w-4.5 shrink-0 text-[#9aa0a6] dark:text-[#9aa0a6]" />
                ) : (
                  <Search aria-hidden="true" className="h-4.5 w-4.5 shrink-0 text-[#9aa0a6] dark:text-[#9aa0a6]" />
                )}
                <span className={cn("truncate", i === highlighted && "font-bold")}>{s.text}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
