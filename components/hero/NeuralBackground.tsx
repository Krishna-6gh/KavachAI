'use client'

import React, { useEffect, useRef } from 'react'

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      drawGrid()
    }

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height)

      // Very subtle ambient dark grid
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.18)'
      ctx.lineWidth = 1

      const step = 48
      for (let x = 0; x < width; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = 0; y < height; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Small cyan dots at intersections
      ctx.fillStyle = 'rgba(0, 242, 254, 0.15)'
      for (let x = step * 2; x < width; x += step * 4) {
        for (let y = step * 2; y < height; y += step * 4) {
          ctx.beginPath()
          ctx.arc(x, y, 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    drawGrid()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-40"
      aria-hidden="true"
    />
  )
}
