'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  glareOpacity?: number
}

export function TiltCard({
  children,
  className = '',
  intensity = 8,
  glareOpacity = 0.15,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rX = ((y - centerY) / centerY) * -intensity
    const rY = ((x - centerX) / centerX) * intensity

    setRotateX(rX)
    setRotateY(rY)

    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100
    setGlarePos({ x: glareX, y: glareY, opacity: glareOpacity })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.4 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Specular Glare Reflection Layer */}
      <div
        className="tilt-glare"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(14, 165, 165, 0.4) 0%, transparent 65%)`,
          opacity: glarePos.opacity,
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="tilt-card-content">{children}</div>
    </motion.div>
  )
}
