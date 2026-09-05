'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Terminal,
  Activity,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  FileText,
  CheckCircle2,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

interface CyberHeroProps {
  onOpenSpecimen?: () => void
  onSignInClick?: () => void
}

export function CyberHero({ onOpenSpecimen, onSignInClick }: CyberHeroProps) {
  const statBadges = [
    {
      stat: '2,137%',
      label: 'Deepfake Surge (2022–2025)',
      subtext: 'Year-over-Year Cyber Incident Spike',
      highlight: 'text-emerald-400',
      border: 'border-emerald-500/30 bg-emerald-500/5',
    },
    {
      stat: '8 Million',
      label: 'Circulating Deepfakes',
      subtext: 'Unmoderated Messaging Swarms',
      highlight: 'text-cyan-400',
      border: 'border-cyan-500/30 bg-cyan-500/5',
    },
    {
      stat: '$25 Million',
      label: 'Arup Video-Scam Loss',
      subtext: 'Executive Voice & Video Impersonation',
      highlight: 'text-rose-400',
      border: 'border-rose-500/30 bg-rose-500/5',
    },
    {
      stat: '< 60 Sec',
      label: 'Forensic Verdict Speed',
      subtext: 'Autonomous Section 65B HSM Sealing',
      highlight: 'text-emerald-300',
      border: 'border-emerald-500/30 bg-emerald-500/5',
    },
  ]

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#070A0E] text-slate-100">
      {/* Background Cyber Glow & Vector Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Chandigarh Police Hackathon 2026 • Autonomous Media Forensics</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] font-sans max-w-4xl"
        >
          Autonomous AI Forensic{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.45)]">
            Investigator
          </span>{' '}
          &amp; Origin Tracing
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl font-sans"
        >
          Detect synthetic media, explain manipulations in plain English, trace ground-zero social dissemination, and preserve court-admissible evidence in under 60 seconds.
        </motion.p>

        {/* Quick Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          {/* Primary CTA: Get Started -> Investigator Console */}
          <Link
            href="/console"
            onClick={() => sfx.playSeal()}
            className="group relative inline-flex items-center gap-3.5 px-8 py-4 rounded-2xl font-sans text-sm sm:text-base text-[#070A0E] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:shadow-[0_0_55px_rgba(6,182,212,0.8)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer no-underline overflow-hidden border border-emerald-300/60"
          >
            {/* Ambient Animated Sheen on Hover */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-[-25deg] -translate-x-full group-hover:translate-x-[320%] transition-transform duration-1000 ease-out pointer-events-none" />

            <span className="p-1.5 rounded-xl bg-black/15 backdrop-blur-sm flex items-center justify-center shadow-inner">
              <Terminal size={17} className="text-[#070A0E] group-hover:rotate-12 transition-transform duration-300" />
            </span>
            <span className="tracking-tight uppercase font-black font-mono text-sm sm:text-base">
              Get Started
            </span>
            <ArrowRight size={17} className="text-[#070A0E] transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>

          {/* Secondary Action: See More -> Scrolls smoothly to crisis landscape */}
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
        </motion.div>

        {/* Compliance & Trust Markers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400"
        >
          <span className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 size={14} className="text-emerald-400" />
            ISO/IEC 27037 Compliant
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 size={14} className="text-emerald-400" />
            Section 65B IEA / Sec 63 BSA Ready
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 size={14} className="text-emerald-400" />
            FIPS 140-3 HSM Root of Trust
          </span>
        </motion.div>

        {/* Threat Stat Badges Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left border-t border-slate-800/80 pt-10"
        >
          {statBadges.map((badge) => (
            <div
              key={badge.stat}
              className={`p-5 rounded-2xl border backdrop-blur-md flex flex-col justify-between ${badge.border} transition-transform hover:-translate-y-1 shadow-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${badge.highlight}`}>
                  <AnimatedCounter value={badge.stat} duration={2.0} />
                </span>
                <Activity size={18} className={badge.highlight} />
              </div>
              <div>
                <strong className="text-white text-sm font-sans font-bold block">{badge.label}</strong>
                <span className="text-slate-400 text-xs font-sans mt-0.5 block">{badge.subtext}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
