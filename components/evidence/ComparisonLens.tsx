'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Eye, Flame, Maximize2, Scan, ShieldAlert, Sparkles } from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

export function ComparisonLens() {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [zoomActive, setZoomActive] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleMove = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.min(97, Math.max(3, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX)
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX)
    }
  }

  const handleStartInteraction = () => {
    sfx.playClick()
    setIsDragging(true)
  }

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <div className="p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-cyan-500/80 rounded-xl flex flex-col justify-between h-full backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Scan size={14} className="text-[#00f2fe] animate-pulse" />
          <span className="text-xs font-mono font-bold text-cyan-400">
            ERROR LEVEL ANALYSIS // RESIDUAL LENS
          </span>
        </div>

        <button
          type="button"
          className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white rounded-md cursor-pointer hover:border-cyan-500/40 transition-all"
          onClick={() => {
            sfx.playClick()
            setZoomActive((prev) => !prev)
          }}
          title="Toggle 1.5x Forensic Zoom"
        >
          {zoomActive ? '1.5X ZOOM' : '1.0X NORMAL'}
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative h-64 md:h-72 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden select-none cursor-ew-resize my-2 shadow-inner"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleStartInteraction}
        onTouchStart={handleStartInteraction}
        role="region"
        aria-label="Interactive Split-Screen Error Level Analysis Lens"
      >
        {/* Background Image Layer: ELA Residual (Right Side) */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/evidence-ela.jpg"
            alt="Neural Error Level Analysis Heatmap"
            fill
            sizes="(max-width: 768px) 100vw, 650px"
            className="object-cover"
            priority
          />
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-950/80 border border-red-500/40 text-[10px] font-mono text-red-400 font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
            <Flame size={12} />
            <span>ELA RESIDUAL • 94.2% SYNTHESIS</span>
          </div>
        </div>

        {/* Foreground Image Layer: Raw Capture (Left Side, Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          <Image
            src="/evidence-raw.jpg"
            alt="Raw High-Resolution Facial Capture"
            fill
            sizes="(max-width: 768px) 100vw, 650px"
            className="object-cover"
            priority
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(0,242,254,0.3)]">
            <Eye size={12} />
            <span>RAW CAPTURE • BASELINE</span>
          </div>
        </div>

        {/* Laser Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 pointer-events-none -translate-x-1/2 shadow-[0_0_12px_#00f2fe]"
          style={{ left: `${sliderPos}%` }}
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-mono text-[9px] font-bold shadow-[0_0_18px_#00f2fe]">
            <Scan size={13} />
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
        <span className="text-slate-400 flex items-center gap-1.5">
          <Sparkles size={13} className="text-cyan-400" />
          SPATIAL DISPERSION: <b className="text-white">0.042 px / FRAME</b>
        </span>
        <span className="text-red-400 font-bold flex items-center gap-1">
          <ShieldAlert size={13} />
          BOUNDARY RESIDUAL: CONFIRMED
        </span>
      </div>
    </div>
  )
}
