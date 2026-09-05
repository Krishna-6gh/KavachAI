'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function BootScreen() {
  return (
    <main className="boot-screen" aria-label="System Initializing">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
          <Image
            src="/kavach-official-emblem.png"
            alt="KavachAI Official Shield"
            width={80}
            height={80}
            className="object-contain filter drop-shadow-[0_0_20px_rgba(0,242,254,0.6)] animate-pulse"
            priority
          />
        </div>
        <div className="boot-title font-display font-black text-2xl tracking-wider text-white">
          KAVACH<span className="text-[#00f2fe]">AI</span>
        </div>
        <div className="font-mono text-xs font-bold text-[#38bdf8] uppercase tracking-widest mt-1 mb-4">
          INTELLIGENT DEFENSE
        </div>

        <div className="boot-progress w-56 h-1 bg-[#111827] rounded-full overflow-hidden border border-[#38bdf8]/30">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00f2fe] via-[#38bdf8] to-[#10b981]"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          />
        </div>
        <div className="boot-label font-mono font-bold text-xs text-slate-300 mt-4 tracking-wider">
          INITIALIZING FORENSIC ENVIRONMENT • DEFCON 5 SECURE NODE
        </div>
      </motion.div>
    </main>
  )
}
