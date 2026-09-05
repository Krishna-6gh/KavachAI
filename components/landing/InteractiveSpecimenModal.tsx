'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldAlert,
  ShieldCheck,
  Check,
  Lock,
  Printer,
  QrCode,
  Download,
  X,
  FileCheck2,
  Terminal,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

interface InteractiveSpecimenModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InteractiveSpecimenModal({ isOpen, onClose }: InteractiveSpecimenModalProps) {
  if (!isOpen) return null

  const handlePrint = () => {
    sfx.playSeal()
    window.print()
  }

  const handleDownloadJSON = async () => {
    sfx.playScan()
    try {
      const res = await fetch('/api/dossier/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: 'KV-0928-A' }),
      })
      const json = await res.json()
      if (json.success && json.data) {
        const blob = new Blob([JSON.stringify(json.data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `SECTION65B_FORENSIC_SPECIMEN_KV-0928-A.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch {
      // ignore
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        className="w-full max-w-3xl bg-slate-900 border-2 border-emerald-500/40 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.25)] p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
        initial={{ y: 20, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.25 }}
      >
        <button
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="Close specimen report"
        >
          <X size={18} />
        </button>

        {/* Certificate Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800 flex-wrap gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
              <ShieldAlert className="w-7 h-7 text-rose-400" />
            </div>
            <div>
              <div className="font-sans text-lg md:text-xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                Forensic Specimen Record: <span className="font-mono text-emerald-400">#KV-89204-IND</span>
              </div>
              <div className="font-mono text-xs text-slate-400">
                ISO/IEC 27037 DIGITAL EVIDENCE PRESERVATION STANDARD • SECTION 65B READY
              </div>
            </div>
          </div>

          <div className="font-mono text-xs text-slate-300">
            <span>CHAIN BLOCK: <b className="text-emerald-400">#1,402</b></span>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6">
          {/* Left Column: Verdict & Metrics */}
          <div className="md:col-span-8 flex flex-col gap-4">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] font-bold text-red-400 flex items-center gap-1.5">
                  <ShieldAlert size={13} /> FORENSIC VERDICT
                </span>
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-mono font-bold">
                  SYNTHETIC MANIPULATION (98.4%)
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-sans m-0">
                SYNTHETIC SPLICING &amp; MANDIBULAR SEAM DETECTED
              </h3>
              <div className="mt-3">
                <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-1">
                  Plain-English LLM Investigator Finding:
                </h4>
                <p className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg text-slate-300 text-xs leading-relaxed font-sans m-0">
                  "Facial boundary analysis identifies generative neural replacement artifacts around the mandibular boundary. Error Level Analysis (ELA) confirms localized quantization inconsistencies consistent with diffusion inpainting. Spectral audio check indicates synthetic acoustic discontinuity at 8.4 kHz."
                </p>
              </div>
            </div>

            <div className="border border-slate-800 bg-slate-950/70 rounded-2xl font-mono text-xs p-1">
              <div className="flex justify-between p-2.5 border-b border-slate-800/80">
                <span className="text-slate-400">INGEST TIMESTAMP:</span>
                <p className="text-slate-300 m-0">2026-09-05T20:14:02Z</p>
              </div>
              <div className="flex justify-between p-2.5 border-b border-slate-800/80">
                <span className="text-slate-400">FORENSIC VERDICT:</span>
                <p className="text-rose-400 font-bold m-0">SYNTHETIC MANIPULATION (98.4%)</p>
              </div>
              <div className="flex justify-between p-2.5 border-b border-slate-800/80">
                <span className="text-slate-400">SHA-256 LEDGER HASH:</span>
                <code className="text-emerald-400 truncate max-w-[280px] sm:max-w-[340px]">7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</code>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-slate-400">EXPERT ATTESTATION:</span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <Check size={13} /> Indian Evidence Act Compliance Sealed
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Seal & Verification */}
          <div className="md:col-span-4 flex flex-col justify-between p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 my-2 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                <Lock size={36} />
              </div>
              <div className="font-mono text-[9px] font-bold text-emerald-400 uppercase mt-1">
                FIPS 140-3 HSM ATTESTED
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-0.5">
                NODE #HSM-PRIMARY-01
              </span>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2.5 mt-3">
              <QrCode size={32} className="text-emerald-400 flex-shrink-0" />
              <div className="font-mono text-[9px] text-slate-400">
                <b className="text-white block">PUBLIC VERIFICATION</b>
                Scan to verify on forensic ledger
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 flex-wrap gap-3">
          <span className="font-mono text-xs text-slate-400">
            STATUTE: SECTION 65B IEA / SECTION 63 BSA (2023)
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="border border-slate-700 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
              onClick={onClose}
            >
              CLOSE
            </button>
            <button
              type="button"
              className="bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md"
              onClick={handleDownloadJSON}
            >
              <Download size={13} />
              <span>EXPORT JSON</span>
            </button>
            <button
              type="button"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md"
              onClick={handlePrint}
            >
              <Printer size={13} />
              <span>PRINT / SAVE COURT PDF</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
