'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Terminal, UserRound, Lock, Scale } from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

interface CTAClosingBannerProps {
  onSignInClick?: () => void
}

export function CTAClosingBanner({ onSignInClick }: CTAClosingBannerProps) {
  return (
    <section className="cta-closing-section my-12 px-4 max-w-[1300px] mx-auto" aria-label="Law Enforcement Deployment Intake">
      <div className="p-8 md:p-12 bg-slate-900/60 border border-slate-800 rounded-2xl relative overflow-hidden text-center backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[#00f2fe] text-xs font-mono font-bold mb-4">
            DEPLOYMENT INTAKE // STATE POLICE &amp; JUDICIARY
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-sans m-0 leading-tight">
            Verify Digital Truth with <br />
            <span className="text-[#ef4444]">Court-Admissible AI Forensics</span>
          </h2>

          <p className="text-[#94a3b8] text-base md:text-lg mt-3 leading-relaxed font-sans max-w-xl mx-auto">
            Test the air-gapped forensic scanner console with live video and audio exhibits. Generates full ISO/IEC 27037 compliance dossiers in seconds.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap mt-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-md transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer text-sm"
              onClick={() => sfx.playScan()}
            >
              <Terminal size={16} />
              <span>Launch Forensic Scanner Console</span>
              <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white bg-slate-900/40 hover:bg-slate-800/60 px-6 py-3 rounded-md transition-all cursor-pointer text-sm font-semibold"
              onClick={() => {
                sfx.playClick()
                onSignInClick?.()
              }}
            >
              <UserRound size={16} />
              <span>Investigator Authorization Gate</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-slate-800 text-xs font-mono text-slate-400 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Lock size={14} className="text-emerald-400" /> FIPS 140-3 Hardware Sealed
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-cyan-400" /> 99.4% Detection Accuracy
            </span>
            <span className="flex items-center gap-1.5">
              <Scale size={14} className="text-red-400" /> Indian Evidence Act §65B
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
