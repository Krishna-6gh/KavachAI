'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Terminal,
  Menu,
  X,
  ChevronRight,
  Activity,
  Layers,
  Sparkles,
  Lock,
  ArrowUpRight,
} from 'lucide-react'
import { KavachLogo } from './KavachLogo'
import { sfx } from '@/lib/soundEffects'

interface CyberNavbarProps {
  onSignInClick?: () => void
}

export function CyberNavbar({ onSignInClick }: CyberNavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Threat Landscape', href: '#problem' },
    { label: '5-Pillar Engine', href: '#five-pillars' },
    { label: 'Architecture Pipeline', href: '#architecture' },
    { label: 'Key Innovations', href: '#differentiators' },
    { label: 'Live Intel Wire', href: '#live-threats' },
  ]

  const handleNavClick = (href: string) => {
    sfx.playClick()
    setActiveSection(href)
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070A0E]/90 backdrop-blur-2xl border-b border-emerald-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.85)]'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Custom KavachLogo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={() => sfx.playClick()}
            className="hover:opacity-95 transition-opacity no-underline flex items-center gap-2"
          >
            <KavachLogo />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/70 border border-slate-800/90 backdrop-blur-xl shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Right: Security Status & Primary Console Action */}
        <div className="flex items-center gap-3.5">
          {/* Live Defense HSM Status Badge / Clearance Link */}
          <Link
            href="/console"
            onClick={() => sfx.playClick()}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/40 text-[11px] font-mono text-slate-300 transition-all no-underline cursor-pointer"
            title="Authenticate Officer Credentials (FIPS 140-3 HSM)"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 font-bold">FIPS 140-3 HSM</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 hover:text-white">CLEARANCE</span>
          </Link>

          {/* Primary CTA: Launch Investigator Console */}
          <Link
            href="/console"
            onClick={() => sfx.playSeal()}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-extrabold text-[#070A0E] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer no-underline overflow-hidden border border-emerald-300/60"
          >
            {/* Animated Hover Sheen */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

            <span className="p-1 rounded-md bg-black/15 flex items-center justify-center">
              <Terminal size={14} className="text-[#070A0E] group-hover:rotate-12 transition-transform duration-300" />
            </span>
            <span className="tracking-tight uppercase font-black font-mono text-xs sm:text-sm">
              Investigator Console
            </span>
            <ChevronRight size={15} className="text-[#070A0E] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => {
              sfx.playClick()
              setMobileMenuOpen((prev) => !prev)
            }}
            className="xl:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#070A0E]/95 border-b border-emerald-500/20 backdrop-blur-2xl px-6 py-6 flex flex-col gap-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                DEFENSE CORE: ONLINE
              </span>
              <span>NODE: #PB-CYBER-8821</span>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-900/80 border border-transparent hover:border-slate-800 transition-all flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight size={14} className="text-slate-500" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <Link
                href="/console"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-slate-950 text-xs font-mono font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <Terminal size={15} />
                <span>Launch Investigator Console</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default CyberNavbar
