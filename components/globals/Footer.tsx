"use client";

import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const UpworkIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
  </svg>
);

const socials = [
  { name: "LinkedIn", Icon: FaLinkedin, link: "https://www.linkedin.com/in/joseph-benjamin-barrera-034a6024b/" },
  { name: "GitHub", Icon: FaGithub, link: "https://github.com/Norlant1" },
  { name: "Upwork", Icon: UpworkIcon, link: "https://www.upwork.com/freelancers/~01502ea6f0f26f92ba" },
];

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-line bg-background px-6 pb-10 pt-16 md:px-10 md:pt-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">Have something in mind?</p>
            <Link
              href="mailto:jobenbarrera@gmail.com"
              className="link-underline text-3xl font-medium tracking-tight text-ink sm:text-4xl md:text-5xl"
            >
              jobenbarrera@gmail.com
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {socials.map(({ name, Icon, link }) => (
              <Link
                key={name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="-m-2.5 inline-flex p-2.5 text-muted transition-colors duration-300 hover:text-ink"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <span className="mono">© 2026 Joseph Barrera</span>
          <span className="mono hidden sm:block">Full-Stack Developer · Tarlac, Philippines</span>
          <a href="#top" className="link-underline mono text-muted transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
