'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UploadCloud,
  Cpu,
  Fingerprint,
  Network,
  FileSpreadsheet,
  Brain,
  ArrowRight,
  ChevronRight,
  Layers,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Activity,
  ShieldCheck,
  Lock,
  Binary,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

export function ArchitecturePipelineFlow() {
  const [activeStep, setActiveStep] = useState<number>(0)

  const steps = [
    {
      num: '01',
      title: 'Lossless Media Intake',
      category: 'STAGE 01 // VOLATILE RAM',
      icon: UploadCloud,
      shortLabel: 'Ingestion & Hashing',
      tagColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      accentGlow: 'from-cyan-500/20 to-transparent',
      borderColor: 'border-cyan-500/40',
      desc: 'Lossless ingestion of suspect MP4, WAV, RAW, or PNG media into memory-safe enclave. Instantly generates SHA-256, SHA-512, and 64-bit perceptual hash (pHash) fingerprints.',
      telemetry: {
        metric1: 'SHA-256 HASH GENERATION',
        val1: '< 8ms Instant Lock',
        metric2: 'PERCEPTUAL HASH (pHash)',
        val2: '64-bit Bitmask Vector',
        status: 'IMMUTABLE SEED LOCKED',
      },
    },
    {
      num: '02',
      title: 'Multi-Modal Neural Engine',
      category: 'STAGE 02 // NEURAL CLASSIFIER',
      icon: Cpu,
      shortLabel: 'ViT & ELA Tensors',
      tagColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      accentGlow: 'from-emerald-500/20 to-transparent',
      borderColor: 'border-emerald-500/40',
      desc: 'Simultaneous Vision Transformer (ViT) 16x16 patch cross-attention, Error Level Analysis (ELA) compression heatmaps, and 14.8 kHz phase vocoder audio checks reveal biological anomalies.',
      telemetry: {
        metric1: 'ViT PATCH COHERENCE',
        val1: '36 Spatial Attention Tiles',
        metric2: 'ACOUSTIC VOCODER FLOOR',
        val2: '14.8 kHz Phase Loss Flagged',
        status: 'MULTI-MODAL INFERENCE PASS',
      },
    },
    {
      num: '03',
      title: 'C2PA & EXIF Provenance',
      category: 'STAGE 03 // PROVENANCE LAYER',
      icon: Fingerprint,
      shortLabel: 'Hardware Attestation',
      tagColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      accentGlow: 'from-amber-500/20 to-transparent',
      borderColor: 'border-amber-500/40',
      desc: 'Inspects hardware CMOS capture assertions, X.509 cryptographic certificate chains, and MP4 atom container structures to identify software-layer manipulation and EXIF stripping.',
      telemetry: {
        metric1: 'C2PA CRYPTOGRAPHIC MANIFEST',
        val1: 'X.509 Cert Chain Verified',
        metric2: 'CONTAINER ATOM STRUCTURE',
        val2: 'Lossless Re-quantization',
        status: 'HARDWARE CAPTURE ROOT',
      },
    },
    {
      num: '04',
      title: 'Graph Origin Tracing',
      category: 'STAGE 04 // BOTNET DISCOVERY',
      icon: Network,
      shortLabel: 'Dissemination Graph',
      tagColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      accentGlow: 'from-purple-500/20 to-transparent',
      borderColor: 'border-purple-500/40',
      desc: 'Traverses social media propagation graphs across Telegram, WhatsApp, Discord, and public feeds to isolate relay botnets and pinpoint the earliest ground-zero seed account.',
      telemetry: {
        metric1: 'CROSS-PLATFORM REACH',
        val1: 'Telegram & WhatsApp Hops',
        metric2: 'GROUND-ZERO RESOLUTION',
        val2: 'Seed Node #KV-92 Isolated',
        status: 'BOTNET SWARM TRACED',
      },
    },
    {
      num: '05',
      title: 'Court Dossier & HSM Seal',
      category: 'STAGE 05 // LEGAL CERTIFICATION',
      icon: FileSpreadsheet,
      shortLabel: '§65B / §63 Dossier',
      tagColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      accentGlow: 'from-emerald-500/20 to-transparent',
      borderColor: 'border-emerald-500/40',
      desc: 'Synthesizes an ISO/IEC 27037 compliant Section 65B (IEA) & Section 63 (BSA) court certificate with Merkle tree inclusion proofs and tamper-proof FIPS 140-3 HSM timestamps.',
      telemetry: {
        metric1: 'MERKLE TREE ROOT PROOF',
        val1: 'Zero-Knowledge Inclusion',
        metric2: 'STATUTORY CERTIFICATE',
        val2: 'Auto §65B / §63 BSA PDF',
        status: 'COURT-ADMISSIBLE SEALED',
      },
    },
  ]

  const current = steps[activeStep]
  const CurrentIcon = current.icon

  return (
    <section id="architecture" className="relative py-24 bg-[#070A0E] text-white overflow-hidden">
      {/* Background Ambience & Cyber Grid */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-400 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Layers size={13} />
            <span>CYCLICAL FORENSIC ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            How the Working Pipeline{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300">
              Operates in a Loop
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            A synchronized 5-stage closed-loop pipeline where suspect assets are ingested, classified, verified, traced, and cryptographically sealed.
          </p>
        </div>

        {/* Top Orchestration Layer: Forensic LLM Investigator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900/90 via-cyan-950/40 to-slate-900/90 border-2 border-cyan-500/40 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.2)] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 flex-shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Brain size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  OVERARCHING REASONING LAYER
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                Forensic LLM Orchestration &amp; Autonomous Pipeline Controller
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
                Fuses signals across all 5 cyclical stages, reconciles optical flow discrepancies with audio vocoder phase losses, and outputs court-ready intelligence.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-nowrap shadow-inner">
            <Sparkles size={14} className="text-cyan-400" />
            <span>FUSED INFERENCE: 99.4% CONFIDENCE</span>
          </div>
        </motion.div>

        {/* CYCLICAL PIPELINE STEPPER BAR (Connected Nodes with Directional Flow) */}
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isSelected = activeStep === idx
              const isLast = idx === steps.length - 1

              return (
                <div key={step.num} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      sfx.playClick()
                      setActiveStep(idx)
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-full relative z-10 ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)] scale-[1.02]'
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span className={`font-mono text-xs font-extrabold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                        {step.num}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-cyan-400 block mb-0.5 font-bold">
                        {step.category.split('//')[1]}
                      </span>
                      <strong className={`text-xs sm:text-sm font-bold font-sans block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {step.shortLabel}
                      </strong>
                    </div>

                    {/* Active Bottom Glow Indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="activePipelineGlow"
                        className="absolute -bottom-1 left-4 right-4 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                      />
                    )}
                  </button>

                  {/* Directional Connector Arrow between steps */}
                  {!isLast && (
                    <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-cyan-400/60 pointer-events-none">
                      <ChevronRight size={18} className="animate-pulse" />
                    </div>
                  )}

                  {/* Cyclical Loop Back Indicator on last item */}
                  {isLast && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-emerald-400/60 pointer-events-none items-center" title="Cyclical Continuous Verification">
                      <RefreshCw size={15} className="animate-[spin_8s_linear_infinite]" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ACTIVE STAGE DEEP DIVE DIAGRAM & TELEMETRY CANVAS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.num}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className={`p-7 sm:p-9 rounded-3xl bg-slate-900/80 border-2 ${current.borderColor} backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden`}
          >
            {/* Corner Decorative Ambient Glow */}
            <div className={`absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br ${current.accentGlow} rounded-full blur-3xl pointer-events-none`} />

            {/* Left Stage Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${current.tagColor}`}>
                  {current.category}
                </span>
                <span className="text-xs font-mono text-slate-400">CYCLICAL STEP {current.num}/05</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans flex items-center gap-3">
                <CurrentIcon className="text-cyan-400" size={28} />
                <span>{current.title}</span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                {current.desc}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>ISO/IEC 27037 Tamper-Proof</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <Lock size={14} className="text-cyan-400" />
                  <span>FIPS 140-3 Hardware Sealed</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Telemetry & Diagram Card */}
            <div className="lg:col-span-5 flex flex-col gap-4 relative z-10">
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col gap-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                  <span className="text-white font-bold flex items-center gap-2">
                    <Activity size={16} className="text-cyan-400" />
                    <span>DIAGNOSTIC TELEMETRY</span>
                  </span>
                  <span className="text-emerald-400 font-bold animate-pulse">● LIVE CYCLE</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-400">{current.telemetry.metric1}:</span>
                    <b className="text-cyan-400 text-sm font-bold">{current.telemetry.val1}</b>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-400">{current.telemetry.metric2}:</span>
                    <b className="text-white text-sm font-bold">{current.telemetry.val2}</b>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-emerald-400">
                    <span>STATUS:</span>
                    <b className="font-bold">{current.telemetry.status}</b>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ArchitecturePipelineFlow
