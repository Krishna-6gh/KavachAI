'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lock, ScanFace, FileText, CheckCircle2 } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      step: 'PHASE 01',
      title: 'Air-Gapped Ingestion',
      subtitle: 'Zero-Knowledge Memory Enclave',
      desc: 'Suspect media (MP4, WAV, RAW, PNG) is staged inside isolated volatile GPU VRAM with strict zero outbound network transmission or external data retention.',
      icon: Lock,
      iconColor: 'text-[#00f2fe]',
      tagBg: 'bg-[#00f2fe]/10 text-[#00f2fe] border-[#00f2fe]/30',
      features: ['Volatile RAM sandbox', 'Zero outbound network egress', 'Cryptographic intake SHA-256'],
    },
    {
      step: 'PHASE 02',
      title: 'Dual Spatial-Spectral Audit',
      subtitle: 'Multi-Modal ViT & Vocoder Inspection',
      desc: 'Simultaneous 16x16 patch optical flow tracking, Error Level Analysis, and Mel vocoder checks expose subtle generative diffusion and voice cloning artifacts.',
      icon: ScanFace,
      iconColor: 'text-[#f59e0b]',
      tagBg: 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30',
      features: ['Sub-pixel mandibular flow lattice', '14.8 kHz vocoder phase check', 'C2PA manifest verification'],
    },
    {
      step: 'PHASE 03',
      title: 'Tamper-Proof Dossier Export',
      subtitle: 'Court-Admissible Legal Package',
      desc: 'Generates an immutable forensic PDF certificate stamped with hardware SHA-256 Merkle root, compliant with ISO/IEC 27037 & Section 65B Indian Evidence Act.',
      icon: FileText,
      iconColor: 'text-[#10b981]',
      tagBg: 'bg-[#10b981]/10 text-[#34d399] border-[#10b981]/30',
      features: ['ISO/IEC 27037 §6.3 compliant', 'Hardware HSM timestamp root', 'Indian Evidence Act §65B ready'],
    },
  ]

  return (
    <section className="how-it-works-section my-12 px-4 max-w-[1300px] mx-auto" id="how-it-works" aria-label="Forensic Chain of Custody Pipeline">
      <div className="section-intro text-center mb-10 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-3">
          EVIDENCE LIFECYCLE // PROTOCOL ISO 27037
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans m-0">
          How Evidence Moves Through Kavach AI
        </h2>
        <p className="text-[#94a3b8] text-base mt-2 leading-relaxed font-sans">
          From air-gapped intake to court-admissible forensic packaging in three deterministic phases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((item, idx) => (
          <motion.div
            key={item.step}
            className="p-6 bg-slate-900/60 border border-slate-800 rounded-lg flex flex-col justify-between hover:border-slate-700 transition-all duration-300"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${item.tagBg}`}>
                  {item.step}
                </span>
                <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <item.icon size={18} className={item.iconColor} />
                </div>
              </div>

              <h3 className="text-white text-lg font-bold mb-1 font-sans">
                {item.title}
              </h3>
              <div className="text-xs font-mono font-bold text-slate-400 mb-3">
                {item.subtitle}
              </div>

              <p className="text-sm text-[#94a3b8] leading-relaxed mb-4 font-sans">
                {item.desc}
              </p>
            </div>

            <ul className="space-y-2 pt-3 border-t border-slate-800">
              {item.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                  <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
