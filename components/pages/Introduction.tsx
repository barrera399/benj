"use client";

import { animate, motion, useInView, useMotionValue } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa";
import { RevealWords } from "@/components/globals/Reveal";
import Magnetic from "@/components/globals/Magnetic";

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = count.on("change", (v) => setDisplay(Math.round(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, count]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="mono text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        {display}
        {suffix}
      </span>
      <span className="mt-1 text-xs text-muted">{label}</span>
    </div>
  );
}

export default function Introduction() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 pb-14 pt-32 md:px-10 md:pt-40"
    >
      {/* faint radial lift behind the statement */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 32%, rgba(11,11,12,0.05), transparent 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1240px]">
        {/* eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex items-center justify-between md:mb-14"
        >
          <span className="eyebrow">Full-Stack Developer</span>
          <span className="eyebrow flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
            </span>
            Available for work
          </span>
        </motion.div>

        {/* the statement */}
        <h1 className="text-display max-w-[15ch] font-medium text-ink">
          <RevealWords
            text="I build products people actually use."
            serifWords={["actually"]}
            stagger={0.07}
          />
        </h1>

        {/* meta row */}
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1.1fr_1fr] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-lg leading-relaxed text-muted md:text-xl"
          >
            I&apos;m{" "}
            <span className="text-ink">Joseph Barrera</span>, a full-stack
            developer from Tarlac, Philippines. Five years turning complex
            problems into clean, dependable products — from insured car-sharing
            marketplaces to multi-tenant AI platforms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-6 md:items-end"
          >
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic strength={0.4}>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-background transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-ink-soft"
                >
                  View work
                  <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Magnetic>

              <Link
                href="/Joseph Benjamin Barrera - Resume.pdf"
                target="_blank"
                className="link-underline inline-flex items-center gap-2 py-3.5 text-sm font-medium text-ink"
              >
                Résumé
                <span className="text-xs">↗</span>
              </Link>
            </div>

            <div className="flex items-center gap-5">
              <Link
                href="https://github.com/Norlant1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="-m-2.5 inline-flex p-2.5 text-muted transition-colors hover:text-ink"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/joseph-benjamin-barrera-034a6024b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="-m-2.5 inline-flex p-2.5 text-muted transition-colors hover:text-ink"
              >
                <FaLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* stats + scroll cue */}
        <div className="mt-16 flex flex-col gap-10 border-t border-line pt-8 md:mt-24 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-10 sm:gap-16">
            <Stat value={30} suffix="+" label="Projects shipped" />
            <Stat value={5} suffix="+" label="Years building" />
            <Stat value={30} suffix="+" label="Technologies" />
          </div>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="group hidden items-center gap-3 md:flex"
          >
            <span className="eyebrow">Scroll</span>
            <span className="relative block h-10 w-[1px] overflow-hidden bg-line">
              <motion.span
                className="absolute left-0 top-0 block h-4 w-full bg-ink"
                animate={{ y: ["-100%", "250%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
