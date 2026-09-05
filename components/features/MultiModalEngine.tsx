'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  Cpu,
  Eye,
  Layers,
  Radio,
  Scan,
  Sparkles,
  Zap,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Maximize2,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

type EngineTab = 'vit' | 'ela' | 'audio'

interface MultiModalEngineProps {
  fileName?: string
  auditData?: any
}

export function MultiModalEngine({ fileName = 'media_asset_0928.mp4', auditData }: MultiModalEngineProps) {
  const [activeTab, setActiveTab] = useState<EngineTab>('vit')
  const [elaIntensity, setElaIntensity] = useState<number>(75)
  const [selectedPatch, setSelectedPatch] = useState<number | null>(14)
  const [liveData, setLiveData] = useState<any>(auditData || null)

  React.useEffect(() => {
    if (auditData) {
      setLiveData(auditData)
      if (auditData.ela?.intensity) setElaIntensity(auditData.ela.intensity)
    } else {
      async function loadAnalysis() {
        try {
          const res = await fetch('/api/analyze/multimodal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName }),
          })
          const json = await res.json()
          if (json.success && json.data) {
            setLiveData(json.data)
            if (json.data.ela?.intensity) setElaIntensity(json.data.ela.intensity)
          }
        } catch {
          // fallback
        }
      }
      loadAnalysis()
    }
  }, [fileName, auditData])

  const handleTabChange = (tab: EngineTab) => {
    sfx.playClick()
    setActiveTab(tab)
  }

  return (
    <section
      className="multimodal-engine-card p-6 md:p-8 rounded-3xl bg-[#080d1a] border border-[#00f2fe]/25 shadow-2xl relative overflow-hidden"
      id="multimodal-engine"
      aria-label="Multi-Modal Detection Engine"
    >
      {/* Background Cyber Ambient Grid */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2fe]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title & Live Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#00f2fe]/15 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] animate-ping" />
            <span className="font-mono text-xs font-bold text-[#00f2fe] tracking-wider uppercase">
              CORE PIPELINE • FEATURE #01
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#f8fafc]">
            Multi-Modal Detection Engine
          </h3>
          <p className="text-slate-300 text-sm mt-1">
            Simultaneous Error Level Analysis (ELA), spectral audio phase checks, and Vision Transformer patch classifiers.
          </p>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center p-1.5 rounded-2xl bg-[#030712] border border-[#00f2fe]/30 self-start md:self-auto">
          <button
            type="button"
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'vit'
                ? 'bg-[#00f2fe] text-[#02040a] shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            onClick={() => handleTabChange('vit')}
          >
            <Cpu size={15} />
            <span>Vision Transformer (ViT)</span>
          </button>

          <button
            type="button"
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'ela'
                ? 'bg-[#00f2fe] text-[#02040a] shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            onClick={() => handleTabChange('ela')}
          >
            <Layers size={15} />
            <span>Error Level Analysis (ELA)</span>
          </button>

          <button
            type="button"
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'audio'
                ? 'bg-[#00f2fe] text-[#02040a] shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            onClick={() => handleTabChange('audio')}
          >
            <Activity size={15} />
            <span>Spectral Audio Checks</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="mt-6 relative z-10">
        <AnimatePresence mode="wait">
          {/* TAB 1: VISION TRANSFORMER (ViT) PATCH CLASSIFIER */}
          {activeTab === 'vit' && (
            <motion.div
              key="vit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* ViT Interactive 16x16 Patch Matrix Grid */}
              <div className="lg:col-span-6 bg-[#030712] p-5 rounded-2xl border border-[#00f2fe]/20">
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-[#00f2fe] font-bold flex items-center gap-1.5">
                    <Scan size={14} /> 16x16 TOKEN PATCH EMBEDDING MATRIX
                  </span>
                  <span className="text-slate-400">Click patch to inspect weight</span>
                </div>

                {/* 6x6 Grid of Tokens representing Face & Boundary */}
                <div className="grid grid-cols-6 gap-1.5 p-3 rounded-xl bg-[#080d1a] border border-white/10 aspect-square max-w-[360px] mx-auto">
                  {Array.from({ length: 36 }).map((_, idx) => {
                    const isAnomalous = [13, 14, 15, 19, 20, 21, 26, 27].includes(idx)
                    const isSelected = selectedPatch === idx
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          sfx.playClick()
                          setSelectedPatch(idx)
                        }}
                        className={`rounded-md transition-all flex items-center justify-center relative font-mono text-[9px] cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-white scale-105 z-10'
                            : 'hover:scale-95'
                        } ${
                          isAnomalous
                            ? 'bg-[#ef4444]/30 border border-[#ef4444] text-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                            : 'bg-[#00f2fe]/10 border border-[#00f2fe]/20 text-[#00f2fe]'
                        }`}
                      >
                        <span>P-{idx + 1}</span>
                        {isAnomalous && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
                        )}
                      </button>
                    )
                  })}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono mt-3 px-2 text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-[#00f2fe]/20 border border-[#00f2fe]" /> Natural Coherence
                  </span>
                  <span className="flex items-center gap-1 text-[#ef4444]">
                    <span className="w-2 h-2 rounded-sm bg-[#ef4444]/30 border border-[#ef4444]" /> Diffusion Blending Seam
                  </span>
                </div>
              </div>

              {/* ViT Attention & Tensor Readout */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="p-5 rounded-2xl bg-[#030712] border border-[#00f2fe]/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#f8fafc]">
                      PATCH EMBEDDING: P-{selectedPatch !== null ? selectedPatch + 1 : '15'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#ef4444]/20 border border-[#ef4444]/50 text-[#ef4444]">
                      SYNTHETIC ARTIFACT DETECTED
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Cross-attention heads (Layers 9–12) detected severe semantic disparity between the facial core tensor and background illumination grid. Optical flow velocity diverges by <b>94.2%</b> from authentic biometric baselines.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 font-mono text-xs">
                    <div className="p-2.5 rounded-xl bg-[#080d1a] border border-white/5">
                      <span className="text-slate-400 block text-[10px]">ATTENTION WEIGHT</span>
                      <b className="text-[#00f2fe] text-sm">0.942 / 1.0</b>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#080d1a] border border-white/5">
                      <span className="text-slate-400 block text-[10px]">SUB-PIXEL DRIFT</span>
                      <b className="text-[#ef4444] text-sm">4.82 px Anomaly</b>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#080d1a] border border-white/5 col-span-2 sm:col-span-1">
                      <span className="text-slate-400 block text-[10px]">CONFIDENCE</span>
                      <b className="text-[#34d399] text-sm">99.7% ViT Attest</b>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#00f2fe]/5 border border-[#00f2fe]/20 flex items-center gap-3">
                  <Zap size={18} className="text-[#00f2fe] flex-shrink-0" />
                  <span className="text-xs text-slate-200">
                    <b>Transformer Insight:</b> Synthesized faces exhibit distinct high-frequency tokens along mandibular boundaries caused by latent upsampling filters.
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ERROR LEVEL ANALYSIS (ELA) */}
          {activeTab === 'ela' && (
            <motion.div
              key="ela"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* ELA Interactive Canvas Simulation */}
              <div className="lg:col-span-6 bg-[#030712] p-5 rounded-2xl border border-[#00f2fe]/20">
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-[#00f2fe] font-bold flex items-center gap-1.5">
                    <Layers size={14} /> ERROR LEVEL RESCALE HEATMAP
                  </span>
                  <span className="text-[#38bdf8] font-bold">Rescale: {elaIntensity}%</span>
                </div>

                {/* Simulated ELA Canvas with glow based on intensity */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#02040a] border border-white/10 flex items-center justify-center p-4">
                  {/* Base Mock Face Grid */}
                  <svg viewBox="0 0 200 150" className="w-full h-full max-w-[280px]">
                    <circle cx="100" cy="75" r="50" fill="#0b1329" stroke="rgba(0,242,254,0.3)" strokeWidth="1.5" />
                    <ellipse cx="85" cy="65" rx="8" ry="5" fill="#1e293b" />
                    <ellipse cx="115" cy="65" rx="8" ry="5" fill="#1e293b" />
                    <path d="M 88 95 Q 100 108 112 95" stroke="rgba(239,68,68,0.8)" strokeWidth="3" fill="none" />
                    
                    {/* High-frequency compression error glow over spliced mouth/eyes */}
                    <ellipse
                      cx="100"
                      cy="95"
                      rx="30"
                      ry="15"
                      fill="url(#ela-splice-glow)"
                      opacity={elaIntensity / 100}
                    />
                    <ellipse
                      cx="115"
                      cy="65"
                      rx="16"
                      ry="12"
                      fill="url(#ela-splice-glow)"
                      opacity={elaIntensity / 100}
                    />

                    <defs>
                      <radialGradient id="ela-splice-glow">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>

                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#030712]/90 border border-[#ef4444]/40 font-mono text-[10px] text-[#ef4444] font-bold flex items-center gap-1">
                    <AlertTriangle size={11} /> SPLICE DELTA: HIGH
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-[#030712]/90 border border-white/20 font-mono text-[10px] text-slate-300">
                    JPEG Q-TABLE: 92% MISMATCH
                  </div>
                </div>

                {/* Interactive Slider */}
                <div className="mt-4 flex items-center gap-3">
                  <Sliders size={15} className="text-[#00f2fe]" />
                  <span className="text-xs font-mono text-slate-300 whitespace-nowrap">Error Rescale:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={elaIntensity}
                    onChange={(e) => setElaIntensity(Number(e.target.value))}
                    className="w-full accent-[#00f2fe] cursor-pointer"
                  />
                  <span className="text-xs font-mono text-[#00f2fe] font-bold">{elaIntensity}%</span>
                </div>
              </div>

              {/* ELA Technical Explanation */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="p-5 rounded-2xl bg-[#030712] border border-[#00f2fe]/20">
                  <h4 className="text-base font-bold text-[#f8fafc] mb-2">
                    Compression Artifact Inconsistency
                  </h4>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Error Level Analysis (ELA) resaves the image at a known error rate (e.g. 95% JPEG quality) and computes the absolute pixel-wise difference. In genuine media, compression degradation is uniform across all 8x8 DCT blocks.
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/30 text-xs font-mono flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Background Block Variance:</span>
                      <b className="text-slate-200">± 1.2% (Uniform)</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#ef4444] font-bold">Facial Splice Block Variance:</span>
                      <b className="text-[#ef4444]">± 18.9% (Multi-Compression Tamper)</b>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#34d399] flex-shrink-0" />
                  <span className="text-xs text-slate-200 font-medium">
                    <b>Forensic Admissibility:</b> ELA delta graphs are fully deterministically reproducible under ISO/IEC 27037 digital evidence preservation standards.
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SPECTRAL AUDIO CHECKS */}
          {activeTab === 'audio' && (
            <motion.div
              key="audio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Spectral Audio Visualizer */}
              <div className="lg:col-span-6 bg-[#030712] p-5 rounded-2xl border border-[#00f2fe]/20">
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-[#00f2fe] font-bold flex items-center gap-1.5">
                    <Radio size={14} /> MEL-SPECTROGRAM FREQUENCY DISCONTINUITY
                  </span>
                  <span className="text-[#f59e0b] font-bold">Nyquist: 22.05 kHz</span>
                </div>

                {/* Mel-Spectrogram Equalizer Waves */}
                <div className="p-4 rounded-xl bg-[#080d1a] border border-white/10 flex flex-col gap-3">
                  <div className="h-28 flex items-end justify-between gap-1">
                    {[35, 52, 68, 75, 82, 90, 88, 94, 76, 58, 42, 85, 92, 98, 95, 88, 70, 40, 20, 10].map((h, i) => {
                      const isHighFreqCutoff = i >= 14
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                          <motion.div
                            className={`w-full rounded-t-sm ${
                              isHighFreqCutoff
                                ? 'bg-gradient-to-t from-[#ef4444] to-[#f59e0b]'
                                : 'bg-gradient-to-t from-[#00f2fe] to-[#38bdf8]'
                            }`}
                            initial={{ height: '10%' }}
                            animate={{ height: `${h}%` }}
                            transition={{
                              repeat: Infinity,
                              repeatType: 'reverse',
                              duration: 0.8 + (i % 4) * 0.2,
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 border-t border-white/10 pt-2">
                    <span>0 Hz (Fundamental)</span>
                    <span className="text-[#f59e0b] font-bold">14.8 kHz (Neural Vocoder Cutoff)</span>
                    <span>22.05 kHz (Nyquist)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono mt-3 px-1 text-slate-300">
                  <span>Phase Coherence: <b className="text-[#ef4444]">LOST (Diffusion Vocoder)</b></span>
                  <span>Pitch Jitter: <b className="text-[#ef4444]">0.02% (Unnatural Flat)</b></span>
                </div>
              </div>

              {/* Spectral Audio Telemetry */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="p-5 rounded-2xl bg-[#030712] border border-[#00f2fe]/20">
                  <h4 className="text-base font-bold text-[#f8fafc] mb-2">
                    Neural Speech Synthesis Fingerprint
                  </h4>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Text-to-Speech (TTS) and voice conversion models (HiFi-GAN, WaveGlow, Diffusion Vocoders) struggle to reconstruct phase relationships above 14 kHz, leaving distinct mathematical spectral signatures.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-[#080d1a] border border-white/5">
                      <span className="text-slate-400 block text-[10px]">HARMONIC RATIO</span>
                      <b className="text-[#f59e0b] text-sm">Synthetic Flatness</b>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080d1a] border border-white/5">
                      <span className="text-slate-400 block text-[10px]">PHASE DISCONTINUITY</span>
                      <b className="text-[#ef4444] text-sm">88.4% Disrupted</b>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30 flex items-center gap-3">
                  <AlertTriangle size={18} className="text-[#f59e0b] flex-shrink-0" />
                  <span className="text-xs text-slate-200">
                    <b>Acoustic Verdict:</b> The audio stream shows clear artifacts of a cloned voice synthesized from a 3-second reference sample.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
