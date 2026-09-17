"use client";

import { ArrowRight, CloudSun, ExternalLink, Search } from "lucide-react";
import type { InstantAnswer } from "@/lib/search-engine";
import { PI_DIGITS } from "@/lib/search-engine";

/**
 * Google-style instant answer cards, rendered above the results
 * when the query matches one (calculator, unit facts, dictionary…).
 */
export function InstantAnswerCard({
  answer,
  onSearch,
}: {
  answer: InstantAnswer;
  onSearch: (q: string) => void;
}) {
  const shell =
    "mb-6 rounded-xl border border-[#dadce0] bg-white p-5 shadow-sm dark:border-[#3c4043] dark:bg-[#28292a]";

  switch (answer.type) {
    case "calc":
      return (
        <section className={shell} aria-label="Calculator result">
          <div className="text-right">
            <p className="text-lg text-[#70757a] dark:text-[#9aa0a6]">{answer.expression} =</p>
            <p className="mt-1 break-words text-4xl font-normal text-[#202124] dark:text-[#e8eaed]">
              {answer.result}
            </p>
          </div>
          <p className="mt-4 border-t border-[#dadce0] pt-3 text-sm text-[#70757a] dark:border-[#3c4043] dark:text-[#9aa0a6]">
            Verified by Cathy's mental-math training routine — try <span className="font-medium">1729 + 10**3</span> next.
          </p>
        </section>
      );

    case "pi":
      return (
        <section className={shell} aria-label="Value of pi">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-logo text-4xl text-[#4285f4]">π</span>
            <span className="text-sm text-[#70757a] dark:text-[#9aa0a6]">Cathy has 120 of these memorized</span>
          </div>
          <p className="mt-3 break-all font-mono text-sm leading-relaxed text-[#202124] dark:text-[#e8eaed]">
            {PI_DIGITS.slice(0, 120)}
            <span className="text-[#9aa0a6]">…</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-[#dadce0] pt-3 dark:border-[#3c4043]">
            <button
              type="button"
              onClick={() => onSearch("math")}
              className="cursor-pointer text-sm font-medium text-[#1a73e8] hover:underline dark:text-[#8ab4f8]"
            >
              See the math page
            </button>
          </div>
        </section>
      );

    case "euler":
      return (
        <section className={shell} aria-label="Euler's identity">
          <p className="text-center font-logo text-2xl sm:text-4xl">
            <span className="text-[#4285f4]">e</span>
            <sup className="text-[#ea4335]">
              i<span className="text-[#fbbc05]">π</span>
            </sup>
            <span className="text-[#34a853]"> + 1 = 0</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]">
            Euler's identity — Cathy's favorite theorem. Five fundamental constants, one line, zero
            waste. She wrote it on her whiteboard the day she first understood the derivation, and it
            is still there.
          </p>
          <div className="mt-4 border-t border-[#dadce0] pt-3 dark:border-[#3c4043]">
            <button
              type="button"
              onClick={() => onSearch("favorite theorem")}
              className="cursor-pointer text-sm font-medium text-[#1a73e8] hover:underline dark:text-[#8ab4f8]"
            >
              Why it's her favorite
            </button>
          </div>
        </section>
      );

    case "taxicab":
      return (
        <section className={shell} aria-label="The number 1729">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-logo text-4xl text-[#4285f4]">1729</p>
            <p className="text-sm text-[#70757a] dark:text-[#9aa0a6]">the Hardy–Ramanujan number</p>
          </div>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]">
            <p>
              The smallest number expressible as the sum of two positive cubes in two different
              ways:
            </p>
            <p className="rounded-lg bg-[#f8f9fa] p-3 font-mono text-base text-[#202124] dark:bg-[#202124] dark:text-[#e8eaed]">
              1³ + 12³ = 1729
              <br />
              9³ + 10³ = 1729
            </p>
            <p>
              Hardy called it dull; Ramanujan disagreed instantly. Cathy keeps it as her favorite
              number because any integer that can defend itself that elegantly deserves a fan club.
            </p>
          </div>
        </section>
      );

    case "time":
      return (
        <section className={shell} aria-label="Current time">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-logo text-4xl text-[#202124] dark:text-[#e8eaed]">{answer.time}</p>
            <p className="text-sm text-[#70757a] dark:text-[#9aa0a6]">your local time</p>
          </div>
          <p className="mt-4 border-t border-[#dadce0] pt-3 text-sm text-[#4d5156] dark:border-[#3c4043] dark:text-[#bdc1c6]">
            Statistically, 43% of Cathy's searches happen between 10 p.m. and "one more commit".
          </p>
        </section>
      );

    case "weather":
      return (
        <section className={shell} aria-label="Weather">
          <div className="flex items-center gap-4">
            <CloudSun aria-hidden="true" className="h-12 w-12 text-[#fbbc05]" />
            <div>
              <p className="text-lg text-[#202124] dark:text-[#e8eaed]">
                72°F — Sunny, light breeze from the advection side
              </p>
              <p className="text-sm text-[#70757a] dark:text-[#9aa0a6]">
                Weather forecast for: an outdoor tennis court, ideally
              </p>
            </div>
          </div>
          <p className="mt-4 border-t border-[#dadce0] pt-3 text-sm text-[#4d5156] dark:border-[#3c4043] dark:text-[#bdc1c6]">
            Cathy does not trust this forecast either — she trusts the sky over the baseline. Real
            weather should be searched elsewhere; this engine only indexes one person.
          </p>
        </section>
      );

    case "helloWorld":
      return (
        <section className={shell} aria-label="Hello world">
          <p className="text-sm uppercase tracking-wide text-[#70757a] dark:text-[#9aa0a6]">
            Cathy's first words to a computer, ca. age 10
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-[#202124] p-4 font-mono text-sm leading-relaxed text-[#e8eaed]">
            <code>{`print("Hello, world!")`}</code>
          </pre>
          <p className="mt-4 border-t border-[#dadce0] pt-3 text-sm text-[#4d5156] dark:border-[#3c4043] dark:text-[#bdc1c6]">
            The turtle drew a square next. Then a spiral of squares. Then a spirograph her printer
            refused to believe was math homework.
          </p>
          <div className="mt-3">
            <button
              type="button"
              onClick={() => onSearch("programming")}
              className="cursor-pointer text-sm font-medium text-[#1a73e8] hover:underline dark:text-[#8ab4f8]"
            >
              Read the programming story
            </button>
          </div>
        </section>
      );

    case "meaning":
      return (
        <section className={shell} aria-label={`Definition of ${answer.word}`}>
          <div className="flex items-baseline gap-3">
            <h3 className="font-logo text-3xl text-[#202124] dark:text-[#e8eaed]">{answer.word}</h3>
            <span className="text-sm italic text-[#70757a] dark:text-[#9aa0a6]">
              / tennis term /
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]">{answer.meaning}</p>
          <p className="mt-2 text-sm leading-relaxed text-[#70757a] dark:text-[#9aa0a6]">{answer.more}</p>
          <div className="mt-4 border-t border-[#dadce0] pt-3 dark:border-[#3c4043]">
            <button
              type="button"
              onClick={() => onSearch("tennis")}
              className="cursor-pointer text-sm font-medium text-[#1a73e8] hover:underline dark:text-[#8ab4f8]"
            >
              More from the tennis page
            </button>
          </div>
        </section>
      );

    case "googleRedirect":
      return (
        <section className={shell} aria-label="About Google">
          <p className="text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]">
            This is <span className="font-medium">Cathy Li Search</span> — it indexes exactly one
            person, on purpose. The other search engine is still available for everything else:
          </p>
          <a
            href="https://www.google.com/search?q=cathy+li"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1b66c9]"
          >
            <Search aria-hidden="true" className="h-4 w-4" />
            Search Google for "cathy li"
            <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </section>
      );
  }

  /* unreachable, keeps TS happy */
  return (
    <section className={shell}>
      <p className="flex items-center gap-2 text-sm text-[#70757a]">
        Instant answer <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </p>
    </section>
  );
}
