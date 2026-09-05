'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { BrandMark } from '@/components/brand/BrandMark'
import { motion } from 'framer-motion'
import { sfx } from '@/lib/soundEffects'
import { Menu, X, Shield, Search, FileCheck, UserRound, LogOut, Terminal, Layers, AlertTriangle } from 'lucide-react'

interface HeaderProps {
  session: string | null
  darkMode: boolean
  onToggleTheme: () => void
  onSignInClick: () => void
  onSignOutClick: () => void
  time: Date
}

export function Header({
  session,
  onSignInClick,
  onSignOutClick,
}: HeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const navLinks = [
    { label: 'Key Features', href: '#key-features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Neural Lens', href: '#comparison' },
    { label: 'Threat Briefings', href: '#briefings' },
    { label: 'Use Cases', href: '#use-cases' },
  ]

  return (
    <header className="pill-navbar-outer">
      <div className="pill-navbar-inner">
        {/* Left: Brand + Status Indicator */}
        <div className="pill-nav-left">
          <Link href="/" className="no-underline">
            <BrandMark subtext="AI FORENSIC PLATFORM" />
          </Link>
          <div className="pill-status-dot" title="Kavach Defense Core: Online">
            <span className="quantum-core-dot" />
            <span className="status-dot-text font-mono">NODE ACTIVE</span>
          </div>
        </div>

        {/* Center: Clean Navigation Links */}
        <nav className="pill-nav-links" aria-label="Main Navigation">
          {navLinks.map((link, idx) => {
            const isActive = activeTab === idx

            return (
              <a
                key={link.label}
                className={`pill-nav-item ${isActive ? 'active' : ''}`}
                href={link.href}
                onClick={() => {
                  sfx.playClick()
                  setActiveTab(idx)
                }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    className="active-pill-bg"
                    layoutId="activePill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right: High-Contrast Launch Scanner & Login CTA */}
        <div className="pill-nav-right">
          <Link
            href="/dashboard"
            className="aerospace-btn header-scanner-btn"
            onClick={() => sfx.playScan()}
          >
            <Terminal size={14} />
            <span>Launch Scanner</span>
          </Link>

          {session ? (
            <button
              type="button"
              className="aerospace-btn session-active"
              onClick={() => {
                sfx.playClick()
                onSignOutClick()
              }}
              title="Sign Out"
            >
              <UserRound size={13} />
              <span>{session.split('@')[0]}</span>
              <LogOut size={12} />
            </button>
          ) : (
            <button
              type="button"
              className="ghost-login-btn"
              onClick={() => {
                sfx.playClick()
                onSignInClick()
              }}
            >
              <UserRound size={14} />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileNavOpen && (
        <div className="mobile-nav-menu">
          <Link
            href="/dashboard"
            className="mobile-nav-link text-[#00f2fe] font-bold"
            onClick={() => setMobileNavOpen(false)}
          >
            <Terminal size={15} />
            <span>Launch Scanner Console</span>
          </Link>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMobileNavOpen(false)}
            >
              <span>{link.label}</span>
            </a>
          ))}

          <button
            type="button"
            className="mobile-nav-link mobile-login-btn"
            onClick={() => {
              setMobileNavOpen(false)
              if (session) onSignOutClick()
              else onSignInClick()
            }}
          >
            <UserRound size={15} />
            <span>{session ? `Sign Out (${session})` : 'Investigator Clearance'}</span>
          </button>
        </div>
      )}
    </header>
  )
}
