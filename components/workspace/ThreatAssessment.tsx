'use client'

import React from 'react'
import { ThreatGauge } from './ThreatGauge'

interface ThreatAssessmentProps {
  score?: number
}

export function ThreatAssessment({ score = 94 }: ThreatAssessmentProps) {
  const isHighRisk = score > 50

  return (
    <div className={`p-6 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col justify-between h-full backdrop-blur-md transition-all ${
      isHighRisk ? 'border-t-2 border-t-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.12)]' : 'border-t-2 border-t-emerald-500/80 shadow-[0_0_25px_rgba(16,185,129,0.12)]'
    }`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div>
          <span className="text-xs font-mono font-bold text-red-400 block mb-1">
            NEURAL RISK MATRIX // STATISTICAL CONFIDENCE
          </span>
          <h2 className="text-xl font-bold text-white font-sans m-0">
            Anomaly Risk Assessment
          </h2>
        </div>
        <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${isHighRisk ? 'bg-red-500/10 text-[#ef4444] border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'}`}>
          {isHighRisk ? 'HIGH-RISK ALERT' : 'AUTHENTIC PASS'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-2">
        <ThreatGauge score={score} />

        <div className="flex-1 flex flex-col gap-3 font-mono text-xs">
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
            <span className="text-slate-400 text-[10px] block mb-1">CLASSIFICATION VERDICT:</span>
            <div className="flex items-center gap-2">
              {isHighRisk ? (
                <span className="text-[#ef4444] font-black text-sm drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">
                  SYNTHETIC ANOMALY CONFIRMED
                </span>
              ) : (
                <span className="text-[#10b981] font-black text-sm drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                  AUTHENTIC BIOMETRIC BASELINE
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#94a3b8] mt-1 font-sans">
              Exceeds ISO/IEC 27037 forensic confidence threshold (p &lt; 0.001)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2.5 bg-slate-950/80 border border-slate-800 border-t border-t-emerald-500/40 rounded-md">
              <span className="text-slate-400 text-[9px] block">NATURAL CAPTURE:</span>
              <b className="text-sm text-emerald-400">{100 - score}%</b>
            </div>
            <div className="p-2.5 bg-slate-950/80 border border-slate-800 border-t border-t-red-500/40 rounded-md">
              <span className="text-slate-400 text-[9px] block">SYNTHETIC NOISE:</span>
              <b className={isHighRisk ? 'text-sm text-[#ef4444]' : 'text-sm text-[#10b981]'}>{score}%</b>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-400">
        <span className="text-emerald-400 font-bold">● AUTHENTIC (0-30%)</span>
        <span className="text-amber-400 font-bold">● INDETERMINATE (31-65%)</span>
        <span className="text-red-400 font-bold">● MANIPULATED (66-100%)</span>
      </div>
    </div>
  )
}
