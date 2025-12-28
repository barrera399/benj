'use client'

import { motion, useInView } from 'framer-motion'
import React from 'react'

export default function About() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = React.useState(false)

  // Fallback: ensure content is visible even if intersection observer doesn't trigger
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInView && !hasAnimated) {
        setHasAnimated(true)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [isInView, hasAnimated])

  const shouldShow = isInView || hasAnimated

  return (
    <div
      ref={containerRef}
      id="about"
      className="w-full max-w-[1280px] min-h-[50vh] m-auto z-100 flex flex-col py-14 px-6 md:px-16 relative"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={shouldShow ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold font-bebas-neue text-white mb-16 text-center relative z-10"
      >
        About Me
      </motion.h1>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={shouldShow ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Glowing Border Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 rounded-2xl opacity-20 blur-lg"></div>
          
          <div className="relative bg-black/80 backdrop-blur-sm border border-teal-400/30 rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Animated Background Gradient */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(20, 184, 166, 0.3), transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(20, 184, 166, 0.3), transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(20, 184, 166, 0.3), transparent 50%)',
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative z-10 space-y-6">
              {/* Opening Statement */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="border-l-4 border-teal-400 pl-6"
              >
                <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                  I'm <span className="text-teal-400">Joseph Benjamin Barrera</span>
                </p>
                <p className="text-lg text-gray-300">
                  A dedicated and results-driven software engineer from Tarlac, Philippines
                </p>
              </motion.div>

              {/* Main Content */}
              <div className="space-y-6 text-white">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={shouldShow ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl leading-relaxed text-gray-200"
                >
                  With extensive experience in full-stack development, database architecture, and innovative technology integration, 
                  I've built my career on delivering high-quality, user-focused solutions that drive real impact. 
                  My journey in software development began in <span className="text-teal-400 font-semibold">2021</span>, and through dedication 
                  and rapid learning, I've advanced to a <span className="text-teal-400 font-semibold">mid-senior level developer</span>.
                </motion.p>

                {/* <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={shouldShow ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg md:text-xl leading-relaxed text-gray-200"
                >
                  Currently serving as <span className="text-teal-400 font-semibold">Fullstack Lead Developer at Sandlot Technology Ventures, Inc.</span>, 
                  I've successfully developed and launched a comprehensive car rental CRM system that facilitates seamless interactions 
                  between hosts and guests. This system has driven <span className="text-teal-400 font-semibold">substantial revenue growth</span>, 
                  demonstrating its value as a reliable and profitable solution.
                </motion.p> */}

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={shouldShow ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg md:text-xl leading-relaxed text-gray-200"
                >
                  What drives me as a developer is the constant challenge of solving complex problems and building solutions that make a real impact. 
                  I love leveraging modern technologies, including <span className="text-teal-400 font-semibold">AI tools</span>, to maximize productivity 
                  and deliver innovative, high-quality applications. I'm particularly passionate about creating systems that are not just functional, 
                  but also <span className="text-teal-400 font-semibold">scalable, maintainable, and user-friendly</span>.
                </motion.p>
              </div>

              {/* Quote Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-10 pt-8 border-t border-teal-400/20"
              >
                <div className="relative">
                  <div className="absolute -top-4 left-0 text-6xl text-teal-400/20 font-serif">"</div>
                  <p className="text-xl md:text-2xl text-teal-400 font-semibold italic pl-8 relative z-10">
                    Building scalable solutions that drive impact, one line of code at a time.
                  </p>
                  <div className="absolute -bottom-4 right-0 text-6xl text-teal-400/20 font-serif">"</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

