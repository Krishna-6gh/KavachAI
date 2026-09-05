'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Pause, Play, Volume2, VolumeX } from 'lucide-react'

interface WaveformProps {
  onBandSelect?: (band: string) => void
}

export function Waveform({ onBandSelect }: WaveformProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackPos, setPlaybackPos] = useState(35) // percentage
  const [activeBand, setActiveBand] = useState<'all' | 'artifact' | 'base'>('all')

  const totalBars = 56

  const bars = useMemo(() => {
    return Array.from({ length: totalBars }, (_, i) => {
      // Create high-frequency anomaly spike in the 36-48 range
      const isArtifactZone = i >= 36 && i <= 46
      const baseHeight = 10 + Math.abs(Math.sin(i * 0.45)) * 34 + (i % 5 === 0 ? 14 : 0)
      const height = isArtifactZone ? baseHeight * 1.35 : baseHeight
      return {
        id: i,
        height: Math.min(58, Math.max(8, Math.round(height))),
        isArtifact: isArtifactZone,
        freqKhz: ((i / totalBars) * 22.4).toFixed(1),
      }
    })
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackPos((prev) => (prev >= 98 ? 0 : prev + 1.2))
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.min(100, Math.max(0, (clickX / rect.width) * 100))
    setPlaybackPos(percent)
  }

  return (
    <div className="spectral-lab-wrap">
      {/* Audio Toolbar Controls */}
      <div className="spectral-controls">
        <button
          type="button"
          className="play-toggle-btn"
          onClick={() => setIsPlaying((prev) => !prev)}
          aria-label={isPlaying ? 'Pause spectral playback' : 'Play spectral audio'}
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          <span>{isPlaying ? 'PAUSE SPECTROGRAM' : 'ANALYZE AUDIO STREAM'}</span>
        </button>

        <div className="freq-band-filters">
          <button
            type="button"
            className={`band-pill ${activeBand === 'all' ? 'active' : ''}`}
            onClick={() => {
              setActiveBand('all')
              onBandSelect?.('all')
            }}
          >
            0 — 22.4 kHz
          </button>
          <button
            type="button"
            className={`band-pill alert-pill ${activeBand === 'artifact' ? 'active' : ''}`}
            onClick={() => {
              setActiveBand('artifact')
              onBandSelect?.('artifact')
            }}
          >
            <AlertCircle size={10} /> 14.8+ kHz ANOMALY
          </button>
        </div>
      </div>

      {/* Interactive Playable Waveform Container */}
      <div
        className="waveform-interactive-container"
        onClick={handleBarClick}
        title="Click anywhere to scrub playback head"
      >
        {/* Playback Sweep Scrubber Head */}
        <div
          className="playback-scrubber-head"
          style={{ left: `${playbackPos}%` }}
          aria-hidden="true"
        >
          <div className="scrubber-line" />
          <div className="scrubber-badge">
            {((playbackPos / 100) * 2.4).toFixed(2)}s
          </div>
        </div>

        {/* Animated Spectral Frequency Bars */}
        <div className="waveform-bars-row">
          {bars.map((bar, i) => {
            const isHighlighted =
              activeBand === 'artifact'
                ? bar.isArtifact
                : true
            const isPlayed = (i / totalBars) * 100 <= playbackPos

            return (
              <motion.i
                key={bar.id}
                style={{ height: bar.height }}
                className={`spectral-bar ${bar.isArtifact ? 'artifact-spike' : ''} ${
                  isPlayed ? 'is-played' : ''
                } ${!isHighlighted ? 'dimmed' : ''}`}
                animate={{
                  scaleY: isPlaying ? [0.85, 1.25, 0.9] : 1,
                  opacity: bar.isArtifact ? [0.7, 1, 0.7] : [0.4, 0.85, 0.4],
                }}
                transition={{
                  duration: 0.8 + (i % 4) * 0.12,
                  repeat: isPlaying ? Infinity : 0,
                  delay: (i % 6) * 0.04,
                  ease: 'easeInOut',
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Frequency Diagnostic Readout */}
      <div className="wave-legend">
        <span className="flex items-center gap-1">
          <span className="amber-dot" />
          <b>14.8 kHz</b> Phase Discontinuity Peak
        </span>
        <span className="mono-sub font-bold">NYQUIST LIMIT 22.4 kHz • 32-BIT PCM</span>
      </div>
    </div>
  )
}
