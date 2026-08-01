"use client";

import { motion, type Variants } from "framer-motion";
import React from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds of delay before the reveal starts. */
  delay?: number;
  /** Distance travelled on the y-axis. */
  y?: number;
  /** Fire every time it enters the viewport, or just once. */
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "p" | "h1" | "h2" | "h3";
};

/**
 * A calm, buttery scroll reveal. Fade + rise on an ease-out-expo curve.
 * The whole site leans on this so motion feels like one hand drew it.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Word-by-word reveal for headlines. Each word rises out of a clipped mask.
 * Pass `serifWords` (lowercased) to render those words in the accent serif italic.
 */
export function RevealWords({
  text,
  className,
  wordClassName,
  serifWords = [],
  delay = 0,
  stagger = 0.06,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  serifWords?: string[];
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  const serifSet = new Set(serifWords.map((w) => w.toLowerCase()));

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => {
        const clean = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const isSerif = serifSet.has(clean);
        return (
          <React.Fragment key={`${word}-${i}`}>
            <span
              className="inline-block overflow-hidden pb-[0.16em] align-bottom -mb-[0.16em]"
              aria-hidden
            >
              <motion.span
                className={`inline-block ${
                  isSerif ? "font-serif italic pr-[0.08em]" : ""
                } ${wordClassName ?? ""}`}
                initial={{ y: "115%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once, margin: "-8% 0px" }}
                transition={{
                  duration: 0.85,
                  delay: delay + i * stagger,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
            {/* real, breakable space text node between words */}
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </span>
  );
}
