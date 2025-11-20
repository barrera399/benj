'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = ["Full Stack Developer", "Problem Solver", "Code Architect", "Tech Enthusiast"];
const techStack = ["React", "Next.js", "Node.js", "TypeScript", "Python", "AWS"];

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
    <div className="relative z-100 flex flex-col items-center justify-center min-h-screen w-full text-white overflow-hidden px-4 md:px-8">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
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
        className="absolute top-20 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl"
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
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"
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

      <motion.div
        className="relative z-10 max-w-5xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <motion.span
            className="text-4xl md:text-5xl font-light text-gray-400"
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
          className="mb-8 relative inline-block"
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 text-teal-400 blur-sm opacity-75">Joseph</span>
              <span className="relative text-white">Joseph</span>
            </span>
          </motion.h1>
        </motion.div>

        {/* Role Typing Animation */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 h-16 md:h-20 flex items-center justify-center"
        >
          <div className="text-2xl md:text-4xl lg:text-5xl font-semibold">
            <span className="text-gray-400">I am a </span>
            <span className="text-teal-400 italic relative">
              {displayText}
              <motion.span
                className="inline-block w-1 h-8 md:h-12 bg-teal-400 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </div>
        </motion.div>

        {/* Tech Stack Tags */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
            >
              <div className="relative px-4 py-2 bg-black/40 backdrop-blur-md border border-teal-400/30 rounded-full 
                            hover:border-teal-400 hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] 
                            transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/20 to-teal-400/0 
                              -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative text-sm md:text-base text-gray-300 group-hover:text-teal-400 transition-colors duration-300">
                  {tech}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Stats or CTA */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-12"
        >
          {[
            { label: "Projects", value: "50+", icon: "🚀" },
            { label: "Experience", value: "5+", icon: "💼" },
            { label: "Technologies", value: "20+", icon: "⚡" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-1">{stat.value}</div>
              <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
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
        </motion.div>
      </motion.div>

      {/* Decorative Code Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-5 pointer-events-none">
        <div className="font-mono text-xs md:text-sm text-teal-400 whitespace-nowrap">
          {'const developer = { name: "Joseph", passion: "Building amazing things" };'.repeat(10)}
        </div>
      </div>
    </div>
  );
}
