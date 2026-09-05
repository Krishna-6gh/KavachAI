'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ScanFace, Zap, FileCheck } from 'lucide-react'

export function FeatureStrip() {
  const features = [
    {
      icon: ScanFace,
      iconColor: 'text-cyan-400',
      title: 'Face & Voice Scan',
      desc: 'Detects AI-generated faces, lip-sync glitches, and cloned voices with frame-by-frame precision.',
      badge: 'MULTI-MODAL',
      badgeStyle: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    },
    {
      icon: Zap,
      iconColor: 'text-amber-400',
      title: 'Instant Verdict',
      desc: 'Results in under 400ms with clear confidence percentage and detailed anomaly highlights.',
      badge: '< 400MS LATENCY',
      badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    },
    {
      icon: FileCheck,
      iconColor: 'text-emerald-400',
      title: 'Court-Ready Report',
      desc: 'Generates tamper-proof PDF forensic dossiers accepted in courtrooms and police inquiries.',
      badge: 'ISO 27037 §6.3',
      badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
  ]

  return (
    <section className="my-4" id="features" aria-label="Key Capabilities">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((item, idx) => (
          <motion.div
            key={item.title}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-lg flex flex-col justify-between hover:border-slate-700 transition-all"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="w-8 h-8 rounded-md bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <item.icon size={16} className={item.iconColor} />
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${item.badgeStyle}`}>
                  {item.badge}
                </span>
              </div>

              <h3 className="text-white text-base font-bold mb-1 font-sans">{item.title}</h3>
              <p className="text-[#94a3b8] text-xs leading-relaxed font-sans m-0">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
