'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Scan,
  Cpu,
  Activity,
  Lock,
  Radio,
  CheckCircle2,
  Sparkles,
  Zap,
  Fingerprint,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

export function KavachHeroEmblemHUD() {
  const [activeTab, setActiveTab] = useState<'neural' | 'vit' | 'spectral'>('neural')

  const handleTabChange = (tab: 'neural' | 'vit' | 'spectral') => {
    sfx.playScan()
    setActiveTab(tab)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative p-6 sm:p-7 rounded-3xl bg-slate-900/80 border-2 border-emerald-500/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(16,185,129,0.22)] overflow-hidden"
    >
      {/* Background Cyber Ambient Radial Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header of the HUD */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative w-3 h-3 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-black text-white tracking-wider flex items-center gap-1.5">
              KAVACH DEFENSE CORE
              <span className="text-[10px] font-normal text-slate-400">• #KV-89204</span>
            </span>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          <Zap size={11} className="text-emerald-400 animate-pulse" />
          LIVE RADAR (99.4%)
        </span>
      </div>

      {/* Interactive Mode Tabs */}
      <div className="grid grid-cols-3 gap-1.5 my-4 p-1 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-[11px] relative z-10">
        <button
          type="button"
          onClick={() => handleTabChange('neural')}
          className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'neural'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scan size={13} className={activeTab === 'neural' ? 'text-emerald-400' : 'text-slate-500'} />
          <span>Neural Scan</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('vit')}
          className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'vit'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu size={13} className={activeTab === 'vit' ? 'text-emerald-400' : 'text-slate-500'} />
          <span>ViT Patch 16x16</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('spectral')}
          className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'spectral'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity size={13} className={activeTab === 'spectral' ? 'text-emerald-400' : 'text-slate-500'} />
          <span>Spectral 14.8kHz</span>
        </button>
      </div>

      {/* Center Holographic Stage Featuring Kavach AI Logo */}
      <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-2xl bg-[#030712] border border-slate-800/90 flex flex-col items-center justify-center overflow-hidden p-4">
        {/* Holographic Concentric Radar Coordinate Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-56 h-56 rounded-full border border-emerald-500/20 animate-spin-slow opacity-60" />
          <div className="w-72 h-72 rounded-full border border-dashed border-cyan-500/15 animate-spin-reverse opacity-40" />
          <div className="w-40 h-40 rounded-full border border-emerald-400/30" />
        </div>

        {/* Ambient Radial Cyber Backlight */}
        <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-emerald-500/25 to-cyan-500/20 blur-2xl pointer-events-none" />

        {/* Vertical Laser Scanline Sweep */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[scanline_3s_ease-in-out_infinite] shadow-[0_0_15px_#10b981] pointer-events-none z-20" />

        {/* Corner Reticle Brackets */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-400/70 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-400/70 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-400/70 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-400/70 pointer-events-none" />

        {/* Active Stage Mode Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'neural' && (
            <motion.div
              key="neural"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col items-center justify-center text-center"
            >
              {/* Central Glowing Kavach AI Emblem Logo */}
              <motion.div
                className="relative w-28 h-32 sm:w-32 sm:h-36 flex items-center justify-center my-1"
                animate={{
                  y: [-4, 4, -4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Image
                  src="/kavach-official-emblem.png"
                  alt="Kavach AI Defense Shield Emblem"
                  width={140}
                  height={150}
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                  className="object-contain drop-shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                  priority
                />
              </motion.div>

              {/* Status Readout Below Logo */}
              <div className="mt-1 flex flex-col items-center">
                <span className="font-mono text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
                  <Sparkles size={12} className="text-emerald-400" />
                  OPTICAL FLOW DIVERGENCE: <span className="text-emerald-400 font-extrabold">98.4%</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400 mt-0.5">
                  Multi-Modal Neural Lattice • Model v4.2 Active
                </span>
              </div>
            </motion.div>
          )}

          {activeTab === 'vit' && (
            <motion.div
              key="vit"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full flex flex-col items-center justify-center"
            >
              <div className="relative p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                {/* 16x16 ViT Patch Matrix Superimposed */}
                <div className="grid grid-cols-6 gap-1.5">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const isAnom = [7, 8, 13, 14, 19, 20].includes(i)
                    return (
                      <div
                        key={i}
                        className={`w-7 h-6 rounded flex items-center justify-center text-[9px] font-mono font-bold transition-all ${
                          isAnom
                            ? 'bg-rose-500/30 border border-rose-500 text-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.4)] animate-pulse'
                            : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        }`}
                      >
                        P{i + 1}
                      </div>
                    )
                  })}
                </div>
              </div>

              <span className="font-mono text-[11px] font-bold text-slate-200 mt-2.5">
                Cross-Attention Anomaly Detected (<span className="text-rose-400">Tokens P8–P20</span>)
              </span>
              <span className="font-mono text-[9px] text-slate-400">
                16x16 Patch Transformer Cross-Attention Heatmap
              </span>
            </motion.div>
          )}

          {activeTab === 'spectral' && (
            <motion.div
              key="spectral"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full flex flex-col items-center justify-center px-4"
            >
              {/* Animated Spectral Frequency Equalizer Bars */}
              <div className="w-full flex items-end justify-between gap-1.5 h-20 border-b border-slate-700/80 pb-1 px-2">
                {[35, 55, 75, 90, 85, 95, 80, 65, 50, 20, 5, 0, 0, 0].map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ height: '10%' }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: idx * 0.05 }}
                    className={`w-full max-w-[16px] rounded-t ${
                      idx >= 10
                        ? 'bg-rose-500/40 border-t-2 border-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                        : 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                    }`}
                  />
                ))}
              </div>

              <div className="w-full flex justify-between text-[10px] font-mono text-slate-400 mt-1.5 px-2">
                <span>0 Hz</span>
                <span className="text-rose-400 font-bold">14.8 kHz Vocoder Drop</span>
                <span>22.05 kHz</span>
              </div>

              <span className="font-mono text-[10px] text-slate-300 mt-1">
                Neural Vocoder High-Frequency Synthetic Phase Discontinuity
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Telemetry Metrics */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono relative z-10">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <span className="text-slate-400 text-[10px] block">HSM MERKLE ROOT:</span>
          <code className="text-emerald-400 text-[11px] truncate font-bold">
            0x7f83b165...d9069
          </code>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <span className="text-slate-400 text-[10px] block">LEGAL COMPLIANCE:</span>
          <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
            <CheckCircle2 size={13} className="text-emerald-400" />
            SEC 65B SEALED
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default KavachHeroEmblemHUD
