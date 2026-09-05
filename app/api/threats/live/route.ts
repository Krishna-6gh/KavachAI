import { NextResponse } from 'next/server'

export interface ThreatArticle {
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

const LIVE_THREATS: ThreatArticle[] = [
  {
    id: 'threat-01',
    title: 'AI Voice Clone Impersonates Executive in ₹2.1 Cr Cyber Extortion',
    source: 'State Cyber Crime Unit (Punjab & Chandigarh)',
    sourceType: 'POLICE INTEL',
    timeAgo: '12 min ago',
    summary:
      'Perpetrators cloned a managing director’s acoustic vocal profile from a public earnings call to authorize emergency offshore RTGS transfers. Forensics revealed sub-band phase discontinuity in vocoder frequencies at 14.8 kHz.',
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
    timeAgo: '38 min ago',
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
    rimColor: 'border-t-2 border-t-[#00f2fe]/80 hover:border-[#00f2fe]/60 hover:shadow-[0_0_25px_rgba(0,242,254,0.15)]',
    url: '#',
  },
  {
    id: 'threat-04',
    title: 'Automated Telegram Botnet Cluster Flagged Disseminating Minister Deepfakes',
    source: 'Central Cyber Defense Enclave',
    sourceType: 'POLICE INTEL',
    timeAgo: '2 hours ago',
    summary:
      'Kavach Shield intercepted a coordinated network of 140 automated bot channels broadcasting an AI-spliced video address prior to a regional legislative vote. Perceptual hash matched state blacklist in 42ms.',
    attackVector: 'Coordinated Disinformation Swarm',
    tagBg: 'bg-purple-500/10 border-purple-500/30',
    tagColor: 'text-[#a855f7]',
    rimColor: 'border-t-2 border-t-purple-500/80 hover:border-purple-500/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]',
    url: '#',
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: LIVE_THREATS,
    timestamp: new Date().toISOString(),
  })
}
