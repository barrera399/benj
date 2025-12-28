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

  if (!project || !mounted) {
    return null
  }

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              zIndex: 99998
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-start md:items-center justify-center p-2 md:p-4 pointer-events-none overflow-y-auto"
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              zIndex: 99999,
              WebkitOverflowScrolling: 'touch',
              visibility: 'visible'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] bg-black border border-teal-400/30 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col mt-4 md:mt-0 relative"
              style={{ 
                zIndex: 100000,
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                visibility: 'visible',
                opacity: 1,
                display: 'flex'
              }}
            >
              {/* Header */}
              <div className="relative h-32 md:h-48 lg:h-64 overflow-hidden flex-shrink-0">
                {/* Check if image is a logo (ends with logo filenames) */}
                {project.image.includes('brave') || project.image.includes('aspire') || project.image.includes('crafted-catalyst') || project.image.includes('futura-icon') ? (
                  <>
                    {/* Gradient background for logos */}
                    <div className={`absolute inset-0 ${
                      project.image.includes('brave') 
                        ? 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900' 
                        : project.image.includes('crafted-catalyst')
                        ? 'bg-gradient-to-br from-teal-500 via-blue-500 to-purple-600'
                        : project.image.includes('futura-icon')
                        ? 'bg-gradient-to-br from-red-900 via-red-800 to-red-900'
                        : 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900'
                    }`} />
                    {/* Centered logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={200}
                        height={200}
                        className="object-contain opacity-90"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </>
                )}
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
              <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-thin min-h-0" style={{
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

  if (typeof window === 'undefined') {
    return null
  }
  
  return createPortal(modalContent, document.body)
}

