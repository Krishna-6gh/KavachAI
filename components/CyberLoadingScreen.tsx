'use client'

import React, { useEffect, useState, useRef, useId } from 'react'
import { motion } from 'framer-motion'
import { sfx } from '@/lib/soundEffects'

interface LoadingProps {
  onComplete?: () => void
  minDurationMs?: number
  customMessage?: string
}

export default function CyberLoadingScreen({
  onComplete,
  minDurationMs = 800,
  customMessage,
}: LoadingProps) {
  const [progress, setProgress] = useState(0)
  const [showShockwave, setShowShockwave] = useState(false)
  const gradientId = useId()
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    setProgress(0)
    setShowShockwave(false)
    const startTime = Date.now()
    let triggeredShockwave = false

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const calculated = Math.min(100, Math.floor((elapsed / minDurationMs) * 100))
      setProgress(calculated)

      if (calculated >= 70 && !triggeredShockwave) {
        triggeredShockwave = true
        setShowShockwave(true)
        try {
          sfx.playClick()
        } catch {
          // safe
        }
      }

      if (calculated >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          if (onCompleteRef.current) {
            onCompleteRef.current()
          }
        }, 150)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [minDurationMs])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(16px)', transition: { duration: 0.25 } }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-6 bg-[#07090E] text-slate-100 font-sans select-none overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,rgba(6,182,212,0.06)_45%,transparent_70%)] pointer-events-none" />

      {/* Outer Rotating Cyber Tech Rings */}
      <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-emerald-500/15 border-dashed animate-[spin_10s_linear_infinite] pointer-events-none" />
      <div className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-cyan-500/10 animate-[spin_14s_linear_infinite_reverse] pointer-events-none" />

      {/* Center Padlock / Shield Icon & Glowing Progress */}
      <div className="relative flex flex-col items-center justify-center z-10 px-4 text-center">
        <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 mb-4">
          {showShockwave && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.9 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.8)] pointer-events-none"
            />
          )}

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-emerald-950/40 backdrop-blur-md border border-emerald-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)]">
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]" fill="none">
              <defs>
                <linearGradient id={`${gradientId}-emerald`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <path
                d="M32 46V28C32 18.0589 40.0589 10 50 10C59.9411 10 68 18.0589 68 28V46"
                stroke="#cbd5e1"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <rect
                x="20"
                y="44"
                width="60"
                height="46"
                rx="10"
                fill="#0B111E"
                stroke={`url(#${gradientId}-emerald)`}
                strokeWidth="3.5"
              />
              <circle cx="50" cy="62" r="5" fill="#10b981" className="animate-pulse" />
              <path d="M48 64L46 73H54L52 64" fill="#10b981" />
            </svg>
          </div>
        </div>

        {/* Clean, Bold, Modern Typography with Live Progress */}
        <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white flex flex-wrap items-center justify-center gap-2.5 mb-2">
          <span className="text-white font-bold">KavachAI</span>
          <span className="text-[#10B981] font-mono font-black text-2xl sm:text-3xl drop-shadow-[0_0_20px_rgba(16,185,129,0.9)] tabular-nums">
            {progress}%
          </span>
          <span className="text-slate-200 font-bold">
            {customMessage || 'End-to-End Encrypted'}
          </span>
        </h2>

        {/* Slim Neon Progress Bar */}
        <div className="w-64 sm:w-80 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 mt-3 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(16,185,129,0.95)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[11px] font-mono text-slate-400 mt-2 tracking-wider uppercase">
          Autonomous Forensic Telemetry Active
        </p>
      </div>
    </motion.div>
  )
}
export { CyberLoadingScreen }
