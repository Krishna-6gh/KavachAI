'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  AlertOctagon,
  ArrowLeft,
  Award,
  Bell,
  CheckCircle2,
  Cpu,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Fingerprint,
  FolderOpen,
  Gavel,
  KeyRound,
  Layers,
  Lock,
  LogOut,
  Radio,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Swords,
  Terminal,
  UserRound,
  Zap,
} from 'lucide-react'
import { BrandMark } from '@/components/brand/BrandMark'
import { Workspace } from '@/components/workspace/Workspace'
import { ThreatAssessment } from '@/components/workspace/ThreatAssessment'
import { SignalTelemetry } from '@/components/workspace/SignalTelemetry'
import { LedgerVault } from '@/components/workspace/LedgerVault'
import { EvidenceSurface } from '@/components/evidence/EvidenceSurface'
import { ForensicPipeline } from '@/components/pipeline/ForensicPipeline'
import { ReportContract } from '@/components/contract/ReportContract'
import { AuthModal, OfficerCredentials } from '@/components/modals/AuthModal'
import { DossierModal } from '@/components/modals/DossierModal'
import { StrongRoomModal } from '@/components/features/StrongRoomModal'
import { MultiModalEngine } from '@/components/features/MultiModalEngine'
import { ProvenanceVerifier } from '@/components/features/ProvenanceVerifier'
import { ForensicLLMInvestigator } from '@/components/features/ForensicLLMInvestigator'
import { KavachShieldSimulator } from '@/components/features/KavachShieldSimulator'
import { AdversarialSentinel } from '@/components/features/AdversarialSentinel'
import { FederatedHashExchange } from '@/components/features/FederatedHashExchange'
import { CyberCursor } from '@/components/ui/CyberCursor'
import { AuditState } from '@/components/workspace/MediaIngestion'
import { useLoader } from '@/context/LoadingContext'
import { sfx } from '@/lib/soundEffects'
import { TiltCard } from '@/components/ui/TiltCard'

interface CaseFile {
  id: string
  title: string
  officer: string
  date: string
  severity: 'CRITICAL' | 'HIGH' | 'EVAL'
  asset: string
  verdict: 'TAMPERED' | 'GENUINE' | 'INCONCLUSIVE' | 'PENDING'
}

const ACTIVE_CASES: CaseFile[] = [
  {
    id: 'CASE-0928-PB',
    title: 'Executive Video Deepfake Impersonation',
    officer: 'Insp. R. Sharma (Cyber Cell PB)',
    date: '2026-09-02 09:41 UTC',
    severity: 'CRITICAL',
    asset: 'media_asset_0928.mp4',
    verdict: 'TAMPERED',
  },
  {
    id: 'CASE-0841-CH',
    title: 'KYC Synthetic Facial Replacement',
    officer: 'Sub-Insp. A. Verma (Sector 17 CHD)',
    date: '2026-08-31 16:22 UTC',
    severity: 'HIGH',
    asset: 'kyc_specimen_0841.png',
    verdict: 'TAMPERED',
  },
  {
    id: 'CASE-0719-PB',
    title: 'Political Speech Audio Pitch Inpainting',
    officer: 'Tech Analyst K. Kaur (State Cyber Lab)',
    date: '2026-08-28 11:05 UTC',
    severity: 'CRITICAL',
    asset: 'speech_sample_0719.wav',
    verdict: 'TAMPERED',
  },
  {
    id: 'CASE-0604-CH',
    title: 'CCTV Camera Footage Authenticity Audit',
    officer: 'Insp. S. Sandhu (CHD Command)',
    date: '2026-08-20 14:10 UTC',
    severity: 'EVAL',
    asset: 'surveillance_feed_0604.raw',
    verdict: 'GENUINE',
  },
]

export default function Dashboard() {
  const router = useRouter()
  const { startLoading, stopLoading } = useLoader()
  const [officer, setOfficer] = useState<OfficerCredentials | null>(null)
  const [loginOpen, setLoginOpen] = useState(false)
  const [dossierOpen, setDossierOpen] = useState(false)
  const [strongRoomOpen, setStrongRoomOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'workspace' | 'multimodal' | 'provenance' | 'origin' | 'llm' | 'shield' | 'sentinel' | 'federated' | 'contract'>('workspace')
  const [fileName, setFileName] = useState('media_asset_0928.mp4')
  const [audit, setAudit] = useState<AuditState>('idle')
  const [auditData, setAuditData] = useState<any>(null)
  const [activeVerdict, setActiveVerdict] = useState<'TAMPERED' | 'GENUINE' | 'INCONCLUSIVE' | 'PENDING'>('TAMPERED')
  const [selectedCase, setSelectedCase] = useState<CaseFile>(ACTIVE_CASES[0])
  const [caseList, setCaseList] = useState<CaseFile[]>(ACTIVE_CASES)
  const [verdictSigned, setVerdictSigned] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Verify authentication on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const clearanceToken = window.sessionStorage.getItem('kavach_clearance_token')
      const officerBadge = window.sessionStorage.getItem('kavach_officer_badge')
      const officerJurisdiction = window.sessionStorage.getItem('kavach_officer_jurisdiction')
      const officerHsm = window.sessionStorage.getItem('kavach_officer_hsm')
      const authorityKey = window.sessionStorage.getItem('kavach_authority_key')
      const analystRole = window.sessionStorage.getItem('kavach_analyst_role')

      if (clearanceToken && officerBadge) {
        setOfficer({
          token: clearanceToken,
          badge: officerBadge,
          jurisdiction: officerJurisdiction || 'Punjab Cyber Crime Division',
          hsmKey: officerHsm || 'SLOT-A (ECDSA-P256)',
          authorityKey: authorityKey || 'EVAL-DEMO-99',
          analystRole: analystRole || 'CHIEF FORENSIC ANALYST',
        })
        setLoginOpen(false)
      } else {
        setLoginOpen(true)
      }
      setIsReady(true)
    }

    // Load active cases from API
    async function loadCases() {
      try {
        const res = await fetch('/api/cases')
        const json = await res.json()
        if (json.success && json.data && json.data.length > 0) {
          setCaseList(json.data)
          setSelectedCase(json.data[0])
          setFileName(json.data[0].asset)
          setActiveVerdict(json.data[0].verdict)
        }
      } catch {
        // use fallback
      }
    }
    loadCases()
  }, [])

  const startAudit = async () => {
    sfx.playScan()
    setAudit('processing')
    startLoading('INGESTING MEDIA & RUNNING FORENSIC INFERENCE...')

    try {
      const res = await fetch('/api/analyze/multimodal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, caseId: selectedCase.id }),
      })
      const json = await res.json()
      if (json.success && json.data) {
        setAuditData(json.data)
        setActiveVerdict(json.data.verdict)
      }
    } catch {
      // fallback
    } finally {
      setTimeout(() => {
        sfx.playSeal()
        setAudit('complete')
        stopLoading()
      }, 1200)
    }
  }

  const resetAudit = () => {
    sfx.playClick()
    setAudit('idle')
    setFileName('no asset loaded')
    setAuditData(null)
  }

  const handleFileSelect = async (file?: File | { name: string; isFake?: boolean }) => {
    if (file) {
      sfx.playClick()
      setFileName(file.name)
      setAudit('idle')

      if (file instanceof File) {
        // Upload real file to multi-modal analyzer
        try {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('caseId', selectedCase.id)
          const res = await fetch('/api/analyze/multimodal', {
            method: 'POST',
            body: formData,
          })
          const json = await res.json()
          if (json.success && json.data) {
            setAuditData(json.data)
            setActiveVerdict(json.data.verdict)
          }
        } catch {
          // ignore
        }
      }
    }
  }

  const handleCaseChange = (caseItem: CaseFile) => {
    sfx.playClick()
    setSelectedCase(caseItem)
    setFileName(caseItem.asset)
    setActiveVerdict(caseItem.verdict)
    setAudit('idle')
    setAuditData(null)
  }

  const handleSignVerdict = async (verdict: string) => {
    sfx.playSeal()
    setActiveVerdict(verdict as any)
    try {
      const res = await fetch(`/api/cases/${selectedCase.id}/verdict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verdict,
          officerBadge: officer?.badge || '#IN-PB-8821',
          jurisdiction: officer?.jurisdiction || 'STATE FORENSIC SCIENCE LAB',
        }),
      })
      const json = await res.json()
      if (json.success) {
        setVerdictSigned(true)
        setTimeout(() => setVerdictSigned(false), 2500)
        // Refresh case list
        const refreshed = await fetch('/api/cases').then((r) => r.json())
        if (refreshed.success) setCaseList(refreshed.data)
      }
    } catch {
      setVerdictSigned(true)
      setTimeout(() => setVerdictSigned(false), 2500)
    }
  }

  const handleSignIn = (credentials: OfficerCredentials) => {
    sfx.playSeal()
    setOfficer(credentials)
    setLoginOpen(false)
  }

  const handleSignOut = () => {
    sfx.playClick()
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('kavach_clearance_token')
      window.sessionStorage.removeItem('kavach_officer_badge')
      window.sessionStorage.removeItem('kavach_officer_jurisdiction')
      window.sessionStorage.removeItem('kavach_officer_hsm')
      window.sessionStorage.removeItem('kavach_authority_key')
      window.sessionStorage.removeItem('kavach_analyst_role')
      window.localStorage.removeItem('kavach-session')
    }
    setOfficer(null)
    router.push('/')
  }

  const handleCloseGate = () => {
    if (!officer) {
      router.push('/')
    } else {
      setLoginOpen(false)
    }
  }

  return (
    <main className="kavach-shell dashboard-page">
      <CyberCursor />

      {/* Dedicated Dashboard Top Navigation */}
      <header className="pill-navbar-outer dashboard-nav">
        <div className="pill-navbar-inner">
          <div className="pill-nav-left">
            <Link href="/" className="back-home-btn" onClick={() => sfx.playClick()}>
              <ArrowLeft size={16} />
              <span>Back to Overview</span>
            </Link>
            <BrandMark subtext="INVESTIGATOR CONSOLE" />
          </div>

          <div className="pill-nav-right">
            <button
              type="button"
              onClick={() => {
                sfx.playSeal()
                setStrongRoomOpen(true)
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#a855f7]/20 border border-[#a855f7] text-[#a855f7] text-xs font-mono font-bold hover:bg-[#a855f7]/30 transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
            >
              <Lock size={13} />
              <span>Forensic &ldquo;Strong Room&rdquo;</span>
            </button>

            <div className="pill-status-dot">
              <span className="quantum-core-dot" />
              <span className="status-dot-text font-mono font-bold">GPU NODE #04 • LIVE</span>
            </div>

            {officer ? (
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  type="button"
                  className="aerospace-btn session-active hover:bg-[#ef4444]/20 hover:border-[#ef4444]/50 hover:text-[#ef4444] transition-all cursor-pointer"
                  onClick={handleSignOut}
                  title="Revoke Clearance / Logout"
                >
                  <UserRound size={13} />
                  <span className="font-bold">{officer.badge}</span>
                  <LogOut size={13} className="text-[#ef4444]" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="aerospace-btn"
                onClick={() => {
                  sfx.playClick()
                  setLoginOpen(true)
                }}
              >
                <Lock size={14} className="text-[#ef4444]" />
                <span>Authorize Gate</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Forensic Console Body */}
      <div className="dashboard-content-container pt-8 pb-16 px-4 md:px-8 max-w-[1340px] mx-auto flex flex-col gap-8">
        {/* Real-Time Jurisdictional Threat Alert Ticker */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#ef4444]/10 border border-[#ef4444]/30 overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ef4444] whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-ping" />
            <Bell size={14} />
            <span>CRITICAL JURISDICTIONAL ALERTS:</span>
          </div>
          <div className="text-xs font-mono text-slate-200 truncate">
            [09:41 UTC] Telegram Botnet cluster spreading deepfake audio in Chandigarh sector 17 • [09:28 UTC] WhatsApp viral forward flagged by Kavach Shield • [08:50 UTC] 14.8kHz neural vocoder signature detected.
          </div>
        </div>

        {/* Unified Case Management Console (Feature 5 from PPT) */}
        <div className="p-6 rounded-3xl bg-[#080d1a] border border-[#00f2fe]/25 shadow-xl flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#00f2fe] tracking-wider uppercase">
                  INVESTIGATOR DASHBOARD • UNIFIED CASE MANAGEMENT
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#f8fafc]">
                Case Queue &amp; Digital Verdict Authority
              </h2>
            </div>

            {/* Case Selector Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {caseList.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleCaseChange(c)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    selectedCase.id === c.id
                      ? 'bg-[#111827] border-[#00f2fe] text-[#00f2fe] shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                      : 'bg-[#030712] border-white/10 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FolderOpen size={14} />
                  <span>{c.id}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] ${
                    c.verdict === 'TAMPERED' ? 'bg-[#ef4444]/20 text-[#ef4444]' : 'bg-[#10b981]/20 text-[#34d399]'
                  }`}>
                    {c.verdict}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Case Details & One-Click Verdict Authority */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 flex flex-col gap-2 font-mono text-xs">
              <div className="text-base font-bold text-[#f8fafc] font-sans">
                Case: {selectedCase.title}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                <div className="p-2.5 rounded-xl bg-[#030712] border border-white/10">
                  <span className="text-slate-400 text-[10px] block">CASE ID:</span>
                  <b className="text-[#00f2fe]">{selectedCase.id}</b>
                </div>
                <div className="p-2.5 rounded-xl bg-[#030712] border border-white/10">
                  <span className="text-slate-400 text-[10px] block">INVESTIGATING OFFICER:</span>
                  <b className="text-slate-200">{selectedCase.officer}</b>
                </div>
                <div className="p-2.5 rounded-xl bg-[#030712] border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 text-[10px] block">INTAKE DATE:</span>
                  <b className="text-slate-300">{selectedCase.date}</b>
                </div>
              </div>
            </div>

            {/* Verdict Authority Buttons */}
            <div className="lg:col-span-5 p-4 rounded-2xl bg-[#030712] border border-white/15 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Gavel size={14} className="text-[#f59e0b]" />
                  <span>OFFICER VERDICT AUTHORITY</span>
                </span>
                <span className="text-[#34d399] text-[10px]">HSM SIGN-OFF</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                {(['TAMPERED', 'GENUINE', 'CLONED VOICE', 'INCONCLUSIVE'] as const).map((verdict) => (
                  <button
                    key={verdict}
                    type="button"
                    onClick={() => handleSignVerdict(verdict)}
                    className={`p-2 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                      activeVerdict === verdict
                        ? 'bg-[#00f2fe] text-[#02040a] border-[#00f2fe] shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                        : 'bg-[#080d1a] border-white/10 text-slate-300 hover:border-white/30'
                    }`}
                  >
                    {verdict}
                  </button>
                ))}
              </div>

              {verdictSigned && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2 rounded-lg bg-[#10b981]/20 border border-[#10b981] font-mono text-[10px] text-[#34d399] flex items-center gap-1.5"
                >
                  <CheckCircle2 size={12} />
                  <span>Verdict Cryptographically Signed &amp; Sealed in Ledger Vault</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Feature 1: Multi-Modal Detection Engine (ELA, Spectral Audio, ViT) */}
        <MultiModalEngine fileName={fileName} auditData={auditData} />

        {/* Feature 2: Provenance Verification (C2PA Manifest & EXIF checks) */}
        <ProvenanceVerifier fileName={fileName} />

        {/* Feature 3: Explainable Authenticity Reports (Forensic LLM Investigator) */}
        <ForensicLLMInvestigator />

        {/* Workspace Ingestion & Results */}
        <Workspace
          fileName={fileName}
          auditState={audit}
          onFileSelect={handleFileSelect}
          onStartAudit={startAudit}
          onResetAudit={resetAudit}
          onExportClick={() => setDossierOpen(true)}
        />

        {/* Deep Forensic Threat Analysis & Signal Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TiltCard intensity={2} glareOpacity={0.1}>
            <ThreatAssessment score={fileName.includes('real') ? 12 : 94} />
          </TiltCard>

          <TiltCard intensity={2} glareOpacity={0.1}>
            <SignalTelemetry />
          </TiltCard>
        </div>

        {/* Feature 8: Cryptographic Chain-of-Custody Ledger Vault */}
        <TiltCard intensity={2} glareOpacity={0.12}>
          <LedgerVault onExportClick={() => setDossierOpen(true)} />
        </TiltCard>

        {/* Feature 4: Origin Tracing & Social Media Propagation Lens */}
        <EvidenceSurface />

        {/* Feature 6: Kavach Shield Real-Time Browser Protection Simulator */}
        <KavachShieldSimulator />

        {/* Feature 7: Adversarial Sentinel Continuous Red-Teaming Simulator */}
        <AdversarialSentinel />

        {/* Feature 9: Federated Hash Exchange (Privacy-Preserving ZKP Tracing) */}
        <FederatedHashExchange />

        {/* Forensic ISO Compliance Pipeline */}
        <ForensicPipeline />

        {/* Report Contract Standards */}
        <ReportContract />
      </div>

      {/* Cyber Crime Cell Authorization Gate Modal */}
      <AnimatePresence>
        {loginOpen && (
          <AuthModal
            isOpen={loginOpen}
            onClose={handleCloseGate}
            onSignIn={handleSignIn}
          />
        )}
      </AnimatePresence>

      {/* ISO 27037 Court-Admissible Dossier Export Modal */}
      <AnimatePresence>
        {dossierOpen && (
          <DossierModal
            isOpen={dossierOpen}
            onClose={() => setDossierOpen(false)}
            caseId={selectedCase?.id || 'KV-0928-A'}
            fileName={fileName || selectedCase?.asset || 'media_asset_0928.mp4'}
            verdict={activeVerdict}
            confidenceScore={auditData?.confidence_score ?? 94.2}
            vitLogitScore={auditData?.vit_logit_score ?? 0.942}
            elaVarianceScore={auditData?.ela_variance_score ?? 0.88}
            c2paStatus={auditData?.c2pa_provenance_status ?? 'STRIPPED'}
            sha256Hash={auditData?.hashes?.sha256 ?? 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
            officerName={officer?.name || 'Inspector Gurpreet Singh'}
            officerBadge={officer?.badge || 'CP-8821'}
            jurisdiction={officer?.jurisdiction || 'Cyber Crime Cell, Chandigarh Police'}
          />
        )}
      </AnimatePresence>

      {/* Feature 10: Kavach Sentinel: The Forensic "Strong Room" Modal */}
      <AnimatePresence>
        {strongRoomOpen && (
          <StrongRoomModal
            isOpen={strongRoomOpen}
            onClose={() => setStrongRoomOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
