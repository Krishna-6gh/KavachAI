'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Eye,
  FileCheck,
  FileText,
  Fingerprint,
  Globe,
  Hash,
  Layers,
  Lock,
  Network,
  Radio,
  Scan,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Swords,
  Terminal,
  Zap,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'
import { StrongRoomModal } from '@/components/features/StrongRoomModal'

type FilterCategory = 'all' | 'core' | 'differentiator'

export function KeyFeaturesShowcase() {
  const [filter, setFilter] = useState<FilterCategory>('all')
  const [strongRoomOpen, setStrongRoomOpen] = useState<boolean>(false)
  const [elaIntensity, setElaIntensity] = useState<number>(85)

  const handleTabClick = (category: FilterCategory) => {
    sfx.playClick()
    setFilter(category)
  }

  return (
    <section
      className="key-features-section my-16 px-4 max-w-[1300px] mx-auto"
      id="key-features"
      aria-label="Key Features & Core Pipeline Architecture"
    >
      {/* Section Header */}
      <div className="section-intro text-center mb-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[#00f2fe] text-xs font-mono font-bold mb-3 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
          <Sparkles size={14} />
          <span>CHANDIGARH POLICE HACKATHON 2026 • SPECIFICATION</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-sans m-0">
          KEY FEATURES ARCHITECTURE
        </h2>
        <p className="text-[#94a3b8] text-base md:text-lg mt-3 leading-relaxed font-sans">
          <b>Core pipeline (required by brief) + five advanced differentiators layered on top.</b><br />
          Deterministic digital forensic defense suite engineered for law enforcement and judiciary.
        </p>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          <button
            type="button"
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer border ${
              filter === 'all'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
            onClick={() => handleTabClick('all')}
          >
            ✦ ALL 10 MODULES
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer border ${
              filter === 'core'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
            onClick={() => handleTabClick('core')}
          >
            ● CORE PIPELINE (5)
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer border ${
              filter === 'differentiator'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
            onClick={() => handleTabClick('differentiator')}
          >
            ⚡ DIFFERENTIATORS (5)
          </button>
        </div>
      </div>

      {/* Dynamic Asymmetric Bento Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

        {/* ════════════════════════════════════════════════════════════════════
            FEATURE 01 (FLAGSHIP): MULTI-MODAL DETECTION ENGINE (Span 7)
           ════════════════════════════════════════════════════════════════════ */}
        {(filter === 'all' || filter === 'core') && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7 p-6 md:p-7 bg-slate-900/70 border border-slate-800 border-t-2 border-t-cyan-500/80 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,242,254,0.15)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-inner">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-sans m-0 group-hover:text-cyan-300 transition-colors">
                      Multi-Modal Detection Engine
                    </h3>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      ELA • 14.8kHz Spectral Audio • 16x16 ViT Patch Classifiers
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  CORE #01
                </span>
              </div>

              <p className="text-sm text-[#94a3b8] leading-relaxed font-sans mb-4">
                Simultaneous Error Level Analysis (ELA) rescales, Mel-spectrogram phase audits, and 16x16 patch Vision Transformer classifiers pinpoint subtle generative diffusion and voice cloning artifacts in under 400ms.
              </p>

              {/* Interactive Mini-Visualizer: ELA + ViT Mesh */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl mb-4 shadow-inner">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 mb-2 border-b border-slate-800">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <Scan size={14} className="text-cyan-400" /> LIVE TENSOR MAP
                  </span>
                  <span className="text-red-400 font-bold">94.2% SYNTHESIS RESIDUAL</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span>ViT PATCHES:</span>
                      <b className="text-cyan-400">16x16 GRID</b>
                    </div>
                    <div className="grid grid-cols-4 gap-1 h-12">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-sm ${i === 2 || i === 5 ? 'bg-red-500/70 shadow-[0_0_6px_rgba(239,68,68,0.5)]' : 'bg-cyan-500/30'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex flex-col justify-between">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>AUDIO NYQUIST:</span>
                      <b className="text-amber-400">14.8 kHz CUTOFF</b>
                    </div>
                    <div className="flex items-end gap-1 h-8 pt-1">
                      {[35, 70, 95, 80, 60, 90, 40, 85, 30].map((h, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 rounded-t-sm ${idx >= 6 ? 'bg-red-500' : 'bg-cyan-400'}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Zap size={14} className="text-cyan-400" /> LATENCY: <b>&lt; 400MS</b>
              </span>
              <Link
                href="/dashboard#multimodal-engine"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-white transition-colors"
                onClick={() => sfx.playClick()}
              >
                <span>Launch Multi-Modal Engine</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            FEATURE 06 (FLAGSHIP): KAVACH SHIELD (Span 5)
           ════════════════════════════════════════════════════════════════════ */}
        {(filter === 'all' || filter === 'differentiator') && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 p-6 md:p-7 bg-slate-900/70 border border-slate-800 border-t-2 border-t-cyan-500/80 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,242,254,0.15)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-inner">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-sans m-0 group-hover:text-cyan-300 transition-colors">
                      Kavach Shield
                    </h3>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      Real-Time Browser Interceptor
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  DIFF #01
                </span>
              </div>

              <p className="text-sm text-[#94a3b8] leading-relaxed font-sans mb-4">
                A client-side browser extension that intercepts suspect media in under 400ms when a user attempts to upload or forward it on WhatsApp, Telegram, or X, halting viral disinformation.
              </p>

              {/* Interactive Mini Browser Warning Banner */}
              <div className="p-3.5 bg-slate-950/80 border border-red-500/40 rounded-xl mb-4 shadow-[0_0_15px_rgba(239,68,68,0.12)]">
                <div className="flex items-center justify-between text-[11px] font-mono text-red-400 font-bold mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert size={14} className="text-red-400 animate-pulse" />
                    [PRE-TRANSMISSION INTERCEPT]
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-[9px]">
                    BLOCKED
                  </span>
                </div>
                <div className="text-xs text-slate-200 font-sans">
                  ⚠️ AI Deepfake Detected: Mandibular boundary splice flagged before upload on WhatsApp Web.
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-bold">
                ✓ SUB-400MS INFERENCE
              </span>
              <Link
                href="/dashboard#kavach-shield"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-white transition-colors"
                onClick={() => sfx.playClick()}
              >
                <span>Test Interceptor</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            FEATURE 02: PROVENANCE VERIFICATION (Span 4)
           ════════════════════════════════════════════════════════════════════ */}
        {(filter === 'all' || filter === 'core') && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-sky-500/80 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-lg hover:border-sky-500/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400">
                    <Fingerprint size={18} />
                  </div>
                  <h4 className="text-base font-bold text-white font-sans m-0 group-hover:text-sky-300 transition-colors">
                    Provenance Verification
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  CORE #02
                </span>
              </div>

              <p className="text-xs text-[#94a3b8] leading-relaxed font-sans mb-3">
                C2PA manifest assertions, X.509 hardware camera certificate chains, and binary EXIF quantization table consistency audits.
              </p>

              {/* Mini C2PA Certificate Chip */}
              <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg font-mono text-[11px] mb-3 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">C2PA MANIFEST:</span>
                  <b className="text-red-400">UNTRUSTED / STRIPPED</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">HARDWARE ROOT:</span>
                  <b className="text-red-400">X.509 MISSING</b>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard#provenance-verifier"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-sky-400 hover:text-white transition-colors pt-2 border-t border-slate-800"
              onClick={() => sfx.playClick()}
            >
              <span>Audit C2PA Credentials</span>
              <ArrowRight size={12} />
            </Link>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            FEATURE 07: ADVERSARIAL SENTINEL (Span 4)
           ════════════════════════════════════════════════════════════════════ */}
        {(filter === 'all' || filter === 'differentiator') && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-red-500/80 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-lg hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-red-400">
                    <Swords size={18} />
                  </div>
                  <h4 className="text-base font-bold text-white font-sans m-0 group-hover:text-red-300 transition-colors">
                    Adversarial Sentinel
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30">
                  DIFF #02
                </span>
              </div>

              <p className="text-xs text-[#94a3b8] leading-relaxed font-sans mb-3">
                Self-evolving detector that red-teams itself continuously with FGSM noise, inpainting, and temporal frame drops.
              </p>

              {/* Robustness Gauge Widget */}
              <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg font-mono text-[11px] mb-3 flex items-center justify-between">
                <span className="text-slate-400">ROBUSTNESS SCORE:</span>
                <b className="text-emerald-400 font-black text-sm">99.8% ADVERSARIAL RESISTANT</b>
              </div>
            </div>

            <Link
              href="/dashboard#adversarial-sentinel"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-red-400 hover:text-white transition-colors pt-2 border-t border-slate-800"
              onClick={() => sfx.playClick()}
            >
              <span>Inspect Red-Teaming Loop</span>
              <ArrowRight size={12} />
            </Link>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            FEATURE 03: FORENSIC LLM INVESTIGATOR (Span 4)
           ════════════════════════════════════════════════════════════════════ */}
        {(filter === 'all' || filter === 'core') && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-purple-500/80 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-lg hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-purple-400">
                    <Bot size={18} />
                  </div>
                  <h4 className="text-base font-bold text-white font-sans m-0 group-hover:text-purple-300 transition-colors">
                    Forensic LLM Investigator
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  CORE #03
                </span>
              </div>

              <p className="text-xs text-[#94a3b8] leading-relaxed font-sans mb-3">
                Transforms optical flow and neural tensors into plain-English courtroom executive summaries and Section 66D IT Act FIR draft guidance.
              </p>

              {/* Mini Courtroom Citation Preview */}
              <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg font-mono text-[10px] text-slate-300 mb-3 space-y-0.5">
                <span className="text-purple-400 font-bold block">FIR STATUTE MAPPING:</span>
                <div>• Section 66D IT Act (Personation via Computer)</div>
                <div>• Section 318(4) Bharatiya Nyaya Sanhita (Cheating)</div>
              </div>
            </div>

            <Link
              href="/dashboard#forensic-llm"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-purple-400 hover:text-white transition-colors pt-2 border-t border-slate-800"
              onClick={() => sfx.playClick()}
            >
              <span>Query Forensic LLM</span>
              <ArrowRight size={12} />
            </Link>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            FEATURE 08: CHAIN-OF-CUSTODY LEDGER (Span 4)
           ════════════════════════════════════════════════════════════════════ */}
        {(filter === 'all' || filter === 'differentiator') && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-emerald-500/80 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-lg hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <Hash size={18} />
                  </div>
                  <h4 className="text-base font-bold text-white font-sans m-0 group-hover:text-emerald-300 transition-colors">
                    Chain-of-Custody Ledger
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  DIFF #03
                </span>
              </div>

              <p className="text-xs text-[#94a3b8] leading-relaxed font-sans mb-3">
                Cryptographic SHA-256 and Blake3 hash chaining linking Block #N to Parent Block #N-1 with HSM timestamps under ISO/IEC 27037.
              </p>

              {/* Mini Cryptographic Block Preview */}
              <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg font-mono text-[11px] mb-3 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">MERKLE ROOT:</span>
                  <code className="text-emerald-400 font-bold text-[10px]">7f83b165...9482</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">STATUS:</span>
                  <b className="text-emerald-400">IMMUTABLE BLOCK #004291</b>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard#ledger"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 hover:text-white transition-colors pt-2 border-t border-slate-800"
              onClick={() => sfx.playClick()}
            >
              <span>Explore Merkle Ledger</span>
              <ArrowRight size={12} />
            </Link>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            FEATURE 04: ORIGIN TRACING (Span 4)
           ════════════════════════════════════════════════════════════════════ */}
        {(filter === 'all' || filter === 'core') && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-amber-500/80 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-lg hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400">
                    <Network size={18} />
                  </div>
                  <h4 className="text-base font-bold text-white font-sans m-0 group-hover:text-amber-300 transition-colors">
                    Origin Tracing &amp; Propagation
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  CORE #04
                </span>
              </div>

              <p className="text-xs text-[#94a3b8] leading-relaxed font-sans mb-3">
                Perceptual hashing (PDQ / pHash) clusters reverse search matches across patient-zero darknet CDNs and Telegram bot relays.
              </p>

              {/* Propagation Pulse Preview */}
              <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg font-mono text-[10px] text-slate-300 mb-3 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">SEED:</span>
                  <b className="text-red-400">DISCORD CDN (194.26.29.11)</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">VIRAL REACH:</span>
                  <b className="text-amber-400">1.2M SYNDICATED PLAYS</b>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard#evidence"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-400 hover:text-white transition-colors pt-2 border-t border-slate-800"
              onClick={() => sfx.playClick()}
            >
              <span>Trace Origin Seed</span>
              <ArrowRight size={12} />
            </Link>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            FEATURE 09: FEDERATED HASH EXCHANGE (Span 4)
           ════════════════════════════════════════════════════════════════════ */}
        {(filter === 'all' || filter === 'differentiator') && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-amber-500/80 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-lg hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400">
                    <Globe size={18} />
                  </div>
                  <h4 className="text-base font-bold text-white font-sans m-0 group-hover:text-amber-300 transition-colors">
                    Federated Hash Exchange
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  DIFF #04
                </span>
              </div>

              <p className="text-xs text-[#94a3b8] leading-relaxed font-sans mb-3">
                Cross-checks viral scam hashes across encrypted networks (WhatsApp, Signal, State Cyber Cells) using Zero-Knowledge Proofs (ZKP).
              </p>

              {/* ZKP Badge Preview */}
              <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg font-mono text-[11px] mb-3 flex items-center justify-between">
                <span className="text-slate-400">ZKP PROTOCOL:</span>
                <b className="text-amber-400">PRIVACY-PRESERVED MATCH</b>
              </div>
            </div>

            <Link
              href="/dashboard#federated-hash"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-400 hover:text-white transition-colors pt-2 border-t border-slate-800"
              onClick={() => sfx.playClick()}
            >
              <span>Run ZKP Query</span>
              <ArrowRight size={12} />
            </Link>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            FEATURE 05: INVESTIGATOR DASHBOARD (Span 4)
           ════════════════════════════════════════════════════════════════════ */}
        {(filter === 'all' || filter === 'core') && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-emerald-500/80 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-lg hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <Terminal size={18} />
                  </div>
                  <h4 className="text-base font-bold text-white font-sans m-0 group-hover:text-emerald-300 transition-colors">
                    Investigator Console
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  CORE #05
                </span>
              </div>

              <p className="text-xs text-[#94a3b8] leading-relaxed font-sans mb-3">
                Unified case queues (`KV-0928-A`, `KV-1044-B`), real-time threat alert feeds, and one-click officer verdict signing.
              </p>

              {/* Case Queue Chip */}
              <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg font-mono text-[11px] mb-3 flex items-center justify-between">
                <span className="text-slate-400">ACTIVE QUEUE:</span>
                <b className="text-emerald-400 font-bold">3 ACTIVE EXHIBITS</b>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 hover:text-white transition-colors pt-2 border-t border-slate-800"
              onClick={() => sfx.playClick()}
            >
              <span>Enter Console</span>
              <ArrowRight size={12} />
            </Link>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            FEATURE 10 (SPECIAL VAULT): FORENSIC "STRONG ROOM" (Span 8 or Full)
           ════════════════════════════════════════════════════════════════════ */}
        {(filter === 'all' || filter === 'differentiator') && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-8 p-6 md:p-7 bg-slate-900/70 border border-slate-800 border-t-2 border-t-purple-500/80 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-xl hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.18)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-purple-400 shadow-inner">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-sans m-0 group-hover:text-purple-300 transition-colors">
                      Kavach Sentinel: The Forensic &ldquo;Strong Room&rdquo;
                    </h3>
                    <span className="text-xs font-mono text-purple-400 font-semibold">
                      Cryptographically Sealed Court Dossier Vault
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  DIFF #05 (KEYSTONE)
                </span>
              </div>

              <p className="text-sm text-[#94a3b8] leading-relaxed font-sans mb-4">
                An air-gapped cryptographic vault that translates complex neural AI detection into a legally certified 5-part evidence package (.ZIP) signed under ISO/IEC 27037 and Section 65B Indian Evidence Act.
              </p>

              {/* 5-part Bundle Chip Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 font-mono text-[10px]">
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800 text-slate-300">
                  1. Raw Evidence File
                </div>
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800 text-slate-300">
                  2. C2PA Provenance JSON
                </div>
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800 text-slate-300">
                  3. Forensic LLM Report
                </div>
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800 text-slate-300">
                  4. Sec 65B Certificate
                </div>
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800 text-slate-300">
                  5. Merkle Root Hash
                </div>
                <div className="p-2 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold flex items-center justify-center gap-1">
                  <Check size={11} /> 5-Part Court Bundle
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                FIPS 140-3 HARDWARE HSM ANCHORED
              </span>
              <button
                type="button"
                onClick={() => {
                  sfx.playSeal()
                  setStrongRoomOpen(true)
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] cursor-pointer"
              >
                <span>Enter Strong Room Vault</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        )}

      </div>

      {/* Strong Room Modal */}
      <AnimatePresence>
        {strongRoomOpen && (
          <StrongRoomModal
            isOpen={strongRoomOpen}
            onClose={() => setStrongRoomOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
