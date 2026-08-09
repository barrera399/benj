"use client";

import { motion } from "framer-motion";

/**
 * Consistent section masthead: an oversized index number, a title, and a
 * hairline rule that draws itself in. Used across every section so the whole
 * page shares one grammar.
 */
export default function SectionHeader({
  index,
  title,
  label,
}: {
  index: string;
  title: string;
  label?: string;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-baseline justify-between gap-4"
      >
        <div className="flex items-baseline gap-3 md:gap-5">
          <span className="mono text-xs text-faint">({index})</span>
          <h2 className="text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-none tracking-tight text-ink">
            {title}
          </h2>
        </div>
        {label && <span className="eyebrow hidden shrink-0 sm:block">{label}</span>}
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 h-px w-full origin-left bg-line-2"
      />
    </div>
  );
}
