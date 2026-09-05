'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  ShieldAlert,
  Swords,
  Lock,
  Share2,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  Globe,
  Radio,
  FileCheck2,
  Database,
  Network,
  Cpu,
} from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export function DifferentiatorsGrid() {
  const differentiators = [
    {
      id: 'shield',
      num: '01',
      title: 'Kavach Shield: Real-Time Browser Interception',
      tag: 'WHAT MAKES US DIFFERENT • 01',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description:
        'A sub-50ms lightweight extension that intercepts synthetic media directly inside WhatsApp, Telegram, and social feeds before users forward or disseminate.',
      highlightMetric: '< 42ms In-Feed Latency',
      accent: 'border-emerald-500/40 hover:border-emerald-500/70',
      badgeBg: 'bg-emerald-500/10 text-emerald-400',
      diagram: (
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 my-3 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 pb-1.5 border-b border-slate-800">
            <span>BROWSER IN-FEED SCANNER</span>
            <span className="text-emerald-400 font-bold">&lt; 42ms Intercept</span>
          </div>
          <svg viewBox="0 0 280 75" className="w-full h-18" fill="none">
            {/* Browser Window Frame */}
            <rect x="10" y="8" width="260" height="58" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <circle cx="24" cy="20" r="3" fill="#ef4444" />
            <circle cx="34" cy="20" r="3" fill="#f59e0b" />
            <circle cx="44" cy="20" r="3" fill="#10b981" />
            <rect x="60" y="14" width="120" height="12" rx="4" fill="#1e293b" />
            <text x="65" y="23" fill="#94a3b8" fontSize="7" fontFamily="monospace">https://web.whatsapp.com</text>
            
            {/* Video Asset Preview */}
            <rect x="24" y="32" width="70" height="26" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <circle cx="59" cy="45" r="7" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
            
            {/* Real-time Shield Intercept Badge */}
            <g transform="translate(110, 31)">
              <rect width="145" height="28" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="12" y="14" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">🛡️ KAVACH SHIELD</text>
              <text x="12" y="23" fill="#a7f3d0" fontSize="7" fontFamily="monospace">Synthetic Media Blocked</text>
            </g>
          </svg>
        </div>
      ),
      features: [
        'Pre-upload hash matching against viral campaigns',
        'Visual warning badge over AI-synthesized faces',
        'Direct automated dispatch to cyber crime cells',
      ],
    },
    {
      id: 'sentinel',
      num: '02',
      title: 'Adversarial Sentinel: Self-Evolving Red-Teaming',
      tag: 'WHAT MAKES US DIFFERENT • 02',
      tagColor: 'text-red-400 bg-red-500/10 border-red-500/30',
      description:
        'Continuous automated red-team loops subjecting models to FGSM gradient noise, SDXL Turbo inpainting, and acoustic vocoder pitch warping.',
      highlightMetric: '99.8% Adversarial Defense',
      accent: 'border-red-500/40 hover:border-red-500/70',
      badgeBg: 'bg-red-500/10 text-red-400',
      diagram: (
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 my-3 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 pb-1.5 border-b border-slate-800">
            <span>FGSM NOISE vs ATTENTION DEFENSE</span>
            <span className="text-red-400 font-bold">99.8% Robustness</span>
          </div>
          <svg viewBox="0 0 280 75" className="w-full h-18" fill="none">
            {/* Left: Adversarial Noise Wave */}
            <g transform="translate(10, 10)">
              <rect width="80" height="54" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="1.2" />
              <path d="M 10 32 Q 25 15 40 32 T 70 32" stroke="#ef4444" strokeWidth="2" strokeDasharray="2 2" />
              <text x="40" y="50" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">FGSM Noise</text>
            </g>

            {/* Duel Arrow */}
            <g transform="translate(100, 32)">
              <line x1="0" y1="0" x2="22" y2="0" stroke="#f43f5e" strokeWidth="1.5" />
              <polygon points="22,0 16,-3 16,3" fill="#f43f5e" />
            </g>

            {/* Right: Kavach Robust Transformer Defense */}
            <g transform="translate(130, 10)">
              <rect width="135" height="54" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="67" y="22" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">CROSS-ATTENTION DEFENSE</text>
              <text x="67" y="34" fill="#a7f3d0" fontSize="7" fontFamily="monospace" textAnchor="middle">Spatial Invariance: 99.8%</text>
              <text x="67" y="46" fill="#6ee7b7" fontSize="7" fontFamily="monospace" textAnchor="middle">Zero Perturbation Drift</text>
            </g>
          </svg>
        </div>
      ),
      features: [
        'Automated adversarial perturbation simulations',
        'Cross-attention boundary reinforcement retraining',
        'Zero susceptibility to anti-forensic compression tricks',
      ],
    },
    {
      id: 'ledger',
      num: '03',
      title: 'Chain-of-Custody Ledger: Forensic Strong Room',
      tag: 'WHAT MAKES US DIFFERENT • 03',
      tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      description:
        'Translates complex neural tensors into cryptographically signed evidence dossiers adhering to ISO/IEC 27037 and Section 65B/63 BSA statutes.',
      highlightMetric: '100% Court Admissible',
      accent: 'border-cyan-500/40 hover:border-cyan-500/70',
      badgeBg: 'bg-cyan-500/10 text-cyan-400',
      diagram: (
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 my-3 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 pb-1.5 border-b border-slate-800">
            <span>MERKLE TREE CUSTODY CHAIN</span>
            <span className="text-cyan-400 font-bold">FIPS 140-3 HSM</span>
          </div>
          <svg viewBox="0 0 280 75" className="w-full h-18" fill="none">
            {/* Merkle Root */}
            <g transform="translate(10, 10)">
              <rect width="80" height="24" rx="4" fill="#0e7490" stroke="#00f2fe" strokeWidth="1.2" />
              <text x="40" y="16" fill="#fff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">MERKLE ROOT</text>
            </g>

            {/* Tree Branch Lines */}
            <line x1="50" y1="34" x2="30" y2="48" stroke="#00f2fe" strokeWidth="1.2" />
            <line x1="50" y1="34" x2="70" y2="48" stroke="#00f2fe" strokeWidth="1.2" />

            {/* Child Leaves */}
            <rect x="10" y="48" width="38" height="18" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <text x="29" y="60" fill="#38bdf8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">H(Video)</text>

            <rect x="52" y="48" width="38" height="18" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <text x="71" y="60" fill="#38bdf8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">H(Audio)</text>

            {/* HSM Seal Certificate Block */}
            <g transform="translate(108, 10)">
              <rect width="160" height="56" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="12" y="20" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">⚖️ §65B / §63 BSA CERTIFICATE</text>
              <text x="12" y="34" fill="#a7f3d0" fontSize="7" fontFamily="monospace">Hardware HSM ECDSA Signature</text>
              <text x="12" y="46" fill="#6ee7b7" fontSize="7" fontFamily="monospace">Court-Admissible Non-Repudiable</text>
            </g>
          </svg>
        </div>
      ),
      features: [
        'FIPS 140-3 Hardware Security Module (HSM) ECDSA seals',
        'Merkle tree inclusion proofs linking all raw evidence',
        'Automated Section 65B / 63 BSA legal certificate generator',
      ],
    },
    {
      id: 'federated',
      num: '04',
      title: 'Federated Hash Exchange: Privacy-Preserving ZKP',
      tag: 'WHAT MAKES US DIFFERENT • 04',
      tagColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      description:
        'Zero-Knowledge Proof (ZKP) perceptual hash exchange enabling state police cyber cells and banks to cross-query suspect media without sharing victim photos.',
      highlightMetric: 'Zero Data Leakage',
      accent: 'border-purple-500/40 hover:border-purple-500/70',
      badgeBg: 'bg-purple-500/10 text-purple-400',
      diagram: (
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 my-3 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 pb-1.5 border-b border-slate-800">
            <span>INTER-AGENCY ZKP MESH</span>
            <span className="text-purple-400 font-bold">Privacy Preserved</span>
          </div>
          <svg viewBox="0 0 280 75" className="w-full h-18" fill="none">
            {/* Node 1: State Cyber Police */}
            <g transform="translate(10, 14)">
              <circle cx="24" cy="24" r="22" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
              <text x="24" y="22" fill="#c084fc" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">POLICE</text>
              <text x="24" y="32" fill="#e9d5ff" fontSize="6" fontFamily="monospace" textAnchor="middle">Cell #01</text>
            </g>

            {/* Connecting Mesh Lines */}
            <line x1="58" y1="38" x2="105" y2="38" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Center: ZKP Attestation Core */}
            <g transform="translate(108, 10)">
              <rect width="70" height="54" rx="8" fill="#581c87" stroke="#c084fc" strokeWidth="1.5" />
              <text x="35" y="22" fill="#f3e8ff" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">ZKP MESH</text>
              <text x="35" y="34" fill="#d8b4fe" fontSize="6.5" fontFamily="monospace" textAnchor="middle">Hamming &lt; 10</text>
              <text x="35" y="46" fill="#a855f7" fontSize="6.5" fontFamily="monospace" textAnchor="middle">Zero Leakage</text>
            </g>

            {/* Connecting Mesh Line 2 */}
            <line x1="180" y1="38" x2="225" y2="38" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Node 2: Banking / Fintech */}
            <g transform="translate(228, 14)">
              <circle cx="24" cy="24" r="22" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
              <text x="24" y="22" fill="#c084fc" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">BANK</text>
              <text x="24" y="32" fill="#e9d5ff" fontSize="6" fontFamily="monospace" textAnchor="middle">KYC Auth</text>
            </g>
          </svg>
        </div>
      ),
      features: [
        'PDQ & pHash Hamming distance cross-matching (< 10 threshold)',
        'Privacy-preserving ZKP cryptographic attestation',
        'Inter-state cyber intelligence synchronization',
      ],
    },
  ]

  return (
    <section id="differentiators" className="relative py-24 bg-[#070A0E] text-white">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Award size={13} />
            <span>COMPETITIVE DIFFERENTIATORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Why Kavach AI{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Stands Out
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            Architected specifically for the operational demands of law enforcement cyber cells and state intelligence units.
          </p>
        </div>

        {/* 4 Differentiator Bento Cards with Rich Visual Diagrams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((diff, idx) => (
            <motion.div
              key={diff.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-7 sm:p-8 rounded-3xl bg-slate-900/70 border ${diff.accent} backdrop-blur-md flex flex-col justify-between shadow-xl transition-all hover:scale-[1.01]`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${diff.tagColor}`}>
                    {diff.tag}
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-300">
                    <AnimatedCounter value={diff.highlightMetric} duration={1.6} />
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans mb-2">
                  {diff.title}
                </h3>

                {/* Visual Diagram Element */}
                {diff.diagram}

                <div className="space-y-2 mt-4">
                  {diff.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-sans">
                      <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DifferentiatorsGrid
