"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Taskbar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const appIcons = [
    {
      name: "SuperProver",
      src: "/images/superprover-app.svg",
      alt: "SuperProver App",
    },
    {
      name: "TruthLens",
      src: "/images/truthlens-app.svg",
      alt: "TruthLens App",
    },
    {
      name: "Finder",
      src: "/images/finder-app.svg",
      alt: "Finder App",
    },
    {
      name: "Succinct",
      src: "/images/succinct-app.svg",
      alt: "Succinct App",
    },
  ]

  const additionalAppIcons = [
    {
      name: "Leaderboard",
      src: "/images/leaderboard-app.svg",
      alt: "Leaderboard App",
    },
    {
      name: "Ethereum",
      src: "/images/ethereum-app.svg",
      alt: "Ethereum App",
    },
    {
      name: "SFBay",
      src: "/images/sfbay-app.svg",
      alt: "SFBay App",
    },
    {
      name: "Flappy",
      src: "/images/flappy-app.svg",
      alt: "Flappy App",
    },
    {
      name: "Turbo",
      src: "/images/turbo-app.svg",
      alt: "Turbo App",
    },
    {
      name: "Arcade",
      src: "/images/arcade-app.svg",
      alt: "Arcade App",
    },
  ]


  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 bg-[#e83e8c] flex flex-col items-center transition-all duration-300 z-40 ${isCollapsed ? "h-8" : "h-14 md:h-16"
        }`}
      initial={{ y: 56 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >


      <div className={`flex items-center justify-center w-full h-full ${isCollapsed ? "opacity-0" : "opacity-100"}`}>
        <div className="flex space-x-1 md:space-x-2 py-1 px-2 overflow-x-auto scrollbar-hide">
          {appIcons.map((app, index) => (
            <motion.div
              key={`main-${index}`}
              className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center cursor-pointer shadow-md  overflow-hidden"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Image
                src={app.src || "/placeholder.svg"}
                alt={app.alt}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </motion.div>
          ))}

          <div className={`hidden sm:flex space-x-1 md:space-x-2 ${isExpanded ? "flex" : ""}`}>
            {additionalAppIcons.map((app, index) => (
              <motion.div
                key={`additional-${index}`}
                className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center cursor-pointer shadow-md  overflow-hidden"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Image
                  src={app.src || "/placeholder.svg"}
                  alt={app.alt}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {isExpanded && !isCollapsed && (
        <motion.div
          className="flex flex-wrap justify-center gap-1 p-2  w-full sm:hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          {additionalAppIcons.map((app, index) => (
            <motion.div
              key={`mobile-${index}`}
              className="w-10 h-10 rounded-md flex items-center justify-center cursor-pointer shadow-md bg-white overflow-hidden"
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Image
                src={app.src || "/placeholder.svg"}
                alt={app.alt}
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

