'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CyberCursor() {
  const [mounted, setMounted] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 24, stiffness: 260, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) })
      if (!isVisible) setIsVisible(true)

      // Detect if hovering over clickable/interactive elements
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.dropzone') ||
          target.closest('.mode-btn') ||
          target.closest('.signal-card') ||
          target.closest('.evidence-card'))
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible])

  if (!mounted || !isVisible) return null

  return (
    <div className="cyber-cursor-container" aria-hidden="true">
      {/* Precision Center Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Trailing Cyber Reticle Ring */}
      <motion.div
        className={`cursor-ring ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <div className="reticle-corner tl" />
        <div className="reticle-corner tr" />
        <div className="reticle-corner bl" />
        <div className="reticle-corner br" />
      </motion.div>

      {/* Live Coordinate Telemetry Badge */}
      <motion.div
        className="cursor-telemetry"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <span>
          X:{String(coords.x).padStart(4, '0')} Y:{String(coords.y).padStart(4, '0')}
        </span>
      </motion.div>
    </div>
  )
}
