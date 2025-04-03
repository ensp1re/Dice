"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"

interface ReadmeModalProps {
  onClose: () => void
}

export default function ReadmeModal({ onClose }: ReadmeModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-2xl bg-[#1a1a1a] rounded-lg overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center h-8 bg-gradient-to-r from-[#ff69b4] to-[#ff1493] px-2">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-white font-semibold">README.pdf</div>
          <button onClick={onClose} className="text-white">
            <X size={16} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="bg-white text-black p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold mb-4">How to Play Dice Game</h2>

            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-semibold">Game Objective</h3>
                <p>Beat the Duck Bot by scoring more points in 3 rounds of dice rolling.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold">Game Rules</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Each game consists of 3 rounds.</li>
                  <li>In each round, you and the Duck Bot will roll a die.</li>
                  <li>The player with the higher roll wins that round and adds their dice value to their score.</li>
                  <li>If both players roll the same number, no points are awarded.</li>
                  <li>After 3 rounds, the player with the highest total score wins.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold">Controls</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Click the "Roll Dice" button to roll your die.</li>
                  <li>The Duck Bot will automatically roll after you.</li>
                  <li>At the end of the game, click "Retry" to play again.</li>
                  <li>Click "Prove" to verify the game results.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold">Tips</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>The game is based on luck, but try to enjoy the animations!</li>
                  <li>Sound effects can be toggled on/off using the sound icon in the top right.</li>
                  <li>Check out the desktop icons for music and additional content.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

