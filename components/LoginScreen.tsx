"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface LoginScreenProps {
  onLogin: (username: string) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(username)
  }

  return (
    <div className="relative z-10 flex items-center justify-center h-full">
      <motion.div
        className="w-full max-w-md p-6 bg-black/80 rounded-lg shadow-lg text-center border-2 border-[#ff69b4]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-[#ff69b4]"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Enter Username
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white text-black"
          />
          <Button type="submit" className="w-full bg-[#ff69b4] text-white hover:bg-[#ff1493]">
            Login
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

