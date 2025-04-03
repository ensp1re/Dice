"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Console() {
  const [tasks, setTasks] = useState<string[]>([])
  const [currentTask, setCurrentTask] = useState(0)

  useEffect(() => {
    const consoleTasks = [
      "> Loading game statistics...",
      "> Analyzing player performance...",
      "> Checking for cheating patterns...",
      "> All checks passed!",
      "> Game verified successfully.",
    ]

    const timer = setInterval(() => {
      if (currentTask < consoleTasks.length) {
        setTasks((prev) => [...prev, consoleTasks[currentTask]])
        setCurrentTask((prev) => prev + 1)
      } else {
        clearInterval(timer)
      }
    }, 800)

    return () => clearInterval(timer)
  }, [currentTask])

  return (
    <motion.div
      className="mt-6 p-4 bg-[#111] border border-[#ff69b4] rounded-lg font-mono text-sm overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <div className="text-[#ff69b4] ml-2">Console</div>
      </div>
      <div className="text-green-400">
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-1"
          >
            {task}
          </motion.div>
        ))}
        {currentTask < 5 && (
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}>
            _
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}

