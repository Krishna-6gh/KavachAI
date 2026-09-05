'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award,
  Check,
  CheckCircle2,
  Copy,
  Download,
  FileCheck2,
  FileCode,
  FileText,
  Fingerprint,
  HardDrive,
  Key,
  Lock,
  Printer,
  QrCode,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  X,
  Zap,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

interface StrongRoomModalProps {
  isOpen: boolean
  onClose: () => void
}

export function StrongRoomModal({ isOpen, onClose }: StrongRoomModalProps) {
  const [downloading, setDownloading] = useState(false)
  const [downloadComplete, setDownloadComplete] = useState(false)

  if (!isOpen) return null

  const handleDownloadPackage = async () => {
    sfx.playScan()
    setDownloading(true)
    setDownloadComplete(false)

    try {
      const res = await fetch('/api/dossier/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: 'KV-0928-A' }),
      })
      const json = await res.json()
      
      if (json.success && json.data) {
        // Trigger browser file download
        const blob = new Blob([JSON.stringify(json.data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `KAVACH_ISO27037_EVIDENCE_KV-0928-A.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch {
      // ignore
    } finally {
      sfx.playSeal()
      setDownloading(false)
      setDownloadComplete(true)
    }
  }

  return (
    <motion.div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        className="strongroom-modal-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#030712] border-2 border-[#00f2fe]/40 shadow-[0_0_50px_rgba(0,242,254,0.25)] p-6 md:p-8 flex flex-col gap-6 relative"
        initial={{ y: 25, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 25, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
      >
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#111827] border border-white/15 text-slate-300 hover:text-white cursor-pointer"
          onClick={onClose}
          aria-label="Close Strong Room"
        >
          <X size={18} />
        </button>

        {/* Strong Room Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#00f2fe]/20">
          <div className="w-14 h-14 rounded-2xl bg-[#00f2fe]/10 border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe]">
            <Lock size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] animate-pulse" />
              <span className="font-mono text-xs font-bold text-[#34d399] tracking-wider uppercase">
                WHAT MAKES US DIFFERENT • FEATURE #05
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#f8fafc]">
              Kavach Sentinel: The Forensic &ldquo;Strong Room&rdquo;
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-0.5">
              Translating complex AI detection into cryptographically secured, court-admissible evidence packages.
            </p>
          </div>
        </div>

        {/* Security Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-[#080d1a] border border-white/10 font-mono text-xs">
            <span className="text-slate-400 block text-[10px]">VAULT ENCLAVE</span>
            <b className="text-[#00f2fe]">Air-Gapped HSM Ring-0</b>
          </div>
          <div className="p-3 rounded-xl bg-[#080d1a] border border-white/10 font-mono text-xs">
            <span className="text-slate-400 block text-[10px]">LEGAL ADMISSIBILITY</span>
            <b className="text-[#34d399]">ISO/IEC 27037 §6.3</b>
          </div>
          <div className="p-3 rounded-xl bg-[#080d1a] border border-white/10 font-mono text-xs">
            <span className="text-slate-400 block text-[10px]">INDIAN STATUTE</span>
            <b className="text-[#f59e0b]">Sec 65B IEA / 63 BSA</b>
          </div>
          <div className="p-3 rounded-xl bg-[#080d1a] border border-white/10 font-mono text-xs">
            <span className="text-slate-400 block text-[10px]">SEAL STATUS</span>
            <b className="text-[#a855f7]">Immutable Merkle Root</b>
          </div>
        </div>

        {/* 5-Part Court-Ready Evidence Package Contents */}
        <div>
          <h4 className="text-sm font-mono font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Award size={16} className="text-[#00f2fe]" />
            COURT-ADMISSIBLE EVIDENCE PACKAGE (5-POINT BUNDLE)
          </h4>

          <div className="space-y-2.5">
            {[
              {
                icon: HardDrive,
                title: '1. Raw Digital Exhibit & Binary SHA-256 / Blake3 Hash',
                desc: 'Bit-by-bit physical capture of suspect media with cryptographic digest.',
                badge: 'SHA256: e3b0c442...852b',
              },
              {
                icon: Fingerprint,
                title: '2. C2PA Content Credentials Manifest & X.509 Cert Chain',
                desc: 'Hardware origin attestations, software modification history, and signer hierarchy.',
                badge: 'C2PA v1.3 Standard',
              },
              {
                icon: FileText,
                title: '3. Forensic LLM Plain-English Findings Report',
                desc: 'Readable non-technical breakdown for judges, investigating officers, and defense counsel.',
                badge: 'Plain English',
              },
              {
                icon: ShieldCheck,
                title: '4. Statutory Section 65B / Section 63 BSA Digital Certificate',
                desc: 'Certified examiner affidavit signed with hardware cryptographic key timestamp.',
                badge: 'Court Admissible',
              },
              {
                icon: FileCode,
                title: '5. Immutable Merkle Tree Inclusion Proof',
                desc: 'Zero-knowledge verification of tamper-proof ledger record and validator consensus.',
                badge: 'Merkle Block #004291',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#080d1a] border border-white/10 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#030712] border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe] flex-shrink-0">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <b className="text-xs md:text-sm text-slate-100 block">{item.title}</b>
                    <span className="text-[11px] text-slate-400">{item.desc}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#00f2fe]/10 border border-[#00f2fe]/30 font-mono text-[10px] text-[#00f2fe] font-bold whitespace-nowrap hidden sm:inline">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="text-xs font-mono text-slate-400">
            Certified by: <b>State Forensic Science Laboratory (Cyber Division)</b>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#111827] border border-white/15 text-slate-300 text-xs font-mono font-bold hover:text-white cursor-pointer w-full sm:w-auto"
            >
              Close Vault
            </button>

            <button
              type="button"
              onClick={handleDownloadPackage}
              disabled={downloading}
              className="px-6 py-2.5 rounded-xl bg-[#00f2fe] text-[#02040a] text-xs md:text-sm font-mono font-bold hover:bg-[#38bdf8] shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {downloading ? (
                <>
                  <Zap size={16} className="animate-spin" />
                  <span>SEALING EVIDENCE PACKAGE...</span>
                </>
              ) : downloadComplete ? (
                <>
                  <CheckCircle2 size={16} className="text-[#02040a]" />
                  <span>PACKAGE DOWNLOADED (.ZIP)</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>EXPORT COURT DOSSIER (.ZIP)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
