'use client'

import React, { useState, useEffect } from 'react'
import { AlertCircle, Film, Play, Pause } from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

const totalFrames = 18

export function TemporalEvidenceCard() {
  const [selectedFrame, setSelectedFrame] = useState(12)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedFrame((prev) => (prev >= totalFrames ? 1 : prev + 1))
      }, 140)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const handleFrameClick = (frameNum: number) => {
    sfx.playClick()
    setSelectedFrame(frameNum)
  }

  const togglePlay = () => {
    sfx.playClick()
    setIsPlaying((prev) => !prev)
  }

  return (
    <article className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between h-full" aria-label="Spatial-Temporal Optical Flow Evidence">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Film size={14} className="text-cyan-400" />
          <span className="text-xs font-mono font-bold text-cyan-400">
            SPATIAL-TEMPORAL LATTICE // 18-FRAME MATRIX
          </span>
        </div>
        <button
          type="button"
          className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
          onClick={togglePlay}
          title={isPlaying ? 'Pause frame playback' : 'Play keyframe sequence'}
        >
          {isPlaying ? <Pause size={10} /> : <Play size={10} />}
          <span>{isPlaying ? 'PAUSE' : 'PLAY 18-FRAMES'}</span>
        </button>
      </div>

      {/* 18 Keyframe Tiles */}
      <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg my-2">
        <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5">
          {Array.from({ length: totalFrames }, (_, i) => {
            const frameNum = i + 1
            const isSelected = selectedFrame === frameNum
            const isAnomalyZone = frameNum >= 10 && frameNum <= 15

            return (
              <button
                key={frameNum}
                type="button"
                onClick={() => handleFrameClick(frameNum)}
                className={`p-1.5 text-center font-mono text-[10px] font-bold rounded border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_10px_rgba(0,242,254,0.3)]'
                    : isAnomalyZone
                    ? 'bg-red-500/20 text-red-400 border-red-500/50'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                #{String(frameNum).padStart(2, '0')}
              </button>
            )
          })}
        </div>
      </div>

      {/* Telemetry */}
      <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-lg font-mono text-xs">
        <div className="flex justify-between items-center pb-1 border-b border-slate-800 text-[11px]">
          <span className="font-bold text-white">
            FRAME #{String(selectedFrame).padStart(3, '0')} • RESIDUAL
          </span>
          {selectedFrame >= 10 && selectedFrame <= 15 ? (
            <span className="text-red-400 font-bold flex items-center gap-1 text-[10px]">
              <AlertCircle size={12} /> OPTICAL FLOW JITTER
            </span>
          ) : (
            <span className="text-emerald-400 font-bold text-[10px]">BASELINE PASS</span>
          )}
        </div>

        <p className="text-[11px] text-[#94a3b8] font-sans m-0 mt-1.5 leading-relaxed">
          {selectedFrame >= 10 && selectedFrame <= 15
            ? 'Inter-frame optical flow vectors exhibit 1.84px spatial phase discontinuity along mandibular boundary.'
            : 'Keyframe temporal delta conforms to standard H.264 motion estimation matrix.'}
        </p>
      </div>
    </article>
  )
}
