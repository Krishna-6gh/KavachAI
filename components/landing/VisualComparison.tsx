'use client'

import React, { useState } from 'react'
import { Eye, AlertTriangle, CheckCircle2, SplitSquareVertical, Sliders } from 'lucide-react'

export function VisualComparison() {
  const [sliderPos, setSliderPos] = useState(50)
  const [viewMode, setViewMode] = useState<'split' | 'heatmap' | 'original'>('split')

  return (
    <section className="visual-comparison-section my-12 px-4 max-w-[1300px] mx-auto" id="comparison" aria-label="Forensic Optical Comparison Lens">
      <div className="section-intro text-center mb-8 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[#00f2fe] text-xs font-mono font-bold mb-3">
          OPTICAL MICROSCOPY  BEFORE &amp; AFTER
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans m-0">
          Forensic Optical Comparison Lens
        </h2>
        <p className="text-[#94a3b8] text-base mt-2 leading-relaxed font-sans">
          Slide across to inspect generative diffusion artifacts, pixel seam warping, and Error Level Analysis (ELA) deltas.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex justify-center mb-6">
        <div className="p-1.5 bg-slate-900/80 border border-slate-800 rounded-lg flex gap-1 flex-wrap">
          <button
            type="button"
            className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-md flex items-center gap-2 cursor-pointer transition-all ${
              viewMode === 'split' ? 'bg-cyan-500/20 text-[#00f2fe] border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
            onClick={() => setViewMode('split')}
          >
            <SplitSquareVertical size={14} />
            <span>Split Slider</span>
          </button>
          <button
            type="button"
            className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-md flex items-center gap-2 cursor-pointer transition-all ${
              viewMode === 'heatmap' ? 'bg-red-500/20 text-[#ef4444] border border-red-500/40' : 'text-slate-400 hover:text-white'
            }`}
            onClick={() => setViewMode('heatmap')}
          >
            <AlertTriangle size={14} className="text-[#ef4444]" />
            <span>AI Heatmap</span>
          </button>
          <button
            type="button"
            className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-md flex items-center gap-2 cursor-pointer transition-all ${
              viewMode === 'original' ? 'bg-emerald-500/20 text-[#34d399] border border-emerald-500/40' : 'text-slate-400 hover:text-white'
            }`}
            onClick={() => setViewMode('original')}
          >
            <Eye size={14} className="text-[#34d399]" />
            <span>Raw Capture</span>
          </button>
        </div>
      </div>

      {/* Main Comparison Stage */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="relative h-80 md:h-96 bg-slate-950 overflow-hidden">
          {/* Base Layer */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <svg viewBox="0 0 300 200" className="w-full h-full max-w-sm">
              <circle cx="150" cy="100" r="60" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
              <circle cx="130" cy="90" r="6" fill="#38bdf8" />
              <circle cx="170" cy="90" r="6" fill="#38bdf8" />
              <path d="M 135 125 Q 150 135 165 125" stroke="#38bdf8" strokeWidth="2" fill="none" />
              <line x1="90" y1="100" x2="210" y2="100" stroke="rgba(56, 189, 248, 0.2)" strokeDasharray="3 3" />
              <line x1="150" y1="40" x2="150" y2="160" stroke="rgba(56, 189, 248, 0.2)" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Top Layer: GAN Anomaly Heatmap */}
          <div
            className="absolute inset-0 bg-red-950/40 overflow-hidden"
            style={{
              clipPath:
                viewMode === 'heatmap'
                  ? 'inset(0 0 0 0)'
                  : viewMode === 'original'
                  ? 'inset(0 100% 0 0)'
                  : `inset(0 0 0 ${sliderPos}%)`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center p-6">
              <svg viewBox="0 0 300 200" className="w-full h-full max-w-sm">
                <circle cx="150" cy="100" r="60" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="2" />
                <circle cx="130" cy="90" r="8" fill="#ef4444" />
                <circle cx="170" cy="90" r="8" fill="#ef4444" />
                <path d="M 130 120 Q 150 145 170 120" stroke="#ef4444" strokeWidth="3" fill="none" />
                <ellipse cx="150" cy="120" rx="35" ry="18" fill="rgba(239, 68, 68, 0.35)" />
              </svg>
            </div>
          </div>

          {/* Interactive Drag Handle */}
          {viewMode === 'split' && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 z-20 pointer-events-none -translate-x-1/2 shadow-[0_0_10px_#00f2fe]"
              style={{ left: `${sliderPos}%` }}
              aria-hidden="true"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-mono text-[10px] font-bold shadow-[0_0_15px_#00f2fe]">
                <Sliders size={14} />
              </div>
            </div>
          )}

          {/* Transparent Range Input */}
          {viewMode === 'split' && (
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 opacity-0 z-30 cursor-ew-resize w-full h-full m-0"
              aria-label="Comparison slider"
            />
          )}
        </div>

        {/* Telemetry Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between font-mono text-xs flex-wrap gap-2">
          <div>
            <span className="text-slate-400">INSPECTION: </span>
            <b className="text-white">
              {sliderPos < 40 ? 'RAW OPTICAL FOOTAGE' : sliderPos > 60 ? 'AI ERROR LEVEL ANALYSIS' : '50/50 DUAL COMPARISON'}
            </b>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={14} /> LEFT: GENUINE
            </span>
            <span className="text-red-400 font-bold flex items-center gap-1">
              <AlertTriangle size={14} /> RIGHT: SYNTHETIC SPLICE
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
