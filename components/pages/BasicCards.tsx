'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import React from 'react'
import { useRouter } from 'next/navigation'




const data = [{
    title: "Custom Application",
    description: "We build custom applications to meet your specific needs. Whether you need a simple website or a complex application, we can help you.",
    image:"/placeholder-4.webp",

},{
    title: "AI Integration",
    description: "We build custom applications to meet your specific needs. Whether you need a simple website or a complex application, we can help you.",
    image:"/p2.png",

},{
    title: "Portfolio\nWebsite",
    description: "We build custom applications to meet your specific needs. Whether you need a simple website or a complex application, we can help you.",
    image:"/p3.webp",

}]


export default function BasicCards() {
  const cardsRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(cardsRef, { once: false })

  const router = useRouter()

  return (
    <div
      id="contact"
      ref={cardsRef}
      className="flex flex-col m-auto max-w-[1400px] w-full px-6 md:px-14 py-0 md:py-20 pb-20"
    >
      <div className="flex flex-wrap m-auto justify-center gap-14">
        {data.map((card, index) => (
        
            <div key={index} className="w-[310px] h-[100px] sm:w-[300px] sm:h-[400px] md:w-[350px] md:h-[500px] group transition-all ease-in-out duration-300 hover:scale-105">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 2, // slower overall
                  // ease: [0.25, 0.1, 0.25, 1], // "easeInOut" — smooth & natural
                  delay: index * 0.3, // staggered
                }}
                className="relative h-full w-full overflow-hidden"
              >
                <Image
                  width={1000}
                  height={1000}
                  className="h-full transition-all ease-in-out duration-300 group-hover:scale-[400%] group-hover:blur-lg w-full object-cover absolute"
                  src={(card.image)}
                  alt={card.title}
                />
                <div className="w-full h-full p-4 md:p-8 relative z-10 text-white">
                  <p className="!text-2xl md:!text-3xl font-bold max-w-[220px]"></p>
                  {card?.title && (
                    <p className="!text-base sm:!text-xl md:!text-3xl font-bold">{card.title}</p>
                  )}
                </div>
                <div className=" absolute bottom-0 left-[100%] transition-all ease-in-out duration-500 delay-100 group-hover:left-0 w-full h-full flex items-center p-6 !font-normal">
                  {card?.description && <p className="!text-sm text-white">{card?.description}</p>}
                </div>
                <div className=" w-full absolute bottom-[-60px] left-0 transition-all ease-in-out duration-500 delay-100 group-hover:bottom-0 text-right p-6">
                  <div
                    className="relative !text-xs z-50 text-white font-bold text-right before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px] before:bg-current before:scale-x-0 before:transition-transform before:duration-200 hover:before:scale-x-100 hover:before:origin-left before:origin-right"
                   
                  >
                    Read More
                  </div>
                </div>
              </motion.div>
            </div>
       
        ))}
      </div>
    </div>
  )
}
