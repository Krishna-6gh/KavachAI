'use client'

import React, { useState } from 'react'
import { Radar, ShieldAlert, Sparkles } from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

interface LandmarkPoint {
  id: number
  x: number
  y: number
  zone: string
  drift: string
  confidence: number
}

const landmarkPoints: LandmarkPoint[] = [
  { id: 1, x: 20, y: 35, zone: 'Jaw Perimeter', drift: '+0.4px', confidence: 91 },
  { id: 3, x: 23, y: 48, zone: 'Jaw Perimeter', drift: '+0.7px', confidence: 93 },
  { id: 5, x: 28, y: 62, zone: 'Mandibular Angle', drift: '+1.2px', confidence: 96 },
  { id: 7, x: 38, y: 76, zone: 'Chin Base', drift: '+1.8px', confidence: 98 },
  { id: 9, x: 50, y: 84, zone: 'Gnathion (Chin Tip)', drift: '+2.1px', confidence: 99 },
  { id: 11, x: 62, y: 76, zone: 'Chin Base', drift: '+1.8px', confidence: 98 },
  { id: 13, x: 72, y: 62, zone: 'Mandibular Angle', drift: '+1.1px', confidence: 95 },
  { id: 15, x: 77, y: 48, zone: 'Jaw Perimeter', drift: '+0.6px', confidence: 92 },
  { id: 17, x: 80, y: 35, zone: 'Jaw Perimeter', drift: '+0.3px', confidence: 90 },

  { id: 18, x: 30, y: 28, zone: 'Left Brow Arch', drift: '+0.3px', confidence: 88 },
  { id: 20, x: 37, y: 26, zone: 'Left Brow Apex', drift: '+0.4px', confidence: 90 },
  { id: 22, x: 44, y: 29, zone: 'Glabella Left', drift: '+0.2px', confidence: 87 },
  { id: 23, x: 56, y: 29, zone: 'Glabella Right', drift: '+0.2px', confidence: 87 },
  { id: 25, x: 63, y: 26, zone: 'Right Brow Apex', drift: '+0.4px', confidence: 90 },
  { id: 27, x: 70, y: 28, zone: 'Right Brow Arch', drift: '+0.3px', confidence: 88 },

  { id: 36, x: 32, y: 36, zone: 'Left Outer Canthus', drift: '+0.5px', confidence: 93 },
  { id: 37, x: 36, y: 33, zone: 'Left Upper Eyelid', drift: '+0.6px', confidence: 94 },
  { id: 39, x: 42, y: 36, zone: 'Left Inner Canthus', drift: '+0.5px', confidence: 92 },
  { id: 41, x: 36, y: 39, zone: 'Left Lower Eyelid', drift: '+0.7px', confidence: 95 },

  { id: 42, x: 58, y: 36, zone: 'Right Inner Canthus', drift: '+0.5px', confidence: 92 },
  { id: 44, x: 64, y: 33, zone: 'Right Upper Eyelid', drift: '+0.6px', confidence: 94 },
  { id: 45, x: 68, y: 36, zone: 'Right Outer Canthus', drift: '+0.5px', confidence: 93 },
  { id: 47, x: 64, y: 39, zone: 'Right Lower Eyelid', drift: '+0.7px', confidence: 95 },

  { id: 28, x: 50, y: 34, zone: 'Nasion (Bridge)', drift: '+0.2px', confidence: 86 },
  { id: 30, x: 50, y: 44, zone: 'Dorsum', drift: '+0.3px', confidence: 88 },
  { id: 31, x: 50, y: 52, zone: 'Pronasale (Nose Tip)', drift: '+0.5px', confidence: 91 },
  { id: 32, x: 44, y: 54, zone: 'Left Alar Base', drift: '+0.6px', confidence: 93 },

  { id: 48, x: 36, y: 66, zone: 'Left Cheilion', drift: '+1.1px', confidence: 96 },
  { id: 51, x: 50, y: 63, zone: 'Labiale Superius', drift: '+1.3px', confidence: 97 },
  { id: 54, x: 64, y: 66, zone: 'Right Cheilion', drift: '+1.1px', confidence: 96 },
  { id: 57, x: 50, y: 72, zone: 'Labiale Inferius', drift: '+1.6px', confidence: 98 },
]

export function FacialMeshVisualizer() {
  const [selectedPoint, setSelectedPoint] = useState<LandmarkPoint>(landmarkPoints[4])

  const handlePointSelect = (pt: LandmarkPoint) => {
    sfx.playClick()
    setSelectedPoint(pt)
  }

  return (
    <div className="p-6 bg-slate-900/70 border border-slate-800 border-t-2 border-t-cyan-500/80 rounded-xl flex flex-col justify-between h-full backdrop-blur-md shadow-lg" aria-label="Interactive 68-Point Biometric Facial Landmark Mesh">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">
            68-POINT TOPOLOGY // FACIAL DRIFT
          </span>
        </div>
        <span className="font-mono text-xs text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
          68 LANDMARKS
        </span>
      </div>

      <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center relative my-2 shadow-inner">
        <svg viewBox="0 0 100 100" className="w-full h-48 max-w-[260px]">
          <defs>
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <path
            d="M20,35 Q28,62 38,76 Q50,84 62,76 Q72,62 80,35"
            fill="none"
            stroke="rgba(56, 189, 248, 0.45)"
            strokeWidth="0.9"
          />
          <path
            d="M30,28 Q37,24 44,29 M56,29 Q63,24 70,28"
            fill="none"
            stroke="rgba(56, 189, 248, 0.45)"
            strokeWidth="0.9"
          />
          <ellipse
            cx="37"
            cy="36"
            rx="5.5"
            ry="3.2"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.9"
          />
          <ellipse
            cx="63"
            cy="36"
            rx="5.5"
            ry="3.2"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.9"
          />
          <path
            d="M50,34 L50,52 M44,54 Q50,52 56,54"
            fill="none"
            stroke="rgba(56, 189, 248, 0.45)"
            strokeWidth="0.9"
          />
          <path
            d="M36,66 Q50,62 64,66 Q50,73 36,66 Z"
            fill="rgba(239, 68, 68, 0.25)"
            stroke="#ef4444"
            strokeWidth="1.2"
            filter="url(#redGlow)"
          />

          {landmarkPoints.map((pt) => {
            const isSelected = selectedPoint.id === pt.id
            const isHighAnomaly = pt.confidence >= 95

            return (
              <g
                key={pt.id}
                onClick={() => handlePointSelect(pt)}
                className="cursor-pointer"
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isSelected ? 3.2 : 1.9}
                  fill={isHighAnomaly ? '#ef4444' : '#00f2fe'}
                  filter={isHighAnomaly ? 'url(#redGlow)' : 'url(#cyanGlow)'}
                  stroke={isSelected ? '#ffffff' : 'rgba(0,0,0,0.8)'}
                  strokeWidth="0.7"
                />
              </g>
            )
          })}
        </svg>

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/80 border border-cyan-500/40 text-[9px] font-mono text-cyan-300 font-bold shadow-[0_0_8px_rgba(0,242,254,0.3)]">
          FACE TRACK: LOCKED
        </div>
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-slate-950/80 border border-red-500/40 text-[9px] font-mono text-red-400 font-bold shadow-[0_0_8px_rgba(239,68,68,0.3)]">
          RESIDUAL: +1.84px
        </div>
      </div>

      <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg font-mono text-xs space-y-1">
        <div className="flex justify-between font-bold text-white">
          <span>NODE #{String(selectedPoint.id).padStart(2, '0')}: {selectedPoint.zone.toUpperCase()}</span>
          <span className="text-red-400 font-black">{selectedPoint.confidence}% ANOMALY</span>
        </div>
        <div className="flex justify-between text-slate-400 text-[11px]">
          <span>SUB-PIXEL DRIFT: <b className="text-white">{selectedPoint.drift}</b></span>
          <span>COORD: <b className="text-cyan-400">[{selectedPoint.x}, {selectedPoint.y}]</b></span>
        </div>
      </div>
    </div>
  )
}
