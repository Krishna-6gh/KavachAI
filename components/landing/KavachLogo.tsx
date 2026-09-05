'use client'

import React from 'react'

interface KavachLogoProps {
  className?: string
  showBadge?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function KavachLogo({
  className = '',
  showBadge = true,
  size = 'md',
}: KavachLogoProps) {
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 44 : 38

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* High-Tech Cybernetic Shield Icon */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-emerald-500/30 to-cyan-500/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />

        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] group-hover:scale-105 transition-transform duration-300"
        >
          <defs>
            <linearGradient id="shieldGrad" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="0.5" stopColor="#059669" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="shieldInner" x1="12" y1="10" x2="36" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0F172A" stopOpacity="0.9" />
              <stop offset="1" stopColor="#022C22" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="coreLine" x1="24" y1="12" x2="24" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34D399" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
          </defs>

          {/* Outer Shield Shell */}
          <path
            d="M24 4L7 11V22C7 32.5 14.3 42.1 24 44.5C33.7 42.1 41 32.5 41 22V11L24 4Z"
            fill="url(#shieldInner)"
            stroke="url(#shieldGrad)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Internal Geometric Grid Nodes */}
          <path
            d="M24 10V38M14 18L34 18M11 26L37 26M15 34L33 34"
            stroke="#10B981"
            strokeWidth="0.8"
            strokeOpacity="0.35"
            strokeDasharray="2 2"
          />

          {/* Central Neural Reticle Core */}
          <path
            d="M24 13L32 18V26L24 33L16 26V18L24 13Z"
            fill="#064E3B"
            fillOpacity="0.6"
            stroke="url(#coreLine)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />

          {/* Center Lock / Key Node */}
          <circle cx="24" cy="22" r="3.2" fill="#34D399" className="animate-pulse" />
          <path
            d="M24 25.2V29.5"
            stroke="#34D399"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Top Corner Radar Pips */}
          <circle cx="12" cy="14" r="1.2" fill="#38BDF8" />
          <circle cx="36" cy="14" r="1.2" fill="#38BDF8" />
        </svg>
      </div>

      {/* Brand Typography & Status Badge */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-wider text-white font-sans text-lg sm:text-xl leading-tight flex items-center">
            KAVACH
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 ml-1.5 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">
              AI
            </span>
          </span>

          {showBadge && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE DEFENSE
            </span>
          )}
        </div>

        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase leading-tight mt-0.5">
          Chandigarh Police Hackathon • Team Beat Bytes
        </span>
      </div>
    </div>
  )
}

export default KavachLogo
