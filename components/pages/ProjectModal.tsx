"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

export interface ProjectDetails {
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  url: string;
  image: string;
  highlights?: string[];
  features?: string[];
  /** Render the image band on a dark surface (for white/light logos). */
  previewDark?: boolean;
  /** How the image sits in its band. */
  previewFit?: "cover" | "contain";
}

interface ProjectModalProps {
  project: ProjectDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Body scroll lock — capture/restore scroll position via a ref (not body.style.top,
  // which the effect cleanup wipes before it can be read back)
  useEffect(() => {
    if (!isOpen) return;
    scrollYRef.current = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${scrollYRef.current}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, [isOpen]);

  // Focus management: move focus in on open, restore to the trigger on close
  useEffect(() => {
    if (!isOpen) return;
    prevFocusRef.current = document.activeElement as HTMLElement;
    const t = setTimeout(() => closeBtnRef.current?.focus(), 60);
    return () => {
      clearTimeout(t);
      prevFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  // Trap Tab within the dialog
  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusables = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!project || !mounted) return null;

  const isCover = project.previewFit
    ? project.previewFit === "cover"
    : project.image.includes("cover");
  const isDarkLogo = project.previewDark ?? project.image.includes("brave");

  const modalContent = (
    <AnimatePresence>
      {isOpen && project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/50 backdrop-blur-md"
            style={{ zIndex: 99998 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-0 flex items-center justify-center overflow-y-auto p-3 md:p-6"
            style={{ zIndex: 99999, pointerEvents: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              onKeyDown={onDialogKeyDown}
              className="pointer-events-auto relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-ink/20"
            >
              {/* Image band */}
              <div
                className={`relative h-40 shrink-0 overflow-hidden md:h-56 ${
                  isDarkLogo ? "bg-ink" : "bg-surface-2"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className={isCover ? "object-cover" : "object-contain p-10"}
                />
                {isCover && (
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/40 to-transparent" />
                )}
                <button
                  ref={closeBtnRef}
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/80 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="scrollbar-thin flex-1 overflow-y-auto p-6 md:p-9">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2
                    id="project-modal-title"
                    className="text-3xl font-medium tracking-tight text-ink md:text-4xl"
                  >
                    {project.title}
                  </h2>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mono text-xs text-muted hover:text-ink"
                  >
                    Live site ↗
                  </a>
                </div>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                  {project.description}
                </p>

                {project.highlights && project.highlights.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-line-2 px-3.5 py-1.5 text-xs font-medium text-ink"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-8 whitespace-pre-line text-[15px] leading-relaxed text-ink-soft">
                  {project.longDescription}
                </p>

                {project.features && project.features.length > 0 && (
                  <div className="mt-10">
                    <h3 className="eyebrow mb-4">Key Features</h3>
                    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {project.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-muted"
                        >
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-10">
                  <h3 className="eyebrow mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-line bg-background px-3 py-1.5 text-xs text-ink-soft"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="shrink-0 border-t border-line bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:px-9">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-background transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  Visit website
                  <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (typeof window === "undefined") return null;
  return createPortal(modalContent, document.body);
}
