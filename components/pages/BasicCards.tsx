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

const data = [
  {
    title: "Doon.ph",
    description:
      "We build custom applications to meet your specific needs. Whether you need a simple website or a complex application, we can help you.",
    image: "/doon-cover.png",
  },

  // {
  //     title: "AI Integration",
  //     description: "We build custom applications to meet your specific needs. Whether you need a simple website or a complex application, we can help you.",
  //     image:"/p2.png",

  // }
  // ,

  // {
  //     title: "Portfolio\nWebsite",
  //     description: "We build custom applications to meet your specific needs. Whether you need a simple website or a complex application, we can help you.",
  //     image:"/p3.webp",

  // }
];

const ImageCard = ({ card, index, isInView }: { card: typeof data[0]; index: number; isInView: boolean }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <div
      className="w-[310px] h-[100px] rounded-lg sm:w-[300px] sm:h-[400px] md:w-[350px] md:h-[500px] group transition-all ease-in-out duration-300 hover:scale-105"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
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
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
          src="/doon-cover.png"
          alt="Doon Cover"
        />
        
        {/* Green Overlay */}
        <div className="absolute inset-0 bg-[#afed00]/25 group-hover:bg-[#afed00]/35 transition-all duration-300" />
        
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
        
        {/* Radial Scan Effect - Different from linear scan */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, transparent 0%, rgba(175, 237, 0, 0.15) 50%, transparent 100%)',
          }}
          animate={{
            scale: [0.8, 1.5, 0.8],
            opacity: [0, 0.5, 0],
          }}
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
        
        {/* Floating Orbs - Different movement pattern */}
        <motion.div
          className="absolute top-16 right-16 w-36 h-36 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(175, 237, 0, 0.25)' }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-24 left-16 w-28 h-28 rounded-full blur-2xl"
          style={{ backgroundColor: 'rgba(207, 255, 51, 0.3)' }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -25, 25, 0],
            y: [0, 25, -25, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        
        {/* Energy Wave Effect - Different from shine */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(175, 237, 0, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: isCardHovered ? [1, 1.3, 1] : 1,
            opacity: isCardHovered ? [0.3, 0.6, 0.3] : 0.2,
          }}
          transition={{
            duration: 2,
            repeat: isCardHovered ? Infinity : 0,
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
              animate={isInView ? { opacity: 1, y: 0 } : {}}
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
        <div className="w-full absolute bottom-[-60px] left-0 transition-all ease-in-out duration-500 delay-100 group-hover:bottom-0 text-right p-6">
          <motion.div
            className="relative !text-xs z-50 font-bold text-right cursor-pointer"
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

const CardWithParticles = ({ isInView, delay }: { isInView: boolean; delay: number }) => {
  const [init, setInit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div
      className="w-[310px] h-[100px] sm:w-[300px] sm:h-[400px] md:w-[350px] md:h-[500px] group transition-all ease-in-out duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            Innovative solutions connecting technology and creativity to build the future.
          </motion.p>
        </div>
        <div className="w-full absolute bottom-[-60px] left-0 transition-all ease-in-out duration-500 delay-100 group-hover:bottom-0 text-right p-6">
          <motion.div
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

const AspireCard = ({ isInView, delay }: { isInView: boolean; delay: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-[310px] h-[100px] sm:w-[300px] sm:h-[400px] md:w-[350px] md:h-[500px] group transition-all ease-in-out duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            Elevating your vision with innovative solutions and cutting-edge technology.
          </motion.p>
        </div>
        
        {/* Read More */}
        <div className="w-full absolute bottom-[-60px] left-0 transition-all ease-in-out duration-500 delay-100 group-hover:bottom-0 text-right p-6">
          <motion.div
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
  const isInView = useInView(cardsRef, { once: false });

  const router = useRouter();

  return (
    <div
      id="contact"
      ref={cardsRef}
      className="flex z-100 flex-col m-auto max-w-[1400px] w-full px-6 md:px-14 py-0 md:py-20 pb-20"
    >
      <p className="text-4xl font-bold text-center text-white my-20 ">
        My Recent Work
      </p>
      <div className="flex flex-wrap m-auto justify-center gap-14">
        {data.map((card, index) => (
          <ImageCard
            key={index}
            card={card}
            index={index}
            isInView={isInView}
          />
        ))}
        <CardWithParticles
          isInView={isInView}
          delay={2 * 0.3}
        />
        <AspireCard
          isInView={isInView}
          delay={3 * 0.3}
        />
      </div>
    </div>
  );
}
