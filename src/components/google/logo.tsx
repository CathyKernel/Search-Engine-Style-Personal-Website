"use client";

import { cn } from "@/lib/utils";

/**
 * The "Cathy Li" logotype, styled after a certain famous search engine:
 * Poppins (the closest freely-embeddable sibling of Product Sans),
 * with the classic blue-red-yellow-blue-green-red letter sequence.
 *
 * "Cathy Li" — C a t h y ␣ L i
 *   C  -> blue    #4285F4
 *   a  -> red     #EA4335
 *   t  -> yellow  #FBBC05
 *   h  -> blue    #4285F4
 *   y  -> green   #34A853
 *   L  -> red     #EA4335
 *   i  -> yellow  #FBBC05
 */

const LETTERS: { char: string; color: string }[] = [
  { char: "C", color: "#4285F4" },
  { char: "a", color: "#EA4335" },
  { char: "t", color: "#FBBC05" },
  { char: "h", color: "#4285F4" },
  { char: "y", color: "#34A853" },
  { char: " ", color: "transparent" },
  { char: "L", color: "#EA4335" },
  { char: "i", color: "#FBBC05" },
];

export function GoogleStyleLogo({
  size = "lg",
  bounce = false,
  className,
}: {
  size?: "lg" | "sm";
  bounce?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-label="Cathy Li"
      role="img"
      className={cn(
        "font-logo select-none whitespace-nowrap leading-none",
        size === "lg"
          ? "text-[clamp(3rem,11vw,6rem)] font-medium tracking-[-0.02em]"
          : "text-[1.65rem] font-medium tracking-[-0.01em]",
        bounce && "logo-bounce cursor-pointer",
        className
      )}
    >
      {LETTERS.map((letter, i) =>
        letter.char === " " ? (
          <span key={i} className="inline-block w-[0.28em]" aria-hidden="true" />
        ) : (
          <span
            key={i}
            className="logo-letter"
            style={{ color: letter.color }}
          >
            {letter.char}
          </span>
        )
      )}
    </span>
  );
}
