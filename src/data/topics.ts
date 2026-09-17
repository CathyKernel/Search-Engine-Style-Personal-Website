import type { Faq, Section, Stat } from "./profile";

export interface Project {
  name: string;
  description: string;
  tech: string[];
}

export interface Artwork {
  id: string;
  title: string;
  year: string;
  medium: string;
  description: string;
  keywords: string[];
  palette: string[];
  pattern: "waves" | "blooms" | "spiral" | "primes" | "court" | "nocturne";
}

export type TopicColor = "gblue" | "gred" | "gyellow" | "ggreen";

export interface Topic {
  id: "math" | "programming" | "painting" | "tennis" | "music";
  name: string;
  tagline: string;
  color: TopicColor;
  url: string;
  snippet: string;
  hero: string;
  keywords: string[];
  sections: Section[];
  stats: Stat[];
  projects?: Project[];
  artworks?: Artwork[];
  faqs: Faq[];
  sitelinks: { label: string; anchor: string }[];
}

export const topics: Topic[] = [
  {
    id: "math",
    name: "Mathematics",
    tagline: "Where numbers tell stories",
    color: "gblue",
    url: "cathyli.com › math",
    snippet:
      "Cathy Li's mathematical journey — competition math, number theory, geometry, and why e^(iπ) + 1 = 0 can make a person emotional. Includes favorite theorems, the number 1729, and roughly 120 digits of π.",
    hero: "Math was my first language. Long before I wrote code or held a brush, I was the kid asking why the multiplication table rhymes with itself and why zero, of all things, is a hero.",
    keywords: [
      "math", "mathematics", "maths", "number", "numbers", "theory", "number theory",
      "geometry", "proof", "theorem", "theorems", "euler", "pi", "π", "prime", "primes",
      "algebra", "calculus", "combinatorics", "competition", "olympiad", "amc", "aime",
      "1729", "taxicab", "mathlete", "equation", "formula", "infinite", "infinity",
      "fractal", "golden ratio", "fibonacci", "induction", "logic", "puzzle", "puzzles",
    ],
    sections: [
      {
        heading: "It started with a puzzle, not a textbook",
        paragraphs: [
          "In elementary school a teacher handed me a 3×3 magic square — fill the grid so every row, column, and diagonal adds to 15. Everyone else finished in five minutes. I spent the whole afternoon asking follow-up questions: Does it have to be 15? What about a 4×4? Do magic squares ever run out? That afternoon never really ended; I just got better tools.",
          "Since then it has been math circles on weekends, competition seasons (AMC and AIME, with a pin on the board for the day I qualify for USAMO), and a whiteboard in my room that guests politely pretend is normal. What I love most is the exact moment a problem stops being intimidating and starts being funny — math is at its best when it is quietly ridiculous.",
        ],
      },
      {
        heading: "My favorite corners of mathematics",
        paragraphs: [
          "Number theory is my true home. Primes are the atoms of arithmetic — irreducible, mysterious, and stubbornly unpatterned in all the ways that matter. Whenever a formula looks too good to be true, I test it against the primes, and they keep me honest.",
          "Geometry is where math becomes visible. Euclid meets origami: a crease is a proof you can hold. I keep a paper crane on my desk that folds from a single square with no cuts, and I consider it a collaboration between me and about 2,300 years of geometry.",
          "Combinatorics is the art of counting without counting — the kind of cleverness that feels like cheating but is airtight. And calculus is the subject where I learned that infinity is not a number, it is a direction, which is also the best life advice I have ever received from a subject.",
        ],
      },
      {
        heading: "Why I love it",
        paragraphs: [
          "People describe math as cold. I think it is the opposite: it is the most emotional subject there is, once you get past the notation. A great proof feels like a punchline. A surprising identity feels like a plot twist. And the moment a hard problem finally cracks is a feeling I have never found anywhere else — not at an easel, not at a piano, not even on match point.",
          "Math also taught me how to be wrong productively. A wrong proof tells you exactly where your understanding died, which is more honesty than most things in life offer. I bring that standard to everything else I do — the code, the canvas, the court, and the keyboard.",
        ],
      },
    ],
    stats: [
      { label: "Favorite theorem", value: "Euler's identity" },
      { label: "Favorite number", value: "1729" },
      { label: "Digits of π", value: "120" },
      { label: "Competitions", value: "AMC · AIME" },
    ],
    faqs: [
      {
        question: "Why is Euler's identity your favorite theorem?",
        answer:
          "Because it is a crossover episode: e, i, π, 1, and 0 — the five most important characters in mathematics — meet in a single line with nothing left over. e^(iπ) + 1 = 0. First time I saw a full derivation, I wrote it on the whiteboard and just stared at it for a while.",
      },
      {
        question: "What is the story with 1729?",
        answer:
          "The taxicab number. Hardy visited Ramanujan and remarked that his taxi's number, 1729, seemed dull. Ramanujan replied instantly that it is the smallest number expressible as the sum of two cubes in two different ways: 1³ + 12³ = 9³ + 10³ = 1729. Any number that can defend itself that elegantly deserves a fan club.",
      },
      {
        question: "How many digits of π can you actually recite?",
        answer:
          "120, verified twice on a bad-mood day because the stakes were personal. The trick is chunking them into phone-number-sized groups and setting them to a rhythm — π is irrational, but your memory does not have to be.",
      },
    ],
    sitelinks: [
      { label: "Euler's identity", anchor: "faq" },
      { label: "The 1729 story", anchor: "faq" },
      { label: "Competitions", anchor: "journey" },
      { label: "Digits of π", anchor: "stats" },
    ],
  },
  {
    id: "programming",
    name: "Programming",
    tagline: "Building things that think",
    color: "gred",
    url: "cathyli.com › programming",
    snippet:
      "Cathy Li writes software for the same reason she solves equations — to watch structure come alive. Projects, languages (Python, TypeScript, C++), and the story of the turtle that started it all.",
    hero: "Programming is the moment math grows hands. A proof convinces you something is true; a program lets you watch it happen, a thousand times a second, in colors you chose yourself.",
    keywords: [
      "programming", "code", "coding", "software", "developer", "engineer", "engineering",
      "computer science", "cs", "python", "javascript", "typescript", "react", "next",
      "nextjs", "c++", "rust", "html", "css", "algorithm", "algorithms", "data structures",
      "github", "git", "projects", "app", "website", "web", "developer tools", "debugging",
      "terminal", "turtle", "hello world", "open source", "api", "database", "compiler",
    ],
    sections: [
      {
        heading: "It started with a turtle",
        paragraphs: [
          "My first program was ten lines of Python that told a turtle to draw a square. Then a spiral of squares. Then a spirograph so dense it looked like a doily having a panic attack. The magic was not the drawing — it was the loop. I had taught the computer to be patient on my behalf, and I have been trying to repay that debt ever since.",
          "From there: Python scripts to check my math homework (verifying, never solving — that was the deal with myself), small games, then websites, then this very search engine. Each project started as a question I could not stop thinking about, which remains my only criterion for starting a new one.",
        ],
      },
      {
        heading: "Languages and tools",
        paragraphs: [
          "Python is my first language and still my sketchbook — fast to think in, great for math, machine learning experiments, and anything that needs to exist by tonight. TypeScript is where I build seriously: types are tests you get for free, and this entire site is Next.js, TypeScript, and Tailwind.",
          "C++ is my competitive programming suit — strict, fast, and humbling in exactly the way competition math is. Rust sits on my reading list whispering that I will thank it later. And everywhere in between: Git for archaeology, the terminal as a second home, and a debugger I have a complicated but loving relationship with.",
        ],
      },
      {
        heading: "How I work",
        paragraphs: [
          "Read the docs first, always — an hour of reading saves an evening of debugging, and half the time the answer was quietly sitting in paragraph three. Name things honestly: a variable called temp is a variable you will apologize to later. Write the comment your future self will need at 2 a.m., because you will be that future self.",
          "I believe small, boring, working code beats large, clever, aspirational code. Ship the version that runs, then make it elegant. The projects below all follow the same rule: each one started as curiosity, survived contact with reality, and ended up teaching me something I did not expect.",
        ],
      },
    ],
    stats: [
      { label: "First language", value: "Python" },
      { label: "Daily drivers", value: "TypeScript · Python" },
      { label: "Editor", value: "VS Code" },
      { label: "This site", value: "Next.js + Tailwind" },
    ],
    projects: [
      {
        name: "Cathy Li Search",
        description:
          "The site you are using right now — a search engine that indexes one person. Client-side ranking, fuzzy matching with typo tolerance, autocomplete, instant answers, and response times measured in thousandths of a second. No backend, no database: the whole index ships with the page.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        name: "Fractal Explorer",
        description:
          "A zoomable Mandelbrot and Julia set explorer with a color palette editor. Built to answer a simple question: how deep can my laptop go before the math melts the fan? (Answer: about 10¹³ zoom, with a bus full of angry electrons.)",
        tech: ["Python", "NumPy", "WebAssembly"],
      },
      {
        name: "Court Vision",
        description:
          "A tennis score tracker that computes live win probability from point-by-point data. Kept me sane during matches I was losing — the probability of a comeback is never zero, and now I can prove it while sulking.",
        tech: ["React", "TypeScript", "recharts"],
      },
      {
        name: "Golden Sketchbook",
        description:
          "Generative art tool that turns math into watercolor-style paintings — golden spirals, prime scatterplots, L-systems. Half my painting gallery was 'painted' by an algorithm I raised from a puppy.",
        tech: ["JavaScript", "Canvas API", "SVG"],
      },
    ],
    faqs: [
      {
        question: "Why did you build a search engine as a personal site?",
        answer:
          "Portfolios are told; search engines are asked. I wanted visitors to follow their own curiosity instead of scrolling my opinions in order. Also, building autocomplete and ranking by hand is the most fun I have had with a keyboard outside of a Chopin nocturne.",
      },
      {
        question: "What is your favorite programming language?",
        answer:
          "For thinking: Python. For building: TypeScript. For suffering productively: C++. Each one rewires how you see problems, and the collection matters more than the favorite.",
      },
      {
        question: "Do you contribute to open source?",
        answer:
          "Small PRs so far — documentation fixes and a couple of bug reports that taught me more than the code itself. My ambition for this year is a first real feature contribution to a project I use daily.",
      },
    ],
    sitelinks: [
      { label: "Projects", anchor: "projects" },
      { label: "This very site", anchor: "projects" },
      { label: "Languages & tools", anchor: "languages" },
      { label: "First program", anchor: "journey" },
    ],
  },
  {
    id: "painting",
    name: "Painting",
    tagline: "Color outside the lines (on purpose)",
    color: "gyellow",
    url: "cathyli.com › painting",
    snippet:
      "Watercolor, color theory, and the gallery of Cathy Li — from impressionist skies to algorithm-assisted blooms. Includes a browsable gallery of six works and the story of eleven ruined sheets of paper.",
    hero: "Painting is the hobby that taught me control is overrated. Watercolor does not obey; it negotiates. After years of proofs and compile errors, I needed a medium that answered back.",
    keywords: [
      "painting", "paint", "painter", "art", "artist", "watercolor", "watercolour", "aquarelle",
      "drawing", "draw", "sketch", "sketchbook", "gallery", "canvas", "brush", "easel",
      "impressionism", "impressionist", "color", "colour", "palette", "pigment", "creative",
      "kandinsky", "monet", "van gogh", "ghibli", "studio", "illustration", "ink", "pastel",
      "landscape", "portrait", "abstract", "artwork", "artworks", "museum", "exhibition",
    ],
    sections: [
      {
        heading: "Watercolor beginnings",
        paragraphs: [
          "My grandmother gave me a battered tin of watercolors and one piece of advice: let the water do the work. I ignored this advice for approximately eleven ruined sheets of paper, trying to control every gradient like I control a proof — step by step, no surprises. Then one afternoon I overloaded a brush, tilted the paper, and watched two pigments bleed into each other like they had somewhere to be. That accidental edge was better than anything I had planned. I have been chasing that feeling ever since.",
          "These days I paint mostly landscapes and abstract studies. I keep a travel sketchbook that is 40% paintings and 60% coffee stains, and I consider both halves authentic. The rule is that everything is done from observation, quickly, before the light changes or the ice cream melts.",
        ],
      },
      {
        heading: "Style and influences",
        paragraphs: [
          "Impressionism taught me that light is a subject, not a condition — Monet painted the same haystack repeatedly because the haystack kept changing, which is also how I feel about revisiting my own code. Studio Ghibli's skyscapes taught me that clouds have opinions. Kandinsky taught me that a painting can be a theorem: circles, lines, and colors arranged with the inevitability of a proof.",
          "Lately I have been exploring generative art — feeding golden spirals, prime-number scatterplots, and L-system growth algorithms to a script, then hand-painting over the printed results in watercolor. The gallery below is half of that experiment. Purists say it is cheating; I say the algorithm and I are simply a very small atelier with unusual staffing.",
        ],
      },
      {
        heading: "Process",
        paragraphs: [
          "Every painting goes through four honest stages: a pencil sketch that is confident and wrong, an underpainting that looks like a mistake, a middle phase I call the ugly teenage years, and a final pass where I remove everything that was trying too hard. A painting is finished when removing one more mark would make it worse — the same stopping rule I use for proofs and code reviews.",
          "My palette is deliberately limited: seven pigments that mix into nearly everything. Constraints are not the enemy of creativity; they are the frame of the canvas. The same theorem, different medium.",
        ],
      },
    ],
    stats: [
      { label: "Primary medium", value: "Watercolor" },
      { label: "Pigments on palette", value: "7" },
      { label: "Ruined sheets (so far)", value: "11" },
      { label: "Sketchbooks filled", value: "9" },
    ],
    artworks: [
      {
        id: "golden-garden",
        title: "Golden Ratio Garden",
        year: "2025",
        medium: "Algorithm + watercolor",
        description:
          "A phyllotaxis spiral of 500 seeds placed by the golden angle, each hand-tinted. Mathematically, no two seeds ever align. Emotionally, they absolutely do.",
        keywords: ["golden ratio", "spiral", "fibonacci", "garden", "math art"],
        palette: ["#f9a825", "#7cb342", "#2e7d32", "#c0ca33"],
        pattern: "spiral",
      },
      {
        id: "clair-de-lune",
        title: "Clair de Lune",
        year: "2024",
        medium: "Watercolor on cold press",
        description:
          "Painted while listening to Debussy on repeat, which makes it technically a collaboration. The moon is three layers of masking fluid and one act of courage.",
        keywords: ["moon", "night", "debussy", "blue", "nocturne", "music"],
        palette: ["#1a237e", "#3949ab", "#90caf9", "#ffe082"],
        pattern: "nocturne",
      },
      {
        id: "center-court",
        title: "Sunrise Over Center Court",
        year: "2025",
        medium: "Watercolor + ink",
        description:
          "An empty tennis court at 6 a.m., painted from memory after a morning drill session. The net posts are the only perfectly straight lines I have ever drawn.",
        keywords: ["tennis", "court", "sunrise", "morning", "orange"],
        palette: ["#ef6c00", "#ff9e80", "#ffccbc", "#263238"],
        pattern: "court",
      },
      {
        id: "prime-scatter",
        title: "Prime Numbers in Watercolor",
        year: "2024",
        medium: "Algorithm + watercolor",
        description:
          "The integers 1 to 400 plotted on an Ulam spiral; primes bloom in pigment, composites stay quiet. The patterns that emerge should not exist, and that is the whole point.",
        keywords: ["prime", "ulam", "numbers", "math art", "scatter"],
        palette: ["#5e35b1", "#ec407a", "#26c6da", "#fff3e0"],
        pattern: "primes",
      },
      {
        id: "blooms",
        title: "Watercolor Blooms",
        year: "2023",
        medium: "Wet-on-wet watercolor",
        description:
          "The first painting where I let the water win on purpose. Painted wet-on-wet with no sketch, which for a planner like me was essentially an extreme sport.",
        keywords: ["bloom", "flowers", "pink", "wet on wet", "abstract"],
        palette: ["#ad1457", "#f06292", "#f8bbd0", "#7e57c2"],
        pattern: "blooms",
      },
      {
        id: "frequency-study",
        title: "Frequency Study No. 3",
        year: "2025",
        medium: "Ink + watercolor wash",
        description:
          "An attempt to paint a C major chord: twelve sine waves in teal ink, one amplitude per note. Musicians say it looks the way the chord sounds, which I am taking as a review.",
        keywords: ["frequency", "sound", "wave", "music", "teal", "sine"],
        palette: ["#00695c", "#26a69a", "#80cbc4", "#004d40"],
        pattern: "waves",
      },
    ],
    faqs: [
      {
        question: "Why watercolor instead of oils or acrylics?",
        answer:
          "Because watercolor punishes hesitation and rewards letting go — it is the exact opposite of my mathematical instincts, and I need the counterweight. Also, the supplies fit in a jacket pocket, and a hobby you can carry is a hobby that survives a busy semester.",
      },
      {
        question: "Do you sell prints or take commissions?",
        answer:
          "Occasionally, mostly to friends who supported the eleven ruined sheets of paper era. If a piece in the gallery catches your eye, email me — commissions are open in the summer when the schedule loosens.",
      },
      {
        question: "Is the generative art really 'yours'?",
        answer:
          "The algorithm composes; I curate, print, and paint over it. I sign the parts I did. In my defense, photographers were accused of the same thing once, and history has mostly come around.",
      },
    ],
    sitelinks: [
      { label: "Gallery", anchor: "gallery" },
      { label: "Influences", anchor: "influences" },
      { label: "Process", anchor: "process" },
      { label: "Golden Ratio Garden", anchor: "gallery" },
    ],
  },
  {
    id: "tennis",
    name: "Tennis",
    tagline: "Problem solving at 90 mph",
    color: "ggreen",
    url: "cathyli.com › tennis",
    snippet:
      "Cathy Li's tennis life — an aggressive baseline game, a beloved one-handed backhand, Wimbledon dreams, and an explanation of why 'love' means zero. Physics, geometry, and a racket.",
    hero: "Tennis is chess played with geometry at highway speed. Every point is a physics problem with a deadline measured in milliseconds — and the net keeps score of your honesty.",
    keywords: [
      "tennis", "sport", "sports", "racket", "racquet", "forehand", "backhand", "serve",
      "serving", "ace", "volley", "baseline", "topspin", "slice", "deuce", "love",
      "wimbledon", "federer", "nadal", "djokovic", "alcaraz", "gauff", "grand slam",
      "court", "clay", "grass", "hard court", "match", "set", "game", "score", "scoring",
      "player", "athlete", "athletic", "utr", "tournament", "drills", "footwork", "sweet spot",
    ],
    sections: [
      {
        heading: "How it started",
        paragraphs: [
          "Age eight, summer camp, a plastic racket with a cartoon frog on it. The coach fed me soft forehands, and I hit precisely one ball over the fence — a clean mishit that should have discouraged me. Instead I remember thinking: I would like to do that on purpose. Two summers later I had a real racket, a group lesson slot on Saturdays, and a family calendar that slowly reorganized itself around court availability.",
          "Tennis hooked me for the same reason math did: it is honest. The ball does not care about your excuses; the score does not remember your good intentions. You get the point or you do not, and then — this is the beautiful part — the next point starts from zero. Nothing in adult life is as forgiving as a tennis score.",
        ],
      },
      {
        heading: "Playing style",
        paragraphs: [
          "I am an aggressive baseline player. My forehand is the weapon: heavy topspin, aimed to push opponents deep and open the court. My one-handed backhand is technically a vanity project — every coach I have ever had suggested switching to two hands for consistency, and I have politely declined for the eleventh consecutive year, because a one-hander down the line is the prettiest shot in tennis and beauty matters.",
          "My serve is a work in progress, which is tennis code for 'the thing I drill most.' My favorite tactical pattern is the classic serve-plus-one: wide serve, then forehand into the open space. It is geometry wearing sneakers. When it works, opponents run the hypotenuse and I own the right angle.",
        ],
      },
      {
        heading: "The grind and the joy",
        paragraphs: [
          "A normal week: two technical sessions, one match-play session, one fitness block that my legs file formal complaints about, and Sunday hitting with my dad, who taught me the game and still celebrates my winners louder than I do. Between drills I track my stats in Court Vision, the app I built myself — because obviously I was going to combine the hobbies.",
          "From the stands, I study the greats: Federer's footwork (a masterclass in arriving early and looking bored about it), Nadal's topspin (applied physics with religious intensity), and Alcaraz's joy — proof that you can be deadly and delighted at the same time, which is the whole philosophy in one drop shot.",
        ],
      },
    ],
    stats: [
      { label: "Playing style", value: "Aggressive baseline" },
      { label: "Best shot", value: "Inside-out forehand" },
      { label: "Proudest shot", value: "One-handed backhand" },
      { label: "Favorite surface", value: "Grass" },
      { label: "Dream final", value: "Wimbledon, Centre Court" },
    ],
    faqs: [
      {
        question: "Why does 'love' mean zero in tennis?",
        answer:
          "The leading theory is that it comes from 'l'oeuf' — French for egg, because a zero looks like an egg. Tennis is a sport where love means nothing, deuce means two, and a let means neither of you meant it. I have made peace with all of this.",
      },
      {
        question: "One-handed or two-handed backhand?",
        answer:
          "One-handed, forever. It is less consistent, harder to time, and objectively the worse choice at my level — and it is also elegant, one-fluid-motion proof that some things are worth doing the hard way. Every coach disagrees with me. Every coach is welcome to their opinion.",
      },
      {
        question: "Do you play competitively?",
        answer:
          "Yes — local tournaments and league matches, with a UTR rating I check more often than my grades. Current goals: a bigger first-serve percentage, and winning a three-setter without first convincing myself I have already lost.",
      },
    ],
    sitelinks: [
      { label: "Playing style", anchor: "style" },
      { label: "Why 'love' is zero", anchor: "faq" },
      { label: "The grind", anchor: "grind" },
      { label: "Wimbledon dreams", anchor: "stats" },
    ],
  },
  {
    id: "music",
    name: "Music",
    tagline: "The mathematics of emotion",
    color: "gblue",
    url: "cathyli.com › music",
    snippet:
      "Cathy Li at the piano — classical repertoire, jazz standards, the practice philosophy of slow progress, and why a metronome at 60 bpm is a form of self-compassion.",
    hero: "Music is what mathematics sounds like when you let it feel things. Twelve notes, a handful of rules, and somehow an infinite capacity to say what words keep missing.",
    keywords: [
      "music", "musician", "piano", "pianist", "violin", "orchestra", "instrument",
      "classical", "jazz", "pop", "chopin", "nocturne", "debussy", "clair de lune",
      "bach", "mozart", "beethoven", "einaudi", "gershwin", "rachmaninoff", "satie",
      "song", "songs", "melody", "harmony", "chord", "chords", "scale", "scales", "arpeggio",
      "practice", "metronome", "tempo", "rhythm", "theory", "compose", "composition",
      "concert", "recital", "performance", "keys", "keyboard", "sonata", "etude",
    ],
    sections: [
      {
        heading: "Piano, since forever",
        paragraphs: [
          "I started piano at six on a slightly out-of-tune upright with a middle C that doubled as a percussion instrument. My first teacher had a rule: learn the notes correctly, then you may play it your way. Twenty minutes of discipline earned two minutes of freedom, and I chased those two minutes like a jackpot. Somewhere along the line the ratio inverted, and now the discipline itself is the pleasure.",
          "I played violin in my school orchestra for four years, which taught me how to be one voice inside a bigger sentence — a completely different skill from solo piano's glorious solitude. These days it is mostly piano, with occasional four-hands sessions with a friend that always begin as sight-reading practice and always end in laughter and accusations.",
        ],
      },
      {
        heading: "What I play",
        paragraphs: [
          "My classical core is Chopin. The nocturnes in particular — Op. 9 No. 2 is the piece I play when the day needs a soft landing, and Op. 48 No. 1 is the one I play when it needs drama instead. Debussy's Clair de Lune lives permanently in my fingers; Satie's Gymnopédies live permanently in my right pedal technique. Rhythmically, nothing has taught me more than Bach — his fugues are honesty set to a metronome.",
          "On the other side of my brain: jazz standards and pop arrangements. Autumn Leaves with shell voicings, a shamelessly ornamented version of a certain famous pop ballad, and an ongoing (losing) negotiation with improvisation. Jazz is the hobby inside the hobby — the one place I practice being spontaneous on purpose, which is exactly as contradictory as it sounds.",
        ],
      },
      {
        heading: "Practice philosophy",
        paragraphs: [
          "Slow practice is fast progress. If I cannot play a passage at 60 bpm with a metronome and a flat expression, I have no business playing it at tempo with feelings. The metronome is not a critic; it is the most patient teacher I have ever had — it will wait forever, and it has never once lied to me.",
          "My routine: twenty minutes of technique (scales in the key of whatever I am learning, because context is memory), forty minutes of repertoire (new material at half speed, old material at full speed for the joy of it), and ten minutes of pure play, which is the whole reason any of the other fifty minutes exist. Music theory I study as a mathematician: chords are vectors, modulations are proofs, and a cadence is a theorem landing exactly where it promised.",
        ],
      },
    ],
    stats: [
      { label: "Main instrument", value: "Piano" },
      { label: "Started at", value: "Age 6" },
      { label: "Favorite composer", value: "Chopin" },
      { label: "Go-to piece", value: "Nocturne Op. 9 No. 2" },
      { label: "Practice tempo", value: "60 bpm, always" },
    ],
    faqs: [
      {
        question: "What is the first piece you ever memorized?",
        answer:
          "A arrangement of 'Ode to Joy' with the left hand doing almost nothing. I performed it at a recital with the confidence of someone who did not yet know how much harder piano gets. I consider that child a personal hero.",
      },
      {
        question: "Classical or jazz?",
        answer:
          "Yes. Classical for the architecture, jazz for the conversation. The metronome made me a classical player; the shell voicings are slowly making me a jazz one. Both are welcome at my keyboard, sometimes within the same hour.",
      },
      {
        question: "Do you play any other instruments?",
        answer:
          "Violin from school orchestra — comfortably third-desk level and proud of it — plus enough guitar to accompany a campfire, and a melodica that everyone regrets buying me.",
      },
    ],
    sitelinks: [
      { label: "Repertoire", anchor: "repertoire" },
      { label: "Practice routine", anchor: "practice" },
      { label: "Why Chopin", anchor: "faq" },
      { label: "Concert stories", anchor: "journey" },
    ],
  },
];
