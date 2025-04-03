"use client"

import { motion } from "framer-motion"

interface DiceRollProps {
  value: number
  isRolling: boolean
}

export default function DiceRoll({ value, isRolling }: DiceRollProps) {
  const dots = []

  if (value === 1 || value === 3 || value === 5) {
    dots.push(<div key="center" className="absolute inset-0 m-auto w-2 h-2 bg-black rounded-full" />)
  }

  if (value >= 2) {
    dots.push(
      <div key="top-left" className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full" />,
      <div key="bottom-right" className="absolute bottom-2 right-2 w-2 h-2 bg-black rounded-full" />,
    )
  }

  if (value >= 4) {
    dots.push(
      <div key="top-right" className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full" />,
      <div key="bottom-left" className="absolute bottom-2 left-2 w-2 h-2 bg-black rounded-full" />,
    )
  }

  if (value === 6) {
    dots.push(
      <div key="middle-left" className="absolute top-1/2 left-2 -translate-y-1/2 w-2 h-2 bg-black rounded-full" />,
      <div key="middle-right" className="absolute top-1/2 right-2 -translate-y-1/2 w-2 h-2 bg-black rounded-full" />,
    )
  }

  return (
    <motion.div
      className="relative w-12 h-12 bg-white rounded shadow"
      animate={isRolling ? { rotate: 1080, scale: [1, 0.8, 1.2, 1] } : {}}
      transition={isRolling ? { duration: 1.5 } : {}}
    >
      {value > 0 && !isRolling && dots}
    </motion.div>
  )
}

