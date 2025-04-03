"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import ProveModal from "./modals/prove-modal"

interface GameResultProps {
  playerScore: number
  botScore: number
  username: string
  onReset: () => void
}

export default function GameResult({ playerScore, botScore, username, onReset }: GameResultProps) {
  const [showProveModal, setShowProveModal] = useState<boolean>(false)

  const winner = playerScore > botScore ? username : playerScore === botScore ? "Tie" : "Duck Bot"
  const playerWon = playerScore > botScore
  const isTie = playerScore === botScore

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-2xl font-bold text-white"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Game Over!
      </motion.h2>

      <div className="text-xl text-white">
        <div className="mb-2">Final Score:</div>
        <div className="flex justify-center space-x-8">
          <div>
            {username}: {playerScore}
          </div>
          <div>Duck Bot: {botScore}</div>
        </div>
      </div>

      {/* Result Image */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {!isTie && (
          <Image
            src={
              playerWon
                ? "/images/bot-lost.gif" // Bot lost image
                : "/images/player-lost.gif" // Player lost image
            }
            alt={playerWon ? "You won!" : "You lost!"}
            width={200}
            height={150}
            className="object-contain"
          />
        )}
      </motion.div>

      <motion.div
        className="text-2xl font-bold text-[#ff69b4]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Winner: {winner}
      </motion.div>

      <div className="flex justify-center space-x-4 mt-6">
        <Button onClick={onReset} className="bg-[#ff69b4] hover:bg-[#ff1493] text-white">
          Retry
        </Button>
        <Button
          onClick={() => setShowProveModal(true)}
          variant="outline"
          className="border-[#ff69b4] text-[#ff69b4] hover:bg-[#ff69b4] hover:text-white"
        >
          Prove
        </Button>
      </div>

      <ProveModal
        open={showProveModal}
        onOpenChange={setShowProveModal}
        playerScore={playerScore}
        botScore={botScore}
        username={username}
      />
    </motion.div>
  )
}

