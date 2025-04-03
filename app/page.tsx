"use client"
import RetroDesktop from "@/components/RetroDesktop"

export default function Home() {
  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("/images/os-background.png")',
      }}
    >
      <RetroDesktop />
    </main>
  )
}

