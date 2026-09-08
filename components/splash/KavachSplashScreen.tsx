'use client'

import React, { useEffect, useState, useRef, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sfx } from '@/lib/soundEffects'

export interface KavachSplashScreenProps {
  /** Callback fired once splash animation completes and exit transitions finish */
  onComplete?: () => void
  /** Total sequence duration in ms (default 1200ms / ~1.2s for punchy experience) */
  durationMs?: number
}

// Cubic bezier curves for sleek physics
const EASE_WEIGHTED = [0.16, 1, 0.3, 1] as const
const EASE_SNAP = [0.34, 1.56, 0.64, 1] as const
const EASE_EXIT = [0.7, 0, 0.84, 0] as const

export function KavachSplashScreen({
  onComplete,
  durationMs = 1200,
}: KavachSplashScreenProps) {
  const [phase, setPhase] = useState<'emergence' | 'locked' | 'exit' | 'done'>('emergence')
  const [progress, setProgress] = useState<number>(0)
  const [showShockwave, setShowShockwave] = useState<boolean>(false)
  const gradientId = useId()

  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    // Always initialize fresh on every mount / reload
    setPhase('emergence')
    setProgress(0)
    setShowShockwave(false)

    const startTime = Date.now()
    const targetDuration = durationMs || 1200
    let shockwaveTriggered = false

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const calculated = Math.min(100, Math.floor((elapsed / targetDuration) * 100))
      setProgress(calculated)

      // Snap lock & emit encryption shockwave at ~70%
      if (calculated >= 70 && !shockwaveTriggered) {
        shockwaveTriggered = true
        setPhase('locked')
        setShowShockwave(true)
        try {
          sfx.playSeal()
        } catch {
          // audio fallback
        }
      }

      // Complete sequence
      if (calculated >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          setPhase('exit')
        }, 120)
        setTimeout(() => {
          setPhase('done')
          if (onCompleteRef.current) {
            onCompleteRef.current()
          }
        }, 420)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [durationMs])

  // Click anywhere immediately finishes splash and proceeds
  const handleSkip = () => {
    setPhase('done')
    if (onCompleteRef.current) onCompleteRef.current()
  }

  if (phase === 'done') {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="kavach-splash-overlay"
        initial={{ opacity: 1 }}
        animate={
          phase === 'exit'
            ? {
                opacity: 0,
                filter: 'blur(16px)',
                transition: { duration: 0.35, ease: EASE_EXIT },
              }
            : { opacity: 1 }
        }
        exit={{ opacity: 0, filter: 'blur(20px)', transition: { duration: 0.25 } }}
        onClick={handleSkip}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07090E] text-slate-100 select-none overflow-hidden cursor-pointer"
        style={{ willChange: 'opacity, transform, filter' }}
      >
        {/* Faint Cyber Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.12)_0%,rgba(6,182,212,0.06)_45%,transparent_70%)] pointer-events-none" />

        {/* Outer Rotating Cyber Tech Rings */}
        <div className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-emerald-500/15 border-dashed animate-[spin_12s_linear_infinite] pointer-events-none" />
        <div className="absolute w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] rounded-full border border-cyan-500/10 animate-[spin_18s_linear_infinite_reverse] pointer-events-none" />

        {/* Central Enclave */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 10 }}
          animate={
            phase === 'emergence'
              ? {
                  scale: 1.0,
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE_WEIGHTED },
                }
              : phase === 'locked'
              ? {
                  scale: 1.0,
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.2 },
                }
              : {
                  scale: [1.0, 0.95, 1.4],
                  opacity: [1, 1, 0],
                  filter: ['blur(0px)', 'blur(0px)', 'blur(10px)'],
                  transition: {
                    duration: 0.35,
                    times: [0, 0.15, 1],
                    ease: EASE_EXIT,
                  },
                }
          }
          className="relative flex flex-col items-center justify-center z-10 px-4"
        >
          {/* Padlock & Shockwave Stage */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
            {/* Green Glowing Shockwave Rings on Lock */}
            {showShockwave && (
              <>
                <motion.div
                  initial={{ scale: 0.75, opacity: 0.95 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.9)] pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 0.85, opacity: 0.8 }}
                  animate={{ scale: 3.4, opacity: 0 }}
                  transition={{ duration: 0.75, delay: 0.05, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border border-teal-300 shadow-[0_0_40px_rgba(52,211,153,0.7)] pointer-events-none"
                />
              </>
            )}

            {/* Minimalist Vector Digital Padlock SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]"
              fill="none"
            >
              <defs>
                <linearGradient id={`${gradientId}-emerald`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>

                <linearGradient id={`${gradientId}-shackle`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
              </defs>

              {/* Shackle: Animates downward with snap on phase='locked' */}
              <motion.path
                d="M32 46V28C32 18.0589 40.0589 10 50 10C59.9411 10 68 18.0589 68 28V46"
                stroke={`url(#${gradientId}-shackle)`}
                strokeWidth="7"
                strokeLinecap="round"
                initial={{ y: -14, opacity: 0.85 }}
                animate={
                  phase === 'emergence'
                    ? { y: -14, opacity: 0.85 }
                    : {
                        y: [-14, 2, 0],
                        opacity: 1,
                        transition: { duration: 0.28, ease: EASE_SNAP },
                      }
                }
              />

              {/* Lock Body */}
              <motion.rect
                x="20"
                y="44"
                width="60"
                height="46"
                rx="10"
                fill="#0B111E"
                stroke={`url(#${gradientId}-emerald)`}
                strokeWidth="3.5"
                className="filter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              />

              {/* Keyhole / Cryptographic Core */}
              <motion.circle
                cx="50"
                cy="62"
                r="5.5"
                fill="#10b981"
                animate={{
                  scale: phase === 'emergence' ? [1, 1.15, 1] : [1, 1.3, 1],
                }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="filter drop-shadow-[0_0_10px_rgba(16,185,129,0.95)]"
              />
              <motion.path d="M48 64L46 73H54L52 64" fill="#10b981" />
            </svg>
          </div>

          {/* Clean, Bold, Modern Typography with Live Counter */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_WEIGHTED }}
            className="mt-6 text-center flex flex-col items-center"
          >
            <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white flex flex-wrap items-center justify-center gap-2.5">
              <span className="text-white font-bold">KavachAI</span>
              <span className="text-[#10B981] font-mono font-black text-2xl sm:text-3xl drop-shadow-[0_0_20px_rgba(16,185,129,0.9)] tabular-nums">
                {progress}%
              </span>
              <span className="text-slate-200 font-bold">End-to-End Encrypted</span>
            </h2>

            {/* Glowing Neon Progress Bar */}
            <div className="w-64 sm:w-80 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 mt-4 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-75 ease-out shadow-[0_0_15px_rgba(16,185,129,0.95)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-[11px] font-mono text-slate-400 mt-2.5 tracking-wider uppercase">
              FIPS 140-3 Hardware Root of Trust Initializing
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default KavachSplashScreen
