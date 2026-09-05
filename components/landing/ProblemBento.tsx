'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  EyeOff,
  ClockAlert,
  GitBranchPlus,
  ShieldAlert,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export function ProblemBento() {
  return (
    <section id="problem" className="relative py-20 bg-[#070A0E] text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-mono font-bold text-red-400 mb-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <ShieldAlert size={13} />
            <span>CRITICAL WEAPONIZED THREAT LANDSCAPE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Why Traditional Content Moderation{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-400 to-red-500">
              Fails Law Enforcement
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            Police cyber units and security dispatchers face an asymmetric crisis against weaponized deepfake swarms.
          </p>
        </div>

        {/* 3 Crisis Bento Cards with Rich Visual Diagrams */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CARD 01: Indistinguishable to Human Eye */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-red-500/30 backdrop-blur-md flex flex-col justify-between hover:border-red-500/60 transition-all group shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                  <EyeOff size={20} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border text-red-400 bg-red-500/10 border-red-500/30">
                  CRISIS VECTOR #01
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-sans mb-3">
                Indistinguishable to Human Eye
              </h3>

              {/* Visual Diagram: Human Retina vs Neural Tensor Grid */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 my-3 shadow-inner">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 pb-1.5 border-b border-slate-800">
                  <span>HUMAN EYE vs NEURAL TENSOR</span>
                  <span className="text-red-400 font-bold">98.4% Blind Spot</span>
                </div>
                <svg viewBox="0 0 280 80" className="w-full h-20" fill="none">
                  {/* Left: Human Optical Cone */}
                  <g transform="translate(10, 8)">
                    <circle cx="28" cy="32" r="22" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="28" cy="32" r="8" fill="#ef4444" opacity="0.3" />
                    <circle cx="28" cy="32" r="3" fill="#ef4444" />
                    <text x="28" y="68" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">Human Vision: Misses</text>
                  </g>
                  {/* Center Divider Arrow */}
                  <g transform="translate(125, 32)">
                    <line x1="0" y1="0" x2="20" y2="0" stroke="#64748b" strokeWidth="1.5" />
                    <polygon points="20,0 14,-3 14,3" fill="#64748b" />
                  </g>
                  {/* Right: Neural ViT Patch Scan Grid */}
                  <g transform="translate(165, 6)">
                    <rect x="0" y="0" width="56" height="56" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                    <line x1="18" y1="0" x2="18" y2="56" stroke="#10b981" strokeOpacity="0.4" />
                    <line x1="38" y1="0" x2="38" y2="56" stroke="#10b981" strokeOpacity="0.4" />
                    <line x1="0" y1="18" x2="56" y2="18" stroke="#10b981" strokeOpacity="0.4" />
                    <line x1="0" y1="38" x2="56" y2="38" stroke="#10b981" strokeOpacity="0.4" />
                    <rect x="18" y="18" width="20" height="20" fill="#ef4444" opacity="0.6" className="animate-pulse" />
                    <text x="28" y="70" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="middle">ViT: Tensor Flag</text>
                  </g>
                </svg>
              </div>

              {/* Concise Forensic Points */}
              <div className="space-y-2 mt-3 text-xs text-slate-300 font-sans">
                <div className="flex items-start gap-2">
                  <XCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Sub-surface skin reflectance &amp; vocal timbre deceive manual reviewers</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Only 16x16 cross-attention patch tensors expose synthetic boundaries</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">IMPACT VECTOR:</span>
              <b className="text-red-400 font-bold">
                <AnimatedCounter value="98.4% Human Error Rate" duration={1.6} />
              </b>
            </div>
          </motion.div>

          {/* CARD 02: Post-Viral Moderation Gap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-amber-500/30 backdrop-blur-md flex flex-col justify-between hover:border-amber-500/60 transition-all group shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <ClockAlert size={20} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border text-amber-400 bg-amber-500/10 border-amber-500/30">
                  CRISIS VECTOR #02
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-sans mb-3">
                Post-Viral Moderation Gap
              </h3>

              {/* Visual Diagram: Velocity Timeline Comparison */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 my-3 shadow-inner">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 pb-1.5 border-b border-slate-800">
                  <span>DISINFORMATION VELOCITY TIMELINE</span>
                  <span className="text-amber-400 font-bold">&lt; 15m Virality</span>
                </div>
                
                {/* Timeline Bars */}
                <div className="space-y-2 py-1 font-mono text-[10px]">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-0.5">
                      <span>Botnet Viral Swarm</span>
                      <span className="text-red-400 font-bold">15 Mins</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-amber-500 to-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-0.5">
                      <span>Police Manual Lab Review</span>
                      <span className="text-slate-500">2–3 Weeks</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div className="w-1/4 h-full bg-slate-700" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-0.5">
                      <span className="text-emerald-300 font-bold">Kavach Autonomous Sealing</span>
                      <span className="text-emerald-400 font-bold">&lt; 60 Sec</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Concise Forensic Points */}
              <div className="space-y-2 mt-3 text-xs text-slate-300 font-sans">
                <div className="flex items-start gap-2">
                  <XCircle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Disinformation causes irreversible financial/civic damage within minutes</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Kavach seals Section 65B hash evidence autonomously before viral peak</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">IMPACT VECTOR:</span>
              <b className="text-amber-400 font-bold">
                <AnimatedCounter value="< 15 Min Viral Velocity" duration={1.6} />
              </b>
            </div>
          </motion.div>

          {/* CARD 03: Broken Cross-Platform Provenance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-cyan-500/30 backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/60 transition-all group shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <GitBranchPlus size={20} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border text-cyan-400 bg-cyan-500/10 border-cyan-500/30">
                  CRISIS VECTOR #03
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-sans mb-3">
                Broken Cross-Platform Provenance
              </h3>

              {/* Visual Diagram: Stripped Forwarding Chain */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 my-3 shadow-inner">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 pb-1.5 border-b border-slate-800">
                  <span>DISSEMINATION HOP TRACE</span>
                  <span className="text-rose-400 font-bold">EXIF Stripped ❌</span>
                </div>
                <svg viewBox="0 0 280 80" className="w-full h-20" fill="none">
                  {/* Node 1: Seed */}
                  <g transform="translate(10, 20)">
                    <rect width="44" height="34" rx="6" fill="#0f172a" stroke="#00f2fe" strokeWidth="1.2" />
                    <text x="22" y="17" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SEED</text>
                    <text x="22" y="27" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">Darknet</text>
                  </g>
                  {/* Arrow 1 */}
                  <line x1="58" y1="37" x2="80" y2="37" stroke="#38bdf8" strokeWidth="1.5" />
                  {/* Node 2: Telegram */}
                  <g transform="translate(84, 20)">
                    <rect width="50" height="34" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.2" />
                    <text x="25" y="17" fill="#fbbf24" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">TELEGRAM</text>
                    <text x="25" y="27" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">Encrypted</text>
                  </g>
                  {/* Severed Link Red Cross */}
                  <g transform="translate(138, 28)">
                    <line x1="0" y1="9" x2="16" y2="9" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
                    <circle cx="8" cy="9" r="6" fill="#ef4444" />
                    <text x="8" y="12" fill="#fff" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">✕</text>
                  </g>
                  {/* Node 3: WhatsApp / X */}
                  <g transform="translate(160, 20)">
                    <rect width="52" height="34" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="1.2" />
                    <text x="26" y="17" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">WHATSAPP</text>
                    <text x="26" y="27" fill="#ef4444" fontSize="7" fontFamily="monospace" textAnchor="middle">EXIF Void</text>
                  </g>
                  {/* Node 4: Kavach pHash Anchor */}
                  <g transform="translate(222, 12)">
                    <rect width="50" height="50" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.8" />
                    <text x="25" y="23" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">KAVACH</text>
                    <text x="25" y="34" fill="#a7f3d0" fontSize="7" fontFamily="monospace" textAnchor="middle">pHash Re-link</text>
                    <text x="25" y="44" fill="#10b981" fontSize="7" fontFamily="monospace" textAnchor="middle">✓ Ground 0</text>
                  </g>
                </svg>
              </div>

              {/* Concise Forensic Points */}
              <div className="space-y-2 mt-3 text-xs text-slate-300 font-sans">
                <div className="flex items-start gap-2">
                  <XCircle size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Re-encoding strips EXIF atoms, breaking court-admissible custody</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Perceptual hash graphs reconstruct propagation back to seed zero</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">IMPACT VECTOR:</span>
              <b className="text-cyan-400 font-bold">
                <AnimatedCounter value="Zero Native Traceability" duration={1.6} />
              </b>
            </div>
          </motion.div>

          {/* Hero Solution Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-12 p-7 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-slate-900/40 border-2 border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <ShieldCheck size={28} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  THE KAVACH AI MANDATE
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-white font-sans">
                  Shifting Media Verification from Slow Manual Review to an Autonomous Forensic Layer
                </h4>
                <p className="text-slate-300 text-sm mt-1.5 leading-relaxed font-sans max-w-3xl">
                  By unifying spatial-spectral neural lattices, reverse perceptual hash graphs, and tamper-evident Merkle custody vaults, Kavach AI arms cyber units with sub-60-second legal certitude.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProblemBento
