'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, FileCode, GitCommit, Key, ShieldCheck } from 'lucide-react'

interface MerkleNode {
  id: string
  label: string
  hash: string
  type: 'root' | 'branch' | 'leaf'
  verified: boolean
  payload: string
}

const merkleNodes: MerkleNode[] = [
  {
    id: 'root',
    label: 'MERKLE ROOT HASH',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    type: 'root',
    verified: true,
    payload: 'Root cryptographic signature verified by Kavach Hardware Security Module (HSM).',
  },
  {
    id: 'branch-visual',
    label: 'BRANCH 01: SPATIAL-TEMPORAL',
    hash: '71b058a94628f1182749ea3b9182ca918471b092837419284710928374192847',
    type: 'branch',
    verified: true,
    payload: 'Aggregated hash of 18 sampled optical flow residual keyframes.',
  },
  {
    id: 'branch-audio',
    label: 'BRANCH 02: SPECTRAL VOCODER',
    hash: '94a201c009824719284710293847102938471029384710293847102938471029',
    type: 'branch',
    verified: true,
    payload: 'Aggregated hash of 32-bit floating point Mel-spectrogram frequency bins.',
  },
  {
    id: 'leaf-exif',
    label: 'LEAF 01: RAW CONTAINER EXIF',
    hash: '4a8b192c81726354819203847162534819203847162534819203847162534819',
    type: 'leaf',
    verified: true,
    payload: 'ISO Base Media File Format (MP4 box) metadata & GPS timestamp.',
  },
  {
    id: 'leaf-c2pa',
    label: 'LEAF 02: C2PA X.509 ATTESTATION',
    hash: 'd892019283741928374192837419283741928374192837419283741928374192',
    type: 'leaf',
    verified: false,
    payload: 'Hardware TPM certificate chain validation failed at root authority.',
  },
]

export function MerkleTreeExplorer() {
  const [selectedNode, setSelectedNode] = useState<MerkleNode>(merkleNodes[0])

  return (
    <div className="merkle-explorer-wrap" aria-label="Interactive Merkle Tree Cryptographic Explorer">
      <div className="merkle-header">
        <span className="flex items-center gap-1 text-[10px] font-mono text-cyan font-bold">
          <GitCommit size={13} /> INTERACTIVE MERKLE TREE EXPLORER
        </span>
        <span className="text-[9px] font-mono text-muted-foreground">SHA-256 TREE</span>
      </div>

      {/* Node Hierarchy List */}
      <div className="merkle-node-list">
        {merkleNodes.map((node) => {
          const isSelected = selectedNode.id === node.id

          return (
            <button
              key={node.id}
              type="button"
              className={`merkle-node-btn ${isSelected ? 'active' : ''} type-${node.type}`}
              onClick={() => setSelectedNode(node)}
            >
              <div className="flex items-center gap-2">
                {node.type === 'root' && <Key size={12} className="text-amber" />}
                {node.type === 'branch' && <GitCommit size={12} className="text-cyan" />}
                {node.type === 'leaf' && <FileCode size={12} className="text-muted-foreground" />}
                <span className="node-label">{node.label}</span>
              </div>

              <div className="flex items-center gap-2">
                {node.verified ? (
                  <span className="status-badge-verified">
                    <Check size={10} /> SEALED
                  </span>
                ) : (
                  <span className="status-badge-unverified">INVALID</span>
                )}
                <ChevronRight size={12} className="text-muted-foreground" />
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Node Details Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          className="merkle-payload-box"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>NODE PAYLOAD INSPECTOR</span>
            <span className="text-cyan font-bold">{selectedNode.type.toUpperCase()}</span>
          </div>

          <code className="merkle-hex-hash">
            {selectedNode.hash}
          </code>

          <p className="merkle-payload-text">
            {selectedNode.payload}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
