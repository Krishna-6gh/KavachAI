'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface LoadingProps {
  onComplete?: () => void
  minDurationMs?: number
  customMessage?: string
}

export default function CyberLoadingScreen({
  onComplete,
  minDurationMs = 600,
  customMessage,
}: LoadingProps) {
  const [progress, setProgress] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    setProgress(0)
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const calculated = Math.min(100, Math.floor((elapsed / minDurationMs) * 100))
      setProgress(calculated)

      if (calculated >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          if (onCompleteRef.current) {
            onCompleteRef.current()
          }
        }, 100)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [minDurationMs])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-6 bg-[#07090E] text-slate-100 font-sans select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Center Shield & Glowing Progress */}
      <div className="relative flex flex-col items-center justify-center z-10 px-4 text-center">
        <div className="relative flex items-center justify-center w-24 h-24 mb-5">
          <div className="absolute inset-0 rounded-full border border-emerald-500/20 border-dashed animate-[spin_8s_linear_infinite]" />
          <div className="absolute -inset-2 rounded-full border border-teal-500/20 animate-[spin_12s_linear_infinite_reverse]" />
          <div className="absolute inset-2 rounded-full bg-emerald-950/40 backdrop-blur-md border border-emerald-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)]">
            <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9 drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]">
              <path
                d="M24 4L8 10V22C8 31.8 14.8 40.8 24 44C33.2 40.8 40 31.8 40 22V10L24 4Z"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="24" r="3" fill="#34D399" className="animate-pulse" />
            </svg>
          </div>
        </div>

        {/* Clean, Bold, Modern Typography */}
        <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="text-white font-bold">KavachAI</span>
          <span className="text-[#10B981] font-extrabold text-2xl sm:text-3xl drop-shadow-[0_0_20px_rgba(16,185,129,0.9)] animate-pulse">
            {progress}%
          </span>
          <span className="text-white font-bold">
            {customMessage || 'End-to-End Encrypted'}
          </span>
        </h2>

        {/* Slim Emerald Progress Bar */}
        <div className="w-64 sm:w-72 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(16,185,129,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  )
}
export { CyberLoadingScreen }
