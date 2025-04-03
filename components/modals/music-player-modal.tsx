"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react"

interface MusicPlayerModalProps {
  onClose: () => void
  musicSrc: string | null
}

export default function MusicPlayerModal({ onClose, musicSrc }: MusicPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && musicSrc) {
      audioRef.current = new Audio(musicSrc)

      const audio = audioRef.current

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
      }

      const handleLoadedMetadata = () => {
        setDuration(audio.duration)
      }

      const handleEnded = () => {
        setIsPlaying(false)
        setCurrentTime(0)
      }

      audio.addEventListener("timeupdate", handleTimeUpdate)
      audio.addEventListener("loadedmetadata", handleLoadedMetadata)
      audio.addEventListener("ended", handleEnded)

      audio
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((e) => {
          console.log("Auto-play prevented:", e)
        })

      return () => {
        audio.pause()
        audio.removeEventListener("timeupdate", handleTimeUpdate)
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audio.removeEventListener("ended", handleEnded)
      }
    }
  }, [musicSrc])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const getMusicName = () => {
    if (!musicSrc) return "Unknown Track"
    const parts = musicSrc.split("/")
    return parts[parts.length - 1].replace(".mp3", "")
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md bg-[#1a1a1a] rounded-lg overflow-hidden"
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
          <div className="flex-1 text-center text-white font-semibold">Music Player - {getMusicName()}</div>
          <button onClick={onClose} className="text-white">
            <X size={16} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Album Art */}
            <div className="w-40 h-40 bg-gradient-to-br from-[#ff69b4] to-[#ff1493] rounded-full flex items-center justify-center">
              <motion.div
                className="text-6xl"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 3, repeat: isPlaying ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
              >
                🎵
              </motion.div>
            </div>

            {/* Track Info */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white">{getMusicName()}</h3>
              <p className="text-gray-400">Crisis of Trust</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full space-y-2">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ff69b4 ${(currentTime / (duration || 1)) * 100}%, #333 ${(currentTime / (duration || 1)) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-6">
              <button disabled={!musicSrc} onClick={toggleMute} className="text-white p-2 rounded-full hover:bg-[#ff69b4]/20">
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>

              <button disabled={!musicSrc} onClick={togglePlay} className="bg-[#ff69b4] text-white p-4 rounded-full hover:bg-[#ff1493]">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

