"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes every framer-motion animation on the page respect the user's
 * "reduce motion" OS setting — it neutralizes transform/layout animations
 * (parallax, slides, the infinite scroll cue) while keeping opacity fades.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
