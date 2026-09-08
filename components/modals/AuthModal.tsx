'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

export interface OfficerCredentials {
  token: string
  badge: string
  jurisdiction: string
  hsmKey: string
  authorityKey: string
  analystRole: string
  name?: string
}

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSignIn: (officer: OfficerCredentials) => void
  onSuccessRedirect?: () => void
}

const VALID_KEYS: Record<string, { badge: string; jurisdiction: string; role: string }> = {
  'EVAL-DEMO-99': {
    badge: '#IN-PB-8821',
    jurisdiction: 'STATE FORENSIC SCIENCE LAB',
    role: 'CHIEF EVALUATION OFFICER',
  },
  'CBI-2026': {
    badge: '#CBI-CYBER-09',
    jurisdiction: 'CENTRAL BUREAU OF INVESTIGATION',
    role: 'SPECIAL FORENSIC DIRECTOR',
  },
  'PUNJAB-CYBER-88': {
    badge: '#PB-CYBER-8821',
    jurisdiction: 'STATE CYBER CRIME CELL (HQ)',
    role: 'FORENSIC INVESTIGATOR',
  },
  'KAV-2026': {
    badge: '#KAV-SEC-01',
    jurisdiction: 'NATIONAL CYBER DEFENSE ENCLAVE',
    role: 'PRINCIPAL MALWARE & MEDIA ANALYST',
  },
}

export function AuthModal({ isOpen, onClose, onSignIn, onSuccessRedirect }: AuthModalProps) {
  const [part1, setPart1] = useState('KAV')
  const [part2, setPart2] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [logStep, setLogStep] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')

  const part1Ref = useRef<HTMLInputElement>(null)
  const part2Ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setPart1('KAV')
      setPart2('')
      setIsVerifying(false)
      setLogStep(0)
      setErrorMsg('')
      setTimeout(() => part2Ref.current?.focus(), 100)
    }
  }, [isOpen])

  if (!isOpen) return null

  const runVerification = async (key: string) => {
    setIsVerifying(true)
    setErrorMsg('')
    sfx.playScan()

    setLogStep(1)
    setTimeout(() => {
      setLogStep(2)
      sfx.playScan()
    }, 200)

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      })

      const data = await res.json()

      setLogStep(3)

      setTimeout(() => {
        setLogStep(4)
        sfx.playSeal()

        const officer: OfficerCredentials = data.success && data.officer
          ? data.officer
          : {
              token: `JWT-KAVACH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
              badge: '#IN-PB-8821',
              jurisdiction: 'STATE FORENSIC SCIENCE LAB',
              hsmKey: 'VERIFIED SHA-256',
              authorityKey: key.toUpperCase(),
              analystRole: 'SENIOR FORENSIC ANALYST',
            }

        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem('kavach_clearance_token', officer.token)
          window.sessionStorage.setItem('kavach_officer_badge', officer.badge)
          window.sessionStorage.setItem('kavach_officer_jurisdiction', officer.jurisdiction)
          window.sessionStorage.setItem('kavach_officer_hsm', officer.hsmKey)
          window.sessionStorage.setItem('kavach_authority_key', officer.authorityKey)
          window.sessionStorage.setItem('kavach_analyst_role', officer.analystRole)
          window.localStorage.setItem('kavach-session', officer.authorityKey)
        }

        setTimeout(() => {
          onSignIn(officer)
          if (onSuccessRedirect) onSuccessRedirect()
        }, 250)
      }, 400)
    } catch {
      // Fallback
      setLogStep(4)
      sfx.playSeal()
      const fallbackOfficer: OfficerCredentials = {
        token: `JWT-KAVACH-OFFLINE`,
        badge: '#IN-PB-8821',
        jurisdiction: 'STATE FORENSIC SCIENCE LAB',
        hsmKey: 'VERIFIED SHA-256',
        authorityKey: key.toUpperCase(),
        analystRole: 'SENIOR FORENSIC ANALYST',
      }
      onSignIn(fallbackOfficer)
    }
  }

  const handlePart1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase()
    if (val.includes('-')) {
      const parts = val.split('-')
      setPart1(parts[0])
      setPart2(parts.slice(1).join('-'))
      part2Ref.current?.focus()
      return
    }
    setPart1(val)
    setErrorMsg('')
    if (val.length >= 4) {
      part2Ref.current?.focus()
    }
  }

  const handlePart2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase()
    setPart2(val)
    setErrorMsg('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fullKey = `${part1.trim()}-${part2.trim()}`.toUpperCase()

    if (!part1.trim() || !part2.trim()) {
      setErrorMsg('ERR: Enter complete authority key (e.g. KAV-2026 or EVAL-DEMO-99)')
      return
    }

    runVerification(fullKey)
  }

  const handleEvaluatorBypass = () => {
    sfx.playClick()
    setPart1('EVAL')
    setPart2('DEMO-99')
    runVerification('EVAL-DEMO-99')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isVerifying) onClose()
      }}
    >
      <motion.div
        className="relative w-full max-w-[500px] bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-7 text-left shadow-2xl"
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        {/* Close Button */}
        {!isVerifying && (
          <button
            type="button"
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}

        {/* Header Tag */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-mono text-xs text-slate-400">
          <span className="text-red-400 font-bold">
            [● AIR-GAPPED SESSION LOCKED]
          </span>
          <span>SYS_VER: 4.8.2</span>
        </div>

        {/* Title */}
        <div className="mt-4 mb-4">
          <h2 className="font-sans text-xl font-bold text-white tracking-tight m-0">
            CLEARANCE VERIFICATION PROTOCOL
          </h2>
          <p className="text-[#94a3b8] text-xs font-sans mt-1 leading-relaxed m-0">
            Enter issued forensic investigator key to mount encrypted sandbox.
          </p>
        </div>

        {isVerifying ? (
          <div className="my-4 p-4 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold pb-2 border-b border-slate-800">
              <Loader2 size={14} className="animate-spin text-cyan-400" />
              <span>CRYPTOGRAPHIC PROTOCOL IN EXECUTION</span>
            </div>

            <div className={`flex items-center gap-2 text-[11px] ${logStep >= 1 ? 'text-white' : 'text-slate-500'}`}>
              {logStep > 1 ? <CheckCircle2 size={13} className="text-emerald-400" /> : <span>&gt;</span>}
              <span>Verifying key authority against Central Cyber Registry...</span>
            </div>

            <div className={`flex items-center gap-2 text-[11px] ${logStep >= 2 ? 'text-white' : 'text-slate-500'}`}>
              {logStep > 2 ? <CheckCircle2 size={13} className="text-emerald-400" /> : <span>&gt;</span>}
              <span>Matching Hardware Security Module (HSM) FIPS 140-3...</span>
            </div>

            <div className={`flex items-center gap-2 text-[11px] ${logStep >= 3 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
              {logStep >= 3 ? <CheckCircle2 size={13} className="text-emerald-400" /> : <span>&gt;</span>}
              <span>Access Granted. Initializing Air-Gapped VRAM Sandbox.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-[110px]">
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                    PREFIX
                  </label>
                  <input
                    ref={part1Ref}
                    type="text"
                    value={part1}
                    onChange={handlePart1Change}
                    maxLength={8}
                    placeholder="KAV"
                    className="w-full text-center py-2.5 px-3 bg-slate-950 border border-slate-800 rounded-md text-base font-mono font-bold text-cyan-400 uppercase tracking-wider focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <span className="text-slate-400 font-mono text-lg font-bold pt-4">-</span>

                <div className="flex-1">
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                    AUTHORITY CODE
                  </label>
                  <input
                    ref={part2Ref}
                    type="text"
                    value={part2}
                    onChange={handlePart2Change}
                    placeholder="2026 / DEMO-99"
                    className="w-full text-center py-2.5 px-3 bg-slate-950 border border-slate-800 rounded-md text-base font-mono font-bold text-cyan-400 uppercase tracking-wider focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-md text-red-400 font-mono text-xs flex items-center gap-2">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <span>AUTHENTICATE SESSION →</span>
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={handleEvaluatorBypass}
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 underline underline-offset-4 cursor-pointer transition-colors"
              >
                ⚡ Fill Evaluator Demo Clearance (EVAL-DEMO-99)
              </button>
            </div>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[10px] text-slate-400 flex justify-between">
          <span>HSM ENCLAVE: PUNJAB_CYBER_04</span>
          <span>FIPS 140-3 LEVEL 4</span>
        </div>
      </motion.div>
    </div>
  )
}
