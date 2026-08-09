"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeader from "@/components/globals/SectionHeader";
import ProjectModal, { type ProjectDetails } from "./ProjectModal";

type Project = ProjectDetails & {
  summary: string;
  tag: string;
  preview: { src: string; fit: "cover" | "contain"; dark?: boolean };
};

const data: Project[] = [
  {
    title: "CAI Studio",
    summary:
      "A no-code platform to build AI studios of specialized, collaborating agents.",
    tag: "AI Platform",
    description:
      "A no-code platform where anyone can build their own AI studio — filled with specialized agents that each have their own knowledge, tools, and models, and can work together as a team.",
    image: "/cai-studio.svg",
    preview: { src: "/cai-studio.svg", fit: "contain" },
    url: "https://caistudio.nl",
    longDescription: `CAI Studio is a no-code platform where users build their own AI studio filled with multiple specialized agents.

Each agent can be given its own knowledge base using embeddings and retrieval (RAG), connected to external apps through tool calling and integrations, and powered by different AI models from OpenAI and Anthropic. Agents also have built-in tools like web search, URL scraping, code execution, and image generation.

Agents can work together as a team — one pulling in a colleague when a question falls outside its role. Users can even build their landing page inside the platform without any programming knowledge, then publish so end-users can chat with the assistants directly.`,
    techStack: ["Vue", "Laravel", "OpenAI", "Anthropic", "RAG / Embeddings", "Tool Calling"],
    highlights: ["No-Code AI Studio", "Multi-Agent Teams"],
    features: [
      "Build specialized AI agents with no code",
      "Per-agent knowledge bases via embeddings and retrieval (RAG)",
      "Tool calling and integrations with external apps",
      "Multiple models from OpenAI and Anthropic",
      "Built-in tools: web search, URL scraping, code execution, image generation",
      "Multi-agent teamwork — an agent pulls in a colleague when a question is outside its role",
      "No-code landing page builder",
      "Publish so end-users can chat with the assistants directly",
    ],
  },
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

export default function BasicCards() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        className="w-full scroll-mt-24 px-6 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-[1240px]">
          <SectionHeader index="04" title="Selected Work" label="Seven of many" />

          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {data.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 0.7,
                  delay: (i % 2) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative"
              >
                <div
                  className={`relative aspect-[16/11] overflow-hidden rounded-2xl ring-1 ring-inset ring-line ${
                    project.preview.dark ? "bg-ink" : "bg-surface-2"
                  }`}
                >
                  <Image
                    src={project.preview.src}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 92vw, 46vw"
                    className={
                      project.preview.fit === "cover"
                        ? "object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                        : "object-contain p-12 transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                    }
                  />

                  <span className="absolute left-4 top-4 rounded-full border border-line bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted backdrop-blur-sm">
                    {project.tag}
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="flex items-baseline gap-2.5 text-xl font-medium tracking-tight text-ink transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-2xl">
                      <span className="font-mono text-xs text-faint">
                        0{i + 1}
                      </span>
                      {project.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm text-muted">
                      {project.summary}
                    </p>
                  </div>
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-background">
                    <FiArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>

                {/* stretched accessible trigger — keeps the h3 a real heading */}
                <button
                  type="button"
                  aria-label={`View ${project.title} — ${project.tag} project`}
                  aria-haspopup="dialog"
                  onClick={() => openModal(project)}
                  className="absolute inset-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selected}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
