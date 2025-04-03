"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface ThreeDDiceProps {
  value: number
  isRolling: boolean
  color: string
}

export default function ThreeDDice({ value, isRolling, color }: ThreeDDiceProps) {
  const diceRef = useRef<HTMLDivElement>(null)

  const dots = []

  if (value === 1 || value === 3 || value === 5) {
    dots.push(<div key="center" className="absolute inset-0 m-auto w-3 h-3 bg-black rounded-full" />)
  }

  if (value >= 2) {
    dots.push(
      <div key="top-left" className="absolute top-3 left-3 w-3 h-3 bg-black rounded-full" />,
      <div key="bottom-right" className="absolute bottom-3 right-3 w-3 h-3 bg-black rounded-full" />,
    )
  }

  if (value >= 4) {
    dots.push(
      <div key="top-right" className="absolute top-3 right-3 w-3 h-3 bg-black rounded-full" />,
      <div key="bottom-left" className="absolute bottom-3 left-3 w-3 h-3 bg-black rounded-full" />,
    )
  }

  if (value === 6) {
    dots.push(
      <div key="middle-left" className="absolute top-1/2 left-3 -translate-y-1/2 w-3 h-3 bg-black rounded-full" />,
      <div key="middle-right" className="absolute top-1/2 right-3 -translate-y-1/2 w-3 h-3 bg-black rounded-full" />,
    )
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        ref={diceRef}
        className={`relative w-20 h-20 rounded-lg shadow-lg`}
        style={{ backgroundColor: color }}
        animate={
          isRolling
            ? {
                rotateX: [0, 360, 720, 1080],
                rotateY: [0, 360, 720, 1080],
                rotateZ: [0, 360, 720, 1080],
                scale: [1, 0.8, 1.2, 1],
              }
            : {}
        }
        transition={
          isRolling
            ? {
                duration: 1.5,
                ease: "easeInOut",
              }
            : {}
        }
      >
        {value > 0 && !isRolling && dots}
      </motion.div>
    </div>
  )
}

