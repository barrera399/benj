"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const headerLinks = [
  {
    id: 1,
    name: "Home",
    route: "/",
  },
  {
    id: 2,
    name: "About",
    route: "/about",
  },
  {
    id: 4,
    name: "Contact",
    route: "/#contact",
  },
];

const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const path = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <div className="h-[120px] left-0 top-0 fixed px-10 m-auto w-full overflow-hidden z-[1000]">
      <nav className="md:px-10 max-w-[1280px] flex h-full flex-row items-center justify-end m-auto relative">
        <div className="w-full flex justify-between items-center">
          <div className="z-50 flex w-full justify-between items-center">
            <Link onClick={() => setMenuOpen(false)} href="/">
              {/* Logo can go here */}
            </Link>

            {/* Burger Menu Button - Visible on all screen sizes */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                "relative w-10 h-10 flex flex-col justify-center items-end gap-1.5 group cursor-pointer z-50",
                menuOpen && "gap-0"
              )}
              aria-label="Toggle navigation menu"
            >
              {/* Top line - shortest, becomes longest on hover */}
              <span
                className={cn(
                  "h-[2px] bg-white/80 transition-all duration-300 ease-in-out origin-right",
                  "w-[12px] group-hover:w-full group-hover:bg-white",
                  menuOpen && "rotate-45 translate-y-[9px] w-full"
                )}
              />
              {/* Middle line - longest, becomes shortest on hover */}
              <span
                className={cn(
                  "h-[2px] bg-white/80 transition-all duration-300 ease-in-out origin-center",
                  "w-full group-hover:w-[12px] group-hover:bg-white",
                  menuOpen && "opacity-0 w-0"
                )}
              />
              {/* Bottom line - medium, becomes medium-short on hover */}
              <span
                className={cn(
                  "h-[2px] bg-white/80 transition-all duration-300 ease-in-out origin-right",
                  "w-[20px] group-hover:w-[12px] group-hover:bg-white",
                  menuOpen && "-rotate-45 -translate-y-[9px] w-full"
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999]"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Side Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 md:w-96 bg-black/95 backdrop-blur-xl border-l border-teal-400/20 z-[1000] shadow-2xl shadow-teal-400/10"
          >
            <div className="flex flex-col h-full p-8 pt-32">
              {/* Navigation Links */}
              <nav className="flex flex-col space-y-6">
                {headerLinks?.map((obj, index) => (
                  <motion.div
                    key={obj.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      onClick={() => setMenuOpen(false)}
                      href={obj.route}
                      className={cn(
                        "block text-white text-xl md:text-2xl font-light transition-all duration-300 relative group",
                        path === obj.route && "text-teal-400"
                      )}
                    >
                      <span className="relative inline-block">
                        {obj.name}
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-teal-400 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Decorative Elements */}
              <div className="mt-auto pt-8 border-t border-teal-400/20">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 text-sm"
                >
                  © Joseph 2025
                </motion.div>
              </div>
            </div>

            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainHeader;
