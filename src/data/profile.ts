/**
 * ============================================================
 *  CATHY LI — PERSONAL DATA
 *  Edit this file to make the search engine yours.
 *  Everything on the site (results, topic pages, suggestions)
 *  is generated from the data in src/data/.
 * ============================================================
 */

export interface Stat {
  label: string;
  value: string;
}

export interface Section {
  heading: string;
  paragraphs: string[];
}

export interface Faq {
  question: string;
  answer: string;
}

export interface TimelineEvent {
  age: string;
  title: string;
  detail: string;
  color: "gblue" | "gred" | "gyellow" | "ggreen";
}

export const identity = {
  name: "Cathy Li",
  firstName: "Cathy",
  role: "Student · Mathlete · Developer · Artist · Athlete · Musician",
  tagline: "Curiosity, compiled.",
  location: "Somewhere between a proof and a baseline",
  avatarInitials: "CL",
};

export const aboutIntro: Section[] = [
  {
    heading: "Hi, I'm Cathy Li",
    paragraphs: [
      "Welcome to my corner of the internet — a search engine that indexes exactly one person. Type anything into the box above: a number, a color, a chord, a tennis term, a theorem. If it is part of my life, this engine will find it. If it is not, it will politely suggest something that is.",
      "I am, in no particular order: a student who thinks in equations, a developer who ships side projects at 1 a.m., a painter who cannot pass an art store, a tennis player who calls the court her second home, and a pianist whose neighbors have memorized the Chopin nocturnes whether they wanted to or not.",
      "People ask why I built this as a search engine instead of a normal portfolio. The honest answer: a portfolio tells you who I am, but a search engine lets you ask. I like the second kind of conversation better.",
    ],
  },
  {
    heading: "The short version",
    paragraphs: [
      "I believe the five things I love are secretly one thing. Math is structure; programming is structure you can run; painting is structure you can feel; music is structure you can hear; tennis is structure at 90 miles per hour. Different instruments, same song.",
      "This site is itself a small engineering project — a fully client-side search engine with autocomplete, fuzzy matching, typo tolerance, instant answers, and zero servers. The code is as much a part of the portfolio as the content.",
    ],
  },
];

export const quickFacts: Stat[] = [
  { label: "Name", value: "Cathy Li" },
  { label: "Favorite theorem", value: "Euler's identity" },
  { label: "Favorite number", value: "1729 (the taxicab number)" },
  { label: "Languages spoken", value: "English, 中文, Python, TypeScript" },
  { label: "Digits of π memorized", value: "120 and counting" },
  { label: "Current obsession", value: "One-handed backhand down the line" },
];

export const timeline: TimelineEvent[] = [
  {
    age: "Age 4",
    title: "First box of crayons",
    detail:
      "The wall paid the price. My parents decided paper was cheaper than repainting, and an artist was born.",
    color: "gred",
  },
  {
    age: "Age 6",
    title: "First piano lesson",
    detail:
      "A slightly out-of-tune upright, a metronome, and a teacher who let me play it 'my way' once the notes were right.",
    color: "gblue",
  },
  {
    age: "Age 8",
    title: "Summer tennis camp",
    detail:
      "Held a racket for the first time. Hit exactly one ball over the fence. Was instantly, permanently hooked.",
    color: "ggreen",
  },
  {
    age: "Age 10",
    title: "First program",
    detail:
      "A turtle that drew a square, then a spiral of squares, then a spirograph my printer refused to accept was math homework.",
    color: "gyellow",
  },
  {
    age: "Age 12",
    title: "First competition medal",
    detail:
      "A regional math olympiad. The medal is somewhere in a drawer; the adrenaline is still here.",
    color: "gblue",
  },
  {
    age: "Age 14",
    title: "First watercolor class",
    detail:
      "Learned that water is a collaborator, not a tool. Ruined eleven sheets of paper before the twelfth one worked.",
    color: "gred",
  },
  {
    age: "Now",
    title: "You are looking at it",
    detail:
      "A personal search engine, five hobbies in one index, and absolutely no plans to slow down.",
    color: "ggreen",
  },
];

/** Questions that appear in the "People also ask" box on the results page. */
export const generalFaqs: Faq[] = [
  {
    question: "Who is Cathy Li?",
    answer:
      "A student and serial hobbyist who refuses to pick just one passion. Cathy Li studies mathematics, writes software, paints in watercolor, plays competitive tennis, and performs on the piano — and built this search engine to make all of it explorable.",
  },
  {
    question: "Is this a real search engine?",
    answer:
      "Yes and no. It has real autocomplete, typo tolerance, fuzzy matching, ranking, instant answers, and measured response times — every feature you would expect. It just refuses to index the entire internet. It only indexes Cathy, which honestly makes it much faster.",
  },
  {
    question: "Why does Cathy Li have so many hobbies?",
    answer:
      "In Cathy's own words: they are not five hobbies, they are five dialects of the same language. Mathematics gives her the grammar, code makes it executable, painting and music make it visible and audible, and tennis keeps the body that carries the brain in shape.",
  },
  {
    question: "How was this site built?",
    answer:
      "With Next.js, TypeScript, Tailwind CSS, and a hand-rolled search index — no backend, no database, no server queries. Every result you see was ranked in your browser in a few thousandths of a second.",
  },
  {
    question: "What is Cathy Li's favorite number?",
    answer:
      "1729 — the famous taxicab number from the Hardy–Ramanujan anecdote. It is the smallest number expressible as the sum of two positive cubes in two different ways: 1³ + 12³ and 9³ + 10³. Cathy will explain why this is delightful whether you ask or not.",
  },
];

/** Phrases offered by autocomplete before the user types anything meaningful. */
export const trendingSuggestions: string[] = [
  "cathy li math",
  "who is cathy li",
  "cathy li projects",
  "favorite theorem",
  "watercolor gallery",
  "tennis scoring love",
  "piano practice routine",
  "digits of pi",
  "how this site works",
  "hello world",
];

/** Shown as chips under "Related searches" on the results page. */
export const relatedSearches: string[] = [
  "cathy li projects",
  "favorite theorem",
  "euler's identity",
  "watercolor gallery",
  "tennis scoring",
  "piano repertoire",
  "who is cathy li",
  "digits of pi",
  "how this site works",
];

/** Entities for the knowledge panel's "People also search for" section. */
export const alsoSearchedFor: { label: string; query: string }[] = [
  { label: "Leonhard Euler", query: "euler" },
  { label: "Roger Federer", query: "federer" },
  { label: "Frédéric Chopin", query: "chopin" },
  { label: "Wassily Kandinsky", query: "kandinsky" },
  { label: "Ada Lovelace", query: "programming" },
];
