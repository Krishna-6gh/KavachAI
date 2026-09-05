'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Activity, Radio, ShieldAlert } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export function UseCasesBento() {
  return (
    <section className="use-cases-section my-12 px-4 max-w-[1300px] mx-auto" id="use-cases" aria-label="Forensic Inspection Hub">
      {/* Section Header */}
      <div className="section-intro text-center mb-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[#00f2fe] text-xs font-mono font-bold mb-3 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
          MULTI-MODAL SENSORS
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans m-0">
          Forensic Inspection Hub
        </h2>
        <p className="text-[#94a3b8] text-base mt-2 leading-relaxed font-sans">
          Four real-time deterministic diagnostic engines analyzing biometric drift, cryptographic custody, spectral acoustic phase, and zero-knowledge liveness.
        </p>
      </div>

      {/* 4 Interactive Diagram Cards with Signature Top Rim Illumination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARD 1: CYBER CRIME: FACIAL LATTICE SCAN */}
        <motion.div
          className="p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-red-500/80 rounded-xl flex flex-col justify-between hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] transition-all duration-300 backdrop-blur-md"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block mb-1">
                MODULE 01: CRIME LAB
              </span>
              <h3 className="text-white text-lg font-bold font-sans m-0">
                CYBER CRIME: FACIAL LATTICE SCAN
              </h3>
            </div>
            <div className="w-9 h-9 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              <ShieldAlert size={18} />
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-center my-2 shadow-inner">
            <svg
              className="w-full h-36 max-w-[280px]"
              viewBox="0 0 340 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Facial Lattice Scan Mesh"
            >
              <g stroke="rgba(56, 189, 248, 0.45)" strokeWidth="1.2">
                <path d="M 170 24 C 120 24 95 65 95 105 C 95 145 130 168 170 168 C 210 168 245 145 245 105 C 245 65 220 24 170 24 Z" />
                <line x1="110" y1="58" x2="230" y2="58" />
                <line x1="100" y1="84" x2="240" y2="84" />
                <line x1="96" y1="108" x2="244" y2="108" />
                <line x1="110" y1="134" x2="230" y2="134" />
                <line x1="170" y1="24" x2="170" y2="168" stroke="rgba(0, 242, 254, 0.6)" strokeDasharray="3 3" />
                <path d="M 170 24 L 135 84 L 170 108 L 205 84 Z" />
                <path d="M 135 84 L 110 134 L 170 168 L 230 134 L 205 84" />
                <ellipse cx="140" cy="84" rx="14" ry="7" stroke="#38bdf8" />
                <ellipse cx="200" cy="84" rx="14" ry="7" stroke="#38bdf8" />
                <path d="M 170 70 L 164 104 L 176 104 Z" stroke="#38bdf8" />
                <path d="M 152 128 Q 170 120 188 128 Q 170 140 152 128 Z" stroke="#ef4444" strokeWidth="2.5" />
              </g>
              <g transform="translate(200, 84)">
                <circle cx="0" cy="0" r="10" stroke="#ef4444" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="4" fill="#ef4444" />
              </g>
              <g transform="translate(170, 130)">
                <circle cx="0" cy="0" r="12" stroke="#ef4444" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="5" fill="#ef4444" />
              </g>
            </svg>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
            <span className="text-red-400 font-bold">
              GAN Seam Warping Flagged
            </span>
            <span className="text-slate-200 font-bold px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30">
              <AnimatedCounter value="98.2% Anomaly" duration={1.5} />
            </span>
          </div>
        </motion.div>

        {/* CARD 2: JUDICIARY & COURTS: EVIDENCE CHAIN */}
        <motion.div
          className="p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-emerald-500/80 rounded-xl flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all duration-300 backdrop-blur-md"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                MODULE 02: LEGAL &amp; DISCOVERY
              </span>
              <h3 className="text-white text-lg font-bold font-sans m-0">
                JUDICIARY &amp; COURTS: EVIDENCE CHAIN
              </h3>
            </div>
            <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <Lock size={18} />
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-center my-2 shadow-inner">
            <svg
              className="w-full h-36 max-w-[280px]"
              viewBox="0 0 340 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Cryptographic Evidence Chain"
            >
              <path d="M 85 90 L 170 90" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 170 90 L 255 90" stroke="#10b981" strokeWidth="2.5" />
              <g transform="translate(38, 54)">
                <rect width="64" height="68" rx="6" fill="#0f172a" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.5" />
                <circle cx="32" cy="34" r="14" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" />
              </g>
              <g transform="translate(138, 46)">
                <circle cx="32" cy="44" r="38" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <rect x="22" y="40" width="20" height="15" rx="3" fill="#10b981" />
              </g>
              <g transform="translate(238, 54)">
                <rect width="64" height="68" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <path d="M 24 34 L 30 40 L 40 28" stroke="#10b981" strokeWidth="2.5" fill="none" />
              </g>
            </svg>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
            <span className="text-emerald-400 font-bold">
              §65B Evidence Act Merkle Sealed
            </span>
            <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              Immutable Root
            </span>
          </div>
        </motion.div>

        {/* CARD 3: MEDIA DESKS: SPECTRAL AUDIO RADAR */}
        <motion.div
          className="p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-amber-500/80 rounded-xl flex flex-col justify-between hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all duration-300 backdrop-blur-md"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                MODULE 03: BROADCAST DESK
              </span>
              <h3 className="text-white text-lg font-bold font-sans m-0">
                MEDIA DESKS: SPECTRAL AUDIO RADAR
              </h3>
            </div>
            <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              <Activity size={18} />
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-lg flex flex-col justify-end h-36 my-2 shadow-inner">
            <div className="flex items-end justify-between gap-1.5 h-24">
              {[42, 68, 88, 54, 95, 76, 62, 85, 90, 78, 92, 45, 82, 89, 96, 91, 86, 94].map((height, i) => {
                const isAnomalous = i >= 12
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm ${isAnomalous ? 'bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-[#00f2fe] shadow-[0_0_6px_rgba(0,242,254,0.3)]'}`}
                    style={{ height: `${height}%` }}
                  />
                )
              })}
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2 border-t border-slate-800 pt-1">
              <span>0 Hz</span>
              <span className="text-red-400 font-bold">
                <AnimatedCounter value="14.8 kHz Cutoff" duration={1.5} />
              </span>
              <span>22 kHz</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
            <span className="text-amber-400 font-bold">
              Vocoder Phase Discontinuity
            </span>
            <span className="text-red-400 font-bold px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30">
              Cloned Voice
            </span>
          </div>
        </motion.div>

        {/* CARD 4: FINTECH & BANKING: LIVENESS RADAR */}
        <motion.div
          className="p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-cyan-500/80 rounded-xl flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(0,242,254,0.15)] transition-all duration-300 backdrop-blur-md"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.16 }}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                MODULE 04: FINTECH &amp; KYC
              </span>
              <h3 className="text-white text-lg font-bold font-sans m-0">
                FINTECH &amp; BANKING: LIVENESS RADAR
              </h3>
            </div>
            <div className="w-9 h-9 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(0,242,254,0.2)]">
              <Radio size={18} />
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-center my-2 shadow-inner">
            <svg
              className="w-full h-36 max-w-[280px]"
              viewBox="0 0 340 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Liveness Radar Sweep"
            >
              <circle cx="170" cy="90" r="60" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" />
              <circle cx="170" cy="90" r="40" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1" />
              <circle cx="170" cy="90" r="20" stroke="#00f2fe" strokeWidth="1.5" />
              <line x1="100" y1="90" x2="240" y2="90" stroke="rgba(56, 189, 248, 0.3)" strokeDasharray="3 3" />
              <line x1="170" y1="20" x2="170" y2="160" stroke="rgba(56, 189, 248, 0.3)" strokeDasharray="3 3" />
              <line x1="170" y1="90" x2="220" y2="50" stroke="#10b981" strokeWidth="2.5" />
            </svg>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
            <span className="text-emerald-400 font-bold">
              Anti-Spoofing: Zero-Knowledge Pass
            </span>
            <span className="text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
              Mask Blocked
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
