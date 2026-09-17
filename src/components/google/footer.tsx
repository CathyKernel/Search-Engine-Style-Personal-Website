"use client";

import { Globe, Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/**
 * Google-style footer: country line + bar with business links.
 * Ours reads "Personal" and links to the about areas of the site.
 */
export function Footer({
  onNavigate,
}: {
  onNavigate: (dest: "about" | "how" | "home") => void;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  /* true after hydration, false during SSR — avoids mismatched theme icons */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <footer className="mt-auto bg-[#f2f2f2] text-[#70757a] dark:bg-[#171717] dark:text-[#999da2]">
      <div className="border-b border-[#dadce0] px-6 py-3 text-sm dark:border-[#3c4043]">
        <div className="mx-auto flex max-w-6xl items-center gap-2">
          <Globe aria-hidden="true" className="h-4 w-4 shrink-0" />
          <span>One person, indexed with care</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <button
            type="button"
            onClick={() => onNavigate("about")}
            className="cursor-pointer transition-colors hover:underline"
          >
            About Cathy
          </button>
          <button
            type="button"
            onClick={() => onNavigate("how")}
            className="cursor-pointer transition-colors hover:underline"
          >
            How search works
          </button>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
            Powered by curiosity
          </span>
        </nav>
        <button
          type="button"
          aria-label="Toggle dark mode"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className={cn(
            "inline-flex cursor-pointer items-center gap-2 self-start transition-colors hover:underline sm:self-auto",
            !mounted && "opacity-0"
          )}
        >
          {mounted && resolvedTheme === "dark" ? (
            <>
              <Sun aria-hidden="true" className="h-4 w-4" /> Light mode
            </>
          ) : (
            <>
              <Moon aria-hidden="true" className="h-4 w-4" /> Dark mode
            </>
          )}
        </button>
      </div>
    </footer>
  );
}
