'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Terminal, Cpu, Lock, Scale } from 'lucide-react'
import { CyberShieldHero } from './CyberShieldHero'
import { NeuralBackground } from './NeuralBackground'
import { sfx } from '@/lib/soundEffects'

interface HeroSectionProps {
  onSignInClick?: () => void
}

export function HeroSection({ onSignInClick }: HeroSectionProps) {
  return (
    <section className="hero-viewport relative overflow-hidden" id="hero" aria-label="AI Forensic Defense Terminal">
      {/* Dark Ambient Neural Background */}
      <NeuralBackground />

      {/* Cyber Ambient Lighting Halos */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 2-Column Hero Layout */}
      <div className="hero-zerog-grid relative z-10 items-center">
        {/* LEFT COLUMN: Headline & Directives */}
        <motion.div
          className="hero-left-col flex flex-col gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Sleek Inline Pill Tag Above Headline with Cyan Pulse */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f2fe]" />
            <span className="font-bold text-cyan-300">[● WHY KAVACH.AI]</span>
            <span className="text-slate-300 font-sans">Real-time facial biometric lattice &amp; acoustic neural scan</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-sans m-0">
            Detect Deepfakes.<br />
            <span className="text-[#ef4444] drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]">Defend Digital Truth.</span>
          </h1>

          {/* Clean Readable Subtitle */}
          <p className="text-[#94a3b8] text-base md:text-lg leading-relaxed font-sans max-w-xl m-0">
            An air-gapped forensic terminal engineered for state cyber crime divisions, judicial discovery, and banking security to analyze synthetic media and seal court-admissible Section 65B evidence packages.
          </p>

          {/* 3 Dark Feature Cards with Signature Top Rim Lighting */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <div className="p-3.5 bg-slate-900/70 border border-slate-800 border-t-2 border-t-emerald-500/80 rounded-lg flex flex-col gap-1 backdrop-blur-md shadow-lg hover:border-emerald-500/40 transition-all">
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                <Lock size={13} className="text-emerald-400" /> Zero-Data Sandbox
              </span>
              <b className="text-sm text-slate-100 font-sans">Air-Gapped GPU VRAM</b>
            </div>

            <div className="p-3.5 bg-slate-900/70 border border-slate-800 border-t-2 border-t-cyan-500/80 rounded-lg flex flex-col gap-1 backdrop-blur-md shadow-lg hover:border-cyan-500/40 transition-all">
              <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                <Cpu size={13} className="text-cyan-400" /> Multi-Modal Radar
              </span>
              <b className="text-sm text-slate-100 font-sans">ViT + ELA + Vocoder</b>
            </div>

            <div className="p-3.5 bg-slate-900/70 border border-slate-800 border-t-2 border-t-red-500/80 rounded-lg flex flex-col gap-1 backdrop-blur-md shadow-lg hover:border-red-500/40 transition-all">
              <span className="text-xs font-mono text-red-400 font-semibold flex items-center gap-1.5">
                <Scale size={13} className="text-red-400" /> Legal Admissibility
              </span>
              <b className="text-sm text-slate-100 font-sans">Sec 65B IEA / 63 BSA</b>
            </div>
          </div>

          {/* Action Row with High-Contrast Cyan & Dark Outline Buttons */}
          <div className="hero-action-row mt-2 flex items-center gap-4 flex-wrap">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3.5 rounded-lg transition-all shadow-[0_0_22px_rgba(0,242,254,0.4)] hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] cursor-pointer text-sm"
              onClick={() => sfx.playScan()}
            >
              <Terminal size={16} />
              <span><b>LAUNCH FORENSIC SCANNER</b></span>
            </Link>

            <a
              href="#key-features"
              className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white bg-slate-900/50 hover:bg-slate-800/80 px-6 py-3.5 rounded-lg transition-all cursor-pointer text-sm font-semibold backdrop-blur-sm"
              onClick={() => sfx.playClick()}
            >
              <span><b>EXPLORE DETECTION ENGINE</b></span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Natural Floating 3D Shield with Ambient Cyan Halo */}
        <motion.div
          className="hero-right-col flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <CyberShieldHero />
        </motion.div>
      </div>
    </section>
  )
}
