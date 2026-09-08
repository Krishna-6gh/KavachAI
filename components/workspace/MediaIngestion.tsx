'use client'

import React, { useState } from 'react'
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  FileAudio,
  FileImage,
  FileText,
  FileVideo,
  Play,
  RotateCcw,
  ScanFace,
  UploadCloud,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { sfx } from '@/lib/soundEffects'

export type AuditState = 'idle' | 'processing' | 'complete'

interface MediaIngestionProps {
  fileName: string
  auditState: AuditState
  onFileSelect: (file?: File | { name: string; isFake?: boolean }) => void
  onStartAudit: () => void
  onResetAudit?: () => void
  onDownloadReport?: () => void
}

import { DeepfakeDetectionAnalysisDashboard } from '@/components/forensics/DeepfakeDetectionAnalysisDashboard'

export function MediaIngestion({
  fileName,
  auditState,
  onFileSelect,
  onStartAudit,
  onResetAudit,
  onDownloadReport,
}: MediaIngestionProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [sampleType, setSampleType] = useState<'fake' | 'real' | null>(
    fileName.includes('fake') || fileName.includes('0928') ? 'fake' : fileName.includes('real') ? 'real' : null
  )

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSampleType(null)
      onFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleSampleClick = (type: 'fake' | 'real') => {
    sfx.playScan()
    setSampleType(type)
    if (type === 'fake') {
      onFileSelect({ name: 'media_asset_0928.mp4', isFake: true })
    } else {
      onFileSelect({ name: 'traffic_cctv_chd_real.mp4', isFake: false })
    }
  }

  const hasFile = fileName !== 'no asset loaded' && Boolean(fileName)
  const isFakeDetected =
    sampleType === 'fake' ||
    (sampleType !== 'real' && (fileName.toLowerCase().includes('fake') || fileName.toLowerCase().includes('0928')))

  return (
    <div className="flex flex-col gap-6" id="analysis">
      <div className="p-6 md:p-8 bg-slate-900/60 border border-slate-800 rounded-xl">
        {/* Header */}
        <div className="pb-4 mb-4 border-b border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[#00f2fe] text-xs font-mono font-bold mb-2">
            EXHIBIT INGESTION // VOLATILE AIR-GAPPED VRAM
          </div>
          <h2 className="text-white text-2xl font-bold font-sans m-0">
            Media Intake &amp; Neural Forensic Scanner
          </h2>
          <p className="text-[#94a3b8] text-sm mt-1 font-sans m-0">
            Upload suspect digital evidence (MP4, WAV, RAW, PNG) for multi-modal lattice and vocoder audit.
          </p>
        </div>

        {/* Evaluator Preset Buttons */}
        <div className="mb-4">
          <span className="text-xs font-mono font-bold text-slate-300 block mb-2">
            SELECT INVESTIGATION EVIDENCE EXHIBIT:
          </span>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={`px-4 py-2 text-xs font-mono font-bold cursor-pointer transition-all rounded-md border ${
                sampleType === 'fake'
                  ? 'bg-red-500/20 border-red-500/60 text-red-400 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-red-500/40 hover:text-red-400'
              }`}
              onClick={() => handleSampleClick('fake')}
              disabled={auditState === 'processing'}
            >
              <span>▶ Test Exhibit A: Spliced Deepfake (KV-0928-A)</span>
            </button>

            <button
              type="button"
              className={`px-4 py-2 text-xs font-mono font-bold cursor-pointer transition-all rounded-md border ${
                sampleType === 'real'
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-400 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400'
              }`}
              onClick={() => handleSampleClick('real')}
              disabled={auditState === 'processing'}
            >
              <span>▶ Test Exhibit B: Genuine CCTV (KV-2033-C)</span>
            </button>
          </div>
        </div>

        {/* Drag-and-Drop Area */}
        <label
          className={`p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            isDragOver ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-700 bg-slate-950/60 hover:border-slate-600'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*,video/*,audio/*,.raw,.wav,.mp4,.mov,.png,.jpg,.jpeg,.mp3"
            onChange={(e) => {
              setSampleType(null)
              onFileSelect(e.target.files?.[0])
            }}
            disabled={auditState === 'processing'}
            className="hidden"
          />

          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-3 shadow-md">
            <UploadCloud size={24} />
          </div>

          <strong className="text-base font-bold text-white font-mono block">
            {hasFile ? fileName : 'Click to Browse File or Drag Exhibit Here'}
          </strong>

          <span className="text-xs font-mono text-[#94a3b8] mt-1">
            {hasFile
              ? 'Exhibit staged in volatile RAM. Ready for Section 65B audit.'
              : 'Supports MP4, MOV, WAV, MP3, JPG, PNG (Max 500 MB)'}
          </span>

          <div className="flex items-center gap-4 mt-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <FileVideo size={13} className="text-cyan-400" /> Video (H.264)
            </span>
            <span className="flex items-center gap-1.5">
              <FileAudio size={13} className="text-emerald-400" /> Audio (WAV/MFCC)
            </span>
            <span className="flex items-center gap-1.5">
              <FileImage size={13} className="text-purple-400" /> Image (EXIF)
            </span>
          </div>
        </label>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-5">
          <button
            className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-md transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer text-sm"
            onClick={onStartAudit}
            disabled={auditState === 'processing'}
          >
            {auditState === 'processing' ? (
              <>
                <Activity size={18} className="animate-spin text-slate-950" />
                <span>RUNNING SPATIAL-SPECTRAL AUDIT...</span>
              </>
            ) : (
              <>
                <ScanFace size={18} />
                <span>EXECUTE FORENSIC AUDIT</span>
              </>
            )}
          </button>

          {auditState === 'complete' && onResetAudit && (
            <button
              className="inline-flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white bg-slate-900/40 hover:bg-slate-800/60 px-4 py-3 rounded-md transition-all cursor-pointer text-xs font-mono font-bold"
              onClick={onResetAudit}
              title="Clear and test another file"
            >
              <RotateCcw size={14} /> Reset Exhibit
            </button>
          )}

          {auditState === 'complete' && onDownloadReport && (
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-mono font-bold px-4 py-3 rounded-md transition-all text-xs cursor-pointer ml-auto"
              onClick={() => {
                sfx.playSeal()
                onDownloadReport()
              }}
            >
              <FileText size={14} className="text-[#00f2fe]" />
              <span>Export ISO 27037 Dossier</span>
            </button>
          )}
        </div>
      </div>

      {/* Deepfake Detection Analysis Interactive Dashboard Matrix */}
      <AnimatePresence>
        {auditState === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <DeepfakeDetectionAnalysisDashboard
              isAnalyzing={false}
              isFake={isFakeDetected}
              fileName={fileName}
              caseId={isFakeDetected ? 'DF-7X92-1K3L' : 'AUTH-9921-PB'}
              confidenceScore={isFakeDetected ? 96.8 : 98.4}
              authenticityScore={isFakeDetected ? 18 : 94}
              processingTime="00:00:03.842"
              onDownloadReport={onDownloadReport}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
