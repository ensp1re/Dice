"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import DiceGame from "./DiceGame"
import DesktopIcons from "./DesktopIcons"
import MenuBar from "./MenuBar"
import LoginScreen from "./LoginScreen"
import SoundToggle from "./SoundToggle"
import Taskbar from "./TaskBar"

export default function RetroDesktop() {
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isSoundEnabled, setIsSoundEnabled] = useState(false)

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
      setIsLoggedIn(true)
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const handleLogin = (name: string) => {
    if (name.trim()) {
      sessionStorage.setItem("username", name)
      setUsername(name)
      setIsLoggedIn(true)
    }
  }

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  const formattedDay = currentTime.toLocaleDateString([], {
    weekday: "short",
    month: "numeric",
    day: "numeric",
  })

  const toggleSound = () => {
    setIsSoundEnabled((prev) => !prev)
  }

  return (
    <div className="relative w-full h-screen">
      <MenuBar username={username} time={`${formattedDay} ${formattedTime}`} />

      <div className="flex h-[calc(100vh-56px)]">
        <motion.div
          className="relative overflow-auto  mx-auto my-2 w-[70%] h-[calc(95%-56px)] bg-[#1a1a1a] rounded-lg  border border-gray-600 shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex   items-center h-8 bg-gradient-to-r bg-white text-black px-2">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1  text-center  font-semibold">🎵 Crisis of Trust</div>
            <SoundToggle isEnabled={isSoundEnabled} onToggle={toggleSound} />
          </div>

          <div className="relative  min-h-full p-4 cage-background overflow-y-auto">
            <hr className="border-[#ff69b4]/30 mb-6" />
            <div className="relative h-full overflow-visible">
              {!isLoggedIn ? (
                <LoginScreen onLogin={handleLogin} />
              ) : (
                <DiceGame username={username} isSoundEnabled={isSoundEnabled} />
              )}
            </div>
          </div>
        </motion.div>

        <DesktopIcons />
      </div>

      <Taskbar />
    </div>
  )
}

