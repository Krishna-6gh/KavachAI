'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ShieldAlert,
  FileText,
  CheckCircle2,
  Hash,
  ArrowUpRight,
  ArrowDown,
  X,
  Terminal,
  ArrowRight,
  Activity,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export default function HeroSection() {
  const [isSpecimenOpen, setIsSpecimenOpen] = useState(false)

  return (
    <section className="relative overflow-hidden pt-16 pb-20 bg-[#070A0E] text-slate-100">
      {/* Background Cyber Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-600/15 via-cyan-600/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Compliance Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Chandigarh Police Hackathon 2026 • Autonomous Media Forensics
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight font-sans">
          Autonomous AI Forensic{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            Investigator
          </span>{' '}
          &amp; Origin Tracing
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans">
          Detect synthetic media, explain manipulations in plain English, trace ground-zero social dissemination, and preserve court-admissible evidence in under 60 seconds.
        </p>

        {/* Quick Action CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <Link
            href="/console"
            onClick={() => sfx.playSeal()}
            className="group relative inline-flex items-center gap-3.5 px-8 py-4 rounded-2xl font-sans text-sm sm:text-base text-[#070A0E] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:shadow-[0_0_55px_rgba(6,182,212,0.8)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer no-underline overflow-hidden border border-emerald-300/60"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-[-25deg] -translate-x-full group-hover:translate-x-[320%] transition-transform duration-1000 ease-out pointer-events-none" />
            <span className="p-1.5 rounded-xl bg-black/15 backdrop-blur-sm flex items-center justify-center shadow-inner">
              <Terminal size={17} className="text-[#070A0E] group-hover:rotate-12 transition-transform duration-300" />
            </span>
            <span className="tracking-tight uppercase font-black font-mono text-sm sm:text-base">
              Get Started
            </span>
            <ArrowRight size={17} className="text-[#070A0E] transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>

          <button
            type="button"
            onClick={() => {
              sfx.playClick()
              const problemEl = document.getElementById('problem')
              if (problemEl) {
                problemEl.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-2xl border border-slate-700/80 bg-slate-900/90 hover:border-emerald-400/60 hover:bg-slate-800/90 text-slate-200 hover:text-white shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer text-sm sm:text-base font-sans font-bold"
          >
            <span className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 group-hover:bg-emerald-500/25 transition-colors">
              <ArrowDown size={16} className="text-emerald-400 group-hover:translate-y-0.5 transition-transform duration-300" />
            </span>
            <span className="tracking-wide">See More</span>
          </button>
        </div>

        {/* Threat Metric Counters (from PPT) */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/60 pt-8">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              <AnimatedCounter value="2,137%" duration={2.0} />
            </div>
            <div className="text-xs text-slate-400 mt-1 font-sans">Deepfake Surge (2022–2025)</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
              <AnimatedCounter value="8 Million" duration={2.0} />
            </div>
            <div className="text-xs text-slate-400 mt-1 font-sans">Circulating Deepfakes</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">
              <AnimatedCounter value="$25 Million" duration={2.0} />
            </div>
            <div className="text-xs text-slate-400 mt-1 font-sans">Arup Video-Scam Loss</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">
              <AnimatedCounter value="< 60 Sec" duration={2.0} />
            </div>
            <div className="text-xs text-slate-400 mt-1 font-sans">Forensic Verdict Speed</div>
          </div>
        </div>
      </div>

      {/* FORENSIC SPECIMEN DOCKET MODAL */}
      {isSpecimenOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-left overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-white text-base font-sans m-0">
                  Forensic Specimen Record: <span className="font-mono text-emerald-400">#KV-89204-IND</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSpecimenOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Specimen Content */}
            <div className="mt-4 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 bg-slate-950/70 p-3 rounded-lg border border-slate-800 font-mono text-xs">
                <div>
                  <span className="text-slate-500">INGEST TIMESTAMP:</span>
                  <p className="text-slate-300 m-0">2026-09-05T20:14:02Z</p>
                </div>
                <div>
                  <span className="text-slate-500">FORENSIC VERDICT:</span>
                  <p className="text-rose-400 font-bold m-0">SYNTHETIC MANIPULATION (98.4%)</p>
                </div>
                <div className="col-span-2 truncate">
                  <span className="text-slate-500">SHA-256 LEDGER HASH:</span>
                  <p className="text-emerald-400 truncate m-0">
                    7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-300 text-xs uppercase tracking-wider mb-1">
                  Plain-English LLM Investigator Finding:
                </h4>
                <p className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg text-slate-300 text-xs leading-relaxed m-0">
                  "Facial boundary analysis identifies generative neural replacement artifacts around the mandibular boundary. Error Level Analysis (ELA) confirms localized quantization inconsistencies consistent with diffusion inpainting. Spectral audio check indicates synthetic acoustic discontinuity at 8.4 kHz."
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Indian Evidence Act Compliance Sealed
                </span>
                <span className="text-slate-400 font-mono">Chain Block #1,402</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
export { HeroSection }
