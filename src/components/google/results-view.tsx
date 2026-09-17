"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { GoogleStyleLogo } from "@/components/google/logo";
import { SearchBar } from "@/components/google/search-bar";
import { InstantAnswerCard } from "@/components/google/instant-answer";
import { KnowledgePanel } from "@/components/google/knowledge-panel";
import {
  detectInstantAnswer,
  highlightSegments,
  search,
  type Doc,
} from "@/lib/search-engine";
import { generalFaqs, relatedSearches } from "@/data/profile";
import { topics, type Topic } from "@/data/topics";
import { cn } from "@/lib/utils";

type TopicId = Topic["id"];

const TABS: { id: "all" | TopicId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "math", label: "Math" },
  { id: "programming", label: "Programming" },
  { id: "painting", label: "Painting" },
  { id: "tennis", label: "Tennis" },
  { id: "music", label: "Music" },
];

function topicById(id: string): Topic | null {
  return topics.find((t) => t.id === id) ?? null;
}

/* ------------------------- Result item ------------------------- */

function ResultItem({
  doc,
  query,
  onOpen,
}: {
  doc: Doc;
  query: string;
  onOpen: (doc: Doc, anchor?: string) => void;
}) {
  const topic = topicById(doc.topicId);
  return (
    <article className="group">
      <button
        type="button"
        onClick={() => onOpen(doc)}
        className="block w-full cursor-pointer text-left"
      >
        <div className="flex items-center gap-2 text-xs text-[#202124] dark:text-[#e8eaed]">
          <span
            aria-hidden="true"
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#dadce0] bg-white font-logo text-xs dark:border-[#3c4043] dark:bg-[#28292a]",
              topic ? topicColorText[topic.color] : "text-[#5f6368] dark:text-[#9aa0a6]"
            )}
          >
            {topic ? topic.name[0] : "C"}
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium leading-4">{doc.url.split(" › ")[0]}</p>
            <p className="truncate leading-4 text-[#4d5156] dark:text-[#9aa0a6]">
              {doc.url.split(" › ").slice(1).join(" › ")}
            </p>
          </div>
        </div>
        <h3 className="result-title mt-1 inline-block text-xl text-[#1a0dab] visited:text-[#681da8] group-hover:underline dark:text-[#8ab4f8]">
          {doc.title}
        </h3>
      </button>
      <p className="mt-1 text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]">
        {highlightSegments(doc.description, query).map((seg, i) =>
          seg.hit ? (
            <strong key={i} className="font-bold">
              {seg.text}
            </strong>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </p>
      {doc.sitelinks && doc.sitelinks.length > 0 && (
        <nav aria-label="Sitelinks" className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
          {doc.sitelinks.slice(0, 4).map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => onOpen(doc, s.anchor)}
              className="cursor-pointer text-sm text-[#1558d6] hover:underline dark:text-[#8ab4f8]"
            >
              {s.label}
            </button>
          ))}
        </nav>
      )}
    </article>
  );
}

const topicColorText = {
  gblue: "text-[#4285f4]",
  gred: "text-[#ea4335]",
  gyellow: "text-[#f9ab00]",
  ggreen: "text-[#188038]",
} as const;

/* --------------------- People also ask --------------------- */

function PeopleAlsoAsk({
  query,
  onSearch,
}: {
  query: string;
  onSearch: (q: string) => void;
}) {
  const [openIdx, setOpenIdx] = useState<number>(-1);

  const faqs = useMemo(() => {
    const outcome = search(query);
    const topTopic = outcome.hits.find((h) => h.doc.kind === "topic");
    if (topTopic) {
      const t = topicById(topTopic.doc.topicId);
      if (t && t.faqs.length > 0) return t.faqs;
    }
    return generalFaqs;
  }, [query]);

  return (
    <section aria-label="People also ask" className="rounded-xl border border-[#dadce0] bg-white dark:border-[#3c4043] dark:bg-[#28292a]">
      <h2 className="px-4 pt-4 text-xl font-medium text-[#202124] dark:text-[#e8eaed]">
        People also ask
      </h2>
      <ul className="mt-1 divide-y divide-[#dadce0] dark:divide-[#3c4043]">
        {faqs.slice(0, 4).map((f, i) => (
          <li key={f.question}>
            <button
              type="button"
              aria-expanded={openIdx === i}
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-[#202124] transition-colors hover:bg-[#f8f9fa] dark:text-[#e8eaed] dark:hover:bg-[#303134]"
            >
              {f.question}
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-5 w-5 shrink-0 text-[#70757a] transition-transform dark:text-[#9aa0a6]",
                  openIdx === i && "rotate-180"
                )}
              />
            </button>
            {openIdx === i && (
              <div className="px-4 pb-4">
                <p className="text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]">{f.answer}</p>
                <button
                  type="button"
                  onClick={() => onSearch(f.question)}
                  className="mt-2 cursor-pointer text-sm font-medium text-[#1a73e8] hover:underline dark:text-[#8ab4f8]"
                >
                  Search for this
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------ Results view ------------------------ */

export function ResultsView({
  query,
  onSearch,
  onGoHome,
  onOpenTopic,
  onOpenAbout,
}: {
  query: string;
  onSearch: (q: string) => void;
  onGoHome: () => void;
  onOpenTopic: (topicId: TopicId, anchor?: string) => void;
  onOpenAbout: (anchor?: string) => void;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");

  const outcome = useMemo(() => search(query), [query]);
  const instant = useMemo(() => detectInstantAnswer(query), [query]);

  const hits = useMemo(
    () => (tab === "all" ? outcome.hits : outcome.hits.filter((h) => h.doc.topicId === tab)),
    [outcome.hits, tab]
  );

  const knowledgeTopic = useMemo(() => {
    const top = outcome.hits.find((h) => h.doc.kind === "topic");
    if (top) return topicById(top.doc.topicId);
    return null;
  }, [outcome.hits]);

  const openDoc = (doc: Doc, anchor?: string) => {
    if (doc.topicId === "about") {
      onOpenAbout(anchor);
    } else {
      onOpenTopic(doc.topicId as TopicId, anchor);
    }
  };

  const changeTab = (id: (typeof TABS)[number]["id"]) => {
    setTab(id);
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Sticky header: logo + search + tabs */}
      <header className="sticky top-0 z-40 border-b border-[#ebebeb] bg-white dark:border-[#3c4043] dark:bg-[#202124]">
        <div className="mx-auto flex max-w-[1152px] items-center gap-4 px-4 pb-2 pt-4 sm:gap-6 sm:px-6">
          <button
            type="button"
            onClick={onGoHome}
            aria-label="Cathy Li — back to home"
            className="shrink-0 cursor-pointer"
          >
            <GoogleStyleLogo size="sm" bounce />
          </button>
          <div className="min-w-0 flex-1 sm:max-w-[692px]">
            <SearchBar initialQuery={query} onSearch={onSearch} size="sm" />
          </div>
        </div>
        <nav aria-label="Search tabs" className="mx-auto max-w-[1152px] px-4 sm:px-6">
          <ul className="flex gap-1 overflow-x-auto text-sm" role="tablist">
            {TABS.map((t) => (
              <li key={t.id} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => changeTab(t.id)}
                  className={cn(
                    "relative cursor-pointer whitespace-nowrap px-3 py-2.5 transition-colors",
                    tab === t.id
                      ? "font-medium text-[#1a73e8] dark:text-[#8ab4f8]"
                      : "text-[#5f6368] hover:text-[#202124] dark:text-[#9aa0a6] dark:hover:text-[#e8eaed]"
                  )}
                >
                  {t.label}
                  {tab === t.id && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[3px] rounded-t bg-[#1a73e8] dark:bg-[#8ab4f8]"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Body: results column + knowledge panel */}
      <div className="mx-auto flex w-full max-w-[1152px] flex-1 gap-10 px-4 py-4 sm:px-6">
        <main className="min-w-0 flex-1 sm:max-w-[652px]">
          <p className="text-sm text-[#70757a] dark:text-[#9aa0a6]">
            About {outcome.total} result{outcome.total === 1 ? "" : "s"} (
            {(outcome.timeMs / 1000).toFixed(3)} seconds) — for one person, that's thorough
          </p>

          {instant && <InstantAnswerCard answer={instant} onSearch={onSearch} />}

          {outcome.suggestion && (
            <p className="mb-4 text-base text-[#202124] dark:text-[#e8eaed]">
              Did you mean{" "}
              <button
                type="button"
                onClick={() => onSearch(outcome.suggestion!)}
                className="cursor-pointer font-medium italic text-[#1a73e8] hover:underline dark:text-[#8ab4f8]"
              >
                {outcome.suggestion}
              </button>
              ?
            </p>
          )}

          {hits.length === 0 ? (
            <div className="py-10">
              <p className="text-lg text-[#202124] dark:text-[#e8eaed]">
                Your search — <span className="font-medium">{query}</span> — did not match any
                documents about Cathy Li.
              </p>
              <p className="mt-2 text-sm text-[#4d5156] dark:text-[#bdc1c6]">
                Suggestions: make sure all words are spelled correctly, try different keywords, or
                try one of the topics Cathy actually has (math, programming, painting, tennis,
                music). Typos are forgiven automatically — this one may be beyond forgiveness.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-7">
              {hits.slice(0, 4).map((h) => (
                <ResultItem key={h.doc.id} doc={h.doc} query={query} onOpen={openDoc} />
              ))}

              <PeopleAlsoAsk query={query} onSearch={onSearch} />

              {hits.slice(4).map((h) => (
                <ResultItem key={h.doc.id} doc={h.doc} query={query} onOpen={openDoc} />
              ))}

              {/* Related searches */}
              <section aria-label="Related searches">
                <h2 className="text-xl font-medium text-[#202124] dark:text-[#e8eaed]">
                  Related searches
                </h2>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {relatedSearches.slice(0, 8).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => onSearch(r)}
                      className="flex cursor-pointer items-center gap-3 rounded-full bg-[#f1f3f4] px-4 py-2.5 text-left text-sm text-[#202124] transition-colors hover:bg-[#e8eaed] dark:bg-[#303134] dark:text-[#e8eaed] dark:hover:bg-[#3c4043]"
                    >
                      <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-[#5f6368] dark:text-[#9aa0a6]" />
                      {r}
                    </button>
                  ))}
                </div>
              </section>

              {/* Pagination flavor */}
              <div className="flex items-center justify-center gap-3 py-6 font-logo text-[#4285f4]">
                <span className="cursor-default text-xl opacity-40">‹</span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => onSearch(query)}
                    aria-label={`Page ${n} — Cathy only has one page of results`}
                    className={cn(
                      "cursor-pointer text-xl transition-transform hover:scale-125",
                      n > 1 && "opacity-40"
                    )}
                  >
                    {n}
                  </button>
                ))}
                <span className="cursor-default text-xl opacity-40">›</span>
                <span className="ml-2 font-sans text-xs text-[#70757a] dark:text-[#9aa0a6]">
                  (one person has one page)
                </span>
              </div>
            </div>
          )}
        </main>

        <KnowledgePanel topic={knowledgeTopic} onSearch={onSearch} />
      </div>
    </div>
  );
}
