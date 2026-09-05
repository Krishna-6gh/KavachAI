'use client'

import React from 'react'
import Link from 'next/link'
import { KavachLogo } from './landing/KavachLogo'
import { sfx } from '@/lib/soundEffects'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Kavach Custom Shield Emblem & Logo */}
        <Link
          href="/"
          onClick={() => sfx.playClick()}
          className="hover:opacity-95 transition-opacity no-underline"
        >
          <KavachLogo />
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#problem" className="hover:text-emerald-400 transition-colors">
            Problem
          </a>
          <a href="#five-pillars" className="hover:text-emerald-400 transition-colors">
            Core Pipeline
          </a>
          <a href="#differentiators" className="hover:text-emerald-400 transition-colors">
            Innovations
          </a>
          <a href="#architecture" className="hover:text-emerald-400 transition-colors">
            Architecture
          </a>
          <a href="#custody-ledger" className="hover:text-emerald-400 transition-colors">
            Custody Ledger
          </a>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          <Link
            href="/console"
            onClick={() => sfx.playSeal()}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all no-underline"
          >
            Launch Console
          </Link>
        </div>
      </div>
    </header>
  )
}
