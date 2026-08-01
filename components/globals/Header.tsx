"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", route: "#about" },
  { name: "Skills", route: "#skills" },
  { name: "Experience", route: "#experience" },
  { name: "Work", route: "#work" },
  { name: "Contact", route: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Body scroll lock + focus management while the overlay is open
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      overlayRef.current
        ?.querySelector<HTMLElement>("a, button")
        ?.focus();
    }, 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        toggleRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && overlayRef.current) {
        const focusables = Array.from(
          overlayRef.current.querySelectorAll<HTMLElement>("a[href], button")
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
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[1000] transition-all duration-500",
          scrolled
            ? "border-b border-line bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6 md:h-20 md:px-10">
          <Link
            href="#top"
            onClick={closeMenu}
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
            </span>
            <span className="text-[15px] font-medium tracking-tight text-ink">
              Joseph Barrera
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.route}
                className="link-underline text-[13px] font-medium tracking-tight text-muted transition-colors duration-300 hover:text-ink"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium tracking-tight text-background transition-transform duration-300 hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </nav>

          <button
            ref={toggleRef}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-end justify-center gap-[5px] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={cn(
                "h-[1.5px] bg-ink transition-all duration-300",
                menuOpen ? "w-6 translate-y-[6.5px] rotate-45" : "w-6"
              )}
            />
            <span
              className={cn(
                "h-[1.5px] bg-ink transition-all duration-300",
                menuOpen ? "w-6 -translate-y-[6.5px] -rotate-45" : "w-4"
              )}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[999] flex flex-col overflow-y-auto bg-background px-8 py-24 md:hidden"
          >
            <nav className="my-auto flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.route}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-baseline justify-between border-b border-line py-4"
                >
                  <span className="text-[2rem] font-medium tracking-tight text-ink">
                    {link.name}
                  </span>
                  <span className="mono text-xs text-faint">0{i + 1}</span>
                </motion.a>
              ))}
              <a
                href="mailto:jobenbarrera@gmail.com"
                onClick={closeMenu}
                className="mt-10 text-sm text-muted"
              >
                jobenbarrera@gmail.com
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
