'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaExternalLinkAlt, FaCode } from 'react-icons/fa'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

export interface ProjectDetails {
  title: string
  description: string
  longDescription: string
  techStack: string[]
  url: string
  image: string
  highlights?: string[]
  features?: string[]
}

interface ProjectModalProps {
  project: ProjectDetails | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!project || !mounted) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            style={{ position: 'fixed' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
            style={{ position: 'fixed' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-4xl max-h-[90vh] bg-black border border-teal-400/30 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col">
              {/* Header */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors z-10"
                  aria-label="Close modal"
                >
                  <FaTimes className="text-white w-5 h-5" />
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
                  <p className="text-teal-400 text-sm md:text-base">{project.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(20, 184, 166, 0.5) transparent'
              }}>
                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-6">
                    {project.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="inline-block mr-2 mb-2 px-4 py-2 bg-teal-400/20 border border-teal-400/50 rounded-full text-teal-400 text-sm font-semibold"
                      >
                        {highlight}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Long Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <p className="text-white text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {project.longDescription}
                  </p>
                </motion.div>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                      <FaCode className="w-5 h-5" />
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="text-gray-300 flex items-start gap-3">
                          <span className="text-teal-400 mt-1">▹</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-bold text-teal-400 mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-800 border border-teal-400/30 rounded-lg text-white text-sm hover:border-teal-400/60 hover:bg-gray-700 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Footer with Link */}
              <div className="border-t border-teal-400/30 p-6 bg-black/50">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-400 hover:bg-teal-500 text-black font-semibold rounded-lg transition-all duration-300"
                >
                  <span>Visit Website</span>
                  <FaExternalLinkAlt className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

