'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

export default function LayoutSmoothScroll({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Use spring physics for inertia-like smoothing
  const smoothY = useSpring(scrollY, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  })

  // Map scroll value to translate the container
  const y = useTransform(smoothY, (val) => -val)

  return (
    <div ref={scrollRef}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
