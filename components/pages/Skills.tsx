'use client'

import { motion, useInView } from 'framer-motion'
import React from 'react'

const skillsData = {
  frontend: [
    { name: 'TypeScript', level: 90 },
    { name: 'Next.js', level: 100 },
    { name: 'React', level: 100 },
    { name: 'JavaScript', level: 90 },
    { name: 'Tailwind CSS', level: 95 },
  ],
  backend: [
    { name: 'Node.js', level: 90 },
    { name: 'Express.js', level: 90 },
    { name: 'Python', level: 70 },
    { name: 'FastAPI', level: 65 },

  ],
  databases: [
    { name: 'PostgreSQL', level: 85 },
    { name: 'MySQL', level: 85 },
    { name: 'MongoDB', level: 100 },
    { name: 'DynamoDB', level: 80 },
    { name: 'Aurora SQL', level: 80 },
    { name: 'Supabase', level: 100 },
  ],
  tools: [
    { name: 'GCP', level: 65 },
    { name: 'AWS', level: 100 },
    { name: 'Strapi CMS', level: 85 },
    { name: 'Payload CMS', level: 100 },
    { name: 'Docker', level: 90 },
  ],
}

export default function Skills() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <div
      ref={containerRef}
      id="skills"
      className="w-full max-w-[1280px] min-h-screen mt-20 m-auto z-100 flex flex-col py-14 px-6 md:px-16"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold font-bebas-neue text-white mb-16 text-center"
      >
        Skills & Technologies
      </motion.h1>

      {/* Mobile-Only Design */}
      <div className="md:hidden space-y-6 max-w-6xl mx-auto">
        {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: categoryIndex * 0.15 }}
            className="bg-gradient-to-br from-black/80 to-gray-900/80 border-l-4 border-teal-400 rounded-r-xl p-5 shadow-lg shadow-teal-400/10"
          >
            <h3 className="text-xl font-bold text-teal-400 mb-4 capitalize flex items-center gap-2">
              <span className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></span>
              {category}
            </h3>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.15 + index * 0.08 }}
                  className="bg-black/40 rounded-lg p-3 border border-teal-400/20"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold text-sm">{skill.name}</span>
                    <span className="text-teal-400 text-xs font-bold bg-teal-400/10 px-2 py-1 rounded-full">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800/60 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 0.8, delay: categoryIndex * 0.15 + index * 0.08, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.6)]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Design - Unchanged */}
      <div className="hidden md:grid grid-cols-4 gap-8 max-w-6xl mx-auto">
        {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            className="bg-black/50 border border-teal-400/30 rounded-lg p-6 hover:border-teal-400/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-teal-400 mb-6 capitalize flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
              {category}
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.2 + index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-teal-400 text-sm font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: categoryIndex * 0.2 + index * 0.1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

