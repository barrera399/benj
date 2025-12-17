"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ParticlesBackground } from "@/components/globals/bg-particle";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import ProjectModal from "./ProjectModal";

interface ProjectData {
  title: string;
  description: string;
  image: string;
  url: string;
  longDescription: string;
  techStack: string[];
  highlights?: string[];
  features?: string[];
}

const data: ProjectData[] = [
  {
    title: "Doon.ph",
    description:
      "The Philippines' first fully insured peer-to-peer car-sharing marketplace. Connecting vehicle owners with renters for easy, flexible, and worry-free car rental experiences.",
    image: "/doon-cover.png",
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
      "Pre-rental inspection: Capture all car angles before guest departure with comprehensive checklist",
      "Post-rental inspection: Damage verification system to ensure car condition matches pre-rental state",
      "Early return functionality",
      "Dispute filing system",
      "Trip extension feature",
      "Fleet management for car rental companies",
      "KYC verification with driver's license",
      "Secure and trusted marketplace environment"
    ],
  },
  {
    title: "Crafted Catalyst",
    description: "Multi-tenant AI chatbot platform with subdomain hosting. Create custom chatbots, embed them in any website with a simple script, and interact via voice using ChatGPT and Eleven Labs realistic voice synthesis.",
    image: "/crafted-catalyst.svg",
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
      "Easy integration and deployment"
    ],
  },
  {
    title: "Brave Connective",
    description: "Powers the future of business through data, storytelling, messaging, and customer engagement solutions. Uniting AdSpark, m360, and Inquiro to bring brands closer to their customers.",
    image: "/white_brave.png",
    url: "https://www.braveconnective.ph/",
    longDescription: `Brave Connective is a comprehensive business solutions platform that unifies multiple companies (AdSpark, m360, and Inquiro) to deliver integrated data, storytelling, messaging, and customer engagement services. The platform enables brands to connect more effectively with their customers through innovative digital solutions and strategic communication strategies.`,
    techStack: ["Next.js", "TypeScript", "React", "Node.js", "Payload CMS"],
    highlights: ["Multi-Company Integration", "Customer Engagement"],
    features: [
      "Unified platform for multiple companies",
      "Data-driven business solutions",
      "Storytelling and messaging services",
      "Customer engagement tools",
      "Brand-to-customer connectivity"
    ],
  },
  {
    title: "Aspire",
    description: "Homes tailored for urban professionals and upwardly mobile families. Featuring themed residential subdivisions, resort-style condos, and high-rise living spaces with future-forward design principles.",
    image: "/aspire.png",
    url: "https://aspirebyfilinvest.com/",
    longDescription: `Aspire by Filinvest is a premier real estate development platform offering homes designed for urban professionals and upwardly mobile families. The platform showcases themed residential subdivisions, resort-style condominiums, and high-rise living spaces, all built with future-forward design principles and modern amenities.`,
    techStack: ["Next.js", "TypeScript", "React", "Payload CMS"],
    highlights: ["Real Estate Platform", "Modern Design"],
    features: [
      "Themed residential subdivisions",
      "Resort-style condominiums",
      "High-rise living spaces",
      "Future-forward design principles",
      "Urban professional-focused homes"
    ],
  },
];

const ImageCard = ({ 
  card, 
  index, 
  isInView, 
  onOpenModal,
  shouldShow
}: { 
  card: ProjectData; 
  index: number; 
  isInView: boolean;
  onOpenModal: (project: ProjectData) => void;
  shouldShow?: boolean;
}) => {
  const displayShow = shouldShow !== undefined ? shouldShow : isInView;
  const [isCardHovered, setIsCardHovered] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className="w-[310px] h-[350px] rounded-lg sm:w-[300px] sm:h-[400px] md:w-[350px] md:h-[500px] group transition-all ease-in-out duration-300 md:hover:scale-105 cursor-pointer md:cursor-default"
      onMouseEnter={() => !isMobile && setIsCardHovered(true)}
      onMouseLeave={() => !isMobile && setIsCardHovered(false)}
      onClick={() => {
        // On mobile, clicking the card opens the modal
        if (isMobile) {
          onOpenModal(card);
        }
      }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 2,
          delay: index * 0.3,
        }}
        className="relative h-full w-full overflow-hidden rounded-lg"
      >
        {/* Image Background */}
        <Image
          width={1000}
          height={1000}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 md:group-hover:scale-110"
          src="/doon-cover.png"
          alt="Doon Cover"
        />
        
        {/* Green Overlay */}
        <div className="absolute inset-0 bg-[#afed00]/25 md:group-hover:bg-[#afed00]/35 transition-all duration-300" />
        
        {/* Gradient Overlay - Different from third card */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#7ab800]/30 via-[#afed00]/15 to-transparent" />
        
        {/* Grid Pattern - Similar to card 3 */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            linear-gradient(rgba(175, 237, 0, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(175, 237, 0, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
        
        {/* Radial Scan Effect - Different from linear scan - Disabled on mobile */}
        <motion.div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: 'radial-gradient(circle, transparent 0%, rgba(175, 237, 0, 0.15) 50%, transparent 100%)',
          }}
          animate={!isMobile ? {
            scale: [0.8, 1.5, 0.8],
            opacity: [0, 0.5, 0],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Glowing Border with Different Animation */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2"
          style={{
            borderColor: isCardHovered ? '#cfff33' : 'rgba(175, 237, 0, 0.6)',
            boxShadow: isCardHovered 
              ? '0 0 35px rgba(175, 237, 0, 0.9), inset 0 0 35px rgba(175, 237, 0, 0.15)'
              : '0 0 20px rgba(175, 237, 0, 0.5)',
          }}
          animate={{
            boxShadow: isCardHovered 
              ? [
                  '0 0 35px rgba(175, 237, 0, 0.9), inset 0 0 35px rgba(175, 237, 0, 0.15)',
                  '0 0 50px rgba(207, 255, 51, 1), inset 0 0 35px rgba(175, 237, 0, 0.25)',
                  '0 0 35px rgba(175, 237, 0, 0.9), inset 0 0 35px rgba(175, 237, 0, 0.15)',
                ]
              : '0 0 20px rgba(175, 237, 0, 0.5)',
          }}
          transition={{
            duration: 1.5,
            repeat: isCardHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
        
        {/* Floating Orbs - Different movement pattern - Disabled on mobile */}
        <motion.div
          className="absolute top-16 right-16 w-36 h-36 rounded-full blur-3xl hidden md:block"
          style={{ backgroundColor: 'rgba(175, 237, 0, 0.25)' }}
          animate={!isMobile ? {
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            rotate: [0, 180, 360],
          } : {}}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-24 left-16 w-28 h-28 rounded-full blur-2xl hidden md:block"
          style={{ backgroundColor: 'rgba(207, 255, 51, 0.3)' }}
          animate={!isMobile ? {
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -25, 25, 0],
            y: [0, 25, -25, 0],
            rotate: [0, -180, -360],
          } : {}}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        
        {/* Energy Wave Effect - Different from shine - Static on mobile */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(175, 237, 0, 0.3) 0%, transparent 70%)',
          }}
          animate={!isMobile ? {
            scale: isCardHovered ? [1, 1.3, 1] : 1,
            opacity: isCardHovered ? [0.3, 0.6, 0.3] : 0.2,
          } : {
            opacity: 0.2,
            scale: 1,
          }}
          transition={{
            duration: 2,
            repeat: !isMobile && isCardHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
        
        {/* Content */}
        <div className="w-full h-full p-4 md:p-8 relative z-10 flex flex-col items-center justify-center">
          {/* Logo/Image */}
          <motion.div
            className="relative mb-4"
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: index * 0.3 + 0.2, duration: 1, type: "spring", bounce: 0.5 }}
            whileHover={{ scale: 1.15, rotate: 10 }}
          >
            <motion.div
              className="absolute inset-0 blur-3xl rounded-full"
              style={{ backgroundColor: 'rgba(175, 237, 0, 0.4)' }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Image
              src="/doon.png"
              alt={card.title}
              width={120}
              height={120}
              className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-[0_0_25px_rgba(175,237,0,0.8)]"
            />
          </motion.div>
          
          {/* Title */}
          {card?.title && (
            <motion.p
              className="!text-base sm:!text-xl md:!text-3xl font-bold text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={displayShow ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.3 + 0.5, duration: 0.8 }}
              style={{
                textShadow: '0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(175, 237, 0, 0.6), 0 0 60px rgba(175, 237, 0, 0.4)',
              }}
            >
              {card.title}
            </motion.p>
          )}
        </div>
        
        {/* Description Panel */}
        <div className="absolute bottom-0 left-[100%] transition-all ease-in-out duration-500 delay-100 group-hover:left-0 w-full h-full flex items-center p-6 !font-normal backdrop-blur-md border-t"
          style={{ 
            backgroundColor: 'rgba(122, 184, 0, 0.85)',
            borderColor: 'rgba(175, 237, 0, 0.6)',
          }}
        >
          {card?.description && (
            <motion.p
              className="!text-sm text-white"
              initial={{ opacity: 0, x: 20 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {card.description}
            </motion.p>
          )}
        </div>
        
        {/* Read More */}
        <div className="w-full absolute bottom-4 md:bottom-[-60px] left-0 transition-all ease-in-out duration-500 delay-100 md:group-hover:bottom-0 text-right p-6">
          <motion.div
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from firing
              onOpenModal(card);
            }}
            className="relative !text-xs z-50 font-bold text-right cursor-pointer md:cursor-pointer"
            style={{ color: '#cfff33' }}
            whileHover={{ scale: 1.1, color: '#e5ff66' }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px] before:bg-[#cfff33] before:scale-x-0 before:transition-transform before:duration-200 hover:before:scale-x-100 hover:before:origin-left before:origin-right before:shadow-[0_0_10px_rgba(207,255,51,1)]">
              Read More
            </span>
            <motion.span
              className="ml-2 inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const CardWithParticles = ({ isInView, delay, onOpenModal }: { isInView: boolean; delay: number; onOpenModal: (project: ProjectData) => void }) => {
  const [init, setInit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Get Brave project data
  const braveProject: ProjectData = data.find(p => p.title === "Brave Connective") || data[1];

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div
      className="w-[310px] h-[350px] sm:w-[300px] sm:h-[400px] md:w-[350px] md:h-[500px] group transition-all ease-in-out duration-300 hover:scale-105 cursor-pointer md:cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // On mobile, clicking the card opens the modal
        if (window.innerWidth < 768) {
          onOpenModal(braveProject);
        }
      }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 2,
          delay: delay,
        }}
        className="relative h-full w-full overflow-hidden rounded-lg"
        ref={containerRef}
      >
        {/* Black Background */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
        
        {/* Animated Scan Line */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(20, 184, 166, 0.1) 50%, transparent 100%)',
          }}
          animate={{
            y: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Glowing Border with Animation */}
        <motion.div
          className={`absolute inset-0 rounded-lg border-2 ${
            isHovered 
              ? "border-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.8),inset_0_0_30px_rgba(20,184,166,0.1)]" 
              : "border-teal-500/40 shadow-[0_0_15px_rgba(20,184,166,0.4)]"
          }`}
          animate={{
            boxShadow: isHovered 
              ? [
                  '0 0 30px rgba(20,184,166,0.8), inset 0 0 30px rgba(20,184,166,0.1)',
                  '0 0 40px rgba(20,184,166,1), inset 0 0 30px rgba(20,184,166,0.2)',
                  '0 0 30px rgba(20,184,166,0.8), inset 0 0 30px rgba(20,184,166,0.1)',
                ]
              : '0 0 15px rgba(20,184,166,0.4)',
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-teal-500/10 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-teal-400/10 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        
        {/* Particle Effect - Contained within card */}
        {init && containerRef.current && (
          <div className="absolute inset-0 z-0 overflow-hidden rounded-lg">
            <Particles
              id={`card-particles-${delay}`}
              className="w-full h-full"
              options={{
                fullScreen: {
                  enable: false,
                },
                background: {
                  color: {
                    value: "transparent",
                  },
                },
                fpsLimit: 120,
                interactivity: {
                  events: {
                    onHover: {
                      enable: true,
                      mode: isHovered ? "repulse" : "grab",
                    },
                    onClick: {
                      enable: true,
                      mode: "push",
                    },
                  },
                  modes: {
                    repulse: {
                      distance: 120,
                      duration: 0.4,
                    },
                    grab: {
                      distance: 180,
                      links: {
                        opacity: 0.4,
                        blink: true,
                      },
                    },
                    push: {
                      quantity: 3,
                    },
                  },
                },
                particles: {
                  color: {
                    value: ["#14b8a6", "#0d9488", "#2dd4bf", "#5eead4", "#0f766e", "#99f6e4"],
                  },
                  links: {
                    color: "#14b8a6",
                    distance: 150,
                    enable: true,
                    opacity: isHovered ? 0.9 : 0.5,
                    width: isHovered ? 2 : 1.5,
                    triangles: {
                      enable: true,
                      opacity: 0.15,
                    },
                  },
                  move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                      default: "bounce",
                    },
                    random: false,
                    speed: isHovered ? 3 : 1.5,
                    straight: false,
                  },
                  number: {
                    density: {
                      enable: true,
                    },
                    value: isHovered ? 120 : 80,
                  },
                  opacity: {
                    value: { min: 0.4, max: 1 },
                    animation: {
                      enable: true,
                      speed: 1,
                      sync: false,
                      destroy: "none",
                    },
                  },
                  shape: {
                    type: "circle",
                  },
                  size: {
                    value: { min: 2, max: 6 },
                    animation: {
                      enable: true,
                      speed: 4,
                      sync: false,
                      destroy: "none",
                    },
                  },
                  twinkle: {
                    particles: {
                      enable: true,
                      frequency: 0.05,
                      opacity: 1,
                    },
                  },
                },
                detectRetina: true,
              }}
            />
          </div>
        )}

        {/* Shine Effect on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 pointer-events-none"
          animate={{
            x: isHovered ? ["-200%", "200%"] : "-200%",
            opacity: isHovered ? [0, 0.3, 0] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 2,
          }}
        />

        {/* Content */}
        <div className="w-full h-full p-4 md:p-8 relative z-10 flex flex-col items-center justify-center">
          {/* Centered Logo */}
          <motion.div
            className="relative mb-4"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: delay + 0.3, duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <motion.div
              className="absolute inset-0 bg-teal-400/20 blur-2xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Image
              src="/white_brave.png"
              alt="Brave Connective Logo"
              width={120}
              height={120}
              className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-[0_0_20px_rgba(20,184,166,0.6)]"
            />
          </motion.div>
          
          {/* Title */}
          <motion.p
            className="!text-base sm:!text-xl md:!text-3xl font-bold text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay + 0.5, duration: 0.8 }}
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(20,184,166,0.3)',
            }}
          >
            Brave Connective
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-[100%] transition-all ease-in-out duration-500 delay-100 group-hover:left-0 w-full h-full flex items-center p-6 !font-normal bg-black/80 backdrop-blur-md border-t border-teal-500/50">
          <motion.p
            className="!text-sm text-white"
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            Powers the future of business through data, storytelling, messaging, and customer engagement solutions. Uniting AdSpark, m360, and Inquiro to bring brands closer to their customers.
          </motion.p>
        </div>
        <div className="w-full absolute bottom-4 md:bottom-[-60px] left-0 transition-all ease-in-out duration-500 delay-100 md:group-hover:bottom-0 text-right p-6">
          <motion.div
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from firing
              if (window.innerWidth < 768) {
                onOpenModal(braveProject);
              } else {
                window.open("https://www.braveconnective.ph/", "_blank", "noopener,noreferrer");
              }
            }}
            className="relative !text-xs z-50 text-teal-300 font-bold text-right cursor-pointer"
            whileHover={{ scale: 1.1, color: '#5eead4' }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px] before:bg-teal-400 before:scale-x-0 before:transition-transform before:duration-200 hover:before:scale-x-100 hover:before:origin-left before:origin-right before:shadow-[0_0_8px_rgba(20,184,166,1)]">
              Read More
            </span>
            <motion.span
              className="ml-2 inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const CraftedCatalystCard = ({ isInView, delay, onOpenModal }: { isInView: boolean; delay: number; onOpenModal: (project: ProjectData) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Get Crafted Catalyst project data
  const craftedProject: ProjectData = data.find(p => p.title === "Crafted Catalyst") || data[1];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className="w-[310px] h-[350px] sm:w-[300px] sm:h-[400px] md:w-[350px] md:h-[500px] group transition-all ease-in-out duration-300 md:hover:scale-105 cursor-pointer md:cursor-default"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={() => {
        if (isMobile) {
          onOpenModal(craftedProject);
        }
      }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 2,
          delay: delay,
        }}
        className="relative h-full w-full overflow-hidden rounded-lg"
      >
        {/* Soft Gradient Background - Matching website theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50" />
        
        {/* Circuit Board Pattern Background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(20, 184, 166, 0.15) 2px, transparent 2px),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 2px, transparent 2px),
            radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 2px, transparent 2px),
            linear-gradient(rgba(20, 184, 166, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.08) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 80px 80px, 100px 100px, 30px 30px, 30px 30px, 50px 50px, 50px 50px',
          backgroundPosition: '0 0, 100% 100%, 50% 50%, 0 0, 0 0, 0 0, 0 0',
        }} />
        
        {/* Geometric Shapes - Network Nodes */}
        {!isMobile && (
          <>
            {[...Array(6)].map((_, i) => {
              const positions = [
                { left: '15%', top: '20%' },
                { left: '85%', top: '25%' },
                { left: '20%', top: '75%' },
                { left: '80%', top: '70%' },
                { left: '50%', top: '15%' },
                { left: '50%', top: '85%' },
              ];
              return (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full hidden md:block"
                  style={{
                    left: positions[i].left,
                    top: positions[i].top,
                    backgroundColor: i % 2 === 0 ? 'rgba(20, 184, 166, 0.4)' : 'rgba(59, 130, 246, 0.4)',
                    boxShadow: `0 0 8px ${i % 2 === 0 ? 'rgba(20, 184, 166, 0.6)' : 'rgba(59, 130, 246, 0.6)'}`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                />
              );
            })}
          </>
        )}
        
        {/* Connecting Lines Between Nodes */}
        {!isMobile && (
          <svg className="absolute inset-0 w-full h-full hidden md:block" style={{ opacity: 0.2 }}>
            <motion.line
              x1="15%"
              y1="20%"
              x2="50%"
              y2="15%"
              stroke="rgba(20, 184, 166, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.line
              x1="85%"
              y1="25%"
              x2="50%"
              y2="15%"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
            />
            <motion.line
              x1="20%"
              y1="75%"
              x2="50%"
              y2="85%"
              stroke="rgba(20, 184, 166, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
            />
            <motion.line
              x1="80%"
              y1="70%"
              x2="50%"
              y2="85%"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
            />
          </svg>
        )}
        
        {/* Concentric Circles Pattern */}
        {!isMobile && (
          <>
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute top-1/2 left-1/2 rounded-full border hidden md:block"
                style={{
                  width: `${ring * 40}%`,
                  height: `${ring * 40}%`,
                  borderColor: `rgba(20, 184, 166, ${0.1 / ring})`,
                  borderWidth: '1px',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.1 / ring, 0.15 / ring, 0.1 / ring],
                }}
                transition={{
                  duration: 4 + ring,
                  repeat: Infinity,
                  delay: ring * 0.5,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </>
        )}
        
        {/* Soft Glow Effects */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl hidden md:block"
              style={{ backgroundColor: 'rgba(20, 184, 166, 0.2)' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-32 h-32 rounded-full blur-2xl hidden md:block"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2],
                x: [0, -15, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full blur-xl hidden md:block"
              style={{ 
                backgroundColor: 'rgba(147, 51, 234, 0.15)',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
          </>
        )}
        
        {/* Clean Border with Subtle Glow */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2"
          style={{
            borderColor: isHovered ? '#14b8a6' : 'rgba(20, 184, 166, 0.25)',
            boxShadow: isHovered 
              ? '0 0 30px rgba(20, 184, 166, 0.4), inset 0 0 30px rgba(20, 184, 166, 0.05)'
              : '0 0 15px rgba(20, 184, 166, 0.15)',
          }}
          animate={!isMobile ? {
            boxShadow: isHovered 
              ? [
                  '0 0 30px rgba(20, 184, 166, 0.4), inset 0 0 30px rgba(20, 184, 166, 0.05)',
                  '0 0 40px rgba(20, 184, 166, 0.5), inset 0 0 30px rgba(20, 184, 166, 0.08)',
                  '0 0 30px rgba(20, 184, 166, 0.4), inset 0 0 30px rgba(20, 184, 166, 0.05)',
                ]
              : '0 0 15px rgba(20, 184, 166, 0.15)',
          } : {}}
          transition={{
            duration: 2,
            repeat: !isMobile && isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
        
        {/* Content */}
        <div className="w-full h-full p-4 md:p-8 relative z-10 flex flex-col items-center justify-center">
          {/* Centered Logo */}
          <motion.div
            className="relative mb-4"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: delay + 0.3, duration: 0.8, type: "spring" }}
            whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : {}}
          >
            <motion.div
              className="absolute inset-0 blur-2xl rounded-full"
              style={{ backgroundColor: 'rgba(20, 184, 166, 0.2)' }}
              animate={!isMobile ? {
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              } : {
                scale: 1,
                opacity: 0.2,
              }}
              transition={{
                duration: 3,
                repeat: !isMobile ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
            <Image
              src="/crafted-catalyst.svg"
              alt="Crafted Catalyst Logo"
              width={120}
              height={120}
              className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-[0_0_20px_rgba(20,184,166,0.4)]"
            />
          </motion.div>
          
          {/* Title */}
          <motion.p
            className="!text-base sm:!text-xl md:!text-3xl font-bold text-gray-800 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay + 0.5, duration: 0.8 }}
            style={{
              textShadow: '0 0 10px rgba(255,255,255,0.5)',
            }}
          >
            Crafted Catalyst
          </motion.p>
        </div>
        
        {/* Description Panel */}
        <div className="absolute bottom-0 left-[100%] transition-all ease-in-out duration-500 delay-100 md:group-hover:left-0 w-full h-full flex items-center p-6 !font-normal backdrop-blur-md border-t"
          style={{ 
            backgroundColor: 'rgba(20, 184, 166, 0.85)',
            borderColor: 'rgba(20, 184, 166, 0.6)',
          }}
        >
          <motion.p
            className="!text-sm text-white"
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {craftedProject.description}
          </motion.p>
        </div>
        
        {/* Read More */}
        <div className="w-full absolute bottom-4 md:bottom-[-60px] left-0 transition-all ease-in-out duration-500 delay-100 md:group-hover:bottom-0 text-right p-6">
          <motion.div
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from firing
              onOpenModal(craftedProject);
            }}
            className="relative !text-xs z-50 font-bold text-right cursor-pointer"
            style={{ color: '#5eead4' }}
            whileHover={{ scale: 1.1, color: '#99f6e4' }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px] before:bg-teal-400 before:scale-x-0 before:transition-transform before:duration-200 hover:before:scale-x-100 hover:before:origin-left before:origin-right before:shadow-[0_0_8px_rgba(20,184,166,1)]">
              Read More
            </span>
            <motion.span
              className="ml-2 inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const AspireCard = ({ isInView, delay, onOpenModal }: { isInView: boolean; delay: number; onOpenModal: (project: ProjectData) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get Aspire project data
  const aspireProject: ProjectData = data.find(p => p.title === "Aspire") || data[2];

  return (
    <div
      className="w-[310px] h-[350px] sm:w-[300px] sm:h-[400px] md:w-[350px] md:h-[500px] group transition-all ease-in-out duration-300 hover:scale-105 cursor-pointer md:cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // On mobile, clicking the card opens the modal
        if (window.innerWidth < 768) {
          onOpenModal(aspireProject);
        }
      }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 2,
          delay: delay,
        }}
        className="relative h-full w-full overflow-hidden rounded-lg"
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/home.mp4" type="video/mp4" />
        </video>
        
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-[#005587]/45 group-hover:bg-[#005587]/55 transition-all duration-300" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#005587]/35 via-[#003d66]/35 to-[#001f33]/35" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 85, 135, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 85, 135, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
        
        {/* Animated Scan Line */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 85, 135, 0.2) 50%, transparent 100%)',
          }}
          animate={{
            y: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Glowing Border with Animation */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2"
          style={{
            borderColor: isHovered ? '#0088cc' : 'rgba(0, 85, 135, 0.6)',
            boxShadow: isHovered 
              ? '0 0 30px rgba(0, 136, 204, 0.8), inset 0 0 30px rgba(0, 136, 204, 0.1)'
              : '0 0 15px rgba(0, 85, 135, 0.4)',
          }}
          animate={{
            boxShadow: isHovered 
              ? [
                  '0 0 30px rgba(0, 136, 204, 0.8), inset 0 0 30px rgba(0, 136, 204, 0.1)',
                  '0 0 40px rgba(0, 136, 204, 1), inset 0 0 30px rgba(0, 136, 204, 0.2)',
                  '0 0 30px rgba(0, 136, 204, 0.8), inset 0 0 30px rgba(0, 136, 204, 0.1)',
                ]
              : '0 0 15px rgba(0, 85, 135, 0.4)',
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full blur-2xl"
          style={{ backgroundColor: 'rgba(0, 136, 204, 0.15)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-24 h-24 rounded-full blur-xl"
          style={{ backgroundColor: 'rgba(0, 136, 204, 0.2)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        
        {/* Shine Effect on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 pointer-events-none"
          animate={{
            x: isHovered ? ["-200%", "200%"] : "-200%",
            opacity: isHovered ? [0, 0.3, 0] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 2,
          }}
        />
        
        {/* Content */}
        <div className="w-full h-full p-4 md:p-8 relative z-10 flex flex-col items-center justify-center">
          {/* Centered Logo */}
          <motion.div
            className="relative mb-4"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: delay + 0.3, duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <motion.div
              className="absolute inset-0 blur-2xl rounded-full"
              style={{ backgroundColor: 'rgba(0, 136, 204, 0.3)' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Image
              src="/aspire.png"
              alt="Aspire Logo"
              width={120}
              height={120}
              className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-[0_0_20px_rgba(0,136,204,0.6)]"
            />
          </motion.div>
          
          {/* Title */}
          <motion.p
            className="!text-base sm:!text-xl md:!text-3xl font-bold text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay + 0.5, duration: 0.8 }}
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(0, 136, 204, 0.4)',
            }}
          >
            Aspire
          </motion.p>
        </div>
        
        {/* Description Panel */}
        <div className="absolute bottom-0 left-[100%] transition-all ease-in-out duration-500 delay-100 group-hover:left-0 w-full h-full flex items-center p-6 !font-normal backdrop-blur-md border-t"
          style={{ 
            backgroundColor: 'rgba(0, 61, 102, 0.8)',
            borderColor: 'rgba(0, 136, 204, 0.5)',
          }}
        >
          <motion.p
            className="!text-sm text-white"
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            Homes tailored for urban professionals and upwardly mobile families. Featuring themed residential subdivisions, resort-style condos, and high-rise living spaces with future-forward design principles.
          </motion.p>
        </div>
        
        {/* Read More */}
        <div className="w-full absolute bottom-4 md:bottom-[-60px] left-0 transition-all ease-in-out duration-500 delay-100 md:group-hover:bottom-0 text-right p-6">
          <motion.div
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from firing
              if (window.innerWidth < 768) {
                onOpenModal(aspireProject);
              } else {
                window.open("https://aspirebyfilinvest.com/", "_blank", "noopener,noreferrer");
              }
            }}
            className="relative !text-xs z-50 font-bold text-right cursor-pointer"
            style={{ color: '#66b3ff' }}
            whileHover={{ scale: 1.1, color: '#99ccff' }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px] before:bg-[#0088cc] before:scale-x-0 before:transition-transform before:duration-200 hover:before:scale-x-100 hover:before:origin-left before:origin-right before:shadow-[0_0_8px_rgba(0,136,204,1)]">
              Read More
            </span>
            <motion.span
              className="ml-2 inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function BasicCards() {
  const cardsRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(cardsRef, { once: true });
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Fallback: ensure content is visible even if intersection observer doesn't trigger
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInView && !hasAnimated) {
        setHasAnimated(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [isInView, hasAnimated]);

  const shouldShow = isInView || hasAnimated;

  const router = useRouter();

  const handleOpenModal = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay before clearing project to allow exit animation
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <div
        ref={cardsRef}
        className="flex z-100 flex-col m-auto max-w-[1400px] w-full px-6 md:px-14 py-0 md:py-20 pb-20"
      >
        <p className="text-4xl font-bold text-center text-white my-20 ">
          My Recent Works
        </p>
        <div className="flex flex-wrap m-auto justify-center gap-14">
          {data.filter(card => card.title === "Doon.ph").map((card, index) => (
            <ImageCard
              key={index}
              card={card}
              index={index}
              isInView={isInView}
              onOpenModal={handleOpenModal}
              shouldShow={shouldShow}
            />
          ))}
        <CardWithParticles
          isInView={shouldShow}
          delay={1 * 0.3}
          onOpenModal={handleOpenModal}
        />
        <AspireCard
          isInView={shouldShow}
          delay={2 * 0.3}
          onOpenModal={handleOpenModal}
        />
        <CraftedCatalystCard
          isInView={shouldShow}
          delay={3 * 0.3}
          onOpenModal={handleOpenModal}
        />
      </div>
    </div>

    {/* Project Modal - Rendered outside card hierarchy */}
    <ProjectModal
      project={selectedProject}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
    />
    </>
  );
}
