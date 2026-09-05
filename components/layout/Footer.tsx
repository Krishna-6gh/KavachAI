'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Shield,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Globe2,
  Heart,
  MessageSquare,
  Mail,
  Sparkles,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

function TwitterXIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

interface FooterProps {
  session?: string | null
  className?: string
}

export function Footer({ session, className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  // Newsletter state handling
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    const trimmedEmail = email.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!trimmedEmail) {
      setSubscribeStatus('error')
      setErrorMessage('Please enter a corporate email address.')
      return
    }

    if (!emailRegex.test(trimmedEmail)) {
      setSubscribeStatus('error')
      setErrorMessage('Invalid format. Please enter a valid corporate email.')
      return
    }

    setSubscribeStatus('loading')
    sfx.playClick()

    setTimeout(() => {
      setSubscribeStatus('success')
      setEmail('')
      sfx.playSeal()
      setTimeout(() => {
        setSubscribeStatus('idle')
      }, 5000)
    }, 800)
  }

  return (
    <footer
      className={`relative bg-[#04070D] border-t border-zinc-800/80 text-zinc-100 overflow-hidden pt-14 pb-10 ${className}`}
      aria-label="Site Footer"
    >
      {/* Top Ambient Glow & Radial Backdrops */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[220px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[200px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ==================================================================== */}
        {/* TIER 1: UPPER BANNER / BRAND HEADER (CONTEXT ANCHOR)                */}
        {/* ==================================================================== */}
        <div className="mb-12 pb-8 border-b border-zinc-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand Mark & One-Sentence Descriptor */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 max-w-2xl">
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-xl"
              aria-label="KavachAI Home"
            >
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 via-zinc-900 to-zinc-950 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:border-emerald-400 transition-all duration-300">
                <Shield className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                <Lock className="w-2.5 h-2.5 text-cyan-400 absolute bottom-2 right-2" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans flex items-center">
                  Kavach<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 ml-0.5">AI</span>
                </span>
                <span className="text-[10px] font-mono font-medium text-emerald-400 tracking-wider uppercase">
                  Zero-Trust Forensics
                </span>
              </div>
            </Link>

            <div className="hidden sm:block h-8 w-px bg-zinc-800" />

            <p className="text-xs text-zinc-400 font-sans leading-relaxed max-w-md m-0">
              Next-generation autonomous defense and zero-trust intelligence.
            </p>
          </div>

          {/* System Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-semibold text-emerald-400 tracking-wide">
                Systems Operational // 100% Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* TIER 2: CORE NAVIGATION GRID (5 COLUMNS)                             */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-zinc-800/60">
          {/* Column 1: Learn More */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold text-zinc-100 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Learn More
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 list-none p-0 m-0 font-sans">
              <li>
                <a
                  href="#architecture"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  Architecture &amp; Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="#five-pillars"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  Threat Intelligence Model
                </a>
              </li>
              <li>
                <a
                  href="#differentiators"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  Benchmark Reports
                </a>
              </li>
              <li>
                <Link
                  href="/console"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <a
                  href="#specimen"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  Release Notes (v2.4)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact Us */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold text-zinc-100 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 list-none p-0 m-0 font-sans">
              <li>
                <a
                  href="mailto:support@kavach.ai"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Enterprise Support</span>
                </a>
                <span className="block text-[11px] font-mono text-zinc-500 pl-5">support@kavach.ai</span>
              </li>
              <li>
                <a
                  href="mailto:sec-ops@kavach.ai"
                  className="hover:text-rose-300 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-400 rounded group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-zinc-300 group-hover:text-rose-300">Incident Response (24/7)</span>
                </a>
                <span className="block text-[11px] font-mono text-zinc-500 pl-5">sec-ops@kavach.ai</span>
              </li>
              <li>
                <a
                  href="#partners"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  Partner Ecosystem
                </a>
              </li>
              <li>
                <Link
                  href="/console"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  Book an Architecture Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Compliance */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold text-zinc-100 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Legal &amp; Compliance
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 list-none p-0 m-0 font-sans">
              <li>
                <a
                  href="#privacy"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  Privacy Policy <span className="text-[10px] text-emerald-400 font-mono">(Zero-Log)</span>
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#eula"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  End-User License (EULA)
                </a>
              </li>
              <li>
                <a
                  href="#disclosure"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  Responsible Disclosure Policy
                </a>
              </li>
              <li>
                <a
                  href="#compliance"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded"
                >
                  Compliance &amp; SOC 2 Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Columns 4 & 5: Connect & Newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold text-zinc-100 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Stay Informed // Threat Advisories
            </h4>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed m-0">
              Receive zero-day deepfake threat disclosures, cryptanalytic findings, and court-admissibility briefs directly to your security inbox.
            </p>

            {/* Newsletter Subscription Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (subscribeStatus === 'error') setSubscribeStatus('idle')
                  }}
                  placeholder="Enter corporate email"
                  aria-label="Corporate Email Address"
                  className="w-full py-2.5 pl-3.5 pr-28 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:border-emerald-500/50 transition-all duration-200"
                />
                <button
                  type="submit"
                  disabled={subscribeStatus === 'loading'}
                  className="absolute right-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-mono font-bold tracking-wide transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] hover:shadow-[0_0_18px_rgba(16,185,129,0.5)] disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {subscribeStatus === 'loading' ? (
                    <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Connect</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>

              {/* Feedback messages */}
              {subscribeStatus === 'error' && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 font-sans pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {subscribeStatus === 'success' && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-sans pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Subscribed! Security dispatch token authenticated.</span>
                </div>
              )}
            </form>

            {/* Social Pill Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KavachAI GitHub Repository"
                className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-zinc-400 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 group"
              >
                <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KavachAI on X / Twitter"
                className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-zinc-400 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group"
              >
                <TwitterXIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KavachAI Community Discord"
                className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-zinc-400 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 group"
              >
                <DiscordIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KavachAI LinkedIn Organization"
                className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-blue-500/50 hover:bg-blue-500/10 text-zinc-400 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 group"
              >
                <LinkedinIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <span className="text-[11px] font-mono text-zinc-500 ml-1">@kavach_ai</span>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* TIER 3: BOTTOM COLOPHON BAR                                          */}
        {/* ==================================================================== */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          {/* Left: Copyright */}
          <div>
            <span>&copy; {currentYear} KavachAI Inc. All rights reserved.</span>
          </div>

          {/* Center: Team Beat Bytes with Interactive Pulsing Heart */}
          <div className="flex items-center gap-1.5 group cursor-default">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block group-hover:scale-125 transition-transform duration-300 animate-pulse" />
            <span>
              by <strong>Team Beat Bytes</strong>
            </span>
          </div>

          {/* Right: Localization & Security Indicators */}
          <div className="flex items-center gap-3 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Globe2 className="w-3 h-3" />
              <span>Region: Global Node (IN)</span>
            </span>
            <span className="text-zinc-600">•</span>
            <span className="font-mono text-zinc-400">Latency: &lt;14ms</span>
            <span className="text-zinc-600">•</span>
            <span className="text-cyan-400">FIPS 140-3 L3</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
