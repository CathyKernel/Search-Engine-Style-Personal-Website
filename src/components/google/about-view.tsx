"use client";

import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { GoogleStyleLogo } from "@/components/google/logo";
import { SearchBar } from "@/components/google/search-bar";
import { MonogramAvatar } from "@/components/google/monogram";
import {
  aboutIntro,
  identity,
  quickFacts,
  timeline,
} from "@/data/profile";
import { cn } from "@/lib/utils";

const dotColors = {
  gblue: "bg-[#4285f4]",
  gred: "bg-[#ea4335]",
  gyellow: "bg-[#fbbc05]",
  ggreen: "bg-[#34a853]",
} as const;

const howItWorks = [
  {
    step: "1",
    title: "A hand-rolled index",
    body: "Every page about Cathy — topics, projects, artworks, FAQs — becomes a small document with a title, URL, description and keywords. It is not a database; it is an array that ships inside the page you are reading.",
  },
  {
    step: "2",
    title: "Scoring, not just matching",
    body: "When you type, each document is scored: exact keyword matches beat prefixes, prefixes beat substrings, titles weigh more than descriptions, and whole topics get a small boost over sub-pages.",
  },
  {
    step: "3",
    title: "Typos are forgiven",
    body: "Every word runs through Levenshtein distance against the vocabulary. Type 'mth' or 'tenis' and the engine quietly corrects course — or suggests 'Did you mean…' when nothing scores well.",
  },
  {
    step: "4",
    title: "Instant answers",
    body: "Queries like 12*(3+4), digits of pi, 1729, or hello world are detected before ranking and answered in a card, Google-calculator style. Yes, the calculator actually calculates.",
  },
  {
    step: "5",
    title: "Zero backend",
    body: "No servers, no network calls, no analytics. The entire engine runs in your browser and reports its own response time — typically a few thousandths of a second, for an index of one very full person.",
  },
];

export function AboutView({
  anchor,
  query,
  onSearch,
  onGoHome,
  onGoBack,
}: {
  anchor?: string;
  query: string;
  onSearch: (q: string) => void;
  onGoHome: () => void;
  onGoBack: () => void;
}) {
  useEffect(() => {
    if (!anchor) {
      window.scrollTo({ top: 0 });
      return;
    }
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0 });
  }, [anchor]);

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
        <div className="flex items-center justify-between gap-4">
          <p className="min-w-0 truncate text-sm text-[#4d5156] dark:text-[#9aa0a6]">
            <span className="text-[#202124] dark:text-[#e8eaed]">cathyli.com</span> › about
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
        <section id="story" className="mt-6 scroll-mt-36 overflow-hidden rounded-2xl border border-[#dadce0] bg-white p-6 shadow-sm sm:p-10 dark:border-[#3c4043] dark:bg-[#28292a]">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <MonogramAvatar size={88} />
            <div>
              <h1 className="font-logo text-4xl text-[#202124] dark:text-[#e8eaed] sm:text-5xl">
                {identity.name}
              </h1>
              <p className="mt-2 text-sm text-[#70757a] dark:text-[#9aa0a6]">{identity.role}</p>
              <p className="mt-1 text-sm italic text-[#70757a] dark:text-[#9aa0a6]">
                {identity.location}
              </p>
            </div>
          </div>
          {aboutIntro.map((s) => (
            <div key={s.heading} className="mt-8">
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed]">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-base leading-relaxed text-[#3c4043] dark:text-[#bdc1c6]">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </section>

        {/* Quick facts */}
        <section id="facts" className="scroll-mt-36 pt-10">
          <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed]">Quick facts</h2>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {quickFacts.map((f) => (
              <div
                key={f.label}
                className="flex items-baseline justify-between gap-4 rounded-xl border border-[#dadce0] bg-white p-4 shadow-sm dark:border-[#3c4043] dark:bg-[#28292a]"
              >
                <dt className="text-sm text-[#70757a] dark:text-[#9aa0a6]">{f.label}</dt>
                <dd className="text-right text-sm font-medium text-[#202124] dark:text-[#e8eaed]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Timeline */}
        <section id="timeline" className="scroll-mt-36 pt-10">
          <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed]">
            The timeline — from crayons to code
          </h2>
          <ol className="relative mt-6 space-y-8 border-l-2 border-[#dadce0] pl-6 dark:border-[#3c4043]">
            {timeline.map((t) => (
              <li key={t.title} className="relative">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-[#202124]",
                    dotColors[t.color]
                  )}
                />
                <p className="text-xs font-semibold uppercase tracking-wide text-[#70757a] dark:text-[#9aa0a6]">
                  {t.age}
                </p>
                <h3 className="mt-1 text-lg font-medium text-[#202124] dark:text-[#e8eaed]">
                  {t.title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]">
                  {t.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-36 pt-10">
          <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed]">
            How this search engine works
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#3c4043] dark:text-[#bdc1c6]">
            A search engine for one person still deserves to be a real search engine. This one is
            built by hand, runs entirely in your browser, and takes its job seriously:
          </p>
          <ol className="mt-6 space-y-4">
            {howItWorks.map((s) => (
              <li
                key={s.step}
                className="flex gap-4 rounded-xl border border-[#dadce0] bg-white p-5 shadow-sm dark:border-[#3c4043] dark:bg-[#28292a]"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f0fe] font-logo text-lg text-[#4285f4] dark:bg-[#1f3457] dark:text-[#8ab4f8]"
                >
                  {s.step}
                </span>
                <div>
                  <h3 className="font-medium text-[#202124] dark:text-[#e8eaed]">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Closing CTA */}
        <section className="pt-10">
          <div className="rounded-2xl bg-gradient-to-br from-[#e8f0fe] via-[#fef7e0] to-[#e6f4ea] p-8 text-center dark:from-[#1f3457] dark:via-[#463a1d] dark:to-[#1d3b28]">
            <p className="font-logo text-2xl text-[#202124] dark:text-[#e8eaed]">
              Curiosity, compiled.
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#3c4043] dark:text-[#bdc1c6]">
              That's the whole index. Try searching for a theorem, a chord, a brushstroke, a
              backhand, or a side project — the engine knows the rest of the story.
            </p>
            <button
              type="button"
              onClick={() => onSearch("who is cathy li")}
              className="mt-5 cursor-pointer rounded-full bg-[#1a73e8] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1b66c9]"
            >
              Search "who is cathy li"
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
