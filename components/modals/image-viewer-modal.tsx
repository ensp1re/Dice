"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"

interface ImageViewerModalProps {
  onClose: () => void
}

export default function ImageViewerModal({ onClose }: ImageViewerModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
      >
        <X size={24} />
      </button>

      <motion.div
        className="relative w-full max-w-5xl max-h-[90vh]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="/images/start_here.jpg"
          alt="Start Here"
          width={1200}
          height={800}
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </motion.div>
  )
}

