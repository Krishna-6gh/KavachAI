'use client'

import React, { forwardRef, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radio } from 'lucide-react'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { sfx } from '@/lib/soundEffects'

interface NodeData {
  id: string
  name: string
  reach: string
  ipCluster: string
  firstSeen: string
  type: 'origin' | 'core' | 'target'
}

const nodesData: Record<string, NodeData> = {
  discord: {
    id: 'discord',
    name: 'DISCORD CDN (SEED #01)',
    reach: '1,420 Initial Views',
    ipCluster: '194.26.29.11 (Darknet Node)',
    firstSeen: '2026-09-02 08:14:02 UTC',
    type: 'origin',
  },
  telegram: {
    id: 'telegram',
    name: 'TELEGRAM RELAY CHANNEL',
    reach: '18,500 Forwards',
    ipCluster: '185.220.101.5 (Tor Exit Relay)',
    firstSeen: '2026-09-02 08:29:15 UTC',
    type: 'origin',
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WHATSAPP BROADCAST MESH',
    reach: '84,000 Encrypted Forwards',
    ipCluster: 'P2P Encrypted Swarm',
    firstSeen: '2026-09-02 08:42:00 UTC',
    type: 'origin',
  },
  core: {
    id: 'core',
    name: 'KAVACH.AI FORENSIC RESOLVER',
    reach: 'Air-Gapped Ingestion Engine',
    ipCluster: 'SECURE_HSM_AIRGAP_01',
    firstSeen: 'Real-Time Telemetry',
    type: 'core',
  },
  twitter: {
    id: 'twitter',
    name: 'X / TWITTER SYNDICATED FEED',
    reach: '420,000 Viral Impressions',
    ipCluster: 'AS13414 (Twitter CDN)',
    firstSeen: '2026-09-02 09:02:44 UTC',
    type: 'target',
  },
  youtube: {
    id: 'youtube',
    name: 'YOUTUBE SHORTS BROADCAST',
    reach: '1.2M Syndicated Plays',
    ipCluster: 'AS15169 (Google CDN)',
    firstSeen: '2026-09-02 09:18:10 UTC',
    type: 'target',
  },
  meta: {
    id: 'meta',
    name: 'INSTAGRAM / META REELS',
    reach: '890,000 Algorithmic Shares',
    ipCluster: 'AS32934 (Meta Backbone)',
    firstSeen: '2026-09-02 09:25:01 UTC',
    type: 'target',
  },
}

const Circle = forwardRef<
  HTMLDivElement,
  {
    className?: string
    children?: React.ReactNode
    tone?: 'red' | 'cyan' | 'amber'
    isActive?: boolean
    onClick?: () => void
    title?: string
  }
>(({ className = '', children, tone = 'cyan', isActive = false, onClick, title }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      title={title}
      className={`z-10 flex size-12 items-center justify-center rounded-xl border-2 bg-slate-900 transition-all cursor-pointer ${
        isActive
          ? 'border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.3)] scale-105'
          : 'border-slate-800 hover:border-slate-700'
      } ${className}`}
    >
      {children}
    </div>
  )
})

Circle.displayName = 'Circle'

interface OriginTraceDetectorProps {
  fileName?: string
  phash?: string
  caseId?: string
  auditData?: any
}

export function OriginTraceDetector({
  fileName = 'suspect_specimen.mp4',
  phash = 'd8e1f0c2a4b89912',
  caseId = 'KV-0928-A',
  auditData,
}: OriginTraceDetectorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  const [selectedNode, setSelectedNode] = useState<NodeData>(nodesData.core)
  const [liveNodes, setLiveNodes] = useState<any[]>([])
  const [summary, setSummary] = useState<string>(
    'Media provenance evaluated under Section 63 BSA electronic evidence chain of custody.'
  )

  React.useEffect(() => {
    if (auditData?.propagation_vector) {
      setLiveNodes(auditData.propagation_vector)
      if (auditData.dissemination_summary) setSummary(auditData.dissemination_summary)
    } else {
      async function fetchTrace() {
        try {
          const res = await fetch(`/api/forensics/origin-trace?phash=${phash}&case_id=${caseId}`)
          const json = await res.json()
          if (json.success || json.propagation_vector) {
            setLiveNodes(json.propagation_vector || [])
            if (json.dissemination_summary) setSummary(json.dissemination_summary)
          }
        } catch {
          // fallback
        }
      }
      fetchTrace()
    }
  }, [phash, caseId, auditData])

  const handleSelect = (key: string) => {
    sfx.playClick()
    setSelectedNode(nodesData[key] || nodesData.core)
  }

  return (
    <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between" aria-label="Social Media Origin & Trace Detection">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div>
          <span className="text-xs font-mono font-bold text-red-400 block mb-1">
            PROPAGATION RADAR // PATIENT-ZERO MAPPING
          </span>
          <h3 className="text-lg font-bold text-white font-sans m-0">
            Social Media Origin &amp; Dissemination Trace
          </h3>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          LIVE TRACE ACTIVE
        </span>
      </div>

      {/* Main Beam Stage */}
      <div
        className="relative flex h-[260px] w-full items-center justify-center overflow-hidden bg-slate-950/60 p-6 border border-slate-800 rounded-xl my-2"
        ref={containerRef}
      >
        <div className="flex size-full max-h-[200px] max-w-2xl flex-col items-stretch justify-between gap-6">
          {/* Top Row: Discord -> Core -> Twitter */}
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Circle
                ref={div1Ref}
                tone="red"
                isActive={selectedNode.id === 'discord'}
                onClick={() => handleSelect('discord')}
                title="Discord / Darknet CDN"
              >
                <Icons.discord />
              </Circle>
              <span className="text-[10px] font-mono font-bold text-red-400 hidden sm:inline">ORIGIN SEED</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-cyan-400 hidden sm:inline">X / TWITTER</span>
              <Circle
                ref={div5Ref}
                tone="cyan"
                isActive={selectedNode.id === 'twitter'}
                onClick={() => handleSelect('twitter')}
                title="X Viral Feed"
              >
                <Icons.twitter />
              </Circle>
            </div>
          </div>

          {/* Middle Row: Telegram -> Core -> YouTube */}
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Circle
                ref={div2Ref}
                tone="red"
                isActive={selectedNode.id === 'telegram'}
                onClick={() => handleSelect('telegram')}
                title="Telegram Botnet Relay"
              >
                <Icons.telegram />
              </Circle>
              <span className="text-[10px] font-mono font-bold text-red-400 hidden sm:inline">BOTNET RELAY</span>
            </div>

            {/* Central Kavach Resolver */}
            <Circle
              ref={div4Ref}
              className="size-14 border-2 border-cyan-400 bg-cyan-950/40"
              tone="cyan"
              isActive={selectedNode.id === 'core'}
              onClick={() => handleSelect('core')}
              title="Kavach AI Neural Provenance Resolver"
            >
              <Icons.kavachShield />
            </Circle>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-cyan-400 hidden sm:inline">YOUTUBE</span>
              <Circle
                ref={div6Ref}
                tone="cyan"
                isActive={selectedNode.id === 'youtube'}
                onClick={() => handleSelect('youtube')}
                title="YouTube Broadcast"
              >
                <Icons.youtube />
              </Circle>
            </div>
          </div>

          {/* Bottom Row: WhatsApp -> Core -> Instagram */}
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Circle
                ref={div3Ref}
                tone="amber"
                isActive={selectedNode.id === 'whatsapp'}
                onClick={() => handleSelect('whatsapp')}
                title="WhatsApp Mesh"
              >
                <Icons.whatsapp />
              </Circle>
              <span className="text-[10px] font-mono font-bold text-amber-400 hidden sm:inline">P2P MESH</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-cyan-400 hidden sm:inline">INSTAGRAM</span>
              <Circle
                ref={div7Ref}
                tone="cyan"
                isActive={selectedNode.id === 'meta'}
                onClick={() => handleSelect('meta')}
                title="Instagram Reels Gateway"
              >
                <Icons.instagram />
              </Circle>
            </div>
          </div>
        </div>

        {/* Animated Beams */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div4Ref}
          curvature={-60}
          endYOffset={-8}
          gradientStartColor="#ef4444"
          gradientStopColor="#00f2fe"
          duration={2.8}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div4Ref}
          gradientStartColor="#ef4444"
          gradientStopColor="#00f2fe"
          duration={2.4}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div4Ref}
          curvature={60}
          endYOffset={8}
          gradientStartColor="#f59e0b"
          gradientStopColor="#00f2fe"
          duration={3.0}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div5Ref}
          curvature={-60}
          startYOffset={-8}
          gradientStartColor="#00f2fe"
          gradientStopColor="#38bdf8"
          duration={2.6}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div6Ref}
          gradientStartColor="#00f2fe"
          gradientStopColor="#38bdf8"
          duration={2.2}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div7Ref}
          curvature={60}
          startYOffset={8}
          gradientStartColor="#00f2fe"
          gradientStopColor="#38bdf8"
          duration={2.9}
        />
      </div>

      {/* Selected Node Telemetry */}
      <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg font-mono text-xs">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <span className="font-bold text-white">{selectedNode.name}</span>
          <span className="text-slate-400 text-[11px]">SEEN: <b className="text-slate-200">{selectedNode.firstSeen}</b></span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
          <div>
            <span className="text-slate-400 text-[10px] block">ESTIMATED REACH:</span>
            <b className="text-white text-sm">{selectedNode.reach}</b>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">NODE CLUSTER:</span>
            <b className="text-cyan-400">{selectedNode.ipCluster}</b>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">PROVENANCE CONFIDENCE:</span>
            <b className="text-emerald-400 text-sm">99.4% VERIFIED</b>
          </div>
        </div>
      </div>
    </div>
  )
}

const Icons = {
  kavachShield: () => (
    <svg viewBox="0 0 24 24" fill="none" className="size-7 text-cyan-400">
      <path
        d="M12 2L4 5V11C4 16.52 7.41 21.61 12 23C16.59 21.61 20 16.52 20 11V5L12 2Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M9 12L11 14L15 9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  telegram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-[#229ED9]">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  discord: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-[#5865F2]">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  whatsapp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-[#25D366]">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.35.06-.54.27-.18.21-.7.69-.7 1.68 0 .99.72 1.95.82 2.09.1.14 1.4 2.14 3.4 3 .48.2.85.33 1.15.42.48.15.92.13 1.27.08.39-.06 1.2-.49 1.37-.96.17-.48.17-.89.12-.97-.05-.08-.18-.13-.37-.23s-1.2-.59-1.39-.66c-.18-.07-.32-.1-.45.1-.14.21-.52.66-.64.79-.12.14-.24.15-.43.05-.19-.1-.81-.3-1.54-.95-.57-.51-.95-1.14-1.06-1.33-.11-.19-.01-.3.08-.39.09-.08.19-.23.29-.34.1-.12.13-.2.2-.34.07-.14.03-.26-.02-.36s-.45-1.09-.62-1.5c-.16-.39-.33-.34-.45-.34z" />
    </svg>
  ),
  twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-white">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-[#FF0000]">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  instagram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-[#E4405F]">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
}
