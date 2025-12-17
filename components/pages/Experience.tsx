'use client'

import { motion, useInView } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/utils'

const experienceData = [
  {
    year: "2022",
    yearRange: "2022",
    title: "Klaudsol Inc",
    description: "Software Development Intern. Developed customized Headless CMS (Content Management System) solutions for multiple websites, gaining hands-on experience in full-stack development and client project delivery.",
    column: "left"
  },
  {
    year: "2022",
    yearRange: "2022 - early 2023",
    title: "Freelance",
    description: "Full Stack Developer. Specialized in feature implementation and bug fixing across diverse projects, working with various tech stacks and frameworks. Delved into different technologies. Gained extensive experience adapting to different codebases and implementing solutions that meet specific project requirements.",
    column: "right"
  },
  {
    year: "2023",
    yearRange: "2023",
    title: "Project Grey",
    description: "Full Stack Developer. Worked on end-to-end development of web applications, implementing both frontend and backend solutions while collaborating with cross-functional teams to deliver high-quality software products.",
    column: "left"
  },
  {
    year: "2024",
    yearRange: "2024 - Present",
    title: "Sandlot Inc (formerly AHG Lab)",
    description: "Full Stack Developer. Working on multiple projects, developing diverse web applications and systems for various clients. Utilizing modern technologies and best practices to build scalable and efficient solutions. Leveraging AI tools and technologies to maximize productivity and deliver high-quality, innovative applications.",
    column: "left"
  }
]

export default function Experience() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[1280px] min-h-[50vh] m-auto z-100 flex flex-col py-14 px-6 md:px-16"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold font-bebas-neue text-white mb-16"
      >
        Experience
      </motion.h1>

      <div className="w-full flex flex-col max-w-4xl relative">
        {/* Mobile vertical line */}
        <motion.div
          className="md:hidden absolute left-0 top-0 w-[2px] bg-teal-400/50 origin-top"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{
            duration: experienceData.length * 0.3,
            delay: 0.2,
            ease: "easeInOut"
          }}
          style={{
            height: `calc(100% - 20px)`,
            transformOrigin: "top"
          }}
        />
        
        {/* Desktop vertical line */}
        <motion.div
          className="hidden md:block absolute left-0 top-0 w-[4px] bg-teal-400 origin-top"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{
            duration: experienceData.length * 0.3,
            delay: 0.2,
            ease: "easeInOut"
          }}
          style={{
            height: `${experienceData.length * 140 - 90}px`,
            transformOrigin: "top"
          }}
        />
        
        {experienceData.map((item, index) => {
          const isHovered = hoveredIndex === index
          const hasInitialSpin = isInView
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.2 + 0.3,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="flex min-h-[140px] md:h-[140px] flex-row items-start md:items-center gap-4 md:gap-6 relative mb-6 md:mb-0"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Mobile: Simple dot indicator */}
              <div className="md:hidden relative shrink-0 w-[4px] h-full flex items-start justify-center pt-2">
                <div className="bg-teal-400 rounded-full w-3 h-3 absolute top-[8px] left-[-6px]"></div>
              </div>
              
              {/* Desktop: Animated diamond */}
              <div className="hidden md:block relative shrink-0 w-[4px] h-full flex items-start justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: 45 }}
                  animate={
                    hasInitialSpin
                      ? {
                          scale: 1,
                          rotate: isHovered ? [45, 405] : 45,
                        }
                      : {}
                  }
                  transition={{
                    scale: {
                      duration: 0.4,
                      delay: index * 0.2 + 0.5,
                      type: "spring",
                      stiffness: 200
                    },
                    rotate: isHovered
                      ? {
                          duration: 0.8,
                          ease: "linear",
                          repeat: Infinity,
                          repeatType: "loop"
                        }
                      : hasInitialSpin
                      ? {
                          duration: 0.8,
                          delay: index * 0.2 + 0.9,
                          ease: "easeInOut"
                        }
                      : {}
                  }}
                  className="bg-teal-400 rounded-sm p-[6px] absolute top-[40px] left-[-10px] rotate-45"
                >
                  <div className="bg-black h-[12px] w-[12px] rounded-sm"></div>
                </motion.div>
              </div>
              
              <div className="flex-1 pl-4 md:pl-10">
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2 + 0.3
                  }}
                  className="text-teal-400 font-bold text-lg md:text-xl mb-2"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2 + 0.4
                  }}
                  className="text-white text-sm md:text-base leading-relaxed"
                >
                  <span className="text-teal-400 font-semibold">{item.yearRange}</span> — {item.description}
                </motion.p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

