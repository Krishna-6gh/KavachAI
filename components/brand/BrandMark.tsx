'use client'

import React from 'react'
import Image from 'next/image'

interface BrandMarkProps {
  className?: string
  subtext?: string
  showFullLogo?: boolean
}

export function BrandMark({
  className = '',
  subtext = 'COURT-ADMISSIBLE AI FORENSICS',
  showFullLogo = false,
}: BrandMarkProps) {
  return (
    <div className={`brand-mark flex items-center gap-2.5 ${className}`}>
      <div className="brand-icon relative w-8 h-8 flex items-center justify-center flex-shrink-0" aria-hidden="true">
        <Image
          src="/kavach-official-emblem.png"
          alt="Kavach AI Official Shield Emblem"
          width={32}
          height={32}
          className="object-contain drop-shadow-[0_0_12px_rgba(0,242,254,0.4)]"
          priority
        />
      </div>
      <div>
        <div className="brand-name font-sans font-extrabold tracking-tight text-white flex items-center gap-0.5 text-base leading-none">
          KAVACH<span className="text-[#00f2fe] font-black">AI</span>
        </div>
        {subtext && (
          <div className="brand-sub font-mono text-[10px] font-bold text-[#38bdf8] tracking-wider uppercase mt-0.5">
            {subtext}
          </div>
        )}
      </div>
    </div>
  )
}
