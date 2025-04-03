"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface DuckCharacterProps {
  isWinning: boolean
  isRolling: boolean
}

export default function DuckCharacter({ isWinning, isRolling }: DuckCharacterProps) {
  return (
    <motion.div
      animate={
        isRolling
          ? {
            y: [0, -5, 0, -5, 0],
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1, 1.1, 1],
          }
          : isWinning
            ? {
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0],
            }
            : {}
      }
      transition={
        isRolling
          ? {
            duration: 0.5,
            repeat: 4,
            repeatType: "loop",
          }
          : isWinning
            ? {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              repeatType: "reverse",
            }
            : {}
      }
      className="mb-4"
    >
      <Image
        src="/images/duck.png"
        alt="Duck Character"
        width={100}
        height={100}
        className="object-contain"
      />
    </motion.div>
  )
}

