'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu,
  Brain,
  Network,
  Lock,
  ShieldCheck,
  Layers,
  Activity,
  Scan,
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  FileText,
  Gavel,
  Radio,
  Eye,
  ChevronRight,
  RefreshCw,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export function FivePillarsFramework() {
  const [activePillar, setActivePillar] = useState<number>(0)

  const pillars = [
    {
      id: 'detect',
      pillarTag: 'PILLAR #01 • DETECT',
      actionVerb: 'Detect',
      title: 'Multi-Modal Neural Detection Engine',
      icon: Cpu,
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgGlow: 'bg-emerald-500/10',
      summary:
        'Simultaneous Error Level Analysis (ELA), Vision Transformer (ViT) 16x16 patch classifiers, and audio spectral frequency checks expose biological and physical impossibilities.',
      details: [
        'ViT Token Matrix: Cross-attention analysis across 36 facial tensor patches.',
        'ELA Compression Heatmaps: Highlights localized re-quantization anomalies.',
        'Vocoder Spectral Checks: 14.8 kHz phase flatline detection in cloned audio.',
      ],
      interactivePreview: {
        metric1Label: 'VIT PATCH COHERENCE',
        metric1Val: '99.4% Anomaly',
        metric2Label: 'SPECTRAL CUTOFF',
        metric2Val: '14.8 kHz Neural Floor',
        badge: 'MULTI-MODAL CLASSIFIER',
      },
    },
    {
      id: 'explain',
      pillarTag: 'PILLAR #02 • EXPLAIN',
      actionVerb: 'Explain',
      title: 'Plain-English Forensic LLM Investigator',
      icon: Brain,
      accentColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      bgGlow: 'bg-cyan-500/10',
      summary:
        'Translates high-dimensional tensor weights, facial boundary warping, and vocoder phase loss into transparent, court-admissible investigator narratives and FIR drafts.',
      details: [
        'Statutory Citations: Auto-references IT Act §66D & Bharatiya Nyaya Sanhita §318(4).',
        'Court Admissibility Briefs: Drafts Section 65B IEA / Section 63 BSA legal reports.',
        'Plain-English Summaries: Decodes optical flow residuals for judges and non-technical officers.',
      ],
      interactivePreview: {
        metric1Label: 'LEGAL STATUTE',
        metric1Val: 'Sec 65B IEA / Sec 63 BSA',
        metric2Label: 'FIR PARAGRAPH',
        metric2Val: 'Automated Cyber Cell Draft',
        badge: 'FORENSIC AI REASONER',
      },
    },
    {
      id: 'trace',
      pillarTag: 'PILLAR #03 • TRACE',
      actionVerb: 'Trace',
      title: 'Origin & Social Media Propagation Graph',
      icon: Network,
      accentColor: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      bgGlow: 'bg-amber-500/10',
      summary:
        'Reverse perceptual hashing (pHash) and cross-platform spread mapping trace viral disinformation back to the earliest root Telegram channel or Discord darknet seed account.',
      details: [
        'Perceptual Hash Indexing: Sub-millisecond matching against blacklisted campaigns.',
        'Cross-Platform Ingestion: Maps reach across WhatsApp, Telegram, X, and YouTube.',
        'Seed Cluster Identification: Isolates botnet relay networks and ground-zero IP clusters.',
      ],
      interactivePreview: {
        metric1Label: 'GROUND-ZERO SEED',
        metric1Val: 'Discord CDN Seed #01',
        metric2Label: 'BOTNET REACH',
        metric2Val: '2.5M+ Viral Impressions',
        badge: 'CROSS-PLATFORM RESOLVER',
      },
    },
    {
      id: 'prove',
      pillarTag: 'PILLAR #04 • PROVE',
      actionVerb: 'Prove',
      title: 'Cryptographic Chain-of-Custody Ledger',
      icon: Lock,
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgGlow: 'bg-emerald-500/10',
      summary:
        'Tamper-evident, hash-chained cryptographic ledger built for Indian courtroom admissibility under ISO/IEC 27037 and Section 65B of the Indian Evidence Act.',
      details: [
        'Merkle Inclusion Proofs: Cryptographically connects spatial, spectral, and EXIF leaves.',
        'FIPS 140-3 HSM Attestation: ECDSA-P256 hardware signature sealed at ingestion.',
        'Immutable Audit Trail: Prevents post-seizure evidence repudiation or alteration claims.',
      ],
      interactivePreview: {
        metric1Label: 'MERKLE ROOT',
        metric1Val: '0xe3b0c442...852b',
        metric2Label: 'HSM ENCLAVE',
        metric2Val: 'FIPS 140-3 Sealed',
        badge: 'COURT-ADMISSIBLE VAULT',
      },
    },
    {
      id: 'prevent',
      pillarTag: 'PILLAR #05 • PREVENT',
      actionVerb: 'Prevent',
      title: 'Kavach Shield Browser Protection',
      icon: ShieldCheck,
      accentColor: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      bgGlow: 'bg-purple-500/10',
      summary:
        'Real-time browser extension shield that inspects media in-feed before users hit forward or post, neutralizing synthetic impersonation before viral spread.',
      details: [
        'Pre-Upload Interception: Sub-50ms check on WhatsApp Web, Telegram, and X.',
        'Automated Quarantine: Flags blacklisted perceptual hashes and alerts users.',
        'Dispatcher Integration: Streams threat telemetry directly to police cyber units.',
      ],
      interactivePreview: {
        metric1Label: 'PRE-UPLOAD LATENCY',
        metric1Val: '< 42ms In-Feed Intercept',
        metric2Label: 'DEFENSE STATUS',
        metric2Val: 'Active Browser Shield',
        badge: 'IN-FEED SHIELD EXTENSION',
      },
    },
  ]

  const active = pillars[activePillar]
  const ActiveIcon = active.icon

  return (
    <section id="five-pillars" className="relative py-24 bg-[#070A0E] text-white">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Sparkles size={13} />
            <span>KAVACH 5-PILLAR OPERATING FRAMEWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            From Autonomous Detection to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Courtroom Admissibility
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            Our end-to-end operational architecture ensures no synthetic artifact escapes detection, explanation, or legal preservation.
          </p>
        </div>

        {/* 5-Pillar Cyclical Flow Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10 relative">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            const isSelected = activePillar === idx
            const isLast = idx === pillars.length - 1

            return (
              <div key={pillar.id} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    sfx.playClick()
                    setActivePillar(idx)
                  }}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-full relative z-10 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.25)] scale-[1.02]'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span className={`font-mono text-[10px] font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>
                      0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-emerald-400 block mb-0.5 font-bold">
                      [{pillar.actionVerb}]
                    </span>
                    <span className={`text-xs sm:text-sm font-bold font-sans block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {pillar.title.split(' ')[0]} {pillar.title.split(' ')[1]}
                    </span>
                  </div>
                </button>

                {/* Directional Connector Arrow between steps */}
                {!isLast && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-emerald-400/50 pointer-events-none">
                    <ChevronRight size={16} className="animate-pulse" />
                  </div>
                )}

                {/* Cyclical Loop Back Indicator on last item */}
                {isLast && (
                  <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-teal-400/60 pointer-events-none items-center" title="Continuous Cyclical Enforcement">
                    <RefreshCw size={14} className="animate-[spin_10s_linear_infinite]" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Active Pillar Showcase Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`p-8 sm:p-10 rounded-3xl bg-slate-900/70 border-2 ${active.borderColor} backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}
          >
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${active.bgGlow} ${active.accentColor} border ${active.borderColor}`}>
                  {active.pillarTag}
                </span>
                <span className="text-xs font-mono text-slate-400">ISO/IEC 27037 VERIFIED</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                {active.title}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed font-sans">
                {active.summary}
              </p>

              {/* Core Feature Bullet points */}
              <div className="mt-2 space-y-2.5">
                {active.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-white/5 font-sans text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 size={16} className={`${active.accentColor} flex-shrink-0 mt-0.5`} />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Telemetry Widget */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                  <span className="text-white font-bold flex items-center gap-2">
                    <ActiveIcon size={16} className={active.accentColor} />
                    <span>{active.interactivePreview.badge}</span>
                  </span>
                  <span className="text-emerald-400 font-bold animate-pulse">● LIVE TELEMETRY</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-400">{active.interactivePreview.metric1Label}:</span>
                    <b className={`${active.accentColor} text-sm font-bold`}>
                      <AnimatedCounter value={active.interactivePreview.metric1Val} duration={1.5} />
                    </b>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-between">
                    <span className="text-slate-400">{active.interactivePreview.metric2Label}:</span>
                    <b className="text-white text-sm font-bold">
                      <AnimatedCounter value={active.interactivePreview.metric2Val} duration={1.5} />
                    </b>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <Zap size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>Sub-60s automated verification pipeline active.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
