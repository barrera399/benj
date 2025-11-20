'use client'

import { motion } from "framer-motion"
import { useRef } from "react"
import LayoutSmoothScroll from "@/components/globals/LayoutSmoothScroll"

export default function HomeBanner() {
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    return (
      <div className="relative w-full">
        {/* Parent container taller than viewport */}
        <div className="relative w-full min-h-[100vh]">
          {/* Sticky video background */}
          <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
            <video
              src="/placeholder.mp4"
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload noremoteplayback noplaybackrate"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: `
              linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.05) 100%),
              linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 100%),
              linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 100%),
              #000000
            `,
                mixBlendMode: 'overlay',
              }}
            ></div>
          </div>
  
          {/* Text content scrolling over video */}
          <LayoutSmoothScroll>
            <div className="relative z-10 flex flex-col mt-[-60vh] justify-between items-center min-h-screen px-4  space-y-[50vh]">
              <motion.p
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="text-white !text-[35px] sm:!text-[50px] md:!text-[70px]  font-bold text-center"
              >
                Hello, I am Joseph. I am a Full Stack Developer
              </motion.p>
              <p className="font-medium !text-base text-white sm:!text-xl md:!text-2xl text-justify">
                I am a Full Stack Developer with a passion for building web
                applications that are both functional and aesthetically pleasing.
              </p>
            </div>
          </LayoutSmoothScroll>
  
          {/* Spacer so the video finally scrolls away */}
        </div>
      </div>
    )
  }