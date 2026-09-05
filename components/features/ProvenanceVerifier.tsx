'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertCircle,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileCheck2,
  FileSpreadsheet,
  Fingerprint,
  Info,
  Key,
  Lock,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

interface C2PAClaim {
  id: string
  title: string
  actor: string
  timestamp: string
  status: 'valid' | 'invalid' | 'missing' | 'warning'
  description: string
  certDetails?: {
    issuer: string
    serial: string
    algorithm: string
    validUntil: string
  }
}

const C2PA_MANIFEST_CLAIMS: C2PAClaim[] = [
  {
    id: 'capture',
    title: 'Hardware Capture Assertion (C2PA standard v1.3)',
    actor: 'Sony Alpha 7 IV / Secure CMOS Enclave',
    timestamp: '2026-08-28 14:22:04 UTC',
    status: 'missing',
    description:
      'No hardware-signed origin manifest found. Asset lacks cryptographic root-of-trust from camera sensor firmware.',
  },
  {
    id: 'edit_action',
    title: 'Generative Inpainting Action Claim',
    actor: 'Synthetic Inpainting Pipeline v4.2',
    timestamp: '2026-09-02 08:12:19 UTC',
    status: 'invalid',
    description:
      'Facial bounding box [x:140, y:210, w:320, h:340] was modified via latent diffusion upscaler without valid author signature.',
  },
  {
    id: 'signing_cert',
    title: 'X.509 Cryptographic Certificate Chain',
    actor: 'Untrusted Self-Signed Authority (CN=Temp-Node-99)',
    timestamp: '2026-09-02 09:14:00 UTC',
    status: 'invalid',
    description:
      'The manifest signature does not chain up to a C2PA-approved Trust List (CTL) root authority.',
    certDetails: {
      issuer: 'CN=Untrusted-Proxy-CA, OU=Anonymized, O=Darknet Relay',
      serial: '4a:88:1f:99:bb:32:00:1c',
      algorithm: 'RSA-2048 (Deprecated / Weak)',
      validUntil: '2026-10-01 (Short-lived self-signed)',
    },
  },
]

const EXIF_METADATA_ITEMS = [
  {
    label: 'Camera Model / Maker',
    exifValue: 'Canon EOS R5 (Firmware 1.8.1)',
    actualDiscovered: 'FFmpeg Lavf58.76 Synthetic Muxer',
    match: false,
    reason: 'Container muxer headers do not match Canon proprietary binary tag markers.',
  },
  {
    label: 'Quantization Table (DQT)',
    exifValue: 'Standard Canon Fine (Table #0)',
    actualDiscovered: 'Adobe Photoshop / WebP Dual Quantization',
    match: false,
    reason: 'Luminance quantization matrix shows dual-compression re-encoding curves.',
  },
  {
    label: 'GPS & Time Anchor',
    exifValue: '30.7333° N, 76.7794° E (Chandigarh)',
    actualDiscovered: 'Temporal Mismatch: GPS time is 4.5 hrs ahead of frame creation time',
    match: false,
    reason: 'GPS satellite timestamp contradicts atom container creation timestamp.',
  },
  {
    label: 'Color Space & ICC Profile',
    exifValue: 'sRGB IEC61966-2.1',
    actualDiscovered: 'sRGB IEC61966-2.1 (Valid Header)',
    match: true,
    reason: 'Standard color gamut matches reported profile.',
  },
]

interface ProvenanceVerifierProps {
  fileName?: string
}

export function ProvenanceVerifier({ fileName = 'media_asset_0928.mp4' }: ProvenanceVerifierProps) {
  const [selectedClaim, setSelectedClaim] = useState<string>('signing_cert')
  const [activeSubTab, setActiveSubTab] = useState<'c2pa' | 'exif'>('c2pa')
  const [claims, setClaims] = useState<C2PAClaim[]>(C2PA_MANIFEST_CLAIMS)
  const [exifList, setExifList] = useState(EXIF_METADATA_ITEMS)

  React.useEffect(() => {
    async function loadProvenance() {
      try {
        const res = await fetch('/api/provenance/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName }),
        })
        const json = await res.json()
        if (json.success && json.data) {
          if (json.data.c2paClaims) setClaims(json.data.c2paClaims)
          if (json.data.exifItems) setExifList(json.data.exifItems)
        }
      } catch {
        // use fallback
      }
    }
    loadProvenance()
  }, [fileName])

  const handleClaimClick = (id: string) => {
    sfx.playClick()
    setSelectedClaim(id)
  }

  return (
    <section
      className="provenance-verifier-card p-6 md:p-8 rounded-3xl bg-[#080d1a] border border-[#00f2fe]/25 shadow-2xl relative overflow-hidden"
      id="provenance-verifier"
      aria-label="Provenance Verification Engine"
    >
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#00f2fe]/15 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#38bdf8] tracking-wider uppercase">
              CORE PIPELINE • FEATURE #02
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#f8fafc]">
            Provenance Verification
          </h3>
          <p className="text-slate-300 text-sm mt-1">
            C2PA Content Credentials validation + EXIF metadata consistency cross-checks.
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center p-1.5 rounded-2xl bg-[#030712] border border-[#38bdf8]/30">
          <button
            type="button"
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'c2pa'
                ? 'bg-[#38bdf8] text-[#02040a] shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            onClick={() => {
              sfx.playClick()
              setActiveSubTab('c2pa')
            }}
          >
            <Fingerprint size={15} />
            <span>C2PA Content Credentials</span>
          </button>

          <button
            type="button"
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'exif'
                ? 'bg-[#38bdf8] text-[#02040a] shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            onClick={() => {
              sfx.playClick()
              setActiveSubTab('exif')
            }}
          >
            <FileSpreadsheet size={15} />
            <span>EXIF Consistency Checks</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-6 relative z-10">
        {activeSubTab === 'c2pa' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* C2PA Tree List (Left Col) */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                <span>MANIFEST CLAIM TREE</span>
                <span className="text-[#ef4444] font-bold">STATUS: UNTRUSTED / STRIPPED</span>
              </div>
              {claims.map((claim) => {
                const isSelected = selectedClaim === claim.id
                return (
                  <button
                    key={claim.id}
                    type="button"
                    onClick={() => handleClaimClick(claim.id)}
                    className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-[#111827] border-[#00f2fe] shadow-[0_0_20px_rgba(0,242,254,0.15)]'
                        : 'bg-[#030712] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
                        <Key size={13} className="text-[#00f2fe]" />
                        {claim.title}
                      </span>
                      {claim.status === 'invalid' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ef4444]/20 border border-[#ef4444]/50 text-[#ef4444]">
                          INVALID SIGNATURE
                        </span>
                      )}
                      {claim.status === 'missing' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#f59e0b]/20 border border-[#f59e0b]/50 text-[#f59e0b]">
                          ATTESTATION MISSING
                        </span>
                      )}
                      {claim.status === 'valid' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10b981]/20 border border-[#10b981]/50 text-[#34d399]">
                          ATTESTED VALID
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Actor: <b className="text-slate-300">{claim.actor}</b></span>
                      <span>{claim.timestamp}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Selected Claim Deep Inspection (Right Col) */}
            <div className="lg:col-span-6 bg-[#030712] p-5 rounded-2xl border border-[#38bdf8]/20 flex flex-col justify-between">
              {(() => {
                const active = claims.find((c) => c.id === selectedClaim) || claims[0]
                if (!active) return null
                return (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs font-mono font-bold text-[#f8fafc]">
                        CLAIM INSPECTION: {active.id.toUpperCase()}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                        active.status === 'valid' ? 'bg-[#10b981]/20 text-[#34d399]' : 'bg-[#ef4444]/20 text-[#ef4444]'
                      }`}>
                        {active.status.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#f8fafc] mt-3">
                        {active.title}
                      </h4>
                      <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
                        {active.description}
                      </p>

                      {active.certDetails && (
                        <div className="mt-4 p-3.5 rounded-xl bg-[#080d1a] border border-white/5 font-mono text-xs flex flex-col gap-2">
                          <div className="text-[#00f2fe] font-bold text-[11px]">X.509 CERTIFICATE ATTRIBUTES</div>
                          <div className="text-slate-300 text-[11px]">
                            <span className="text-slate-500">Issuer:</span> {active.certDetails.issuer}
                          </div>
                          <div className="text-slate-300 text-[11px]">
                            <span className="text-slate-500">Serial:</span> {active.certDetails.serial}
                          </div>
                          <div className="text-slate-300 text-[11px]">
                            <span className="text-slate-500">Crypto:</span> {active.certDetails.algorithm}
                          </div>
                          <div className="text-slate-300 text-[11px]">
                            <span className="text-slate-500">Validity:</span> {active.certDetails.validUntil}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 p-3.5 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/30 flex items-center gap-2.5 text-xs text-[#ef4444]">
                      <ShieldAlert size={16} className="flex-shrink-0" />
                      <span>
                        <b>Trust Verdict:</b> Asset does NOT pass legal authenticity standards due to unverified certificate signatures.
                      </span>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        ) : (
          /* EXIF Metadata Consistency Inspector */
          <div className="flex flex-col gap-3">
            <div className="p-4 rounded-2xl bg-[#030712] border border-white/10 mb-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#38bdf8] font-bold flex items-center gap-1.5">
                  <FileCheck2 size={14} /> EXIF HEADER VS FORENSIC BINARY DISCOVERY
                </span>
                <span className="text-[#ef4444] font-bold">3 CRITICAL MISMATCHES</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXIF_METADATA_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 ${
                    item.match
                      ? 'bg-[#030712] border-[#34d399]/30'
                      : 'bg-[#030712] border-[#ef4444]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-slate-200">
                        {item.label}
                      </span>
                      {item.match ? (
                        <span className="flex items-center gap-1 text-[#34d399] text-[10px] font-mono font-bold">
                          <CheckCircle2 size={12} /> MATCH
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[#ef4444] text-[10px] font-mono font-bold">
                          <XCircle size={12} /> INCONSISTENT
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="p-2 rounded-lg bg-[#080d1a] border border-white/5">
                        <span className="text-slate-500 block text-[9px]">EXIF CLAIMED:</span>
                        <span className="text-slate-300">{item.exifValue}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#080d1a] border border-white/5">
                        <span className="text-slate-500 block text-[9px]">ACTUAL FORENSIC DISCOVERY:</span>
                        <span className={item.match ? 'text-[#34d399]' : 'text-[#ef4444]'}>
                          {item.actualDiscovered}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
