"use client"

interface MenuBarProps {
  username: string
  time: string
}

export default function MenuBar({ username, time }: MenuBarProps) {
  console.log("MenuBar rendered")
  console.log("Username:", username)
  return (
    <div className="flex items-center justify-between h-7 bg-white backdrop-blur-sm text-black px-2 border-b border-gray-600">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="text-sm mr-1">🎵</span>
          <span className="text-sm font-semibold">Crisis</span>
        </div>
        <div className="text-sm">File</div>
        <div className="text-sm">Edit</div>
        <div className="text-sm">View</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-sm hidden sm:block">Balance: 10.00 USDC</div>
        <div className="text-sm">💰</div>
        <div className="text-sm">📡</div>
        <div className="text-sm">📶</div>
        <div className="text-sm">🔊</div>
        <div className="text-xs sm:text-sm hidden sm:block">{time}</div>
      </div>
    </div>
  )
}

