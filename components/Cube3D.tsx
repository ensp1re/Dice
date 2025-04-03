"use client"

import { useRef, useEffect, useState } from "react"

interface Cube3DProps {
  value: number
  isRolling: boolean
  color: string
}

export default function Cube3D({ value, isRolling, color }: Cube3DProps) {
  const cubeRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const [randomRotations, setRandomRotations] = useState<number[][]>([])
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    if (isRolling) {
      const steps = 15
      const rotations = []

      for (let i = 0; i < steps; i++) {
        rotations.push([Math.random() * 360 * 2 - 360, Math.random() * 360 * 2 - 360, Math.random() * 360 * 2 - 360])
      }

      setRandomRotations(rotations)
      setAnimationStep(0)

      const interval = setInterval(() => {
        setAnimationStep((prev) => {
          if (prev < steps - 1) {
            return prev + 1
          } else {
            clearInterval(interval)
            return prev
          }
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isRolling])

  useEffect(() => {
    if (isRolling && randomRotations.length > 0 && animationStep < randomRotations.length) {
      const [x, y, z] = randomRotations[animationStep]
      setRotation({ x, y, z })
    }
  }, [animationStep, isRolling, randomRotations])

  useEffect(() => {
    if (!isRolling && value > 0) {
      switch (value) {
        case 1:
          setRotation({ x: 0, y: 0, z: 0 })
          break
        case 2:
          setRotation({ x: 0, y: -90, z: 0 })
          break
        case 3:
          setRotation({ x: 90, y: 0, z: 0 })
          break
        case 4:
          setRotation({ x: -90, y: 0, z: 0 })
          break
        case 5:
          setRotation({ x: 0, y: 90, z: 0 })
          break
        case 6:
          setRotation({ x: 180, y: 0, z: 0 })
          break
        default:
          setRotation({ x: 0, y: 0, z: 0 })
      }
    }
  }, [isRolling, value])

  const getGradientStyle = (baseColor: string) => {
    let r = 0,
      g = 0,
      b = 0

    if (baseColor.startsWith("#")) {
      const hex = baseColor.slice(1)
      if (hex.length === 6) {
        r = Number.parseInt(hex.slice(0, 2), 16)
        g = Number.parseInt(hex.slice(2, 4), 16)
        b = Number.parseInt(hex.slice(4, 6), 16)
      } else if (hex.length === 3) {
        r = Number.parseInt(hex[0] + hex[0], 16)
        g = Number.parseInt(hex[1] + hex[1], 16)
        b = Number.parseInt(hex[2] + hex[2], 16)
      }
    }

    const lighterColor = `rgb(${Math.min(r + 40, 255)}, ${Math.min(g + 40, 255)}, ${Math.min(b + 40, 255)})`
    const darkerColor = `rgb(${Math.max(r - 40, 0)}, ${Math.max(g - 40, 0)}, ${Math.max(b - 40, 0)})`

    return {
      background: `linear-gradient(135deg, ${lighterColor}, ${baseColor}, ${darkerColor})`,
      boxShadow: `0 0 15px rgba(0, 0, 0, 0.5), 0 0 5px rgba(255, 255, 255, 0.2) inset`,
    }
  }

  const cubeStyle = getGradientStyle(color)

  return (
    <div className="scene">
      <div
        ref={cubeRef}
        className="cube"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
          transition: isRolling ? "transform 0.1s ease" : "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        {/* Face 1 */}
        <div className="cube-face cube-face-front" style={cubeStyle}>
          <div className="dot dot-center"></div>
        </div>

        {/* Face 6 */}
        <div className="cube-face cube-face-back" style={cubeStyle}>
          <div className="dot dot-top-left"></div>
          <div className="dot dot-top-right"></div>
          <div className="dot dot-middle-left"></div>
          <div className="dot dot-middle-right"></div>
          <div className="dot dot-bottom-left"></div>
          <div className="dot dot-bottom-right"></div>
        </div>

        {/* Face 5 */}
        <div className="cube-face cube-face-right" style={cubeStyle}>
          <div className="dot dot-top-left"></div>
          <div className="dot dot-top-right"></div>
          <div className="dot dot-center"></div>
          <div className="dot dot-bottom-left"></div>
          <div className="dot dot-bottom-right"></div>
        </div>

        {/* Face 2 */}
        <div className="cube-face cube-face-left" style={cubeStyle}>
          <div className="dot dot-top-left"></div>
          <div className="dot dot-bottom-right"></div>
        </div>

        {/* Face 3 */}
        <div className="cube-face cube-face-top" style={cubeStyle}>
          <div className="dot dot-top-left"></div>
          <div className="dot dot-center"></div>
          <div className="dot dot-bottom-right"></div>
        </div>

        {/* Face 4 */}
        <div className="cube-face cube-face-bottom" style={cubeStyle}>
          <div className="dot dot-top-left"></div>
          <div className="dot dot-top-right"></div>
          <div className="dot dot-bottom-left"></div>
          <div className="dot dot-bottom-right"></div>
        </div>
      </div>

      {/* Shadow beneath the cube */}
      <div
        className={`cube-shadow ${isRolling ? "cube-shadow-rolling" : ""}`}
        style={{
          backgroundColor: `rgba(0, 0, 0, ${isRolling ? 0.2 : 0.4})`,
        }}
      ></div>
    </div>
  )
}

