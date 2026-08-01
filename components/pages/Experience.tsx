"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/globals/SectionHeader";

const experience = [
  {
    range: "2024 — Present",
    company: "Sandlot Inc",
    note: "formerly AHG Lab",
    role: "Full-Stack Developer",
    description:
      "Building diverse web applications and systems for a range of clients — using modern practices to ship scalable, efficient solutions, and leaning on AI tooling to push productivity and quality further.",
  },
  {
    range: "2023",
    company: "Project Grey",
    note: "",
    role: "Full-Stack Developer",
    description:
      "End-to-end development of web applications — building both frontend and backend while collaborating with cross-functional teams to deliver high-quality products.",
  },
  {
    range: "2022 — 2023",
    company: "Freelance",
    note: "",
    role: "Full-Stack Developer",
    description:
      "Feature implementation and bug fixing across diverse projects and tech stacks. Grew fast at adapting to unfamiliar codebases and shipping solutions precisely to spec.",
  },
  {
    range: "2022",
    company: "Klaudsol Inc",
    note: "",
    role: "Software Development Intern",
    description:
      "Developed customized Headless CMS solutions for multiple websites — my first real taste of full-stack development and client project delivery.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="w-full scroll-mt-24 px-6 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHeader index="03" title="Experience" label="The path so far" />

        <div className="flex flex-col">
          {experience.map((item, i) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group border-t border-line last:border-b"
            >
              <div className="grid grid-cols-1 gap-3 py-8 transition-colors duration-500 md:grid-cols-[150px_1fr_180px] md:items-start md:gap-8">
                <span className="mono text-sm text-faint transition-colors duration-300 group-hover:text-ink">
                  {item.range}
                </span>

                <div>
                  <h3 className="flex flex-wrap items-baseline gap-x-3 text-2xl font-medium tracking-tight text-ink transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-3xl">
                    {item.company}
                    {item.note && (
                      <span className="text-sm font-normal italic text-faint">
                        {item.note}
                      </span>
                    )}
                  </h3>

                  {/* description — expands on hover (desktop), always open on mobile */}
                  <div className="grid grid-rows-[1fr] overflow-hidden transition-[grid-template-rows] duration-500 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
                    <div className="min-h-0">
                      <p className="max-w-xl pt-4 text-[15px] leading-relaxed text-muted md:pt-5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                <span className="mono text-xs text-faint md:text-right">
                  {item.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
