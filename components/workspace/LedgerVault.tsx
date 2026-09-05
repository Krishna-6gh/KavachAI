'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  Clipboard,
  Copy,
  Cpu,
  FileCode,
  FileText,
  GitBranch,
  GitCommit,
  Hash,
  Key,
  Layers,
  Lock,
  Radio,
  ShieldCheck,
  Terminal,
  Zap,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

interface LedgerVaultProps {
  blockNumber?: string
  hash?: string
  prevHash?: string
  timestamp?: string
  onExportClick?: () => void
}

interface MerkleNode {
  id: string
  label: string
  shortName: string
  hash: string
  rawHex: string
  type: 'root' | 'spatial' | 'spectral' | 'exif'
  status: 'SEALED' | 'VALID' | 'ANOMALY' | 'ATTESTED'
  details: string
  meta: Record<string, string>
}

const MERKLE_TREE_NODES: MerkleNode[] = [
  {
    id: 'root',
    label: 'MERKLE ROOT • HSM ATTESTED',
    shortName: 'Root',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    rawHex: '0x65336230633434323938666331633134396166626634633839393666623932343237616534316534363439623933346361343935393931623738353262383535',
    type: 'root',
    status: 'SEALED',
    details: 'Master Merkle root hash sealed in Kavach FIPS 140-3 Hardware Security Module.',
    meta: {
      'HSM NODE': 'HSM-PRIMARY-01',
      'SIG SCHEME': 'ECDSA-P256-SHA256',
      'INCLUSION': '100% VERIFIED',
    },
  },
  {
    id: 'spatial',
    label: 'SPATIAL-TEMPORAL LATTICE',
    shortName: 'Spatial-Temporal',
    hash: '71b058a94628f1182749ea3b9182ca918471b092837419284710928374192847',
    rawHex: '0x37316230353861393436323866313138323734396561336239313832636139313834373162303932383337343139323834373130393238333734313932383437',
    type: 'spatial',
    status: 'ANOMALY',
    details: 'Aggregated tensor hash across 18 sampled optical flow residual keyframes.',
    meta: {
      'LATTICE FRAMES': '18 KEYFRAMES',
      'ANOMALY SCORE': '87.4% DIFFUSION',
      'OPTICAL FLOW': 'BOUNDARY WARPING',
    },
  },
  {
    id: 'spectral',
    label: 'SPECTRAL VOCODER',
    shortName: 'Spectral Vocoder',
    hash: '94a201c009824719284710293847102938471029384710293847102938471029',
    rawHex: '0x39346132303163303039383234373139323834373130323933383437313032393338343731303239333834373130323933383437313032393338343731303239',
    type: 'spectral',
    status: 'ANOMALY',
    details: 'High-frequency Mel-spectrogram phase discontinuity hash & neural synthesis artifact record.',
    meta: {
      'SAMPLE RATE': '48.0 kHz 32-BIT',
      'PHASE SYNC': 'VOCODER RESIDUAL',
      'MFCC COEFFS': '128 CHANNELS',
    },
  },
  {
    id: 'exif',
    label: 'EXIF CONTAINER',
    shortName: 'EXIF Container',
    hash: '4a8b192c81726354819203847162534819203847162534819203847162534819',
    rawHex: '0x34613862313932633831373236333534383139323033383437313632353334383139323033383437313632353334383139323033383437313632353334383139',
    type: 'exif',
    status: 'ATTESTED',
    details: 'ISO Base Media File Format (MP4 box atom) metadata, GPS spatial lock, and creation timestamp.',
    meta: {
      'CONTAINER': 'MPEG-4 ISO/IEC 14496-14',
      'GPS ATTEST': 'VALID TIME-SYNC',
      'ENCODER ID': 'FFmpeg Lavf 58.76',
    },
  },
]

export function LedgerVault({
  blockNumber = '004291',
  hash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  prevHash = '71b058a9...e4a9382f',
  timestamp = '2026-09-02 09:41:28.402 UTC',
  onExportClick,
}: LedgerVaultProps) {
  const [copied, setCopied] = useState(false)
  const [nodes, setNodes] = useState<MerkleNode[]>(MERKLE_TREE_NODES)
  const [selectedNode, setSelectedNode] = useState<MerkleNode>(MERKLE_TREE_NODES[0])
  const [activeBlock, setActiveBlock] = useState({
    blockNumber,
    hash,
    prevHash,
    timestamp,
  })

  React.useEffect(() => {
    async function loadLedger() {
      try {
        const res = await fetch('/api/vault/ledger')
        const json = await res.json()
        if (json.success && json.data) {
          if (json.data.merkleTreeNodes) {
            setNodes(json.data.merkleTreeNodes)
            setSelectedNode(json.data.merkleTreeNodes[0])
          }
          if (json.data.latestBlock) {
            setActiveBlock({
              blockNumber: json.data.latestBlock.blockNumber.replace('#', ''),
              hash: json.data.latestBlock.merkleRootHash,
              prevHash: json.data.latestBlock.previousBlockHash,
              timestamp: json.data.latestBlock.timestamp,
            })
          }
        }
      } catch {
        // Fallback to defaults
      }
    }
    loadLedger()
  }, [])

  const copyHash = async (textToCopy: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy)
      }
      sfx.playClick()
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (err) {
      console.error('Failed to copy hash:', err)
    }
  }

  const handleNodeClick = (node: MerkleNode) => {
    sfx.playClick()
    setSelectedNode(node)
  }

  const handleExport = () => {
    sfx.playSeal()
    onExportClick?.()
  }

  return (
    <div className="panel ledger-panel" id="ledger">
      {/* Header */}
      <div className="panel-heading">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="section-kicker font-mono font-bold text-[#10b981]">
              EVIDENCE LEDGER • CHAIN OF CUSTODY
            </span>
          </div>
          <h2 className="text-[#f8fafc]">Court-Admissible Cryptographic Vault</h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="case-badge font-mono">
            <Lock size={12} className="text-[#10b981]" /> ISO/IEC 27037 SEALED
          </span>
        </div>
      </div>

      {/* Cryptographic Hash-Chained Evidence Sequence (Block N-1 -> Block N -> Block N+1) */}
      <div className="p-4 rounded-2xl bg-[#030712] border border-[#10b981]/30 mb-4">
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10 text-xs font-mono">
          <span className="text-[#34d399] font-bold flex items-center gap-1.5">
            <GitCommit size={14} /> HASH-CHAINED CHAIN-OF-CUSTODY SEQUENCE
          </span>
          <span className="text-slate-400 text-[10px]">INDIAN EVIDENCE ACT §65B &amp; ISO/IEC 27037</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          {/* Block N-1 */}
          <div className="p-3 rounded-xl bg-[#080d1a] border border-white/10 flex flex-col gap-1">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-slate-400">PARENT BLOCK #004290</span>
              <span className="text-[#34d399] font-bold">SEALED</span>
            </div>
            <span className="text-slate-500 text-[9px]">BLOCK HASH (SHA-256):</span>
            <code className="text-[#38bdf8] text-[10px] truncate">71b058a9...e4a9382f</code>
          </div>

          {/* Current Block N */}
          <div className="p-3 rounded-xl bg-[#111827] border-2 border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.2)] flex flex-col gap-1">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-[#00f2fe] font-bold">CURRENT BLOCK #{blockNumber}</span>
              <span className="text-[#10b981] font-bold">ACTIVE ATTESTATION</span>
            </div>
            <span className="text-slate-400 text-[9px]">MERKLE ROOT POINTER:</span>
            <code className="text-[#34d399] text-[10px] truncate">{hash.slice(0, 22)}...</code>
          </div>

          {/* Block N+1 Pending */}
          <div className="p-3 rounded-xl bg-[#080d1a] border border-white/5 opacity-70 flex flex-col gap-1">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-slate-500">NEXT BLOCK #004292</span>
              <span className="text-slate-400 font-bold">GENESIS READY</span>
            </div>
            <span className="text-slate-600 text-[9px]">PARENT POINTER:</span>
            <code className="text-slate-400 text-[10px] truncate">{hash.slice(0, 16)}... (LINKED)</code>
          </div>
        </div>
      </div>

      {/* 2-Column Court-Admissible Evidence Ledger */}
      <div className="ledger-2col-layout">
        {/* LEFT PANEL: Block, Sealed Badge, Timestamp & SHA-256 Merkle Root */}
        <div className="ledger-left-col">
          <div className="ledger-card-inner">
            {/* Top Status & Block Index */}
            <div className="flex items-center justify-between pb-3 border-b border-[#38bdf8]/15">
              <div className="flex items-center gap-2">
                <Hash size={16} className="text-[#00f2fe]" />
                <span className="text-[16px] font-mono font-bold text-[#f8fafc]">
                  BLOCK #{blockNumber}
                </span>
              </div>

              <span className="sealed-court-badge">
                <ShieldCheck size={13} className="text-[#10b981]" />
                <span>SEALED &amp; COURT ADMISSIBLE</span>
              </span>
            </div>

            {/* Hardware Timestamp */}
            <div className="ledger-meta-row mt-4">
              <span className="meta-kicker">HARDWARE TIMESTAMP (GPS SYNC)</span>
              <span className="meta-val text-[#f8fafc] font-mono">{timestamp}</span>
            </div>

            {/* SHA-256 Merkle Root Hash Box */}
            <div className="hash-box-container mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#00f2fe] font-bold flex items-center gap-1.5">
                  <Key size={12} /> SHA-256 MERKLE ROOT HASH
                </span>
                <button
                  type="button"
                  onClick={() => copyHash(hash)}
                  className="copy-btn font-mono"
                  title="Copy SHA-256 Hash to Clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-[#10b981]" />
                      <span className="text-[#10b981]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>COPY HASH</span>
                    </>
                  )}
                </button>
              </div>

              <code className="merkle-root-display">
                {hash}
              </code>
            </div>

            {/* Chain of Custody Proof Standards Grid */}
            <div className="custody-specs-grid mt-4">
              <div className="spec-card">
                <span className="spec-label">VALIDATOR NODE</span>
                <b className="spec-val font-mono text-[#00f2fe]">HSM-CLUSTER-04</b>
              </div>
              <div className="spec-card">
                <span className="spec-label">ATTESTATION SCHEME</span>
                <b className="spec-val font-mono text-[#f8fafc]">ECDSA P-256 + SHA256</b>
              </div>
              <div className="spec-card">
                <span className="spec-label">LEGAL STANDARD</span>
                <b className="spec-val font-mono text-[#10b981]">ISO/IEC 27037 §6.3</b>
              </div>
              <div className="spec-card">
                <span className="spec-label">PROOF MECHANISM</span>
                <b className="spec-val font-mono text-[#a855f7]">ZK-Merkle Inclusion</b>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Interactive Visual Tree & Raw Hex Payload Inspector */}
        <div className="ledger-right-col">
          <div className="ledger-card-inner">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-bold text-[#00f2fe] flex items-center gap-1.5">
                <GitBranch size={13} /> INTERACTIVE MERKLE VISUAL TREE
              </span>
              <span className="text-[9px] font-mono text-[#94a3b8]">
                CLICK NODE TO INSPECT HEX
              </span>
            </div>

            {/* Visual Node Tree Grid */}
            <div className="merkle-visual-tree">
              {/* Root Node (Top) */}
              <div className="tree-level root-level">
                <button
                  type="button"
                  className={`tree-node-btn root ${selectedNode.id === 'root' ? 'selected' : ''}`}
                  onClick={() => handleNodeClick(MERKLE_TREE_NODES[0])}
                >
                  <Key size={13} className="text-[#f59e0b]" />
                  <span className="font-mono font-bold">Root [Block #{blockNumber}]</span>
                  <span className="node-status-pill verified">SEALED</span>
                </button>
              </div>

              {/* Connecting Tree SVG Lines */}
              <div className="tree-connector-lines" aria-hidden="true">
                <svg viewBox="0 0 400 36" fill="none" className="w-full h-9">
                  <path
                    d="M200 0 L200 16 M200 16 L65 16 L65 36 M200 16 L200 36 M200 16 L335 16 L335 36"
                    stroke="rgba(56, 189, 248, 0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                </svg>
              </div>

              {/* Branch & Leaf Nodes (Bottom Row) */}
              <div className="tree-level child-level">
                {nodes.slice(1).map((node) => {
                  const isSelected = selectedNode.id === node.id
                  return (
                    <button
                      key={node.id}
                      type="button"
                      className={`tree-node-btn child ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleNodeClick(node)}
                    >
                      {node.type === 'spatial' && <Layers size={12} className="text-[#00f2fe]" />}
                      {node.type === 'spectral' && <Radio size={12} className="text-[#a855f7]" />}
                      {node.type === 'exif' && <FileCode size={12} className="text-[#10b981]" />}

                      <span className="font-mono font-semibold">{node.shortName}</span>
                      <span className={`node-status-pill ${node.status.toLowerCase()}`}>
                        {node.status}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Node Raw Hex Payload Inspector Below */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                className="payload-inspector-box mt-4"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inspector-head font-mono">
                  <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-[#00f2fe]" />
                    <span className="text-[#f8fafc] font-bold">{selectedNode.label}</span>
                  </div>
                  <span className="text-[10px] text-[#00f2fe] font-mono font-bold">
                    TYPE: {selectedNode.type.toUpperCase()}
                  </span>
                </div>

                <div className="mt-2 text-[11px] text-[#94a3b8] font-mono leading-relaxed">
                  {selectedNode.details}
                </div>

                {/* Raw Hex Display */}
                <div className="raw-hex-wrap mt-2.5">
                  <span className="raw-hex-label">RAW HEX PAYLOAD:</span>
                  <code className="raw-hex-code font-mono">
                    {selectedNode.rawHex}
                  </code>
                </div>

                {/* Metadata Badges */}
                <div className="inspector-meta-row mt-2.5">
                  {Object.entries(selectedNode.meta).map(([key, val]) => (
                    <div key={key} className="meta-badge font-mono">
                      <span>{key}:</span> <b>{val}</b>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Primary Action Button: Export Forensic Dossier */}
      <button
        className="export-dossier-full-btn"
        onClick={handleExport}
      >
        <div className="flex items-center gap-2.5">
          <FileText size={17} className="text-[#02040a]" />
          <span>EXPORT COURT-ADMISSIBLE FORENSIC DOSSIER (PDF/HASH)</span>
        </div>
        <span className="badge-c2pa-pdf font-mono">ISO/IEC 27037 STANDARD</span>
      </button>
    </div>
  )
}
