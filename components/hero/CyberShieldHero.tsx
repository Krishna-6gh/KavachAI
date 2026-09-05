'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react'

export function CyberShieldHero() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto flex flex-col items-center justify-center p-6">
      {/* Ambient Glow */}
      <div
        className="absolute inset-0 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating 3D Shield Container */}
      <motion.div
        className="relative w-64 h-68 sm:w-72 sm:h-76 flex items-center justify-center"
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Image
          src="/kavach-official-emblem.png"
          alt="Kavach AI Forensic Defense Emblem"
          width={280}
          height={300}
          style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
          className="object-contain drop-shadow-[0_15px_35px_rgba(0,242,254,0.25)]"
          priority
        />
      </motion.div>

      {/* Sleek Floating Status Pill */}
      <motion.div
        className="mt-4 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700 backdrop-blur-md shadow-xl flex items-center gap-3 font-mono text-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <ShieldCheck size={15} />
          <span>99.4% PROVENANCE ATTESTED</span>
        </div>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400 text-[11px]">ISO/IEC 27037 §6.3</span>
      </motion.div>
    </div>
  )
}
