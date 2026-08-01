"use client";

import React from "react";

/**
 * Seamless CSS marquee. Renders the children twice and translates -50% so the
 * loop is invisible. Slow and quiet by default. Pauses on hover.
 */
export default function Marquee({
  children,
  durationSec = 42,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  durationSec?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee-paused overflow-hidden ${className ?? ""}`}>
      <div
        className="flex w-max animate-marquee"
        style={{
          ["--marquee-duration" as string]: `${durationSec}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
