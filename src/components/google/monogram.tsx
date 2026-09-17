"use client";

import { cn } from "@/lib/utils";
import { identity } from "@/data/profile";

/** Monogram avatar in Google brand colors, standing in for a profile photo. */
export function MonogramAvatar({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-label={`${identity.name} avatar`}
      role="img"
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#EA4335] font-logo font-semibold text-white shadow-sm",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {identity.avatarInitials}
    </span>
  );
}
