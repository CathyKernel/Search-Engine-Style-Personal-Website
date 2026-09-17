"use client";

import { Calculator, Code2, Music, Palette, Pi, Trophy } from "lucide-react";
import { GoogleStyleLogo } from "@/components/google/logo";
import { SearchBar } from "@/components/google/search-bar";
import { trendingSuggestions } from "@/data/profile";
import { topics } from "@/data/topics";
import { cn } from "@/lib/utils";

const topicIcons = {
  math: Pi,
  programming: Code2,
  painting: Palette,
  tennis: Trophy,
  music: Music,
} as const;

const chipColors = {
  gblue: "text-[#1a73e8] dark:text-[#8ab4f8]",
  gred: "text-[#d93025] dark:text-[#f28b82]",
  gyellow: "text-[#f9ab00] dark:text-[#fdd663]",
  ggreen: "text-[#188038] dark:text-[#81c995]",
} as const;

export function HomeView({
  onSearch,
  onOpenTopic,
  onOpenAbout,
}: {
  onSearch: (query: string) => void;
  onOpenTopic: (topicId: (typeof topics)[number]["id"]) => void;
  onOpenAbout: () => void;
}) {
  const feelingCurious = () => {
    const pick = trendingSuggestions[Math.floor(Math.random() * trendingSuggestions.length)];
    onSearch(pick);
  };

  return (
    <main className="flex flex-1 flex-col items-center px-4 pt-[8vh] sm:pt-[12vh]">
      <GoogleStyleLogo size="lg" bounce className="mb-8" aria-label="Cathy Li" />

      <div className="w-full max-w-[584px]">
        <SearchBar onSearch={onSearch} size="lg" />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onSearch("who is cathy li")}
            className="cursor-pointer rounded border border-[#f8f9fa] bg-[#f8f9fa] px-4 py-2 text-sm text-[#3c4043] shadow-sm transition-all hover:border-[#dadce0] hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#4285f4] dark:border-[#303134] dark:bg-[#303134] dark:text-[#e8eaed] dark:hover:border-[#5f6368]"
          >
            Cathy Search
          </button>
          <button
            type="button"
            onClick={feelingCurious}
            className="cursor-pointer rounded border border-[#f8f9fa] bg-[#f8f9fa] px-4 py-2 text-sm text-[#3c4043] shadow-sm transition-all hover:border-[#dadce0] hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#4285f4] dark:border-[#303134] dark:bg-[#303134] dark:text-[#e8eaed] dark:hover:border-[#5f6368]"
          >
            I'm Feeling Curious
          </button>
        </div>

        {/* Topic quick links, Google-apps-grid flavor */}
        <nav
          aria-label="Explore topics"
          className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-2 sm:grid-cols-6"
        >
          {topics.map((t) => {
            const Icon = topicIcons[t.id];
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onOpenTopic(t.id)}
                className="group flex cursor-pointer flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dadce0] bg-white transition-transform group-hover:scale-110 dark:border-[#3c4043] dark:bg-[#28292a]">
                  <Icon aria-hidden="true" className={cn("h-5 w-5", chipColors[t.color])} />
                </span>
                <span className="text-xs text-[#3c4043] dark:text-[#e8eaed]">{t.name}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={onOpenAbout}
            className="group flex cursor-pointer flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dadce0] bg-white transition-transform group-hover:scale-110 dark:border-[#3c4043] dark:bg-[#28292a]">
              <Calculator aria-hidden="true" className="h-5 w-5 text-[#5f6368] dark:text-[#9aa0a6]" />
            </span>
            <span className="text-xs text-[#3c4043] dark:text-[#e8eaed]">About</span>
          </button>
        </nav>
      </div>

      <p className="mt-auto pb-6 pt-16 text-center text-xs text-[#70757a] dark:text-[#9aa0a6]">
        Cathy Li Search — a search engine that indexes exactly one person.
      </p>
    </main>
  );
}
