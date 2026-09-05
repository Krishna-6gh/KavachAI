'use client'

import React, { useEffect, useState, useRef, useId } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { sfx } from '@/lib/soundEffects'

// Global window interface extension for tracking reload-only splash lifecycle
declare global {
  interface Window {
    __KAVACH_SPLASH_SHOWN__?: boolean
  }
}

// Module-level fallback flag
let hasShownInThisModule = false

export interface KavachSplashScreenProps {
  /** Callback fired once splash animation completes and exit transitions finish */
  onComplete?: () => void
  /** Total sequence duration in ms (default 3600ms / ~3.6s) */
  durationMs?: number
}

// Cubic bezier curves for sleek physics
const EASE_WEIGHTED = [0.16, 1, 0.3, 1] as const
const EASE_SNAP = [0.34, 1.56, 0.64, 1] as const
const EASE_EXIT = [0.7, 0, 0.84, 0] as const

export function KavachSplashScreen({
  onComplete,
  durationMs = 3600,
}: KavachSplashScreenProps) {
  const shouldReduceMotion = useReducedMotion()

  // If already shown in this window context or reduced motion is active, do not display
  const [phase, setPhase] = useState<'emergence' | 'locked' | 'exit' | 'done'>(() => {
    if (
      typeof window !== 'undefined' &&
      (window.__KAVACH_SPLASH_SHOWN__ || hasShownInThisModule || shouldReduceMotion)
    ) {
      return 'done'
    }
    return 'emergence'
  })

  const [showShockwave, setShowShockwave] = useState<boolean>(false)
  const gradientId = useId()

  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    // If already shown in this window context, immediately mark done and skip
    if (
      typeof window !== 'undefined' &&
      (window.__KAVACH_SPLASH_SHOWN__ || hasShownInThisModule || shouldReduceMotion)
    ) {
      setPhase('done')
      if (onCompleteRef.current) onCompleteRef.current()
      return
    }

    // Mark as shown globally for this window session
    if (typeof window !== 'undefined') {
      window.__KAVACH_SPLASH_SHOWN__ = true
    }
    hasShownInThisModule = true

    // Phase 1 -> Phase 2: Snap Lock & Encryption Wave at 1100ms
    const lockTimer = setTimeout(() => {
      setPhase('locked')
      setShowShockwave(true)
      try {
        sfx.playSeal()
      } catch {
        // audio safe
      }
    }, 1100)

    // Phase 2 -> Phase 3: Smooth Cinematic Exit at 3100ms
    const exitTimer = setTimeout(() => {
      setPhase('exit')
    }, 3100)

    // Phase 3 -> Complete at durationMs (3600ms)
    const doneTimer = setTimeout(() => {
      setPhase('done')
      if (onCompleteRef.current) {
        onCompleteRef.current()
      }
    }, durationMs)

    return () => {
      clearTimeout(lockTimer)
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [durationMs, shouldReduceMotion])

  // Safety Escape: Clicking anywhere immediately completes and proceeds
  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      window.__KAVACH_SPLASH_SHOWN__ = true
    }
    hasShownInThisModule = true
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
                transition: { duration: 0.5, ease: EASE_EXIT },
              }
            : { opacity: 1 }
        }
        exit={{ opacity: 0, filter: 'blur(20px)', transition: { duration: 0.3 } }}
        onClick={handleSkip}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07090E] text-slate-100 select-none overflow-hidden cursor-pointer"
        style={{ willChange: 'opacity, transform, filter' }}
      >
          {/* Faint Cyber Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.12)_0%,rgba(6,182,212,0.06)_45%,transparent_70%)] pointer-events-none" />

          {/* Central Enclave */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 10 }}
            animate={
              phase === 'emergence'
                ? {
                    scale: 1.0,
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: EASE_WEIGHTED },
                  }
                : phase === 'locked'
                ? {
                    scale: 1.0,
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.25 },
                  }
                : {
                    scale: [1.0, 0.92, 2.0],
                    opacity: [1, 1, 0],
                    filter: ['blur(0px)', 'blur(0px)', 'blur(12px)'],
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
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.9)] pointer-events-none"
                  />
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0.8 }}
                    animate={{ scale: 3.4, opacity: 0 }}
                    transition={{ duration: 0.85, delay: 0.06, ease: 'easeOut' }}
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
                          transition: { duration: 0.32, ease: EASE_SNAP },
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

            {/* Clean, Bold, Modern Typography */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(6px)', y: 8 }}
              animate={
                phase === 'emergence'
                  ? { opacity: 0.5, filter: 'blur(3px)', y: 4 }
                  : {
                      opacity: 1,
                      filter: 'blur(0px)',
                      y: 0,
                      transition: { duration: 0.4, ease: EASE_WEIGHTED },
                    }
              }
              className="mt-6 text-center"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white flex flex-wrap items-center justify-center gap-2">
                <span className="text-white font-bold">KavachAI</span>
                <span className="text-[#10B981] font-extrabold text-2xl sm:text-3xl drop-shadow-[0_0_20px_rgba(16,185,129,0.9)] animate-pulse">
                  100%
                </span>
                <span className="text-white font-bold">End-to-End Encrypted</span>
              </h2>
            </motion.div>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  )
}

export default KavachSplashScreen
