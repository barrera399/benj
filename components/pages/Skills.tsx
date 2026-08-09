"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/globals/SectionHeader";
import Marquee from "@/components/globals/Marquee";

const skillsData: Record<string, string[]> = {
  Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "Python", "FastAPI"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "DynamoDB", "Aurora SQL"],
  "Cloud & Tools": ["AWS", "Docker", "Payload CMS", "Strapi CMS", "GCP"],
};

const allTech = Array.from(new Set(Object.values(skillsData).flat()));

export default function Skills() {
  return (
    <section
      id="skills"
      className="w-full scroll-mt-24 px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHeader index="02" title="Skills" label="What I work with" />

        <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skillsData).map(([category, skills], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.8,
                delay: ci * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h3 className="mono mb-6 text-xs text-faint">
                {String(ci + 1).padStart(2, "0")} · {category}
              </h3>
              <ul className="flex flex-col">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="group flex items-center justify-between border-t border-line py-3 first:border-t-0"
                  >
                    <span className="text-[15px] font-medium text-ink transition-transform duration-300 ease-out group-hover:translate-x-1">
                      {skill}
                    </span>
                    <span className="text-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      →
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* technology marquee — textural band */}
      <div className="relative mt-14 border-y border-line py-6 md:mt-20">
        <Marquee durationSec={48}>
          {allTech.map((tech, i) => (
            <span key={tech} className="flex items-center">
              <span className="px-6 text-2xl font-medium tracking-tight text-faint md:text-3xl">
                {tech}
              </span>
              {i < allTech.length - 1 && <span className="text-ink/25">◆</span>}
            </span>
          ))}
          <span className="pr-6 text-ink/25">◆</span>
        </Marquee>
      </div>
    </section>
  );
}
