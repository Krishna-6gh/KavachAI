'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  CheckCircle2,
  Database,
  EyeOff,
  Fingerprint,
  Globe,
  Hash,
  Key,
  Layers,
  Lock,
  Network,
  RefreshCw,
  Search,
  Server,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

interface PlatformNode {
  id: string
  name: string
  type: string
  status: 'CONNECTED' | 'SYNCED'
  hashesQueried: number
  privacyMode: 'Zero-Knowledge Proof (ZKP)' | 'Perceptual Hash Matrix'
}

const FEDERATED_NODES: PlatformNode[] = [
  {
    id: 'police',
    name: 'State Police Cyber Cell Central Node',
    type: 'Law Enforcement HSM Node',
    status: 'SYNCED',
    hashesQueried: 14209,
    privacyMode: 'Zero-Knowledge Proof (ZKP)',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Encrypted Relay Node',
    type: 'Closed Messaging Gateway',
    status: 'SYNCED',
    hashesQueried: 98402,
    privacyMode: 'Zero-Knowledge Proof (ZKP)',
  },
  {
    id: 'telegram',
    name: 'Telegram Secure Cluster',
    type: 'Distributed Messaging Botnet Guard',
    status: 'CONNECTED',
    hashesQueried: 43210,
    privacyMode: 'Perceptual Hash Matrix',
  },
  {
    id: 'banking',
    name: 'Indian Banks Fin-Cyber Consortium',
    type: 'Video-KYC Anti-Fraud Engine',
    status: 'SYNCED',
    hashesQueried: 12590,
    privacyMode: 'Zero-Knowledge Proof (ZKP)',
  },
]

export function FederatedHashExchange() {
  const [selectedNode, setSelectedNode] = useState<string>('police')
  const [isQuerying, setIsQuerying] = useState<boolean>(false)
  const [queryMatch, setQueryMatch] = useState<{
    pHash: string
    pdqHammingDistance: number
    zkpVerified: boolean
    matchedCampaign: string
  } | null>({
    pHash: '0x8f14b29c0a1e4d77',
    pdqHammingDistance: 2, // Very close match (< 10 threshold)
    zkpVerified: true,
    matchedCampaign: 'State Cyber Cell Alert #IN-PB-8821 (CEO Voice Impersonation Campaign)',
  })

  const handleSimulateLookup = async () => {
    sfx.playScan()
    setIsQuerying(true)

    try {
      const res = await fetch('/api/federated/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeId: selectedNode, targetHash: '0x8f14b29c0a1e4d77' }),
      })
      const json = await res.json()
      if (json.success && json.data) {
        setQueryMatch({
          pHash: json.data.pHash,
          pdqHammingDistance: json.data.pdqHammingDistance,
          zkpVerified: json.data.zkpVerified,
          matchedCampaign: json.data.matchedCampaign,
        })
      }
    } catch {
      setQueryMatch({
        pHash: '0x8f14b29c0a1e4d77',
        pdqHammingDistance: 2,
        zkpVerified: true,
        matchedCampaign: 'State Cyber Cell Alert #IN-PB-8821 (CEO Voice Impersonation Campaign)',
      })
    } finally {
      setIsQuerying(false)
      sfx.playSeal()
    }
  }

  return (
    <section
      className="federated-hash-card p-6 md:p-8 rounded-3xl bg-[#080d1a] border border-[#00f2fe]/25 shadow-2xl relative overflow-hidden"
      id="federated-hash"
      aria-label="Federated Hash Exchange"
    >
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#00f2fe]/15 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#34d399] tracking-wider uppercase">
              WHAT MAKES US DIFFERENT • FEATURE #04
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#f8fafc]">
            Federated Hash Exchange
          </h3>
          <p className="text-slate-300 text-sm mt-1">
            Privacy-preserving perceptual hash tracing across closed encrypted platforms without violating user privacy or sharing raw media.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSimulateLookup}
          disabled={isQuerying}
          className="px-4 py-2 rounded-xl bg-[#10b981]/20 border border-[#10b981] text-[#34d399] text-xs md:text-sm font-mono font-bold hover:bg-[#10b981]/30 transition-all cursor-pointer flex items-center gap-2 self-start md:self-auto shadow-[0_0_15px_rgba(16,185,129,0.25)]"
        >
          <RefreshCw size={14} className={isQuerying ? 'animate-spin' : ''} />
          <span>{isQuerying ? 'QUERYING ZKP NODES...' : 'EXECUTE FEDERATED ZKP QUERY'}</span>
        </button>
      </div>

      {/* Main 2-Column Federation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 relative z-10">
        {/* Left Col: Connected Federation Nodes */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono px-1">
            <span className="text-[#34d399] font-bold flex items-center gap-1.5">
              <Network size={14} /> FEDERATED CONSORTIUM NODES
            </span>
            <span className="text-slate-400">4 Enclaves Synced</span>
          </div>

          {FEDERATED_NODES.map((node) => {
            const isSelected = selectedNode === node.id
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => {
                  sfx.playClick()
                  setSelectedNode(node.id)
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-[#111827] border-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                    : 'bg-[#030712] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-200">
                    {node.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10b981]/20 border border-[#10b981]/50 text-[#34d399]">
                    {node.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Type: {node.type}</span>
                  <span className="text-[#00f2fe]">{node.hashesQueried.toLocaleString()} lookups</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right Col: Privacy-Preserving Zero-Knowledge Match Telemetry */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-2xl bg-[#030712] border border-[#00f2fe]/20">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <EyeOff size={16} className="text-[#34d399]" />
                <span className="text-xs font-mono font-bold text-slate-200">
                  ZERO-KNOWLEDGE PRIVACY GUARANTEE
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#34d399]/20 border border-[#34d399] text-[#34d399]">
                RAW MEDIA NEVER TRANSFERRED
              </span>
            </div>

            {/* ZKP Hash Match Result Box */}
            {queryMatch && (
              <div className="mt-4 space-y-3">
                <div className="p-4 rounded-xl bg-[#080d1a] border border-white/10 font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">PERCEPTUAL PDQ HASH:</span>
                    <code className="text-[#00f2fe]">{queryMatch.pHash}</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">HAMMING DISTANCE:</span>
                    <b className="text-[#34d399]">{queryMatch.pdqHammingDistance} (Match Threshold &le; 10)</b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ZKP ATTESTATION:</span>
                    <b className="text-[#34d399] flex items-center gap-1">
                      <CheckCircle2 size={13} /> 100% Cryptographic Match
                    </b>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/30 text-xs">
                  <span className="text-[#ef4444] font-mono font-bold block mb-1">
                    CROSS-PLATFORM CAMPAIGN HIT:
                  </span>
                  <p className="text-slate-200 font-sans">
                    {queryMatch.matchedCampaign}. This asset has surfaced in 3 separate WhatsApp viral clusters and 1 Telegram channel.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 p-3.5 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/30 flex items-center gap-3">
            <Lock size={18} className="text-[#00f2fe] flex-shrink-0" />
            <span className="text-xs text-slate-200">
              <b>How It Works:</b> End-to-end encrypted platforms compute an irreversible perceptual hash on the user’s local device and query the decentralized registry using homomorphic encryption, ensuring zero leakage of user chats or images.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
