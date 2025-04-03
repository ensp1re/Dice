"use client"

import { ReactElement, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import DiceRoll from "./DiceRoll"
import GameResult from "./GameResult"
import DuckCharacter from "./DuckCaracter"
import Console from "./Console"

interface GameScreenProps {
  username: string
}

export default function GameScreen({ username }: GameScreenProps): ReactElement {
  const [currentRound, setCurrentRound] = useState<number>(1)
  const [playerScore, setPlayerScore] = useState<number>(0)
  const [botScore, setBotScore] = useState<number>(0)
  const [isRolling, setIsRolling] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [showConsole, setShowConsole] = useState<boolean>(false)
  const [playerDiceValue, setPlayerDiceValue] = useState<number>(0)
  const [botDiceValue, setBotDiceValue] = useState<number>(0)
  const [roundWinner, setRoundWinner] = useState<string | null>(null)

  const rollDice = (): void => {
    setIsRolling(true)
    setRoundWinner(null)

    const playerValue = Math.floor(Math.random() * 6) + 1
    const botValue = Math.floor(Math.random() * 6) + 1

    setTimeout(() => {
      setPlayerDiceValue(playerValue)
      setBotDiceValue(botValue)

      if (playerValue > botValue) {
        setPlayerScore((prev) => prev + playerValue)
        setRoundWinner("player")
      } else if (botValue > playerValue) {
        setBotScore((prev) => prev + botValue)
        setRoundWinner("bot")
      }

      setIsRolling(false)

      if (currentRound >= 3) {
        setGameOver(true)
      } else {
        setCurrentRound((prev) => prev + 1)
      }
    }, 1500)
  }

  const resetGame = (): void => {
    setCurrentRound(1)
    setPlayerScore(0)
    setBotScore(0)
    setGameOver(false)
    setPlayerDiceValue(0)
    setBotDiceValue(0)
    setRoundWinner(null)
    setShowConsole(false)
  }



  return (
    <motion.div
      className="w-full max-w-4xl p-6 bg-black rounded-lg shadow-lg text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-3xl font-bold text-[#ff69b4]"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Dice Game
        </motion.h1>
        <motion.div
          className="text-lg"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Player: {username}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col items-center">
          <motion.h2
            className="text-xl mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {username}
          </motion.h2>
          <DiceRoll value={playerDiceValue} isRolling={isRolling} />
          <motion.div
            className="mt-4 text-2xl font-bold"
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
            <h2 className="text-xl mb-4">Duck Bot</h2>
            <DuckCharacter isWinning={botScore > playerScore} isRolling={true} />
          </motion.div>
          <DiceRoll value={botDiceValue} isRolling={isRolling} />
          <motion.div
            className="mt-4 text-2xl font-bold"
            animate={{ scale: roundWinner === "bot" ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5 }}
          >
            Score: {botScore}
          </motion.div>
        </div>
      </div>

      <div className="text-center mb-6">
        {!gameOver ? (
          <div>
            <motion.div
              className="text-xl mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Round {currentRound} of 3
            </motion.div>
            <Button onClick={rollDice} disabled={isRolling} className="bg-[#ff69b4] hover:bg-[#ff1493] text-white">
              {isRolling ? "Rolling..." : "Roll Dice"}
            </Button>
          </div>
        ) : (
          <GameResult
            playerScore={playerScore}
            botScore={botScore}
            username={username}
            onReset={resetGame}
          />
        )}
      </div>

      <AnimatePresence>
        {showConsole && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Console />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

