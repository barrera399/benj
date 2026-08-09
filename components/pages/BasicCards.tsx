"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeader from "@/components/globals/SectionHeader";
import ProjectModal, { type ProjectDetails } from "./ProjectModal";
import { useCanHover } from "@/lib/hooks";

type Project = ProjectDetails & {
  summary: string;
  tag: string;
  preview: { src: string; fit: "cover" | "contain"; dark?: boolean };
};

const data: Project[] = [
  {
    title: "Poost Company",
    summary:
      "A full custom-packaging e-commerce platform — design, proof, manufacture, and reorder.",
    tag: "E-commerce",
    description:
      "A custom branded packaging e-commerce platform for food, retail, and e-commerce brands — handling design, proofing, in-house manufacturing, and fulfillment end to end.",
    image: "/poost-company.jpg",
    preview: { src: "/poost-company.jpg", fit: "cover" },
    url: "https://poostcompany.com/",
    longDescription: `Poost Company is a custom packaging marketplace where brands design, approve, and reorder branded packaging — boxes, pouches, cups, wrapping paper, stickers, and more.

Customers start from a product, customize dielines and artwork, then approve a digital or physical proof before anything goes to print. Orders are manufactured in-house with quality control at every stage, then shipped or held in the Poost warehouse for future runs.

Saved specifications turn reordering into a few clicks, and real-time order tracking keeps every run visible from proof to delivery. A "Branding Laboratory" (Poost Studio) offers design consultation, while the Poost Sustainability Alliance frames the brand's push toward responsible materials.`,
    techStack: ["Shopify", "React", "Supabase", "PostgreSQL", "Node.js", "Tailwind CSS"],
    highlights: ["E-commerce Platform", "Custom Manufacturing"],
    features: [
      "Product customization with digital or physical proof approval before print",
      "In-house manufacturing with quality control at every stage",
      "Quick reorder using saved product specifications",
      "Real-time order progress tracking",
      "Warehouse storage and fulfillment for future runs",
      "Branding Laboratory (Poost Studio) for design consultation",
      "Sustainability-focused materials via the Poost Sustainability Alliance",
      "Multi-region shipping with best-price positioning",
    ],
  },
  {
    title: "Doon.ph",
    summary: "The Philippines' first fully insured peer-to-peer car-sharing marketplace.",
    tag: "Marketplace",
    description:
      "The Philippines' first fully insured peer-to-peer car-sharing marketplace. Connecting vehicle owners with renters for easy, flexible, and worry-free car rental experiences.",
    image: "/doon-cover.png",
    preview: { src: "/doon-cover.png", fit: "cover" },
    url: "https://doon.ph/",
    longDescription: `DOON is a comprehensive car rental platform that connects car owners (hosts) with renters (guests) in a seamless, secure marketplace. The platform features separate dashboards for hosts and guests, each tailored to their specific needs.

Hosts can list their cars with dynamic fields, with all car makes and models saved in the database. The platform automatically creates contracts programmatically when a car is successfully rented. Hosts have access to a powerful dashboard to manage their listings and rentals.

Guests can browse available cars, view detailed information, and communicate directly with car owners through the platform's built-in chat system. The guest dashboard provides an intuitive interface for finding and booking the perfect vehicle.

To ensure security and prevent scams, both hosts and guests must verify their identity with their real driver's license before accessing the platform. This careful verification process creates a trusted environment for all users.

The platform also includes a Fleet feature, allowing car rental companies to list their vehicles and manage their business operations through the platform.`,
    techStack: ["Next.js", "TypeScript", "Xano", "MySQL", "Firebase", "AWS", "Lambda", "Docker", "EC2"],
    highlights: ["Pioneer Partner", "Proven Revenue"],
    features: [
      "Separate dashboards for hosts and guests",
      "Dynamic car listing with database-driven makes and models",
      "Programmatic contract creation upon successful rental",
      "Built-in chat system for host-guest communication",
      "Pre-rental inspection: capture all car angles before departure with a full checklist",
      "Post-rental inspection: damage verification against the pre-rental state",
      "Early return functionality",
      "Dispute filing system",
      "Trip extension feature",
      "Fleet management for car rental companies",
      "KYC verification with driver's license",
      "Secure and trusted marketplace environment",
    ],
  },
  {
    title: "Crafted Catalyst",
    summary: "Multi-tenant AI chatbot platform with voice, subdomain hosting and one-line embedding.",
    tag: "AI Platform",
    description:
      "Multi-tenant AI chatbot platform with subdomain hosting. Create custom chatbots, embed them in any website with a simple script, and interact via voice using ChatGPT and Eleven Labs realistic voice synthesis.",
    image: "/crafted-catalyst.svg",
    preview: { src: "/crafted-catalyst.svg", fit: "contain" },
    url: "https://craftedcatalyst.com/",
    longDescription: `Crafted Catalyst is a revolutionary multi-tenant AI chatbot platform that enables businesses to create, customize, and deploy intelligent chatbots across their digital infrastructure. The platform supports subdomain hosting, allowing each tenant to have their own branded chatbot experience.

The platform combines the power of ChatGPT for intelligent conversations with Eleven Labs' realistic voice synthesis, enabling natural voice interactions. Users can create custom bots tailored to their specific needs, train them with their own data, and embed them seamlessly into any website with just a few lines of code.

The multi-tenant architecture ensures secure isolation between different clients while providing scalable infrastructure. Each chatbot can be customized with unique personalities, knowledge bases, and interaction flows, making it perfect for various use cases from customer support to smart city infrastructure and order-taking kiosks.`,
    techStack: ["React", "Amazon Route 53", "CloudFront", "Amplify", "Firebase", "Eleven Labs", "ChatGPT API"],
    highlights: ["Multi-Tenant Platform", "Voice-Enabled AI"],
    features: [
      "Multi-tenant subdomain hosting architecture",
      "Custom chatbot creation and training",
      "One-line script embedding for any website",
      "Voice interaction with realistic Eleven Labs synthesis",
      "ChatGPT-powered intelligent conversations",
      "Custom bot selection and management",
      "Scalable cloud infrastructure",
      "Secure tenant isolation",
      "Real-time chat and voice capabilities",
    ],
  },
  {
    title: "Brave Connective",
    summary: "Uniting AdSpark, m360 and Inquiro — data, storytelling and customer engagement.",
    tag: "Corporate",
    description:
      "Powers the future of business through data, storytelling, messaging, and customer engagement solutions. Uniting AdSpark, m360, and Inquiro to bring brands closer to their customers.",
    image: "/white_brave.png",
    preview: { src: "/white_brave.png", fit: "contain", dark: true },
    url: "https://www.braveconnective.ph/",
    longDescription: `Brave Connective is a comprehensive business solutions platform that unifies multiple companies (AdSpark, m360, and Inquiro) to deliver integrated data, storytelling, messaging, and customer engagement services. The platform enables brands to connect more effectively with their customers through innovative digital solutions and strategic communication strategies.`,
    techStack: ["Next.js", "TypeScript", "React", "Node.js", "Payload CMS"],
    highlights: ["Multi-Company Integration", "Customer Engagement"],
    features: [
      "Unified platform for multiple companies",
      "Data-driven business solutions",
      "Storytelling and messaging services",
      "Customer engagement tools",
      "Brand-to-customer connectivity",
    ],
  },
  {
    title: "Aspire",
    summary: "Homes tailored for urban professionals and upwardly mobile families.",
    tag: "Real Estate",
    description:
      "Homes tailored for urban professionals and upwardly mobile families. Featuring themed residential subdivisions, resort-style condos, and high-rise living spaces with future-forward design principles.",
    image: "/aspire.png",
    preview: { src: "/aspire.png", fit: "contain", dark: true },
    url: "https://aspirebyfilinvest.com/",
    longDescription: `Aspire by Filinvest is a premier real estate development platform offering homes designed for urban professionals and upwardly mobile families. The platform showcases themed residential subdivisions, resort-style condominiums, and high-rise living spaces, all built with future-forward design principles and modern amenities.`,
    techStack: ["Next.js", "TypeScript", "React", "Payload CMS"],
    highlights: ["Real Estate Platform", "Modern Design"],
    features: [
      "Themed residential subdivisions",
      "Resort-style condominiums",
      "High-rise living spaces",
      "Future-forward design principles",
      "Urban professional-focused homes",
    ],
  },
  {
    title: "Futura",
    summary: "A smart-value real estate platform with search, virtual tours and management.",
    tag: "Real Estate",
    description:
      "Your family's bright future begins here. A smart-value real estate platform offering homes designed for independence, featuring property search, virtual tours, and comprehensive property management solutions.",
    image: "/futura-cover.jpg",
    preview: { src: "/futura-cover.jpg", fit: "cover" },
    url: "https://futurabyfilinvest.com/",
    longDescription: `Futura by Filinvest is a comprehensive real estate platform designed to help families take their first step towards independence. The platform offers smart-value homes with advanced property search capabilities, virtual tour experiences, and seamless property management tools. Built as a twin project to Aspire, Futura shares similar architecture and tech stack while maintaining its unique identity focused on family-oriented living and smart-value propositions.`,
    techStack: ["Next.js", "TypeScript", "React", "Payload CMS"],
    highlights: ["Real Estate Platform", "Smart-Value Homes"],
    features: [
      "Advanced property search with filters",
      "Virtual tour functionality",
      "Property type and location filtering",
      "Price range search capabilities",
      "Family-oriented home designs",
      "Comprehensive property management",
    ],
  },
];

/** Small framed thumbnail — reused inline on mobile and inside the cursor preview. */
function Thumb({
  project,
  className,
  sizes,
}: {
  project: Project;
  className?: string;
  sizes: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${
        project.preview.dark ? "bg-ink" : "bg-surface-2"
      } ${className ?? ""}`}
    >
      <Image
        src={project.preview.src}
        alt={project.title}
        fill
        sizes={sizes}
        className={
          project.preview.fit === "cover"
            ? "object-cover"
            : "object-contain p-4"
        }
      />
    </div>
  );
}

export default function BasicCards() {
  const canHover = useCanHover();
  const [active, setActive] = useState<number | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 160, damping: 22, mass: 0.5 });

  const openModal = (p: Project) => {
    setSelected({
      ...p,
      previewDark: p.preview.dark,
      previewFit: p.preview.fit,
    });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelected(null), 300);
  };

  return (
    <>
      <section
        id="work"
        className="w-full scroll-mt-24 px-6 py-24 md:px-10 md:py-36"
        onMouseMove={(e) => {
          mx.set(e.clientX);
          my.set(e.clientY);
        }}
      >
        <div className="mx-auto max-w-[1240px]">
          <SectionHeader index="04" title="Selected Work" label="Six of many" />

          <div className="flex flex-col">
            {data.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative border-t border-line last:border-b"
              >
                <div className="flex items-center gap-5 py-6 md:gap-8 md:py-9">
                  <span className="mono hidden text-xs text-faint sm:block">
                    0{i + 1}
                  </span>

                  {/* mobile thumbnail */}
                  <Thumb
                    project={project}
                    sizes="80px"
                    className="h-16 w-20 shrink-0 rounded-md ring-1 ring-inset ring-line md:hidden"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl font-medium tracking-tight text-ink transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-4xl lg:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm text-muted md:text-[15px]">
                      {project.summary}
                    </p>
                  </div>

                  <span className="mono hidden shrink-0 text-xs text-faint md:block">
                    {project.tag}
                  </span>

                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-background">
                    <FiArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>

                {/* Accessible overlay trigger — keeps the h3 a real heading */}
                <button
                  type="button"
                  aria-label={`View ${project.title} — ${project.tag} project`}
                  aria-haspopup="dialog"
                  onClick={() => openModal(project)}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="absolute inset-0 z-10 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              </motion.div>
            ))}
          </div>

          <p className="mono mt-10 text-xs text-faint">
            Tap any project for the full breakdown.
          </p>
        </div>
      </section>

      {/* cursor-following preview (desktop / hover devices only) */}
      {canHover && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
        >
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ translateX: 28, translateY: "-50%" }}
              >
                <Thumb
                  project={data[active]}
                  sizes="340px"
                  className="h-[220px] w-[330px] rounded-xl shadow-2xl shadow-ink/20 ring-1 ring-inset ring-line"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <ProjectModal
        project={selected}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
