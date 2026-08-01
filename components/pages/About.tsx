"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import SectionHeader from "@/components/globals/SectionHeader";
import Reveal, { RevealWords } from "@/components/globals/Reveal";

export default function About() {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgWrapRef,
    offset: ["start end", "end start"],
  });
  // gentle parallax on the portrait
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="about"
      className="w-full scroll-mt-24 px-6 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHeader index="01" title="About" label="Who I am" />

        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16 lg:gap-24">
          {/* Portrait */}
          <div>
            <div
              ref={imgWrapRef}
              className="group relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl bg-surface-2"
            >
              {/* parallax layer — framer only translates Y (no transform conflict) */}
              <motion.div style={{ y }} className="absolute inset-[-10%]">
                {/* zoom layer — plain CSS transform transition, smooth on hover */}
                <div className="h-full w-full transition-transform duration-700 ease-out will-change-transform group-hover:scale-105">
                  <Image
                    src="/cv-profile2.JPG"
                    alt="Joseph Barrera"
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover object-top grayscale transition-[filter] duration-700 ease-out group-hover:contrast-[1.05]"
                  />
                </div>
              </motion.div>
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-line" />
            </div>
            <Reveal delay={0.1} className="mt-5 flex items-center justify-between">
              <span className="eyebrow">Tarlac, Philippines</span>
              <span className="eyebrow">Est. 2021</span>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="flex flex-col justify-center">
            <h3 className="text-statement font-medium text-ink">
              <RevealWords
                text="I turn complex problems into software that is scalable, maintainable and genuinely pleasant to use."
                serifWords={["pleasant"]}
                stagger={0.028}
              />
            </h3>

            <div className="mt-10 space-y-6 text-base leading-relaxed text-muted md:text-lg">
              <Reveal delay={0.05}>
                <p>
                  My journey started in{" "}
                  <span className="text-ink">2021</span>, and through fast
                  learning and a lot of shipping I&apos;ve grown into a
                  mid-senior full-stack developer — comfortable across the whole
                  stack, from database architecture to polished front ends.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  What drives me is the craft of solving hard problems and
                  building things that make a real impact. I lean on modern
                  tooling, including{" "}
                  <span className="text-ink">AI</span>, to move fast without
                  cutting corners, and I care as much about how a product feels
                  as whether it works.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="mt-12 border-l border-line-2 pl-6">
              <p className="font-serif text-2xl italic leading-snug text-ink md:text-3xl">
                “Building scalable solutions that drive impact — one line of code
                at a time.”
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
