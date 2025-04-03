"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import GameResult from "./GameResult"
import DuckCharacter from "./DuckCaracter"
import Cube3D from "./Cube3D"
import Image from "next/image"

interface DiceGameProps {
  username: string
  isSoundEnabled: boolean
}

export default function DiceGame({ username, isSoundEnabled }: DiceGameProps) {
  const [currentRound, setCurrentRound] = useState(1)
  const [playerScore, setPlayerScore] = useState(0)
  const [botScore, setBotScore] = useState(0)
  const [isPlayerRolling, setIsPlayerRolling] = useState(false)
  const [isBotRolling, setIsBotRolling] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [playerDiceValue, setPlayerDiceValue] = useState(0)
  const [botDiceValue, setBotDiceValue] = useState(0)
  const [roundWinner, setRoundWinner] = useState<string | null>(null)
  const [turnState, setTurnState] = useState<"ready" | "playerRolling" | "botRolling" | "complete">("ready")

  const rollSound = useRef<HTMLAudioElement | null>(null)
  const impactSound = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio elements
    if (typeof window !== "undefined") {
      rollSound.current = new Audio("/sounds/dice-roll.mp3")
      impactSound.current = new Audio("/sounds/dice-impact.mp3")
    }

    return () => {
      if (rollSound.current) {
        rollSound.current.pause()
        rollSound.current = null
      }
      if (impactSound.current) {
        impactSound.current.pause()
        impactSound.current = null
      }
    }
  }, [])

  const playSound = (sound: HTMLAudioElement | null) => {
    if (sound && isSoundEnabled) {
      sound.currentTime = 0
      sound.play().catch((e) => console.log("Error playing sound:", e))
    }
  }

  const rollDice = () => {
    // Player's turn
    setTurnState("playerRolling")
    setIsPlayerRolling(true)
    setRoundWinner(null)

    // Play roll sound
    playSound(rollSound.current)

    // Generate random value between 1 and 6
    const playerValue = Math.floor(Math.random() * 6) + 1

    // Delay to show animation
    setTimeout(() => {
      setPlayerDiceValue(playerValue)
      setIsPlayerRolling(false)

      // Play impact sound
      playSound(impactSound.current)

      // Bot's turn after a delay
      setTimeout(() => {
        botRoll(playerValue)
      }, 1000)
    }, 2000)
  }

  const botRoll = (playerValue: number) => {
    setTurnState("botRolling")
    setIsBotRolling(true)

    // Play roll sound
    playSound(rollSound.current)

    // Generate random value between 1 and 6
    const botValue = Math.floor(Math.random() * 6) + 1

    // Delay to show animation
    setTimeout(() => {
      setBotDiceValue(botValue)
      setIsBotRolling(false)

      // Play impact sound
      playSound(impactSound.current)

      // Update scores
      if (playerValue > botValue) {
        setPlayerScore((prev) => prev + playerValue)
        setRoundWinner("player")
      } else if (botValue > playerValue) {
        setBotScore((prev) => prev + botValue)
        setRoundWinner("bot")
      }

      // Check if game is over
      if (currentRound >= 3) {
        setGameOver(true)
      } else {
        setCurrentRound((prev) => prev + 1)
      }

      setTurnState("complete")
    }, 2000)
  }

  const resetGame = () => {
    setCurrentRound(1)
    setPlayerScore(0)
    setBotScore(0)
    setGameOver(false)
    setPlayerDiceValue(0)
    setBotDiceValue(0)
    setRoundWinner(null)
    setTurnState("ready")
  }

  return (
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
      {!gameOver ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <motion.h2
              className="text-xl mb-2 text-white"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {username}
            </motion.h2>

            {/* Player Character Image */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <Image
                src="/images/player-character.webp"
                alt="Player Character"
                width={100}
                height={100}
                className="object-contain"
              />
            </motion.div>

            <div className="h-[150px] w-[150px] flex items-center justify-center">
              <Cube3D value={playerDiceValue} isRolling={isPlayerRolling} color="#ff69b4" />
            </div>
            <motion.div
              className="mt-4 text-2xl font-bold text-[#ff69b4]"
              animate={{ scale: roundWinner === "player" ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              Score: {playerScore}
            </motion.div>
          </div>

          <div className="flex flex-col items-center">
            <motion.div
              className="flex flex-col items-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl mb-2 text-white">Duck Bot</h2>
              <DuckCharacter isWinning={botScore > playerScore} isRolling={isBotRolling} />
            </motion.div>
            <div className="h-[150px] w-[150px] flex items-center justify-center">
              <Cube3D value={botDiceValue} isRolling={isBotRolling} color="#ffcc00" />
            </div>
            <motion.div
              className="mt-4 text-2xl font-bold text-[#ff69b4]"
              animate={{ scale: roundWinner === "bot" ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              Score: {botScore}
            </motion.div>
          </div>
        </div>
      ) : null}

      <div className="text-center mb-6">
        {!gameOver ? (
          <div>
            <motion.div
              className="text-xl mb-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Round {currentRound} of 3
            </motion.div>
            <Button
              onClick={rollDice}
              disabled={turnState !== "ready" && turnState !== "complete"}
              className="bg-[#ff69b4] hover:bg-[#ff1493] text-white"
            >
              {turnState === "playerRolling" || turnState === "botRolling" ? "Rolling..." : "Roll Dice"}
            </Button>
          </div>
        ) : (
          <GameResult playerScore={playerScore} botScore={botScore} username={username} onReset={resetGame} />
        )}
      </div>
    </div>
  )
}

