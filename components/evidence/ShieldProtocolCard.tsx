'use client'

import React, { useState, useEffect } from 'react'
import { Check, ShieldCheck } from 'lucide-react'

const logLines = [
  '[TPM-2.0] Hardware Enclave Attestation Handshake: OK',
  '[ECDSA] Secp256k1 Manifest Signature: VERIFIED',
  '[C2PA] X.509 Hardware Root Certificate Authority: VALID',
  '[ISOLATION] Memory Protection Level: RING-0 SECURE',
]

export function ShieldProtocolCard() {
  const [activeLog, setActiveLog] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLog((prev) => (prev + 1) % logLines.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  return (
    <article className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between h-full" aria-label="Hardware Enclave Protocol Card">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span className="text-xs font-mono font-bold text-emerald-400">
            HARDWARE ENCLAVE // TPM 2.0
          </span>
        </div>
        <span className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          ACTIVE RING-0
        </span>
      </div>

      {/* Terminal Log */}
      <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono text-[11px] space-y-1.5 my-2">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-[10px] text-slate-400">
          <span>ENCLAVE DAEMON • V4.8.1</span>
          <span className="text-emerald-400">● ONLINE</span>
        </div>

        {logLines.map((line, i) => (
          <div
            key={line}
            className={`transition-opacity ${i === activeLog ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}
          >
            <span>&gt;</span> {line}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-lg font-mono text-xs">
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <Check size={13} /> HARDWARE ROOT OF TRUST
          </span>
          <span className="text-slate-400">ZERO-TRUST ENCLAVE</span>
        </div>
        <p className="text-[11px] text-[#94a3b8] font-sans m-0 mt-1">
          Cryptographic keys anchored in isolated physical hardware secure processor.
        </p>
      </div>
    </article>
  )
}
