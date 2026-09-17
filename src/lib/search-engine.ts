import { topics, type Topic } from "@/data/topics";
import { identity, trendingSuggestions, generalFaqs, timeline } from "@/data/profile";

/* ============================================================
 *  A tiny hand-rolled search engine for one person.
 *  Everything runs client-side: no servers, no network.
 * ============================================================ */

export interface Doc {
  id: string;
  title: string;
  url: string;
  description: string;
  keywords: string[];
  topicId: Topic["id"] | "about";
  kind: "topic" | "sub" | "page";
  sitelinks?: { label: string; anchor: string }[];
}

export interface SearchHit {
  doc: Doc;
  score: number;
}

export interface SearchOutcome {
  hits: SearchHit[];
  total: number;
  suggestion: string | null;
  related: Doc[];
  timeMs: number;
}

export type InstantAnswer =
  | { type: "pi" }
  | { type: "euler" }
  | { type: "taxicab" }
  | { type: "calc"; expression: string; result: string }
  | { type: "time"; time: string }
  | { type: "weather" }
  | { type: "helloWorld" }
  | { type: "meaning"; word: string; meaning: string; more: string; topicId: Topic["id"] }
  | { type: "googleRedirect" };

/* ---------------------------- Index ---------------------------- */

function buildIndex(): Doc[] {
  const docs: Doc[] = [];

  for (const topic of topics) {
    docs.push({
      id: `topic-${topic.id}`,
      title: `${topic.name} — everything about Cathy Li`,
      url: topic.url,
      description: topic.snippet,
      keywords: topic.keywords,
      topicId: topic.id,
      kind: "topic",
      sitelinks: topic.sitelinks,
    });

    for (const project of topic.projects ?? []) {
      docs.push({
        id: `project-${project.name}`,
        title: `${project.name} — a Cathy Li project`,
        url: `${topic.url} › projects`,
        description: `${project.description} Built with ${project.tech.join(", ")}.`,
        keywords: [
          project.name.toLowerCase(),
          "project",
          "projects",
          "app",
          ...project.tech.map((t) => t.toLowerCase()),
          ...topic.keywords.slice(0, 6),
        ],
        topicId: topic.id,
        kind: "sub",
      });
    }

    for (const art of topic.artworks ?? []) {
      docs.push({
        id: `art-${art.id}`,
        title: `${art.title} — Cathy Li gallery`,
        url: `${topic.url} › gallery`,
        description: `${art.description} ${art.medium}, ${art.year}.`,
        keywords: [...art.keywords, "painting", "art", "gallery"],
        topicId: topic.id,
        kind: "sub",
      });
    }
  }

  docs.push({
    id: "about",
    title: "Cathy Li — about and the story so far",
    url: "cathyli.com › about",
    description: `Who is Cathy Li? A student who thinks in equations, ships side projects at 1 a.m., paints in watercolor, plays aggressive baseline tennis, and performs Chopin.`,
    keywords: [
      "about", "who", "who is cathy li", "cathy", "li", "bio", "biography",
      "resume", "cv", "me", "person", "profile", "story", "timeline",
      "introduction", "meet", "cathy li",
    ],
    topicId: "about",
    kind: "topic",
    sitelinks: [
      { label: "The story so far", anchor: "story" },
      { label: "Timeline", anchor: "timeline" },
      { label: "How this site works", anchor: "how" },
    ],
  });

  docs.push({
    id: "how-it-works",
    title: "How this search engine works — Cathy Li",
    url: "cathyli.com › about › how-it-works",
    description:
      "Cathy Li Search is a fully client-side engine: a hand-built index, term scoring, typo-tolerant fuzzy matching, autocomplete and instant answers — all running in your browser in thousandths of a second, with no backend at all.",
    keywords: [
      "how this site works", "how it works", "search engine", "how search works",
      "ranking", "fuzzy", "index", "algorithm", "no backend", "client side",
      "built with", "nextjs", "typescript", "tailwind",
    ],
    topicId: "about",
    kind: "sub",
  });

  docs.push({
    id: "faq",
    title: "People also ask about Cathy Li — FAQ",
    url: "cathyli.com › about › faq",
    description: generalFaqs.map((f) => f.question).join(" · "),
    keywords: [
      "faq", "questions", "answers", "people also ask", "interview",
      ...generalFaqs.flatMap((f) => f.question.toLowerCase().split(/\W+/).filter((w) => w.length > 3)),
    ],
    topicId: "about",
    kind: "sub",
  });

  docs.push({
    id: "timeline",
    title: "The Cathy Li timeline — from crayons to code",
    url: "cathyli.com › about › timeline",
    description: timeline.map((t) => `${t.age}: ${t.title}`).join(" · "),
    keywords: [
      "timeline", "history", "growing up", "crayons", "piano lesson", "tennis camp",
      "first program", "medal", "watercolor class", "childhood", "journey",
    ],
    topicId: "about",
    kind: "sub",
  });

  return docs;
}

export const index = buildIndex();

/** All topics plus a synthetic "About" pseudo-topic helper. */
export const aboutUrl = "cathyli.com › about";

/* -------------------------- Utilities -------------------------- */

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[b.length];
}

function fuzzyTolerance(word: string): number {
  if (word.length >= 7) return 2;
  if (word.length >= 4) return 1;
  return 0;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9π]+/)
    .filter((w) => w.length > 0);
}

export function normalizeQuery(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

/* ---------------------------- Scoring ---------------------------- */

function scoreDoc(queryLower: string, words: string[], doc: Doc): number {
  const titleLower = doc.title.toLowerCase();
  const descLower = doc.description.toLowerCase();
  let score = 0;
  let matched = false;

  if (queryLower.length > 0 && titleLower === queryLower) {
    score += 200;
    matched = true;
  }
  if (queryLower.length > 0 && titleLower.includes(queryLower)) {
    score += 60;
    matched = true;
  }

  for (const word of words) {
    if (titleLower.includes(word)) {
      score += 26;
      matched = true;
    }
    if (descLower.includes(word)) {
      score += 8;
      matched = true;
    }

    let bestKeywordScore = 0;
    for (const kw of doc.keywords) {
      if (kw === word) {
        bestKeywordScore = Math.max(bestKeywordScore, 40);
        matched = true;
        break; // exact match cannot be beaten
      }
      if (word.length >= 2 && kw.startsWith(word)) {
        bestKeywordScore = Math.max(bestKeywordScore, 22);
        matched = true;
        continue;
      }
      if (word.length >= 4 && kw.includes(word)) {
        bestKeywordScore = Math.max(bestKeywordScore, 12);
        matched = true;
        continue;
      }
      const tol = fuzzyTolerance(word);
      if (tol > 0 && Math.abs(kw.length - word.length) <= tol) {
        if (levenshtein(kw, word) <= tol) {
          bestKeywordScore = Math.max(bestKeywordScore, 14);
          matched = true;
        }
      }
    }
    score += bestKeywordScore;
  }

  /* A doc with zero relevance to any query word must not score at all —
     otherwise the topic boost below would surface every topic for
     garbage queries like "zxqvolkqw". */
  if (!matched) return 0;

  if (doc.kind === "topic") score += 4;
  return score;
}

/* --------------------------- Vocabulary --------------------------- */

const vocabulary: string[] = (() => {
  const set = new Set<string>();
  for (const doc of index) {
    for (const kw of doc.keywords) if (kw.length >= 3) set.add(kw);
    for (const w of tokenize(doc.title)) if (w.length >= 3) set.add(w);
  }
  for (const t of trendingSuggestions) {
    for (const w of tokenize(t)) if (w.length >= 3) set.add(w);
  }
  return Array.from(set);
})();

/** Suggest a corrected query when nothing scored well. */
function didYouMean(query: string): string | null {
  const words = tokenize(query);
  if (words.length === 0) return null;

  const corrected = words.map((word) => {
    if (word.length < 4) return word;
    if (vocabulary.includes(word)) return word;
    let best: string | null = null;
    let bestDist = fuzzyTolerance(word) + 1;
    for (const vocab of vocabulary) {
      if (Math.abs(vocab.length - word.length) > bestDist) continue;
      const d = levenshtein(vocab, word);
      if (d < bestDist || (d === bestDist && best === null)) {
        bestDist = d;
        best = vocab;
      }
    }
    return best ?? word;
  });

  const joined = corrected.join(" ");
  if (joined !== words.join(" ")) return joined;
  return null;
}

/* ------------------------------ Search ------------------------------ */

const TOPIC_DOCS = index.filter((d) => d.kind === "topic");

export function search(rawQuery: string): SearchOutcome {
  const started = performance.now();
  const query = normalizeQuery(rawQuery).toLowerCase();
  const words = tokenize(query);

  const scored: SearchHit[] = index
    .map((doc) => ({ doc, score: scoreDoc(query, words, doc) }))
    .filter((h) => h.score > 0);

  scored.sort((a, b) => b.score - a.score || a.doc.kind.localeCompare(b.doc.kind));

  const strong = scored.filter((h) => h.score >= 24);
  const hits = (strong.length > 0 ? strong : scored).slice(0, 14);

  const hitIds = new Set(hits.map((h) => h.doc.id));
  const relatedCandidates: Doc[] = scored
    .filter((h) => !hitIds.has(h.doc.id) && h.doc.kind === "topic")
    .map((h) => h.doc);
  const related =
    relatedCandidates.length > 0
      ? relatedCandidates.slice(0, 4)
      : TOPIC_DOCS.filter((d) => !hitIds.has(d.id)).slice(0, 4);

  const suggestion = hits.length === 0 ? didYouMean(query) : null;

  return {
    hits,
    total: scored.length,
    suggestion,
    related,
    timeMs: Math.max(performance.now() - started, 0.0001),
  };
}

/* --------------------------- Autocomplete --------------------------- */

export interface Suggestion {
  text: string;
  fromHistory: boolean;
}

export function suggest(rawQuery: string, history: string[]): Suggestion[] {
  const query = normalizeQuery(rawQuery).toLowerCase();
  const out: Suggestion[] = [];
  const seen = new Set<string>();
  const push = (text: string, fromHistory: boolean) => {
    const key = text.toLowerCase();
    if (key.length === 0 || seen.has(key) || out.length >= 10) return;
    seen.add(key);
    out.push({ text, fromHistory });
  };

  if (query.length === 0) {
    for (const h of history) push(h, true);
    for (const t of trendingSuggestions) push(t, false);
    return out;
  }

  for (const h of history) {
    if (h.toLowerCase().startsWith(query)) push(h, true);
  }

  const matches = (candidate: string) => {
    const c = candidate.toLowerCase();
    return c.startsWith(query) || c.includes(` ${query}`) || c.includes(query);
  };

  // doc titles first, then keywords, then trending
  for (const doc of index) {
    const title = doc.title.split(" — ")[0].toLowerCase();
    if (matches(title)) push(title, false);
  }
  const kwSorted = [...new Set(index.flatMap((d) => d.keywords))].sort((a, b) => a.length - b.length);
  for (const kw of kwSorted) {
    if (matches(kw)) push(kw, false);
  }
  for (const t of trendingSuggestions) {
    if (matches(t)) push(t, false);
  }

  return out;
}

/* -------------------------- Instant answers -------------------------- */

const PI_DIGITS =
  "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647";

const meanings: { word: string; meaning: string; more: string; topicId: Topic["id"] }[] = [
  {
    word: "love",
    meaning: "In tennis, “love” means zero. The score love-thirty means zero to thirty.",
    more: "The most likely origin: “l'oeuf”, French for egg — because a zero looks like an egg.",
    topicId: "tennis",
  },
  {
    word: "deuce",
    meaning: "Deuce is tied at 40–40. From there, a player must win two consecutive points: one for advantage, one for the game.",
    more: "Cathy's take: deuce is the best score in sport — pure pressure, zero randomness.",
    topicId: "tennis",
  },
  {
    word: "ace",
    meaning: "An ace is a serve that lands in and is never touched by the receiver. Point over before it began.",
    more: "Cathy's serve is “a work in progress”, which is tennis code for: she drills it most.",
    topicId: "tennis",
  },
];

function safeEval(expr: string): string | null {
  if (!/^[0-9+\-*/(). %^]+$/.test(expr)) return null;
  if (!/\d/.test(expr) || !/[+\-*/^]/.test(expr)) return null;
  try {
    const normalized = expr.replace(/\^/g, "**").replace(/%/g, "/100");
    const result = Function(`"use strict"; return (${normalized});`)() as number;
    if (typeof result !== "number" || !Number.isFinite(result)) return null;
    const rounded = Math.round(result * 1e10) / 1e10;
    return String(rounded);
  } catch {
    return null;
  }
}

export function detectInstantAnswer(rawQuery: string): InstantAnswer | null {
  const q = normalizeQuery(rawQuery).toLowerCase().replace(/[?!.,]+$/g, "");

  if (/^(pi|π|value of pi|digits of pi|what is pi|3\.14\d*)$/.test(q) || q === "3.14159") {
    return { type: "pi" };
  }
  if (/\beuler\b/.test(q)) return { type: "euler" };
  if (/\b1729\b|taxicab/.test(q)) return { type: "taxicab" };
  if (/^(hello,? world|hello world!?)$/.test(q)) return { type: "helloWorld" };
  if (/^what time is it|^what('| i)?s the time$|^time$/.test(q)) {
    return {
      type: "time",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
  }
  if (/weather/.test(q)) return { type: "weather" };
  if (/^google$|^google it$|^search google$|^googl$|^google search$/.test(q)) {
    return { type: "googleRedirect" };
  }

  const calc = safeEval(rawQuery.trim());
  if (calc !== null) {
    return { type: "calc", expression: normalizeQuery(rawQuery.trim()), result: calc };
  }

  for (const m of meanings) {
    if (q === m.word || q === `what does ${m.word} mean` || q === `define ${m.word}`) {
      return { ...m, type: "meaning" };
    }
  }

  return null;
}

/* -------------------------- Snippet helpers -------------------------- */

export interface HighlightSegment {
  text: string;
  hit: boolean;
}

/** Split text into segments, marking query-word matches for bolding (Google-style). */
export function highlightSegments(text: string, query: string): HighlightSegment[] {
  const words = tokenize(query).filter((w) => w.length >= 2);
  if (words.length === 0) return [{ text, hit: false }];

  const pattern = new RegExp(
    `(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi"
  );
  const parts = text.split(pattern);
  return parts
    .filter((p) => p.length > 0)
    .map((p) => ({ text: p, hit: words.includes(p.toLowerCase()) }));
}

export { PI_DIGITS };
