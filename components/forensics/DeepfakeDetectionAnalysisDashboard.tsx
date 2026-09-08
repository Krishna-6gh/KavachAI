'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Sliders,
  Activity,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  Box,
  Fingerprint,
  Info,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

interface DeepfakeDetectionAnalysisProps {
  isAnalyzing?: boolean
  isFake?: boolean
  fileName?: string
  caseId?: string
  confidenceScore?: number
  authenticityScore?: number
  processingTime?: string
  onDownloadReport?: () => void
}

export function DeepfakeDetectionAnalysisDashboard({
  isAnalyzing = false,
  isFake = true,
  fileName = 'suspect_video_stream.mp4',
  caseId = 'DF-7X92-1K3L',
  confidenceScore = 96.8,
  authenticityScore = 18,
  processingTime = '00:00:03.842',
  onDownloadReport,
}: DeepfakeDetectionAnalysisProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [currentFrame, setCurrentFrame] = useState<number>(38)
  const [activeFrameThumbnail, setActiveFrameThumbnail] = useState<number>(38)
  const totalFrames = 300

  // Wireframe Animation Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Simulation timer for video scrub
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev >= totalFrames ? 1 : prev + 1))
      }, 80)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  // Draw cybernetic face wireframe on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let scanY = 0

    const renderMesh = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2 - 10

      // Draw cyber background grid
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.04)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Facial wireframe vertex points (Normalized coordinates)
      const vertices = [
        // Forehead / Crown
        { x: cx, y: cy - 90 },
        { x: cx - 40, y: cy - 80 },
        { x: cx + 40, y: cy - 80 },
        { x: cx - 70, y: cy - 50 },
        { x: cx + 70, y: cy - 50 },

        // Eyebrows
        { x: cx - 45, y: cy - 35 },
        { x: cx - 20, y: cy - 38 },
        { x: cx + 20, y: cy - 38 },
        { x: cx + 45, y: cy - 35 },

        // Eyes
        { x: cx - 40, y: cy - 20 },
        { x: cx - 20, y: cy - 20 },
        { x: cx + 20, y: cy - 20 },
        { x: cx + 40, y: cy - 20 },
        { x: cx - 30, y: cy - 15 },
        { x: cx + 30, y: cy - 15 },

        // Nose
        { x: cx, y: cy - 25 },
        { x: cx, y: cy + 10 },
        { x: cx - 18, y: cy + 15 },
        { x: cx + 18, y: cy + 15 },
        { x: cx, y: cy + 22 },

        // Cheeks & Temples
        { x: cx - 80, y: cy - 10 },
        { x: cx + 80, y: cy - 10 },
        { x: cx - 65, y: cy + 30 },
        { x: cx + 65, y: cy + 30 },

        // Mouth & Lips
        { x: cx - 30, y: cy + 45 },
        { x: cx + 30, y: cy + 45 },
        { x: cx, y: cy + 40 },
        { x: cx, y: cy + 55 },
        { x: cx - 18, y: cy + 48 },
        { x: cx + 18, y: cy + 48 },

        // Chin & Jawline
        { x: cx - 45, y: cy + 75 },
        { x: cx + 45, y: cy + 75 },
        { x: cx - 20, y: cy + 95 },
        { x: cx + 20, y: cy + 95 },
        { x: cx, y: cy + 105 },
      ]

      // Connect Mesh Edges (Polygonal triangulation)
      const edges = [
        [0, 1], [0, 2], [1, 3], [2, 4], [1, 5], [2, 8], [5, 6], [7, 8], [6, 7],
        [3, 20], [4, 21], [5, 9], [6, 10], [7, 11], [8, 12],
        [9, 13], [10, 13], [9, 10], [11, 14], [12, 14], [11, 12],
        [0, 15], [6, 15], [7, 15], [15, 16], [16, 17], [16, 18], [17, 19], [18, 19], [16, 19],
        [20, 22], [21, 23], [22, 30], [23, 31],
        [17, 24], [18, 25], [19, 26], [24, 26], [25, 26], [24, 28], [25, 29], [28, 27], [29, 27],
        [24, 30], [25, 31], [30, 32], [31, 33], [32, 34], [33, 34],
        [26, 27], [28, 29], [27, 34],
        [13, 17], [14, 18], [20, 9], [21, 12], [22, 24], [23, 25]
      ]

      // Draw Wireframe Lines
      ctx.strokeStyle = isFake ? '#00f2fe' : '#10b981'
      ctx.lineWidth = 1.2
      ctx.shadowColor = isFake ? 'rgba(0, 242, 254, 0.6)' : 'rgba(16, 185, 129, 0.6)'
      ctx.shadowBlur = 4

      edges.forEach(([i, j]) => {
        if (vertices[i] && vertices[j]) {
          ctx.beginPath()
          ctx.moveTo(vertices[i].x, vertices[i].y)
          ctx.lineTo(vertices[j].x, vertices[j].y)
          ctx.stroke()
        }
      })

      // Draw Vertices (Glow Nodes)
      ctx.shadowBlur = 6
      vertices.forEach((v, idx) => {
        ctx.fillStyle = isFake && [24, 25, 26, 27, 28, 29].includes(idx) ? '#f59e0b' : (isFake ? '#00f2fe' : '#34d399')
        ctx.beginPath()
        ctx.arc(v.x, v.y, isFake && [24, 25, 26, 27, 28, 29].includes(idx) ? 3 : 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw Animated Scanning Laser Bar
      scanY = (scanY + 1.5) % h
      const grad = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15)
      grad.addColorStop(0, 'rgba(0, 242, 254, 0)')
      grad.addColorStop(0.5, 'rgba(0, 242, 254, 0.45)')
      grad.addColorStop(1, 'rgba(0, 242, 254, 0)')

      ctx.fillStyle = grad
      ctx.fillRect(10, scanY - 15, w - 20, 30)

      ctx.strokeStyle = '#00f2fe'
      ctx.lineWidth = 1.5
      ctx.shadowColor = '#00f2fe'
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.moveTo(15, scanY)
      ctx.lineTo(w - 15, scanY)
      ctx.stroke()

      animationFrameId = requestAnimationFrame(renderMesh)
    }

    renderMesh()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isFake])

  const calculatedAuthenticity = isFake ? authenticityScore : 94
  const calculatedConfidence = isFake ? 'HIGH' : 'VERY HIGH'
  const calculatedStatus = isFake ? 'SYNTHETIC CONTENT DETECTED' : 'AUTHENTIC SENSOR STREAM'

  // Frames sequence data
  const frameThumbnails = [
    { num: 34, isAnom: false },
    { num: 35, isAnom: false },
    { num: 39, isAnom: false },
    { num: 38, isAnom: isFake },
    { num: 39, isAnom: isFake },
    { num: 40, isAnom: isFake },
    { num: 41, isAnom: false },
  ]

  return (
    <div className="w-full bg-[#050912] border border-[#00f2fe]/25 rounded-2xl p-4 md:p-6 text-slate-100 shadow-[0_0_50px_rgba(0,242,254,0.08)] font-sans relative overflow-hidden select-none">
      {/* Cyber Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f2fe05_1px,transparent_1px),linear-gradient(to_bottom,#00f2fe05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* ==================================================================== */}
      {/* 1. TOP HEADER BAR */}
      {/* ==================================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#00f2fe]/20 relative z-10">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black tracking-wider uppercase text-white m-0 flex items-center gap-3">
            <span>DEEPFAKE DETECTION ANALYSIS</span>
            {isFake && (
              <span className="px-2.5 py-0.5 rounded bg-red-500/20 border border-red-500/60 text-red-400 text-xs font-mono font-bold">
                THREAT DETECTED
              </span>
            )}
          </h1>
          <p className="text-[#00f2fe] text-xs md:text-sm font-mono tracking-widest uppercase mt-1 m-0">
            AI-POWERED VIDEO AUTHENTICATION SYSTEM // MULTI-MODAL DEEP CLOUD
          </p>
        </div>

        {/* Metadata Telemetry Pills */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-slate-300 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500">ANALYSIS ID: </span>
              <span className="text-[#00f2fe] font-bold">{caseId}</span>
            </div>
            <div className="hidden sm:block text-slate-700">|</div>
            <div>
              <span className="text-slate-500">MODEL: </span>
              <span className="text-slate-200 font-bold">ADVANCED-FORENSICS v3.2</span>
            </div>
            <div className="hidden sm:block text-slate-700">|</div>
            <div>
              <span className="text-slate-500">PROCESSING TIME: </span>
              <span className="text-slate-200 font-bold">{processingTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">STATUS</span>
            <span className="font-bold">ANALYSIS COMPLETE</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. MAIN 3-COLUMN INTERACTIVE MATRIX */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5 relative z-10">

        {/* ------------------------------------------------------------------ */}
        {/* LEFT COLUMN: Input Video Frame + Facial Landmark Analysis (4 Cols) */}
        {/* ------------------------------------------------------------------ */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          
          {/* Top-Left: INPUT VIDEO FRAME */}
          <div className="bg-[#070d18] border border-[#00f2fe]/20 rounded-xl p-4 flex flex-col relative overflow-hidden group">
            {/* HUD Corner Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00f2fe]" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00f2fe]" />
            <div className="absolute bottom-14 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00f2fe]" />
            <div className="absolute bottom-14 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00f2fe]" />

            <div className="flex items-center justify-between mb-2">
              <span className="text-[#00f2fe] text-xs font-mono font-bold tracking-wider uppercase">
                INPUT VIDEO FRAME
              </span>
              <span className="text-slate-400 text-[10px] font-mono">
                {fileName}
              </span>
            </div>

            {/* Cybernetic Wireframe Viewport Canvas */}
            <div className="w-full h-56 bg-[#04070f] rounded-lg border border-slate-800/80 flex items-center justify-center relative overflow-hidden my-1">
              <canvas
                ref={canvasRef}
                width={320}
                height={220}
                className="w-full h-full object-contain"
              />

              {/* Video Overlay Tag */}
              <div className="absolute top-3 left-3 bg-black/60 border border-[#00f2fe]/30 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-[#00f2fe]">
                LATTICE MESH // ACTIVE
              </div>
            </div>

            {/* Video Player Scrub Bar Controls */}
            <div className="flex flex-col gap-1.5 mt-3 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      sfx.playClick()
                      setIsPlaying(!isPlaying)
                    }}
                    className="text-[#00f2fe] hover:text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <span>00:00:01.250 / 00:00:10.000</span>
                </div>
                <span className="text-[#00f2fe] font-bold">
                  FRAME {currentFrame} / {totalFrames}
                </span>
              </div>

              {/* Progress Scrub Bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-[#00f2fe] to-cyan-400 rounded-full transition-all duration-75"
                  style={{ width: `${(currentFrame / totalFrames) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom-Left: FACIAL LANDMARK ANALYSIS */}
          <div className="bg-[#070d18] border border-[#00f2fe]/20 rounded-xl p-4 flex flex-col">
            <span className="text-[#00f2fe] text-xs font-mono font-bold tracking-wider uppercase mb-3">
              FACIAL LANDMARK ANALYSIS
            </span>

            <div className="grid grid-cols-12 gap-3 items-center">
              {/* Angled Wireframe Mini Head SVG */}
              <div className="col-span-5 h-36 bg-[#04070f] rounded-lg border border-slate-800/80 flex items-center justify-center relative p-2">
                <svg viewBox="0 0 100 120" className="w-full h-full text-[#00f2fe]">
                  {/* Outer Head Contour */}
                  <polygon
                    points="50,10 75,20 85,45 80,80 65,105 50,112 35,105 20,80 15,45 25,20"
                    fill="none"
                    stroke="#00f2fe"
                    strokeWidth="1.2"
                    strokeDasharray="2 1"
                  />
                  {/* Facial Triangle Grids */}
                  <line x1="50" y1="10" x2="35" y2="40" stroke="#00f2fe" strokeWidth="0.8" opacity="0.6" />
                  <line x1="50" y1="10" x2="65" y2="40" stroke="#00f2fe" strokeWidth="0.8" opacity="0.6" />
                  <line x1="35" y1="40" x2="65" y2="40" stroke="#00f2fe" strokeWidth="0.8" opacity="0.6" />
                  {/* Eyes */}
                  <circle cx="38" cy="48" r="4" fill="none" stroke="#00f2fe" strokeWidth="1.5" />
                  <circle cx="38" cy="48" r="1.5" fill="#00f2fe" />
                  <circle cx="62" cy="48" r="4" fill="none" stroke="#00f2fe" strokeWidth="1.5" />
                  <circle cx="62" cy="48" r="1.5" fill="#00f2fe" />
                  {/* Nose */}
                  <polygon points="50,42 44,70 56,70" fill="none" stroke="#00f2fe" strokeWidth="1" />
                  <circle cx="50" cy="70" r="1.5" fill="#00f2fe" />
                  {/* Mouth */}
                  <polygon points="36,88 50,82 64,88 50,94" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
                  <circle cx="50" cy="88" r="1.5" fill="#f59e0b" />
                  {/* Connecting Rays */}
                  <line x1="62" y1="48" x2="95" y2="48" stroke="#00f2fe" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="50" y1="70" x2="95" y2="70" stroke="#00f2fe" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="64" y1="88" x2="95" y2="88" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
                </svg>
              </div>

              {/* Callout Landmark Percentages List */}
              <div className="col-span-7 flex flex-col gap-2 font-mono text-xs">
                {[
                  { name: 'LEFT EYE', score: '98.7%', anom: false },
                  { name: 'RIGHT EYE', score: '98.2%', anom: false },
                  { name: 'NOSE', score: '99.1%', anom: false },
                  { name: 'MOUTH', score: '97.3%', anom: isFake },
                  { name: 'JAWLINE', score: '96.8%', anom: isFake },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-0.5 border-b border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className={`w-2 h-2 rounded-full ${item.anom ? 'bg-[#f59e0b]' : 'bg-[#00f2fe]'}`} />
                      <span className="text-[11px]">{item.name}</span>
                    </div>
                    <span className={`font-bold ${item.anom ? 'text-[#f59e0b]' : 'text-slate-200'}`}>
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------ */}
        {/* CENTER COLUMN: Analysis Results + Micro-Expressions (4 Cols)       */}
        {/* ------------------------------------------------------------------ */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          
          {/* Top-Center: ANALYSIS RESULTS */}
          <div className="bg-[#070d18] border border-[#00f2fe]/20 rounded-xl p-4 flex flex-col">
            <span className="text-[#00f2fe] text-xs font-mono font-bold tracking-wider uppercase mb-3">
              ANALYSIS RESULTS
            </span>

            {/* Threat Notification Banner */}
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                isFake
                  ? 'bg-amber-500/10 border-amber-500/60 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                  : 'bg-emerald-500/10 border-emerald-500/60 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
              }`}
            >
              {isFake ? (
                <AlertTriangle size={28} className="text-[#f59e0b] flex-shrink-0 animate-bounce" />
              ) : (
                <CheckCircle2 size={28} className="text-[#10b981] flex-shrink-0" />
              )}
              <div>
                <div className="font-mono text-xs md:text-sm font-black tracking-wide uppercase">
                  {calculatedStatus}
                </div>
                <div className="text-[11px] font-mono tracking-wider opacity-80 mt-0.5">
                  {isFake ? 'HIGH CONFIDENCE DETECTION' : 'AUTHENTIC HARDWARE STREAM'}
                </div>
              </div>
            </div>

            {/* Authenticity Score Meter */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <span className="text-slate-400 text-xs font-mono tracking-wider uppercase">
                AUTHENTICITY SCORE
              </span>

              <div className="flex items-baseline justify-between">
                <span
                  className={`text-4xl md:text-5xl font-black font-mono tracking-tight ${
                    isFake ? 'text-[#f59e0b]' : 'text-[#10b981]'
                  }`}
                >
                  {calculatedAuthenticity}%
                </span>

                <div className="flex flex-col items-end">
                  <span className="text-slate-500 text-[10px] font-mono">CONFIDENCE</span>
                  <span
                    className={`font-mono text-sm font-bold tracking-wide ${
                      isFake ? 'text-[#f59e0b]' : 'text-[#10b981]'
                    }`}
                  >
                    {calculatedConfidence}
                  </span>
                </div>
              </div>

              {/* Score Horizontal Slider Bar */}
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden relative border border-slate-800 my-1">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isFake
                      ? 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                      : 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]'
                  }`}
                  style={{ width: `${calculatedAuthenticity}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0% (SYNTHETIC)</span>
                <span>100% (AUTHENTIC)</span>
              </div>
            </div>
          </div>

          {/* Bottom-Center: MICRO-EXPRESSION ANALYSIS */}
          <div className="bg-[#070d18] border border-[#00f2fe]/20 rounded-xl p-4 flex flex-col">
            <span className="text-[#00f2fe] text-xs font-mono font-bold tracking-wider uppercase mb-3">
              MICRO-EXPRESSION ANALYSIS
            </span>

            <div className="grid grid-cols-12 gap-3 items-center">
              {/* Frontal Face Target Diagram */}
              <div className="col-span-5 h-44 bg-[#04070f] rounded-lg border border-slate-800/80 flex items-center justify-center relative p-2">
                <svg viewBox="0 0 100 120" className="w-full h-full text-[#00f2fe]">
                  {/* Wireframe Contour */}
                  <polygon
                    points="50,8 78,22 84,50 78,82 62,108 50,114 38,108 22,82 16,50 22,22"
                    fill="none"
                    stroke="#00f2fe"
                    strokeWidth="1.2"
                    opacity="0.8"
                  />
                  {/* Internal Grid Lines */}
                  <line x1="50" y1="8" x2="50" y2="114" stroke="#00f2fe" strokeWidth="0.6" strokeDasharray="2 2" />
                  <line x1="22" y1="50" x2="78" y2="50" stroke="#00f2fe" strokeWidth="0.6" strokeDasharray="2 2" />
                  {/* Target Crosshairs for Micro Expressions */}
                  {/* Left Eye */}
                  <circle cx="36" cy="46" r="5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="36" cy="46" r="2" fill="#f59e0b" />
                  {/* Right Eye */}
                  <circle cx="64" cy="46" r="5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="64" cy="46" r="2" fill="#f59e0b" />
                  {/* Brow */}
                  <circle cx="50" cy="34" r="4" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
                  <circle cx="50" cy="34" r="1.5" fill="#f59e0b" />
                  {/* Mouth */}
                  <circle cx="50" cy="85" r="5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="50" cy="85" r="2" fill="#f59e0b" />
                  {/* Chin / Head Anchor */}
                  <circle cx="50" cy="108" r="4" fill="none" stroke="#10b981" strokeWidth="1.2" />
                  <circle cx="50" cy="108" r="1.5" fill="#10b981" />
                </svg>
              </div>

              {/* Micro Expression Checklist Sensor Tags */}
              <div className="col-span-7 flex flex-col gap-2 font-mono text-xs">
                {[
                  { name: 'BLINK RATE', status: isFake ? 'ANOMALOUS' : 'NORMAL', isAnom: isFake },
                  { name: 'EYE MOVEMENT', status: isFake ? 'ANOMALOUS' : 'NORMAL', isAnom: isFake },
                  { name: 'BROW MOVEMENT', status: isFake ? 'ANOMALOUS' : 'NORMAL', isAnom: isFake },
                  { name: 'MOUTH MOVEMENT', status: isFake ? 'ANOMALOUS' : 'NORMAL', isAnom: isFake },
                  { name: 'HEAD MOVEMENT', status: 'NORMAL', isAnom: false },
                ].map((sensor, i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          sensor.isAnom ? 'bg-[#f59e0b] animate-ping' : 'bg-[#10b981]'
                        }`}
                      />
                      <span className="text-[10px] sm:text-[11px]">{sensor.name}</span>
                    </div>

                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        sensor.isAnom
                          ? 'bg-amber-500/20 text-[#f59e0b] border border-amber-500/40'
                          : 'bg-emerald-500/20 text-[#34d399] border border-emerald-500/40'
                      }`}
                    >
                      {sensor.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------ */}
        {/* RIGHT COLUMN: Temporal Consistency + Frame-by-Frame (4 Cols)       */}
        {/* ------------------------------------------------------------------ */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          
          {/* Top-Right: TEMPORAL CONSISTENCY */}
          <div className="bg-[#070d18] border border-[#00f2fe]/20 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#00f2fe] text-xs font-mono font-bold tracking-wider uppercase">
                TEMPORAL CONSISTENCY
              </span>
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="text-slate-400">— EXPECTED</span>
                <span className="text-[#00f2fe]">--- ACTUAL</span>
              </div>
            </div>

            {/* Line Graph Viewport */}
            <div className="w-full h-44 bg-[#04070f] rounded-lg border border-slate-800/80 p-2.5 flex flex-col justify-between relative overflow-hidden">
              <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
                {/* Horizontal Gridlines */}
                <line x1="25" y1="20" x2="290" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="25" y1="60" x2="290" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="25" y1="100" x2="290" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                {/* Y-Axis Labels */}
                <text x="5" y="24" fill="#64748b" fontSize="8" fontFamily="monospace">1.0</text>
                <text x="5" y="64" fill="#64748b" fontSize="8" fontFamily="monospace">0.5</text>
                <text x="5" y="104" fill="#64748b" fontSize="8" fontFamily="monospace">0.0</text>

                {/* Expected Line (Smooth Baseline) */}
                <path
                  d="M 25 35 Q 80 40 150 48 T 290 60"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="1.2"
                />

                {/* Actual Line (Fluctuating with Defect Dip) */}
                {isFake ? (
                  <path
                    d="M 25 30 L 40 45 L 55 35 L 70 50 L 90 42 L 110 52 L 130 58 L 150 75 L 165 95 L 175 90 L 190 40 L 210 50 L 230 65 L 250 85 L 270 70 L 290 65"
                    fill="none"
                    stroke="#00f2fe"
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                  />
                ) : (
                  <path
                    d="M 25 32 L 60 38 L 100 35 L 140 42 L 180 40 L 220 46 L 260 44 L 290 48"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                  />
                )}

                {/* Inconsistency Detected Callout Circle & Label */}
                {isFake && (
                  <g transform="translate(170, 92)">
                    <circle cx="0" cy="0" r="14" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping opacity-75" />
                    <circle cx="0" cy="0" r="10" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1.5" />
                    <text
                      x="0"
                      y="24"
                      fill="#ef4444"
                      fontSize="7.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      INCONSISTENCY DETECTED
                    </text>
                  </g>
                )}

                {/* X-Axis Numbers */}
                <text x="25" y="116" fill="#64748b" fontSize="7.5" fontFamily="monospace">0</text>
                <text x="90" y="116" fill="#64748b" fontSize="7.5" fontFamily="monospace">75</text>
                <text x="155" y="116" fill="#64748b" fontSize="7.5" fontFamily="monospace">150</text>
                <text x="220" y="116" fill="#64748b" fontSize="7.5" fontFamily="monospace">225</text>
                <text x="280" y="116" fill="#64748b" fontSize="7.5" fontFamily="monospace">300</text>
                <text x="155" y="125" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">FRAME</text>
              </svg>
            </div>
          </div>

          {/* Bottom-Right: FRAME-BY-FRAME ANOMALY DETECTION */}
          <div className="bg-[#070d18] border border-[#00f2fe]/20 rounded-xl p-4 flex flex-col">
            <span className="text-[#00f2fe] text-xs font-mono font-bold tracking-wider uppercase mb-3">
              FRAME-BY-FRAME ANOMALY DETECTION
            </span>

            {/* 7-Thumbnail Filmstrip Sequence */}
            <div className="grid grid-cols-7 gap-1.5 my-1">
              {frameThumbnails.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    sfx.playClick()
                    setActiveFrameThumbnail(item.num)
                    setCurrentFrame(item.num)
                  }}
                  className={`flex flex-col items-center cursor-pointer transition-all ${
                    activeFrameThumbnail === item.num ? 'scale-105' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Anomaly Indicator Icon Above */}
                  <div className="h-4 flex items-center justify-center">
                    {item.isAnom ? (
                      <AlertTriangle size={12} className="text-[#ef4444] animate-pulse" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    )}
                  </div>

                  {/* Thumbnail Box with Wireframe Face */}
                  <div
                    className={`w-full aspect-[3/4] rounded-md bg-[#030712] flex items-center justify-center p-1 border transition-all ${
                      item.isAnom
                        ? 'border-[#ef4444] shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                        : 'border-[#00f2fe]/40 hover:border-[#00f2fe]'
                    }`}
                  >
                    <svg viewBox="0 0 40 50" className={`w-full h-full ${item.isAnom ? 'text-[#ef4444]' : 'text-[#00f2fe]'}`}>
                      <polygon points="20,4 32,10 35,24 30,40 20,46 10,40 5,24 8,10" fill="none" stroke="currentColor" strokeWidth="1" />
                      <circle cx="15" cy="20" r="2" fill="currentColor" />
                      <circle cx="25" cy="20" r="2" fill="currentColor" />
                      <line x1="20" y1="18" x2="20" y2="30" stroke="currentColor" strokeWidth="0.8" />
                      <line x1="14" y1="36" x2="26" y2="36" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </div>

                  {/* Frame Number */}
                  <span
                    className={`text-[10px] font-mono mt-1 font-bold ${
                      item.isAnom ? 'text-[#ef4444]' : 'text-slate-400'
                    }`}
                  >
                    {item.num}
                  </span>
                </div>
              ))}
            </div>

            {/* Filmstrip Legend */}
            <div className="flex items-center justify-center gap-6 mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono">
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-0.5 bg-[#00f2fe]" />
                <span>NORMAL</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#ef4444]">
                <span className="w-3 h-0.5 bg-[#ef4444]" />
                <span>ANOMALY DETECTED</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* 3. BOTTOM SUMMARY & RECOMMENDATION BAR                               */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5 pt-4 border-t border-[#00f2fe]/20 relative z-10 items-stretch">
        
        {/* Left: DETECTION SUMMARY (4 Metrics) */}
        <div className="lg:col-span-7 bg-[#070d18] border border-[#00f2fe]/20 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[#00f2fe] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            DETECTION SUMMARY
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            {/* Metric 1 */}
            <div className="p-2.5 rounded-lg bg-[#04070f] border border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#f59e0b]">
                <Box size={16} />
              </div>
              <div>
                <span className="text-slate-500 text-[9px] block">ARTIFACTS</span>
                <span className={`text-xs font-bold ${isFake ? 'text-[#f59e0b]' : 'text-emerald-400'}`}>
                  {isFake ? 'DETECTED' : 'NONE'}
                </span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-2.5 rounded-lg bg-[#04070f] border border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#f59e0b]">
                <Activity size={16} />
              </div>
              <div>
                <span className="text-slate-500 text-[9px] block">INCONSISTENCIES</span>
                <span className={`text-xs font-bold ${isFake ? 'text-[#f59e0b]' : 'text-emerald-400'}`}>
                  {isFake ? 'HIGH' : 'LOW'}
                </span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-2.5 rounded-lg bg-[#04070f] border border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#f59e0b]">
                <Layers size={16} />
              </div>
              <div>
                <span className="text-slate-500 text-[9px] block">MANIPULATION</span>
                <span className={`text-xs font-bold ${isFake ? 'text-[#f59e0b]' : 'text-emerald-400'}`}>
                  {isFake ? 'LIKELY' : 'UNLIKELY'}
                </span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-2.5 rounded-lg bg-[#04070f] border border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <ShieldAlert size={16} />
              </div>
              <div>
                <span className="text-slate-500 text-[9px] block">SOURCE RELIABILITY</span>
                <span className={`text-xs font-bold ${isFake ? 'text-red-400' : 'text-emerald-400'}`}>
                  {isFake ? 'VERY LOW' : 'VERIFIED'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: RECOMMENDATION BANNER */}
        <div className="lg:col-span-5 bg-[#070d18] border border-[#00f2fe]/20 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[#00f2fe] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            RECOMMENDATION
          </span>

          <div
            className={`p-3 rounded-lg border flex items-center gap-3 ${
              isFake
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
            }`}
          >
            {isFake ? (
              <AlertTriangle size={24} className="text-[#f59e0b] flex-shrink-0" />
            ) : (
              <ShieldCheck size={24} className="text-[#10b981] flex-shrink-0" />
            )}
            <div>
              <div className="font-mono text-xs font-bold tracking-wide uppercase">
                {isFake ? 'CONTENT IS LIKELY SYNTHETIC' : 'CONTENT VERIFIED AUTHENTIC'}
              </div>
              <div className="text-[10px] font-sans text-slate-300 mt-0.5">
                {isFake
                  ? 'DO NOT TRUST THIS VIDEO AS AUTHENTIC. SECURED UNDER SECTION 63 BSA.'
                  : 'C2PA HARMONIC INTEGRITY MATCHES PHYSICAL HARDWARE SENSOR.'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
