"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ReadmeModal from "./modals/readme-modal"
import MusicPlayerModal from "./modals/music-player-modal"
import ImageViewerModal from "./modals/image-viewer-modal"

export default function DesktopIcons() {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [currentMusic, setCurrentMusic] = useState<string | null>(null)

  const icons = [
    { name: "Leaderboard", icon: "📊", type: "app" },
    { name: "README.pdf", icon: "📄", type: "pdf" },
    { name: "Project.mp3", icon: "🎵", type: "music", src: "" },
    { name: "finale.mp3", icon: "🎵", type: "music", src: "" },
    { name: "Gold.mp3", icon: "🎵", type: "music", src: "" },
    { name: "ostrich.jpg", icon: "🖼️", type: "image", src: "/images/ostrich.webp" },
  ]

  const handleIconClick = (icon: any) => {
    if (icon.type === "pdf") {
      setOpenModal("readme")
    } else if (icon.type === "music") {
      setCurrentMusic(icon.src)
      setOpenModal("music")
    } else if (icon.type === "image") {
      setOpenModal("image")
    }
  }

  const closeModal = () => {
    setOpenModal(null)
  }

  return (
    <div className="absolute right-2 top-10 w-20 space-y-6">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center text-white cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => handleIconClick(icon)}
        >
          <div className="text-3xl mb-1">{icon.icon}</div>
          <div className="text-xs text-center w-full truncate">{icon.name}</div>
        </motion.div>
      ))}

      {/* Modals */}
      {openModal === "readme" && <ReadmeModal onClose={closeModal} />}
      {openModal === "music" && <MusicPlayerModal onClose={closeModal} musicSrc={currentMusic} />}
      {openModal === "image" && <ImageViewerModal onClose={closeModal} />}
    </div>
  )
}

