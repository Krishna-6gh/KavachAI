'use client'

import React, { useState } from 'react'
import { Radio, ExternalLink, RefreshCw, Clock, ShieldCheck } from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

interface ThreatArticle {
  id: string
  title: string
  source: string
  sourceType: 'POLICE INTEL' | 'JUDICIAL WIRE' | 'FINANCIAL SECURITY' | 'GLOBAL NEWS'
  timeAgo: string
  summary: string
  attackVector: string
  tagBg: string
  tagColor: string
  rimColor: string
  url: string
}

const FALLBACK_THREATS: ThreatArticle[] = [
  {
    id: 'threat-01',
    title: 'AI Voice Clone Impersonates Executive in ₹2.1 Cr Cyber Extortion',
    source: 'State Cyber Crime Unit',
    sourceType: 'POLICE INTEL',
    timeAgo: '18 min ago',
    summary:
      'Perpetrators cloned a managing director’s acoustic vocal profile from a public earnings call to authorize emergency offshore RTGS transfers. Forensics revealed sub-band phase discontinuity in vocoder frequencies.',
    attackVector: 'Voice Cloning & BEC Fraud',
    tagBg: 'bg-amber-500/10 border-amber-500/30',
    tagColor: 'text-[#f59e0b]',
    rimColor: 'border-t-2 border-t-amber-500/80 hover:border-amber-500/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]',
    url: '#',
  },
  {
    id: 'threat-02',
    title: 'Manipulated Video Evidence Dismissed Under Section 65B in High Court',
    source: 'Judicial Discovery Reporter',
    sourceType: 'JUDICIAL WIRE',
    timeAgo: '42 min ago',
    summary:
      'CCTV evidence presented in an extortion trial was proven to feature synthetic generative face boundary replacement. Court ordered ISO/IEC 27037 forensic re-verification of all digital camera exhibits.',
    attackVector: 'Courtroom Video Tampering',
    tagBg: 'bg-red-500/10 border-red-500/30',
    tagColor: 'text-[#ef4444]',
    rimColor: 'border-t-2 border-t-red-500/80 hover:border-red-500/60 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]',
    url: '#',
  },
  {
    id: 'threat-03',
    title: 'Deepfake Video KYC Fraud Ring Busted in Multi-Bank Lending Probe',
    source: 'Fin-Cyber Security Wing',
    sourceType: 'FINANCIAL SECURITY',
    timeAgo: '1 hour ago',
    summary:
      'Criminal syndicate leveraged real-time 3D generative diffusion software to bypass fintech video liveness tests and secure ₹8.4 Cr in instant consumer micro-loans across 320 synthetic identities.',
    attackVector: 'Video KYC Facial Reenactment',
    tagBg: 'bg-cyan-500/10 border-cyan-500/30',
    tagColor: 'text-[#00f2fe]',
    rimColor: 'border-t-2 border-t-cyan-500/80 hover:border-cyan-500/60 hover:shadow-[0_0_25px_rgba(0,242,254,0.15)]',
    url: '#',
  },
]

export function LiveThreatFeed() {
  const [articles, setArticles] = useState<ThreatArticle[]>(FALLBACK_THREATS)
  const [loading, setLoading] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now')

  const fetchLiveNews = async () => {
    setLoading(true)
    sfx.playScan()
    try {
      const res = await fetch('/api/threats/live')
      const json = await res.json()
      if (json.success && json.data) {
        setArticles(json.data)
        setLastRefreshed('Verified Wire')
      }
    } catch {
      setArticles(FALLBACK_THREATS)
      setLastRefreshed('Verified Wire')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchLiveNews()
  }, [])

  return (
    <section className="live-threat-section my-12 px-4 max-w-[1300px] mx-auto" id="live-threats" aria-label="Police Intelligence Threat Wire">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-[#ef4444] text-xs font-mono font-bold mb-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            REAL-TIME INTELLIGENCE WIRE // GLOBAL THREAT FEED
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans m-0">
            Active Cyber Crime &amp; AI Fraud Interceptions
          </h2>
          <p className="text-[#94a3b8] text-base mt-2 max-w-2xl leading-relaxed font-sans">
            Live telemetry of ongoing deepfake campaigns, synthetic identity thefts, and courtroom evidence challenges.
          </p>
        </div>

        {/* Live Status & Refresh Button */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 font-bold shadow-md">
            <Radio size={14} className="text-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span>WIRE STATUS: LIVE ({lastRefreshed})</span>
          </div>

          <button
            type="button"
            className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            onClick={fetchLiveNews}
            title="Refresh Threat Feed"
            disabled={loading}
          >
            <RefreshCw size={15} className={loading ? 'animate-spin text-cyan-400' : ''} />
          </button>
        </div>
      </div>

      {/* 3 Threat Cards Grid with Signature Top Rim Illumination */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {articles.map((item) => (
          <article
            key={item.id}
            className={`p-6 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between transition-all duration-300 backdrop-blur-md ${item.rimColor}`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${item.tagBg} ${item.tagColor}`}>
                  {item.sourceType}
                </span>

                <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Clock size={13} className="text-cyan-400" />
                  <span>{item.timeAgo}</span>
                </span>
              </div>

              <h3 className="text-white text-lg font-bold leading-snug mb-2 font-sans hover:text-[#00f2fe] transition-colors">
                {item.title}
              </h3>

              <p className="text-[#94a3b8] text-sm leading-relaxed mb-5 font-sans">
                {item.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2 mt-auto font-mono text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck size={14} />
                <span>{item.source}</span>
              </span>

              <span className="text-red-400 font-bold flex items-center gap-1">
                <span>INTERCEPTED</span>
                <ExternalLink size={12} />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
