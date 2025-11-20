'use client'

import Image from 'next/image'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'


export const PuzzlePage = () => {
  const braveEcoRef = useRef<HTMLDivElement>(null)
  const isBraveEcoInView = useInView(braveEcoRef, { once: true })
  return (
    <div className='p-10 py-20 w-full' ref={braveEcoRef}>
      <div className="flex flex-col p-6 lg:flex-row relative text-center justify-between gap-40 items-center max-w-[1280px] w-full text-white m-auto">
        <div className="flex-1 flex flex-row justify-end">
          <div className="flex-1 grid grid-cols-2 gap-4 max-w-[600px]">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={isBraveEcoInView ? { x: 0, opacity: 1 } : {}}
              transition={{
                type: 'spring',
                stiffness: 10,
                damping: 7,
                mass: 4,
                delay: 0.2,
              }}
              className="col-span-2 relative bg-[#008080] p-4 rounded-2xl  flex flex-col items-center justify-center"
            >
              <p className="font-bold italic text-base md:text-xl">Mission</p>
              <p className="text-xs md:text-base">
                We empower businesses to thrive by delivering innovative omnitech solutions in
                advertising and data.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={isBraveEcoInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                type: 'spring',
                stiffness: 10,
                damping: 7,
                mass: 4,
                delay: 0.2,
              }}
              className="bg-[#0061C5] p-2 md:p-4 aspect-square rounded-2xl flex flex-col items-center justify-center"
            >
              <p className="font-bold italic text-base md:text-xl">Vision</p>
              <p className="text-xs md:text-base">
                Seamless success for businesses by empowering fearless connections.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={isBraveEcoInView ? { x: 0, opacity: 1 } : {}}
              transition={{
                type: 'spring',
                stiffness: 10,
                damping: 7,
                mass: 4,
                delay: 0.2,
              }}
              className="bg-[#A52E77] p-4 aspect-square rounded-2xl flex flex-col items-center justify-center"
            >
              <p className="font-bold italic text-base md:text-xl">Purpose</p>
              <p className="text-xs md:text-base">Bringing brands closer to their customers.</p>
            </motion.div>
          </div>
        </div>

        <div className="relative flex-1 align-center py-12 flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={isBraveEcoInView ? { x: 0, opacity: 1 } : {}}
            transition={{
              type: 'spring',
              stiffness: 20,
              damping: 20,
            }}
          >PGX GROUP is a technology ideas company
          that builds tech-driven businesses designed
          to innovate, disrupt, and lead various
          industries.
          </motion.div>
        </div>
      </div>
    </div>
  )
}
