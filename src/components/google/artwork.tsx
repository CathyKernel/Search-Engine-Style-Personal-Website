"use client";

import { useId, type ReactElement } from "react";
import type { Artwork } from "@/data/topics";
import { cn } from "@/lib/utils";

/**
 * Generative "artwork" cards for the painting gallery.
 * Each piece is an inline SVG rendered deterministically from the
 * artwork's palette + pattern, so the gallery looks curated without
 * shipping a single image.
 */

function seeded(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 10000) / 10000;
  };
}

function Pattern({ artwork }: { artwork: Artwork }) {
  const uid = useId().replace(/[:]/g, "");
  const { palette, pattern } = artwork;
  const rand = seeded(artwork.id);

  switch (pattern) {
    case "spiral": {
      // Phyllotaxis: 500 seeds placed by the golden angle
      const seeds = Array.from({ length: 320 }, (_, i) => {
        const angle = i * 2.399963;
        const r = 8 * Math.sqrt(i);
        const x = 100 + r * Math.cos(angle);
        const y = 100 + r * Math.sin(angle);
        const c = palette[i % palette.length];
        const size = 1.4 + (i / 320) * 2.4;
        return <circle key={i} cx={x} cy={y} r={size} fill={c} opacity={0.9} />;
      });
      return <g>{seeds}</g>;
    }
    case "primes": {
      // Ulam spiral, 1..400
      const cells: ReactElement[] = [];
      let x = 100;
      let y = 100;
      let dx = 1;
      let dy = 0;
      let step = 1;
      let n = 1;
      outer: for (let leg = 0; leg < 40; leg++) {
        for (let s = 0; s < step; s++) {
          if (n > 400) break outer;
          let prime = n > 1;
          for (let d = 2; d * d <= n; d++) if (n % d === 0) prime = false;
          if (prime) {
            cells.push(
              <circle
                key={n}
                cx={x}
                cy={y}
                r={2.6}
                fill={palette[n % palette.length]}
                opacity={0.95}
              />
            );
          } else {
            cells.push(<circle key={n} cx={x} cy={y} r={1.1} fill={palette[3]} opacity={0.25} />);
          }
          x += dx * 7.5;
          y += dy * 7.5;
          n++;
        }
        [dx, dy] = [-dy, dx];
        if (leg % 2 === 1) step++;
      }
      return <g>{cells}</g>;
    }
    case "blooms": {
      const blobs = Array.from({ length: 9 }, (_, i) => {
        const cx = 30 + rand() * 140;
        const cy = 30 + rand() * 140;
        const r = 16 + rand() * 26;
        const c = palette[i % palette.length];
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill={c} opacity={0.35} />
            <circle cx={cx + r * 0.3} cy={cy - r * 0.2} r={r * 0.55} fill={c} opacity={0.3} />
            <circle cx={cx - r * 0.25} cy={cy + r * 0.25} r={r * 0.4} fill={c} opacity={0.25} />
          </g>
        );
      });
      return <g>{blobs}</g>;
    }
    case "waves": {
      const paths = Array.from({ length: 12 }, (_, i) => {
        const y0 = 30 + i * 12;
        const amp = 6 + (i % 4) * 5;
        const d = `M 10 ${y0} C 40 ${y0 - amp}, 70 ${y0 + amp}, 100 ${y0} S 160 ${y0 - amp}, 190 ${y0}`;
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={palette[i % palette.length]}
            strokeWidth={2.2}
            opacity={0.75}
            strokeLinecap="round"
          />
        );
      });
      return <g>{paths}</g>;
    }
    case "court": {
      const [net, line, sun, sky] = palette;
      return (
        <g>
          <rect x="10" y="10" width="180" height="180" fill={sky} opacity={0.25} rx="4" />
          <circle cx="52" cy="46" r="20" fill={sun} opacity={0.85} />
          <rect x="30" y="90" width="140" height="90" fill={sun} opacity={0.18} />
          <rect x="30" y="90" width="140" height="90" fill="none" stroke={line} strokeWidth="2" />
          <line x1="30" y1="135" x2="170" y2="135" stroke={line} strokeWidth="2" />
          <line x1="100" y1="90" x2="100" y2="180" stroke={net} strokeWidth="3" />
          {Array.from({ length: 13 }, (_, i) => (
            <line
              key={i}
              x1={100}
              y1={90 + i * 7.5}
              x2={100}
              y2={94 + i * 7.5}
              stroke={net}
              strokeWidth="1"
              opacity={0.6}
            />
          ))}
        </g>
      );
    }
    case "nocturne": {
      const [deep, mid, light, moon] = palette;
      return (
        <g>
          <rect x="10" y="10" width="180" height="180" fill={deep} rx="6" />
          <circle cx="100" cy="92" r="40" fill={mid} opacity={0.35} />
          <circle cx="100" cy="92" r="30" fill={light} opacity={0.25} />
          <circle cx="100" cy="92" r="22" fill={moon} opacity={0.95} />
          {Array.from({ length: 16 }, (_, i) => (
            <circle
              key={i}
              cx={14 + rand() * 172}
              cy={14 + rand() * 70}
              r={0.8 + rand() * 1.2}
              fill="#ffffff"
              opacity={0.5 + rand() * 0.5}
            />
          ))}
          <path
            d="M 10 150 C 50 130, 80 165, 110 150 S 170 135, 190 150 L 190 190 L 10 190 Z"
            fill={mid}
            opacity={0.8}
          />
        </g>
      );
    }
    default:
      return null;
  }
}

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <figure
      className={cn(
        "group overflow-hidden rounded-xl border border-[#dadce0] bg-white shadow-sm transition-all",
        "hover:-translate-y-1 hover:shadow-md dark:border-[#3c4043] dark:bg-[#28292a]"
      )}
    >
      <svg
        viewBox="0 0 200 200"
        className="block h-48 w-full"
        role="img"
        aria-label={`${artwork.title} — generative preview in ${artwork.medium}`}
      >
        <rect width="200" height="200" fill="#ffffff" className="dark:opacity-0" />
        <Pattern artwork={artwork} />
      </svg>
      <figcaption className="space-y-1.5 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="font-medium text-[#202124] dark:text-[#e8eaed]">{artwork.title}</h4>
          <span className="shrink-0 text-xs text-[#70757a] dark:text-[#9aa0a6]">{artwork.year}</span>
        </div>
        <p className="text-xs font-medium uppercase tracking-wide text-[#70757a] dark:text-[#9aa0a6]">
          {artwork.medium}
        </p>
        <p className="text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]">
          {artwork.description}
        </p>
        <div className="flex gap-1.5 pt-1" aria-hidden="true">
          {artwork.palette.map((c) => (
            <span
              key={c}
              className="h-3 w-3 rounded-full border border-black/10"
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
