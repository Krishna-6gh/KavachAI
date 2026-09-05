'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ThreatGaugeProps {
  score: number
}

export function ThreatGauge({ score }: ThreatGaugeProps) {
  const dash = 314
  const offset = dash - (dash * score) / 100
  const isHighRisk = score > 50

  return (
    <div className="relative flex flex-col items-center justify-center" aria-label={`Threat score ${score} percent`}>
      <svg viewBox="0 0 220 125" className="w-48 h-28 drop-shadow-[0_0_15px_rgba(239,68,68,0.25)]">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Background Track */}
        <path
          d="M 22 110 A 88 88 0 0 1 198 110"
          fill="none"
          stroke="#1e293b"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Animated Arc with Multi-stop Cyber Gradient */}
        <motion.path
          d="M 22 110 A 88 88 0 0 1 198 110"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="16"
          strokeDasharray={dash}
          strokeLinecap="round"
          initial={{ strokeDashoffset: dash }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>

      <div className="text-center -mt-8 font-mono">
        <div className={`text-3xl font-black ${isHighRisk ? 'text-[#ef4444] drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]' : 'text-[#10b981] drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]'}`}>
          {score}
          <span className="text-sm font-bold text-slate-400">%</span>
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          SYNTHETIC CONFIDENCE
        </div>
      </div>
    </div>
  )
}
