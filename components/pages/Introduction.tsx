"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import LayoutSmoothScroll from "@/components/globals/LayoutSmoothScroll";

const roles = [
  "Full Stack Developer",
  "Problem Solver",
  "Tech Enthusiast",
];
const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Python",
  "AWS",
  "MongoDB",
  "PostgreSQL",
  "Supabase",
  "Docker",
  "Kubernetes",
];

// Duplicate array for seamless infinite scroll
const duplicatedTechStack = [...techStack, ...techStack, ...techStack];

export default function Introduction() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[currentRole];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length < current.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayText(current.substring(0, displayText.length + 1));
      }, 100);
    } else if (!isDeleting && displayText.length === current.length) {
      // Pause at end
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(current.substring(0, displayText.length - 1));
      }, 50);
    } else if (isDeleting && displayText.length === 0) {
      // Move to next role
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="relative z-100 w-full text-white overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            x: [0, 50],
            y: [0, 50],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="fixed top-20 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl pointer-events-none z-0"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none z-0"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Scrollable Content with Smooth Scroll */}

      {/* Split Screen Layout */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Image Section */}
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center p-8 mt-20 md:mt-0 md:p-12 lg:p-16 relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="relative group max-w-md w-full"
            variants={itemVariants}
            transition={{ duration: 1, ease: "easeOut" }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Outer Glow Ring */}
            <motion.div
              className="absolute -inset-8 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 opacity-60 blur-3xl group-hover:opacity-80 transition-opacity duration-500"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
            />

            {/* Animated Border Rings */}
            <motion.div
              className="absolute -inset-4 rounded-full border-2 border-teal-400/60"
              animate={{
                rotate: [0, -360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Image Container */}
            <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-teal-400/40 shadow-[0_0_60px_rgba(20,184,166,0.4)]">
              <Image
                src="/cv-profile2.JPG"
                alt="Joseph"
                fill
                className="object-cover object-top scale-[1.2] rounded-full"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 rounded-full" />
            </div>

            {/* Floating Particles Around Image */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-teal-400 rounded-full"
                style={{
                  top: `${Math.cos((i * Math.PI * 2) / 8) * 120 + 50}%`,
                  left: `${Math.sin((i * Math.PI * 2) / 8) * 120 + 50}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.8, 1],
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Text Content */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-start justify-center p-8 md:p-12 lg:p-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-4"
          >
            <motion.span
              className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Hello, I am
            </motion.span>
          </motion.div>

          {/* Name with Glitch Effect */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 md:mb-8 relative inline-block"
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="relative inline-block">
                <span className="absolute inset-0 text-teal-400 blur-sm opacity-75">
                  Joseph
                </span>
                <span className="relative text-white">Joseph</span>
              </span>
            </motion.h1>
          </motion.div>

          {/* Role Typing Animation */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10 md:mb-12 h-16 md:h-20 lg:h-24 flex items-center"
          >
            <div className="text-2xl md:text-4xl lg:text-5xl font-semibold">
              <span className="text-gray-400">I am a </span>
              <span className="text-teal-400 italic relative">
                {displayText}
                <motion.span
                  className="inline-block w-1 h-8 md:h-12 lg:h-14 bg-teal-400 ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-6 md:gap-8 mb-8"
          >
            {[
              { label: "Projects", value: "20+", icon: "🚀" },
              { label: "Experience", value: "5+", icon: "💼" },
              { label: "Technologies", value: "20+", icon: "⚡" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-left"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Resume Download Button */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12"
          >
            <Link
              href="/Joseph Benjamin Barrera - Resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-3 px-6 py-3 bg-teal-400 hover:bg-teal-500 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-teal-400/50 hover:scale-105"
            >
              <FaDownload className="w-5 h-5" />
              <span>Resume</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Infinite Tech Stack Carousel */}
      <motion.div
        className="relative z-20 py-8 overflow-hidden w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        {/* Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-30 pointer-events-none" />

        <div className="relative flex">
          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{
              x: [0, -(techStack.length * 216)], // Move by one set (item width + gap)
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              display: "flex",
              width: "max-content",
            }}
          >
            {duplicatedTechStack.map((tech, index) => (
              <div
                key={`carousel-${tech}-${index}`}
                className="group relative shrink-0"
              >
                <div
                  className="relative px-6 py-3 md:px-8 md:py-4 bg-black/60 backdrop-blur-md border border-teal-400/40 rounded-full 
                              hover:border-teal-400 hover:shadow-[0_0_25px_rgba(20,184,166,0.6)] 
                              transition-all duration-300 overflow-hidden whitespace-nowrap min-w-[160px] md:min-w-[200px] text-center"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/30 to-teal-400/0 
                                -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                  <span className="relative text-base md:text-lg text-gray-200 group-hover:text-teal-400 transition-colors duration-300 font-medium">
                    {tech}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div> 

      {/* Scroll Indicator */}
      {/* <motion.div
        className="relative z-30 flex items-center justify-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500">Scroll</span>
          <motion.div
            className="w-6 h-10 border-2 border-teal-400/50 rounded-full flex justify-center p-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-teal-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div> */}

      {/* Decorative Code Lines */}
      <div className="relative h-32 overflow-hidden opacity-5 pointer-events-none">
        <div className="font-mono text-xs md:text-sm text-teal-400 whitespace-nowrap">
          {'const developer = { name: "Joseph", passion: "Building amazing things" };'.repeat(
            10
          )}
        </div>
      </div>
    </div>
  );
}
