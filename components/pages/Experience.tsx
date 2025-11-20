'use client'

import { motion, useInView } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/utils'

const experienceData = [
  {
    year: "2015",
    yearRange: "2015",
    title: "MIT",
    description: "Undergraduate Project in Computer Science and Engineering, A+",
    column: "left"
  },
  {
    year: "2016",
    yearRange: "2016",
    title: "DoeWeb",
    description: "Software Development Intern in a US IT company. Used AngularJS, PHP, and basic frameworks.",
    column: "left"
  },
  {
    year: "2015",
    yearRange: "2015-2017",
    title: "DiveNet",
    description: "Backend developer in a SF hardware startup creating smart equipment for divers. Used Node JS and PostgreSQL, and worked in tight bundle with engineers and security specialists.",
    column: "left"
  },
  {
    year: "2015",
    yearRange: "2015-2019",
    title: "University of Boston",
    description: "Bachelor of Science in Computer Science. Courses in programming languages, compiler design, data structures, algorithms, data structures, theory of computation.",
    column: "right"
  },
  {
    year: "2017",
    yearRange: "2017-2018",
    title: "WebLook",
    description: "Full-Stack developer at WebLook web development agency in SF. Created and maintained websites and mobile apps for clients ranging from small businesses to enterprise corporations.",
    column: "right"
  },
  {
    year: "2018",
    yearRange: "2018-Present",
    title: "Remote Freelancer",
    description: "Having gained a lot of experience in previous jobs, I decided to become a freelancer. Since 2018, I have been collaborating with various companies around the world, working as a UI/UX designer and full-stack developer growing the most complex projects from scratch.",
    column: "right"
  }
]

export default function Experience() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[1280px] min-h-screen mt-20 m-auto z-100 flex flex-col py-14 px-6 md:px-16"
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
        {/* Continuous vertical line */}
        <motion.div
          className="absolute left-0 top-0 w-[4px] bg-teal-400 origin-top"
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
              className="flex h-[140px] flex-row items-center gap-4 md:gap-6 relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative shrink-0 w-[4px] h-full flex items-start justify-center">
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
              <div className="flex-1 pl-10">
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

