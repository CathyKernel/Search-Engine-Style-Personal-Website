"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { MonogramAvatar } from "@/components/google/monogram";
import {
  alsoSearchedFor,
  identity,
  quickFacts,
} from "@/data/profile";
import { topics, type Topic } from "@/data/topics";
import { cn } from "@/lib/utils";

const barColors = {
  gblue: "bg-[#4285f4]",
  gred: "bg-[#ea4335]",
  gyellow: "bg-[#fbbc05]",
  ggreen: "bg-[#34a853]",
} as const;

/**
 * The right-hand knowledge panel, Google-style.
 * Shown when a query clearly matches Cathy herself or one topic.
 */
export function KnowledgePanel({
  topic,
  onSearch,
}: {
  topic: Topic | null; // null → the panel is about Cathy herself
  onSearch: (q: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const facts = topic ? topic.stats : quickFacts;
  const visible = expanded ? facts : facts.slice(0, 3);

  return (
    <aside
      aria-label="Knowledge panel"
      className="hidden w-[352px] shrink-0 lg:block"
    >
      <div className="overflow-hidden rounded-xl border border-[#dadce0] bg-white shadow-sm dark:border-[#3c4043] dark:bg-[#28292a]">
        <div className={cn("h-1.5 w-full", topic ? barColors[topic.color] : "bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#fbbc05]")} />
        <div className="p-5">
          <div className="flex items-center gap-3">
            <MonogramAvatar size={56} />
            <div>
              <h2 className="text-xl font-medium text-[#202124] dark:text-[#e8eaed]">
                {topic ? `Cathy Li · ${topic.name}` : identity.name}
              </h2>
              <p className="mt-0.5 text-sm text-[#70757a] dark:text-[#9aa0a6]">
                {topic ? topic.tagline : identity.role}
              </p>
            </div>
          </div>

          {topic && (
            <p className="mt-4 border-l-4 border-[#fbbc05] pl-3 text-sm italic leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]">
              {topic.hero.split(". ").slice(0, 2).join(". ")}.
            </p>
          )}

          <dl className="mt-4 space-y-2.5 border-t border-[#dadce0] pt-4 dark:border-[#3c4043]">
            {visible.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 text-sm">
                <dt className="shrink-0 text-[#70757a] dark:text-[#9aa0a6]">{f.label}</dt>
                <dd className="text-right font-medium text-[#202124] dark:text-[#e8eaed]">{f.value}</dd>
              </div>
            ))}
          </dl>
          {facts.length > 3 && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="mt-3 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-[#1a73e8] hover:underline dark:text-[#8ab4f8]"
            >
              {expanded ? "Show less" : "Show more"}
              <ChevronDown
                aria-hidden="true"
                className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
              />
            </button>
          )}

          <div className="mt-4 border-t border-[#dadce0] pt-4 dark:border-[#3c4043]">
            <h3 className="text-sm font-medium text-[#202124] dark:text-[#e8eaed]">
              People also search for
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {alsoSearchedFor.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => onSearch(s.query)}
                  className="cursor-pointer rounded-full border border-[#dadce0] bg-white px-3 py-1.5 text-sm text-[#3c4043] transition-colors hover:bg-[#f1f3f4] dark:border-[#5f6368] dark:bg-[#303134] dark:text-[#e8eaed] dark:hover:bg-[#3c4043]"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[#dadce0] bg-white p-4 text-sm shadow-sm dark:border-[#3c4043] dark:bg-[#28292a]">
        <h3 className="font-medium text-[#202124] dark:text-[#e8eaed]">Other Cathy pages</h3>
        <ul className="mt-2 space-y-1.5">
          {topics
            .filter((t) => !topic || t.id !== topic.id)
            .slice(0, 4)
            .map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => onSearch(t.name.toLowerCase())}
                  className="cursor-pointer text-left text-[#1a73e8] hover:underline dark:text-[#8ab4f8]"
                >
                  Cathy Li {t.name.toLowerCase()}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
}
