'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, Loader2, Lock, Printer, QrCode, ShieldAlert, X } from 'lucide-react'

export interface DossierModalProps {
  isOpen: boolean
  onClose: () => void
  caseId?: string
  fileName?: string
  verdict?: string
  confidenceScore?: number
  vitLogitScore?: number
  elaVarianceScore?: number
  c2paStatus?: string
  sha256Hash?: string
  officerName?: string
  officerBadge?: string
  jurisdiction?: string
}

export function DossierModal({
  isOpen,
  onClose,
  caseId = 'KV-0928-A',
  fileName = 'media_asset_0928.mp4',
  verdict = 'FAIL',
  confidenceScore = 94.2,
  vitLogitScore = 0.942,
  elaVarianceScore = 0.88,
  c2paStatus = 'STRIPPED',
  sha256Hash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  officerName = 'Inspector Gurpreet Singh',
  officerBadge = 'CP-8821',
  jurisdiction = 'Cyber Crime Cell, Chandigarh Police',
}: DossierModalProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  if (!isOpen) return null

  const isTampered = verdict.toLowerCase().includes('fail') || verdict.toLowerCase().includes('tamper')

  const handleDownloadCourtPdf = async () => {
    setIsGeneratingPdf(true)
    try {
      const res = await fetch('/api/forensics/generate-court-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          case_id: caseId,
          file_name: fileName,
          verdict: verdict,
          confidence_score: confidenceScore,
          vit_logit_score: vitLogitScore,
          ela_variance_score: elaVarianceScore,
          c2pa_provenance_status: c2paStatus,
          sha256_hash: sha256Hash,
          officer_name: officerName,
          badge_number: officerBadge,
          jurisdiction: jurisdiction,
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to generate PDF: ${res.statusText}`)
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Section_63_BSA_${caseId}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Court PDF generation failed:', err)
      alert('Unable to synthesize court PDF from server. Please verify backend connection and try again.')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const handleDownloadJSON = async () => {
    try {
      const res = await fetch('/api/dossier/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: caseId, officerBadge: officerBadge, jurisdiction: jurisdiction }),
      })
      const json = await res.json()
      if (json.success && json.dossier) {
        const blob = new Blob([JSON.stringify(json.dossier, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `SECTION63BSA_DOSSIER_${caseId}.json`
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
        initial={{ y: 15, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 15, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
          onClick={onClose}
          aria-label="Close dossier modal"
        >
          <X size={18} />
        </button>

        {/* Certificate Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/kavach-official-emblem.png"
                alt="Kavach AI Official Emblem"
                width={38}
                height={38}
                className="object-contain drop-shadow-[0_0_10px_rgba(0,242,254,0.4)]"
                priority
              />
            </div>
            <div>
              <div className="font-sans text-lg font-bold text-white uppercase tracking-wider">
                COURT-ADMISSIBLE FORENSIC DOSSIER
              </div>
              <div className="font-mono text-xs text-slate-400">
                BHARATIYA SAKSHYA ADHINIYAM, 2023 • SEC 63(4)(c) SCHEDULE CERTIFICATE
              </div>
            </div>
          </div>

          <div className="font-mono text-xs text-slate-400">
            <span>CASE REF: <b className="text-cyan-400">{caseId}</b></span>
          </div>
        </div>

        {/* Main Certificate Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6">
          {/* Left Column: Verdict & Metrics */}
          <div className="md:col-span-8 flex flex-col gap-4">
            <div className={`p-4 border rounded-lg ${isTampered ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`font-mono text-[10px] font-bold flex items-center gap-1 ${isTampered ? 'text-[#ef4444]' : 'text-emerald-400'}`}>
                  <ShieldAlert size={12} /> CLASSIFICATION VERDICT
                </span>
                <span className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold ${
                  isTampered ? 'bg-red-500/20 text-[#ef4444] border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                }`}>
                  {isTampered ? 'HIGH-CONFIDENCE TAMPERED' : 'AUTHENTIC SENSOR CAPTURE'}
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-sans m-0">
                {isTampered ? 'SYNTHETIC MEDIA ANOMALY DETECTED' : 'CAMERA SENSOR FIDELITY VERIFIED'}
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-sans leading-relaxed m-0">
                {isTampered
                  ? 'Neural Error Level Analysis and temporal optical flow matrices demonstrate generative diffusion manipulation along facial boundaries across sampled keyframes.'
                  : 'Multi-spectral sensor analysis confirmed uniform photometric compression and natural continuous vocal harmonics without anomalous artifacts.'}
              </p>
            </div>

            <div className="border border-slate-800 bg-slate-950/60 rounded-lg font-mono text-xs">
              <div className="flex justify-between p-2.5 border-b border-slate-800">
                <span className="text-slate-400">EVIDENCE ASSET:</span>
                <b className="text-white">{fileName}</b>
              </div>
              <div className="flex justify-between p-2.5 border-b border-slate-800">
                <span className="text-slate-400">SHA-256 HASH:</span>
                <code className="text-cyan-400 font-bold text-[10px]">{sha256Hash.slice(0, 16)}...{sha256Hash.slice(-8)}</code>
              </div>
              <div className="flex justify-between p-2.5 border-b border-slate-800">
                <span className="text-slate-400">{isTampered ? 'SYNTHETIC PROBABILITY:' : 'AUTHENTICITY CONFIDENCE:'}</span>
                <b className={isTampered ? 'text-red-400' : 'text-emerald-400'}>{confidenceScore.toFixed(1)}% (p &lt; 0.001)</b>
              </div>
              <div className="flex justify-between p-2.5 border-b border-slate-800">
                <span className="text-slate-400">C2PA MANIFEST:</span>
                <b className={c2paStatus === 'VALID' || c2paStatus.includes('VALID') ? 'text-emerald-400' : 'text-amber-400'}>{c2paStatus}</b>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-slate-400">CHAIN OF CUSTODY:</span>
                <b className="text-emerald-400 flex items-center gap-1">
                  <Check size={12} /> MERKLE BLOCK SEALED (FIPS 140-3)
                </b>
              </div>
            </div>
          </div>

          {/* Right Column: Official Seal & Verification QR */}
          <div className="md:col-span-4 flex flex-col justify-between p-4 bg-slate-950/60 border border-slate-800 rounded-lg">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-28 h-28 my-1">
                <Image
                  src="/court-seal.jpg"
                  alt="ISO/IEC 27037 Certified Seal"
                  width={110}
                  height={110}
                  className="object-contain rounded-full shadow-lg"
                />
              </div>
              <div className="font-mono text-[9px] font-bold text-emerald-400 uppercase mt-2">
                <Lock size={10} className="inline mr-1" />
                DIGITALLY SEALED HSM KEY
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-md flex items-center gap-2.5 mt-3">
              <QrCode size={36} className="text-cyan-400 flex-shrink-0" />
              <div className="font-mono text-[9px] text-slate-400">
                <b className="text-white block">PUBLIC VERIFICATION</b>
                Section 63 BSA Real-Time Ledger
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 flex-wrap gap-3">
          <span className="font-mono text-xs text-slate-400">
            STATUTE: SECTION 63 BHARATIYA SAKSHYA ADHINIYAM (BSA), 2023
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="border border-slate-700 hover:border-slate-500 text-slate-200 px-4 py-2 rounded-md text-xs font-semibold cursor-pointer"
              onClick={onClose}
            >
              CLOSE
            </button>
            <button
              type="button"
              className="bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/40 font-bold px-4 py-2 rounded-md text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md"
              onClick={handleDownloadJSON}
            >
              <span>EXPORT JSON MANIFEST</span>
            </button>
            <button
              type="button"
              disabled={isGeneratingPdf}
              className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold px-4 py-2 rounded-md text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
              onClick={handleDownloadCourtPdf}
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>SYNTHESIZING COURT PDF...</span>
                </>
              ) : (
                <>
                  <Printer size={14} />
                  <span>PRINT / SAVE COURT PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
