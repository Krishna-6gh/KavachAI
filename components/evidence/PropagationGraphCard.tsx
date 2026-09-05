'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Network, Share2, ShieldAlert } from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

interface NodeItem {
  id: string
  name: string
  reach: string
  anomaly: boolean
}

const networkNodes: NodeItem[] = [
  { id: 'origin', name: 'DARKNET CLUSTER • SEED 01', reach: '1.2k views', anomaly: true },
  { id: 'relay1', name: 'TELEGRAM RELAY • BOTNET', reach: '48.5k views', anomaly: true },
  { id: 'relay2', name: 'X (TWITTER) • VIRAL SYNDICATION', reach: '184.2k views', anomaly: true },
  { id: 'target', name: 'BROADCAST MAINSTREAM PORTAL', reach: 'CONTAINED', anomaly: false },
]

export function PropagationGraphCard() {
  const [selectedNode, setSelectedNode] = useState<NodeItem>(networkNodes[1])

  const handleSelect = (n: NodeItem) => {
    sfx.playClick()
    setSelectedNode(n)
  }

  return (
    <article className="evidence-card forensic-subcard" aria-label="Dissemination Topology Graph">
      <div className="card-top">
        <div className="card-top-left">
          <Network size={14} className="text-cyan" />
          <span className="card-label">DISSEMINATION TOPOLOGY</span>
        </div>
        <span className="live-tag">
          <span className="pulse-dot" /> 3 RELAY HOPS
        </span>
      </div>

      {/* SVG Network Graph Canvas */}
      <div className="network-canvas-stage">
        <svg viewBox="0 0 280 110" className="network-svg">
          {/* Animated Connecting Trajectory Lines */}
          <path
            d="M 30,55 Q 85,15 140,35 Q 195,55 250,55"
            fill="none"
            stroke="rgba(14, 165, 165, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />
          <path
            d="M 30,55 Q 85,95 140,75 Q 195,55 250,55"
            fill="none"
            stroke="rgba(239, 68, 68, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Node 1: Origin */}
          <g onClick={() => handleSelect(networkNodes[0])} className="cursor-pointer">
            <circle cx="30" cy="55" r="9" fill="#0c1726" stroke="#ef4444" strokeWidth="2" />
            <text x="30" y="58" textAnchor="middle" fill="#ef4444" fontSize="6" fontFamily="monospace" fontWeight="bold">SEED</text>
          </g>

          {/* Node 2: Relay 1 */}
          <g onClick={() => handleSelect(networkNodes[1])} className="cursor-pointer">
            <circle cx="140" cy="35" r="11" fill="#0c1726" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
            <text x="140" y="38" textAnchor="middle" fill="#ef4444" fontSize="6" fontFamily="monospace" fontWeight="bold">TG-01</text>
          </g>

          {/* Node 3: Relay 2 */}
          <g onClick={() => handleSelect(networkNodes[2])} className="cursor-pointer">
            <circle cx="140" cy="75" r="11" fill="#0c1726" stroke="#0ea5a5" strokeWidth="2" />
            <text x="140" y="78" textAnchor="middle" fill="#0ea5a5" fontSize="6" fontFamily="monospace" fontWeight="bold">X-SYN</text>
          </g>

          {/* Node 4: Target */}
          <g onClick={() => handleSelect(networkNodes[3])} className="cursor-pointer">
            <circle cx="250" cy="55" r="9" fill="#0c1726" stroke="#10b981" strokeWidth="2" />
            <text x="250" y="58" textAnchor="middle" fill="#10b981" fontSize="6" fontFamily="monospace" fontWeight="bold">END</text>
          </g>
        </svg>
      </div>

      {/* Selected Node Details */}
      <div className="frame-telemetry-box">
        <div className="flex justify-between items-center text-[10px] font-mono">
          <span className="text-cyan font-bold">{selectedNode.name}</span>
          <span className="text-muted-foreground">{selectedNode.reach}</span>
        </div>
        <p className="frame-desc">
          Automated algorithmic syndication trajectory tracked across 14 synchronized relay nodes.
        </p>
      </div>
    </article>
  )
}
