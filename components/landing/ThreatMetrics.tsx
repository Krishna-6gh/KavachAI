'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, AlertOctagon, Zap, ShieldCheck } from 'lucide-react'

export function ThreatMetrics() {
  const metrics = [
    {
      icon: AlertOctagon,
      iconColor: 'text-[#ef4444]',
      iconGlow: 'shadow-[0_0_12px_rgba(239,68,68,0.3)]',
      value: '₹1,400+ Cr',
      valueColor: 'text-white',
      label: 'Financial Losses',
      desc: 'Annual cyber fraud losses via AI voice clones & executive deepfakes',
      borderAccent: 'border-t-2 border-t-red-500/80 hover:border-red-500/60 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]',
    },
    {
      icon: TrendingUp,
      iconColor: 'text-[#f59e0b]',
      iconGlow: 'shadow-[0_0_12px_rgba(245,158,11,0.3)]',
      value: '92% Rise',
      valueColor: 'text-white',
      label: 'Synthetic Surge',
      desc: 'Year-over-year surge in weaponized generative deepfake attacks',
      borderAccent: 'border-t-2 border-t-amber-500/80 hover:border-amber-500/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]',
    },
    {
      icon: Zap,
      iconColor: 'text-[#00f2fe]',
      iconGlow: 'shadow-[0_0_12px_rgba(0,242,254,0.3)]',
      value: '< 2s Latency',
      valueColor: 'text-white',
      label: 'Detection Speed',
      desc: 'Real-time multi-modal neural inference across audio and video frames',
      borderAccent: 'border-t-2 border-t-cyan-400/80 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(0,242,254,0.15)]',
    },
    {
      icon: ShieldCheck,
      iconColor: 'text-[#10b981]',
      iconGlow: 'shadow-[0_0_12px_rgba(16,185,129,0.3)]',
      value: 'ISO/IEC 27037',
      valueColor: 'text-white',
      label: 'Legal Compliance',
      desc: 'Hardware-attested SHA-256 chain of custody for legal discovery & courts',
      borderAccent: 'border-t-2 border-t-emerald-400/80 hover:border-emerald-400/60 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]',
    },
  ]

  return (
    <section className="w-full max-w-[1300px] mx-auto my-6 px-4" aria-label="Threat Landscape Metrics">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-950/60 border border-slate-800 rounded-xl backdrop-blur-md">
        {metrics.map((item, idx) => (
          <motion.div
            key={item.label}
            className={`bg-slate-900/70 border border-slate-800/80 rounded-lg p-4 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm ${item.borderAccent}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-slate-400">
                  {item.label}
                </span>
                <div className={`p-1.5 rounded-md bg-slate-950/80 border border-slate-800 ${item.iconGlow}`}>
                  <item.icon size={16} className={item.iconColor} />
                </div>
              </div>

              <div className={`font-mono text-2xl lg:text-3xl font-extrabold tracking-tight mb-1.5 ${item.valueColor}`}>
                {item.value}
              </div>

              <p className="text-xs text-[#94a3b8] leading-relaxed font-sans m-0">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
