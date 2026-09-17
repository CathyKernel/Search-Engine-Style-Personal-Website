# Cathy Li Search — a search engine for exactly one person

A Google-styled personal webpage. The classic search homepage, the logo rendered
in the classic blue-red-yellow-blue-green-red sequence, autocomplete, typo-tolerant
ranking, instant answers, a knowledge panel, "People also ask", related searches —
except every result is about **Cathy Li** (math, programming, painting, tennis, music).

Built with **Next.js 16 + TypeScript + Tailwind CSS 4**. 100% client-side:
no backend, no database, no API calls. The whole search engine ships with the page.

---

## Run it locally

```bash
# 1. install dependencies (Node 20+ or Bun)
npm install        # or: bun install

# 2. start the dev server
npm run dev        # or: bun run dev

# 3. open http://localhost:3000
```

## Project structure

```
src/
├── app/
│   ├── page.tsx              # view state machine + URL sync (?q= ?topic= ?about=1 #anchor)
│   ├── layout.tsx            # fonts (Poppins ≈ Product Sans + Roboto), metadata
│   ├── globals.css           # Google palette tokens, logo bounce, dark mode
│   └── icon.svg              # favicon: "C" in Google colors
├── components/google/
│   ├── logo.tsx              # "Cathy Li" logotype with Google letter colors
│   ├── monogram.tsx          # gradient CL avatar
│   ├── search-bar.tsx        # autocomplete, keyboard nav, search history (localStorage)
│   ├── home-view.tsx         # centered homepage + topic quick links
│   ├── results-view.tsx      # tabs, results, People also ask, related searches
│   ├── instant-answer.tsx    # calculator, π, Euler, 1729, dictionary…
│   ├── knowledge-panel.tsx   # right-hand panel with stats & related people
│   ├── topic-view.tsx        # full page per topic (hero, stats, sections, FAQ)
│   ├── about-view.tsx        # story, timeline, contact, how-it-works
│   ├── artwork.tsx           # generative SVG "watercolors" for the gallery
│   └── footer.tsx            # Google-style footer + dark mode toggle
├── data/
│   ├── profile.ts            # identity, timeline, FAQs, socials — EDIT ME
│   └── topics.ts             # the 5 topics with all content — EDIT ME
└── lib/
    └── search-engine.ts      # the engine: index, scoring, fuzzy, autocomplete
```

## Make it yours

All content lives in `src/data/profile.ts` and `src/data/topics.ts`.
Edit those two files — results, suggestions, knowledge panel, topic pages
and FAQs all regenerate from them. No other changes needed.

## Deploy it (free)

1. Push this folder to a GitHub repository.
2. Go to <https://vercel.com> (or <https://netlify.com>), sign in with GitHub,
   and **Import** the repository. Framework preset: **Next.js**. Click Deploy —
   the free tier is more than enough (the site is fully static/client-side).
3. Vercel gives you a free URL like `your-project.vercel.app` — that's it,
   the site is live. No domain, no DNS, no cost.
4. Optional polish already in the code:
   - searchable URLs (`/?q=math`, `/?topic=tennis`) work out of the box;
   - `public/robots.txt` invites real crawlers to index the site.

## Feature checklist

- [x] Google-style homepage with "Cathy Li" in Google's font style & letter colors
- [x] Search that jumps to every part of Cathy: math, programming, painting, tennis, music
- [x] Autocomplete with trending + search history, full keyboard navigation
- [x] Typo tolerance (Levenshtein) + "Did you mean…" suggestions
- [x] Instant answers: live calculator, 120 digits of π, Euler's identity, 1729, dictionary cards
- [x] Tabs, sitelinks, People also ask, related searches, Google-style pagination joke
- [x] Knowledge panel with stats and "People also search for"
- [x] Full topic pages, generative art gallery, about page with timeline
- [x] Light/dark mode, fully responsive (mobile → desktop), accessible (ARIA, keyboard)
- [x] Shareable URLs and working back/forward buttons
- [x] Entire interface and content in English
