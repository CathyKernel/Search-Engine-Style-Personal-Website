"use client";

import { useEffect, useMemo } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import { GoogleStyleLogo } from "@/components/google/logo";
import { SearchBar } from "@/components/google/search-bar";
import { ArtworkCard } from "@/components/google/artwork";
import { topics, type Topic } from "@/data/topics";
import { cn } from "@/lib/utils";

/** Per-topic anchor ids for the section blocks, used by result sitelinks. */
const sectionAnchors: Record<Topic["id"], string[]> = {
  math: ["journey", "corners", "why"],
  programming: ["journey", "languages", "work"],
  painting: ["journey", "influences", "process"],
  tennis: ["journey", "style", "grind"],
  music: ["journey", "repertoire", "practice"],
};

const accents = {
  gblue: {
    bar: "bg-[#4285f4]",
    chip: "bg-[#e8f0fe] text-[#1967d2] dark:bg-[#1f3457] dark:text-[#8ab4f8]",
    heading: "text-[#1967d2] dark:text-[#8ab4f8]",
    glow: "from-[#4285f4]/12",
  },
  gred: {
    bar: "bg-[#ea4335]",
    chip: "bg-[#fce8e6] text-[#c5221f] dark:bg-[#4a2622] dark:text-[#f28b82]",
    heading: "text-[#c5221f] dark:text-[#f28b82]",
    glow: "from-[#ea4335]/12",
  },
  gyellow: {
    bar: "bg-[#fbbc05]",
    chip: "bg-[#fef7e0] text-[#b06000] dark:bg-[#463a1d] dark:text-[#fdd663]",
    heading: "text-[#b06000] dark:text-[#fdd663]",
    glow: "from-[#fbbc05]/12",
  },
  ggreen: {
    bar: "bg-[#34a853]",
    chip: "bg-[#e6f4ea] text-[#137333] dark:bg-[#1d3b28] dark:text-[#81c995]",
    heading: "text-[#137333] dark:text-[#81c995]",
    glow: "from-[#34a853]/12",
  },
} as const;

function FaqAccordion({ topic }: { topic: Topic }) {
  const [openIdx, setOpenIdx] = useState(-1);
  return (
    <section id="faq" aria-label="Frequently asked questions" className="scroll-mt-36">
      <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed]">
        People also ask about {topic.name.toLowerCase()}
      </h2>
      <ul className="mt-4 divide-y divide-[#dadce0] rounded-xl border border-[#dadce0] bg-white dark:divide-[#3c4043] dark:border-[#3c4043] dark:bg-[#28292a]">
        {topic.faqs.map((f, i) => (
          <li key={f.question}>
            <button
              type="button"
              aria-expanded={openIdx === i}
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-[#202124] transition-colors hover:bg-[#f8f9fa] dark:text-[#e8eaed] dark:hover:bg-[#303134]"
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
              <p className="px-5 pb-5 text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]">
                {f.answer}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TopicView({
  topicId,
  anchor,
  query,
  onSearch,
  onGoHome,
  onGoBack,
}: {
  topicId: Topic["id"];
  anchor?: string;
  query: string;
  onSearch: (q: string) => void;
  onGoHome: () => void;
  onGoBack: () => void;
}) {
  const topic = useMemo(() => topics.find((t) => t.id === topicId)!, [topicId]);
  const accent = accents[topic.color];

  useEffect(() => {
    if (!anchor) {
      window.scrollTo({ top: 0 });
      return;
    }
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [anchor, topicId]);

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-40 border-b border-[#ebebeb] bg-white dark:border-[#3c4043] dark:bg-[#202124]">
        <div className="mx-auto flex max-w-[1152px] items-center gap-4 px-4 py-4 sm:gap-6 sm:px-6">
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
      </header>

      <main className="mx-auto w-full max-w-[900px] flex-1 px-4 py-6 sm:px-6 sm:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <p className="min-w-0 truncate text-sm text-[#4d5156] dark:text-[#9aa0a6]">
            <span className="text-[#202124] dark:text-[#e8eaed]">cathyli.com</span> ›{" "}
            {topic.name.toLowerCase()}
          </p>
          <button
            type="button"
            onClick={onGoBack}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-[#dadce0] px-3 py-1.5 text-sm text-[#3c4043] transition-colors hover:bg-[#f8f9fa] dark:border-[#3c4043] dark:text-[#e8eaed] dark:hover:bg-[#303134]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to results
          </button>
        </div>

        {/* Hero */}
        <div className={cn("relative mt-6 overflow-hidden rounded-2xl border border-[#dadce0] bg-gradient-to-br to-transparent p-6 sm:p-10 dark:border-[#3c4043]", accent.glow)}>
          <span aria-hidden="true" className={cn("absolute inset-x-0 top-0 h-1.5", accent.bar)} />
          <h1 className="font-logo text-4xl text-[#202124] dark:text-[#e8eaed] sm:text-5xl">
            {topic.name}
          </h1>
          <p className={cn("mt-2 text-lg font-medium", accent.heading)}>{topic.tagline}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#3c4043] dark:text-[#bdc1c6]">
            {topic.hero}
          </p>
        </div>

        {/* Stats */}
        <section id="stats" className="scroll-mt-36 pt-10">
          <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed]">At a glance</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {topic.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-[#dadce0] bg-white p-4 shadow-sm dark:border-[#3c4043] dark:bg-[#28292a]"
              >
                <dt className="text-xs uppercase tracking-wide text-[#70757a] dark:text-[#9aa0a6]">
                  {s.label}
                </dt>
                <dd className="mt-1.5 text-lg font-medium text-[#202124] dark:text-[#e8eaed]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Sections */}
        {topic.sections.map((section, i) => (
          <section
            key={section.heading}
            id={sectionAnchors[topic.id][i]}
            className="scroll-mt-36 pt-10"
          >
            <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed]">
              {section.heading}
            </h2>
            {section.paragraphs.map((p, j) => (
              <p key={j} className="mt-4 max-w-3xl text-base leading-relaxed text-[#3c4043] dark:text-[#bdc1c6]">
                {p}
              </p>
            ))}
          </section>
        ))}

        {/* Projects */}
        {topic.projects && topic.projects.length > 0 && (
          <section id="projects" className="scroll-mt-36 pt-10">
            <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed]">Projects</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {topic.projects.map((p) => (
                <article
                  key={p.name}
                  className="rounded-xl border border-[#dadce0] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-[#3c4043] dark:bg-[#28292a]"
                >
                  <h3 className="text-lg font-medium text-[#202124] dark:text-[#e8eaed]">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]">
                    {p.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className={cn("rounded-full px-2.5 py-1 text-xs font-medium", accent.chip)}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Artworks */}
        {topic.artworks && topic.artworks.length > 0 && (
          <section id="gallery" className="scroll-mt-36 pt-10">
            <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed]">Gallery</h2>
            <p className="mt-2 text-sm text-[#70757a] dark:text-[#9aa0a6]">
              Every piece below is generated live from its palette and algorithm — fitting, for a
              gallery that lives inside a search engine.
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {topic.artworks.map((a) => (
                <ArtworkCard key={a.id} artwork={a} />
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <div className="pt-10">
          <FaqAccordion topic={topic} />
        </div>

        {/* Cross links */}
        <section className="pt-10">
          <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed]">
            Continue down the rabbit hole
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {topics
              .filter((t) => t.id !== topic.id)
              .map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onSearch(t.name.toLowerCase())}
                  className="cursor-pointer rounded-full border border-[#dadce0] bg-white px-4 py-2 text-sm text-[#3c4043] transition-colors hover:bg-[#f1f3f4] dark:border-[#3c4043] dark:bg-[#303134] dark:text-[#e8eaed] dark:hover:bg-[#3c4043]"
                >
                  {t.name} →
                </button>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
