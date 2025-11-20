"use client";

import Link from "next/link";
import Image from "next/image";

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
    route: "/contact",
  },
];

const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const path = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  return (
    <div className=" h-[120px]  left-0 top-0  fixed   px-10 m-auto  w-full  overflow-hidden  z-100">
      <nav className=" md:px-10 max-w-[1280px] flex h-full flex-row items-center justify-end relative">
        <div className=" w-full flex justify-between items-center">
          <div className="z-50 flex w-full justify-between items-center">
            <Link onClick={() => setMenuOpen(false)} href="/">
              {/* <Image
                width={200}
                height={200}
                className="w-auto h-[40px] md:h-[60px] lg:h-[80px]"
                alt="brave"
                src={(data.braveLogo as Media).url!}
              /> */}
              // benj
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex text-white space-x-5 text-base">
              {headerLinks?.map((obj) => (
                <Link
                  key={obj.id}
                  className="relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px] before:bg-current before:scale-x-0 before:transition-transform before:duration-200 hover:before:scale-x-100 hover:before:origin-left before:origin-right"
                  href={obj.route}
                >
                  {obj.name}
                </Link>
              ))}
            </ul>

            {/* Mobile Menu Button (Visible below lg: 1024px) */}
            <button
              className="lg:hidden z-50 menu-toggle relative w-8 h-8 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="flex flex-col gap-1.5">
                <div
                  className={cn(
                    "w-6 h-[2px] bg-white transition-all duration-300",
                    menuOpen ? "rotate-45 translate-y-[9px]" : ""
                  )}
                ></div>
                <div
                  className={cn(
                    "w-6 h-[2px] translate-x-[-10px] bg-white transition-all duration-300",
                    menuOpen ? "opacity-0" : ""
                  )}
                ></div>
                <div
                  className={cn(
                    "w-6 h-[2px] bg-white transition-all duration-300",
                    menuOpen ? "-rotate-45 -translate-y-[9px]" : ""
                  )}
                ></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-[49] bg-black  lg:hidden flex flex-col items-center justify-center space-y-6 text-white menu transition-transform duration-300",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {headerLinks?.map((obj) => (
          <Link
            key={obj.id}
            className="transition-colors font-light text-sm duration-200  relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px] before:bg-current before:scale-x-0 before:transition-transform before:duration-200 hover:before:scale-x-100 hover:before:origin-left before:origin-right"
            href={obj.route}
          >
            {obj.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainHeader;
