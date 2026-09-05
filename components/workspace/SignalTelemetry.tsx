'use client'

import React, { useState } from 'react'
import { AudioLines, Check, ChevronDown, Fingerprint, ScanFace, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Waveform } from './Waveform'

interface SignalItem {
  id: string
  title: string
  eyebrow: string
  icon: typeof ScanFace
  status: string
  tagBg: string
  tagColor: string
  summary: string
}

const signals: SignalItem[] = [
  {
    id: 'vision',
    title: 'Spatial-Temporal Transformer Engine',
    eyebrow: 'FACIAL LATTICE FORENSICS',
    icon: ScanFace,
    status: 'ANOMALY DETECTED',
    tagBg: 'bg-red-500/10 border-red-500/30',
    tagColor: 'text-[#ef4444]',
    summary:
      'Bi-directional spatial transformer detected sub-pixel optical flow divergence across 18 sampled frames. Sub-dermal illumination gradients fail remote photoplethysmography (rPPG) vascular pulse analysis.',
  },
  {
    id: 'audio',
    title: 'Neural Vocoder Spectral Inspector',
    eyebrow: 'SPECTRAL VOCODER ANALYSIS',
    icon: AudioLines,
    status: 'SYNTHETIC MARKERS',
    tagBg: 'bg-amber-500/10 border-amber-500/30',
    tagColor: 'text-[#f59e0b]',
    summary:
      'Phase discontinuities above 14.8 kHz reveal diffusion vocoder synthesis artifacts. Spectral envelope shows unnatural harmonic flattening characteristic of neural speech cloning models.',
  },
  {
    id: 'c2pa',
    title: 'C2PA Cryptographic Provenance Auditor',
    eyebrow: 'HARDWARE ATTESTATION',
    icon: Fingerprint,
    status: 'MANIFEST INVALID',
    tagBg: 'bg-red-500/10 border-red-500/30',
    tagColor: 'text-[#ef4444]',
    summary:
      'The submitted asset contains no signed C2PA provenance manifest. Root certificate chain does not match accredited hardware capture device authorities (X.509 signature missing).',
  },
]

export function SignalTelemetry() {
  const [expanded, setExpanded] = useState<number>(0)

  const toggleExpand = (index: number) => {
    setExpanded((current) => (current === index ? -1 : index))
  }

  return (
    <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between h-full" id="sentinel">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">
            ACTIVE SIGNAL SENSORS
          </span>
          <h2 className="text-xl font-bold text-white font-sans m-0">
            Real-Time Signal Telemetry
          </h2>
        </div>
        <span className="font-mono text-xs text-slate-400">
          {signals.length} ACTIVE DETECTORS
        </span>
      </div>

      <div className="space-y-3">
        {signals.map((signal, i) => {
          const Icon = signal.icon
          const open = expanded === i

          return (
            <div
              key={signal.id}
              className={`rounded-lg border transition-all ${
                open ? 'border-cyan-500/50 bg-slate-950/60' : 'border-slate-800 bg-slate-950/30 hover:border-slate-700'
              }`}
            >
              <button
                className="w-full p-4 flex items-center justify-between gap-3 text-left cursor-pointer"
                onClick={() => toggleExpand(i)}
                aria-expanded={open}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 font-bold">
                      {signal.eyebrow}
                    </div>
                    <strong className="text-sm text-white font-sans font-bold">
                      {signal.title}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${signal.tagBg} ${signal.tagColor}`}>
                    {signal.status}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    className="px-4 pb-4 pt-1 text-xs text-[#94a3b8] font-sans border-t border-slate-800/80"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="m-0 leading-relaxed mb-3">{signal.summary}</p>

                    {i === 0 && (
                      <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-md font-mono text-[11px] flex flex-col gap-1.5">
                        <div className="flex justify-between">
                          <span className="text-slate-400">CONTOUR DIVERGENCE:</span>
                          <b className="text-red-400">94.2%</b>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">ANOMALOUS FRAMES:</span>
                          <b className="text-red-400">18 / 24 KEYFRAMES</b>
                        </div>
                      </div>
                    )}

                    {i === 1 && (
                      <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-md">
                        <Waveform />
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2">
                          <span className="text-amber-400 font-bold">Vocoder Phase Loss</span>
                          <span>0 — 22.05 kHz Nyquist</span>
                        </div>
                      </div>
                    )}

                    {i === 2 && (
                      <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-md font-mono text-[11px] space-y-1">
                        <div className="flex items-center gap-1.5 text-red-400">
                          <X size={12} />
                          <span>TPM Hardware Attestation: <b>MISSING</b></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-red-400">
                          <X size={12} />
                          <span>C2PA Manifest Signature: <b>STRIPPED / UNTRUSTED</b></span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
