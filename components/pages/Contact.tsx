"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import SectionHeader from "@/components/globals/SectionHeader";
import { RevealWords } from "@/components/globals/Reveal";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({ email: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // Load reCAPTCHA v3 script
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      console.warn("reCAPTCHA site key not found");
      return;
    }

    const existingScript = document.querySelector(`script[src*="recaptcha/api.js"]`);
    if (existingScript) {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => setRecaptchaLoaded(true));
      }
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => setRecaptchaLoaded(true));
      } else {
        setTimeout(() => {
          if (window.grecaptcha) {
            window.grecaptcha.ready(() => setRecaptchaLoaded(true));
          }
        }, 500);
      }
    };
    script.onerror = () => console.error("Failed to load reCAPTCHA script");
    document.body.appendChild(script);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const executeRecaptcha = async (): Promise<string | null> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      console.error("reCAPTCHA site key not configured");
      return null;
    }
    if (!window.grecaptcha) {
      console.error("reCAPTCHA not loaded");
      return null;
    }

    try {
      return await new Promise((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(siteKey, {
              action: "contact_form",
            });
            if (!token || token.length === 0) {
              reject(new Error("Empty token received"));
              return;
            }
            resolve(token);
          } catch (error) {
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error("reCAPTCHA execution error:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const recaptchaToken = await executeRecaptcha();
      if (!recaptchaToken) {
        setSubmitStatus("error");
        setIsSubmitting(false);
        alert("Failed to verify reCAPTCHA. Please refresh the page and try again.");
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          description: formData.description,
          recaptchaToken,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ email: "", description: "" });
      } else {
        const errorData = await response.json();
        console.error("Form submission error:", errorData);
        if (errorData.details && errorData.details.includes("browser-error")) {
          alert(
            "reCAPTCHA error: Please make sure your domain is added to the reCAPTCHA allowed domains list in Google Console."
          );
        }
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full border-b border-line-2 bg-transparent py-3 text-ink placeholder:text-faint outline-none transition-colors duration-300 focus:border-ink";

  return (
    <section
      id="contact"
      className="w-full scroll-mt-24 px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHeader index="05" title="Contact" label="Let's talk" />

        <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:gap-20">
          {/* Left: invitation */}
          <div className="flex flex-col">
            <h3 className="text-statement font-medium text-ink">
              <RevealWords
                text="Have a project in mind? Let's build something worth remembering."
                serifWords={["remembering"]}
                stagger={0.03}
              />
            </h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex flex-col gap-4"
            >
              <Link
                href="mailto:jobenbarrera@gmail.com"
                className="group flex items-center gap-3 text-muted transition-colors hover:text-ink"
              >
                <FaEnvelope className="h-4 w-4" />
                <span className="link-underline text-[15px]">jobenbarrera@gmail.com</span>
              </Link>
              <Link
                href="https://wa.me/639974492608"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-muted transition-colors hover:text-ink"
              >
                <FaWhatsapp className="h-4 w-4" />
                <span className="link-underline text-[15px]">+63 997 449 2608</span>
              </Link>

              <div className="mt-4 flex items-center gap-5">
                <Link href="https://www.linkedin.com/in/joseph-benjamin-barrera-034a6024b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="-m-2.5 inline-flex p-2.5 text-muted transition-colors hover:text-ink">
                  <FaLinkedin className="h-5 w-5" />
                </Link>
                <Link href="https://github.com/Norlant1" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="-m-2.5 inline-flex p-2.5 text-muted transition-colors hover:text-ink">
                  <FaGithub className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <div>
              <label htmlFor="email" className="eyebrow mb-1 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="description" className="eyebrow mb-1 block">
                Message
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project or inquiry…"
                className={`${inputClass} resize-none`}
              />
            </div>

            {!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
              <div className="rounded-lg border border-line-2 bg-surface-2 px-4 py-3 text-center text-sm text-muted">
                ⚠️ reCAPTCHA is not configured. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your environment.
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <button
                type="submit"
                disabled={isSubmitting || !recaptchaLoaded}
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-background transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting ? "Sending…" : "Send message"}
              </button>

              <div role="status" aria-live="polite" className="min-h-5 text-sm text-ink">
                {submitStatus === "success" && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <span aria-hidden>✓</span> Sent — I&apos;ll be in touch soon.
                  </motion.span>
                )}
                {submitStatus === "error" && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <span aria-hidden>—</span> Couldn&apos;t send. Please try again.
                  </motion.span>
                )}
              </div>
            </div>

            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
              <p className="text-xs leading-relaxed text-faint">
                Protected by reCAPTCHA — Google&apos;s{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="link-underline text-muted">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="link-underline text-muted">
                  Terms
                </a>{" "}
                apply.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
