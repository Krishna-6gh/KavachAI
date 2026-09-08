'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Shield,
  ArrowLeft,
  Cpu,
  Globe2,
  Clock,
  LogOut,
  Sparkles,
  X,
  CheckCircle2,
  Radio,
  Fingerprint,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { sfx } from '@/lib/soundEffects'

export interface OfficerProfile {
  pin: string
  name: string
  badge: string
  dept: string
  avatar: string
  role: string
  hsmSlot: string
  photoUrl?: string
}

export interface ForensicHeaderProps {
  activeOfficer?: OfficerProfile
  selectedLanguage?: string
  onLanguageChange?: (lang: string) => void
  dutyTime?: string
  onSignOut?: () => void
  title?: string
  subtitle?: string
}

export function ForensicHeader({
  activeOfficer = {
    pin: '1947',
    name: 'Inspector Gurpreet Singh',
    badge: 'CP-8821',
    dept: 'Cyber Crime Cell, Chandigarh Police HQ',
    avatar: '👮‍♂️',
    role: 'CHIEF FORENSIC COMMANDER',
    hsmSlot: 'HSM-PRIMARY-01',
  },
  selectedLanguage = 'EN',
  onLanguageChange,
  dutyTime = '00:00:00 UTC',
  onSignOut,
  title = 'KAVACH AI FORENSIC ENCLAVE',
  subtitle = 'Mission-Critical Synthetic Media Authenticity & Dissemination Tracing',
}: ForensicHeaderProps) {
  // One-time localized welcome banner state backed by sessionStorage
  const [showWelcomeBanner, setShowWelcomeBanner] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alreadyViewed = window.sessionStorage.getItem('kavach_welcome_viewed')
      if (!alreadyViewed) {
        setShowWelcomeBanner(true)
      }
    }
  }, [])

  const handleDismissBanner = () => {
    sfx.playClick()
    setShowWelcomeBanner(false)
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('kavach_welcome_viewed', 'true')
    }
  }

  return (
    <header className="w-full min-w-full bg-[#080D19]/90 border-b-2 border-cyan-500/20 hover:border-cyan-500/40 backdrop-blur-2xl sticky top-0 z-40 relative shadow-[0_4px_30px_rgba(6,182,212,0.15)] transition-all duration-300">
      {/* ======================================================================
          1. MAIN EDGE-TO-EDGE COMMAND STRIP
          ====================================================================== */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left Zone: Operational Status Beacon, Moniker & Security Badges */}
        <div className="flex items-center gap-3.5">
          <Link
            href="/"
            onClick={() => sfx.playClick()}
            className="p-2.5 rounded-xl bg-slate-900/90 border-2 border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white transition flex items-center justify-center no-underline cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.45)]"
            title="Return to Command Center"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
          </Link>

          <div className="flex items-center gap-3">
            {/* Operational Status Beacon (Pulsing Emerald LED) */}
            <span className="relative flex h-3.5 w-3.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.95)]" />
            </span>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-sm sm:text-base font-black tracking-tight text-white uppercase font-sans flex items-center gap-2">
                  {title}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-cyan-500/15 border-2 border-cyan-400 text-[10px] font-mono font-black text-cyan-300 uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.35)]">
                  <Shield className="w-3 h-3 text-cyan-400" />
                  FIPS 140-3 LEVEL 3 VALIDATED
                </span>
                <span className="hidden md:inline-flex px-2.5 py-0.5 rounded-md bg-emerald-500/15 border-2 border-emerald-400/80 text-[10px] font-mono text-emerald-300 font-black tracking-wide shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                  SEC 63 BSA COMPLIANT
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans hidden lg:block font-medium mt-0.5 tracking-wide">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right Zone: Hardware Acceleration, Language, Officer ID Badge with Photo, Clock, Lock & Exit */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 flex-wrap">
          {/* Hardware Acceleration Telemetry */}
          <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border-2 border-sky-400/80 text-[11px] font-mono shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-200 font-bold">CUDA 12.4 • TensorRT 10.0</span>
            <span className="text-emerald-400 font-black">ACTIVE</span>
          </div>

          {/* 11-Language Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border-2 border-amber-400/80 text-xs shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <Globe2 className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange?.(e.target.value)}
              className="bg-transparent text-amber-200 outline-none text-xs font-sans font-bold cursor-pointer"
            >
              <option value="EN" className="bg-slate-900">English (EN)</option>
              <option value="HI" className="bg-slate-900">हिंदी (HI)</option>
              <option value="PA" className="bg-slate-900">ਪੰਜਾਬੀ (PA)</option>
              <option value="BN" className="bg-slate-900">বাংলা (BN)</option>
              <option value="TA" className="bg-slate-900">தமிழ் (TA)</option>
              <option value="TE" className="bg-slate-900">తెలుగు (TE)</option>
              <option value="MR" className="bg-slate-900">मराठी (MR)</option>
              <option value="GU" className="bg-slate-900">ગુજરાતી (GU)</option>
              <option value="KN" className="bg-slate-900">ಕನ್ನಡ (KN)</option>
              <option value="ML" className="bg-slate-900">മലയാളം (ML)</option>
              <option value="OR" className="bg-slate-900">ଓଡ଼ਿਆ (OR)</option>
            </select>
          </div>

          {/* ==================================================================
              2. OFFICER ID BADGE WITH HIGH-CONTRAST GRAYSCALE PHOTO
              ================================================================== */}
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-slate-900/95 border-2 border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.35),inset_0_0_10px_rgba(6,182,212,0.1)] group">
            {/* Grayscale High-Contrast Portrait Container */}
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border-2 border-cyan-400/90 bg-slate-950 flex-shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              {/* Tactical Officer Portrait SVG Representation */}
              <svg
                viewBox="0 0 48 48"
                className="w-full h-full object-cover filter grayscale contrast-150 brightness-95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Silhouette */}
                <rect width="48" height="48" fill="#0f172a" />
                {/* Police Officer Turban / Headgear */}
                <path
                  d="M12 18C12 11 17 6 24 6C31 6 36 11 36 18C36 21 34 23 32 24C30 25 27 25 24 25C21 25 18 25 16 24C14 23 12 21 12 18Z"
                  fill="#cbd5e1"
                />
                {/* Police Emblem Peak */}
                <path
                  d="M24 7L26 11H22L24 7Z"
                  fill="#ffffff"
                />
                {/* Officer Face Silhouette */}
                <circle cx="24" cy="22" r="8" fill="#94a3b8" />
                {/* Tactical Glasses / Gaze */}
                <rect x="18" y="19" width="5" height="3" rx="1" fill="#0f172a" />
                <rect x="25" y="19" width="5" height="3" rx="1" fill="#0f172a" />
                <line x1="23" y1="20.5" x2="25" y2="20.5" stroke="#0f172a" strokeWidth="1" />
                {/* Mustache */}
                <path d="M19 25C21 24 23 25 24 26C25 25 27 24 29 25" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
                {/* Uniform & Epaulets */}
                <path
                  d="M8 44C8 34 14 29 24 29C34 29 40 34 40 44V48H8V44Z"
                  fill="#475569"
                />
                {/* Collar & Tie */}
                <path d="M24 29L21 36L24 44L27 36L24 29Z" fill="#1e293b" />
                <path d="M24 33L22 30H26L24 33Z" fill="#ffffff" />
                {/* Stars / Badges on Collar */}
                <circle cx="16" cy="34" r="1.5" fill="#f8fafc" />
                <circle cx="32" cy="34" r="1.5" fill="#f8fafc" />
              </svg>
              {/* Cyan Live Status Micro-dot */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-cyan-400 border border-black shadow-[0_0_6px_rgba(6,182,212,1)]" />
            </div>

            {/* Two-Line Typography Stack */}
            <div className="text-left hidden sm:block">
              <p className="font-black text-white leading-none font-sans text-xs tracking-tight">
                {activeOfficer.name}
              </p>
              <p className="text-[10px] text-cyan-300 font-mono font-black tracking-widest mt-0.5 flex items-center gap-1">
                <span>{activeOfficer.badge}</span>
                <span className="text-[8px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-400/40">
                  HSM OK
                </span>
              </p>
            </div>
          </div>

          {/* Live Military Timestamp */}
          <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border-2 border-cyan-400/80 text-xs font-mono tabular-nums font-black text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{dutyTime}</span>
          </div>

          {/* Lock Enclave & Exit Button */}
          <button
            type="button"
            onClick={onSignOut}
            title="Lock Enclave & Sign Out"
            className="group flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 border-2 border-rose-500 hover:border-rose-400 text-rose-200 hover:text-slate-950 text-xs font-mono font-black transition shadow-[0_0_20px_rgba(244,63,94,0.35)] hover:shadow-[0_0_25px_rgba(244,63,94,0.6)] cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-300 group-hover:text-slate-950 transition-all" />
            <span className="hidden md:inline">Lock &amp; Exit</span>
          </button>
        </div>
      </div>

      {/* ======================================================================
          3. ONE-TIME LOCALIZED WELCOME BANNER (UNDERNEATH COMMAND BAR)
          ====================================================================== */}
      <AnimatePresence>
        {showWelcomeBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full border-t border-cyan-500/30 bg-gradient-to-r from-cyan-950/70 via-slate-950/90 to-indigo-950/70 backdrop-blur-xl relative overflow-hidden shadow-[0_4px_25px_rgba(6,182,212,0.2)]"
          >
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
              {/* Left Side: Gurmukhi Header & English Subtitle */}
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.5)] mt-0.5 sm:mt-0">
                  <Sparkles className="w-4 h-4 animate-spin [animation-duration:8s]" />
                </div>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-sm sm:text-base text-cyan-200 tracking-wide">
                      ਜੀ ਆਇਆਂ ਨੂੰ, ਇੰਸਪੈਕਟਰ ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-[10px] font-mono font-black text-emerald-300 uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      SESSION LIVE
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans mt-0.5">
                    Welcome to Active Duty, Inspector Gurpreet Singh • Authorized Forensic Session Initialized for{' '}
                    <strong className="text-white font-mono">{activeOfficer.badge}</strong>
                  </p>

                  <p className="text-[10px] font-mono text-cyan-400/90 tracking-wider mt-0.5 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Fingerprint className="w-3 h-3 text-cyan-400" />
                      Biometrics: Verified
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Radio className="w-3 h-3 text-emerald-400" />
                      Enclave: Isolated GPU Chamber
                    </span>
                  </p>
                </div>
              </div>

              {/* Right Side: Dismiss Button */}
              <button
                type="button"
                onClick={handleDismissBanner}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-rose-500/20 border-2 border-cyan-500/40 hover:border-rose-500 text-slate-300 hover:text-rose-300 text-xs font-mono font-bold transition flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                title="Dismiss Welcome Notice"
              >
                <span>Dismiss</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default ForensicHeader
